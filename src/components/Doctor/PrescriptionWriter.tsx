import React, { useState } from 'react';
import { Plus, Trash2, Save, Printer, Send, Pill, User, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface PrescriptionMedication {
  id: string;
  medication: string;
  strength: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
  refillable: boolean;
}

interface PrescriptionForm {
  patientId: string;
  patientName: string;
  medications: PrescriptionMedication[];
  generalInstructions: string;
  followUpDate: string;
  validUntil: string;
}

const PrescriptionWriter: React.FC = () => {
  const [prescriptionForm, setPrescriptionForm] = useState<PrescriptionForm>({
    patientId: '',
    patientName: '',
    medications: [],
    generalInstructions: '',
    followUpDate: '',
    validUntil: ''
  });

  const [recentPatients] = useState([
    { id: '1', name: 'Ram Singh', lastVisit: '2024-01-15' },
    { id: '2', name: 'Priya Kaur', lastVisit: '2024-01-14' },
    { id: '3', name: 'Amrit Kumar', lastVisit: '2024-01-13' }
  ]);

  const [commonMedications] = useState([
    { name: 'Paracetamol', strength: '500mg', instructions: 'Take with food' },
    { name: 'Amoxicillin', strength: '500mg', instructions: 'Complete full course' },
    { name: 'Metformin', strength: '500mg', instructions: 'Take with meals' },
    { name: 'Amlodipine', strength: '5mg', instructions: 'Take in morning' },
    { name: 'Omeprazole', strength: '20mg', instructions: 'Take before breakfast' }
  ]);

  const [savedPrescriptions, setSavedPrescriptions] = useState([
    {
      id: '1',
      prescriptionNumber: 'RX-2024-001',
      patientName: 'Ram Singh',
      date: '2024-01-15',
      medicationCount: 2,
      status: 'sent'
    }
  ]);

  const addMedication = () => {
    const newMedication: PrescriptionMedication = {
      id: Date.now().toString(),
      medication: '',
      strength: '',
      dosage: '',
      frequency: '',
      duration: '',
      quantity: 0,
      instructions: '',
      refillable: false
    };
    
    setPrescriptionForm({
      ...prescriptionForm,
      medications: [...prescriptionForm.medications, newMedication]
    });
  };

  const updateMedication = (index: number, field: keyof PrescriptionMedication, value: any) => {
    const updatedMedications = prescriptionForm.medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setPrescriptionForm({ ...prescriptionForm, medications: updatedMedications });
  };

  const removeMedication = (index: number) => {
    setPrescriptionForm({
      ...prescriptionForm,
      medications: prescriptionForm.medications.filter((_, i) => i !== index)
    });
  };

  const addCommonMedication = (commonMed: any) => {
    const newMedication: PrescriptionMedication = {
      id: Date.now().toString(),
      medication: commonMed.name,
      strength: commonMed.strength,
      dosage: '1 tablet',
      frequency: 'twice daily',
      duration: '7 days',
      quantity: 14,
      instructions: commonMed.instructions,
      refillable: false
    };
    
    setPrescriptionForm({
      ...prescriptionForm,
      medications: [...prescriptionForm.medications, newMedication]
    });
  };

  const savePrescription = () => {
    if (!prescriptionForm.patientName || prescriptionForm.medications.length === 0) {
      toast.error('Please select patient and add medications');
      return;
    }

    const newPrescription = {
      id: Date.now().toString(),
      prescriptionNumber: `RX-2024-${String(savedPrescriptions.length + 1).padStart(3, '0')}`,
      patientName: prescriptionForm.patientName,
      date: new Date().toISOString().split('T')[0],
      medicationCount: prescriptionForm.medications.length,
      status: 'draft'
    };

    setSavedPrescriptions([newPrescription, ...savedPrescriptions]);
    toast.success('Prescription saved successfully');
  };

  const sendToPharmacy = () => {
    toast.success('Prescription sent to pharmacy');
  };

  const printPrescription = () => {
    toast.success('Prescription sent to printer');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescription Writer</h1>
        <p className="text-gray-600">Create and manage patient prescriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Selection & Common Medications */}
        <div className="space-y-6">
          {/* Recent Patients */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
            <div className="space-y-2">
              {recentPatients.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => setPrescriptionForm({ 
                    ...prescriptionForm, 
                    patientId: patient.id, 
                    patientName: patient.name 
                  })}
                  className={`w-full p-3 text-left rounded-lg border transition-colors ${
                    prescriptionForm.patientId === patient.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-500">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Common Medications */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Medications</h3>
            <div className="space-y-2">
              {commonMedications.map((med, index) => (
                <button
                  key={index}
                  onClick={() => addCommonMedication(med)}
                  className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  <p className="font-medium text-gray-900">{med.name} {med.strength}</p>
                  <p className="text-sm text-gray-500">{med.instructions}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prescription Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">New Prescription</h2>
            <div className="flex space-x-2">
              <button
                onClick={savePrescription}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={printPrescription}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button
                onClick={sendToPharmacy}
                className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>

          {/* Patient Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">
                  {prescriptionForm.patientName || 'Select Patient'}
                </h3>
                <p className="text-blue-700">Patient ID: {prescriptionForm.patientId || 'Not selected'}</p>
              </div>
            </div>
          </div>

          {/* Medications */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
              <button
                onClick={addMedication}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Medication</span>
              </button>
            </div>

            <div className="space-y-4">
              {prescriptionForm.medications.map((medication, index) => (
                <div key={medication.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Medication name"
                      value={medication.medication}
                      onChange={(e) => updateMedication(index, 'medication', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Strength (e.g., 500mg)"
                      value={medication.strength}
                      onChange={(e) => updateMedication(index, 'strength', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g., 1 tablet)"
                      value={medication.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                    <select
                      value={medication.frequency}
                      onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Frequency</option>
                      <option value="once daily">Once daily</option>
                      <option value="twice daily">Twice daily</option>
                      <option value="three times daily">Three times daily</option>
                      <option value="four times daily">Four times daily</option>
                      <option value="as needed">As needed</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Duration (e.g., 7 days)"
                      value={medication.duration}
                      onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <input
                      type="number"
                      placeholder="Quantity"
                      value={medication.quantity}
                      onChange={(e) => updateMedication(index, 'quantity', parseInt(e.target.value))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={medication.refillable}
                          onChange={(e) => updateMedication(index, 'refillable', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Refillable</span>
                      </label>
                      
                      <button
                        onClick={() => removeMedication(index)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    placeholder="Special instructions for this medication..."
                    value={medication.instructions}
                    onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}

              {prescriptionForm.medications.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No medications added yet</p>
                  <button
                    onClick={addMedication}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Add your first medication
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* General Instructions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">General Instructions</label>
            <textarea
              value={prescriptionForm.generalInstructions}
              onChange={(e) => setPrescriptionForm({ ...prescriptionForm, generalInstructions: e.target.value })}
              placeholder="General instructions for the patient..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Follow-up and Validity */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
              <input
                type="date"
                value={prescriptionForm.followUpDate}
                onChange={(e) => setPrescriptionForm({ ...prescriptionForm, followUpDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
              <input
                type="date"
                value={prescriptionForm.validUntil}
                onChange={(e) => setPrescriptionForm({ ...prescriptionForm, validUntil: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Prescriptions</h3>
            <div className="space-y-3">
              {savedPrescriptions.map(prescription => (
                <div key={prescription.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{prescription.prescriptionNumber}</h4>
                      <p className="text-sm text-gray-600">{prescription.patientName}</p>
                      <p className="text-sm text-gray-500">{prescription.medicationCount} medications</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        prescription.status === 'sent' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {prescription.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(prescription.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionWriter;