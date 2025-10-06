import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, MessageSquare, Camera, Settings, Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ConsultationData {
  id: string;
  doctor: {
    name: string;
    specialization: string;
    photo?: string;
  };
  patient: {
    name: string;
    age: number;
  };
  scheduledTime: string;
  status: string;
}

const VideoConsultation: React.FC = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'fair' | 'poor'>('good');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [consultationData, setConsultationData] = useState<ConsultationData | null>(null);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Initialize consultation data
    setConsultationData({
      id: appointmentId || '1',
      doctor: {
        name: 'Dr. Rajesh Kumar',
        specialization: 'General Medicine',
      },
      patient: {
        name: 'Ram Singh',
        age: 35,
      },
      scheduledTime: new Date().toISOString(),
      status: 'ACTIVE'
    });

    // Start call timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Simulate connection after 3 seconds
    setTimeout(() => {
      setIsConnected(true);
      toast.success('Connected to doctor');
    }, 3000);

    return () => clearInterval(timer);
  }, [appointmentId]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast.success(isVideoOn ? 'Video turned off' : 'Video turned on');
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast.success(isAudioOn ? 'Microphone muted' : 'Microphone unmuted');
  };

  const endCall = () => {
    toast.success('Consultation ended');
    navigate('/patient/appointments');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'patient',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const getQualityColor = () => {
    switch (connectionQuality) {
      case 'good': return 'text-green-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold">{consultationData?.doctor.name}</h1>
            <p className="text-gray-300 text-sm">{consultationData?.doctor.specialization}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm">
            {formatDuration(callDuration)}
          </div>
          <div className={`text-sm ${getQualityColor()}`}>
            {connectionQuality.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          {isConnected ? (
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-white" />
              </div>
              <p className="text-white text-lg">Connecting to doctor...</p>
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture in Picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden">
          {isVideoOn ? (
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <VideoOff className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="absolute right-4 top-20 bottom-20 w-80 bg-white rounded-lg shadow-lg flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Chat</h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === 'patient'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-75 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isVideoOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6 text-white" />
            ) : (
              <VideoOff className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isAudioOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isAudioOn ? (
              <Mic className="w-6 h-6 text-white" />
            ) : (
              <MicOff className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={endCall}
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
          >
            <Phone className="w-6 h-6 text-white transform rotate-135" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;