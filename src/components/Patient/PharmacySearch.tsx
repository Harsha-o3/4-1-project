import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, Package, Star, Navigation } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  openingHours: any;
  user: {
    name: string;
    phone: string;
  };
  inventory?: InventoryItem[];
}

interface InventoryItem {
  id: string;
  medicineName: string;
  brand: string;
  quantity: number;
  price: number;
  expiryDate: string;
}

const PharmacySearch: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [medicineSearch, setMedicineSearch] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [medicineResults, setMedicineResults] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'pharmacies' | 'medicines'>('pharmacies');

  const villages = [
    'Nabha', 'Bhundri', 'Sidhwan Bet', 'Patran', 'Samana',
    'Ghagga', 'Bhadson', 'Lehra', 'Dhuri', 'Sangrur'
  ];

  useEffect(() => {
    fetchPharmacies();
  }, [selectedVillage]);

  const fetchPharmacies = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedVillage) params.append('village', selectedVillage);
      
      const response = await axios.get(`/api/pharmacy/nearby?${params}`);
      setPharmacies(response.data);
    } catch (error) {
      toast.error('Failed to fetch pharmacies');
    } finally {
      setIsLoading(false);
    }
  };

  const searchMedicine = async () => {
    if (!medicineSearch.trim()) {
      toast.error('Please enter medicine name');
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('medicine', medicineSearch);
      if (selectedVillage) params.append('village', selectedVillage);
      
      const response = await axios.get(`/api/pharmacy/medicine/search?${params}`);
      setMedicineResults(response.data);
      setActiveTab('medicines');
    } catch (error) {
      toast.error('Failed to search medicine');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isPharmacyOpen = (openingHours: any) => {
    if (!openingHours) return false;
    
    const now = new Date();
    const currentDay = now.toLocaleLowerCase().substring(0, 3) + 'day';
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const todayHours = openingHours[currentDay];
    if (!todayHours) return false;
    
    const [open, close] = todayHours.split('-');
    const openTime = parseInt(open.replace(':', ''));
    const closeTime = parseInt(close.replace(':', ''));
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const callPharmacy = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Pharmacy</h1>
        <p className="text-gray-600">Search for nearby pharmacies and check medicine availability</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pharmacies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Villages</option>
            {villages.map(village => (
              <option key={village} value={village}>{village}</option>
            ))}
          </select>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search medicine..."
              value={medicineSearch}
              onChange={(e) => setMedicineSearch(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && searchMedicine()}
            />
            <button
              onClick={searchMedicine}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('pharmacies')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'pharmacies'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pharmacies ({filteredPharmacies.length})
          </button>
          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'medicines'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Medicine Results ({medicineResults.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'pharmacies' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map(pharmacy => (
            <div key={pharmacy.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{pharmacy.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{pharmacy.address}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isPharmacyOpen(pharmacy.openingHours)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isPharmacyOpen(pharmacy.openingHours) ? 'Open' : 'Closed'}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {pharmacy.inventory?.length || 0} items
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{pharmacy.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {pharmacy.openingHours?.monday || '9:00-21:00'}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => callPharmacy(pharmacy.contactNumber)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => getDirections(pharmacy.address)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          ))}

          {filteredPharmacies.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pharmacies Found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or location.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {medicineResults.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.medicineName}</h3>
                  <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.quantity > 10
                        ? 'bg-green-100 text-green-800'
                        : item.quantity > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.quantity > 0 ? `${item.quantity} in stock` : 'Out of stock'}
                    </span>
                    <span className="text-sm text-gray-600">₹{item.price}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Expires</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {medicineResults.length === 0 && medicineSearch && !isLoading && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Medicine Not Found</h3>
              <p className="text-gray-500">"{medicineSearch}" is not available in nearby pharmacies.</p>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default PharmacySearch;