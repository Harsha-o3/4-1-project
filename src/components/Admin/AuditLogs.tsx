import React, { useState } from 'react';
import { Search, Filter, Download, Eye, User, Calendar, Shield, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

const AuditLogs: React.FC = () => {
  const [logs] = useState<AuditLog[]>([
    {
      id: '1',
      userId: 'u-doctor-1',
      userName: 'Dr. Rajesh Kumar',
      userRole: 'DOCTOR',
      action: 'LOGIN',
      resource: 'Authentication',
      details: 'Successful login via email/password',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: '2024-01-15T10:30:00',
      status: 'success'
    },
    {
      id: '2',
      userId: 'u-patient-1',
      userName: 'Ram Singh',
      userRole: 'PATIENT',
      action: 'CREATE_APPOINTMENT',
      resource: 'Appointments',
      details: 'Created appointment with Dr. Rajesh Kumar for 2024-01-16T14:00:00',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Android 10; Mobile; rv:81.0) Gecko/81.0 Firefox/81.0',
      timestamp: '2024-01-15T10:25:00',
      status: 'success'
    },
    {
      id: '3',
      userId: 'u-admin-1',
      userName: 'System Admin',
      userRole: 'ADMIN',
      action: 'UPDATE_USER',
      resource: 'User Management',
      details: 'Updated user status for Dr. Priya Sharma to active',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      timestamp: '2024-01-15T10:20:00',
      status: 'success'
    },
    {
      id: '4',
      userId: 'u-pharmacy-1',
      userName: 'Nabha Medical Store',
      userRole: 'PHARMACY',
      action: 'LOGIN_FAILED',
      resource: 'Authentication',
      details: 'Failed login attempt - invalid OTP',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
      timestamp: '2024-01-15T10:15:00',
      status: 'failed'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const actions = ['LOGIN', 'LOGOUT', 'CREATE_APPOINTMENT', 'UPDATE_USER', 'DELETE_RECORD', 'VIEW_RECORD', 'LOGIN_FAILED'];
  const roles = ['PATIENT', 'DOCTOR', 'PHARMACY', 'ADMIN'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('LOGIN')) return <Shield className="w-4 h-4" />;
    if (action.includes('CREATE') || action.includes('UPDATE')) return <User className="w-4 h-4" />;
    if (action.includes('VIEW')) return <Eye className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const exportLogs = () => {
    let csvContent = 'Timestamp,User,Role,Action,Resource,Status,IP Address,Details\n';
    
    filteredLogs.forEach(log => {
      csvContent += `${log.timestamp},${log.userName},${log.userRole},${log.action},${log.resource},${log.status},${log.ipAddress},"${log.details}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Audit logs exported successfully');
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = !filterAction || log.action === filterAction;
    const matchesRole = !filterRole || log.userRole === filterRole;
    const matchesStatus = !filterStatus || log.status === filterStatus;
    
    return matchesSearch && matchesAction && matchesRole && matchesStatus;
  });

  const logStats = {
    total: logs.length,
    success: logs.filter(l => l.status === 'success').length,
    failed: logs.filter(l => l.status === 'failed').length,
    warning: logs.filter(l => l.status === 'warning').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Logs</h1>
            <p className="text-gray-600">Monitor user activities and system events</p>
          </div>
          <button
            onClick={exportLogs}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{logStats.total}</p>
            </div>
            <Shield className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-green-600">{logStats.success}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{logStats.failed}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{logStats.warning}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Actions</option>
            {actions.map(action => (
              <option key={action} value={action}>{action.replace('_', ' ')}</option>
            ))}
          </select>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            {filteredLogs.length} events
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logs List */}
        <div className="space-y-3">
          {filteredLogs.map(log => (
            <div
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className={`bg-white p-4 rounded-xl shadow-sm border cursor-pointer transition-colors ${
                selectedLog?.id === log.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(log.status)}`}>
                  {getActionIcon(log.action)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{log.action.replace('_', ' ')}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{log.userName} ({log.userRole})</p>
                  <p className="text-sm text-gray-500">{log.resource}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Log Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedLog ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedLog.action.replace('_', ' ')}</h2>
                  <p className="text-gray-600">{selectedLog.resource}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(selectedLog.status)}`}>
                  {selectedLog.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.userName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.userRole}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IP Address</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.ipAddress}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedLog.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Details</label>
                  <p className="mt-1 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {selectedLog.details}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">User Agent</label>
                  <p className="mt-1 text-xs text-gray-600 p-3 bg-gray-50 rounded-lg break-all">
                    {selectedLog.userAgent}
                  </p>
                </div>

                {selectedLog.status === 'failed' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-900">Security Alert</span>
                    </div>
                    <p className="text-red-800 text-sm mt-1">
                      This failed action may indicate a security issue. Review user activity and consider additional security measures.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Log Entry</h3>
              <p className="text-gray-500">Choose a log entry from the list to view detailed information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;