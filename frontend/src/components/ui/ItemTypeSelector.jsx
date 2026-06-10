import React from 'react';
import { Soup, Shirt, Book, Pill, Package } from 'lucide-react';
import GlassCard from './GlassCard';

const itemTypes = [
  { id: 'food', label: 'Food', icon: Soup, color: 'text-orange-400' },
  { id: 'clothes', label: 'Clothes', icon: Shirt, color: 'text-blue-400' },
  { id: 'books', label: 'Books', icon: Book, color: 'text-purple-400' },
  { id: 'medicines', label: 'Medicines', icon: Pill, color: 'text-red-400' },
  { id: 'other', label: 'Other', icon: Package, color: 'text-teal' },
];

const ItemTypeSelector = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {itemTypes.map((type) => {
        const Icon = type.icon;
        const isActive = selected === type.id;
        return (
          <GlassCard
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`cursor-pointer text-center flex flex-col items-center justify-center gap-3 transition-all ${
              isActive ? 'border-teal bg-teal/10 scale-105 shadow-glow' : 'hover:border-white/20'
            }`}
          >
            <div className={`p-3 rounded-full bg-white/5 ${type.color}`}>
              <Icon size={28} />
            </div>
            <span className={`font-medium ${isActive ? 'text-teal' : 'text-muted'}`}>{type.label}</span>
          </GlassCard>
        );
      })}
    </div>
  );
};

export default ItemTypeSelector;
