import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import DoctorDashboard from '../components/Doctor/DoctorDashboard';
import DoctorAppointments from '../components/Doctor/DoctorAppointments';
import PatientRecords from '../components/Doctor/PatientRecords';
import DoctorAnalytics from '../components/Doctor/DoctorAnalytics';
import DoctorProfile from '../components/Doctor/DoctorProfile';

const DoctorRoutes = () => (
  <ProtectedRoute allowedRoles={['DOCTOR']}>
    <Routes>
      <Route path="/" element={<DoctorDashboard />} />
      <Route path="appointments" element={<DoctorAppointments />} />
      <Route path="patients" element={<PatientRecords />} />
      <Route path="analytics" element={<DoctorAnalytics />} />
      <Route path="profile" element={<DoctorProfile />} />
    </Routes>
  </ProtectedRoute>
);

export default DoctorRoutes;
