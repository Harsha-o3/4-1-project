# Nabha Telemedicine Platform

A comprehensive, multilingual, offline-first telemedicine platform designed for rural healthcare delivery in Nabha and surrounding villages.

## 🏥 Overview

The Nabha Telemedicine Platform is a complete end-to-end healthcare solution that connects patients, doctors, pharmacies, and administrators in a seamless digital ecosystem. Built specifically for low-bandwidth environments and rural healthcare needs.

## ✨ Key Features

### 🔐 Multi-Role Authentication
- **Patient & Pharmacy**: Phone-based OTP authentication
- **Doctor & Admin**: Email/password authentication
- JWT-based secure session management
- Role-based access control (RBAC)

### 📱 Progressive Web App (PWA)
- Offline-first architecture with service workers
- IndexedDB for local data caching
- Automatic sync when connection restored
- Mobile-responsive design optimized for 2G/3G

### 🎥 Video Consultations
- WebRTC-based video/audio calls
- Bandwidth-aware quality adjustment
- Audio-only fallback for poor connections
- Real-time chat during consultations

### 💊 Pharmacy Management
- Real-time inventory tracking
- Medicine availability API
- Low stock and expiry alerts
- Order management system

### 🤖 AI-Powered Symptom Checker
- Rule-based symptom analysis
- Age and severity-adjusted recommendations
- Emergency condition detection
- Triage and urgency classification

### 🌐 Multilingual Support
- English, Hindi, and Punjabi
- i18next internationalization
- RTL language support ready

### 📊 Admin Dashboard
- Real-time system monitoring
- User management and analytics
- Inventory alerts and reports
- Village coverage tracking

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io for WebRTC signaling
- **File Storage**: Multer for file uploads
- **Security**: Helmet, CORS, rate limiting

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **PWA**: Vite PWA plugin with Workbox
- **Offline Storage**: Dexie (IndexedDB wrapper)
- **Icons**: Lucide React

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: MySQL 8.0
- **Caching**: Redis (for sessions and queues)
- **WebRTC**: STUN/TURN server support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MySQL 8.0
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nabha-telemedicine
```

2. **Install dependencies**
```bash
# Install client dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..
```

3. **Database Setup**
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE nabha_telemed;
exit

# Copy environment file
cp server/.env.example server/.env
# Edit server/.env with your database credentials
```

4. **Initialize Database**
```bash
cd server
npm run migrate  # Create tables
npm run seed     # Insert sample data
cd ..
```

5. **Start Development Servers**
```bash
npm run dev
```

This starts both the React frontend (http://localhost:5173) and Express backend (http://localhost:5000).

## 👥 Demo Credentials

### Email/Password Login
- **Admin**: admin@nabha.health / admin123
- **Doctor**: rajesh@nabha.health / doctor123

### OTP Login (Any 6-digit code works in demo)
- **Patient**: +91-9999900001
- **Pharmacy**: +91-9999900002

## 📱 User Roles & Features

### 👤 Patient
- Book video/audio appointments
- AI-powered symptom checker
- View medical records offline
- Search nearby pharmacies
- Medication reminders

### 👨‍⚕️ Doctor
- Manage appointment schedule
- Conduct video consultations
- Access patient medical history
- Generate e-prescriptions
- Analytics dashboard

### 💊 Pharmacy
- Inventory management
- Medicine availability updates
- Order fulfillment
- Expiry date tracking
- Sales analytics

### 👨‍💼 Admin
- System monitoring dashboard
- User management
- Inventory alerts
- Village coverage reports
- System health monitoring

## 🏗 Architecture

### Database Schema
```sql
users (id, role, email, phone, name, password_hash)
├── patients (user_id, dob, gender, village, medical_info)
├── doctors (user_id, specializations, qualifications, availability)
├── pharmacies (user_id, name, license, inventory_shared)
└── appointments (patient_id, doctor_id, scheduled_time, status)
    └── consults (appointment_id, notes, prescription)

inventory_items (pharmacy_id, medicine_name, quantity, expiry_date)
audit_logs (user_id, action, timestamp)
```

### API Endpoints
```
POST /api/auth/otp/request     # Request OTP
POST /api/auth/otp/verify      # Verify OTP & login
POST /api/auth/login           # Email/password login
GET  /api/doctors/search       # Find doctors
POST /api/appointments         # Book appointment
GET  /api/pharmacy/nearby      # Find pharmacies
POST /api/symptom-checker      # Analyze symptoms
GET  /api/admin/dashboard      # Admin metrics
```

## 🔧 Configuration

### Environment Variables
```bash
# Database
DB_HOST=localhost
DB_NAME=nabha_telemed
DB_USER=root
DB_PASSWORD=your_password

# JWT Secrets
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# External Services
TWILIO_ACCOUNT_SID=your_twilio_sid
SMTP_HOST=smtp.gmail.com
TURN_SERVER_URL=turn:your-server.com:3478
```

### PWA Configuration
The app automatically caches:
- Static assets (JS, CSS, images)
- API responses (with NetworkFirst strategy)
- Offline pages and data

## 🧪 Testing

### Manual Testing Checklist
- [ ] OTP login flow for patients/pharmacies
- [ ] Email login for doctors/admins
- [ ] Video call establishment between patient-doctor
- [ ] Offline data access and sync
- [ ] Pharmacy inventory updates
- [ ] Symptom checker recommendations
- [ ] Admin dashboard metrics

### API Testing
Use the provided Postman collection or test endpoints manually:
```bash
# Health check
curl http://localhost:5000/health

# Request OTP
curl -X POST http://localhost:5000/api/auth/otp/request \
  -H "Content-Type: application/json" \
  -d '{"phone":"+91-9999999999","role":"PATIENT"}'
```

## 🚀 Deployment

### Production Build
```bash
npm run build
cd server && npm run build
```

### Docker Deployment
```bash
docker-compose up -d
```

### Environment Setup
1. Set up MySQL database
2. Configure TURN server for WebRTC
3. Set up SMS gateway (Twilio)
4. Configure email SMTP
5. Set production environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@nabha.health
- Documentation: [Wiki](../../wiki)

## 🗺 Roadmap

### Phase 2 Features
- [ ] Advanced AI triage with ML models
- [ ] Integration with state health APIs
- [ ] Call center and IVR support
- [ ] Multi-clinic and multi-tenant support
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Telemedicine claims processing

---

**Built with ❤️ for rural healthcare in Punjab, India**