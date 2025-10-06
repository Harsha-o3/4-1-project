import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Phone, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Appointment {
  id: string;
  scheduledTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  mode: 'VIDEO' | 'AUDIO' | 'IN_PERSON';
  patient: {
    id: string;
    user: {
      name: string;
      phone: string;
    };
    dob: string;
    gender: string;
    village: string;
  };
}

const DoctorAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate, filterStatus]);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/appointments');
      let filteredAppointments = response.data;

      // Filter by date
      if (selectedDate) {
        filteredAppointments = filteredAppointments.filter((apt: Appointment) =>
          apt.scheduledTime.startsWith(selectedDate)
        );
      }

      // Filter by status
      if (filterStatus !== 'all') {
        filteredAppointments = filteredAppointments.filter((apt: Appointment) =>
          apt.status === filterStatus
        );
      }

      setAppointments(filteredAppointments);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      await axios.put(`/api/appointments/${appointmentId}/status`, { status });
      toast.success('Appointment status updated');
      fetchAppointments();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update appointment');
    }
  };

  const startConsultation = (appointment: Appointment) => {
    // In a real app, this would open the video consultation interface
    toast.success('Starting consultation...');
    updateAppointmentStatus(appointment.id, 'CONFIRMED');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'CONFIRMED': return 'text-blue-600 bg-blue-100';
      case 'COMPLETED': return 'text-green-600 bg-green-100';
      case 'CANCELLED': return 'text-red-600 bg-red-100';
      case 'NO_SHOW': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'CONFIRMED': return <CheckCircle className="w-4 h-4" />;
      case 'COMPLETED': return <CheckCircle className="w-4 h-4" />;
      case 'CANCELLED': return <XCircle className="w-4 h-4" />;
      case 'NO_SHOW': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'VIDEO': return <Video className="w-4 h-4" />;
      case 'AUDIO': return <Phone className="w-4 h-4" />;
      case 'IN_PERSON': return <User className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getTodayStats = () => {
    const todayAppointments = appointments.filter(apt =>
      apt.scheduledTime.startsWith(new Date().toISOString().split('T')[0])
    );

    return {
      total: todayAppointments.length,
      pending: todayAppointments.filter(apt => apt.status === 'PENDING').length,
      confirmed: todayAppointments.filter(apt => apt.status === 'CONFIRMED').length,
      completed: todayAppointments.filter(apt => apt.status === 'COMPLETED').length
    };
  };

  const stats = getTodayStats();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">Manage your patient consultations and schedule</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="NO_SHOW">No Show</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchAppointments}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map(appointment => (
          <div key={appointment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {appointment.patient.user.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>Age: {calculateAge(appointment.patient.dob)}</span>
                    <span>Gender: {appointment.patient.gender}</span>
                    <span>Village: {appointment.patient.village}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{appointment.patient.user.phone}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span>{appointment.status}</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {getModeIcon(appointment.mode)}
                    <span>{appointment.mode}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(appointment.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
              {appointment.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, 'CANCELLED')}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}

              {appointment.status === 'CONFIRMED' && (
                <>
                  <button
                    onClick={() => startConsultation(appointment)}
                    className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {appointment.mode === 'VIDEO' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                    <span>Start Consultation</span>
                  </button>
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, 'NO_SHOW')}
                    className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Mark No Show
                  </button>
                </>
              )}

              {appointment.status === 'COMPLETED' && (
                <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg cursor-not-allowed">
                  Consultation Complete
                </button>
              )}
            </div>
          </div>
        ))}

        {appointments.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments Found</h3>
            <p className="text-gray-500">No appointments match your selected criteria.</p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading appointments...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;