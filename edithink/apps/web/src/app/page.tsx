'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Video, Users, Share2, Zap, Shield, Globe, 
  ArrowRight, Play, CheckCircle, Star, 
  Monitor, MessageSquare, Mic, Camera
} from 'lucide-react';

const features = [
  { icon: Video, title: '4K Screen Sharing', description: 'Crystal-clear screen sharing at up to 4K resolution with 60fps support' },
  { icon: Users, title: 'Up to 1000 Participants', description: 'Enterprise-grade scalability for any meeting size' },
  { icon: MessageSquare, title: 'Twitch-Style Chat', description: 'Live chat overlay with auto-fade messages for distraction-free meetings' },
  { icon: Zap, title: 'AI Meeting Intelligence', description: 'Automatic transcripts, summaries, and action item extraction' },
  { icon: Shield, title: 'Enterprise Security', description: 'End-to-end encryption, 2FA, SSO, and comprehensive audit logs' },
  { icon: Globe, title: 'Global Edge Network', description: 'Sub-100ms latency worldwide with intelligent routing' },
];

const stats = [
  { value: '4K', label: 'Screen Quality' },
  { value: '<50ms', label: 'Latency' },
  { value: '1000+', label: 'Participants' },
  { value: '99.9%', label: 'Uptime' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-dark-bg dark:via-slate-900 dark:to-dark-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 frosted border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#et-grad)"/>
                <path d="M9 9h14v3H12v2.5h9v3h-9V20h11v3H9Z" fill="white"/>
                <defs>
                  <linearGradient id="et-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#6366F1"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-bold text-slate-900 dark:text-white">EdiThink</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-8"
            >
              {['Features', 'Enterprise', 'Pricing', 'Docs'].map(item => (
                <a key={item} href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">
                  {item}
                </a>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Link href="/login" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-primary transition-colors px-4 py-2">
                Sign In
              </Link>
              <Link href="/signup" className="btn-ripple bg-brand-primary hover:bg-brand-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-premium">
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-brand-primary/20">
              <Zap className="w-4 h-4" />
              Now with AI Meeting Intelligence
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              Meetings that{' '}
              <span className="text-gradient">actually work</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Enterprise video conferencing reimagined. Start instant meetings, share in 4K, 
              collaborate on whiteboards, and let AI handle the notes.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="btn-ripple inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-accent text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:shadow-premium-lg group">
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center gap-2 bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-dark-border text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl text-base font-semibold border border-slate-200 dark:border-dark-border transition-all duration-200 hover:shadow-premium">
                <Play className="w-5 h-5 text-brand-primary fill-brand-primary" />
                Watch Demo
              </button>
            </motion.div>
            
            <motion.p variants={itemVariants} className="mt-6 text-sm text-slate-500 dark:text-slate-500">
              No credit card required · Free forever plan · SOC2 compliant
            </motion.p>
          </motion.div>

          {/* Hero Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-dark-bg via-transparent to-transparent z-10 pointer-events-none" style={{ top: '60%' }} />
            <div className="bg-dark-bg rounded-2xl shadow-premium-xl overflow-hidden border border-slate-200/20">
              {/* Mock meeting room UI */}
              <div className="bg-slate-900 p-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                  <div className="flex-1 text-center text-xs text-slate-500 font-mono">edithink.app/meet/EDT-482-916</div>
                </div>
              </div>
              <div className="bg-slate-900 aspect-video relative overflow-hidden">
                {/* Fake video grid */}
                <div className="grid grid-cols-4 gap-1 h-full p-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="relative bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                        {['AJ', 'MK', 'SR', 'TL', 'PB', 'YA', 'NR', 'CW'][i]}
                      </div>
                      {i === 0 && (
                        <div className="absolute inset-0 rounded-lg border-2 border-brand-primary animate-pulse" />
                      )}
                      <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between">
                        <span className="text-white text-xs bg-black/50 px-1.5 py-0.5 rounded font-medium">
                          {['Alex J', 'Maya K', 'Sam R', 'Tom L', 'Pat B', 'Yui A', 'Nick R', 'Chris W'][i]}
                        </span>
                        {i % 3 === 0 && <Mic className="w-3 h-3 text-success" />}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom controls preview */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <div className="glass-dark rounded-2xl px-4 py-2 flex items-center gap-2">
                    {[Mic, Camera, Monitor, MessageSquare].map((Icon, i) => (
                      <div key={i} className={`p-2 rounded-xl ${i === 0 ? 'bg-danger' : 'bg-white/10'} cursor-pointer`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    ))}
                    <div className="w-px h-6 bg-white/20" />
                    <button className="bg-danger text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                      Leave
                    </button>
                  </div>
                </div>
                {/* Twitch chat overlay preview */}
                <div className="absolute right-3 bottom-16 top-3 w-44 flex flex-col justify-end gap-1.5 overflow-hidden">
                  {[
                    { user: 'Maya', msg: 'Can everyone see my screen?', color: '#60A5FA' },
                    { user: 'Tom', msg: '👍 Yes, looks great!', color: '#34D399' },
                    { user: 'Sam', msg: 'Love the new design!', color: '#F59E0B' },
                  ].map((m, i) => (
                    <div key={i} className="glass-dark rounded-lg px-2 py-1 text-xs">
                      <span style={{ color: m.color }} className="font-semibold">{m.user}: </span>
                      <span className="text-white/80">{m.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need, nothing you don't
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built for teams that value simplicity, reliability, and performance above all else.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-premium p-6 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-primary via-brand-accent to-blue-500 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to transform your meetings?</h2>
            <p className="text-blue-100 mb-8 text-lg">Join thousands of teams using EdiThink for enterprise collaboration.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-brand-primary px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-dark-border py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#et-grad-footer)"/>
              <path d="M9 9h14v3H12v2.5h9v3h-9V20h11v3H9Z" fill="white"/>
              <defs>
                <linearGradient id="et-grad-footer" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#6366F1"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="font-bold text-slate-900 dark:text-white">EdiThink</span>
          </div>
          <p className="text-sm text-slate-500">© 2025 EdiThink. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            {['Privacy', 'Terms', 'Security', 'Status'].map(item => (
              <a key={item} href="#" className="hover:text-brand-primary transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
