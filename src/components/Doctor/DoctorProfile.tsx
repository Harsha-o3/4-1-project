import React, { useState } from 'react';
import { User, CreditCard as Edit, Save, Calendar, Clock, Languages, Award, MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface DoctorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  regNo: string;
  specializations: string[];
  qualifications: string;
  experience: number;
  languages: string[];
  clinicName: string;
  clinicAddress: string;
  consultationFee: number;
  bio: string;
  availability: any;
  telemedicineEnabled: boolean;
}

const DoctorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<DoctorProfile>({
    id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@nabha.health',
    phone: '+91-9999999999',
    regNo: 'MED001',
    specializations: ['General Medicine', 'Internal Medicine'],
    qualifications: 'MBBS, MD (Internal Medicine)',
    experience: 15,
    languages: ['English', 'Hindi', 'Punjabi'],
    clinicName: 'Kumar Medical Center',
    clinicAddress: 'Main Street, Nabha, Punjab',
    consultationFee: 500,
    bio: 'Experienced general physician with 15+ years of practice in rural healthcare. Specialized in treating common ailments and chronic conditions.',
    availability: {
      monday: { start: '09:00', end: '17:00', enabled: true },
      tuesday: { start: '09:00', end: '17:00', enabled: true },
      wednesday: { start: '09:00', end: '17:00', enabled: true },
      thursday: { start: '09:00', end: '17:00', enabled: true },
      friday: { start: '09:00', end: '17:00', enabled: true },
      saturday: { start: '09:00', end: '13:00', enabled: true },
      sunday: { start: '10:00', end: '12:00', enabled: false }
    },
    telemedicineEnabled: true
  });

  const [formData, setFormData] = useState(profile);

  const specialtyOptions = [
    'General Medicine', 'Internal Medicine', 'Cardiology', 'Dermatology',
    'Pediatrics', 'Gynecology', 'Orthopedics', 'Neurology', 'Psychiatry',
    'ENT', 'Ophthalmology', 'Dentistry'
  ];

  const languageOptions = ['English', 'Hindi', 'Punjabi', 'Urdu', 'Bengali'];

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const updateAvailability = (day: string, field: string, value: any) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [day]: {
          ...formData.availability[day],
          [field]: value
        }
      }
    });
  };

  const toggleSpecialization = (specialty: string) => {
    const specializations = formData.specializations.includes(specialty)
      ? formData.specializations.filter(s => s !== specialty)
      : [...formData.specializations, specialty];
    setFormData({ ...formData, specializations });
  };

  const toggleLanguage = (language: string) => {
    const languages = formData.languages.includes(language)
      ? formData.languages.filter(l => l !== language)
      : [...formData.languages, language];
    setFormData({ ...formData, languages });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Profile</h1>
            <p className="text-gray-600">Manage your professional information and availability</p>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600">{profile.specializations.join(', ')}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profile.experience} years experience</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profile.clinicName}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profile.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Languages className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profile.languages.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                <input
                  type="text"
                  value={formData.regNo}
                  onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (₹)</label>
                <input
                  type="number"
                  value={formData.consultationFee}
                  onChange={(e) => setFormData({ ...formData, consultationFee: parseInt(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
              <textarea
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                disabled={!isEditing}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Clinic Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                <input
                  type="text"
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Address</label>
                <textarea
                  value={formData.clinicAddress}
                  onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
                  disabled={!isEditing}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {specialtyOptions.map(specialty => (
                <label key={specialty} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.specializations.includes(specialty)}
                    onChange={() => toggleSpecialization(specialty)}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  />
                  <span className="text-sm text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {languageOptions.map(language => (
                <label key={language} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.languages.includes(language)}
                    onChange={() => toggleLanguage(language)}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  />
                  <span className="text-sm text-gray-700">{language}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Schedule */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Availability Schedule</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.telemedicineEnabled}
                  onChange={(e) => setFormData({ ...formData, telemedicineEnabled: e.target.checked })}
                  disabled={!isEditing}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <span className="text-sm text-gray-700">Enable Telemedicine</span>
              </label>
            </div>
            
            <div className="space-y-3">
              {Object.entries(formData.availability).map(([day, schedule]: [string, any]) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-20">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={(e) => updateAvailability(day, 'enabled', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                    </label>
                  </div>
                  
                  {schedule.enabled && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <input
                          type="time"
                          value={schedule.start}
                          onChange={(e) => updateAvailability(day, 'start', e.target.value)}
                          disabled={!isEditing}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={schedule.end}
                          onChange={(e) => updateAvailability(day, 'end', e.target.value)}
                          disabled={!isEditing}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;