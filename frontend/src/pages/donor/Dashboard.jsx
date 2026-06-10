import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';
import { creditService } from '../../services/creditService';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Heart, Package, Clock, Award, Plus, ArrowRight } from 'lucide-react';
import StatsCard from '../../components/ui/StatsCard';
import GlassCard from '../../components/ui/GlassCard';
import SectionReveal from '../../components/ui/SectionReveal';
import MagneticButton from '../../components/ui/MagneticButton';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import StatusBadge from '../../components/ui/StatusBadge';
import ProgressBar from '../../components/ui/ProgressBar';
import { formatDate } from '../../utils/formatDate';

const DonorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: donations, isLoading: donationsLoading } = useQuery({
    queryKey: ['my-donations'],
    queryFn: () => donationService.getMyDonations(),
  });

  const { data: creditsData, isLoading: creditsLoading } = useQuery({
    queryKey: ['credits'],
    queryFn: () => creditService.getCredits(),
  });

  const { data: rewardsData } = useQuery({
    queryKey: ['rewards'],
    queryFn: () => creditService.getRewards(),
  });

  if (donationsLoading || creditsLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  const myDonations = Array.isArray(donations?.data) ? donations.data : [];
  const totalCredits = creditsData?.data?.credits ?? creditsData?.data?.totalCredits ?? user?.credits ?? 0;
  
  const stats = {
    total: myDonations.length,
    pending: myDonations.filter(d => d.status === 'pending' || d.status === 'assigned').length,
    completed: myDonations.filter(d => d.status === 'completed').length,
    credits: totalCredits
  };

  const nextReward = (rewardsData?.data || []).find((reward) => Number(reward.points) > totalCredits) || (rewardsData?.data || [])[0] || { points: 50, name: 'Badge', description: 'Next milestone' };
  const creditTarget = Number(nextReward.points || nextReward.creditRequired || 50);
  const progress = Math.min((stats.credits / creditTarget) * 100, 100);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Hello, {user?.name.split(' ')[0]}!</h1>
          <p className="text-muted">You've made a significant impact today. Keep it up!</p>
        </div>
        <div className="flex gap-4">
          <MagneticButton onClick={() => navigate('/donor/donate')}>
            <div className="flex items-center gap-2"><Plus size={18} /> New Donation</div>
          </MagneticButton>
        </div>
      </div>

      <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Total Items" value={stats.total} icon={Heart} />
        <StatsCard label="Pending" value={stats.pending} icon={Clock} />
        <StatsCard label="Completed" value={stats.completed} icon={Package} />
        <StatsCard label="Credits" value={stats.credits} icon={Award} />
      </SectionReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Donations */}
        <GlassCard className="lg:col-span-2 overflow-hidden" hover={false}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Clock className="text-teal" size={20} /> Recent Activity
            </h3>
            <button onClick={() => navigate('/donor/my-donations')} className="text-teal text-sm font-bold flex items-center gap-1 hover:underline">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {myDonations.slice(0, 5).map((donation) => (
              <div key={donation._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-teal/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white/5 text-teal">
                    <Heart size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white capitalize">{donation.itemType}</p>
                    <p className="text-xs text-muted">{formatDate(donation.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden sm:block text-sm font-mono text-muted">{donation.quantity} units</span>
                  <StatusBadge status={donation.status} />
                </div>
              </div>
            ))}
            {myDonations.length === 0 && (
              <div className="py-12 text-center text-muted italic">No donations yet. Start your journey today!</div>
            )}
          </div>
        </GlassCard>

        {/* Credits Progress */}
        <GlassCard className="flex flex-col gap-8" hover={false}>
          <h3 className="text-xl font-bold flex items-center gap-3">
            <Award className="text-gold" size={20} /> Impact Progress
          </h3>
          
          <div className="text-center py-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-teal/20 blur-2xl rounded-full" />
              <div className="relative text-6xl font-mono font-bold text-white text-glow mb-2">
                {stats.credits}
              </div>
            </div>
            <p className="text-muted uppercase tracking-[0.2em] text-xs">Total Credits</p>
          </div>

          <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-muted uppercase mb-1">Next Milestone</p>
                <p className="font-bold text-white capitalize">{(nextReward.name || nextReward.rewardType || 'Milestone').replace('_', ' ')}</p>
              </div>
              <p className="text-xs font-mono text-gold">{nextReward.creditRequired - stats.credits} more to go</p>
            </div>
            <ProgressBar progress={progress} />
          </div>

          <MagneticButton onClick={() => navigate('/donor/rewards')} className="w-full mt-auto bg-surface border border-white/10 text-white">
            View My Rewards
          </MagneticButton>
        </GlassCard>
      </div>
    </div>
  );
};

export default DonorDashboard;
