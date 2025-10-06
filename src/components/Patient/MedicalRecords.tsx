import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Calendar, User, Pill, TestTube, Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface MedicalRecord {
  id: string;
  type: 'consultation' | 'prescription' | 'lab_result' | 'vital_signs';
  title: string;
  date: string;
  doctor: string;
  content: any;
  attachments?: string[];
}

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockRecords: MedicalRecord[] = [
    {
      id: '1',
      type: 'consultation',
      title: 'General Consultation',
      date: '2024-01-15',
      doctor: 'Dr. Rajesh Kumar',
      content: {
        symptoms: ['Fever', 'Headache', 'Body aches'],
        diagnosis: 'Viral Fever',
        notes: 'Patient presented with fever and body aches for 2 days. Vital signs stable. Prescribed rest and symptomatic treatment.',
        recommendations: ['Rest for 3-4 days', 'Increase fluid intake', 'Monitor temperature']
      }
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Prescription - Viral Fever',
      date: '2024-01-15',
      doctor: 'Dr. Rajesh Kumar',
      content: {
        medications: [
          { name: 'Paracetamol 500mg', dosage: '1 tablet twice daily', duration: '5 days' },
          { name: 'Cetirizine 10mg', dosage: '1 tablet at bedtime', duration: '3 days' }
        ],
        instructions: 'Take medications after meals. Complete the course even if symptoms improve.'
      }
    },
    {
      id: '3',
      type: 'lab_result',
      title: 'Blood Test Results',
      date: '2024-01-10',
      doctor: 'Dr. Priya Sharma',
      content: {
        tests: [
          { name: 'Hemoglobin', value: '13.5 g/dL', range: '12-16 g/dL', status: 'normal' },
          { name: 'Blood Sugar (Fasting)', value: '95 mg/dL', range: '70-100 mg/dL', status: 'normal' },
          { name: 'Total Cholesterol', value: '180 mg/dL', range: '<200 mg/dL', status: 'normal' }
        ]
      }
    },
    {
      id: '4',
      type: 'vital_signs',
      title: 'Vital Signs Check',
      date: '2024-01-08',
      doctor: 'Dr. Rajesh Kumar',
      content: {
        vitals: [
          { name: 'Blood Pressure', value: '120/80 mmHg', status: 'normal' },
          { name: 'Heart Rate', value: '72 bpm', status: 'normal' },
          { name: 'Temperature', value: '98.6°F', status: 'normal' },
          { name: 'Weight', value: '70 kg', status: 'normal' }
        ]
      }
    }
  ];

  useEffect(() => {
    setRecords(mockRecords);
  }, []);

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <User className="w-5 h-5" />;
      case 'prescription': return <Pill className="w-5 h-5" />;
      case 'lab_result': return <TestTube className="w-5 h-5" />;
      case 'vital_signs': return <Heart className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'text-blue-600 bg-blue-100';
      case 'prescription': return 'text-green-600 bg-green-100';
      case 'lab_result': return 'text-purple-600 bg-purple-100';
      case 'vital_signs': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const downloadRecord = (record: MedicalRecord) => {
    // Create a simple text representation of the record
    let content = `Medical Record: ${record.title}\n`;
    content += `Date: ${new Date(record.date).toLocaleDateString()}\n`;
    content += `Doctor: ${record.doctor}\n\n`;
    content += `Details:\n${JSON.stringify(record.content, null, 2)}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.title.replace(/\s+/g, '_')}_${record.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Record downloaded successfully');
  };

  const renderRecordContent = (record: MedicalRecord) => {
    switch (record.type) {
      case 'consultation':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
              <div className="flex flex-wrap gap-2">
                {record.content.symptoms.map((symptom: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
              <p className="text-gray-700">{record.content.diagnosis}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
              <p className="text-gray-700">{record.content.notes}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
              <ul className="list-disc list-inside space-y-1">
                {record.content.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-gray-700">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'prescription':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Medications</h4>
              <div className="space-y-3">
                {record.content.medications.map((med: any, index: number) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-900">{med.name}</h5>
                    <p className="text-sm text-green-700">Dosage: {med.dosage}</p>
                    <p className="text-sm text-green-700">Duration: {med.duration}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
              <p className="text-gray-700">{record.content.instructions}</p>
            </div>
          </div>
        );

      case 'lab_result':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 mb-2">Test Results</h4>
            <div className="space-y-3">
              {record.content.tests.map((test: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-purple-900">{test.name}</h5>
                    <p className="text-sm text-purple-700">Range: {test.range}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-purple-900">{test.value}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      test.status === 'normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'vital_signs':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 mb-2">Vital Signs</h4>
            <div className="grid grid-cols-2 gap-3">
              {record.content.vitals.map((vital: any, index: number) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg">
                  <h5 className="font-medium text-red-900">{vital.name}</h5>
                  <p className="text-lg font-semibold text-red-800">{vital.value}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    vital.status === 'normal' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {vital.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <p className="text-gray-700">No content available</p>;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
        <p className="text-gray-600">View and manage your complete medical history</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Records</option>
            <option value="consultation">Consultations</option>
            <option value="prescription">Prescriptions</option>
            <option value="lab_result">Lab Results</option>
            <option value="vital_signs">Vital Signs</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Total Records: {filteredRecords.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.map(record => (
            <div
              key={record.id}
              onClick={() => setSelectedRecord(record)}
              className={`bg-white p-4 rounded-xl shadow-sm border cursor-pointer transition-colors ${
                selectedRecord?.id === record.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRecordColor(record.type)}`}>
                  {getRecordIcon(record.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{record.title}</h3>
                  <p className="text-sm text-gray-600">{record.doctor}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getRecordColor(record.type)}`}>
                      {record.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadRecord(record);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
              <p className="text-gray-500">No medical records match your search criteria.</p>
            </div>
          )}
        </div>

        {/* Record Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedRecord ? (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRecordColor(selectedRecord.type)}`}>
                    {getRecordIcon(selectedRecord.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedRecord.title}</h2>
                    <p className="text-gray-600">{selectedRecord.doctor}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedRecord.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => downloadRecord(selectedRecord)}
                  className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                {renderRecordContent(selectedRecord)}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Record</h3>
              <p className="text-gray-500">Choose a medical record from the list to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;