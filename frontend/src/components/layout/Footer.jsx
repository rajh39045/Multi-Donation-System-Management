import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-[250px] -mt-[250px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:bg-teal transition-colors">
                <Heart className="text-white fill-current" size={24} />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight text-white">MUTI</span>
            </Link>
            <p className="text-muted leading-relaxed">
              Bridging the gap between abundance and need through technology, compassion, and transparency.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-muted hover:text-teal hover:bg-white/10 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'About Us', 'Organizations', 'Join as Volunteer'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-muted hover:text-teal transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Donation Types</h4>
            <ul className="flex flex-col gap-4">
              {['Food & Groceries', 'Clothes & Essentials', 'Educational Books', 'Medical Supplies'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-muted hover:text-teal transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-muted">
                <MapPin size={18} className="text-teal" />
                <span>123 Kindness Way, Delhi, India</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone size={18} className="text-teal" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Mail size={18} className="text-teal" />
                <span>contact@muti.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted text-sm">© 2026 MUTI Donation System. All rights reserved.</p>
          <p className="text-muted text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-danger fill-current" /> for a better world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
