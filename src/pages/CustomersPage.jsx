import { useState } from 'react';
import CustomerTable from '../components/CustomerTable';
import SegmentFilter from '../components/SegmentFilter';
import { customers } from '../data/customers'; 

export default function CustomersPage() {
  const [activeSegment, setActiveSegment] = useState('All');

  // Menentukan logika klasifikasi poin berdasarkan komponen LoyaltyBadge
  const getCustomerTier = (pts) => {
    if (pts >= 1000) return 'Platinum';
    if (pts >= 500) return 'Gold';
    return 'Silver';
  };

  // Logika filter data pelanggan yang sinkron
  const filteredCustomers = customers.filter(customer => {
    if (activeSegment === 'All') return true;
    return getCustomerTier(customer.points) === activeSegment;
  });

  return (
    <div className="space-y-6 p-6 bg-[#F5F6FA] min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer List</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your customers data and segments</p>
        </div>
        <button className="bg-[#4880FF] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all text-sm shadow-sm">
          + Add New Customer
        </button>
      </div>

      {/* Filter Segment */}
      <SegmentFilter 
        options={['All', 'Silver', 'Gold', 'Platinum']} 
        activeSegment={activeSegment} 
        onSelect={setActiveSegment} 
      />

      {/* Memanggil Komponen Tabel */}
      <CustomerTable data={filteredCustomers} />
    </div>
  );
}