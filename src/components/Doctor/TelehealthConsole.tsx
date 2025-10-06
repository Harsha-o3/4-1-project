import React, { useState } from 'react';
import { Video, Users, Clock, Activity, MessageSquare, Phone, Monitor, Settings } from 'lucide-react';

interface ActiveConsultation {
  id: string;
  patientName: string;
  patientAge: number;
  consultationType: 'video' | 'audio' | 'chat';
  startTime: string;
  duration: number;
  status: 'waiting' | 'active' | 'completed';
  priority: 'normal' | 'urgent' | 'emergency';
}

const TelehealthConsole: React.FC = () => {
  const [activeConsultations] = useState<ActiveConsultation[]>([
    {
      id: '1',
      patientName: 'Ram Singh',
      patientAge: 45,
      consultationType: 'video',
      startTime: '10:30',
      duration: 15,
      status: 'active',
      priority: 'normal'
    },
    {
      id: '2',
      patientName: 'Priya Kaur',
      patientAge: 32,
      consultationType: 'audio',
      startTime: '11:00',
      duration: 0,
      status: 'waiting',
      priority: 'urgent'
    }
  ]);

  const [selectedConsultation, setSelectedConsultation] = useState<ActiveConsultation | null>(null);
  const [systemStatus] = useState({
    videoQuality: 'HD',
    audioQuality: 'Clear',
    networkLatency: '45ms',
    serverLoad: '23%',
    activeConnections: 12
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'text-yellow-600 bg-yellow-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'text-red-600 bg-red-100 border-red-500';
      case 'urgent': return 'text-orange-600 bg-orange-100 border-orange-500';
      case 'normal': return 'text-blue-600 bg-blue-100 border-blue-500';
      default: return 'text-gray-600 bg-gray-100 border-gray-500';
    }
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Phone className="w-5 h-5" />;
      case 'chat': return <MessageSquare className="w-5 h-5" />;
      default: return <Video className="w-5 h-5" />;
    }
  };

  const joinConsultation = (consultation: ActiveConsultation) => {
    setSelectedConsultation(consultation);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Telehealth Console</h1>
        <p className="text-gray-600">Manage active consultations and monitor system performance</p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Video Quality</p>
              <p className="text-lg font-bold text-green-600">{systemStatus.videoQuality}</p>
            </div>
            <Monitor className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Audio Quality</p>
              <p className="text-lg font-bold text-blue-600">{systemStatus.audioQuality}</p>
            </div>
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Network Latency</p>
              <p className="text-lg font-bold text-purple-600">{systemStatus.networkLatency}</p>
            </div>
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Server Load</p>
              <p className="text-lg font-bold text-orange-600">{systemStatus.serverLoad}</p>
            </div>
            <Settings className="w-6 h-6 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Connections</p>
              <p className="text-lg font-bold text-gray-900">{systemStatus.activeConnections}</p>
            </div>
            <Users className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Consultations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Consultations</h2>
          
          <div className="space-y-4">
            {activeConsultations.map(consultation => (
              <div
                key={consultation.id}
                className={`p-4 rounded-xl border-l-4 ${getPriorityColor(consultation.priority)} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(consultation.status)}`}>
                      {getConsultationIcon(consultation.consultationType)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{consultation.patientName}</h3>
                      <p className="text-sm text-gray-600">Age: {consultation.patientAge}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                          {consultation.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(consultation.priority)}`}>
                          {consultation.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Started: {consultation.startTime}</div>
                    <div className="text-sm font-medium text-gray-900">
                      Duration: {consultation.duration}m
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => joinConsultation(consultation)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {consultation.status === 'waiting' ? 'Start' : 'Join'}
                  </button>
                  {consultation.status === 'active' && (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      End
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedConsultation ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedConsultation.patientName}</h2>
                  <p className="text-gray-600">Active Consultation</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedConsultation.status)}`}>
                  {selectedConsultation.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient Age</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedConsultation.patientAge} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Consultation Type</label>
                    <div className="flex items-center space-x-2">
                      {getConsultationIcon(selectedConsultation.consultationType)}
                      <span className="text-lg font-semibold text-gray-900 capitalize">
                        {selectedConsultation.consultationType}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Video className="w-4 h-4" />
                      <span>Start Video</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                      <Phone className="w-4 h-4" />
                      <span>Audio Call</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                      <Clock className="w-4 h-4" />
                      <span>Schedule</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Patient History</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Visit:</span>
                      <span className="text-gray-900">2 weeks ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Visits:</span>
                      <span className="text-gray-900">8 visits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conditions:</span>
                      <span className="text-gray-900">Hypertension, Diabetes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Monitor className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Telehealth Console</h3>
              <p className="text-gray-500">Select an active consultation to manage the session.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TelehealthConsole;