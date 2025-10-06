import React, { useState } from 'react';
import { Shield, Plus, FileText, Clock, CheckCircle, XCircle, Upload, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface InsuranceClaim {
  id: string;
  claimNumber: string;
  policyNumber: string;
  insuranceProvider: string;
  claimType: 'consultation' | 'medication' | 'lab_test' | 'hospitalization';
  amount: number;
  claimedAmount: number;
  approvedAmount?: number;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'paid';
  submissionDate: string;
  documents: string[];
  notes?: string;
  rejectionReason?: string;
}

const InsuranceClaims: React.FC = () => {
  const [claims, setClaims] = useState<InsuranceClaim[]>([
    {
      id: '1',
      claimNumber: 'CLM-2024-001',
      policyNumber: 'POL-123456789',
      insuranceProvider: 'Star Health Insurance',
      claimType: 'consultation',
      amount: 500,
      claimedAmount: 500,
      approvedAmount: 450,
      status: 'approved',
      submissionDate: '2024-01-10',
      documents: ['prescription.pdf', 'consultation_bill.pdf'],
      notes: 'Routine consultation claim'
    },
    {
      id: '2',
      claimNumber: 'CLM-2024-002',
      policyNumber: 'POL-123456789',
      insuranceProvider: 'Star Health Insurance',
      claimType: 'medication',
      amount: 1200,
      claimedAmount: 1200,
      status: 'under_review',
      submissionDate: '2024-01-12',
      documents: ['prescription.pdf', 'pharmacy_bill.pdf'],
      notes: 'Diabetes medication claim'
    }
  ]);

  const [showNewClaimForm, setShowNewClaimForm] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);
  const [formData, setFormData] = useState({
    policyNumber: '',
    insuranceProvider: '',
    claimType: 'consultation',
    amount: 0,
    notes: ''
  });

  const insuranceProviders = [
    'Star Health Insurance',
    'ICICI Lombard',
    'HDFC ERGO',
    'Bajaj Allianz',
    'New India Assurance',
    'Oriental Insurance'
  ];

  const claimTypes = [
    { value: 'consultation', label: 'Consultation Fees' },
    { value: 'medication', label: 'Medication Costs' },
    { value: 'lab_test', label: 'Laboratory Tests' },
    { value: 'hospitalization', label: 'Hospitalization' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'under_review': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'paid': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'submitted': return <Upload className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newClaim: InsuranceClaim = {
      id: Date.now().toString(),
      claimNumber: `CLM-2024-${String(claims.length + 1).padStart(3, '0')}`,
      ...formData,
      claimedAmount: formData.amount,
      status: 'draft',
      submissionDate: new Date().toISOString().split('T')[0],
      documents: []
    };

    setClaims([newClaim, ...claims]);
    setFormData({
      policyNumber: '',
      insuranceProvider: '',
      claimType: 'consultation',
      amount: 0,
      notes: ''
    });
    setShowNewClaimForm(false);
    toast.success('Insurance claim created successfully');
  };

  const submitClaim = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'submitted' } : claim
    ));
    toast.success('Claim submitted to insurance provider');
  };

  const claimStats = {
    total: claims.length,
    approved: claims.filter(c => c.status === 'approved').length,
    pending: claims.filter(c => ['submitted', 'under_review'].includes(c.status)).length,
    totalClaimed: claims.reduce((sum, c) => sum + c.claimedAmount, 0),
    totalApproved: claims.reduce((sum, c) => sum + (c.approvedAmount || 0), 0)
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Claims</h1>
        <p className="text-gray-600">Manage your health insurance claims and reimbursements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Claims</p>
              <p className="text-2xl font-bold text-gray-900">{claimStats.total}</p>
            </div>
            <Shield className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{claimStats.approved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{claimStats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Approved</p>
              <p className="text-2xl font-bold text-purple-600">₹{claimStats.totalApproved.toLocaleString()}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">My Claims</h2>
            <button
              onClick={() => setShowNewClaimForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>New Claim</span>
            </button>
          </div>

          {claims.map(claim => (
            <div
              key={claim.id}
              onClick={() => setSelectedClaim(claim)}
              className={`bg-white p-4 rounded-xl shadow-sm border cursor-pointer transition-colors ${
                selectedClaim?.id === claim.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{claim.claimNumber}</h3>
                  <p className="text-sm text-gray-600">{claim.insuranceProvider}</p>
                  <p className="text-sm text-gray-500">
                    {claimTypes.find(ct => ct.value === claim.claimType)?.label}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm font-medium text-gray-900">₹{claim.claimedAmount}</span>
                    {claim.approvedAmount && (
                      <span className="text-sm text-green-600">
                        (Approved: ₹{claim.approvedAmount})
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                    {getStatusIcon(claim.status)}
                    <span>{claim.status.replace('_', ' ')}</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(claim.submissionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Claim Details / New Claim Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {showNewClaimForm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">New Insurance Claim</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                <input
                  type="text"
                  value={formData.policyNumber}
                  onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                <select
                  value={formData.insuranceProvider}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Provider</option>
                  {insuranceProviders.map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Claim Type</label>
                <select
                  value={formData.claimType}
                  onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {claimTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Claim Amount (₹)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional details about the claim..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Create Claim
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewClaimForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : selectedClaim ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedClaim.claimNumber}</h2>
                  <p className="text-gray-600">{selectedClaim.insuranceProvider}</p>
                </div>
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedClaim.status)}`}>
                  {getStatusIcon(selectedClaim.status)}
                  <span>{selectedClaim.status.replace('_', ' ')}</span>
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Policy Number</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedClaim.policyNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Claim Type</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {claimTypes.find(ct => ct.value === selectedClaim.claimType)?.label}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Claimed Amount</label>
                    <p className="mt-1 text-sm text-gray-900">₹{selectedClaim.claimedAmount}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Approved Amount</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedClaim.approvedAmount ? `₹${selectedClaim.approvedAmount}` : 'Pending'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Submission Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedClaim.submissionDate).toLocaleDateString()}
                  </p>
                </div>

                {selectedClaim.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="mt-1 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                      {selectedClaim.notes}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
                  <div className="space-y-2">
                    {selectedClaim.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-900">{doc}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedClaim.status === 'draft' && (
                  <button
                    onClick={() => submitClaim(selectedClaim.id)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    Submit Claim
                  </button>
                )}

                {selectedClaim.status === 'rejected' && selectedClaim.rejectionReason && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">Rejection Reason</h4>
                    <p className="text-red-800">{selectedClaim.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Insurance Claims</h3>
              <p className="text-gray-500 mb-4">Select a claim to view details or create a new claim.</p>
              <button
                onClick={() => setShowNewClaimForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Claim</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsuranceClaims;