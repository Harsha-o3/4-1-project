import React, { useState } from 'react';
import { Users, Search, Phone, MapPin, Calendar, Package, Star, TrendingUp } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  village: string;
  registrationDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  loyaltyPoints: number;
  preferredPayment: string;
  notes: string;
  status: 'active' | 'inactive';
}

const CustomerManagement: React.FC = () => {
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Ram Singh',
      phone: '+91-9999999999',
      address: 'Main Street, Nabha',
      village: 'Nabha',
      registrationDate: '2023-06-15',
      totalOrders: 24,
      totalSpent: 12500,
      lastOrderDate: '2024-01-15',
      loyaltyPoints: 125,
      preferredPayment: 'UPI',
      notes: 'Regular customer, prefers home delivery',
      status: 'active'
    },
    {
      id: '2',
      name: 'Priya Kaur',
      phone: '+91-9999999998',
      address: 'Civil Lines, Nabha',
      village: 'Nabha',
      registrationDate: '2023-08-22',
      totalOrders: 18,
      totalSpent: 8900,
      lastOrderDate: '2024-01-12',
      loyaltyPoints: 89,
      preferredPayment: 'Cash',
      notes: 'Diabetic patient, regular insulin orders',
      status: 'active'
    },
    {
      id: '3',
      name: 'Amrit Kumar',
      phone: '+91-9999999997',
      address: 'Village Road, Bhundri',
      village: 'Bhundri',
      registrationDate: '2023-12-10',
      totalOrders: 6,
      totalSpent: 3200,
      lastOrderDate: '2024-01-08',
      loyaltyPoints: 32,
      preferredPayment: 'Card',
      notes: 'New customer, cardiac medications',
      status: 'active'
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVillage, setFilterVillage] = useState('');

  const villages = ['All Villages', 'Nabha', 'Bhundri', 'Sidhwan Bet', 'Patran'];

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 10000) return { tier: 'Gold', color: 'text-yellow-600 bg-yellow-100' };
    if (totalSpent >= 5000) return { tier: 'Silver', color: 'text-gray-600 bg-gray-100' };
    return { tier: 'Bronze', color: 'text-orange-600 bg-orange-100' };
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesVillage = !filterVillage || filterVillage === 'All Villages' || customer.village === filterVillage;
    return matchesSearch && matchesVillage;
  });

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600">Manage customer relationships and track purchase history</p>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-blue-600">{customerStats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-green-600">{customerStats.active}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600">₹{customerStats.totalRevenue.toLocaleString()}</p>
            </div>
            <Package className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-orange-600">₹{Math.round(customerStats.avgOrderValue)}</p>
            </div>
            <Star className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterVillage}
            onChange={(e) => setFilterVillage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {villages.map(village => (
              <option key={village} value={village}>{village}</option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredCustomers.length} customers
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customers List */}
        <div className="space-y-4">
          {filteredCustomers.map(customer => {
            const tier = getCustomerTier(customer.totalSpent);
            return (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                  selectedCustomer?.id === customer.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tier.color}`}>
                          {tier.tier}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{customer.village}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">₹{customer.totalSpent.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{customer.totalOrders} orders</div>
                    <div className="text-xs text-gray-500">{customer.loyaltyPoints} points</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customer Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedCustomer ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedCustomer.name}</h2>
                  <p className="text-gray-600">Customer Details</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCustomerTier(selectedCustomer.totalSpent).color}`}>
                  {getCustomerTier(selectedCustomer.totalSpent).tier} Customer
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Village</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCustomer.village}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedCustomer.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Orders</label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Spent</label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Loyalty Points</label>
                    <p className="mt-1 text-lg font-semibold text-purple-600">{selectedCustomer.loyaltyPoints}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Payment</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCustomer.preferredPayment}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedCustomer.registrationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Order</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedCustomer.lastOrderDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="mt-1 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {selectedCustomer.notes}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Phone className="w-4 h-4" />
                    <span>Call Customer</span>
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View Orders
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Customer</h3>
              <p className="text-gray-500">Choose a customer to view their details and order history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;