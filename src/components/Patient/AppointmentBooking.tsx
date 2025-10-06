import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Phone, User, Star, MapPin, Search } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Doctor {
  id: string;
  user: {
    id: string;
    name: string;
    phone: string;
  };
  regNo: string;
  specializations: string[];
  qualifications: string;
  languages: string[];
  telemedicineEnabled: boolean;
}

const AppointmentBooking: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'VIDEO' | 'AUDIO' | 'IN_PERSON'>('VIDEO');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const specialties = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Gynecology',
    'Orthopedics',
    'Neurology',
    'Psychiatry'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialty]);

  const fetchDoctors = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedSpecialty) params.append('specialty', selectedSpecialty);
      
      const response = await axios.get(`/api/doctors/search?${params}`);
      setDoctors(response.data);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    }
  };

  const bookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Please select doctor, date and time');
      return;
    }

    setIsLoading(true);
    try {
      const scheduledTime = new Date(`${selectedDate}T${selectedTime}`);
      
      await axios.post('/api/appointments', {
        doctorId: selectedDoctor.id,
        scheduledTime: scheduledTime.toISOString(),
        mode: consultationType
      });

      toast.success('Appointment booked successfully!');
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to book appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specializations.some(spec => 
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
        <p className="text-gray-600">Schedule a consultation with our qualified doctors</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          <select
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="VIDEO">Video Consultation</option>
            <option value="AUDIO">Audio Only</option>
            <option value="IN_PERSON">In-Person</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doctor Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Doctor</h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredDoctors.map(doctor => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedDoctor?.id === doctor.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{doctor.user.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.qualifications}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doctor.specializations.map(spec => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                      {doctor.telemedicineEnabled && (
                        <span className="flex items-center space-x-1 text-green-600 text-sm">
                          <Video className="w-4 h-4" />
                          <span>Online Available</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
          
          {selectedDoctor ? (
            <div className="space-y-6">
              {/* Selected Doctor Info */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedDoctor.user.name}</h4>
                    <p className="text-sm text-gray-600">{selectedDoctor.specializations.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getTomorrowDate()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedTime === time
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="VIDEO"
                      checked={consultationType === 'VIDEO'}
                      onChange={(e) => setConsultationType(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <Video className="w-5 h-5 text-gray-400" />
                    <span>Video Consultation</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="AUDIO"
                      checked={consultationType === 'AUDIO'}
                      onChange={(e) => setConsultationType(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>Audio Only</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="IN_PERSON"
                      checked={consultationType === 'IN_PERSON'}
                      onChange={(e) => setConsultationType(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>In-Person Visit</span>
                  </label>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={bookAppointment}
                disabled={isLoading || !selectedDate || !selectedTime}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a doctor to continue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;