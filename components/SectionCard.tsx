import React from 'react';
import { Section } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface SectionCardProps {
  section: Section;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(section.id)}
      className={`
        group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none
        ${isSelected 
          ? 'bg-indigo-900/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${isSelected ? 'text-indigo-300' : 'text-slate-200'}`}>
            {section.title}
          </h3>
          <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed">
            {section.description}
          </p>
        </div>
        <div className={`mt-1 shrink-0 transition-colors ${isSelected ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-500'}`}>
          {isSelected ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
