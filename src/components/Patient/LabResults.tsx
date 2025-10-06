import React, { useState } from 'react';
import { TestTube, Download, Calendar, TrendingUp, TrendingDown, AlertCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface LabResult {
  id: string;
  testName: string;
  category: string;
  date: string;
  doctor: string;
  status: 'normal' | 'abnormal' | 'critical';
  results: TestParameter[];
  notes?: string;
  reportUrl?: string;
}

interface TestParameter {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
}

const LabResults: React.FC = () => {
  const [results, setResults] = useState<LabResult[]>([
    {
      id: '1',
      testName: 'Complete Blood Count (CBC)',
      category: 'Hematology',
      date: '2024-01-15',
      doctor: 'Dr. Rajesh Kumar',
      status: 'normal',
      results: [
        { name: 'Hemoglobin', value: '13.5', unit: 'g/dL', referenceRange: '12-16', status: 'normal' },
        { name: 'WBC Count', value: '7200', unit: '/μL', referenceRange: '4000-11000', status: 'normal' },
        { name: 'Platelet Count', value: '250000', unit: '/μL', referenceRange: '150000-450000', status: 'normal' }
      ],
      notes: 'All parameters within normal limits'
    },
    {
      id: '2',
      testName: 'Lipid Profile',
      category: 'Biochemistry',
      date: '2024-01-10',
      doctor: 'Dr. Priya Sharma',
      status: 'abnormal',
      results: [
        { name: 'Total Cholesterol', value: '220', unit: 'mg/dL', referenceRange: '<200', status: 'high' },
        { name: 'HDL Cholesterol', value: '45', unit: 'mg/dL', referenceRange: '>40', status: 'normal' },
        { name: 'LDL Cholesterol', value: '150', unit: 'mg/dL', referenceRange: '<100', status: 'high' },
        { name: 'Triglycerides', value: '180', unit: 'mg/dL', referenceRange: '<150', status: 'high' }
      ],
      notes: 'Elevated cholesterol levels. Dietary modifications recommended.'
    }
  ]);

  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const categories = ['Hematology', 'Biochemistry', 'Microbiology', 'Immunology', 'Pathology'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'abnormal': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getParameterColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'high': return 'text-red-600';
      case 'low': return 'text-blue-600';
      case 'critical': return 'text-red-800';
      default: return 'text-gray-600';
    }
  };

  const downloadReport = (result: LabResult) => {
    toast.success(`Downloading ${result.testName} report`);
  };

  const filteredResults = results.filter(result => {
    const matchesCategory = !filterCategory || result.category === filterCategory;
    const matchesStatus = !filterStatus || result.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab Results</h1>
        <p className="text-gray-600">View and track your laboratory test results</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
            <option value="critical">Critical</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Total Results: {filteredResults.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.map(result => (
            <div
              key={result.id}
              onClick={() => setSelectedResult(result)}
              className={`bg-white p-4 rounded-xl shadow-sm border cursor-pointer transition-colors ${
                selectedResult?.id === result.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TestTube className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{result.testName}</h3>
                    <p className="text-sm text-gray-600">{result.category}</p>
                    <p className="text-sm text-gray-500">Dr. {result.doctor}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(result.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(result.status)}`}>
                    {result.status.toUpperCase()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadReport(result);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Result Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedResult ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedResult.testName}</h2>
                  <p className="text-gray-600">{selectedResult.category}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(selectedResult.status)}`}>
                  {selectedResult.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-2 text-gray-900">{new Date(selectedResult.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Doctor:</span>
                    <span className="ml-2 text-gray-900">{selectedResult.doctor}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Test Parameters</h3>
                  <div className="space-y-3">
                    {selectedResult.results.map((param, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{param.name}</h4>
                          <p className="text-sm text-gray-500">Reference: {param.referenceRange} {param.unit}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getParameterColor(param.status)}`}>
                            {param.value} {param.unit}
                          </p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            param.status === 'normal' ? 'bg-green-100 text-green-800' :
                            param.status === 'high' ? 'bg-red-100 text-red-800' :
                            param.status === 'low' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {param.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedResult.notes && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Doctor's Notes</h4>
                    <p className="text-yellow-800">{selectedResult.notes}</p>
                  </div>
                )}

                <button
                  onClick={() => downloadReport(selectedResult)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Report</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Lab Result</h3>
              <p className="text-gray-500">Choose a lab result from the list to view detailed parameters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabResults;