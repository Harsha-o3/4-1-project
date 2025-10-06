import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import AdminDashboard from '../components/Admin/AdminDashboard';
import UserManagement from '../components/Admin/UserManagement';
import SystemSettings from '../components/Admin/SystemSettings';

const AdminRoutes = () => (
  <ProtectedRoute allowedRoles={['ADMIN']}>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="appointments" element={<div>Appointment Management</div>} />
      <Route path="inventory" element={<div>System Inventory</div>} />
      <Route path="settings" element={<SystemSettings />} />
    </Routes>
  </ProtectedRoute>
);

export default AdminRoutes;
