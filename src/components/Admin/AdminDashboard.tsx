import React from 'react';
import { Users, Calendar, Package, Activity, TrendingUp, AlertCircle, MapPin, Clock } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Administration</h1>
        <p className="text-gray-600">Monitor and manage the Nabha Health platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-sm text-green-600">↗ +12% this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Consultations</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-green-600">↗ +8% vs yesterday</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Doctors</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-blue-600">18 online now</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pharmacies</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-orange-600">23 stock alerts</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/admin/performance')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
            >
              <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
              <h4 className="font-medium text-gray-900">Performance</h4>
              <p className="text-sm text-gray-600">View metrics</p>
            </button>
            
            <button
              onClick={() => navigate('/admin/villages')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
            >
              <MapPin className="w-8 h-8 text-green-600 mb-2" />
              <h4 className="font-medium text-gray-900">Villages</h4>
              <p className="text-sm text-gray-600">Manage coverage</p>
            </button>
            
            <button
              onClick={() => navigate('/admin/users')}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
            >
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <h4 className="font-medium text-gray-900">User Management</h4>
              <p className="text-sm text-gray-600">Manage accounts</p>
            </button>
            
            <button
              onClick={() => navigate('/admin/monitoring')}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left"
            >
              <Activity className="w-8 h-8 text-orange-600 mb-2" />
              <h4 className="font-medium text-gray-900">System Monitor</h4>
              <p className="text-sm text-gray-600">Check health</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Real-time Activity</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New appointment booked</p>
                <p className="text-sm text-gray-600">Patient Ram Singh with Dr. Rajesh Kumar</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New patient registered</p>
                <p className="text-sm text-gray-600">Priya Kaur from Village Bhundri</p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                <p className="text-sm text-gray-600">Nabha Medical Store - Amoxicillin low</p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Consultation completed</p>
                <p className="text-sm text-gray-600">Dr. Priya Sharma with patient Amrit Singh</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Pharmacy order fulfilled</p>
                <p className="text-sm text-gray-600">Civil Hospital Pharmacy - Order #1234</p>
                <p className="text-xs text-gray-500">20 minutes ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Health & Alerts - moved to bottom */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          {/* System Health */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Response Time</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">142ms</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">WebRTC Server</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SMS Gateway</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-yellow-600">Limited</span>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Alerts</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-900">High Priority</span>
                </div>
                <p className="text-sm text-red-800">3 pharmacies out of essential medicines</p>
                <p className="text-xs text-red-600">Requires immediate attention</p>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Medium Priority</span>
                </div>
                <p className="text-sm text-orange-800">Doctor availability low for tomorrow</p>
                <p className="text-xs text-orange-600">Schedule optimization needed</p>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Info</span>
                </div>
                <p className="text-sm text-yellow-800">Patient registrations up 25%</p>
                <p className="text-xs text-yellow-600">Consider scaling resources</p>
              </div>
            </div>
          </div>

          {/* Village Coverage */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Village Coverage</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-900">Nabha</span>
                </div>
                <span className="text-sm font-medium text-green-600">100%</span>
              </div>
              
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-900">Bhundri</span>
                </div>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
              
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-900">Sidhwan Bet</span>
                </div>
                <span className="text-sm font-medium text-yellow-600">78%</span>
              </div>
              
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-900">Remote Villages</span>
                </div>
                <span className="text-sm font-medium text-red-600">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;