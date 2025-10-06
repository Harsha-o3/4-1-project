import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Users, Activity, TrendingUp, FileText, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReportData {
  period: string;
  consultations: number;
  newPatients: number;
  revenue: number;
  prescriptions: number;
  pharmacyOrders: number;
}

const ReportsAnalytics: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const reportTypes = [
    { id: 'overview', name: 'System Overview', icon: BarChart3 },
    { id: 'consultations', name: 'Consultations Report', icon: Activity },
    { id: 'patients', name: 'Patient Analytics', icon: Users },
    { id: 'pharmacy', name: 'Pharmacy Report', icon: FileText },
    { id: 'financial', name: 'Financial Report', icon: TrendingUp }
  ];

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const mockData: ReportData[] = [
    { period: '2024-01', consultations: 234, newPatients: 45, revenue: 117000, prescriptions: 189, pharmacyOrders: 156 },
    { period: '2023-12', consultations: 198, newPatients: 38, revenue: 99000, prescriptions: 167, pharmacyOrders: 134 },
    { period: '2023-11', consultations: 176, newPatients: 42, revenue: 88000, prescriptions: 145, pharmacyOrders: 123 }
  ];

  const consultationData = {
    byType: {
      video: 145,
      audio: 67,
      inPerson: 22
    },
    bySpecialty: [
      { name: 'General Medicine', count: 89 },
      { name: 'Cardiology', count: 45 },
      { name: 'Pediatrics', count: 34 },
      { name: 'Dermatology', count: 28 },
      { name: 'Gynecology', count: 22 }
    ],
    byOutcome: {
      completed: 198,
      cancelled: 12,
      noShow: 8
    }
  };

  const patientData = {
    demographics: {
      ageGroups: {
        '0-18': 23,
        '19-35': 67,
        '36-50': 89,
        '51-65': 45,
        '65+': 32
      },
      gender: {
        male: 134,
        female: 122
      },
      villages: [
        { name: 'Nabha', count: 89 },
        { name: 'Bhundri', count: 67 },
        { name: 'Sidhwan Bet', count: 45 },
        { name: 'Patran', count: 34 },
        { name: 'Others', count: 21 }
      ]
    },
    conditions: [
      { name: 'Hypertension', count: 45 },
      { name: 'Diabetes', count: 38 },
      { name: 'Respiratory Issues', count: 29 },
      { name: 'Cardiac Issues', count: 23 },
      { name: 'Digestive Issues', count: 18 }
    ]
  };

  const generateReport = () => {
    let content = '';
    
    switch (selectedReport) {
      case 'overview':
        content = `SYSTEM OVERVIEW REPORT\n\n`;
        content += `Period: ${selectedPeriod}\n`;
        content += `Generated: ${new Date().toLocaleString()}\n\n`;
        content += `SUMMARY:\n`;
        content += `Total Consultations: ${mockData[0].consultations}\n`;
        content += `New Patients: ${mockData[0].newPatients}\n`;
        content += `Total Revenue: ₹${mockData[0].revenue.toLocaleString()}\n`;
        content += `Prescriptions Issued: ${mockData[0].prescriptions}\n`;
        content += `Pharmacy Orders: ${mockData[0].pharmacyOrders}\n`;
        break;
        
      case 'consultations':
        content = `CONSULTATIONS REPORT\n\n`;
        content += `Period: ${selectedPeriod}\n\n`;
        content += `BY TYPE:\n`;
        content += `Video Consultations: ${consultationData.byType.video}\n`;
        content += `Audio Consultations: ${consultationData.byType.audio}\n`;
        content += `In-Person Visits: ${consultationData.byType.inPerson}\n\n`;
        content += `BY SPECIALTY:\n`;
        consultationData.bySpecialty.forEach(spec => {
          content += `${spec.name}: ${spec.count}\n`;
        });
        break;
        
      case 'patients':
        content = `PATIENT ANALYTICS REPORT\n\n`;
        content += `Period: ${selectedPeriod}\n\n`;
        content += `DEMOGRAPHICS:\n`;
        Object.entries(patientData.demographics.ageGroups).forEach(([age, count]) => {
          content += `Age ${age}: ${count} patients\n`;
        });
        content += `\nTOP CONDITIONS:\n`;
        patientData.conditions.forEach(condition => {
          content += `${condition.name}: ${condition.count} cases\n`;
        });
        break;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReport}_report_${selectedPeriod}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Report generated and downloaded');
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Total Consultations</h4>
                <p className="text-2xl font-bold text-blue-600">{mockData[0].consultations}</p>
                <p className="text-sm text-blue-700">+18% from last period</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">New Patients</h4>
                <p className="text-2xl font-bold text-green-600">{mockData[0].newPatients}</p>
                <p className="text-sm text-green-700">+12% from last period</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Total Revenue</h4>
                <p className="text-2xl font-bold text-purple-600">₹{mockData[0].revenue.toLocaleString()}</p>
                <p className="text-sm text-purple-700">+15% from last period</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Monthly Trend</h4>
              <div className="h-32 flex items-end justify-between space-x-2">
                {mockData.reverse().map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-blue-600 rounded-t w-8"
                      style={{ height: `${(data.consultations / 250) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">{data.period.split('-')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'consultations':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Video Consultations</h4>
                <p className="text-2xl font-bold text-blue-600">{consultationData.byType.video}</p>
                <p className="text-sm text-blue-700">62% of total</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Audio Consultations</h4>
                <p className="text-2xl font-bold text-green-600">{consultationData.byType.audio}</p>
                <p className="text-sm text-green-700">29% of total</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">In-Person Visits</h4>
                <p className="text-2xl font-bold text-purple-600">{consultationData.byType.inPerson}</p>
                <p className="text-sm text-purple-700">9% of total</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">Consultations by Specialty</h4>
              <div className="space-y-3">
                {consultationData.bySpecialty.map(specialty => (
                  <div key={specialty.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">{specialty.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(specialty.count / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{specialty.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'patients':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Patient Demographics - Age Groups</h4>
              <div className="space-y-3">
                {Object.entries(patientData.demographics.ageGroups).map(([ageGroup, count]) => (
                  <div key={ageGroup} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">{ageGroup} years</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(count / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">Top Medical Conditions</h4>
              <div className="space-y-3">
                {patientData.conditions.map(condition => (
                  <div key={condition.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">{condition.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${(condition.count / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{condition.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Report Data</h3>
            <p className="text-gray-500">Select a report type to view detailed analytics.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Generate comprehensive reports and analyze system performance</p>
          </div>
          <button
            onClick={generateReport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Types Sidebar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Types</h2>
          <div className="space-y-2">
            {reportTypes.map(report => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedReport === report.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <report.icon className="w-5 h-5" />
                <span className="text-sm">{report.name}</span>
              </button>
            ))}
          </div>

          {/* Period Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Time Period</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>

            {selectedPeriod === 'custom' && (
              <div className="mt-3 space-y-2">
                <input
                  type="date"
                  value={customDateRange.startDate}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={customDateRange.endDate}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {reportTypes.find(r => r.id === selectedReport)?.name}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Period: {periods.find(p => p.value === selectedPeriod)?.label}</span>
            </div>
          </div>

          {renderReportContent()}
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;