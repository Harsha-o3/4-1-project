import React from 'react';
import { Calendar, Users, Clock, Activity, Video, Phone, MessageSquare } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning, Dr. Kumar!</h1>
        <p className="text-gray-600">You have 8 appointments scheduled today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Patients This Week</p>
              <p className="text-2xl font-bold text-gray-900">32</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Consultation</p>
              <p className="text-2xl font-bold text-gray-900">18m</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Patient Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>

          <div className="space-y-4">
            {/* Current Appointment */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-700">RS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ram Singh</h4>
                    <p className="text-sm text-gray-600">General Consultation</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">CURRENT</p>
                  <p className="text-sm text-gray-500">10:30 - 11:00 AM</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                  <Video className="w-4 h-4" />
                  <span>Join Video</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">PK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Priya Kaur</h4>
                    <p className="text-sm text-gray-600">Follow-up • Diabetes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">NEXT</p>
                  <p className="text-sm text-gray-500">11:00 - 11:30 AM</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">AK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Amrit Kumar</h4>
                    <p className="text-sm text-gray-600">New Patient • Hypertension</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">UPCOMING</p>
                  <p className="text-sm text-gray-500">11:30 AM - 12:00 PM</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">MS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Manpreet Sidhu</h4>
                    <p className="text-sm text-gray-600">Telemedicine • Joint Pain</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">UPCOMING</p>
                  <p className="text-sm text-gray-500">2:00 - 2:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/doctor/console')}
                className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <Video className="w-5 h-5" />
                <span>Telehealth Console</span>
              </button>
              <button 
                onClick={() => navigate('/doctor/appointments')}
                className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span>View Schedule</span>
              </button>
              <button 
                onClick={() => navigate('/doctor/patients')}
                className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Patient Records</span>
              </button>
              <button 
                onClick={() => navigate('/doctor/communication')}
                className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
              </button>
              <button 
                onClick={() => navigate('/doctor/analytics')}
                className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <Activity className="w-5 h-5" />
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-700">JK</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Jaskiran Kaur</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-green-700">SS</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sukhwinder Singh</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-purple-700">RK</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Rajwinder Kaur</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;