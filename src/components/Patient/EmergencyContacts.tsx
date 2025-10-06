import React, { useState } from 'react';
import { Phone, Plus, CreditCard as Edit, Trash2, AlertTriangle, Heart, Ambulance } from 'lucide-react';
import toast from 'react-hot-toast';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Priya Singh',
      relationship: 'Spouse',
      phone: '+91-9999999998',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      relationship: 'Family Doctor',
      phone: '+91-9999999997',
      isPrimary: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    isPrimary: false
  });

  const emergencyServices = [
    { name: 'Ambulance', number: '108', icon: Ambulance, color: 'bg-red-600' },
    { name: 'Police', number: '100', icon: AlertTriangle, color: 'bg-blue-600' },
    { name: 'Fire', number: '101', icon: AlertTriangle, color: 'bg-orange-600' },
    { name: 'Women Helpline', number: '1091', icon: Heart, color: 'bg-pink-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContact) {
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { ...editingContact, ...formData }
          : contact
      ));
      toast.success('Contact updated successfully');
    } else {
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        ...formData
      };
      setContacts([...contacts, newContact]);
      toast.success('Contact added successfully');
    }

    setFormData({ name: '', relationship: '', phone: '', isPrimary: false });
    setShowAddForm(false);
    setEditingContact(null);
  };

  const handleEdit = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      isPrimary: contact.isPrimary
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success('Contact deleted successfully');
  };

  const callContact = (phone: string, name: string) => {
    toast.success(`Calling ${name}...`);
    window.open(`tel:${phone}`, '_self');
  };

  const setPrimary = (id: string) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === id
    })));
    toast.success('Primary contact updated');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Contacts</h1>
        <p className="text-gray-600">Manage your emergency contacts and access emergency services</p>
      </div>

      {/* Emergency Services */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emergencyServices.map(service => (
            <button
              key={service.name}
              onClick={() => callContact(service.number, service.name)}
              className={`${service.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
            >
              <service.icon className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">{service.name}</div>
              <div className="text-lg font-bold">{service.number}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Personal Emergency Contacts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Personal Emergency Contacts</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
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
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91-9999999999"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={formData.isPrimary}
                  onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isPrimary" className="ml-2 block text-sm text-gray-900">
                  Set as primary emergency contact
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingContact ? 'Update Contact' : 'Add Contact'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingContact(null);
                    setFormData({ name: '', relationship: '', phone: '', isPrimary: false });
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    {contact.isPrimary && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => callContact(contact.phone, contact.name)}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Phone className="w-4 h-4" />
                </button>
                {!contact.isPrimary && (
                  <button
                    onClick={() => setPrimary(contact.id)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200"
                  >
                    Set Primary
                  </button>
                )}
                <button
                  onClick={() => handleEdit(contact)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-8">
            <Phone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Emergency Contacts</h3>
            <p className="text-gray-500">Add emergency contacts to ensure help is always available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;