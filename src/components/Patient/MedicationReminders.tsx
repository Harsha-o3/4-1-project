import React, { useState } from 'react';
import { Plus, Bell, Clock, Pill, Calendar, Trash2, CreditCard as Edit, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
  instructions: string;
  reminderEnabled: boolean;
  taken: { date: string; time: string; taken: boolean }[];
}

const MedicationReminders: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Metformin 500mg',
      dosage: '1 tablet',
      frequency: 'twice daily',
      times: ['08:00', '20:00'],
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      instructions: 'Take with food',
      reminderEnabled: true,
      taken: [
        { date: '2024-01-15', time: '08:00', taken: true },
        { date: '2024-01-15', time: '20:00', taken: false }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 'once daily',
    times: ['08:00'],
    startDate: '',
    endDate: '',
    instructions: '',
    reminderEnabled: true
  });

  const frequencyOptions = [
    { value: 'once daily', times: 1 },
    { value: 'twice daily', times: 2 },
    { value: 'three times daily', times: 3 },
    { value: 'four times daily', times: 4 },
    { value: 'as needed', times: 0 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMedication: Medication = {
      id: Date.now().toString(),
      ...formData,
      taken: []
    };

    setMedications([...medications, newMedication]);
    setFormData({
      name: '',
      dosage: '',
      frequency: 'once daily',
      times: ['08:00'],
      startDate: '',
      endDate: '',
      instructions: '',
      reminderEnabled: true
    });
    setShowAddForm(false);
    toast.success('Medication reminder added successfully');
  };

  const markAsTaken = (medicationId: string, time: string) => {
    const today = new Date().toISOString().split('T')[0];
    setMedications(medications.map(med => {
      if (med.id === medicationId) {
        const updatedTaken = med.taken.filter(t => !(t.date === today && t.time === time));
        updatedTaken.push({ date: today, time, taken: true });
        return { ...med, taken: updatedTaken };
      }
      return med;
    }));
    toast.success('Medication marked as taken');
  };

  const getTodaysDoses = () => {
    const today = new Date().toISOString().split('T')[0];
    const doses: any[] = [];
    
    medications.forEach(med => {
      med.times.forEach(time => {
        const taken = med.taken.find(t => t.date === today && t.time === time)?.taken || false;
        doses.push({
          medicationId: med.id,
          name: med.name,
          dosage: med.dosage,
          time,
          taken,
          instructions: med.instructions
        });
      });
    });
    
    return doses.sort((a, b) => a.time.localeCompare(b.time));
  };

  const todaysDoses = getTodaysDoses();
  const completedToday = todaysDoses.filter(d => d.taken).length;
  const adherenceRate = todaysDoses.length > 0 ? (completedToday / todaysDoses.length) * 100 : 0;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medication Reminders</h1>
        <p className="text-gray-600">Manage your medications and track adherence</p>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Doses</p>
              <p className="text-2xl font-bold text-gray-900">{todaysDoses.length}</p>
            </div>
            <Pill className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedToday}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Adherence Rate</p>
              <p className="text-2xl font-bold text-purple-600">{adherenceRate.toFixed(1)}%</p>
            </div>
            <Bell className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Meds</p>
              <p className="text-2xl font-bold text-orange-600">{medications.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Medication</span>
            </button>
          </div>

          <div className="space-y-4">
            {todaysDoses.map((dose, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                dose.taken ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{dose.name}</h3>
                    <p className="text-sm text-gray-600">{dose.dosage} - {dose.instructions}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{dose.time}</span>
                    </div>
                  </div>
                  
                  {!dose.taken && (
                    <button
                      onClick={() => markAsTaken(dose.medicationId, dose.time)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Mark Taken
                    </button>
                  )}
                  
                  {dose.taken && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Taken</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Medication Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {showAddForm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Medication</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medication Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    placeholder="1 tablet"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {frequencyOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.value}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder="Take with food, avoid alcohol..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Add Medication
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Medications</h3>
              <p className="text-gray-500 mb-4">Add medications to set up reminders and track adherence.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Medication</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* All Medications */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">All Medications</h2>
        
        <div className="space-y-4">
          {medications.map(medication => (
            <div key={medication.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                  <p className="text-sm text-gray-600">{medication.dosage} - {medication.frequency}</p>
                  <p className="text-sm text-gray-500">{medication.instructions}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">
                      {new Date(medication.startDate).toLocaleDateString()} - {new Date(medication.endDate).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      {medication.times.map(time => (
                        <span key={time} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-100 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationReminders;