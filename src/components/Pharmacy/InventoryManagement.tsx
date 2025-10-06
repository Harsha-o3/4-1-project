import React, { useState } from 'react';
import { Plus, Search, Filter, CreditCard as Edit, Trash2, AlertTriangle, Package, Calendar, Barcode } from 'lucide-react';
import toast from 'react-hot-toast';

interface InventoryItem {
  id: string;
  medicineName: string;
  brand: string;
  batchNo: string;
  expiryDate: string;
  quantity: number;
  minQuantity: number;
  price: number;
  category: string;
  supplier: string;
  location: string;
  createdAt: string;
}

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      medicineName: 'Paracetamol 500mg',
      brand: 'Crocin',
      batchNo: 'B1234',
      expiryDate: '2025-12-31',
      quantity: 150,
      minQuantity: 20,
      price: 25.00,
      category: 'Pain Relief',
      supplier: 'ABC Pharma',
      location: 'A1-01',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      medicineName: 'Amoxicillin 500mg',
      brand: 'Amoxil',
      batchNo: 'B5678',
      expiryDate: '2024-06-30',
      quantity: 8,
      minQuantity: 15,
      price: 80.00,
      category: 'Antibiotic',
      supplier: 'XYZ Pharma',
      location: 'B2-05',
      createdAt: '2024-01-05'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    medicineName: '',
    brand: '',
    batchNo: '',
    expiryDate: '',
    quantity: 0,
    minQuantity: 0,
    price: 0,
    category: '',
    supplier: '',
    location: ''
  });

  const categories = ['Pain Relief', 'Antibiotic', 'Vitamin', 'Diabetes', 'Hypertension', 'Cardiac', 'Respiratory'];
  const suppliers = ['ABC Pharma', 'XYZ Pharma', 'MediCorp', 'HealthSupply', 'PharmaPlus'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setInventory(inventory.map(item => 
        item.id === editingItem.id 
          ? { ...editingItem, ...formData }
          : item
      ));
      toast.success('Item updated successfully');
    } else {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setInventory([...inventory, newItem]);
      toast.success('Item added successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      medicineName: '',
      brand: '',
      batchNo: '',
      expiryDate: '',
      quantity: 0,
      minQuantity: 0,
      price: 0,
      category: '',
      supplier: '',
      location: ''
    });
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      medicineName: item.medicineName,
      brand: item.brand,
      batchNo: item.batchNo,
      expiryDate: item.expiryDate,
      quantity: item.quantity,
      minQuantity: item.minQuantity,
      price: item.price,
      category: item.category,
      supplier: item.supplier,
      location: item.location
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
    toast.success('Item deleted successfully');
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity === 0) return { status: 'out', color: 'text-red-600 bg-red-100', text: 'Out of Stock' };
    if (item.quantity <= item.minQuantity) return { status: 'low', color: 'text-orange-600 bg-orange-100', text: 'Low Stock' };
    return { status: 'good', color: 'text-green-600 bg-green-100', text: 'In Stock' };
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
    if (daysUntilExpiry <= 30) return { status: 'expiring', color: 'text-orange-600', text: `${daysUntilExpiry} days` };
    return { status: 'good', color: 'text-green-600', text: `${daysUntilExpiry} days` };
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filterCategory || item.category === filterCategory;
    
    const stockStatus = getStockStatus(item).status;
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'low' && stockStatus === 'low') ||
                         (filterStatus === 'out' && stockStatus === 'out') ||
                         (filterStatus === 'good' && stockStatus === 'good');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const lowStockCount = inventory.filter(item => getStockStatus(item).status === 'low').length;
  const outOfStockCount = inventory.filter(item => getStockStatus(item).status === 'out').length;
  const expiringCount = inventory.filter(item => getExpiryStatus(item.expiryDate).status === 'expiring').length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Manage your pharmacy stock and monitor medicine availability</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">{lowStockCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
            </div>
            <Package className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">₹{totalValue.toLocaleString()}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="good">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingItem ? 'Edit Medicine' : 'Add New Medicine'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                <input
                  type="text"
                  value={formData.medicineName}
                  onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                <input
                  type="text"
                  value={formData.batchNo}
                  onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Quantity</label>
                <input
                  type="number"
                  value={formData.minQuantity}
                  onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <select
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier} value={supplier}>{supplier}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., A1-01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingItem ? 'Update Medicine' : 'Add Medicine'}
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

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Medicine</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Batch/Expiry</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map(item => {
                const stockStatus = getStockStatus(item);
                const expiryStatus = getExpiryStatus(item.expiryDate);
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.medicineName}</p>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded mt-1">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Barcode className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.batchNo}</p>
                          <p className={`text-sm ${expiryStatus.color}`}>
                            Exp: {new Date(item.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.quantity} units</p>
                        <p className="text-sm text-gray-500">Min: {item.minQuantity}</p>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">₹{item.price}</p>
                      <p className="text-sm text-gray-500">Total: ₹{(item.quantity * item.price).toLocaleString()}</p>
                    </td>
                    
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-900">{item.location}</p>
                      <p className="text-sm text-gray-500">{item.supplier}</p>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                      {expiryStatus.status === 'expiring' && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-orange-600 bg-orange-100">
                            Expiring Soon
                          </span>
                        </div>
                      )}
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Items Found</h3>
            <p className="text-gray-500">No inventory items match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;