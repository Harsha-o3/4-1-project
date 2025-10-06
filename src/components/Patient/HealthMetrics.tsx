import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Activity, Heart, Thermometer, Scale, Droplets } from 'lucide-react';
import toast from 'react-hot-toast';

interface HealthMetric {
  id: string;
  type: 'blood_pressure' | 'blood_sugar' | 'weight' | 'temperature' | 'heart_rate';
  value: string;
  unit: string;
  date: string;
  time: string;
  notes?: string;
}

const HealthMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      id: '1',
      type: 'blood_pressure',
      value: '120/80',
      unit: 'mmHg',
      date: '2024-01-15',
      time: '08:30',
      notes: 'Morning reading after medication'
    },
    {
      id: '2',
      type: 'blood_sugar',
      value: '95',
      unit: 'mg/dL',
      date: '2024-01-15',
      time: '07:00',
      notes: 'Fasting glucose'
    },
    {
      id: '3',
      type: 'weight',
      value: '70',
      unit: 'kg',
      date: '2024-01-14',
      time: '06:00'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [formData, setFormData] = useState({
    type: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    notes: ''
  });

  const metricTypes = [
    {
      type: 'blood_pressure',
      name: 'Blood Pressure',
      icon: Heart,
      unit: 'mmHg',
      color: 'text-red-600 bg-red-100',
      placeholder: '120/80'
    },
    {
      type: 'blood_sugar',
      name: 'Blood Sugar',
      icon: Droplets,
      unit: 'mg/dL',
      color: 'text-blue-600 bg-blue-100',
      placeholder: '95'
    },
    {
      type: 'weight',
      name: 'Weight',
      icon: Scale,
      unit: 'kg',
      color: 'text-green-600 bg-green-100',
      placeholder: '70'
    },
    {
      type: 'temperature',
      name: 'Temperature',
      icon: Thermometer,
      unit: '°F',
      color: 'text-orange-600 bg-orange-100',
      placeholder: '98.6'
    },
    {
      type: 'heart_rate',
      name: 'Heart Rate',
      icon: Activity,
      unit: 'bpm',
      color: 'text-purple-600 bg-purple-100',
      placeholder: '72'
    }
  ];

  const getMetricType = (type: string) => {
    return metricTypes.find(mt => mt.type === type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMetric: HealthMetric = {
      id: Date.now().toString(),
      type: formData.type as any,
      value: formData.value,
      unit: getMetricType(formData.type)?.unit || '',
      date: formData.date,
      time: formData.time,
      notes: formData.notes
    };

    setMetrics([newMetric, ...metrics]);
    setFormData({
      type: '',
      value: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      notes: ''
    });
    setShowAddForm(false);
    toast.success('Health metric added successfully');
  };

  const getLatestValue = (type: string) => {
    const latest = metrics.find(m => m.type === type);
    return latest?.value || 'No data';
  };

  const getTrend = (type: string) => {
    const typeMetrics = metrics.filter(m => m.type === type).slice(0, 2);
    if (typeMetrics.length < 2) return null;
    
    const current = parseFloat(typeMetrics[0].value.split('/')[0]);
    const previous = parseFloat(typeMetrics[1].value.split('/')[0]);
    
    return current > previous ? 'up' : current < previous ? 'down' : 'stable';
  };

  const groupedMetrics = metrics.reduce((acc, metric) => {
    const date = metric.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(metric);
    return acc;
  }, {} as Record<string, HealthMetric[]>);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Metrics</h1>
        <p className="text-gray-600">Track and monitor your vital health indicators</p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {metricTypes.map(metricType => {
          const trend = getTrend(metricType.type);
          return (
            <div key={metricType.type} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metricType.color}`}>
                  <metricType.icon className="w-5 h-5" />
                </div>
                {trend && (
                  <div className={`flex items-center ${trend === 'up' ? 'text-red-500' : trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
                    {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                     trend === 'down' ? <TrendingDown className="w-4 h-4" /> : 
                     <Activity className="w-4 h-4" />}
                  </div>
                )}
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{metricType.name}</h3>
              <p className="text-lg font-bold text-gray-900">{getLatestValue(metricType.type)}</p>
              <p className="text-xs text-gray-500">{metricType.unit}</p>
            </div>
          );
        })}
      </div>

      {/* Add New Metric */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Record New Measurement</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Metric</span>
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Metric Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Type</option>
                  {metricTypes.map(type => (
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
                  placeholder={getMetricType(formData.type)?.placeholder || 'Enter value'}
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
                Add Metric
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

      {/* Metrics History */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Measurement History</h2>
        
        <div className="space-y-6">
          {Object.entries(groupedMetrics)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, dayMetrics]) => (
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
                  {dayMetrics
                    .sort((a, b) => b.time.localeCompare(a.time))
                    .map(metric => {
                      const metricType = getMetricType(metric.type);
                      return (
                        <div key={metric.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metricType?.color}`}>
                              {metricType && <metricType.icon className="w-4 h-4" />}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{metricType?.name}</h4>
                              <p className="text-sm text-gray-500">{metric.time}</p>
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                            <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                          </div>
                          
                          {metric.notes && (
                            <p className="text-sm text-gray-600 italic">{metric.notes}</p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
        </div>

        {metrics.length === 0 && (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Metrics Recorded</h3>
            <p className="text-gray-500">Start tracking your health by adding your first measurement.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthMetrics;