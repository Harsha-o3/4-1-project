import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Calendar, 
  User, 
  Pill, 
  Stethoscope, 
  Settings, 
  LogOut,
  Activity,
  Users,
  Package,
  FileText,
  Phone,
  BarChart3,
  Video,
  Brain,
  Target,
  Award,
  Monitor,
  MessageSquare,
  Truck,
  TrendingUp,
  MapPin,
  TestTube,
  Shield,
  AlertTriangle
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'PATIENT':
        return [
          { icon: Home, label: 'Home', path: '/patient' },
          { icon: Video, label: 'Telehealth Hub', path: '/patient/telehealth' },
          { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
          { icon: Pill, label: 'Medications', path: '/patient/medications' },
          { icon: Stethoscope, label: 'Symptom Checker', path: '/patient/symptoms' },
          { icon: Pill, label: 'Pharmacy', path: '/patient/pharmacy' },
          { icon: FileText, label: 'My Records', path: '/patient/records' },
          { icon: TestTube, label: 'Lab Results', path: '/patient/lab-results' },
          { icon: Activity, label: 'Vital Signs', path: '/patient/vitals' },
          { icon: FileText, label: 'Prescriptions', path: '/patient/prescriptions' },
          { icon: Users, label: 'Family', path: '/patient/family' },
          { icon: Shield, label: 'Insurance', path: '/patient/insurance' },
          { icon: Brain, label: 'Health Insights', path: '/patient/insights' },
          { icon: Target, label: 'Wellness Programs', path: '/patient/wellness' },
          { icon: Award, label: 'Health Goals', path: '/patient/goals' },
          { icon: Phone, label: 'Emergency', path: '/patient/emergency' },
          { icon: User, label: 'Profile', path: '/patient/profile' }
        ];
      
      case 'DOCTOR':
        return [
          { icon: Home, label: 'Dashboard', path: '/doctor' },
          { icon: Monitor, label: 'Telehealth Console', path: '/doctor/console' },
          { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
          { icon: FileText, label: 'Consultation Notes', path: '/doctor/notes' },
          { icon: Pill, label: 'Prescriptions', path: '/doctor/prescriptions' },
          { icon: Users, label: 'Patient Records', path: '/doctor/patients' },
          { icon: FileText, label: 'Patient History', path: '/doctor/history' },
          { icon: MessageSquare, label: 'Communication', path: '/doctor/communication' },
          { icon: BarChart3, label: 'Analytics', path: '/doctor/analytics' },
          { icon: User, label: 'Profile', path: '/doctor/profile' }
        ];
      
      case 'PHARMACY':
        return [
          { icon: Home, label: 'Dashboard', path: '/pharmacy' },
          { icon: Package, label: 'Inventory', path: '/pharmacy/inventory' },
          { icon: FileText, label: 'Orders', path: '/pharmacy/orders' },
          { icon: Users, label: 'Customers', path: '/pharmacy/customers' },
          { icon: Truck, label: 'Delivery Tracking', path: '/pharmacy/delivery' },
          { icon: BarChart3, label: 'Sales Reports', path: '/pharmacy/sales' },
          { icon: AlertTriangle, label: 'Stock Alerts', path: '/pharmacy/alerts' },
          { icon: User, label: 'Profile', path: '/pharmacy/profile' }
        ];
      
      case 'ADMIN':
        return [
          { icon: Home, label: 'Dashboard', path: '/admin' },
          { icon: TrendingUp, label: 'Performance', path: '/admin/performance' },
          { icon: Users, label: 'Users', path: '/admin/users' },
          { icon: MapPin, label: 'Villages', path: '/admin/villages' },
          { icon: Calendar, label: 'Appointments', path: '/admin/appointments' },
          { icon: Package, label: 'Inventory', path: '/admin/inventory' },
          { icon: Activity, label: 'System Monitor', path: '/admin/monitoring' },
          { icon: Shield, label: 'Audit Logs', path: '/admin/audit' },
          { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' }
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white shadow-lg border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Nabha Health</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* User Info & Logout */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role.toLowerCase()}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-3 py-2 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;