import sequelize from './connection.js';

// Import all models so associations are registered
import '../models/User.js';
import '../models/Patient.js';
import '../models/Doctor.js';
import '../models/Pharmacy.js';
import '../models/Appointment.js';
import '../models/InventoryItem.js';

async function migrate() {
  try {
    console.log('🔄 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    console.log('🔄 Creating/updating database tables...');

    // ⚠️ Use { force: false } to avoid duplicate keys
    // If you *must* update schema, use proper migrations instead of alter:true
    await sequelize.sync();

    console.log('✅ Database tables created/updated successfully.');
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

migrate();
