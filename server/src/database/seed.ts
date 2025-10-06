import sequelize from './connection.js';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Pharmacy from '../models/Pharmacy.js';
import InventoryItem from '../models/InventoryItem.js';
import { v4 as uuidv4 } from 'uuid';
// Add other models if needed


async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create Admin user (upsert)
    const [adminUser] = await User.findOrCreate({
      where: { email: 'admin@nabha.health' },
      defaults: {
        id: uuidv4(),
        name: 'System Admin',
        email: 'admin@nabha.health',
        passwordHash: 'admin123',
        role: 'ADMIN',
        phone: null,
        meta: null
      }
    });

    // Create Doctor user and Doctor profile (upsert)
    const [doctorUser] = await User.findOrCreate({
      where: { email: 'rajesh@nabha.health' },
      defaults: {
        id: uuidv4(),
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh@nabha.health',
        passwordHash: 'doctor123',
        role: 'DOCTOR',
        phone: '+91-9999900003',
        meta: null
      }
    });
    await Doctor.findOrCreate({
      where: { userId: doctorUser.get('id') || doctorUser.id },
      defaults: {
        id: uuidv4(),
        userId: doctorUser.get('id') || doctorUser.id,
        regNo: 'MED001',
        specializations: ['General Medicine', 'Internal Medicine'],
        qualifications: 'MBBS, MD',
        languages: ['en', 'hi', 'pa'],
        meta: null
      }
    });

    // Create Patient user and Patient profile (upsert)
    const [patientUser] = await User.findOrCreate({
      where: { phone: '+91-9999900001', role: 'PATIENT' },
      defaults: {
        id: uuidv4(),
        name: 'Ram Singh',
        email: null,
        passwordHash: null,
        role: 'PATIENT',
        phone: '+91-9999900001',
        meta: null
      }
    });
    await Patient.findOrCreate({
      where: { userId: patientUser.get('id') || patientUser.id },
      defaults: {
        id: uuidv4(),
        userId: patientUser.get('id') || patientUser.id,
        dob: new Date('1985-06-15'),
        gender: 'Male',
        village: 'Nabha',
        address: 'Main Street, Nabha',
        bloodGroup: 'B+',
        meta: null
      }
    });

    // Create Pharmacy user and Pharmacy profile (upsert)
    const [pharmacyUser] = await User.findOrCreate({
      where: { phone: '+91-9999900002', role: 'PHARMACY' },
      defaults: {
        id: uuidv4(),
        name: 'Nabha Medical Store',
        email: null,
        passwordHash: null,
        role: 'PHARMACY',
        phone: '+91-9999900002',
        meta: null
      }
    });
    const [pharmacy] = await Pharmacy.findOrCreate({
      where: { userId: pharmacyUser.get('id') || pharmacyUser.id },
      defaults: {
        id: uuidv4(),
        userId: pharmacyUser.get('id') || pharmacyUser.id,
        name: 'Nabha Medical Store',
        licenseNo: 'PH001',
        address: 'Civil Lines, Nabha',
        contactNumber: '+91-9999900002',
        openingHours: {
          monday: '9:00-21:00',
          tuesday: '9:00-21:00',
          wednesday: '9:00-21:00',
          thursday: '9:00-21:00',
          friday: '9:00-21:00',
          saturday: '9:00-21:00',
          sunday: '10:00-20:00'
        },
        meta: null
      }
    });

    // Create sample inventory items for pharmacy (upsert)
    const medicines = [
      { name: 'Paracetamol 500mg', brand: 'Crocin', price: 25.00, quantity: 100 },
      { name: 'Amoxicillin 500mg', brand: 'Amoxil', price: 80.00, quantity: 50 },
      { name: 'Omeprazole 20mg', brand: 'Omez', price: 120.00, quantity: 30 },
      { name: 'Cetirizine 10mg', brand: 'Zyrtec', price: 45.00, quantity: 75 },
      { name: 'Metformin 500mg', brand: 'Glycomet', price: 65.00, quantity: 200 }
    ];
    const pharmacyId = pharmacy.get('id') || pharmacy.id;
    for (const medicine of medicines) {
      await InventoryItem.findOrCreate({
        where: {
          pharmacyId: pharmacyId,
          medicineName: medicine.name,
          brand: medicine.brand
        },
        defaults: {
          id: uuidv4(),
          pharmacyId: pharmacyId,
          medicineName: medicine.name,
          brand: medicine.brand,
          price: medicine.price,
          quantity: medicine.quantity,
          batchNo: `B${Math.floor(Math.random() * 10000)}`,
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          meta: null
        }
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log('\nDemo credentials:');
    console.log('Admin: admin@nabha.health / admin123');
    console.log('Doctor: rajesh@nabha.health / doctor123');
    console.log('Patient: +91-9999900001 (OTP: any 6 digits for demo)');
    console.log('Pharmacy: +91-9999900002 (OTP: any 6 digits for demo)');

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  } finally {
    await sequelize.close();
  }
}

seed();