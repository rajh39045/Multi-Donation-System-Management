import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '../../services/organizationService';
import { useToast } from '../../hooks/useToast';
import { useForm } from 'react-hook-form';
import { Landmark, Mail, Phone, MapPin, ShieldCheck, PlusCircle } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import FormInput from '../../components/forms/FormInput';
import FormTextarea from '../../components/forms/FormTextarea';
import MagneticButton from '../../components/ui/MagneticButton';
import PageTransition from '../../components/layout/PageTransition';

const CreateOrg = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { success, error: toastError } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => organizationService.createOrganization(data),
    onSuccess: (res) => {
      success(`Organization ${res.data?.name || 'partner'} created!`);
      reset();
      queryClient.invalidateQueries(['admin-orgs']);
    },
    onError: (err) => toastError(err.response?.data?.message || 'Creation failed'),
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, isVerified: true });
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Add Organization</h1>
          <p className="text-muted">Onboard a new verified partner to the platform.</p>
        </header>

        <GlassCard className="p-10 border-white/5" hover={false}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3 text-teal">
                <Landmark size={20} /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label="Organization Name"
                  placeholder="e.g. Hope Foundation"
                  register={register('name', { required: 'Name is required' })}
                  error={errors.name}
                />
                <FormInput
                  label="Official Email"
                  type="email"
                  placeholder="contact@org.org"
                  register={register('email', { required: 'Email is required' })}
                  error={errors.email}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gold">
                <Phone size={20} /> Contact & Logistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label="Phone Number"
                  placeholder="+91 00000 00000"
                  register={register('phone', { required: 'Phone is required' })}
                  error={errors.phone}
                />
                <FormInput
                  label="Headquarters Address"
                  placeholder="Full street address"
                  register={register('address', { required: 'Address is required' })}
                  error={errors.address}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                <ShieldCheck size={20} /> Platform Mission
              </h3>
              <FormTextarea
                label="About the Organization"
                placeholder="Describe their impact and goals..."
                register={register('description', { required: 'Description is required' })}
                error={errors.description}
              />
            </div>

            <div className="pt-8 border-t border-white/5">
              <MagneticButton type="submit" disabled={mutation.isPending} className="w-full py-4 text-lg">
                <div className="flex items-center justify-center gap-2">
                  <PlusCircle size={20} /> {mutation.isPending ? 'Onboarding...' : 'Onboard Partner'}
                </div>
              </MagneticButton>
              <p className="text-center mt-6 text-xs text-muted">
                New organizations are automatically set to <span className="text-teal font-bold">Verified</span> status by administrators.
              </p>
            </div>
          </form>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default CreateOrg;
