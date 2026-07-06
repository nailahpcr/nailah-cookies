// import { useState } from 'react';
// import PageLayout from '../components/PageLayout';
// import Header from '../components/Header';
// import SegmentFilter from '../components/SegmentFilter';
// import TableContainer from '../components/TableContainer';
// import { customers } from '../data/customers';

// export default function SegmentationPage() {
//   const [activeTab, setActiveTab] = useState('Semua');

//   // Melakukan filter array data berdasarkan kategori yang diklik
//   const filteredCustomers = activeTab === 'Semua' 
//     ? customers 
//     : customers.filter(cust => cust.kategori === activeTab);

//   return (
//     <PageLayout>
//       <div className="space-y-6">
//         {/* Filter Tab Kategori */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 gap-4 rounded-xl border border-gray-100 shadow-sm">
//           <span className="text-sm font-bold text-gray-500">Filter Berdasarkan Segmentasi:</span>
//           <SegmentFilter 
//             options={['Semua', 'Umum', 'Santri', 'Institusi']} 
//             activeSegment={activeTab} 
//             onSelect={setActiveTab} 
//           />
//         </div>

//         {/* Hasil List Segmentasi */}
//         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//           <h3 className="text-lg font-bold text-gray-900 mb-4">Daftar Anggota Kategori: {activeTab}</h3>
//           <TableContainer>
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase bg-gray-50">
//                   <th className="p-4">ID</th>
//                   <th className="p-4">Nama Konsumen</th>
//                   <th className="p-4">Segmen Kategori</th>
//                   <th className="p-4">Wilayah Alamat</th>
//                   <th className="p-4">Status Hubungan</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-700">
//                 {filteredCustomers.map((cust) => (
//                   <tr key={cust.id} className="hover:bg-gray-50/50">
//                     <td className="p-4 text-gray-400">{cust.id}</td>
//                     <td className="p-4 font-bold text-gray-900">{cust.name}</td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                         cust.kategori === 'Institusi' ? 'bg-purple-100 text-purple-700' :
//                         cust.kategori === 'Santri' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
//                       }`}>
//                         {cust.kategori}
//                       </span>
//                     </td>
//                     <td className="p-4 text-gray-500 text-xs">{cust.alamat}</td>
//                     <td className="p-4">
//                       <span className={`text-xs font-bold ${
//                         cust.status === 'Loyal' ? 'text-green-600' :
//                         cust.status === 'Aktif' ? 'text-blue-500' : 'text-amber-600'
//                       }`}>
//                         ● {cust.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </TableContainer>
//         </div>
//       </div>
//     </PageLayout>
//   );
// }