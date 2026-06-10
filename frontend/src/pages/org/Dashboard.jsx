import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';
import { organizationService } from '../../services/organizationService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Users, DollarSign, Package, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import StatsCard from '../../components/ui/StatsCard';
import GlassCard from '../../components/ui/GlassCard';
import SectionReveal from '../../components/ui/SectionReveal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import MagneticButton from '../../components/ui/MagneticButton';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import PageTransition from '../../components/layout/PageTransition';

const OrgDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { success, error: toastError } = useToast();
  const [assigningDonation, setAssigningDonation] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');

  const { data: orgData, isLoading: orgLoading } = useQuery({
    queryKey: ['org-details'],
    queryFn: () => organizationService.getOrganization(user?._id || user?.id),
  });

  const { data: donationsData, isLoading: donationsLoading } = useQuery({
    queryKey: ['all-donations'],
    queryFn: () => donationService.getAllDonations(),
  });

  const assignMutation = useMutation({
    mutationFn: (data) => donationService.assignVolunteer(data),
    onSuccess: () => {
      success('Volunteer assigned successfully!');
      setAssigningDonation(null);
      setSelectedVolunteer('');
      queryClient.invalidateQueries(['all-donations']);
    },
    onError: (err) => toastError(err.response?.data?.message || 'Assignment failed'),
  });

  if (orgLoading || donationsLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  const org = orgData?.data || {};
  const donations = donationsData?.data || [];
  const pendingDonations = donations.filter(d => d.status === 'pending');

  const stats = [
    { label: 'Total Volunteers', value: org.volunteers?.length || 0, icon: Users },
    { label: 'Funds Received', value: org.fundsReceived || 0, icon: DollarSign, suffix: '' },
    { label: 'Active Tasks', value: donations.filter(d => d.status === 'assigned' || d.status === 'picked_up').length, icon: Package },
    { label: 'Completed', value: donations.filter(d => d.status === 'completed').length, icon: UserCheck },
  ];

  const handleAssign = () => {
    if (!selectedVolunteer) return toastError('Select a volunteer');
    assignMutation.mutate({
      donationId: assigningDonation._id,
      volunteerId: selectedVolunteer,
      organizationId: org._id
    });
  };

  return (
    <PageTransition>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-heading font-bold text-white">{org.name}</h1>
              {org.isVerified && <ShieldCheck className="text-teal" size={24} />}
            </div>
            <p className="text-muted">Central Command for your social impact initiatives.</p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-muted uppercase tracking-widest">
              Org ID: {org._id?.slice(-8).toUpperCase()}
            </div>
          </div>
        </header>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatsCard key={i} {...stat} value={stat.value} suffix={stat.suffix} />
          ))}
        </SectionReveal>

        <div className="grid grid-cols-1 gap-8">
          <GlassCard className="overflow-hidden" hover={false}>
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Package className="text-teal" size={20} /> Pending Assignment
              </h3>
              <p className="text-sm text-muted">{pendingDonations.length} items awaiting logistics</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted">Donor</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted">Item Type</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted">Location</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted">Date</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingDonations.map((donation) => (
                    <tr key={donation._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                        <p className="font-bold text-white">{donation.donorId?.name || 'Anonymous'}</p>
                        <p className="text-xs text-muted">{donation.donorId?.phone}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="capitalize">{donation.itemType}</span>
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-muted">{donation.quantity}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-muted truncate max-w-[200px]">{donation.pickupAddress}</td>
                      <td className="px-6 py-5 text-sm font-mono text-muted">{formatDate(donation.pickupDate)}</td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => setAssigningDonation(donation)}
                          className="px-4 py-2 rounded-lg bg-teal/10 text-teal text-sm font-bold hover:bg-teal hover:text-bg transition-all"
                        >
                          Assign Volunteer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pendingDonations.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center text-muted italic">All clear! No pending donations to assign.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Assign Volunteer Modal */}
        <Modal 
          isOpen={!!assigningDonation} 
          onClose={() => setAssigningDonation(null)}
          title="Assign Logistics Partner"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-muted uppercase mb-1">Pick up from</p>
              <p className="text-sm font-bold text-white">{assigningDonation?.pickupAddress}</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted ml-1">Select Volunteer</label>
              <select
                value={selectedVolunteer}
                onChange={(e) => setSelectedVolunteer(e.target.value)}
                className="input-field appearance-none cursor-pointer"
              >
                <option value="" disabled>Choose from your network</option>
                {org.volunteers?.map(vol => (
                  <option key={vol._id} value={vol._id} className="bg-surface text-text">{vol.name} ({vol.phone})</option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                onClick={() => setAssigningDonation(null)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <MagneticButton 
                onClick={handleAssign}
                disabled={assignMutation.isPending}
                className="flex-1"
              >
                {assignMutation.isPending ? 'Assigning...' : 'Confirm Assignment'}
              </MagneticButton>
            </div>
          </div>
        </Modal>
      </div>
    </PageTransition>
  );
};

export default OrgDashboard;
