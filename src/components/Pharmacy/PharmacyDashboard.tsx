import React from 'react';
import { Package, TrendingUp, AlertTriangle, Clock, Plus, Search } from 'lucide-react';

const PharmacyDashboard: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nabha Medical Store</h1>
        <p className="text-gray-600">Manage your pharmacy inventory and orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-orange-600">23</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Sales</p>
              <p className="text-2xl font-bold text-green-600">₹8,950</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-purple-600">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Management */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/pharmacy/inventory')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
            >
              <Package className="w-8 h-8 text-blue-600 mb-2" />
              <h4 className="font-medium text-gray-900">Manage Inventory</h4>
              <p className="text-sm text-gray-600">Add/update medicines</p>
            </button>
            
            <button
              onClick={() => navigate('/pharmacy/orders')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
            >
              <FileText className="w-8 h-8 text-green-600 mb-2" />
              <h4 className="font-medium text-gray-900">Process Orders</h4>
              <p className="text-sm text-gray-600">Fulfill prescriptions</p>
            </button>
            
            <button
              onClick={() => navigate('/pharmacy/customers')}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
            >
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <h4 className="font-medium text-gray-900">Customer Management</h4>
              <p className="text-sm text-gray-600">View customer data</p>
            </button>
            
            <button
              onClick={() => navigate('/pharmacy/delivery')}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left"
            >
              <Truck className="w-8 h-8 text-orange-600 mb-2" />
              <h4 className="font-medium text-gray-900">Track Deliveries</h4>
              <p className="text-sm text-gray-600">Monitor shipments</p>
            </button>
          </div>
        </div>

        {/* Inventory Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Inventory Activity</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => navigate('/pharmacy/inventory')}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Medicine</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Brand</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Price</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium text-gray-900">Paracetamol 500mg</p>
                      <p className="text-sm text-gray-500">Batch: B1234</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">Crocin</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      150 units
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-900">₹25.00</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium text-gray-900">Amoxicillin 500mg</p>
                      <p className="text-sm text-gray-500">Batch: B5678</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">Amoxil</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      8 units
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-900">₹80.00</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Low Stock
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium text-gray-900">Omeprazole 20mg</p>
                      <p className="text-sm text-gray-500">Batch: B9012</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">Omez</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      0 units
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-900">₹120.00</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium text-gray-900">Cetirizine 10mg</p>
                      <p className="text-sm text-gray-500">Batch: B3456</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">Zyrtec</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      75 units
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-900">₹45.00</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-gray-900">Order #1234</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">New</span>
                </div>
                <p className="text-sm text-gray-600">Paracetamol, Crocin</p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-gray-900">Order #1233</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Delivered</span>
                </div>
                <p className="text-sm text-gray-600">Metformin, Glycomet</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-gray-900">Order #1232</p>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Processing</span>
                </div>
                <p className="text-sm text-gray-600">Amoxicillin, Amoxil</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>

          {/* Expiry Alerts */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expiry Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-900">Aspirin 100mg</p>
                <p className="text-sm text-red-600">Expires in 15 days</p>
                <p className="text-xs text-red-500">50 units remaining</p>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="font-medium text-orange-900">Vitamin C</p>
                <p className="text-sm text-orange-600">Expires in 1 month</p>
                <p className="text-xs text-orange-500">30 units remaining</p>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-900">Iron Tablets</p>
                <p className="text-sm text-yellow-600">Expires in 2 months</p>
                <p className="text-xs text-yellow-500">100 units remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;