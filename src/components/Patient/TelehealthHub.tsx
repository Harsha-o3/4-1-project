import React, { useState } from 'react';
import { Video, Phone, MessageSquare, Calendar, Clock, Star, Users, Heart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TelehealthHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const consultationTypes = [
    {
      id: 'video',
      name: 'Video Consultation',
      icon: Video,
      description: 'Face-to-face consultation with HD video',
      price: '₹500',
      duration: '30 min',
      color: 'bg-blue-500',
      features: ['HD Video Call', 'Screen Sharing', 'Digital Prescription', 'Medical Records Access']
    },
    {
      id: 'audio',
      name: 'Voice Consultation',
      icon: Phone,
      description: 'Audio-only consultation for quick queries',
      price: '₹300',
      duration: '20 min',
      color: 'bg-green-500',
      features: ['Crystal Clear Audio', 'Quick Consultation', 'Digital Prescription', 'Follow-up Support']
    },
    {
      id: 'chat',
      name: 'Text Consultation',
      icon: MessageSquare,
      description: 'Text-based consultation for non-urgent queries',
      price: '₹200',
      duration: '24 hrs',
      color: 'bg-purple-500',
      features: ['24/7 Response', 'Detailed Text Analysis', 'Photo Sharing', 'Medical Advice']
    }
  ];

  const specialtyServices = [
    {
      name: 'General Medicine',
      doctors: 12,
      avgRating: 4.8,
      consultations: 1250,
      icon: Heart,
      color: 'bg-red-100 text-red-600'
    },
    {
      name: 'Cardiology',
      doctors: 8,
      avgRating: 4.9,
      consultations: 890,
      icon: Heart,
      color: 'bg-pink-100 text-pink-600'
    },
    {
      name: 'Pediatrics',
      doctors: 6,
      avgRating: 4.7,
      consultations: 670,
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Dermatology',
      doctors: 4,
      avgRating: 4.8,
      consultations: 450,
      icon: Activity,
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Healthcare at Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              Fingertips
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Connect with qualified doctors instantly. Get expert medical advice from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/patient/appointments')}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Book Consultation Now
            </button>
            <button
              onClick={() => navigate('/patient/symptoms')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              Check Symptoms
            </button>
          </div>
        </div>
      </div>

      {/* Consultation Types */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Consultation Type
            </h2>
            <p className="text-xl text-gray-600">
              Flexible healthcare options designed for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationTypes.map((type) => (
              <div
                key={type.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`${type.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <type.icon className="w-12 h-12" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">{type.price}</div>
                      <div className="text-sm opacity-90">{type.duration}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{type.name}</h3>
                  <p className="opacity-90">{type.description}</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => navigate('/patient/appointments')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specialty Services */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-gray-600">
              Expert care across multiple medical specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialtyServices.map((specialty, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${specialty.color} rounded-xl flex items-center justify-center mb-4`}>
                  <specialty.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{specialty.name}</h3>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Doctors Available</span>
                    <span className="font-semibold text-gray-900">{specialty.doctors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{specialty.avgRating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Consultations</span>
                    <span className="font-semibold text-gray-900">{specialty.consultations}+</span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/patient/appointments')}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Health Actions
            </h2>
            <p className="text-xl text-gray-600">
              Instant access to essential healthcare services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => navigate('/patient/symptoms')}
              className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-6 rounded-xl cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Activity className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Symptom Checker</h3>
              <p className="opacity-90">AI-powered health assessment</p>
            </div>

            <div
              onClick={() => navigate('/patient/emergency')}
              className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-xl cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Phone className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Emergency</h3>
              <p className="opacity-90">24/7 emergency support</p>
            </div>

            <div
              onClick={() => navigate('/patient/pharmacy')}
              className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Calendar className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Find Pharmacy</h3>
              <p className="opacity-90">Locate nearby pharmacies</p>
            </div>

            <div
              onClick={() => navigate('/patient/records')}
              className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 rounded-xl cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Health Records</h3>
              <p className="opacity-90">Access your medical history</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelehealthHub;