import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { donationSchema } from '../../utils/validators';
import { donationService } from '../../services/donationService';
import { useDonationStore } from '../../store/useDonationStore';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { Package, MapPin, Calendar, ArrowLeft, CheckCircle, Info, AlertCircle } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import FormInput from '../../components/forms/FormInput';
import FormTextarea from '../../components/forms/FormTextarea';
import DatePicker from '../../components/forms/DatePicker';
import ItemTypeSelector from '../../components/ui/ItemTypeSelector';
import MagneticButton from '../../components/ui/MagneticButton';
import StepIndicator from '../../components/ui/StepIndicator';
import ConfettiEffect from '../../components/ui/ConfettiEffect';
import PageTransition from '../../components/layout/PageTransition';

const NewDonation = () => {
  const { formData, step, setField, nextStep, prevStep, reset } = useDonationStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm({
    resolver: yupResolver(donationSchema),
    defaultValues: formData,
    shouldUnregister: false, // CRITICAL: Keep data of hidden steps
  });

  const stepRef = useGSAP(() => {
    const targets = gsap.utils.toArray('.step-container');
    if (targets.length > 0) {
      gsap.fromTo(targets, 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [step]);

  // Sync form state to store for summary
  const watchAllFields = watch();
  useEffect(() => {
    Object.keys(watchAllFields).forEach(key => {
      if (watchAllFields[key] !== formData[key]) {
        setField(key, watchAllFields[key]);
      }
    });
  }, [watchAllFields, formData, setField]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await donationService.createDonation(data);
      setSubmitted(true);
      success('Donation submitted! A volunteer will be assigned soon.');
      reset();
      setTimeout(() => navigate('/donor/dashboard'), 5000);
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to submit donation');
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (errors) => {
    console.error('Form Errors:', errors);
    const firstError = Object.values(errors)[0];
    if (firstError) toastError(firstError.message);
  };

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ['itemType', 'description', 'quantity'];
    if (step === 2) fieldsToValidate = ['pickupAddress', 'pickupDate'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      nextStep();
    } else {
      toastError('Please fix the errors before continuing');
    }
  };

  if (submitted) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <ConfettiEffect />
      <div className="w-24 h-24 bg-teal/20 rounded-full flex items-center justify-center text-teal mb-8">
        <CheckCircle size={60} />
      </div>
      <h1 className="text-5xl font-heading font-bold text-white mb-4">Donation Successful!</h1>
      <p className="text-xl text-muted max-w-md mb-12">
        Thank you for your kindness. You'll earn <span className="text-gold font-bold">+10 credits</span> once the items are picked up.
      </p>
      <MagneticButton onClick={() => navigate('/donor/dashboard')}>
        Go to Dashboard
      </MagneticButton>
    </div>
  );

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-10">
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">New Donation</h1>
          <p className="text-muted">Fill in the details below to schedule your contribution.</p>
        </div>

        <StepIndicator 
          currentStep={step} 
          totalSteps={3} 
          labels={['Donation Info', 'Pickup Details', 'Confirmation']} 
        />

        <GlassCard ref={stepRef} className="step-container p-10 border-white/5" hover={false}>
          <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {step === 1 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-teal">
                    <Package size={20} /> What are you donating?
                  </h3>
                  <ItemTypeSelector 
                    selected={watch('itemType')} 
                    onSelect={(val) => {
                      setValue('itemType', val, { shouldValidate: true });
                    }} 
                  />
                  {errors.itemType && (
                    <p className="text-xs text-danger flex items-center gap-1 mt-2">
                      <AlertCircle size={14} /> {errors.itemType.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <FormTextarea
                    label="Description"
                    placeholder="Provide details about the items (e.g., Size, Condition, Expiry date)"
                    register={register('description')}
                    error={errors.description}
                  />
                  <div className="space-y-6">
                    <FormInput
                      label="Quantity"
                      type="number"
                      placeholder="e.g. 5"
                      register={register('quantity')}
                      error={errors.quantity}
                    />
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm text-teal flex gap-3">
                      <Info size={20} className="shrink-0" />
                      <p>Try to package items securely. For food, ensure it's fresh and within expiry.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-8">
                  <MagneticButton onClick={handleNext} className="w-full sm:w-auto">
                    Continue to Pickup <ArrowLeft className="rotate-180 ml-2" size={18} />
                  </MagneticButton>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-teal">
                    <MapPin size={20} /> Pickup Details
                  </h3>
                  <div className="grid grid-cols-1 gap-8">
                    <FormInput
                      label="Pickup Address"
                      placeholder="Your full address where volunteer can reach"
                      register={register('pickupAddress')}
                      error={errors.pickupAddress}
                    />
                    <DatePicker
                      label="Preferred Pickup Date"
                      register={register('pickupDate')}
                      error={errors.pickupDate}
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 text-sm text-gold flex gap-3">
                    <Info size={20} className="shrink-0" />
                    <p>Volunteers usually arrive between 10 AM and 6 PM on the selected date.</p>
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <button type="button" onClick={prevStep} className="flex items-center gap-2 text-muted hover:text-white transition-colors">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <MagneticButton onClick={handleNext} className="w-full sm:w-auto">
                    Review Donation <ArrowLeft className="rotate-180 ml-2" size={18} />
                  </MagneticButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-teal">
                    <CheckCircle size={20} /> Confirmation Summary
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <p className="text-xs text-muted uppercase tracking-widest">Item Information</p>
                      <div>
                        <p className="text-sm text-muted">Category</p>
                        <p className="font-bold text-white capitalize">{watch('itemType') || 'Not selected'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted">Quantity</p>
                        <p className="font-bold text-white">{watch('quantity')} Units</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted">Description</p>
                        <p className="text-sm text-white line-clamp-3">{watch('description') || 'No description'}</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <p className="text-xs text-muted uppercase tracking-widest">Pickup Information</p>
                      <div>
                        <p className="text-sm text-muted">Address</p>
                        <p className="text-sm font-bold text-white">{watch('pickupAddress') || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted">Date</p>
                        <p className="font-bold text-white">
                          {watch('pickupDate') ? new Date(watch('pickupDate')).toDateString() : 'Not selected'}
                        </p>
                      </div>
                      <div className="pt-2">
                        <p className="text-xs text-gold font-bold uppercase tracking-tighter bg-gold/10 px-3 py-1 rounded-full inline-block">
                          Reward: +10 Credits
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <button type="button" onClick={prevStep} className="flex items-center gap-2 text-muted hover:text-white transition-colors">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <MagneticButton type="submit" disabled={loading} className="w-full sm:w-auto">
                    {loading ? 'Submitting...' : 'Confirm & Schedule'}
                  </MagneticButton>
                </div>
              </div>
            )}
          </form>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default NewDonation;
