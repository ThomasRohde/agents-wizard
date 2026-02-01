import React, { useState } from 'react';
import { Copy, Download, Check, RefreshCw } from 'lucide-react';
import Button from './Button';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AGENTS.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          <span className="ml-3 text-xs font-mono text-slate-400">AGENTS.md</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            icon={copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleDownload}
            icon={<Download className="w-3 h-3" />}
          >
            Download
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-[#0d1117] relative group">
        <pre className="p-6 text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-indigo-500/30">
          {content || <span className="text-slate-600 italic">// Select modules from the left to build your file...</span>}
        </pre>
      </div>
    </div>
  );
};

export default Preview;
