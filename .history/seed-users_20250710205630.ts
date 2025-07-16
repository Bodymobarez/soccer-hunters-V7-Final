import Database from 'better-sqlite3';
import * as bcrypt from 'bcrypt';

// Connect to the database
const db = new Database('./database.sqlite');

// Create a test user
const hashedPassword = bcrypt.hashSync('password123', 10);

const insertUser = db.prepare(`
  INSERT INTO users (username, password, email, role, full_name, verified, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

try {
  const result = insertUser.run(
    'testuser',
    hashedPassword,
    'test@example.com',
    'user',
    'Test User',
    0, // false in SQLite
    Date.now()
  );
  
  console.log('Test user created successfully with ID:', result.lastInsertRowid);
} catch (error) {
  console.log('User might already exist or error occurred:', error.message);
}

// Also create an admin user
try {
  const adminResult = insertUser.run(
    'admin',
    hashedPassword,
    'admin@example.com',
    'admin',
    'Admin User',
    1, // true in SQLite
    Date.now()
  );
  
  console.log('Admin user created successfully with ID:', adminResult.lastInsertRowid);
} catch (error) {
  console.log('Admin user might already exist or error occurred:', error.message);
}

db.close();
console.log('Database seeding completed!');
