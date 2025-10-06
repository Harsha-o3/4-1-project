import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Stethoscope, Pill, FileText, AlertCircle, Clock } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Manage your health appointments and records</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          onClick={() => navigate('/patient/telehealth')}
          className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Telehealth Hub</h3>
              <p className="text-sm opacity-90">Start consultation</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/patient/appointments')}
          className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Book Appointment</h3>
              <p className="text-sm opacity-90">Schedule consultation</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/patient/symptoms')}
          className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">AI Symptom Checker</h3>
              <p className="text-sm opacity-90">Instant health insights</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/patient/insights')}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Health Insights</h3>
              <p className="text-sm opacity-90">AI-powered analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div
          onClick={() => navigate('/patient/wellness')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Wellness</h3>
          </div>
        </div>

        <div
          onClick={() => navigate('/patient/goals')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Goals</h3>
          </div>
        </div>

        <div
          onClick={() => navigate('/patient/pharmacy')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Pill className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Pharmacy</h3>
          </div>
        </div>

        <div
          onClick={() => navigate('/patient/records')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Records</h3>
          </div>
        </div>

        <div
          onClick={() => navigate('/patient/vitals')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Activity className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Vitals</h3>
          </div>
        </div>

        <div
          onClick={() => navigate('/patient/family')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Family</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">View All</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Dr. Rajesh Kumar</p>
                <p className="text-sm text-gray-500">General Medicine</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Today</p>
                <p className="text-sm text-gray-500">2:30 PM</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Dr. Priya Sharma</p>
                <p className="text-sm text-gray-500">Cardiology</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Tomorrow</p>
                <p className="text-sm text-gray-500">10:00 AM</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/patient/appointments')}
            className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book New Appointment
          </button>
        </div>

        {/* Health Reminders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Health Reminders</h3>
            <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Manage</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <Pill className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Medication Due</p>
                <p className="text-sm text-gray-500">Metformin 500mg - Evening dose</p>
              </div>
              <div className="flex items-center space-x-1 text-yellow-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">7:00 PM</span>
              </div>
            </div>

            <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Lab Test Overdue</p>
                <p className="text-sm text-gray-500">Blood sugar monitoring</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-red-600">3 days overdue</span>
              </div>
            </div>

            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <Stethoscope className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Health Checkup</p>
                <p className="text-sm text-gray-500">Annual physical exam due</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-green-600">Next month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Stats */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Health Data</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">120/80</div>
            <div className="text-sm text-gray-600">Blood Pressure</div>
            <div className="text-xs text-gray-500">2 days ago</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">98.6°F</div>
            <div className="text-sm text-gray-600">Temperature</div>
            <div className="text-xs text-gray-500">Today</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">95</div>
            <div className="text-sm text-gray-600">Blood Sugar</div>
            <div className="text-xs text-gray-500">5 hours ago</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">72</div>
            <div className="text-sm text-gray-600">Heart Rate</div>
            <div className="text-xs text-gray-500">Just now</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;