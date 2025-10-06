import React, { useState, useEffect } from 'react';
import { Search, User, Calendar, FileText, Pill, TestTube, Heart, Eye } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Patient {
  id: string;
  user: {
    name: string;
    phone: string;
  };
  dob: string;
  gender: string;
  village: string;
  bloodGroup: string;
  allergies: string;
  existingConditions: string;
}

interface MedicalRecord {
  id: string;
  type: 'consultation' | 'prescription' | 'lab_result' | 'vital_signs';
  title: string;
  date: string;
  content: any;
}

const PatientRecords: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientRecords, setPatientRecords] = useState<MedicalRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockPatients: Patient[] = [
    {
      id: '1',
      user: { name: 'Ram Singh', phone: '+91-9999900001' },
      dob: '1985-06-15',
      gender: 'Male',
      village: 'Nabha',
      bloodGroup: 'B+',
      allergies: 'Penicillin',
      existingConditions: 'Hypertension'
    },
    {
      id: '2',
      user: { name: 'Priya Kaur', phone: '+91-9999900002' },
      dob: '1990-03-22',
      gender: 'Female',
      village: 'Bhundri',
      bloodGroup: 'O+',
      allergies: 'None',
      existingConditions: 'Diabetes Type 2'
    },
    {
      id: '3',
      user: { name: 'Amrit Kumar', phone: '+91-9999900003' },
      dob: '1978-11-08',
      gender: 'Male',
      village: 'Sidhwan Bet',
      bloodGroup: 'A+',
      allergies: 'Sulfa drugs',
      existingConditions: 'Asthma'
    }
  ];

  const mockRecords: { [key: string]: MedicalRecord[] } = {
    '1': [
      {
        id: '1',
        type: 'consultation',
        title: 'Hypertension Follow-up',
        date: '2024-01-15',
        content: {
          symptoms: ['Headache', 'Dizziness'],
          diagnosis: 'Controlled Hypertension',
          notes: 'Blood pressure well controlled with current medication. Continue current regimen.',
          vitals: { bp: '130/85', pulse: '72', temp: '98.6°F' }
        }
      },
      {
        id: '2',
        type: 'prescription',
        title: 'Hypertension Medication',
        date: '2024-01-15',
        content: {
          medications: [
            { name: 'Amlodipine 5mg', dosage: '1 tablet daily', duration: '30 days' },
            { name: 'Metoprolol 25mg', dosage: '1 tablet twice daily', duration: '30 days' }
          ]
        }
      }
    ],
    '2': [
      {
        id: '3',
        type: 'lab_result',
        title: 'Diabetes Monitoring',
        date: '2024-01-10',
        content: {
          tests: [
            { name: 'HbA1c', value: '7.2%', range: '<7%', status: 'elevated' },
            { name: 'Fasting Glucose', value: '140 mg/dL', range: '70-100 mg/dL', status: 'elevated' }
          ]
        }
      }
    ],
    '3': [
      {
        id: '4',
        type: 'vital_signs',
        title: 'Routine Check-up',
        date: '2024-01-08',
        content: {
          vitals: [
            { name: 'Blood Pressure', value: '118/76 mmHg', status: 'normal' },
            { name: 'Peak Flow', value: '450 L/min', status: 'normal' },
            { name: 'Oxygen Saturation', value: '98%', status: 'normal' }
          ]
        }
      }
    ]
  };

  useEffect(() => {
    setPatients(mockPatients);
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      setPatientRecords(mockRecords[selectedPatient.id] || []);
    }
  }, [selectedPatient]);

  const filteredPatients = patients.filter(patient =>
    patient.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.user.phone.includes(searchTerm) ||
    patient.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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

  const renderRecordContent = (record: MedicalRecord) => {
    switch (record.type) {
      case 'consultation':
        return (
          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-gray-900">Symptoms</h5>
              <div className="flex flex-wrap gap-1 mt-1">
                {record.content.symptoms.map((symptom: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Diagnosis</h5>
              <p className="text-sm text-gray-700">{record.content.diagnosis}</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Notes</h5>
              <p className="text-sm text-gray-700">{record.content.notes}</p>
            </div>
            {record.content.vitals && (
              <div>
                <h5 className="font-medium text-gray-900">Vitals</h5>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">BP: {record.content.vitals.bp}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Pulse: {record.content.vitals.pulse}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Temp: {record.content.vitals.temp}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'prescription':
        return (
          <div className="space-y-2">
            {record.content.medications.map((med: any, index: number) => (
              <div key={index} className="p-2 bg-green-50 rounded">
                <h5 className="font-medium text-green-900 text-sm">{med.name}</h5>
                <p className="text-xs text-green-700">{med.dosage} for {med.duration}</p>
              </div>
            ))}
          </div>
        );

      case 'lab_result':
        return (
          <div className="space-y-2">
            {record.content.tests.map((test: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-2 bg-purple-50 rounded">
                <div>
                  <h5 className="font-medium text-purple-900 text-sm">{test.name}</h5>
                  <p className="text-xs text-purple-700">Range: {test.range}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-purple-900 text-sm">{test.value}</p>
                  <span className={`px-1 py-0.5 text-xs rounded ${
                    test.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {test.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'vital_signs':
        return (
          <div className="grid grid-cols-1 gap-2">
            {record.content.vitals.map((vital: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                <h5 className="font-medium text-red-900 text-sm">{vital.name}</h5>
                <div className="text-right">
                  <p className="font-medium text-red-800 text-sm">{vital.value}</p>
                  <span className={`px-1 py-0.5 text-xs rounded ${
                    vital.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vital.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <p className="text-sm text-gray-700">No content available</p>;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Records</h1>
        <p className="text-gray-600">Access and review your patients' medical history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
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
                onClick={() => setSelectedPatient(patient)}
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
                    <h4 className="font-semibold text-gray-900">{patient.user.name}</h4>
                    <p className="text-sm text-gray-600">{patient.user.phone}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <span>Age: {calculateAge(patient.dob)}</span>
                      <span>•</span>
                      <span>{patient.gender}</span>
                      <span>•</span>
                      <span>{patient.village}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Details and Records */}
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
                    <h2 className="text-xl font-semibold text-gray-900">{selectedPatient.user.name}</h2>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-gray-500">Age:</span>
                        <span className="ml-2 text-gray-900">{calculateAge(selectedPatient.dob)} years</span>
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
                    
                    {selectedPatient.allergies && (
                      <div className="mt-3">
                        <span className="text-sm text-red-600 font-medium">Allergies:</span>
                        <span className="ml-2 text-sm text-red-700">{selectedPatient.allergies}</span>
                      </div>
                    )}
                    
                    {selectedPatient.existingConditions && (
                      <div className="mt-2">
                        <span className="text-sm text-orange-600 font-medium">Existing Conditions:</span>
                        <span className="ml-2 text-sm text-orange-700">{selectedPatient.existingConditions}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Records */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Records</h3>
                
                {patientRecords.length > 0 ? (
                  <div className="space-y-4">
                    {patientRecords.map(record => (
                      <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getRecordColor(record.type)}`}>
                              {getRecordIcon(record.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{record.title}</h4>
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
                          {renderRecordContent(record)}
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
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
                <p className="text-gray-500">Choose a patient from the list to view their medical records.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;