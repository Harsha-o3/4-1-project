import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navigation from './Navigation';
import OfflineIndicator from '../Common/OfflineIndicator';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 ml-64">
        {/* Offline Indicator */}
        <OfflineIndicator />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;