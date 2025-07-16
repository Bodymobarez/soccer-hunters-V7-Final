import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as DbUser } from "@shared/schema";
import MemoryStore from "memorystore";

declare global {
  namespace Express {
    interface User extends DbUser {}
  }
}

const scryptAsync = promisify(scrypt);
const MemStore = MemoryStore(session);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  if (!stored || !stored.includes('.')) {
    return false;
  }
  
  try {
    const [hashed, salt] = stored.split(".");
    
    // Check if this is a simple hash (for development/testing)
    if (salt === 'salt123') {
      return hashed === supplied;
    }
    
    // Otherwise, use proper scrypt comparison
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    
    // Ensure both buffers are the same length before comparing
    if (hashedBuf.length !== suppliedBuf.length) {
      return false;
    }
    
    return timingSafeEqual(hashedBuf, suppliedBuf);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}

export function setupAuth(app: Express) {
  const sessionSecret = process.env.SESSION_SECRET || "soccer-hunter-secret";
  
  const sessionSettings: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MemStore({
      checkPeriod: 86400000 // Clear expired sessions every 24h
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const { username, password, email, role, fullName, phone } = req.body;
      
      if (!username || !password || !email) {
        return res.status(400).json({ message: "المعلومات مطلوبة: اسم المستخدم، كلمة المرور، البريد الإلكتروني" });
      }

      // Check if username already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "اسم المستخدم مستخدم بالفعل" });
      }

      // Create new user with hashed password
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        email,
        role: role || "user",
        fullName,
        phone
      });

      // Login the user
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Return user info without password
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error, user: DbUser, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "فشل تسجيل الدخول" });
      }
      
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Return user info without password
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "غير مصرح" });
    }
    
    // Return user info without password
    const { password, ...userWithoutPassword } = req.user as User;
    res.json(userWithoutPassword);
  });
  
  // Profile specific endpoints based on role
  app.get("/api/profile", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "غير مصرح" });
    }
    
    const user = req.user as User;
    let profile = null;
    
    try {
      switch (user.role) {
        case "club":
          profile = await storage.getClubByUserId(user.id);
          break;
        case "agent":
          profile = await storage.getAgentByUserId(user.id);
          break;
        case "doctor":
          profile = await storage.getDoctorByUserId(user.id);
          break;
        default:
          // Just return the user for other roles
          profile = user;
      }
      
      if (!profile) {
        res.status(404).json({ message: "الملف الشخصي غير موجود" });
      } else {
        res.json(profile);
      }
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ أثناء جلب الملف الشخصي" });
    }
  });
}