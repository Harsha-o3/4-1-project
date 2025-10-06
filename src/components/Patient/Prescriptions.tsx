import React, { useState } from 'react';
import { Pill, Download, Calendar, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Prescription {
  id: string;
  prescriptionNumber: string;
  doctor: string;
  date: string;
  medications: Medication[];
  instructions: string;
  status: 'active' | 'completed' | 'cancelled';
  validUntil: string;
  refillsRemaining: number;
}

interface Medication {
  id: string;
  name: string;
  strength: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
  refillable: boolean;
}

const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      prescriptionNumber: 'RX-2024-001',
      doctor: 'Dr. Rajesh Kumar',
      date: '2024-01-15',
      status: 'active',
      validUntil: '2024-04-15',
      refillsRemaining: 2,
      instructions: 'Take medications as prescribed. Complete the full course.',
      medications: [
        {
          id: '1',
          name: 'Metformin',
          strength: '500mg',
          dosage: '1 tablet',
          frequency: 'twice daily',
          duration: '30 days',
          quantity: 60,
          instructions: 'Take with meals',
          refillable: true
        },
        {
          id: '2',
          name: 'Amlodipine',
          strength: '5mg',
          dosage: '1 tablet',
          frequency: 'once daily',
          duration: '30 days',
          quantity: 30,
          instructions: 'Take in the morning',
          refillable: true
        }
      ]
    },
    {
      id: '2',
      prescriptionNumber: 'RX-2024-002',
      doctor: 'Dr. Priya Sharma',
      date: '2024-01-10',
      status: 'completed',
      validUntil: '2024-01-20',
      refillsRemaining: 0,
      instructions: 'Complete the antibiotic course as prescribed.',
      medications: [
        {
          id: '3',
          name: 'Amoxicillin',
          strength: '500mg',
          dosage: '1 capsule',
          frequency: 'three times daily',
          duration: '7 days',
          quantity: 21,
          instructions: 'Take with food',
          refillable: false
        }
      ]
    }
  ]);

  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [filterStatus, setFilterStatus] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const downloadPrescription = (prescription: Prescription) => {
    let content = `PRESCRIPTION\n\n`;
    content += `Prescription Number: ${prescription.prescriptionNumber}\n`;
    content += `Doctor: ${prescription.doctor}\n`;
    content += `Date: ${new Date(prescription.date).toLocaleDateString()}\n`;
    content += `Valid Until: ${new Date(prescription.validUntil).toLocaleDateString()}\n\n`;
    content += `MEDICATIONS:\n`;
    
    prescription.medications.forEach((med, index) => {
      content += `${index + 1}. ${med.name} ${med.strength}\n`;
      content += `   Dosage: ${med.dosage} ${med.frequency}\n`;
      content += `   Duration: ${med.duration}\n`;
      content += `   Quantity: ${med.quantity}\n`;
      content += `   Instructions: ${med.instructions}\n\n`;
    });
    
    content += `GENERAL INSTRUCTIONS:\n${prescription.instructions}\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prescription.prescriptionNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Prescription downloaded successfully');
  };

  const requestRefill = (prescription: Prescription) => {
    toast.success('Refill request sent to pharmacy');
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    return !filterStatus || prescription.status === filterStatus;
  });

  const activePrescriptions = prescriptions.filter(p => p.status === 'active').length;
  const totalMedications = prescriptions.reduce((sum, p) => sum + p.medications.length, 0);
  const refillsAvailable = prescriptions.reduce((sum, p) => sum + p.refillsRemaining, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Prescriptions</h1>
        <p className="text-gray-600">View and manage your prescription medications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
              <p className="text-2xl font-bold text-green-600">{activePrescriptions}</p>
            </div>
            <Pill className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Medications</p>
              <p className="text-2xl font-bold text-blue-600">{totalMedications}</p>
            </div>
            <Pill className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Refills Available</p>
              <p className="text-2xl font-bold text-purple-600">{refillsAvailable}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Prescriptions</p>
              <p className="text-2xl font-bold text-gray-600">{prescriptions.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Prescriptions</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.map(prescription => (
            <div
              key={prescription.id}
              onClick={() => setSelectedPrescription(prescription)}
              className={`bg-white p-4 rounded-xl shadow-sm border cursor-pointer transition-colors ${
                selectedPrescription?.id === prescription.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{prescription.prescriptionNumber}</h3>
                    <p className="text-sm text-gray-600">{prescription.doctor}</p>
                    <p className="text-sm text-gray-500">{prescription.medications.length} medications</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(prescription.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(prescription.status)}`}>
                    {prescription.status.toUpperCase()}
                  </span>
                  {prescription.refillsRemaining > 0 && (
                    <span className="text-xs text-blue-600">
                      {prescription.refillsRemaining} refills left
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prescription Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedPrescription ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedPrescription.prescriptionNumber}</h2>
                  <p className="text-gray-600">{selectedPrescription.doctor}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(selectedPrescription.status)}`}>
                  {selectedPrescription.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Date Prescribed:</span>
                    <span className="ml-2 text-gray-900">{new Date(selectedPrescription.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Valid Until:</span>
                    <span className="ml-2 text-gray-900">{new Date(selectedPrescription.validUntil).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Medications</h3>
                  <div className="space-y-3">
                    {selectedPrescription.medications.map(medication => (
                      <div key={medication.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{medication.name} {medication.strength}</h4>
                            <p className="text-sm text-gray-600">{medication.dosage} {medication.frequency}</p>
                            <p className="text-sm text-gray-500">Duration: {medication.duration}</p>
                            <p className="text-sm text-gray-500">Quantity: {medication.quantity}</p>
                            <p className="text-sm text-blue-600 italic">{medication.instructions}</p>
                          </div>
                          {medication.refillable && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              Refillable
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">General Instructions</h4>
                  <p className="text-blue-800">{selectedPrescription.instructions}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => downloadPrescription(selectedPrescription)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                
                {selectedPrescription.status === 'active' && selectedPrescription.refillsRemaining > 0 && (
                  <button
                    onClick={() => requestRefill(selectedPrescription)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Request Refill
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Prescription</h3>
              <p className="text-gray-500">Choose a prescription from the list to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;