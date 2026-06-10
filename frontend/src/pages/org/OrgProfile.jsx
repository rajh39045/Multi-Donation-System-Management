import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '../../services/organizationService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useForm } from 'react-hook-form';
import { Landmark, Users, UserPlus, Phone, MapPin, Mail, Save, ShieldCheck } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import FormInput from '../../components/forms/FormInput';
import FormTextarea from '../../components/forms/FormTextarea';
import MagneticButton from '../../components/ui/MagneticButton';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import PageTransition from '../../components/layout/PageTransition';

const OrgProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { success, error: toastError } = useToast();
  const [volunteerEmail, setVolunteerEmail] = useState('');

  const { data: orgData, isLoading } = useQuery({
    queryKey: ['org-profile'],
    queryFn: () => organizationService.getOrganization(user?._id || user?.id),
  });

  const { data: allVolunteersData } = useQuery({
    queryKey: ['available-volunteers'],
    queryFn: () => organizationService.getAvailableVolunteers(),
  });

  const { register, handleSubmit, reset } = useForm();

  // Reset form when data is loaded
  React.useEffect(() => {
    if (orgData?.data) {
      reset(orgData.data);
    }
  }, [orgData, reset]);

  const updateMutation = useMutation({
    mutationFn: (data) => organizationService.updateOrganization(user?._id || user?.id, data),
    onSuccess: () => {
      success('Profile updated successfully!');
      queryClient.invalidateQueries(['org-profile']);
    },
    onError: (err) => toastError(err.response?.data?.message || 'Update failed'),
  });

  const addVolMutation = useMutation({
    mutationFn: (data) => organizationService.addVolunteer(data),
    onSuccess: () => {
      success('Volunteer added to your network!');
      setVolunteerEmail('');
      queryClient.invalidateQueries(['org-profile']);
    },
    onError: (err) => toastError(err.response?.data?.message || 'Failed to add volunteer'),
  });

  if (isLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  const org = orgData?.data || {};
  const allVolunteers = allVolunteersData?.data || [];
  const globalVolunteers = allVolunteers.filter(v => 
    !org.volunteers?.some(ov => ov._id === v._id)
  );

  const onUpdateSubmit = (data) => {
    updateMutation.mutate(data);
  };

  const handleAddVolunteer = (idOrEmail) => {
    addVolMutation.mutate({
      organizationId: org._id,
      volunteerId: idOrEmail, 
    });
  };

  return (
    <PageTransition>
      <div className="space-y-12">
        <header>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Organization Profile</h1>
          <p className="text-muted">Manage your identity and volunteer network.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Info */}
          <GlassCard className="lg:col-span-2 p-10 border-white/5" hover={false}>
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-3xl bg-teal/10 flex items-center justify-center text-teal border border-teal/20 relative">
                  <Landmark size={40} />
                  {org.isVerified && (
                    <div className="absolute -top-2 -right-2 bg-teal text-bg p-1 rounded-full shadow-glow">
                      <ShieldCheck size={16} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold">{org.name}</h3>
                  <p className="text-sm text-muted">Verified Social Partner</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput label="Organization Name" register={register('name')} />
                <FormInput label="Official Email" register={register('email')} disabled />
                <FormInput label="Phone Contact" register={register('phone')} />
                <FormInput label="Physical Address" register={register('address')} />
              </div>

              <FormTextarea label="Mission Description" register={register('description')} />

              <div className="pt-6">
                <MagneticButton type="submit" disabled={updateMutation.isPending} className="w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Save size={18} /> {updateMutation.isPending ? 'Saving...' : 'Save Profile'}
                  </div>
                </MagneticButton>
              </div>
            </form>
          </GlassCard>

          {/* Volunteers Management */}
          <div className="space-y-8">
            <GlassCard className="p-8 border-white/5" hover={false}>
              <h3 className="text-xl font-bold flex items-center gap-3 text-teal mb-8">
                <UserPlus size={20} /> Add Volunteer
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Volunteer Email or ID"
                  value={volunteerEmail}
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  className="input-field"
                />
                <button
                  onClick={() => handleAddVolunteer(volunteerEmail)}
                  disabled={addVolMutation.isPending || !volunteerEmail}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} /> {addVolMutation.isPending ? 'Adding...' : 'Add to Network'}
                </button>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/5" hover={false}>
              <h3 className="text-xl font-bold flex items-center gap-3 text-gold mb-8">
                <Users size={20} /> Global Volunteers
              </h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {globalVolunteers.map((vol) => (
                  <div key={vol._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group">
                    <div>
                      <p className="font-bold text-white text-sm">{vol.name}</p>
                      <p className="text-xs text-muted">{vol.phone || vol.email}</p>
                    </div>
                    <button 
                      onClick={() => handleAddVolunteer(vol._id)}
                      className="p-2 text-teal hover:bg-teal/10 rounded-lg transition-all"
                      title="Add to network"
                    >
                      <UserPlus size={16} />
                    </button>
                  </div>
                ))}
                {globalVolunteers.length === 0 && (
                  <p className="text-center text-muted italic text-sm py-10">No new volunteers found.</p>
                )}
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 flex-1" hover={false}>
              <h3 className="text-xl font-bold flex items-center gap-3 text-white mb-8">
                <Users size={20} /> Current Network
              </h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {org.volunteers?.map((vol) => (
                  <div key={vol._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group">
                    <div>
                      <p className="font-bold text-white text-sm">{vol.name}</p>
                      <p className="text-xs text-muted">{vol.phone}</p>
                    </div>
                    <button className="p-2 text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all">
                      <Save className="rotate-45" size={16} /> {/* Mock delete */}
                    </button>
                  </div>
                ))}
                {(!org.volunteers || org.volunteers.length === 0) && (
                  <p className="text-center text-muted italic text-sm py-10">No volunteers in network yet.</p>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OrgProfile;
