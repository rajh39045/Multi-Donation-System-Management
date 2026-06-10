import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import GlassCard from './GlassCard';
import ProgressBar from './ProgressBar';
import MagneticButton from './MagneticButton';

const icons = {
  badge: Medal,
  certificate: Award,
  tour_trip: Trophy,
};

const RewardCard = ({ reward, currentCredits, onClaim, loading }) => {
  const rewardType = reward?.rewardType || reward?.name || 'reward';
  const requiredCredits = Number(reward?.creditRequired ?? reward?.points ?? 0);
  const status = reward?.status || 'available';
  const Icon = icons[rewardType.toLowerCase().replace(/\s+/g, '_')] || icons.badge || Award;
  const progress = requiredCredits > 0 ? Math.min((currentCredits / requiredCredits) * 100, 100) : 0;
  const isAvailable = currentCredits >= requiredCredits && status === 'available';

  return (
    <GlassCard className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div className={`p-4 rounded-2xl bg-white/5 ${isAvailable ? 'text-gold' : 'text-muted'}`}>
          <Icon size={40} />
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-muted mb-1">Required</p>
          <p className="text-2xl font-mono text-white">{requiredCredits}</p>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold mb-2 capitalize">{String(rewardType).replace(/_/g, ' ')}</h4>
        <p className="text-sm text-muted">Earn this milestone to showcase your impact.</p>
      </div>

      <ProgressBar progress={progress} label="Progress" />

      {status === 'claimed' || status === 'completed' ? (
        <div className="mt-2 py-3 text-center border border-teal/20 rounded-xl bg-teal/5 text-teal font-bold uppercase tracking-widest text-xs">
          Claimed
        </div>
      ) : (
        <MagneticButton
          onClick={() => onClaim(reward._id)}
          disabled={!isAvailable || loading}
          className="mt-2 w-full"
        >
          {loading ? 'Claiming...' : 'Claim Reward'}
        </MagneticButton>
      )}
    </GlassCard>
  );
};

export default RewardCard;
