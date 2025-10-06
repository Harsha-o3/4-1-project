import React, { useState } from 'react';
import { AlertTriangle, Package, Calendar, Bell, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface StockAlert {
  id: string;
  type: 'low_stock' | 'out_of_stock' | 'expiring_soon' | 'expired';
  medicineName: string;
  brand: string;
  currentQuantity: number;
  minQuantity: number;
  expiryDate?: string;
  batchNo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  acknowledged: boolean;
  createdAt: string;
}

const StockAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<StockAlert[]>([
    {
      id: '1',
      type: 'low_stock',
      medicineName: 'Amoxicillin 500mg',
      brand: 'Amoxil',
      currentQuantity: 5,
      minQuantity: 15,
      batchNo: 'B5678',
      priority: 'high',
      acknowledged: false,
      createdAt: '2024-01-15T10:30:00'
    },
    {
      id: '2',
      type: 'out_of_stock',
      medicineName: 'Omeprazole 20mg',
      brand: 'Omez',
      currentQuantity: 0,
      minQuantity: 10,
      batchNo: 'B9012',
      priority: 'critical',
      acknowledged: false,
      createdAt: '2024-01-15T09:15:00'
    },
    {
      id: '3',
      type: 'expiring_soon',
      medicineName: 'Aspirin 100mg',
      brand: 'Disprin',
      currentQuantity: 50,
      minQuantity: 20,
      expiryDate: '2024-02-15',
      batchNo: 'B3456',
      priority: 'medium',
      acknowledged: false,
      createdAt: '2024-01-14T16:45:00'
    },
    {
      id: '4',
      type: 'expired',
      medicineName: 'Vitamin C',
      brand: 'Limcee',
      currentQuantity: 30,
      minQuantity: 25,
      expiryDate: '2024-01-10',
      batchNo: 'B7890',
      priority: 'critical',
      acknowledged: true,
      createdAt: '2024-01-11T08:00:00'
    }
  ]);

  const [filterType, setFilterType] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [showAcknowledged, setShowAcknowledged] = useState(false);

  const alertTypes = [
    { value: 'low_stock', label: 'Low Stock', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'out_of_stock', label: 'Out of Stock', color: 'text-red-600 bg-red-100' },
    { value: 'expiring_soon', label: 'Expiring Soon', color: 'text-orange-600 bg-orange-100' },
    { value: 'expired', label: 'Expired', color: 'text-red-800 bg-red-200' }
  ];

  const priorityColors = {
    low: 'text-gray-600 bg-gray-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-orange-600 bg-orange-100',
    critical: 'text-red-600 bg-red-100'
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return <AlertTriangle className="w-5 h-5" />;
      case 'out_of_stock': return <XCircle className="w-5 h-5" />;
      case 'expiring_soon': return <Calendar className="w-5 h-5" />;
      case 'expired': return <XCircle className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    const alertType = alertTypes.find(at => at.value === type);
    return alertType?.color || 'text-gray-600 bg-gray-100';
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    toast.success('Alert acknowledged');
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    toast.success('Alert resolved');
  };

  const acknowledgeAll = () => {
    setAlerts(alerts.map(alert => ({ ...alert, acknowledged: true })));
    toast.success('All alerts acknowledged');
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = !filterType || alert.type === filterType;
    const matchesPriority = !filterPriority || alert.priority === filterPriority;
    const matchesAcknowledged = showAcknowledged || !alert.acknowledged;
    return matchesType && matchesPriority && matchesAcknowledged;
  });

  const alertStats = {
    total: alerts.length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length,
    critical: alerts.filter(a => a.priority === 'critical').length,
    high: alerts.filter(a => a.priority === 'high').length
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Alerts</h1>
            <p className="text-gray-600">Monitor inventory alerts and take action</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={acknowledgeAll}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Acknowledge All</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{alertStats.total}</p>
            </div>
            <Bell className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unacknowledged</p>
              <p className="text-2xl font-bold text-yellow-600">{alertStats.unacknowledged}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{alertStats.critical}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">{alertStats.high}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Alert Types</option>
            {alertTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showAcknowledged}
              onChange={(e) => setShowAcknowledged(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Show Acknowledged</span>
          </label>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${
              alert.priority === 'critical' ? 'border-l-red-500' :
              alert.priority === 'high' ? 'border-l-orange-500' :
              alert.priority === 'medium' ? 'border-l-yellow-500' :
              'border-l-gray-500'
            } ${alert.acknowledged ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getAlertColor(alert.type)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.medicineName}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getAlertColor(alert.type)}`}>
                      {alertTypes.find(at => at.value === alert.type)?.label}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${priorityColors[alert.priority]}`}>
                      {alert.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{alert.brand} - Batch: {alert.batchNo}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Current Stock:</span>
                      <span className="ml-2 font-medium text-gray-900">{alert.currentQuantity} units</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Min Required:</span>
                      <span className="ml-2 font-medium text-gray-900">{alert.minQuantity} units</span>
                    </div>
                    {alert.expiryDate && (
                      <div>
                        <span className="text-gray-500">Expiry:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {new Date(alert.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {new Date(alert.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {alert.type === 'expiring_soon' && alert.expiryDate && (
                    <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded">
                      <p className="text-orange-800 text-sm">
                        Expires in {getDaysUntilExpiry(alert.expiryDate)} days
                      </p>
                    </div>
                  )}

                  {alert.type === 'expired' && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                      <p className="text-red-800 text-sm font-medium">
                        This medication has expired and should be removed from inventory
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {!alert.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Acknowledge</span>
                  </button>
                )}
                
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                >
                  <Package className="w-4 h-4" />
                  <span>Resolve</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Alerts</h3>
            <p className="text-gray-500">All inventory items are properly stocked and within expiry dates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAlerts;