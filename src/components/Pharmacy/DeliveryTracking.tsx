import React, { useState } from 'react';
import { Truck, MapPin, Clock, CheckCircle, Package, Phone, Navigation, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface Delivery {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: DeliveryItem[];
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  assignedDriver: string;
  driverPhone: string;
  estimatedTime: string;
  actualDeliveryTime?: string;
  deliveryFee: number;
  totalAmount: number;
  notes: string;
  trackingUpdates: TrackingUpdate[];
}

interface DeliveryItem {
  name: string;
  quantity: number;
  price: number;
}

interface TrackingUpdate {
  id: string;
  status: string;
  timestamp: string;
  location: string;
  notes: string;
}

const DeliveryTracking: React.FC = () => {
  const [deliveries] = useState<Delivery[]>([
    {
      id: '1',
      orderId: 'ORD-001',
      customerName: 'Ram Singh',
      customerPhone: '+91-9999999999',
      deliveryAddress: 'Main Street, Nabha, Punjab - 147201',
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 50 },
        { name: 'Amoxicillin 500mg', quantity: 1, price: 80 }
      ],
      status: 'in_transit',
      assignedDriver: 'Sukhwinder Singh',
      driverPhone: '+91-9999999990',
      estimatedTime: '2024-01-15T16:30:00',
      deliveryFee: 30,
      totalAmount: 160,
      notes: 'Please call before delivery',
      trackingUpdates: [
        {
          id: '1',
          status: 'Order Confirmed',
          timestamp: '2024-01-15T14:00:00',
          location: 'Nabha Medical Store',
          notes: 'Order packed and ready for pickup'
        },
        {
          id: '2',
          status: 'Picked Up',
          timestamp: '2024-01-15T14:30:00',
          location: 'Nabha Medical Store',
          notes: 'Driver picked up the order'
        },
        {
          id: '3',
          status: 'In Transit',
          timestamp: '2024-01-15T15:00:00',
          location: 'Near Civil Hospital',
          notes: 'On the way to delivery address'
        }
      ]
    },
    {
      id: '2',
      orderId: 'ORD-002',
      customerName: 'Priya Kaur',
      customerPhone: '+91-9999999998',
      deliveryAddress: 'Civil Lines, Nabha, Punjab - 147201',
      items: [
        { name: 'Metformin 500mg', quantity: 3, price: 195 }
      ],
      status: 'delivered',
      assignedDriver: 'Jasbir Singh',
      driverPhone: '+91-9999999991',
      estimatedTime: '2024-01-15T12:00:00',
      actualDeliveryTime: '2024-01-15T11:45:00',
      deliveryFee: 25,
      totalAmount: 220,
      notes: 'Delivered successfully',
      trackingUpdates: [
        {
          id: '1',
          status: 'Order Confirmed',
          timestamp: '2024-01-15T10:00:00',
          location: 'Nabha Medical Store',
          notes: 'Order confirmed and packed'
        },
        {
          id: '2',
          status: 'Delivered',
          timestamp: '2024-01-15T11:45:00',
          location: 'Civil Lines, Nabha',
          notes: 'Successfully delivered to customer'
        }
      ]
    }
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [filterStatus, setFilterStatus] = useState('');

  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-100',
    assigned: 'text-blue-600 bg-blue-100',
    picked_up: 'text-purple-600 bg-purple-100',
    in_transit: 'text-orange-600 bg-orange-100',
    delivered: 'text-green-600 bg-green-100',
    failed: 'text-red-600 bg-red-100'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'assigned': return <User className="w-4 h-4" />;
      case 'picked_up': return <Package className="w-4 h-4" />;
      case 'in_transit': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <Package className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const callDriver = (driverPhone: string, driverName: string) => {
    toast.success(`Calling ${driverName}...`);
    window.open(`tel:${driverPhone}`, '_self');
  };

  const callCustomer = (customerPhone: string, customerName: string) => {
    toast.success(`Calling ${customerName}...`);
    window.open(`tel:${customerPhone}`, '_self');
  };

  const trackLocation = (deliveryId: string) => {
    toast.success('Opening location tracker...');
  };

  const filteredDeliveries = deliveries.filter(delivery => 
    !filterStatus || delivery.status === filterStatus
  );

  const deliveryStats = {
    total: deliveries.length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    inTransit: deliveries.filter(d => d.status === 'in_transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Tracking</h1>
        <p className="text-gray-600">Track and manage medicine deliveries to customers</p>
      </div>

      {/* Delivery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">{deliveryStats.total}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{deliveryStats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-orange-600">{deliveryStats.inTransit}</p>
            </div>
            <Truck className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{deliveryStats.delivered}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Deliveries</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deliveries List */}
        <div className="space-y-4">
          {filteredDeliveries.map(delivery => (
            <div
              key={delivery.id}
              onClick={() => setSelectedDelivery(delivery)}
              className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                selectedDelivery?.id === delivery.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusColors[delivery.status]}`}>
                    {getStatusIcon(delivery.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{delivery.orderId}</h3>
                    <p className="text-sm text-gray-600">{delivery.customerName}</p>
                    <p className="text-sm text-gray-500">{delivery.items.length} items</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[delivery.status]}`}>
                    {getStatusIcon(delivery.status)}
                    <span className="capitalize">{delivery.status.replace('_', ' ')}</span>
                  </span>
                  <p className="text-sm text-gray-500 mt-1">₹{delivery.totalAmount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{delivery.deliveryAddress.split(',')[0]}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>ETA: {new Date(delivery.estimatedTime).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedDelivery ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedDelivery.orderId}</h2>
                  <p className="text-gray-600">Delivery Details</p>
                </div>
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedDelivery.status]}`}>
                  {getStatusIcon(selectedDelivery.status)}
                  <span className="capitalize">{selectedDelivery.status.replace('_', ' ')}</span>
                </span>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{selectedDelivery.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{selectedDelivery.customerPhone}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="text-gray-700">{selectedDelivery.deliveryAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Driver Info */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-3">Driver Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800">{selectedDelivery.assignedDriver}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800">{selectedDelivery.driverPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {selectedDelivery.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-900">{item.name} x{item.quantity}</span>
                        <span className="font-medium text-gray-900">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Total Amount:</span>
                    <span className="font-bold text-gray-900">₹{selectedDelivery.totalAmount}</span>
                  </div>
                </div>

                {/* Tracking Updates */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Tracking Updates</h3>
                  <div className="space-y-3">
                    {selectedDelivery.trackingUpdates.map((update, index) => (
                      <div key={update.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{update.status}</h4>
                          <p className="text-sm text-gray-600">{update.location}</p>
                          <p className="text-sm text-gray-500">{update.notes}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(update.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => callCustomer(selectedDelivery.customerPhone, selectedDelivery.customerName)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Customer</span>
                  </button>
                  <button
                    onClick={() => callDriver(selectedDelivery.driverPhone, selectedDelivery.assignedDriver)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Driver</span>
                  </button>
                  <button
                    onClick={() => trackLocation(selectedDelivery.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Truck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Delivery</h3>
              <p className="text-gray-500">Choose a delivery to view tracking details and manage the order.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;