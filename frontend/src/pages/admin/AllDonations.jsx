import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';
import { useToast } from '../../hooks/useToast';
import { Package, Search, Filter, Download, MoreVertical } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import StatusBadge from '../../components/ui/StatusBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/formatDate';
import PageTransition from '../../components/layout/PageTransition';

const AllDonations = () => {
  const queryClient = useQueryClient();
  const { success, error: toastError } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-all-donations'],
    queryFn: () => donationService.getAllDonations(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => donationService.updateDonationStatus(id, status),
    onSuccess: () => {
      success('Donation status updated');
      queryClient.invalidateQueries(['admin-all-donations']);
    },
    onError: (err) => toastError(err.response?.data?.message || 'Update failed'),
  });

  if (isLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  const donations = data?.data || [];
  const filtered = donations.filter(d => 
    d.itemType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.donorId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold text-white mb-2">Global Inventory</h1>
            <p className="text-muted">Live audit trail of all items moving through the platform.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
            <Download size={18} /> Export Data
          </button>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Search by donor or item type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-muted hover:text-white flex items-center gap-2">
              <Filter size={18} /> Filters
            </button>
          </div>
        </div>

        <GlassCard className="overflow-hidden p-0 border-white/5" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted">Reference</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted">Donor</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted">Item</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted">Organization</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted">Status</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((d) => (
                  <tr key={d._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6 font-mono text-xs text-teal">{d._id.slice(-8).toUpperCase()}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-white text-sm">{d.donorId?.name || 'Anonymous'}</p>
                      <p className="text-xs text-muted">{d.donorId?.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="capitalize text-sm">{d.itemType}</span>
                        <span className="text-xs text-gold font-bold">x{d.quantity}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-muted">
                      {d.organizationId?.name || '---'}
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-8 py-6 text-right text-xs font-mono text-muted">
                      {formatDate(d.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default AllDonations;
