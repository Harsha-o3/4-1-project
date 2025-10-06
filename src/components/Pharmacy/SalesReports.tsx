import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, Filter, DollarSign, Package, Users } from 'lucide-react';
import toast from 'react-hot-toast';

interface SaleRecord {
  id: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'upi';
  prescriptionNumber?: string;
}

interface SaleItem {
  id: string;
  medicineName: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const SalesReports: React.FC = () => {
  const [sales, setSales] = useState<SaleRecord[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '10:30',
      customerName: 'Ram Singh',
      customerPhone: '+91-9999999999',
      items: [
        { id: '1', medicineName: 'Paracetamol 500mg', brand: 'Crocin', quantity: 2, unitPrice: 25, totalPrice: 50 },
        { id: '2', medicineName: 'Amoxicillin 500mg', brand: 'Amoxil', quantity: 1, unitPrice: 80, totalPrice: 80 }
      ],
      totalAmount: 130,
      paymentMethod: 'cash',
      prescriptionNumber: 'RX-2024-001'
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '14:20',
      customerName: 'Priya Kaur',
      customerPhone: '+91-9999999998',
      items: [
        { id: '3', medicineName: 'Metformin 500mg', brand: 'Glycomet', quantity: 3, unitPrice: 65, totalPrice: 195 }
      ],
      totalAmount: 195,
      paymentMethod: 'upi'
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const periods = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const calculateStats = () => {
    const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalTransactions = sales.length;
    const avgTransactionValue = totalSales / totalTransactions || 0;
    const totalItems = sales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

    const paymentBreakdown = {
      cash: sales.filter(s => s.paymentMethod === 'cash').reduce((sum, s) => sum + s.totalAmount, 0),
      card: sales.filter(s => s.paymentMethod === 'card').reduce((sum, s) => sum + s.totalAmount, 0),
      upi: sales.filter(s => s.paymentMethod === 'upi').reduce((sum, s) => sum + s.totalAmount, 0)
    };

    const topMedicines = sales
      .flatMap(sale => sale.items)
      .reduce((acc, item) => {
        const key = item.medicineName;
        if (!acc[key]) {
          acc[key] = { name: key, quantity: 0, revenue: 0 };
        }
        acc[key].quantity += item.quantity;
        acc[key].revenue += item.totalPrice;
        return acc;
      }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

    return {
      totalSales,
      totalTransactions,
      avgTransactionValue,
      totalItems,
      paymentBreakdown,
      topMedicines: Object.values(topMedicines).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
    };
  };

  const stats = calculateStats();

  const exportReport = () => {
    let csvContent = 'Date,Time,Customer,Phone,Items,Total,Payment Method,Prescription\n';
    
    sales.forEach(sale => {
      const itemsText = sale.items.map(item => `${item.medicineName} x${item.quantity}`).join('; ');
      csvContent += `${sale.date},${sale.time},${sale.customerName},${sale.customerPhone},"${itemsText}",${sale.totalAmount},${sale.paymentMethod},${sale.prescriptionNumber || ''}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${selectedPeriod}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Sales report exported successfully');
  };

  const filteredSales = sales.filter(sale => {
    const matchesPayment = !selectedPaymentMethod || sale.paymentMethod === selectedPaymentMethod;
    return matchesPayment;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Reports</h1>
            <p className="text-gray-600">Track sales performance and analyze trends</p>
          </div>
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Period and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>

          <select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Payment Methods</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-green-600">₹{stats.totalSales.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12% from last period</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</p>
              <p className="text-sm text-blue-600">+8% from last period</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Transaction</p>
              <p className="text-2xl font-bold text-purple-600">₹{stats.avgTransactionValue.toFixed(0)}</p>
              <p className="text-sm text-purple-600">+5% from last period</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Items Sold</p>
              <p className="text-2xl font-bold text-orange-600">{stats.totalItems}</p>
              <p className="text-sm text-orange-600">+15% from last period</p>
            </div>
            <Package className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Medicines */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Selling Medicines</h3>
          
          <div className="space-y-4">
            {stats.topMedicines.map((medicine, index) => (
              <div key={medicine.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{medicine.name}</h4>
                    <p className="text-sm text-gray-600">{medicine.quantity} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{medicine.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-900">Cash</h4>
                <p className="text-sm text-green-700">
                  {((stats.paymentBreakdown.cash / stats.totalSales) * 100).toFixed(1)}% of total sales
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-900">₹{stats.paymentBreakdown.cash.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-blue-900">UPI</h4>
                <p className="text-sm text-blue-700">
                  {((stats.paymentBreakdown.upi / stats.totalSales) * 100).toFixed(1)}% of total sales
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-900">₹{stats.paymentBreakdown.upi.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <h4 className="font-medium text-purple-900">Card</h4>
                <p className="text-sm text-purple-700">
                  {((stats.paymentBreakdown.card / stats.totalSales) * 100).toFixed(1)}% of total sales
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-purple-900">₹{stats.paymentBreakdown.card.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Sales</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-700">Date/Time</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Items</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Payment</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Prescription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSales.map(sale => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium text-gray-900">{new Date(sale.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{sale.time}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium text-gray-900">{sale.customerName}</p>
                      <p className="text-sm text-gray-500">{sale.customerPhone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium text-gray-900">{sale.items.length} items</p>
                      <p className="text-sm text-gray-500">
                        {sale.items.slice(0, 2).map(item => item.medicineName).join(', ')}
                        {sale.items.length > 2 && '...'}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <p className="font-bold text-gray-900">₹{sale.totalAmount}</p>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      sale.paymentMethod === 'cash' ? 'bg-green-100 text-green-800' :
                      sale.paymentMethod === 'upi' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {sale.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {sale.prescriptionNumber ? (
                      <span className="text-sm text-blue-600">{sale.prescriptionNumber}</span>
                    ) : (
                      <span className="text-sm text-gray-400">OTC</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;