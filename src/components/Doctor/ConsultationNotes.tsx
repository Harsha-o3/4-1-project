import React, { useState } from 'react';
import { FileText, Save, User, Calendar, Clock, Pill, TestTube, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface ConsultationNote {
  id: string;
  appointmentId: string;
  patientName: string;
  date: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  pastMedicalHistory: string;
  examination: string;
  assessment: string;
  plan: string;
  prescriptions: PrescriptionItem[];
  followUp: string;
  vitals: VitalSigns;
  status: 'draft' | 'completed';
}

interface PrescriptionItem {
  id: string;
  medication: string;
  strength: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  weight: string;
}

const ConsultationNotes: React.FC = () => {
  const [notes, setNotes] = useState<ConsultationNote[]>([
    {
      id: '1',
      appointmentId: 'apt-001',
      patientName: 'Ram Singh',
      date: '2024-01-15',
      chiefComplaint: 'Fever and headache for 2 days',
      historyOfPresentIllness: 'Patient reports onset of fever 2 days ago, associated with headache and body aches. No cough or breathing difficulty.',
      pastMedicalHistory: 'Hypertension, well controlled on medication',
      examination: 'Patient appears mildly ill. No respiratory distress. Throat slightly erythematous.',
      assessment: 'Viral fever syndrome',
      plan: 'Symptomatic treatment, rest, adequate fluid intake',
      prescriptions: [
        {
          id: '1',
          medication: 'Paracetamol',
          strength: '500mg',
          dosage: '1 tablet',
          frequency: 'twice daily',
          duration: '5 days',
          instructions: 'Take with food'
        }
      ],
      followUp: 'Return if symptoms worsen or persist beyond 5 days',
      vitals: {
        bloodPressure: '130/85',
        heartRate: '88',
        temperature: '101.2',
        respiratoryRate: '18',
        oxygenSaturation: '98',
        weight: '70'
      },
      status: 'completed'
    }
  ]);

  const [selectedNote, setSelectedNote] = useState<ConsultationNote | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  const [formData, setFormData] = useState({
    patientName: '',
    chiefComplaint: '',
    historyOfPresentIllness: '',
    pastMedicalHistory: '',
    examination: '',
    assessment: '',
    plan: '',
    followUp: '',
    vitals: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      weight: ''
    },
    prescriptions: [] as PrescriptionItem[]
  });

  const handleSave = () => {
    if (selectedNote && isEditing) {
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { ...note, ...formData, status: 'completed' as const }
          : note
      ));
      toast.success('Consultation note updated');
      setIsEditing(false);
    }
  };

  const addPrescription = () => {
    const newPrescription: PrescriptionItem = {
      id: Date.now().toString(),
      medication: '',
      strength: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    };
    setFormData({
      ...formData,
      prescriptions: [...formData.prescriptions, newPrescription]
    });
  };

  const updatePrescription = (index: number, field: string, value: string) => {
    const updatedPrescriptions = formData.prescriptions.map((prescription, i) => 
      i === index ? { ...prescription, [field]: value } : prescription
    );
    setFormData({ ...formData, prescriptions: updatedPrescriptions });
  };

  const removePrescription = (index: number) => {
    setFormData({
      ...formData,
      prescriptions: formData.prescriptions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultation Notes</h1>
        <p className="text-gray-600">Create and manage detailed consultation records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Consultations</h2>
            <button
              onClick={() => setShowNewForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>New Note</span>
            </button>
          </div>

          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => {
                setSelectedNote(note);
                setFormData({
                  patientName: note.patientName,
                  chiefComplaint: note.chiefComplaint,
                  historyOfPresentIllness: note.historyOfPresentIllness,
                  pastMedicalHistory: note.pastMedicalHistory,
                  examination: note.examination,
                  assessment: note.assessment,
                  plan: note.plan,
                  followUp: note.followUp,
                  vitals: note.vitals,
                  prescriptions: note.prescriptions
                });
              }}
              className={`bg-white p-4 rounded-xl shadow-sm border cursor-pointer transition-colors ${
                selectedNote?.id === note.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{note.patientName}</h3>
                  <p className="text-sm text-gray-600">{note.chiefComplaint}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      note.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {note.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note Details/Editor */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedNote ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedNote.patientName}</h2>
                  <p className="text-gray-600">{new Date(selectedNote.date).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Vitals */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Vital Signs</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Blood Pressure</p>
                      <p className="font-medium">{selectedNote.vitals.bloodPressure} mmHg</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Heart Rate</p>
                      <p className="font-medium">{selectedNote.vitals.heartRate} bpm</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Temperature</p>
                      <p className="font-medium">{selectedNote.vitals.temperature}°F</p>
                    </div>
                  </div>
                </div>

                {/* SOAP Notes */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Chief Complaint</h4>
                    {isEditing ? (
                      <textarea
                        value={formData.chiefComplaint}
                        onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-700">{selectedNote.chiefComplaint}</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">History of Present Illness</h4>
                    {isEditing ? (
                      <textarea
                        value={formData.historyOfPresentIllness}
                        onChange={(e) => setFormData({ ...formData, historyOfPresentIllness: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-700">{selectedNote.historyOfPresentIllness}</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Assessment</h4>
                    {isEditing ? (
                      <textarea
                        value={formData.assessment}
                        onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-700">{selectedNote.assessment}</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Treatment Plan</h4>
                    {isEditing ? (
                      <textarea
                        value={formData.plan}
                        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-700">{selectedNote.plan}</p>
                    )}
                  </div>
                </div>

                {/* Prescriptions */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Prescriptions</h4>
                    {isEditing && (
                      <button
                        onClick={addPrescription}
                        className="flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white text-sm rounded"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {(isEditing ? formData.prescriptions : selectedNote.prescriptions).map((prescription, index) => (
                      <div key={prescription.id} className="p-3 bg-green-50 rounded-lg">
                        {isEditing ? (
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Medication"
                              value={prescription.medication}
                              onChange={(e) => updatePrescription(index, 'medication', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Strength"
                              value={prescription.strength}
                              onChange={(e) => updatePrescription(index, 'strength', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Dosage"
                              value={prescription.dosage}
                              onChange={(e) => updatePrescription(index, 'dosage', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Frequency"
                              value={prescription.frequency}
                              onChange={(e) => updatePrescription(index, 'frequency', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                        ) : (
                          <div>
                            <h5 className="font-medium text-green-900">{prescription.medication} {prescription.strength}</h5>
                            <p className="text-sm text-green-700">{prescription.dosage} {prescription.frequency} for {prescription.duration}</p>
                            <p className="text-sm text-green-600 italic">{prescription.instructions}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Consultation</h3>
              <p className="text-gray-500">Choose a consultation from the list to view or edit notes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationNotes;