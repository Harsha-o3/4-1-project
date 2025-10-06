import React, { useState } from 'react';
import { Search, User, Calendar, FileText, Pill, TestTube, Heart, Filter } from 'lucide-react';

interface PatientHistoryRecord {
  id: string;
  type: 'consultation' | 'prescription' | 'lab_result' | 'vital_signs' | 'imaging';
  title: string;
  date: string;
  doctor: string;
  summary: string;
  details: any;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  village: string;
  phone: string;
  bloodGroup: string;
  allergies: string;
  conditions: string;
  lastVisit: string;
  totalVisits: number;
}

const PatientHistory: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientHistory, setPatientHistory] = useState<PatientHistoryRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const patients: Patient[] = [
    {
      id: '1',
      name: 'Ram Singh',
      age: 45,
      gender: 'Male',
      village: 'Nabha',
      phone: '+91-9999999999',
      bloodGroup: 'B+',
      allergies: 'Penicillin',
      conditions: 'Hypertension, Diabetes',
      lastVisit: '2024-01-15',
      totalVisits: 12
    },
    {
      id: '2',
      name: 'Priya Kaur',
      age: 32,
      gender: 'Female',
      village: 'Bhundri',
      phone: '+91-9999999998',
      bloodGroup: 'O+',
      allergies: 'None',
      conditions: 'None',
      lastVisit: '2024-01-14',
      totalVisits: 3
    }
  ];

  const mockHistory: { [key: string]: PatientHistoryRecord[] } = {
    '1': [
      {
        id: '1',
        type: 'consultation',
        title: 'Diabetes Follow-up',
        date: '2024-01-15',
        doctor: 'Dr. Rajesh Kumar',
        summary: 'Blood sugar levels well controlled. Continue current medication.',
        details: {
          symptoms: ['Fatigue', 'Increased thirst'],
          diagnosis: 'Type 2 Diabetes - Well Controlled',
          vitals: { bp: '130/85', pulse: '72', temp: '98.6°F' }
        }
      },
      {
        id: '2',
        type: 'lab_result',
        title: 'HbA1c Test',
        date: '2024-01-10',
        doctor: 'Dr. Rajesh Kumar',
        summary: 'HbA1c: 6.8% - Good diabetic control',
        details: {
          tests: [
            { name: 'HbA1c', value: '6.8%', range: '<7%', status: 'good' },
            { name: 'Fasting Glucose', value: '110 mg/dL', range: '70-100 mg/dL', status: 'slightly_elevated' }
          ]
        }
      }
    ],
    '2': [
      {
        id: '3',
        type: 'consultation',
        title: 'General Check-up',
        date: '2024-01-14',
        doctor: 'Dr. Priya Sharma',
        summary: 'Routine health check. All parameters normal.',
        details: {
          symptoms: ['None'],
          diagnosis: 'Healthy',
          vitals: { bp: '118/76', pulse: '68', temp: '98.4°F' }
        }
      }
    ]
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientHistory(mockHistory[patient.id] || []);
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <User className="w-5 h-5" />;
      case 'prescription': return <Pill className="w-5 h-5" />;
      case 'lab_result': return <TestTube className="w-5 h-5" />;
      case 'vital_signs': return <Heart className="w-5 h-5" />;
      case 'imaging': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'text-blue-600 bg-blue-100';
      case 'prescription': return 'text-green-600 bg-green-100';
      case 'lab_result': return 'text-purple-600 bg-purple-100';
      case 'vital_signs': return 'text-red-600 bg-red-100';
      case 'imaging': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredHistory = patientHistory.filter(record => {
    return !filterType || record.type === filterType;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient History</h1>
        <p className="text-gray-600">Access comprehensive patient medical history and records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredPatients.map(patient => (
              <div
                key={patient.id}
                onClick={() => selectPatient(patient)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPatient?.id === patient.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">{patient.age} years, {patient.gender}</p>
                    <p className="text-sm text-gray-500">{patient.village}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{patient.totalVisits} visits</span>
                      <span className="text-xs text-gray-500">Last: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Details & History */}
        <div className="lg:col-span-2 space-y-6">
          {selectedPatient ? (
            <>
              {/* Patient Summary */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h2>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-gray-500">Age:</span>
                        <span className="ml-2 text-gray-900">{selectedPatient.age} years</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Gender:</span>
                        <span className="ml-2 text-gray-900">{selectedPatient.gender}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Village:</span>
                        <span className="ml-2 text-gray-900">{selectedPatient.village}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Blood Group:</span>
                        <span className="ml-2 text-gray-900">{selectedPatient.bloodGroup}</span>
                      </div>
                    </div>
                    
                    {selectedPatient.allergies && selectedPatient.allergies !== 'None' && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                        <span className="text-sm text-red-600 font-medium">Allergies:</span>
                        <span className="ml-2 text-sm text-red-700">{selectedPatient.allergies}</span>
                      </div>
                    )}
                    
                    {selectedPatient.conditions && selectedPatient.conditions !== 'None' && (
                      <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded">
                        <span className="text-sm text-orange-600 font-medium">Conditions:</span>
                        <span className="ml-2 text-sm text-orange-700">{selectedPatient.conditions}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* History Filter */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Records</option>
                    <option value="consultation">Consultations</option>
                    <option value="prescription">Prescriptions</option>
                    <option value="lab_result">Lab Results</option>
                    <option value="vital_signs">Vital Signs</option>
                    <option value="imaging">Imaging</option>
                  </select>
                  <span className="text-sm text-gray-600">{filteredHistory.length} records</span>
                </div>
              </div>

              {/* Medical History */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h3>
                
                {filteredHistory.length > 0 ? (
                  <div className="space-y-4">
                    {filteredHistory.map(record => (
                      <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getRecordColor(record.type)}`}>
                              {getRecordIcon(record.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{record.title}</h4>
                              <p className="text-sm text-gray-600">{record.doctor}</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                  {new Date(record.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${getRecordColor(record.type)}`}>
                            {record.type.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-3">
                          <p className="text-gray-700">{record.summary}</p>
                          
                          {record.type === 'consultation' && record.details.vitals && (
                            <div className="mt-3 grid grid-cols-3 gap-2">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">BP: {record.details.vitals.bp}</span>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">Pulse: {record.details.vitals.pulse}</span>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">Temp: {record.details.vitals.temp}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h4>
                    <p className="text-gray-500">This patient has no medical records yet.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
                <p className="text-gray-500">Search and select a patient to view their complete medical history.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;