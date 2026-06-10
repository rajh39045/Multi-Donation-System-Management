import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';
import { useToast } from '../../hooks/useToast';
import { Search, Filter, Package, ChevronRight, CheckCircle2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import StatusBadge from '../../components/ui/StatusBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/formatDate';
import PageTransition from '../../components/layout/PageTransition';

const ManageDonations = () => {
  const queryClient = useQueryClient();
  const { success, error: toastError } = useToast();
  const [filter, setFilter] = useState('all');

  const { data, isLoading } = useQuery({
    queryKey: ['all-donations-manage'],
    queryFn: () => donationService.getAllDonations(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => donationService.updateDonationStatus(id, status),
    onSuccess: (res) => {
      const donation = res?.data || res;
      success(`Status updated to ${donation?.status?.replace('_', ' ')}`);
      queryClient.invalidateQueries(['all-donations-manage']);
    },
    onError: (err) => toastError(err.response?.data?.message || 'Update failed'),
  });

  if (isLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  const donations = data?.data || [];
  const filteredDonations = filter === 'all' ? donations : donations.filter(d => d.status === filter);

  const handleStatusChange = (id, currentStatus) => {
    const statusMap = {
      assigned: 'picked_up',
      picked_up: 'delivered',
      delivered: 'completed',
    };
    const nextStatus = statusMap[currentStatus];
    if (nextStatus) {
      updateMutation.mutate({ id, status: nextStatus });
    }
  };

  return (
    <PageTransition>
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Manage Logistics</h1>
          <p className="text-muted">Lifecycle management for every donation on the platform.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {['all', 'assigned', 'picked_up', 'delivered', 'completed'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
                filter === s
                  ? 'bg-teal border-teal text-bg shadow-glow'
                  : 'bg-white/5 border-white/10 text-muted hover:border-white/30'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>

        <GlassCard className="overflow-hidden p-0 border-white/5" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted">Details</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted">Logistics</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted">Status</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDonations.map((d) => (
                  <tr key={d._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-teal/10 text-teal">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-white capitalize">{d.itemType} ({d.quantity})</p>
                          <p className="text-xs text-muted">Donor: {d.donorId?.name || 'Anonymous'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-white">Volunteer: {d.volunteerId?.name || '---'}</p>
                      <p className="text-xs text-muted truncate max-w-[200px]">{d.pickupAddress}</p>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      {['assigned', 'picked_up', 'delivered'].includes(d.status) ? (
                        <button
                          onClick={() => handleStatusChange(d._id, d.status)}
                          disabled={updateMutation.isPending}
                          className="flex items-center gap-2 ml-auto px-4 py-2 rounded-lg bg-gold/10 text-gold text-sm font-bold hover:bg-gold hover:text-bg transition-all"
                        >
                          Mark {d.status === 'assigned' ? 'Picked Up' : d.status === 'picked_up' ? 'Delivered' : 'Completed'}
                          <ChevronRight size={16} />
                        </button>
                      ) : d.status === 'completed' ? (
                        <div className="flex items-center gap-2 justify-end text-teal font-bold text-sm">
                          <CheckCircle2 size={18} /> Verified
                        </div>
                      ) : (
                        <span className="text-xs text-muted italic">Pending Assignment</span>
                      )}
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

export default ManageDonations;
