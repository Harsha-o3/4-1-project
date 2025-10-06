import React, { useState } from 'react';
import { MapPin, Users, Activity, TrendingUp, Plus, Search, CreditCard as Edit, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface Village {
  id: string;
  name: string;
  district: string;
  population: number;
  registeredUsers: number;
  activePatients: number;
  activeDoctors: number;
  pharmacies: number;
  coveragePercentage: number;
  lastActivity: string;
  healthOfficer: string;
  coordinates: { lat: number; lng: number };
  demographics: {
    ageGroups: { [key: string]: number };
    gender: { male: number; female: number };
  };
  healthStats: {
    commonConditions: string[];
    vaccinationRate: number;
    consultationsThisMonth: number;
  };
}

const VillageManagement: React.FC = () => {
  const [villages] = useState<Village[]>([
    {
      id: '1',
      name: 'Nabha',
      district: 'Patiala',
      population: 67500,
      registeredUsers: 12450,
      activePatients: 8900,
      activeDoctors: 15,
      pharmacies: 8,
      coveragePercentage: 95,
      lastActivity: '2024-01-15T14:30:00',
      healthOfficer: 'Dr. Manpreet Singh',
      coordinates: { lat: 30.3752, lng: 76.1500 },
      demographics: {
        ageGroups: { '0-18': 15600, '19-35': 20250, '36-50': 16875, '51-65': 10125, '65+': 4650 },
        gender: { male: 35100, female: 32400 }
      },
      healthStats: {
        commonConditions: ['Hypertension', 'Diabetes', 'Respiratory Issues'],
        vaccinationRate: 87,
        consultationsThisMonth: 456
      }
    },
    {
      id: '2',
      name: 'Bhundri',
      district: 'Patiala',
      population: 23400,
      registeredUsers: 3890,
      activePatients: 2670,
      activeDoctors: 4,
      pharmacies: 3,
      coveragePercentage: 78,
      lastActivity: '2024-01-15T13:45:00',
      healthOfficer: 'Dr. Simran Kaur',
      coordinates: { lat: 30.3892, lng: 76.1234 },
      demographics: {
        ageGroups: { '0-18': 5850, '19-35': 7020, '36-50': 5616, '51-65': 3276, '65+': 1638 },
        gender: { male: 12168, female: 11232 }
      },
      healthStats: {
        commonConditions: ['Diabetes', 'Joint Pain', 'Hypertension'],
        vaccinationRate: 82,
        consultationsThisMonth: 234
      }
    },
    {
      id: '3',
      name: 'Sidhwan Bet',
      district: 'Patiala',
      population: 18900,
      registeredUsers: 2340,
      activePatients: 1560,
      activeDoctors: 2,
      pharmacies: 2,
      coveragePercentage: 65,
      lastActivity: '2024-01-15T12:20:00',
      healthOfficer: 'Dr. Harpreet Singh',
      coordinates: { lat: 30.3456, lng: 76.0987 },
      demographics: {
        ageGroups: { '0-18': 4725, '19-35': 5670, '36-50': 4536, '51-65': 2646, '65+': 1323 },
        gender: { male: 9828, female: 9072 }
      },
      healthStats: {
        commonConditions: ['Respiratory Issues', 'Hypertension', 'Digestive Issues'],
        vaccinationRate: 75,
        consultationsThisMonth: 156
      }
    }
  ]);

  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const getCoverageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredVillages = villages.filter(village =>
    village.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    village.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalPopulation: villages.reduce((sum, v) => sum + v.population, 0),
    totalRegistered: villages.reduce((sum, v) => sum + v.registeredUsers, 0),
    totalDoctors: villages.reduce((sum, v) => sum + v.activeDoctors, 0),
    totalPharmacies: villages.reduce((sum, v) => sum + v.pharmacies, 0),
    avgCoverage: Math.round(villages.reduce((sum, v) => sum + v.coveragePercentage, 0) / villages.length)
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Village Management</h1>
            <p className="text-gray-600">Monitor healthcare coverage across all villages</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Village</span>
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Population</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalPopulation.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Registered Users</p>
              <p className="text-2xl font-bold text-green-600">{totalStats.totalRegistered.toLocaleString()}</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Doctors</p>
              <p className="text-2xl font-bold text-purple-600">{totalStats.totalDoctors}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pharmacies</p>
              <p className="text-2xl font-bold text-orange-600">{totalStats.totalPharmacies}</p>
            </div>
            <MapPin className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Coverage</p>
              <p className="text-2xl font-bold text-blue-600">{totalStats.avgCoverage}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search villages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Villages List */}
        <div className="space-y-4">
          {filteredVillages.map(village => (
            <div
              key={village.id}
              onClick={() => setSelectedVillage(village)}
              className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                selectedVillage?.id === village.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{village.name}</h3>
                  <p className="text-gray-600">{village.district} District</p>
                  <p className="text-sm text-gray-500">Population: {village.population.toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCoverageColor(village.coveragePercentage)}`}>
                  {village.coveragePercentage}% Coverage
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{village.registeredUsers.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Registered</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{village.activeDoctors}</div>
                  <div className="text-xs text-gray-500">Doctors</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{village.pharmacies}</div>
                  <div className="text-xs text-gray-500">Pharmacies</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">{village.healthStats.consultationsThisMonth}</div>
                  <div className="text-xs text-gray-500">Consultations</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Village Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedVillage ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedVillage.name}</h2>
                  <p className="text-gray-600">{selectedVillage.district} District</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCoverageColor(selectedVillage.coveragePercentage)}`}>
                  {selectedVillage.coveragePercentage}% Coverage
                </span>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Population</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedVillage.population.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Health Officer</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedVillage.healthOfficer}</p>
                  </div>
                </div>

                {/* Demographics */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Demographics</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Male</span>
                      <span className="font-medium text-gray-900">
                        {selectedVillage.demographics.gender.male.toLocaleString()} 
                        ({Math.round((selectedVillage.demographics.gender.male / selectedVillage.population) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Female</span>
                      <span className="font-medium text-gray-900">
                        {selectedVillage.demographics.gender.female.toLocaleString()} 
                        ({Math.round((selectedVillage.demographics.gender.female / selectedVillage.population) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Age Groups */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Age Distribution</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedVillage.demographics.ageGroups).map(([ageGroup, count]) => (
                      <div key={ageGroup} className="flex items-center justify-between">
                        <span className="text-gray-600">{ageGroup} years</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(count / selectedVillage.population) * 100 * 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-12">
                            {count.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Stats */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Health Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vaccination Rate</span>
                      <span className="font-medium text-green-600">{selectedVillage.healthStats.vaccinationRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Consultations This Month</span>
                      <span className="font-medium text-blue-600">{selectedVillage.healthStats.consultationsThisMonth}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Common Conditions</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedVillage.healthStats.commonConditions.map(condition => (
                          <span key={condition} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Edit className="w-4 h-4" />
                    <span>Edit Info</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Village</h3>
              <p className="text-gray-500">Choose a village to view detailed information and statistics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VillageManagement;