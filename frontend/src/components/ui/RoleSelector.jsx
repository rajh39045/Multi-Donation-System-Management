import React from 'react';
import { Heart, Landmark, Truck, Users, CheckCircle2 } from 'lucide-react';
import GlassCard from './GlassCard';

const roles = [
  { 
    id: 'donor', 
    label: 'Donor', 
    icon: Heart, 
    desc: 'Give donated items to those in need.',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10'
  },
  { 
    id: 'organization', 
    label: 'Organization', 
    icon: Landmark, 
    desc: 'Verified NGOs managing large-scale aid.',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10'
  },
  { 
    id: 'volunteer', 
    label: 'Volunteer', 
    icon: Truck, 
    desc: 'The boots on the ground for pickups.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10'
  },
];

const RoleSelector = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = selected === role.id;
        return (
          <GlassCard
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={`cursor-pointer transition-all duration-500 relative group overflow-hidden ${
              isActive ? 'border-teal bg-teal/5 shadow-glow scale-[1.02]' : 'hover:border-white/20'
            }`}
          >
            {isActive && (
              <div className="absolute top-2 right-2 text-teal">
                <CheckCircle2 size={18} />
              </div>
            )}
            
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl transition-all duration-500 ${isActive ? 'bg-teal text-bg' : `${role.bg} ${role.color}`}`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <h4 className={`font-bold transition-colors ${isActive ? 'text-teal' : 'text-white'}`}>{role.label}</h4>
                <p className="text-xs text-muted leading-relaxed mt-1">{role.desc}</p>
              </div>
            </div>
            
            {/* Glow effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-teal/0 to-teal/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
          </GlassCard>
        );
      })}
    </div>
  );
};

export default RoleSelector;
