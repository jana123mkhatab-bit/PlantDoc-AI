import React from 'react';
import { Leaf, Code2, Layers, Cpu } from 'lucide-react';

export default function Footer() {
  const techBadges = [
    { name: 'FastAPI', desc: 'Asynchronous Python Web Framework', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' },
    { name: 'ONNX Runtime', desc: 'Hardware-Accelerated ML Inference', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800' },
    { name: 'MobileNetV2', desc: 'Depthwise Separable CNN Backbone', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800' },
    { name: 'React 18 + Vite', desc: 'Sub-Second HMR Frontend', color: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800' },
    { name: 'Tailwind CSS', desc: 'Curated Botanical Design System', color: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-800' },
  ];

  return (
    <footer className="w-full border-t border-earth-200 dark:border-forest-850/80 bg-white/50 dark:bg-forest-950/40 transition-colors pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tech Stack Row for Recruiters */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold text-earth-500 dark:text-earth-400 uppercase tracking-wider mb-3">
            Core Engineering & Machine Learning Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {techBadges.map((badge, i) => (
              <span
                key={i}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}
                title={badge.desc}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-earth-100 dark:border-forest-900 text-xs text-earth-500 dark:text-earth-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-botanic-600 text-white flex items-center justify-center">
              <Leaf className="w-3 h-3" />
            </div>
            <span className="font-semibold text-earth-800 dark:text-earth-200">PlantDoc AI</span>
            <span>• Portfolio Centerpiece Project</span>
          </div>

          <p className="text-center sm:text-right">
            Trained on ~108,000 leaf images across 54 conditions • MobileNetV2 Architecture
          </p>
        </div>

      </div>
    </footer>
  );
}
