import React from 'react';
import { Bot, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Agents Wizard</h1>
            <p className="text-xs text-slate-400">Assemble your AGENTS.md for AI Coding</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
           <a 
            href="https://github.com/thomasrohde/agents-wizard" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;