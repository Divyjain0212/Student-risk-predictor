const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-risk-db';

console.log('Using MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in log

async function seedUsers() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');

    // Clear existing users
    await users.deleteMany({});

    // Hash password for demo accounts
    const hashedPassword = await bcrypt.hash('demo123', 12);

    // Demo users for each role
    const demoUsers = [
      {
        name: 'Demo Student',
        email: 'student@demo.com',
        phone: '+1234567890',
        studentId: 'student123',
        password: hashedPassword,
        role: 'student',
        department: 'Computer Science',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Demo Admin',
        email: 'admin@college.edu',
        password: hashedPassword,
        role: 'admin',
        department: 'Administration',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Demo Mentor',
        email: 'mentor@college.edu',
        password: hashedPassword,
        role: 'mentor',
        department: 'Computer Science',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Demo Counselor',
        email: 'counselor@college.edu',
        password: hashedPassword,
        role: 'counselor',
        specialization: 'Academic Stress and Career Guidance',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Additional student accounts for testing
      {
        name: 'John Doe',
        email: 'john.doe@college.edu',
        studentId: 'STU001',
        password: hashedPassword,
        role: 'student',
        department: 'Computer Science',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@college.edu',
        studentId: 'STU002',
        password: hashedPassword,
        role: 'student',
        department: 'Mathematics',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mike Johnson',
        email: 'mike.johnson@college.edu',
        phone: '+1987654321',
        studentId: 'STU003',
        password: hashedPassword,
        role: 'student',
        department: 'Physics',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Emily Chen',
        email: 'emily.chen@college.edu',
        studentId: 'STU004',
        password: hashedPassword,
        role: 'student',
        department: 'Computer Science',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert demo users
    const result = await users.insertMany(demoUsers);
    console.log(`Successfully seeded ${result.insertedCount} demo users`);

    // Log demo credentials
    console.log('\n=== DEMO CREDENTIALS ===');
    console.log('Student Demo:');
    console.log('  - Email/Phone/StudentID: student@demo.com, +1234567890, or student123');
    console.log('  - Password: demo123');
    console.log('\nAdmin Demo:');
    console.log('  - Email: admin@college.edu');
    console.log('  - Password: demo123');
    console.log('\nMentor Demo:');
    console.log('  - Email: mentor@college.edu');
    console.log('  - Password: demo123');
    console.log('\nCounselor Demo:');
    console.log('  - Email: counselor@college.edu');
    console.log('  - Password: demo123');
    console.log('========================\n');

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await client.close();
  }
}

// Run the seed function if this script is executed directly
if (require.main === module) {
  seedUsers().catch(console.error);
}

module.exports = { seedUsers };