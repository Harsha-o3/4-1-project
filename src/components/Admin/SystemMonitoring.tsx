import React, { useState } from 'react';
import { Activity, Server, Database, Wifi, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface SystemMetric {
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: string;
  responseTime: string;
  lastCheck: string;
}

const SystemMonitoring: React.FC = () => {
  const [systemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: '45%', status: 'healthy', lastUpdated: '2024-01-15T10:30:00', trend: 'stable' },
    { name: 'Memory Usage', value: '62%', status: 'healthy', lastUpdated: '2024-01-15T10:30:00', trend: 'up' },
    { name: 'Disk Usage', value: '78%', status: 'warning', lastUpdated: '2024-01-15T10:30:00', trend: 'up' },
    { name: 'Network I/O', value: '1.2 MB/s', status: 'healthy', lastUpdated: '2024-01-15T10:30:00', trend: 'stable' },
    { name: 'Active Connections', value: '156', status: 'healthy', lastUpdated: '2024-01-15T10:30:00', trend: 'up' },
    { name: 'Database Connections', value: '12/100', status: 'healthy', lastUpdated: '2024-01-15T10:30:00', trend: 'stable' }
  ]);

  const [services] = useState<ServiceStatus[]>([
    { name: 'Web Server', status: 'online', uptime: '99.9%', responseTime: '142ms', lastCheck: '2024-01-15T10:30:00' },
    { name: 'Database', status: 'online', uptime: '99.8%', responseTime: '45ms', lastCheck: '2024-01-15T10:30:00' },
    { name: 'WebRTC Server', status: 'online', uptime: '98.5%', responseTime: '89ms', lastCheck: '2024-01-15T10:30:00' },
    { name: 'SMS Gateway', status: 'degraded', uptime: '95.2%', responseTime: '2.1s', lastCheck: '2024-01-15T10:29:00' },
    { name: 'Email Service', status: 'online', uptime: '99.1%', responseTime: '156ms', lastCheck: '2024-01-15T10:30:00' },
    { name: 'File Storage', status: 'online', uptime: '99.9%', responseTime: '78ms', lastCheck: '2024-01-15T10:30:00' }
  ]);

  const [recentEvents] = useState([
    { id: '1', type: 'info', message: 'System backup completed successfully', timestamp: '2024-01-15T06:00:00' },
    { id: '2', type: 'warning', message: 'High memory usage detected on web server', timestamp: '2024-01-15T09:45:00' },
    { id: '3', type: 'error', message: 'SMS gateway timeout - retrying', timestamp: '2024-01-15T10:15:00' },
    { id: '4', type: 'info', message: 'Database optimization completed', timestamp: '2024-01-15T08:30:00' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online': return 'text-green-600 bg-green-100';
      case 'warning':
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'warning':
      case 'degraded': return <AlertCircle className="w-4 h-4" />;
      case 'critical':
      case 'offline': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Monitoring</h1>
        <p className="text-gray-600">Monitor system health and performance metrics</p>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {systemMetrics.map(metric => (
          <div key={metric.name} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {getStatusIcon(metric.status)}
                <span>{metric.status}</span>
              </span>
              <span className={`text-xs ${
                metric.trend === 'up' ? 'text-red-500' : 
                metric.trend === 'down' ? 'text-green-500' : 
                'text-gray-500'
              }`}>
                {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
              </span>
            </div>
            <h3 className="font-medium text-gray-900 text-sm">{metric.name}</h3>
            <p className="text-xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-gray-500">
              Updated: {new Date(metric.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Service Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Status</h2>
          
          <div className="space-y-4">
            {services.map(service => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(service.status)}`}>
                    {service.name === 'Web Server' && <Server className="w-4 h-4" />}
                    {service.name === 'Database' && <Database className="w-4 h-4" />}
                    {service.name === 'WebRTC Server' && <Wifi className="w-4 h-4" />}
                    {service.name === 'SMS Gateway' && <Activity className="w-4 h-4" />}
                    {service.name === 'Email Service' && <Activity className="w-4 h-4" />}
                    {service.name === 'File Storage' && <Server className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Uptime: {service.uptime}</span>
                      <span>Response: {service.responseTime}</span>
                    </div>
                  </div>
                </div>
                
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                  {getStatusIcon(service.status)}
                  <span>{service.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Events</h2>
          
          <div className="space-y-3">
            {recentEvents.map(event => (
              <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getEventColor(event.type)}`}>
                  {event.type === 'info' && <CheckCircle className="w-3 h-3" />}
                  {event.type === 'warning' && <AlertCircle className="w-3 h-3" />}
                  {event.type === 'error' && <AlertCircle className="w-3 h-3" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{event.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Charts Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Trends</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-4">Response Time (24h)</h3>
            <div className="h-32 flex items-end justify-between space-x-1">
              {[120, 135, 142, 138, 145, 139, 142, 148, 144, 142, 140, 142].map((value, index) => (
                <div
                  key={index}
                  className="bg-blue-600 rounded-t"
                  style={{ height: `${(value / 200) * 100}%`, width: '8%' }}
                  title={`${value}ms`}
                ></div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Average: 142ms</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-4">Active Users (24h)</h3>
            <div className="h-32 flex items-end justify-between space-x-1">
              {[45, 52, 48, 65, 78, 85, 92, 88, 76, 68, 58, 62].map((value, index) => (
                <div
                  key={index}
                  className="bg-green-600 rounded-t"
                  style={{ height: `${(value / 100) * 100}%`, width: '8%' }}
                  title={`${value} users`}
                ></div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Peak: 92 users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;