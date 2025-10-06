import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye, Phone, MapPin, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  orderNumber: string;
  patientName: string;
  patientPhone: string;
  patientAddress: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryType: 'pickup' | 'delivery';
  totalAmount: number;
  prescriptionUrl?: string;
  notes?: string;
}

interface OrderItem {
  id: string;
  medicineName: string;
  brand: string;
  quantity: number;
  price: number;
  available: boolean;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-001',
      patientName: 'Ram Singh',
      patientPhone: '+91-9999999999',
      patientAddress: 'Main Street, Nabha, Punjab',
      items: [
        { id: '1', medicineName: 'Paracetamol 500mg', brand: 'Crocin', quantity: 2, price: 25, available: true },
        { id: '2', medicineName: 'Amoxicillin 500mg', brand: 'Amoxil', quantity: 1, price: 80, available: true }
      ],
      status: 'pending',
      orderDate: '2024-01-15T10:30:00',
      deliveryType: 'delivery',
      totalAmount: 130,
      notes: 'Please deliver after 6 PM'
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      patientName: 'Priya Kaur',
      patientPhone: '+91-9999999998',
      patientAddress: 'Civil Lines, Nabha, Punjab',
      items: [
        { id: '3', medicineName: 'Metformin 500mg', brand: 'Glycomet', quantity: 3, price: 65, available: true }
      ],
      status: 'ready',
      orderDate: '2024-01-15T09:15:00',
      deliveryType: 'pickup',
      totalAmount: 195
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDeliveryType, setFilterDeliveryType] = useState('');

  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-100',
    confirmed: 'text-blue-600 bg-blue-100',
    preparing: 'text-purple-600 bg-purple-100',
    ready: 'text-green-600 bg-green-100',
    delivered: 'text-gray-600 bg-gray-100',
    cancelled: 'text-red-600 bg-red-100'
  };

  const statusIcons = {
    pending: Clock,
    confirmed: CheckCircle,
    preparing: Package,
    ready: CheckCircle,
    delivered: CheckCircle,
    cancelled: XCircle
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${newStatus}`);
  };

  const updateItemAvailability = (orderId: string, itemId: string, available: boolean) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? {
            ...order,
            items: order.items.map(item => 
              item.id === itemId ? { ...item, available } : item
            )
          }
        : order
    ));
    toast.success(available ? 'Item marked as available' : 'Item marked as unavailable');
  };

  const callPatient = (phone: string, name: string) => {
    toast.success(`Calling ${name}...`);
    window.open(`tel:${phone}`, '_self');
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = !filterStatus || order.status === filterStatus;
    const matchesDeliveryType = !filterDeliveryType || order.deliveryType === filterDeliveryType;
    return matchesStatus && matchesDeliveryType;
  });

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    const statusFlow: Record<Order['status'], Order['status'] | null> = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
      ready: 'delivered',
      delivered: null,
      cancelled: null
    };
    return statusFlow[currentStatus];
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    ready: orders.filter(o => o.status === 'ready').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600">Manage patient orders and prescription fulfillment</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready</p>
              <p className="text-2xl font-bold text-green-600">{orderStats.ready}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-600">{orderStats.delivered}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filterDeliveryType}
            onChange={(e) => setFilterDeliveryType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Delivery Types</option>
            <option value="pickup">Pickup</option>
            <option value="delivery">Home Delivery</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const StatusIcon = statusIcons[order.status];
            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-colors ${
                  selectedOrder?.id === order.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">{order.patientName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.orderDate).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{order.status}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.deliveryType === 'delivery' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {order.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.slice(0, 2).map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{item.medicineName} x{item.quantity}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.available ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">₹{order.totalAmount}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      callPatient(order.patientPhone, order.patientName);
                    }}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-500">No orders match your filter criteria.</p>
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedOrder ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedOrder.orderNumber}</h2>
                  <p className="text-gray-600">Order Details</p>
                </div>
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedOrder.status]}`}>
                  {React.createElement(statusIcons[selectedOrder.status], { className: "w-4 h-4" })}
                  <span className="capitalize">{selectedOrder.status}</span>
                </span>
              </div>

              {/* Patient Information */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Patient Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedOrder.patientName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedOrder.patientPhone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-700">{selectedOrder.patientAddress}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.medicineName}</h4>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity} × ₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">₹{item.quantity * item.price}</span>
                        <button
                          onClick={() => updateItemAvailability(selectedOrder.id, item.id, !item.available)}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            item.available 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {item.available ? 'Available' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Delivery Type:</span>
                  <span className="font-medium text-gray-900 capitalize">{selectedOrder.deliveryType}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedOrder.orderDate).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total Amount:</span>
                  <span className="text-gray-900">₹{selectedOrder.totalAmount}</span>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-medium text-yellow-900 mb-2">Special Instructions</h3>
                  <p className="text-yellow-800">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3">
                {getNextStatus(selectedOrder.status) && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status)!)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Mark as {getNextStatus(selectedOrder.status)?.replace('_', ' ')}
                  </button>
                )}
                
                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                )}
                
                <button
                  onClick={() => callPatient(selectedOrder.patientPhone, selectedOrder.patientName)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Call Patient
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Order</h3>
              <p className="text-gray-500">Choose an order from the list to view details and manage it.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;