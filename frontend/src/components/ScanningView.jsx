import React, { useState, useEffect } from 'react';
import { Cpu, Search, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ScanningView({ previewUrl, selectedDomain }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Standardizing leaf tensor (224×224 RGB, [-1, 1] scaling)...',
    selectedDomain === 'auto'
      ? 'Analyzing domain features & calculating distribution entropy...'
      : `Dispatching to specialized ${selectedDomain === 'crop' ? 'Crop Model A' : 'Indoor Model B'}...`,
    'Executing ONNX Runtime forward pass...',
    'Synthesizing clinical treatment & organic remedies...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-6 animate-fade-in text-center">
      
      {/* High-Tech Scanner Container */}
      <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-botanic-500/50 bg-forest-950">
        
        {/* Leaf Image under scan */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Scanning Leaf"
            className="w-full h-full object-cover filter contrast-105 opacity-80"
          />
        )}

        {/* Reticle / Targeting HUD Corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-botanic-400"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-botanic-400"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-botanic-400"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-botanic-400"></div>

        {/* Moving Laser Scan Line */}
        <div className="scan-laser animate-scan-line"></div>

        {/* Center Grid Mesh Overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#6ea678 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        ></div>

        {/* Top Status Bar in Scanner */}
        <div className="absolute top-3 inset-x-0 flex justify-center">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-bold bg-black/60 backdrop-blur-md text-botanic-300 border border-botanic-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-botanic-400 animate-ping"></span>
            NEURAL PATHOLOGY SCAN ACTIVE
          </span>
        </div>

      </div>

      {/* Dynamic Progress Steps Log */}
      <div className="mt-6 max-w-md mx-auto space-y-2 text-left">
        {steps.map((text, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                isCurrent
                  ? 'bg-botanic-50 dark:bg-forest-900 text-botanic-800 dark:text-botanic-200 border border-botanic-200 dark:border-botanic-800/80 shadow-sm'
                  : isDone
                  ? 'text-earth-500 dark:text-earth-400 opacity-60'
                  : 'text-earth-300 dark:text-forest-800 opacity-40'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-botanic-600 shrink-0" />
              ) : isCurrent ? (
                <div className="w-3.5 h-3.5 border-2 border-botanic-600 border-t-transparent rounded-full animate-spin shrink-0"></div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-earth-300 dark:border-forest-800 shrink-0"></div>
              )}
              <span className="truncate">{text}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
