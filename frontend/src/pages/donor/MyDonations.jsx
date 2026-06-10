import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Package, Heart } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import StatusBadge from '../../components/ui/StatusBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatDate';
import PageTransition from '../../components/layout/PageTransition';

const MyDonations = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['my-donations'],
    queryFn: () => donationService.getMyDonations(),
  });

  const donations = data?.data || [];
  const filteredDonations = statusFilter === 'all' 
    ? donations 
    : donations.filter(d => d.status === statusFilter);

  const statuses = ['all', 'pending', 'assigned', 'picked_up', 'delivered', 'completed'];

  if (isLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  return (
    <PageTransition>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold text-white mb-2">My Donations</h1>
            <p className="text-muted">Track the progress of your contributions.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
                statusFilter === status
                  ? 'bg-teal border-teal text-bg shadow-glow'
                  : 'bg-white/5 border-white/10 text-muted hover:border-white/30'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>

        {filteredDonations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation) => (
              <GlassCard key={donation._id} className="flex flex-col gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <StatusBadge status={donation.status} />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-bg transition-colors duration-500">
                    <Heart size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold capitalize">{donation.itemType}</h3>
                    <p className="text-xs font-mono text-muted">{donation._id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Package size={16} className="text-teal" />
                    <span>{donation.quantity} Units — {donation.description.slice(0, 40)}...</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <MapPin size={16} className="text-teal" />
                    <span className="truncate">{donation.pickupAddress}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Calendar size={16} className="text-teal" />
                    <span>{formatDate(donation.pickupDate)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs text-muted">Submitted: {formatDate(donation.createdAt)}</span>
                  {donation.status === 'completed' && (
                    <div className="flex items-center gap-1 text-gold font-bold text-xs uppercase tracking-tighter">
                      Awarded +10 Credits
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <EmptyState
            message={statusFilter === 'all' ? "You haven't made any donations yet." : `No ${statusFilter} donations found.`}
            cta="Make a Donation"
            onCtaClick={() => navigate('/donor/donate')}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default MyDonations;
