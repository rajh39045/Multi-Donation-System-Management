import React from 'react';
import { Heart, Calendar, MapPin, Package } from 'lucide-react';
import GlassCard from './GlassCard';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utils/formatDate';

const DonationCard = ({ donation, onClick }) => {
  return (
    <GlassCard 
      onClick={onClick}
      className="flex flex-col gap-6 relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute top-0 right-0 p-4">
        <StatusBadge status={donation.status} />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-2xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-bg transition-colors duration-500">
          <Heart size={28} />
        </div>
        <div>
          <h3 className="text-xl font-bold capitalize">{donation.itemType}</h3>
          <p className="text-xs font-mono text-muted">{donation._id?.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3 text-sm text-muted">
          <Package size={16} className="text-teal" />
          <span className="truncate">{donation.description}</span>
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

      {donation.creditsAwarded > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <span className="text-xs text-gold font-bold uppercase tracking-tighter">
            ★ {donation.creditsAwarded} Credits Awarded
          </span>
        </div>
      )}
    </GlassCard>
  );
};

export default DonationCard;
