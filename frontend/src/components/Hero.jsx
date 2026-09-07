import React from 'react';
import { ShieldCheck, Zap, Layers, Sparkles, ArrowDown } from 'lucide-react';

export default function Hero({ onScrollToScanner, onOpenArchitecture }) {
  return (
    <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        
        {/* Architecture Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-botanic-50 text-botanic-800 dark:bg-botanic-950/70 dark:text-botanic-300 border border-botanic-200/80 dark:border-botanic-800/80 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-botanic-600 dark:text-botanic-400" />
          <span>Two-Stage Architecture: Domain Router → Specialist MobileNetV2</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-earth-950 dark:text-white leading-[1.15]">
          Diagnose Crop & Houseplant Diseases with{' '}
          <span className="bg-gradient-to-r from-botanic-600 via-botanic-500 to-emerald-600 bg-clip-text text-transparent">
            Specialist Machine Learning
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-5 text-base sm:text-lg text-earth-600 dark:text-earth-300 max-w-2xl mx-auto leading-relaxed">
          Instead of forcing a single model to classify everything, PlantDoc AI partitions the feature space into two targeted MobileNetV2 classifiers: one for agricultural field crops and one for indoor houseplants, served via ONNX Runtime.
        </p>

        {/* Primary Call to Action */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onScrollToScanner}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-botanic-600 hover:bg-botanic-700 text-white font-semibold shadow-lg shadow-botanic-600/25 hover:shadow-botanic-600/35 transition-all transform active:scale-95 text-sm sm:text-base"
          >
            <span>Scan a Leaf Now</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
          
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-forest-900/80 hover:bg-earth-50 dark:hover:bg-forest-850 text-earth-800 dark:text-earth-200 font-medium border border-earth-200 dark:border-forest-850 transition-all text-sm sm:text-base"
          >
            <Layers className="w-4 h-4 text-botanic-600 dark:text-botanic-400" />
            <span>View Architecture</span>
          </button>
        </div>

        {/* Key Benchmark Metrics Row */}
        <div className="mt-12 pt-8 border-t border-earth-200/80 dark:border-forest-850/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-bold text-earth-900 dark:text-white">38 Classes</div>
            <div className="text-xs text-earth-500 dark:text-earth-400 mt-0.5">Crop Model (14 Species)</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-bold text-earth-900 dark:text-white">16 Classes</div>
            <div className="text-xs text-earth-500 dark:text-earth-400 mt-0.5">Indoor Model (5 Species)</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-bold text-botanic-600 dark:text-botanic-400">&lt; 25 ms</div>
            <div className="text-xs text-earth-500 dark:text-earth-400 mt-0.5">ONNX Runtime CPU Inference</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-bold text-earth-900 dark:text-white">54 Profiles</div>
            <div className="text-xs text-earth-500 dark:text-earth-400 mt-0.5">Actionable Treatment DB</div>
          </div>
        </div>

      </div>
    </section>
  );
}
