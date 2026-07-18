'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Video, User, Mail, Building, ArrowRight, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth';

const step1Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

const step2Schema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number'),
  confirmPassword: z.string(),
  organizationName: z.string().min(2, 'Organization name required').optional().or(z.literal('')),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type Step1Form = z.infer<typeof step1Schema>;
type Step2Form = z.infer<typeof step2Schema>;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Form | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const form1 = useForm<Step1Form>({ resolver: zodResolver(step1Schema) });
  const form2 = useForm<Step2Form>({ resolver: zodResolver(step2Schema) });

  async function onStep1(data: Step1Form) {
    setStep1Data(data);
    setStep(2);
  }

  async function onStep2(data: Step2Form) {
    if (!step1Data) return;
    setError('');
    setIsLoading(true);
    try {
      const res = await api.post('/auth/register', {
        ...step1Data,
        password: data.password,
        organizationName: data.organizationName || undefined,
      });
      setUserId(res.data.userId);
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  }

  async function onVerifyOtp() {
    if (!userId || otp.length !== 6) return;
    setError('');
    setIsLoading(true);
    try {
      const res = await api.post('/auth/verify-otp', { userId, otp });
      setToken(res.data.accessToken);
      setUser(res.data.user);
      setStep(4);
      setTimeout(() => router.push('/home'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  }

  async function resendOtp() {
    if (!userId) return;
    try {
      await api.post('/auth/resend-otp', { userId });
    } catch {}
  }

  const steps = ['Account', 'Security', 'Verify', 'Done'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 dark:from-dark-bg dark:to-slate-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-md relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 justify-center mb-8">
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none" className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#et-grad-signup)"/>
            <path d="M9 9h14v3H12v2.5h9v3h-9V20h11v3H9Z" fill="white"/>
            <defs>
              <linearGradient id="et-grad-signup" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6"/>
                <stop offset="100%" stopColor="#6366F1"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="text-xl font-bold text-slate-900 dark:text-white">EdiThink</span>
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i + 1 < step ? 'bg-success text-white' :
                i + 1 === step ? 'bg-brand-primary text-white' :
                'bg-slate-200 dark:bg-dark-border text-slate-400'
              }`}>
                {i + 1 < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-8 transition-all duration-300 ${
                  i + 1 < step ? 'bg-success' : 'bg-slate-200 dark:bg-dark-border'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-premium-lg border border-slate-200/50 dark:border-dark-border p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Create account</h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Start your free EdiThink account</p>
                </div>

                <form onSubmit={form1.handleSubmit(onStep1)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        {...form1.register('name')}
                        placeholder="John Smith"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 text-sm"
                      />
                    </div>
                    {form1.formState.errors.name && <p className="mt-1 text-xs text-danger">{form1.formState.errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        {...form1.register('email')}
                        type="email"
                        placeholder="you@company.com"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 text-sm"
                      />
                    </div>
                    {form1.formState.errors.email && <p className="mt-1 text-xs text-danger">{form1.formState.errors.email.message}</p>}
                  </div>

                  <button type="submit" className="btn-ripple w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-accent text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-premium mt-2">
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                  Already have an account?{' '}
                  <Link href="/login" className="text-brand-primary hover:underline font-medium">Sign in</Link>
                </p>
              </motion.div>
            )}

            {/* Step 2: Password + Org */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Set your password</h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">for <strong>{step1Data?.email}</strong></p>
                </div>

                <form onSubmit={form2.handleSubmit(onStep2)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        {...form2.register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200 text-sm"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form2.formState.errors.password && <p className="mt-1 text-xs text-danger">{form2.formState.errors.password.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
                    <input
                      {...form2.register('confirmPassword')}
                      type="password"
                      placeholder="Repeat password"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200 text-sm"
                    />
                    {form2.formState.errors.confirmPassword && <p className="mt-1 text-xs text-danger">{form2.formState.errors.confirmPassword.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Organization Name <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        {...form2.register('organizationName')}
                        placeholder="Acme Inc."
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 text-sm text-danger">{error}</div>
                  )}

                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-dark-border transition-all">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button type="submit" disabled={isLoading} className="btn-ripple flex-1 flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-accent disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200">
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {isLoading ? 'Creating account…' : 'Create Account'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: OTP Verification */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-brand-primary" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check your email</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8">
                  We sent a 6-digit code to <strong>{step1Data?.email}</strong>
                </p>

                <div className="flex justify-center gap-3 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ''}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const newOtp = otp.split('');
                        newOtp[i] = val;
                        setOtp(newOtp.join(''));
                        if (val && i < 5) {
                          const next = document.querySelector(`input[data-otp="${i + 1}"]`) as HTMLInputElement;
                          next?.focus();
                        }
                      }}
                      data-otp={i}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  ))}
                </div>

                {error && <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 text-sm text-danger mb-4">{error}</div>}

                <button
                  onClick={onVerifyOtp}
                  disabled={otp.length !== 6 || isLoading}
                  className="btn-ripple w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-accent disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-4"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Verify Email
                </button>

                <button onClick={resendOtp} className="text-sm text-slate-500 hover:text-brand-primary transition-colors">
                  Didn't receive it? <span className="font-medium">Resend code</span>
                </button>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-success" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">You're all set! 🎉</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Redirecting to your dashboard…</p>
                <div className="mt-6 flex justify-center">
                  <div className="w-8 h-1 bg-brand-primary rounded-full animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
