import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../utils/validators';
import { authService } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import FormInput from '../../components/forms/FormInput';
import MagneticButton from '../../components/ui/MagneticButton';
import GlassCard from '../../components/ui/GlassCard';
import { Eye, EyeOff, Lock, Mail, Quote } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      const { user, token } = response.data;
      login(user, token);
      success('Welcome back!');
      
      const roleRedirects = {
        donor: '/donor/dashboard',
        organization: '/org/dashboard',
        admin: '/admin/dashboard',
        volunteer: '/volunteer/dashboard',
      };
      
      navigate(roleRedirects[user.role] || '/');
    } catch (err) {
      toastError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-bg">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
            alt="Charity"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-glass-gradient" />
          <div className="absolute inset-0 flex flex-col justify-center p-20">
            <div className="max-w-md">
              <Quote className="text-teal mb-6" size={48} />
              <h2 className="text-5xl font-heading font-bold text-white mb-6 leading-tight">
                "Small acts, when multiplied by millions of people, can transform the world."
              </h2>
              <p className="text-teal font-mono text-lg">— Howard Zinn</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <GlassCard className="w-full max-w-md p-10 border-white/5" hover={false}>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-heading font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-muted">Enter your credentials to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-4 top-[46px] text-muted" size={18} />
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  register={register('email')}
                  error={errors.email}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-[46px] text-muted" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[46px] text-muted hover:text-teal transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <FormInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  register={register('password')}
                  error={errors.password}
                  className="pl-12 pr-12"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-teal focus:ring-teal" />
                  <span className="text-muted group-hover:text-white transition-colors">Remember me</span>
                </label>
                <Link to="#" className="text-teal hover:underline font-medium">Forgot password?</Link>
              </div>

              <MagneticButton type="submit" disabled={loading} className="w-full py-4 text-lg">
                {loading ? 'Signing in...' : 'Sign In'}
              </MagneticButton>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted">
                Don't have an account?{' '}
                <Link to="/register" className="text-teal font-bold hover:underline">Create Account</Link>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
