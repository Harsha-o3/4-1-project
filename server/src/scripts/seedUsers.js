const bcrypt = require('bcryptjs');
const { User, Doctor } = require('../models/index.js');

async function seedUsers() {
  try {
    console.log('🌱 Seeding users...');

    // Create Admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      email: 'admin@nabhahealth.com',
      passwordHash: adminPassword,
      name: 'System Administrator',
      role: 'ADMIN'
    });
    console.log('✅ Admin user created:', admin.email);

    // Create Doctor user
    const doctorPassword = await bcrypt.hash('doctor123', 10);
    const doctor = await User.create({
      email: 'doctor@nabhahealth.com',
      passwordHash: doctorPassword,
      name: 'Dr. Rajesh Kumar',
      role: 'DOCTOR'
    });

    // Create Doctor profile
    await Doctor.create({
      userId: doctor.id,
      regNo: 'DR001',
      specializations: ['General Medicine', 'Cardiology'],
      qualifications: 'MBBS, MD (Cardiology)',
      languages: ['English', 'Hindi', 'Punjabi'],
      available: true,
      telemedicineEnabled: true
    });
    console.log('✅ Doctor user created:', doctor.email);

    // Create another Doctor
    const doctor2Password = await bcrypt.hash('doctor456', 10);
    const doctor2 = await User.create({
      email: 'priya@nabhahealth.com',
      passwordHash: doctor2Password,
      name: 'Dr. Priya Sharma',
      role: 'DOCTOR'
    });

    await Doctor.create({
      userId: doctor2.id,
      regNo: 'DR002',
      specializations: ['Pediatrics', 'General Medicine'],
      qualifications: 'MBBS, MD (Pediatrics)',
      languages: ['English', 'Hindi'],
      available: true,
      telemedicineEnabled: true
    });
    console.log('✅ Doctor user created:', doctor2.email);

    console.log('🎉 All users seeded successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('Admin: admin@nabhahealth.com / admin123');
    console.log('Doctor: doctor@nabhahealth.com / doctor123');
    console.log('Doctor: priya@nabhahealth.com / doctor456');

  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
}

// Run if called directly
if (require.main === module) {
  seedUsers().then(() => process.exit(0));
}

module.exports = { seedUsers };

