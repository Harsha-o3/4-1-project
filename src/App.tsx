import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import PatientDashboard from './components/Patient/PatientDashboard';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import PharmacyDashboard from './components/Pharmacy/PharmacyDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import AppointmentBooking from './components/Patient/AppointmentBooking';
import VideoConsultation from './components/Patient/VideoConsultation';
import SymptomChecker from './components/Patient/SymptomChecker';
import PharmacySearch from './components/Patient/PharmacySearch';
import MedicalRecords from './components/Patient/MedicalRecords';
import PatientProfile from './components/Patient/PatientProfile';
import DoctorAppointments from './components/Doctor/DoctorAppointments';
import PatientRecords from './components/Doctor/PatientRecords';
import MedicationReminders from './components/Patient/MedicationReminders';
import LabResults from './components/Patient/LabResults';
import VitalSigns from './components/Patient/VitalSigns';
import Prescriptions from './components/Patient/Prescriptions';
import FamilyMembers from './components/Patient/FamilyMembers';
import InsuranceClaims from './components/Patient/InsuranceClaims';
import ConsultationNotes from './components/Doctor/ConsultationNotes';
import PrescriptionWriter from './components/Doctor/PrescriptionWriter';
import PatientHistory from './components/Doctor/PatientHistory';
import SalesReports from './components/Pharmacy/SalesReports';
import StockAlerts from './components/Pharmacy/StockAlerts';
import SystemMonitoring from './components/Admin/SystemMonitoring';
import AuditLogs from './components/Admin/AuditLogs';
import ReportsAnalytics from './components/Admin/ReportsAnalytics';

// Import additional pages
import EmergencyContacts from './components/Patient/EmergencyContacts';
import HealthMetrics from './components/Patient/HealthMetrics';
import DoctorProfile from './components/Doctor/DoctorProfile';
import DoctorAnalytics from './components/Doctor/DoctorAnalytics';
import InventoryManagement from './components/Pharmacy/InventoryManagement';
import OrderManagement from './components/Pharmacy/OrderManagement';
import UserManagement from './components/Admin/UserManagement';
import SystemSettings from './components/Admin/SystemSettings';

// Import new additional features
import TelehealthHub from './components/Patient/TelehealthHub';
import HealthInsights from './components/Patient/HealthInsights';
import WellnessPrograms from './components/Patient/WellnessPrograms';
import HealthGoals from './components/Patient/HealthGoals';
import TelehealthConsole from './components/Doctor/TelehealthConsole';
import PatientCommunication from './components/Doctor/PatientCommunication';
import CustomerManagement from './components/Pharmacy/CustomerManagement';
import DeliveryTracking from './components/Pharmacy/DeliveryTracking';
import PerformanceDashboard from './components/Admin/PerformanceDashboard';
import VillageManagement from './components/Admin/VillageManagement';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <LoginForm />;
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'PATIENT':
        return <PatientDashboard />;
      case 'DOCTOR':
        return <DoctorDashboard />;
      case 'PHARMACY':
        return <PharmacyDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return <div>Unauthorized</div>;
    }
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={getDashboardComponent()} />
        
        {/* Patient Routes */}
        <Route
          path="/patient/*"
          element={
            <ProtectedRoute allowedRoles={['PATIENT']}>
              <Routes>
                <Route index element={<PatientDashboard />} />
                <Route path="appointments" element={<AppointmentBooking />} />
                <Route path="consultation/:appointmentId" element={<VideoConsultation />} />
                <Route path="symptoms" element={<SymptomChecker />} />
                <Route path="pharmacy" element={<PharmacySearch />} />
                <Route path="records" element={<MedicalRecords />} />
                <Route path="profile" element={<PatientProfile />} />
                <Route path="emergency" element={<EmergencyContacts />} />
                <Route path="metrics" element={<HealthMetrics />} />
                <Route path="medications" element={<MedicationReminders />} />
                <Route path="lab-results" element={<LabResults />} />
                <Route path="vitals" element={<VitalSigns />} />
                <Route path="prescriptions" element={<Prescriptions />} />
                <Route path="family" element={<FamilyMembers />} />
                <Route path="insurance" element={<InsuranceClaims />} />
                <Route path="telehealth" element={<TelehealthHub />} />
                <Route path="insights" element={<HealthInsights />} />
                <Route path="wellness" element={<WellnessPrograms />} />
                <Route path="goals" element={<HealthGoals />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute allowedRoles={['DOCTOR']}>
              <Routes>
                <Route index element={<DoctorDashboard />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="patients" element={<PatientRecords />} />
                <Route path="analytics" element={<DoctorAnalytics />} />
                <Route path="profile" element={<DoctorProfile />} />
                <Route path="notes" element={<ConsultationNotes />} />
                <Route path="prescriptions" element={<PrescriptionWriter />} />
                <Route path="history" element={<PatientHistory />} />
                <Route path="console" element={<TelehealthConsole />} />
                <Route path="communication" element={<PatientCommunication />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Pharmacy Routes */}
        <Route
          path="/pharmacy/*"
          element={
            <ProtectedRoute allowedRoles={['PHARMACY']}>
              <Routes>
                <Route index element={<PharmacyDashboard />} />
                <Route path="inventory" element={<InventoryManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="profile" element={<div>Pharmacy Profile</div>} />
                <Route path="sales" element={<SalesReports />} />
                <Route path="alerts" element={<StockAlerts />} />
                <Route path="customers" element={<CustomerManagement />} />
                <Route path="delivery" element={<DeliveryTracking />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="appointments" element={<div>Appointment Management</div>} />
                <Route path="inventory" element={<div>System Inventory</div>} />
                <Route path="settings" element={<SystemSettings />} />
                <Route path="monitoring" element={<SystemMonitoring />} />
                <Route path="audit" element={<AuditLogs />} />
                <Route path="reports" element={<ReportsAnalytics />} />
                <Route path="performance" element={<PerformanceDashboard />} />
                <Route path="villages" element={<VillageManagement />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;