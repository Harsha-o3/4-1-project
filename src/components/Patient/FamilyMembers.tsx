import React, { useState } from 'react';
import { Users, Plus, CreditCard as Edit, Trash2, User, Calendar, Heart, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  phone?: string;
  allergies: string;
  conditions: string;
  emergencyContact: boolean;
  profilePhoto?: string;
}

const FamilyMembers: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Priya Singh',
      relationship: 'Spouse',
      dob: '1988-03-15',
      gender: 'Female',
      bloodGroup: 'A+',
      phone: '+91-9999999998',
      allergies: 'None',
      conditions: 'None',
      emergencyContact: true
    },
    {
      id: '2',
      name: 'Arjun Singh',
      relationship: 'Son',
      dob: '2015-07-22',
      gender: 'Male',
      bloodGroup: 'B+',
      allergies: 'Peanuts',
      conditions: 'Asthma',
      emergencyContact: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    allergies: '',
    conditions: '',
    emergencyContact: false
  });

  const relationships = [
    'Spouse', 'Son', 'Daughter', 'Father', 'Mother', 
    'Brother', 'Sister', 'Grandfather', 'Grandmother', 'Other'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMember) {
      setFamilyMembers(familyMembers.map(member => 
        member.id === editingMember.id 
          ? { ...editingMember, ...formData }
          : member
      ));
      toast.success('Family member updated successfully');
    } else {
      const newMember: FamilyMember = {
        id: Date.now().toString(),
        ...formData
      };
      setFamilyMembers([...familyMembers, newMember]);
      toast.success('Family member added successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      relationship: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      phone: '',
      allergies: '',
      conditions: '',
      emergencyContact: false
    });
    setShowAddForm(false);
    setEditingMember(null);
  };

  const handleEdit = (member: FamilyMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      relationship: member.relationship,
      dob: member.dob,
      gender: member.gender,
      bloodGroup: member.bloodGroup,
      phone: member.phone || '',
      allergies: member.allergies,
      conditions: member.conditions,
      emergencyContact: member.emergencyContact
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
    toast.success('Family member removed successfully');
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const bookAppointmentForMember = (member: FamilyMember) => {
    toast.success(`Booking appointment for ${member.name}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Members</h1>
        <p className="text-gray-600">Manage health information for your family members</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Family Members</p>
              <p className="text-2xl font-bold text-gray-900">{familyMembers.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emergency Contacts</p>
              <p className="text-2xl font-bold text-green-600">
                {familyMembers.filter(m => m.emergencyContact).length}
              </p>
            </div>
            <Phone className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Adults</p>
              <p className="text-2xl font-bold text-purple-600">
                {familyMembers.filter(m => calculateAge(m.dob) >= 18).length}
              </p>
            </div>
            <User className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Children</p>
              <p className="text-2xl font-bold text-orange-600">
                {familyMembers.filter(m => calculateAge(m.dob) < 18).length}
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingMember ? 'Edit Family Member' : 'Add Family Member'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Relationship</option>
                  {relationships.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List any known allergies..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                <textarea
                  value={formData.conditions}
                  onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List any medical conditions..."
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="emergencyContact"
                checked={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="emergencyContact" className="ml-2 block text-sm text-gray-900">
                Set as emergency contact
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingMember ? 'Update Member' : 'Add Member'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Family Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add New Member Card */}
        <div
          onClick={() => setShowAddForm(true)}
          className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer transition-colors"
        >
          <div className="text-center">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Add Family Member</h3>
            <p className="text-gray-500">Add a new family member to manage their health information</p>
          </div>
        </div>

        {/* Family Member Cards */}
        {familyMembers.map(member => (
          <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.relationship}</p>
                  {member.emergencyContact && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mt-1">
                      Emergency Contact
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Age: {calculateAge(member.dob)} years</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{member.gender}</span>
              </div>
              
              {member.bloodGroup && (
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-gray-600">Blood Group: {member.bloodGroup}</span>
                </div>
              )}
              
              {member.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{member.phone}</span>
                </div>
              )}
            </div>

            {(member.allergies !== 'None' || member.conditions !== 'None') && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                {member.allergies !== 'None' && (
                  <div className="mb-2">
                    <span className="text-xs text-red-600 font-medium">Allergies:</span>
                    <span className="ml-2 text-xs text-red-700">{member.allergies}</span>
                  </div>
                )}
                {member.conditions !== 'None' && (
                  <div>
                    <span className="text-xs text-orange-600 font-medium">Conditions:</span>
                    <span className="ml-2 text-xs text-orange-700">{member.conditions}</span>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => bookAppointmentForMember(member)}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {familyMembers.length === 0 && !showAddForm && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Family Members Added</h3>
          <p className="text-gray-500 mb-4">Add family members to manage their health information together.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Family Member</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FamilyMembers;