import React, { useState } from 'react';
import { Heart, Thermometer, Activity, Scale, Plus, TrendingUp, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface VitalSign {
  id: string;
  type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'oxygen_saturation' | 'respiratory_rate';
  value: string;
  unit: string;
  date: string;
  time: string;
  notes?: string;
  recordedBy: string;
}

const VitalSigns: React.FC = () => {
  const [vitals, setVitals] = useState<VitalSign[]>([
    {
      id: '1',
      type: 'blood_pressure',
      value: '120/80',
      unit: 'mmHg',
      date: '2024-01-15',
      time: '08:30',
      notes: 'Morning reading after medication',
      recordedBy: 'Self'
    },
    {
      id: '2',
      type: 'heart_rate',
      value: '72',
      unit: 'bpm',
      date: '2024-01-15',
      time: '08:30',
      recordedBy: 'Self'
    },
    {
      id: '3',
      type: 'temperature',
      value: '98.6',
      unit: '°F',
      date: '2024-01-14',
      time: '19:00',
      notes: 'Evening reading',
      recordedBy: 'Dr. Rajesh Kumar'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    notes: ''
  });

  const vitalTypes = [
    {
      type: 'blood_pressure',
      name: 'Blood Pressure',
      icon: Heart,
      unit: 'mmHg',
      color: 'text-red-600 bg-red-100',
      placeholder: '120/80',
      normalRange: '90/60 - 140/90'
    },
    {
      type: 'heart_rate',
      name: 'Heart Rate',
      icon: Activity,
      unit: 'bpm',
      color: 'text-pink-600 bg-pink-100',
      placeholder: '72',
      normalRange: '60-100'
    },
    {
      type: 'temperature',
      name: 'Temperature',
      icon: Thermometer,
      unit: '°F',
      color: 'text-orange-600 bg-orange-100',
      placeholder: '98.6',
      normalRange: '97.0-99.5'
    },
    {
      type: 'weight',
      name: 'Weight',
      icon: Scale,
      unit: 'kg',
      color: 'text-green-600 bg-green-100',
      placeholder: '70',
      normalRange: 'BMI 18.5-24.9'
    },
    {
      type: 'oxygen_saturation',
      name: 'Oxygen Saturation',
      icon: Activity,
      unit: '%',
      color: 'text-blue-600 bg-blue-100',
      placeholder: '98',
      normalRange: '95-100'
    },
    {
      type: 'respiratory_rate',
      name: 'Respiratory Rate',
      icon: Activity,
      unit: '/min',
      color: 'text-purple-600 bg-purple-100',
      placeholder: '16',
      normalRange: '12-20'
    }
  ];

  const getVitalType = (type: string) => {
    return vitalTypes.find(vt => vt.type === type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newVital: VitalSign = {
      id: Date.now().toString(),
      type: formData.type as any,
      value: formData.value,
      unit: getVitalType(formData.type)?.unit || '',
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      recordedBy: 'Self'
    };

    setVitals([newVital, ...vitals]);
    setFormData({
      type: '',
      value: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      notes: ''
    });
    setShowAddForm(false);
    toast.success('Vital sign recorded successfully');
  };

  const getLatestValue = (type: string) => {
    const latest = vitals.find(v => v.type === type);
    return latest?.value || 'No data';
  };

  const getTrend = (type: string) => {
    const typeVitals = vitals.filter(v => v.type === type).slice(0, 2);
    if (typeVitals.length < 2) return null;
    
    const current = parseFloat(typeVitals[0].value.split('/')[0]);
    const previous = parseFloat(typeVitals[1].value.split('/')[0]);
    
    return current > previous ? 'up' : current < previous ? 'down' : 'stable';
  };

  const groupedVitals = vitals.reduce((acc, vital) => {
    const date = vital.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(vital);
    return acc;
  }, {} as Record<string, VitalSign[]>);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vital Signs</h1>
        <p className="text-gray-600">Track and monitor your vital health indicators</p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        {vitalTypes.map(vitalType => {
          const trend = getTrend(vitalType.type);
          return (
            <div key={vitalType.type} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${vitalType.color}`}>
                  <vitalType.icon className="w-5 h-5" />
                </div>
                {trend && (
                  <div className={`flex items-center ${trend === 'up' ? 'text-red-500' : trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
                    <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'transform rotate-180' : ''}`} />
                  </div>
                )}
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{vitalType.name}</h3>
              <p className="text-lg font-bold text-gray-900">{getLatestValue(vitalType.type)}</p>
              <p className="text-xs text-gray-500">{vitalType.unit}</p>
              <p className="text-xs text-gray-400 mt-1">{vitalType.normalRange}</p>
            </div>
          );
        })}
      </div>

      {/* Add New Vital */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Record New Vital Sign</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vital</span>
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vital Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Type</option>
                  {vitalTypes.map(type => (
                    <option key={type.type} value={type.type}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder={getVitalType(formData.type)?.placeholder || 'Enter value'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Record Vital
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Vitals History */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Vital Signs History</h2>
        
        <div className="space-y-6">
          {Object.entries(groupedVitals)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, dayVitals]) => (
              <div key={date}>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dayVitals
                    .sort((a, b) => b.time.localeCompare(a.time))
                    .map(vital => {
                      const vitalType = getVitalType(vital.type);
                      return (
                        <div key={vital.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${vitalType?.color}`}>
                              {vitalType && <vitalType.icon className="w-4 h-4" />}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{vitalType?.name}</h4>
                              <p className="text-sm text-gray-500">{vital.time}</p>
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <span className="text-2xl font-bold text-gray-900">{vital.value}</span>
                            <span className="text-sm text-gray-500 ml-1">{vital.unit}</span>
                          </div>
                          
                          <p className="text-xs text-gray-500">Recorded by: {vital.recordedBy}</p>
                          
                          {vital.notes && (
                            <p className="text-sm text-gray-600 italic mt-2">{vital.notes}</p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
        </div>

        {vitals.length === 0 && (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Vital Signs Recorded</h3>
            <p className="text-gray-500">Start tracking your health by recording your first vital sign.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VitalSigns;