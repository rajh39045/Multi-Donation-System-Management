import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { creditService } from '../../services/creditService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Award, Clock, History, Trophy } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import RewardCard from '../../components/ui/RewardCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SectionReveal from '../../components/ui/SectionReveal';
import { formatDate } from '../../utils/formatDate';
import PageTransition from '../../components/layout/PageTransition';

const Rewards = () => {
  const { user, updateCredits } = useAuth();
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('rewards');

  const { data: creditsData, isLoading: creditsLoading } = useQuery({
    queryKey: ['credits'],
    queryFn: () => creditService.getCredits(),
  });

  const { data: rewardsData, isLoading: rewardsLoading } = useQuery({
    queryKey: ['rewards'],
    queryFn: () => creditService.getRewards(),
  });

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['credit-history'],
    queryFn: () => creditService.getCreditHistory(),
  });

  const claimMutation = useMutation({
    mutationFn: (rewardId) => creditService.claimReward(rewardId),
    onSuccess: (res) => {
      success('Reward claimed successfully! Check your email for details.');
      queryClient.invalidateQueries(['credits', 'rewards']);
    },
    onError: (err) => {
      toastError(err.response?.data?.message || 'Failed to claim reward');
    },
  });

  if (creditsLoading || rewardsLoading || historyLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  const rewards = rewardsData?.data || [];
  const history = historyData?.data || [];
  const totalCredits = creditsData?.data?.credits ?? creditsData?.data?.totalCredits ?? user?.credits ?? 0;

  return (
    <PageTransition>
      <div className="space-y-12">
        <header className="relative py-20 overflow-hidden rounded-[2.5rem] bg-surface border border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal/10 blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] -ml-48 -mb-48" />
          
          <div className="relative z-10 text-center flex flex-col items-center gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-glow">
              <Trophy size={48} className="text-gold" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-2">My Rewards</h1>
              <p className="text-muted">Turn your kindness into meaningful milestones.</p>
            </div>
            <div className="mt-4">
              <span className="text-6xl font-mono font-bold text-white text-glow">{totalCredits}</span>
              <p className="text-xs uppercase tracking-[0.4em] text-teal mt-2">Available Credits</p>
            </div>
          </div>
        </header>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 'rewards' ? 'bg-teal text-bg shadow-glow' : 'bg-white/5 text-muted hover:bg-white/10'
            }`}
          >
            <Award size={20} /> Available Rewards
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 'history' ? 'bg-teal text-bg shadow-glow' : 'bg-white/5 text-muted hover:bg-white/10'
            }`}
          >
            <History size={20} /> Credit History
          </button>
        </div>

        {activeTab === 'rewards' ? (
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rewards.map((reward) => (
              <RewardCard
                key={reward._id}
                reward={reward}
                currentCredits={totalCredits}
                onClaim={(id) => claimMutation.mutate(id)}
                loading={claimMutation.isPending && claimMutation.variables === reward._id}
              />
            ))}
          </SectionReveal>
        ) : (
          <GlassCard className="overflow-hidden" hover={false}>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted">Date</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted">Description</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted text-right">Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.map((item, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5 text-sm font-mono text-muted">{formatDate(item.date)}</td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-white">Donation Impact</p>
                      <p className="text-xs text-muted">Ref: {item.donationId?.slice(-8).toUpperCase()}</p>
                    </td>
                    <td className="px-6 py-5 text-right font-mono font-bold text-teal">+{item.creditsEarned}</td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-20 text-center text-muted italic">No history found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </GlassCard>
        )}
      </div>
    </PageTransition>
  );
};

export default Rewards;
