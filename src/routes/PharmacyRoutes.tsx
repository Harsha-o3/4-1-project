import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import PharmacyDashboard from '../components/Pharmacy/PharmacyDashboard';
import InventoryManagement from '../components/Pharmacy/InventoryManagement';
import OrderManagement from '../components/Pharmacy/OrderManagement';

const PharmacyRoutes = () => (
  <ProtectedRoute allowedRoles={['PHARMACY']}>
    <Routes>
      <Route path="/" element={<PharmacyDashboard />} />
      <Route path="inventory" element={<InventoryManagement />} />
      <Route path="orders" element={<OrderManagement />} />
      <Route path="profile" element={<div>Pharmacy Profile</div>} />
    </Routes>
  </ProtectedRoute>
);

export default PharmacyRoutes;
