// Mock API for deployment testing
// This is a temporary solution until a proper backend is deployed

const MOCK_USERS = [
  {
    id: 1,
    username: "yasser",
    password: "Yasser@123",
    role: "admin",
    email: "yasser@example.com",
    fullName: "ياسر العربي",
    phone: null,
    profileImage: null,
    verified: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    username: "sportmanager",
    password: "password123",
    role: "user",
    email: "manager@example.com",
    phone: "+966500000000",
    fullName: null,
    profileImage: null,
    verified: false,
    createdAt: new Date().toISOString()
  }
];

class MockAuth {
  private currentUser: any = null;

  async login(username: string, password: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      this.currentUser = userWithoutPassword;
      
      // Clear logout flag on successful login
      sessionStorage.removeItem('justLoggedOut');
      
      localStorage.setItem('mockUser', JSON.stringify(userWithoutPassword));
      console.log("✅ MockAuth: Login successful, logout flag cleared");
      return userWithoutPassword;
    }
    throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
  }

  async getCurrentUser() {
    const stored = localStorage.getItem('mockUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    return null;
  }

  async logout() {
    this.currentUser = null;
    
    // Set logout flag FIRST
    sessionStorage.setItem('justLoggedOut', 'true');
    
    // Clear all authentication-related data from localStorage
    const authKeys = ['mockUser', 'token', 'user', 'authToken', 'session', 'userData'];
    
    authKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear entire localStorage for good measure
    localStorage.clear();
    
    // Restore logout flag (in case clear() removed it from sessionStorage)
    sessionStorage.setItem('justLoggedOut', 'true');
    
    console.log("🧹 MockAuth: All storage cleared, logout flag set");
  }

  async register(userData: any) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if username exists
    if (MOCK_USERS.find(u => u.username === userData.username)) {
      throw new Error("اسم المستخدم مستخدم بالفعل");
    }

    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData,
      verified: false,
      createdAt: new Date().toISOString()
    };

    const { password: _, ...userWithoutPassword } = newUser;
    this.currentUser = userWithoutPassword;
    
    // Clear logout flag on successful registration
    sessionStorage.removeItem('justLoggedOut');
    
    localStorage.setItem('mockUser', JSON.stringify(userWithoutPassword));
    console.log("✅ MockAuth: Registration successful, logout flag cleared");
    return userWithoutPassword;
  }
}

export const mockAuth = new MockAuth();
