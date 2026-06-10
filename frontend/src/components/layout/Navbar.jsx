import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, LogOut, Heart, User } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import MagneticButton from '../ui/MagneticButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = {
    public: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/#about' },
      { name: 'Impact', path: '/#impact' },
    ],
    donor: [
      { name: 'Dashboard', path: '/donor/dashboard' },
      { name: 'My Donations', path: '/donor/my-donations' },
      { name: 'Rewards', path: '/donor/rewards' },
    ],
    organization: [
      { name: 'Dashboard', path: '/org/dashboard' },
      { name: 'Donations', path: '/org/donations' },
      { name: 'Profile', path: '/org/profile' },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard' },
      { name: 'Donations', path: '/admin/donations' },
    ],
    volunteer: [
      { name: 'Dashboard', path: '/volunteer/dashboard' },
    ],
  };

  const links = isAuthenticated ? navLinks[role] || [] : navLinks.public;

  const navRef = useGSAP(() => {
    const targets = gsap.utils.toArray('.nav-link');
    if (targets.length > 0) {
      gsap.from(targets, {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [links]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4 bg-bg/80 backdrop-blur-xl border-b border-white/10' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:bg-teal transition-colors">
            <Heart className="text-white fill-current" size={24} />
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight text-white">MUTI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link text-sm font-medium transition-colors hover:text-teal ${
                location.pathname === link.path ? 'text-teal' : 'text-muted'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-6 border-l border-white/10 pl-6">
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted uppercase tracking-widest">{role}</span>
                <span className="text-sm font-bold text-white">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted hover:text-danger"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium hover:text-teal transition-colors">Login</Link>
              <MagneticButton onClick={() => navigate('/register')} className="scale-90">Join Us</MagneticButton>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-[88px] bg-bg/95 backdrop-blur-2xl z-50 lg:hidden transition-all duration-500 ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-8 p-12">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-heading hover:text-teal transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xl text-danger font-medium mt-4"
            >
              <LogOut size={24} /> Logout
            </button>
          ) : (
            <div className="flex flex-col items-center gap-6 mt-4">
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-xl">Login</Link>
              <MagneticButton onClick={() => { setIsOpen(false); navigate('/register'); }}>Register</MagneticButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
