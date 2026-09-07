import React from 'react';
import { Leaf, Moon, Sun, History, Cpu, Layers, ExternalLink, Activity } from 'lucide-react';

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  onOpenHistory, 
  historyCount, 
  onOpenStats, 
  onOpenArchitecture,
  systemStatus 
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-earth-200 dark:border-forest-850/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-botanic-600 to-botanic-800 flex items-center justify-center shadow-md shadow-botanic-900/20 text-white">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-earth-900 dark:text-white">
                PlantDoc <span className="text-botanic-600 dark:text-botanic-400 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-botanic-100 text-botanic-800 dark:bg-botanic-900/60 dark:text-botanic-300 border border-botanic-200 dark:border-botanic-800">
                v1.0 • ONNX
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-earth-500 dark:text-earth-400 -mt-0.5">
              Dual-Specialist Leaf Pathology Engine
            </p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Health Status indicator */}
          <div 
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-earth-100 dark:bg-forest-900 text-earth-700 dark:text-earth-300 border border-earth-200 dark:border-forest-850"
            title={systemStatus?.status === 'healthy' ? 'FastAPI Backend & Models Online' : 'Connecting to API'}
          >
            <span className={`w-2 h-2 rounded-full ${systemStatus?.status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span>{systemStatus?.status === 'healthy' ? 'Models Active' : 'Connecting'}</span>
          </div>

          {/* Architecture / How It Works Button */}
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-forest-900 transition-colors"
            title="How the Two-Stage Architecture works"
          >
            <Layers className="w-3.5 h-3.5 text-botanic-600 dark:text-botanic-400" />
            <span className="hidden sm:inline">How It Works</span>
          </button>

          {/* Models Deep-Dive Button */}
          <button
            onClick={onOpenStats}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-forest-900 transition-colors"
            title="Model architectures, metrics, and design decisions"
          >
            <Cpu className="w-3.5 h-3.5 text-botanic-600 dark:text-botanic-400" />
            <span className="hidden sm:inline">About Models</span>
          </button>

          {/* Scan History Button */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-forest-900 transition-colors"
            title="View scan history from this session"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-botanic-600 text-white">
                {historyCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-earth-600 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-forest-900 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* GitHub Portfolio Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-earth-900 text-white dark:bg-white dark:text-earth-900 hover:opacity-90 transition-opacity"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>

        </div>

      </div>
    </header>
  );
}
