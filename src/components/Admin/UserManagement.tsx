import React, { useState } from 'react';
import { Users, Search, Filter, CreditCard as Edit, Trash2, Plus, CheckCircle, XCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'PATIENT' | 'DOCTOR' | 'PHARMACY' | 'ADMIN';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
  profileComplete: boolean;
  verificationStatus: 'verified' | 'pending' | 'rejected';
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh@nabha.health',
      phone: '+91-9999999999',
      role: 'DOCTOR',
      status: 'active',
      createdAt: '2024-01-01',
      lastLogin: '2024-01-15T10:30:00',
      profileComplete: true,
      verificationStatus: 'verified'
    },
    {
      id: '2',
      name: 'Ram Singh',
      phone: '+91-9999999998',
      role: 'PATIENT',
      status: 'active',
      createdAt: '2024-01-05',
      lastLogin: '2024-01-14T15:20:00',
      profileComplete: true,
      verificationStatus: 'verified'
    },
    {
      id: '3',
      name: 'Nabha Medical Store',
      phone: '+91-9999999997',
      role: 'PHARMACY',
      status: 'pending',
      createdAt: '2024-01-10',
      profileComplete: false,
      verificationStatus: 'pending'
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const roleColors = {
    PATIENT: 'text-blue-600 bg-blue-100',
    DOCTOR: 'text-green-600 bg-green-100',
    PHARMACY: 'text-purple-600 bg-purple-100',
    ADMIN: 'text-red-600 bg-red-100'
  };

  const statusColors = {
    active: 'text-green-600 bg-green-100',
    inactive: 'text-gray-600 bg-gray-100',
    pending: 'text-yellow-600 bg-yellow-100'
  };

  const verificationColors = {
    verified: 'text-green-600 bg-green-100',
    pending: 'text-yellow-600 bg-yellow-100',
    rejected: 'text-red-600 bg-red-100'
  };

  const updateUserStatus = (userId: string, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success(`User ${newStatus}`);
  };

  const updateVerificationStatus = (userId: string, newStatus: User['verificationStatus']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verificationStatus: newStatus } : user
    ));
    toast.success(`User ${newStatus}`);
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User deleted successfully');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone?.includes(searchTerm);
    
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    doctors: users.filter(u => u.role === 'DOCTOR').length,
    patients: users.filter(u => u.role === 'PATIENT').length,
    pharmacies: users.filter(u => u.role === 'PHARMACY').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage all platform users and their permissions</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{userStats.active}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{userStats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{userStats.doctors}</p>
            <p className="text-sm text-gray-600">Doctors</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{userStats.patients}</p>
            <p className="text-sm text-gray-600">Patients</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{userStats.pharmacies}</p>
            <p className="text-sm text-gray-600">Pharmacies</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Roles</option>
            <option value="PATIENT">Patients</option>
            <option value="DOCTOR">Doctors</option>
            <option value="PHARMACY">Pharmacies</option>
            <option value="ADMIN">Admins</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Users ({filteredUsers.length})</h2>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.id === user.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <div className="mt-1 space-y-1">
                      {user.email && (
                        <p className="text-sm text-gray-600">{user.email}</p>
                      )}
                      {user.phone && (
                        <p className="text-sm text-gray-600">{user.phone}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${verificationColors[user.verificationStatus]}`}>
                        {user.verificationStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                    {user.lastLogin && (
                      <p>Last: {new Date(user.lastLogin).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
              <p className="text-gray-500">No users match your search criteria.</p>
            </div>
          )}
        </div>

        {/* User Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedUser ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-gray-600">User Details & Actions</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors[selectedUser.role]}`}>
                    {selectedUser.role}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedUser.status]}`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.email || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedUser.status]}`}>
                        {selectedUser.status}
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verification</label>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${verificationColors[selectedUser.verificationStatus]}`}>
                        {selectedUser.verificationStatus}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Joined</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Login</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.lastLogin 
                        ? new Date(selectedUser.lastLogin).toLocaleDateString()
                        : 'Never'
                      }
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Status</label>
                  <p className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedUser.profileComplete 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedUser.profileComplete ? 'Complete' : 'Incomplete'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Status Actions</h3>
                  <div className="flex space-x-2">
                    {selectedUser.status !== 'active' && (
                      <button
                        onClick={() => updateUserStatus(selectedUser.id, 'active')}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>Activate</span>
                      </button>
                    )}
                    
                    {selectedUser.status !== 'inactive' && (
                      <button
                        onClick={() => updateUserStatus(selectedUser.id, 'inactive')}
                        className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Deactivate</span>
                      </button>
                    )}
                  </div>
                </div>

                {selectedUser.verificationStatus === 'pending' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Verification Actions</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateVerificationStatus(selectedUser.id, 'verified')}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>Verify</span>
                      </button>
                      
                      <button
                        onClick={() => updateVerificationStatus(selectedUser.id, 'rejected')}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Other Actions</h3>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    
                    <button
                      onClick={() => deleteUser(selectedUser.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a User</h3>
              <p className="text-gray-500">Choose a user from the list to view details and manage their account.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;