import React, { useState } from 'react';
import { MessageSquare, Send, Phone, Video, FileText, Image, Paperclip, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'doctor' | 'patient';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'prescription';
  attachments?: string[];
  read: boolean;
}

interface Conversation {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'archived';
  priority: 'normal' | 'urgent';
}

const PatientCommunication: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      patientId: 'p1',
      patientName: 'Ram Singh',
      patientAge: 45,
      lastMessage: 'Thank you for the prescription, Doctor.',
      lastMessageTime: '2024-01-15T14:30:00',
      unreadCount: 0,
      status: 'active',
      priority: 'normal'
    },
    {
      id: '2',
      patientId: 'p2',
      patientName: 'Priya Kaur',
      patientAge: 32,
      lastMessage: 'I have some questions about my medication.',
      lastMessageTime: '2024-01-15T13:45:00',
      unreadCount: 2,
      status: 'active',
      priority: 'urgent'
    }
  ]);

  const [messages] = useState<{ [key: string]: Message[] }>({
    '1': [
      {
        id: '1',
        senderId: 'p1',
        senderName: 'Ram Singh',
        senderRole: 'patient',
        content: 'Hello Doctor, I wanted to follow up on my blood pressure medication.',
        timestamp: '2024-01-15T14:00:00',
        type: 'text',
        read: true
      },
      {
        id: '2',
        senderId: 'd1',
        senderName: 'Dr. Rajesh Kumar',
        senderRole: 'doctor',
        content: 'Hello Ram, how are you feeling? Any side effects from the medication?',
        timestamp: '2024-01-15T14:05:00',
        type: 'text',
        read: true
      },
      {
        id: '3',
        senderId: 'p1',
        senderName: 'Ram Singh',
        senderRole: 'patient',
        content: 'No side effects, feeling much better. Blood pressure is stable.',
        timestamp: '2024-01-15T14:10:00',
        type: 'text',
        read: true
      }
    ],
    '2': [
      {
        id: '4',
        senderId: 'p2',
        senderName: 'Priya Kaur',
        senderRole: 'patient',
        content: 'Doctor, I have some questions about my medication timing.',
        timestamp: '2024-01-15T13:30:00',
        type: 'text',
        read: true
      },
      {
        id: '5',
        senderId: 'p2',
        senderName: 'Priya Kaur',
        senderRole: 'patient',
        content: 'Should I take it before or after meals?',
        timestamp: '2024-01-15T13:45:00',
        type: 'text',
        read: false
      }
    ]
  });

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      toast.success('Message sent successfully');
      setNewMessage('');
    }
  };

  const startVideoCall = (patientName: string) => {
    toast.success(`Starting video call with ${patientName}`);
  };

  const startAudioCall = (patientName: string) => {
    toast.success(`Starting audio call with ${patientName}`);
  };

  const sendPrescription = (patientName: string) => {
    toast.success(`Prescription sent to ${patientName}`);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const activeChats = conversations.filter(c => c.status === 'active').length;
  const urgentChats = conversations.filter(c => c.priority === 'urgent').length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Communication</h1>
        <p className="text-gray-600">Communicate with patients through secure messaging</p>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Chats</p>
              <p className="text-2xl font-bold text-blue-600">{activeChats}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-red-600">{totalUnread}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent Chats</p>
              <p className="text-2xl font-bold text-orange-600">{urgentChats}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Time</p>
              <p className="text-2xl font-bold text-green-600">12m</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation?.id === conversation.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{conversation.patientName}</h3>
                      {conversation.priority === 'urgent' && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Urgent</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(conversation.lastMessageTime).toLocaleTimeString()}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-96">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConversation.patientName}</h3>
                  <p className="text-sm text-gray-600">Age: {selectedConversation.patientAge}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startVideoCall(selectedConversation.patientName)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => startAudioCall(selectedConversation.patientName)}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sendPrescription(selectedConversation.patientName)}
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {(messages[selectedConversation.id] || []).map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderRole === 'doctor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderRole === 'doctor'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderRole === 'doctor' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Image className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Conversation</h3>
                <p className="text-gray-500">Choose a patient conversation to start messaging.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientCommunication;