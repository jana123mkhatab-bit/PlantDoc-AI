import React from 'react';
import { Sparkles, Wheat, Flower2 } from 'lucide-react';

export default function DomainSelector({ selectedDomain, onChangeDomain }) {
  const domains = [
    {
      id: 'auto',
      label: 'Intelligent Auto-Route',
      shortLabel: 'Auto-Route',
      icon: Sparkles,
      desc: 'Dual forward-pass entropy & confidence analysis',
      badge: 'Recommended',
    },
    {
      id: 'crop',
      label: 'Farm & Crop Model',
      shortLabel: 'Farm/Crop',
      icon: Wheat,
      desc: 'Tomato, Potato, Corn, Apple, Grape, Peach (38 classes)',
      badge: 'Model A',
    },
    {
      id: 'indoor',
      label: 'Indoor Houseplant Model',
      shortLabel: 'Houseplant',
      icon: Flower2,
      desc: 'Aloe, Snake Plant, Spider Plant, Cactus, Pothos (16 classes)',
      badge: 'Model B',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <label className="block text-xs font-semibold text-earth-500 dark:text-earth-400 uppercase tracking-wider mb-2 text-center sm:text-left">
        Step 1: Select Diagnostic Domain
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 bg-earth-100/80 dark:bg-forest-900/80 rounded-2xl border border-earth-200 dark:border-forest-850">
        {domains.map((dom) => {
          const Icon = dom.icon;
          const isSelected = selectedDomain === dom.id;
          return (
            <button
              key={dom.id}
              type="button"
              onClick={() => onChangeDomain(dom.id)}
              className={`relative flex flex-col items-center sm:items-start text-center sm:text-left p-3 rounded-xl transition-all duration-200 ${
                isSelected
                  ? 'bg-white dark:bg-forest-850 text-earth-950 dark:text-white shadow-sm ring-2 ring-botanic-600 dark:ring-botanic-500 font-medium'
                  : 'text-earth-600 dark:text-earth-400 hover:text-earth-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-forest-850/50'
              }`}
            >
              <div className="flex items-center gap-2 w-full justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-botanic-600 dark:text-botanic-400' : 'text-earth-400'}`} />
                  <span className="text-sm font-semibold">{dom.shortLabel}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? 'bg-botanic-100 text-botanic-800 dark:bg-botanic-900/80 dark:text-botanic-200'
                    : 'bg-earth-200/60 dark:bg-forest-800 text-earth-500 dark:text-earth-400'
                }`}>
                  {dom.badge}
                </span>
              </div>
              <p className="text-[11px] leading-snug line-clamp-2 text-earth-500 dark:text-earth-400">
                {dom.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
