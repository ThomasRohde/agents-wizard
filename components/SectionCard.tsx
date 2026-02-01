import React from 'react';
import { Section } from '../types';
import { CheckCircle2, Circle, TrendingUp, Link2, AlertTriangle, Tag } from 'lucide-react';

interface SectionCardProps {
  section: Section;
  isSelected: boolean;
  onToggle: (id: string) => void;
  searchScore?: number;
  selectedIds?: Set<string>;
  allSections?: Section[];
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  section, 
  isSelected, 
  onToggle, 
  searchScore,
  selectedIds,
  allSections = []
}) => {
  // Check if this section has unmet requirements
  const unmetRequirements = section.requires?.filter(
    reqId => selectedIds && !selectedIds.has(reqId)
  ) || [];
  
  // Check if this section conflicts with any selected sections
  const activeConflicts = section.conflictsWith?.filter(
    conflictId => selectedIds && selectedIds.has(conflictId)
  ) || [];

  // Get titles for requirements and conflicts
  const getTitle = (id: string) => allSections.find(s => s.id === id)?.title || id;

  return (
    <div 
      onClick={() => onToggle(section.id)}
      className={`
        group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none
        ${isSelected 
          ? 'bg-indigo-900/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
          : activeConflicts.length > 0
            ? 'bg-slate-800/50 border-amber-500/30 hover:border-amber-500/50'
            : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold ${isSelected ? 'text-indigo-300' : 'text-slate-200'}`}>
              {section.title}
            </h3>
            {searchScore !== undefined && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-medium rounded">
                <TrendingUp className="w-3 h-3" />
                {searchScore.toFixed(1)}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed mt-1">
            {section.description}
          </p>
          
          {/* Tags */}
          {section.tags && section.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {section.tags.slice(0, 4).map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-700/50 text-slate-400 text-[10px] rounded"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
              {section.tags.length > 4 && (
                <span className="px-1.5 py-0.5 text-slate-500 text-[10px]">
                  +{section.tags.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Requirements indicator */}
          {section.requires && section.requires.length > 0 && !isSelected && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px]">
              <Link2 className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400">
                Requires: {section.requires.map(getTitle).join(', ')}
              </span>
            </div>
          )}

          {/* Conflict warning */}
          {activeConflicts.length > 0 && !isSelected && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px]">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span className="text-amber-400">
                Conflicts with: {activeConflicts.map(getTitle).join(', ')}
              </span>
            </div>
          )}
        </div>
        <div className={`mt-1 shrink-0 transition-colors ${isSelected ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-500'}`}>
          {isSelected ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
