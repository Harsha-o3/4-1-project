import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Clock, Star, Filter, Download } from 'lucide-react';

const DoctorAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('appointments');

  const analyticsData = {
    overview: {
      totalPatients: 156,
      totalAppointments: 234,
      avgRating: 4.8,
      totalRevenue: 117000,
      completionRate: 94.2,
      avgConsultationTime: 18
    },
    appointments: {
      thisMonth: 89,
      lastMonth: 76,
      growth: 17.1,
      byType: {
        video: 45,
        audio: 28,
        inPerson: 16
      },
      byStatus: {
        completed: 84,
        cancelled: 3,
        noShow: 2
      }
    },
    patients: {
      new: 23,
      returning: 66,
      ageGroups: {
        '0-18': 12,
        '19-35': 34,
        '36-50': 28,
        '51-65': 18,
        '65+': 8
      },
      conditions: [
        { name: 'Hypertension', count: 28 },
        { name: 'Diabetes', count: 22 },
        { name: 'Common Cold', count: 18 },
        { name: 'Anxiety', count: 15 },
        { name: 'Back Pain', count: 12 }
      ]
    },
    revenue: {
      thisMonth: 44500,
      lastMonth: 38200,
      growth: 16.5,
      byService: {
        consultation: 35600,
        followUp: 8900
      }
    },
    performance: {
      avgRating: 4.8,
      totalReviews: 142,
      ratingDistribution: {
        5: 89,
        4: 38,
        3: 12,
        2: 2,
        1: 1
      },
      avgResponseTime: 12,
      patientSatisfaction: 96.2
    }
  };

  const weeklyData = [
    { day: 'Mon', appointments: 12, revenue: 6000 },
    { day: 'Tue', appointments: 15, revenue: 7500 },
    { day: 'Wed', appointments: 18, revenue: 9000 },
    { day: 'Thu', appointments: 14, revenue: 7000 },
    { day: 'Fri', appointments: 16, revenue: 8000 },
    { day: 'Sat', appointments: 10, revenue: 5000 },
    { day: 'Sun', appointments: 4, revenue: 2000 }
  ];

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? '↗' : '↘';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your practice performance and patient insights</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalPatients}</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalAppointments}</p>
              <p className="text-sm text-green-600">+{analyticsData.appointments.growth}% growth</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.avgRating}</p>
              <p className="text-sm text-gray-600">{analyticsData.performance.totalReviews} reviews</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{analyticsData.revenue.thisMonth.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{analyticsData.revenue.growth}% growth</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Performance Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="appointments">Appointments</option>
              <option value="revenue">Revenue</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {weeklyData.map(day => {
              const value = selectedMetric === 'appointments' ? day.appointments : day.revenue;
              const maxValue = selectedMetric === 'appointments' ? 20 : 10000;
              const percentage = (value / maxValue) * 100;
              
              return (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-sm font-medium text-gray-900 text-right">
                    {selectedMetric === 'appointments' ? value : `₹${value}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appointment Types */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Appointment Types</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="font-medium text-gray-900">Video Consultations</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{analyticsData.appointments.byType.video}</div>
                <div className="text-sm text-gray-500">50.6%</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="font-medium text-gray-900">Audio Consultations</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{analyticsData.appointments.byType.audio}</div>
                <div className="text-sm text-gray-500">31.5%</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="font-medium text-gray-900">In-Person Visits</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{analyticsData.appointments.byType.inPerson}</div>
                <div className="text-sm text-gray-500">18.0%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Conditions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Conditions Treated</h3>
          
          <div className="space-y-4">
            {analyticsData.patients.conditions.map((condition, index) => (
              <div key={condition.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <span className="text-gray-900">{condition.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(condition.count / 30) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{condition.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Patient Age Groups</h3>
          
          <div className="space-y-4">
            {Object.entries(analyticsData.patients.ageGroups).map(([ageGroup, count]) => (
              <div key={ageGroup} className="flex items-center justify-between">
                <span className="text-gray-900">{ageGroup} years</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(count / 40) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                <span className="text-sm font-bold text-gray-900">{analyticsData.overview.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${analyticsData.overview.completionRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Patient Satisfaction</span>
                <span className="text-sm font-bold text-gray-900">{analyticsData.performance.patientSatisfaction}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${analyticsData.performance.patientSatisfaction}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Avg Consultation Time</span>
                <span className="text-sm font-bold text-gray-900">{analyticsData.overview.avgConsultationTime} min</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Avg Response Time</span>
                <span className="text-sm font-bold text-gray-900">{analyticsData.performance.avgResponseTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAnalytics;