import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../../utils/validators';
import { authService } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import FormInput from '../../components/forms/FormInput';
import MagneticButton from '../../components/ui/MagneticButton';
import GlassCard from '../../components/ui/GlassCard';
import RoleSelector from '../../components/ui/RoleSelector';
import StepIndicator from '../../components/ui/StepIndicator';
import { Quote, User, Mail, Phone, MapPin, Lock, Users, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, control, watch, trigger, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { role: 'donor' },
    shouldUnregister: false,
  });

  const regRef = useGSAP(() => {
    gsap.fromTo('.step-animate', 
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [step]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      const { user, token } = response.data;
      login(user, token);
      success('Welcome to the movement!');
      
      const roleRedirects = {
        donor: '/donor/dashboard',
        organization: '/org/dashboard',
        admin: '/admin/dashboard',
        volunteer: '/volunteer/dashboard',
      };
      
      navigate(roleRedirects[user.role] || '/');
    } catch (err) {
      toastError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    let fields = [];
    if (step === 1) fields = ['role'];
    if (step === 2) fields = ['name', 'email', 'phone', 'address'];
    
    const isValid = await trigger(fields);
    if (isValid) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  // Dynamic backgrounds based on role
  const roleVisuals = {
    donor: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    organization: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80",
    volunteer: "https://images.unsplash.com/photo-1559027615-cd2673bf9199?w=1200&q=80"
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-bg overflow-hidden">
        {/* Left Side - Dynamic Visual */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            key={watch('role')}
            src={roleVisuals[watch('role')] || roleVisuals.donor}
            alt="Role Context"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-105"
          />
          <div className="absolute inset-0 bg-glass-gradient" />
          <div className="absolute inset-0 flex flex-col justify-center p-20">
            <div className="max-w-md">
              <Quote className="text-teal mb-6 animate-pulse" size={48} />
              <h2 className="text-5xl font-heading font-bold text-white mb-6 leading-tight">
                {step === 1 ? "Choose your path to impact." : 
                 step === 2 ? "Tell us a bit about yourself." :
                 "Your security is our priority."}
              </h2>
              <p className="text-teal font-mono text-lg uppercase tracking-widest">Step {step} of 3</p>
            </div>
          </div>
        </div>

        {/* Right Side - Step Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 lg:p-24 relative overflow-y-auto">
          <div className="max-w-xl w-full mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-heading font-bold text-white mb-3">Join MUTI</h1>
              <p className="text-muted">Create your account and start your journey of kindness.</p>
            </div>

            <div className="mb-10">
              <StepIndicator currentStep={step} totalSteps={3} labels={['Role', 'Details', 'Security']} />
            </div>

            <div ref={regRef} className="step-animate">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <Users className="text-teal" size={24} /> What describes you best?
                    </h3>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <RoleSelector selected={field.value} onSelect={field.onChange} />
                      )}
                    />
                    <div className="pt-6">
                      <MagneticButton onClick={nextStep} className="w-full py-4 group">
                        <span className="flex items-center justify-center gap-2">
                          Continue to Details <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </span>
                      </MagneticButton>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <User className="text-teal" size={24} /> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormInput label="Full Name" placeholder="John Doe" register={register('name')} error={errors.name} />
                      <FormInput label="Email Address" type="email" placeholder="john@example.com" register={register('email')} error={errors.email} />
                      <FormInput label="Phone Number" placeholder="+91 98765 43210" register={register('phone')} error={errors.phone} />
                      <FormInput label="Full Address" placeholder="City, State, Zip" register={register('address')} error={errors.address} />
                    </div>
                    <div className="flex gap-4 pt-6">
                      <button type="button" onClick={prevStep} className="px-6 py-4 rounded-full border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-all flex items-center gap-2">
                        <ArrowLeft size={18} /> Back
                      </button>
                      <MagneticButton onClick={nextStep} className="flex-1 py-4 group">
                        <span className="flex items-center justify-center gap-2">
                          Configure Security <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </span>
                      </MagneticButton>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <Lock className="text-teal" size={24} /> Secure Your Account
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormInput label="Password" type="password" placeholder="••••••••" register={register('password')} error={errors.password} />
                      <FormInput label="Confirm Password" type="password" placeholder="••••••••" register={register('confirmPassword')} error={errors.confirmPassword} />
                    </div>
                    
                    <div className="p-4 rounded-xl bg-teal/5 border border-teal/20 text-xs text-teal flex gap-3 items-start">
                      <ShieldCheck size={20} className="shrink-0" />
                      <p className="leading-relaxed">By creating an account, you agree to MUTI's Terms of Service and Impact Transparency Guidelines. Your data is encrypted and secure.</p>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button type="button" onClick={prevStep} className="px-6 py-4 rounded-full border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-all flex items-center gap-2">
                        <ArrowLeft size={18} /> Back
                      </button>
                      <MagneticButton type="submit" disabled={loading} className="flex-1 py-4">
                        {loading ? 'Creating Impact...' : 'Complete Registration'}
                      </MagneticButton>
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-12 text-center">
                <p className="text-muted">
                  Already a member?{' '}
                  <Link to="/login" className="text-teal font-bold hover:underline">Sign In Instead</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
