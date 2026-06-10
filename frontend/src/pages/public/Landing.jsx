import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { Heart, ShieldCheck, Truck, BarChart3, ChevronRight, Play } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import MagneticButton from '../../components/ui/MagneticButton';
import GlassCard from '../../components/ui/GlassCard';
import SectionReveal from '../../components/ui/SectionReveal';
import StatsCard from '../../components/ui/StatsCard';

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);

  const containerRef = useGSAP(() => {
    // Hero Parallax
    if (heroImgRef.current && heroRef.current) {
      gsap.to(heroImgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Hero Text Animations
    const headlineSpans = gsap.utils.toArray('.hero-headline span');
    if (headlineSpans.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from(headlineSpans, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
      })
      .from('.hero-subtext', {
        y: 30,
        opacity: 0,
        duration: 1,
      }, '-=0.6')
      .from('.hero-cta', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4');
    }
  }, []);

  const steps = [
    { title: 'Register as Donor', desc: 'Create your account in seconds and join our community.', icon: Heart },
    { title: 'Choose Items', desc: 'Select from food, clothes, books, medicines, or more.', icon: ShieldCheck },
    { title: 'Schedule Pickup', desc: 'Our volunteers will collect items from your doorstep.', icon: Truck },
    { title: 'Earn Rewards', desc: 'Get credits for every donation and claim exclusive rewards.', icon: BarChart3 },
  ];

  return (
    <PublicLayout>
      <div ref={containerRef}>
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
          <div ref={heroImgRef} className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1920&q=80"
              alt="Hero"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-glass-gradient" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <h1 className="hero-headline text-7xl md:text-9xl font-heading font-bold text-white mb-8 leading-tight">
                <span className="block">Give More.</span>
                <span className="block text-teal">Impact More.</span>
              </h1>
              <p className="hero-subtext text-xl md:text-2xl text-muted mb-12 max-w-2xl leading-relaxed">
                The ultimate multi-donation system for a better tomorrow. Donate food, clothes, books, and medicines with transparency.
              </p>
              <div className="hero-cta flex flex-wrap gap-6">
                <MagneticButton onClick={() => navigate('/register')} className="text-xl px-12 py-5">
                  Start Donating Now
                </MagneticButton>
                <button className="flex items-center gap-4 text-white font-bold hover:text-teal transition-colors group">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-teal transition-all">
                    <Play className="fill-current" />
                  </div>
                  See How It Works
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50">
            <span className="text-xs uppercase tracking-[0.3em] font-mono">Scroll to explore</span>
            <div className="w-[1px] h-12 bg-teal" />
          </div>
        </section>

        {/* Live Stats */}
        <section className="py-24 relative z-20 -mt-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatsCard label="Total Donations" value={12840} icon={Heart} suffix="+" />
              <StatsCard label="Active Volunteers" value={450} icon={Truck} suffix="+" />
              <StatsCard label="Happy Beneficiaries" value={8920} icon={ShieldCheck} suffix="+" />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="about" className="py-32 bg-bg overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">How It Works</h2>
              <div className="w-24 h-1 bg-teal mx-auto" />
            </div>

            <SectionReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <GlassCard key={i} className="flex flex-col gap-6 text-center p-10">
                  <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal mx-auto mb-2">
                    <step.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">{step.title}</h3>
                  <p className="text-muted leading-relaxed">{step.desc}</p>
                  <div className="mt-auto text-4xl font-mono text-white/5 font-bold">0{i + 1}</div>
                </GlassCard>
              ))}
            </SectionReveal>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-32 bg-surface diagonal-section">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-teal/20 blur-3xl rounded-full" />
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&q=80"
                  alt="Impact"
                  className="relative rounded-3xl shadow-2xl z-10"
                />
                <div className="absolute -bottom-10 -right-10 bg-gold p-8 rounded-3xl shadow-glow z-20 hidden md:block">
                  <p className="text-4xl font-mono font-bold text-bg mb-1">100%</p>
                  <p className="text-bg font-bold">Transparency</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight">
                  Real Change, <span className="text-teal">Real Credits.</span>
                </h2>
                <p className="text-xl text-muted mb-10 leading-relaxed">
                  For every donation you make, you earn impact credits. These aren't just numbers—they represent the lives you've touched and the milestones you've achieved.
                </p>
                <ul className="space-y-6 mb-12">
                  {[
                    'Earn badges for consistency',
                    'Receive official certificates of appreciation',
                    'Win exclusive tour trips to our centers',
                    'Track your environmental footprint'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white font-medium">
                      <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal">
                        <ChevronRight size={16} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <MagneticButton onClick={() => navigate('/register')}>
                  Start Impacting
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <GlassCard className="relative overflow-hidden p-16 md:p-24 text-center border-teal/20">
              <div className="absolute inset-0 bg-teal/5" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8">
                  Ready to make a difference?
                </h2>
                <p className="text-xl text-muted mb-12 leading-relaxed">
                  Join our network of 10,000+ heroes and help us create a world where no one goes without the essentials.
                </p>
                <MagneticButton onClick={() => navigate('/register')} className="text-xl px-12 py-5">
                  Join the Movement
                </MagneticButton>
              </div>
            </GlassCard>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Landing;
