import React, { useState } from 'react';
import { TrendingUp, Users, Activity, Clock, BarChart3, Calendar, Target, Award } from 'lucide-react';

interface PerformanceMetric {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

const PerformanceDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('consultations');

  const performanceMetrics: PerformanceMetric[] = [
    { name: 'Total Consultations', value: '2,847', change: '+12%', trend: 'up', category: 'consultations' },
    { name: 'Patient Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up', category: 'quality' },
    { name: 'Response Time', value: '2.3 min', change: '-15%', trend: 'up', category: 'efficiency' },
    { name: 'Doctor Utilization', value: '87%', change: '+5%', trend: 'up', category: 'resources' },
    { name: 'Prescription Accuracy', value: '99.2%', change: '+0.5%', trend: 'up', category: 'quality' },
    { name: 'System Uptime', value: '99.9%', change: '+0.1%', trend: 'up', category: 'technical' }
  ];

  const consultationData = {
    daily: [45, 52, 48, 65, 78, 85, 92, 88, 76, 68, 58, 62, 71, 84],
    weekly: [320, 385, 412, 398, 445, 467, 523, 498],
    monthly: [1250, 1380, 1456, 1523, 1687, 1789, 1923, 2145, 2287, 2456, 2634, 2847]
  };

  const specialtyPerformance = [
    { name: 'General Medicine', consultations: 1250, satisfaction: 4.8, avgDuration: 18 },
    { name: 'Cardiology', consultations: 890, satisfaction: 4.9, avgDuration: 25 },
    { name: 'Pediatrics', consultations: 670, satisfaction: 4.7, avgDuration: 22 },
    { name: 'Dermatology', consultations: 450, satisfaction: 4.8, avgDuration: 15 }
  ];

  const doctorPerformance = [
    { name: 'Dr. Rajesh Kumar', consultations: 456, rating: 4.9, responseTime: '1.8 min' },
    { name: 'Dr. Priya Sharma', consultations: 398, rating: 4.8, responseTime: '2.1 min' },
    { name: 'Dr. Anjali Verma', consultations: 367, rating: 4.7, responseTime: '2.5 min' },
    { name: 'Dr. Suresh Patel', consultations: 334, rating: 4.8, responseTime: '2.0 min' }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Dashboard</h1>
            <p className="text-gray-600">Monitor system performance and key metrics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {performanceMetrics.map(metric => (
          <div key={metric.name} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-1">{metric.name}</p>
              <p className="text-xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <div className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                {getTrendIcon(metric.trend)} {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Consultation Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Consultation Trends</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="consultations">Consultations</option>
              <option value="revenue">Revenue</option>
              <option value="patients">New Patients</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-1">
            {consultationData.monthly.slice(-12).map((value, index) => {
              const maxValue = Math.max(...consultationData.monthly);
              const height = (value / maxValue) * 100;
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-6 transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${height}%` }}
                    title={`${value} consultations`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(2024, index, 1).toLocaleDateString('en', { month: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specialty Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Specialty Performance</h3>
          
          <div className="space-y-4">
            {specialtyPerformance.map(specialty => (
              <div key={specialty.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{specialty.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{specialty.consultations} consultations</span>
                    <span>★ {specialty.satisfaction}</span>
                    <span>{specialty.avgDuration}m avg</span>
                  </div>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(specialty.consultations / 1500) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Doctors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Doctors</h3>
          
          <div className="space-y-4">
            {doctorPerformance.map((doctor, index) => (
              <div key={doctor.name} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{doctor.consultations} consultations</span>
                    <span>★ {doctor.rating}</span>
                    <span>{doctor.responseTime} response</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(doctor.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">System Health</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">API Response Time</span>
              </div>
              <span className="text-green-600 font-semibold">142ms</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Database Performance</span>
              </div>
              <span className="text-green-600 font-semibold">Optimal</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">WebRTC Quality</span>
              </div>
              <span className="text-green-600 font-semibold">HD</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-gray-900">SMS Gateway</span>
              </div>
              <span className="text-yellow-600 font-semibold">Limited</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Server Uptime</span>
              </div>
              <span className="text-green-600 font-semibold">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;