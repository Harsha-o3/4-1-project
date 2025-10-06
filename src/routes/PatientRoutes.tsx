import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import PatientDashboard from '../components/Patient/PatientDashboard';
import AppointmentBooking from '../components/Patient/AppointmentBooking';
import VideoConsultation from '../components/Patient/VideoConsultation';
import SymptomChecker from '../components/Patient/SymptomChecker';
import PharmacySearch from '../components/Patient/PharmacySearch';
import MedicalRecords from '../components/Patient/MedicalRecords';
import PatientProfile from '../components/Patient/PatientProfile';
import EmergencyContacts from '../components/Patient/EmergencyContacts';
import HealthMetrics from '../components/Patient/HealthMetrics';

const PatientRoutes = () => (
  <ProtectedRoute allowedRoles={['PATIENT']}>
    <Routes>
      <Route path="/" element={<PatientDashboard />} />
      <Route path="appointments" element={<AppointmentBooking />} />
      <Route path="consultation/:appointmentId" element={<VideoConsultation />} />
      <Route path="symptoms" element={<SymptomChecker />} />
      <Route path="pharmacy" element={<PharmacySearch />} />
      <Route path="records" element={<MedicalRecords />} />
      <Route path="profile" element={<PatientProfile />} />
      <Route path="emergency" element={<EmergencyContacts />} />
      <Route path="metrics" element={<HealthMetrics />} />
    </Routes>
  </ProtectedRoute>
);

export default PatientRoutes;
