import React, { useState, useMemo, useEffect, useCallback } from 'react';
import MiniSearch from 'minisearch';
import Header from './components/Header';
import SectionCard from './components/SectionCard';
import SearchInput from './components/SearchInput';
import Preview from './components/Preview';
import { GROUPS, SECTIONS, STACKS } from './constants';
import { Category, SearchResult, Stack, Section } from './types';
import { Sparkles, ChevronRight, SearchX, AlertTriangle, X, Filter } from 'lucide-react';

// Conflict warning state
interface ConflictWarning {
  sectionId: string;
  sectionTitle: string;
  conflictingIds: string[];
  conflictingTitles: string[];
}

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('core-principles');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<Set<Stack>>(new Set(['universal']));
  const [conflictWarning, setConflictWarning] = useState<ConflictWarning | null>(null);
  const [showStackFilter, setShowStackFilter] = useState(false);

  // Initialize MiniSearch index with BM25 scoring - now includes tags
  const searchIndex = useMemo(() => {
    const index = new MiniSearch({
      fields: ['title', 'description', 'content', 'tags'],
      storeFields: ['id'],
      searchOptions: {
        boost: { title: 3, description: 2, tags: 2, content: 1 },
        fuzzy: 0.2,
        prefix: true,
      },
      // Convert tags array to searchable string
      extractField: (document, fieldName) => {
        if (fieldName === 'tags') {
          return (document as Section).tags?.join(' ') || '';
        }
        return (document as Record<string, string>)[fieldName];
      },
    });
    index.addAll(SECTIONS);
    return index;
  }, []);

  // Search handler
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = searchIndex.search(query);
    const mappedResults: SearchResult[] = results.map(result => ({
      section: SECTIONS.find(s => s.id === result.id)!,
      score: result.score,
    })).filter(r => r.section);
    setSearchResults(mappedResults);
  }, [searchIndex]);

  // Get all required sections recursively
  const getRequiredSections = useCallback((sectionId: string, visited = new Set<string>()): string[] => {
    if (visited.has(sectionId)) return [];
    visited.add(sectionId);
    
    const section = SECTIONS.find(s => s.id === sectionId);
    if (!section?.requires) return [];
    
    const required: string[] = [];
    for (const reqId of section.requires) {
      required.push(reqId);
      required.push(...getRequiredSections(reqId, visited));
    }
    return required;
  }, []);

  // Check for conflicts with currently selected sections
  const getConflicts = useCallback((sectionId: string): string[] => {
    const section = SECTIONS.find(s => s.id === sectionId);
    if (!section?.conflictsWith) return [];
    
    return section.conflictsWith.filter(conflictId => selectedIds.has(conflictId));
  }, [selectedIds]);

  const toggleSection = useCallback((id: string) => {
    const section = SECTIONS.find(s => s.id === id);
    if (!section) return;

    const newSelected = new Set(selectedIds);
    
    if (newSelected.has(id)) {
      // Deselecting - just remove it
      newSelected.delete(id);
      setSelectedIds(newSelected);
    } else {
      // Selecting - check for conflicts first
      const conflicts = getConflicts(id);
      
      if (conflicts.length > 0) {
        // Show warning instead of blocking
        const conflictingSections = conflicts.map(cId => SECTIONS.find(s => s.id === cId)!);
        setConflictWarning({
          sectionId: id,
          sectionTitle: section.title,
          conflictingIds: conflicts,
          conflictingTitles: conflictingSections.map(s => s.title),
        });
        return;
      }
      
      // No conflicts - add the section and its dependencies
      newSelected.add(id);
      
      // Auto-select required sections
      const required = getRequiredSections(id);
      for (const reqId of required) {
        newSelected.add(reqId);
      }
      
      setSelectedIds(newSelected);
    }
  }, [selectedIds, getConflicts, getRequiredSections]);

  // Handle conflict warning confirmation
  const confirmConflictSelection = useCallback(() => {
    if (!conflictWarning) return;
    
    const newSelected = new Set(selectedIds);
    
    // Remove conflicting sections
    for (const conflictId of conflictWarning.conflictingIds) {
      newSelected.delete(conflictId);
    }
    
    // Add the new section
    newSelected.add(conflictWarning.sectionId);
    
    // Auto-select its dependencies
    const required = getRequiredSections(conflictWarning.sectionId);
    for (const reqId of required) {
      newSelected.add(reqId);
    }
    
    setSelectedIds(newSelected);
    setConflictWarning(null);
  }, [conflictWarning, selectedIds, getRequiredSections]);

  // Toggle stack filter
  const toggleStack = useCallback((stack: Stack) => {
    const newStacks = new Set(selectedStacks);
    if (newStacks.has(stack)) {
      // Don't allow deselecting all stacks
      if (newStacks.size > 1) {
        newStacks.delete(stack);
      }
    } else {
      newStacks.add(stack);
    }
    setSelectedStacks(newStacks);
  }, [selectedStacks]);

  // Filter sections by selected stacks
  const filteredSections = useMemo(() => {
    return SECTIONS.filter(section => {
      // If section has no appliesTo, show it always
      if (!section.appliesTo || section.appliesTo.length === 0) return true;
      // If section applies to 'universal', always show
      if (section.appliesTo.includes('universal')) return true;
      // Check if any of the section's stacks match selected stacks
      return section.appliesTo.some(stack => selectedStacks.has(stack));
    });
  }, [selectedStacks]);

  // Get sections that require a given section (reverse dependency)
  const getSectionsDependingOn = useCallback((sectionId: string): Section[] => {
    return SECTIONS.filter(s => s.requires?.includes(sectionId));
  }, []);

  // Get sections that conflict with a given section
  const getConflictingSections = useCallback((sectionId: string): Section[] => {
    return SECTIONS.filter(s => s.conflictsWith?.includes(sectionId) || 
      SECTIONS.find(sec => sec.id === sectionId)?.conflictsWith?.includes(s.id));
  }, []);

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

      {/* Conflict Warning Modal */}
      {conflictWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Conflicting Sections</h3>
                <p className="text-sm text-slate-400 mt-1">
                  <span className="text-indigo-400 font-medium">{conflictWarning.sectionTitle}</span> conflicts with:
                </p>
                <ul className="mt-2 space-y-1">
                  {conflictWarning.conflictingTitles.map((title, i) => (
                    <li key={i} className="text-sm text-amber-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-5">
              Selecting this will automatically deselect the conflicting section{conflictWarning.conflictingIds.length > 1 ? 's' : ''}.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConflictWarning(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmConflictSelection}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              >
                Replace Selection
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 lg:p-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          
          {/* Builder Section (Nav + List) */}
          <div className="flex-1 flex flex-col md:flex-row gap-4 lg:gap-6 min-h-0">
            
            {/* Sidebar Navigation */}
            <div className="md:w-64 flex flex-col gap-4 shrink-0">
              {/* Search Input */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-3 shadow-sm">
                <SearchInput
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search all sections..."
                  debounceMs={200}
                />
              </div>

              {/* Stack Filter Toggle */}
              <button
                onClick={() => setShowStackFilter(!showStackFilter)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                  showStackFilter 
                    ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Stack Filter
                </span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">
                  {selectedStacks.size} selected
                </span>
              </button>

              {/* Stack Filter Panel */}
              {showStackFilter && (
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-3 shadow-sm">
                  <div className="flex flex-wrap gap-1.5">
                    {STACKS.map(stack => (
                      <button
                        key={stack.value}
                        onClick={() => toggleStack(stack.value)}
                        className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                          selectedStacks.has(stack.value)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                        }`}
                      >
                        {stack.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">
                    Filter sections by your tech stack
                  </p>
                </div>
              )}

               <nav className={`bg-slate-900 rounded-xl border border-slate-800 p-2 shadow-sm flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible no-scrollbar ${searchQuery ? 'opacity-50 pointer-events-none' : ''}`}>
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
                    {searchQuery 
                      ? <SearchX className="w-5 h-5" />
                      : GROUPS.find(g => g.value === activeCategory)?.icon
                    }
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {searchQuery 
                        ? `Search Results` 
                        : GROUPS.find(g => g.value === activeCategory)?.label
                      }
                    </h2>
                    <p className="text-xs text-slate-400">
                      {searchQuery 
                        ? `${searchResults.length} section${searchResults.length !== 1 ? 's' : ''} found for "${searchQuery}"`
                        : GROUPS.find(g => g.value === activeCategory)?.description
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {searchQuery ? (
                  searchResults.length > 0 ? (
                    searchResults.map(({ section, score }) => (
                      <SectionCard 
                        key={section.id} 
                        section={section} 
                        isSelected={selectedIds.has(section.id)}
                        onToggle={toggleSection}
                        searchScore={score}
                        selectedIds={selectedIds}
                        allSections={SECTIONS}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                      <SearchX className="w-12 h-12 mb-3 text-slate-600" />
                      <p className="text-sm">No sections found</p>
                      <p className="text-xs mt-1">Try a different search term</p>
                    </div>
                  )
                ) : (
                  filteredSections.filter(s => s.category === activeCategory).map(section => (
                    <SectionCard 
                      key={section.id} 
                      section={section} 
                      isSelected={selectedIds.has(section.id)}
                      onToggle={toggleSection}
                      selectedIds={selectedIds}
                      allSections={SECTIONS}
                    />
                  ))
                )}
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