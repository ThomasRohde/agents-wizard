import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SectionCard from './components/SectionCard';
import Preview from './components/Preview';
import { GROUPS, SECTIONS } from './constants';
import { Category } from './types';
import { Sparkles, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('core-principles');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(SECTIONS.filter(s => s.recommended).map(s => s.id))
  );

  const toggleSection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const generatedContent = useMemo(() => {
    const header = `# AGENTS.md
> **Context**: This file contains instructions for AI agents (LLMs) working on this codebase.
> **Usage**: Include this file in your prompt context or place it in the root of your repository.

`;

    const body = GROUPS.map(group => {
      const groupSections = SECTIONS.filter(s => s.category === group.value && selectedIds.has(s.id));
      if (groupSections.length === 0) return '';
      
      return groupSections.map(s => s.content).join('\n\n');
    }).filter(Boolean).join('\n\n---\n\n');

    const footer = `
---
*Generated with [Agents Wizard](https://thomasrohde.github.io/agents-wizard)*
`;

    return header + body + footer;
  }, [selectedIds]);

  return (
    <div className="h-screen flex flex-col font-sans bg-slate-950 text-slate-50 selection:bg-indigo-500/30 overflow-hidden">
      <Header />

      <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 lg:p-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          
          {/* Builder Section (Nav + List) */}
          <div className="flex-1 flex flex-col md:flex-row gap-4 lg:gap-6 min-h-0">
            
            {/* Sidebar Navigation */}
            <div className="md:w-64 flex flex-col gap-4 shrink-0">
               <nav className="bg-slate-900 rounded-xl border border-slate-800 p-2 shadow-sm flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible no-scrollbar">
                {GROUPS.map(group => (
                  <button
                    key={group.value}
                    onClick={() => setActiveCategory(group.value)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all w-full text-left group
                      ${activeCategory === group.value 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'}
                    `}
                  >
                    <span className={`shrink-0 ${activeCategory === group.value ? 'text-indigo-100' : 'text-slate-500 group-hover:text-slate-400'}`}>
                      {group.icon}
                    </span>
                    <span className="whitespace-nowrap flex-1">{group.label}</span>
                    {activeCategory === group.value && (
                      <ChevronRight className="w-4 h-4 text-indigo-200 hidden md:block" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="hidden md:block mt-auto">
                 <div className="bg-slate-900/50 rounded-xl p-4 border border-indigo-500/10">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-1.5 bg-indigo-500/20 rounded-md">
                          <Sparkles className="w-4 h-4 text-indigo-400" />
                       </div>
                       <span className="text-sm font-semibold text-slate-200">Pro Tip</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                       These classics are curated to provide the best context for LLMs to generate high-quality code.
                    </p>
                 </div>
              </div>
            </div>

            {/* Selection Area */}
            <div className="flex-1 bg-slate-900/30 rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
              <div className="p-5 border-b border-slate-800 bg-slate-900/40 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg text-slate-200">
                    {GROUPS.find(g => g.value === activeCategory)?.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {GROUPS.find(g => g.value === activeCategory)?.label}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {GROUPS.find(g => g.value === activeCategory)?.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {SECTIONS.filter(s => s.category === activeCategory).map(section => (
                  <SectionCard 
                    key={section.id} 
                    section={section} 
                    isSelected={selectedIds.has(section.id)}
                    onToggle={toggleSection}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:w-5/12 xl:w-[45%] h-[400px] lg:h-full shrink-0">
             <Preview content={generatedContent} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;