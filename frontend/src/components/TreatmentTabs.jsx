import React, { useState } from 'react';
import { Zap, Sparkles, Shield, Dna, Check, Copy } from 'lucide-react';

export default function TreatmentTabs({ treatment }) {
  const [activeTab, setActiveTab] = useState('immediate');
  const [copied, setCopied] = useState(false);

  if (!treatment) return null;

  const tabs = [
    { id: 'immediate', label: 'Immediate Steps', icon: Zap },
    { id: 'organic', label: 'Organic Remedies', icon: Sparkles },
    { id: 'prevention', label: 'Long-term Prevention', icon: Shield },
    { id: 'clinical', label: 'Pathology Specs', icon: Dna },
  ];

  const handleCopy = () => {
    const text = `PLANTDOC AI DIAGNOSTIC REPORT
Plant: ${treatment.plant_name} (${treatment.scientific_name})
Condition: ${treatment.condition} (Severity: ${treatment.severity})
Pathogen: ${treatment.pathogen}

IMMEDIATE STEPS:
${treatment.immediate_actions?.map((s, i) => `${i + 1}. ${s}`).join('\n')}

ORGANIC REMEDIES:
${treatment.organic_treatments?.map((s, i) => `${i + 1}. ${s}`).join('\n')}

PREVENTION TIPS:
${treatment.prevention_tips?.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-forest-900/70 rounded-2xl border border-earth-200 dark:border-forest-850 overflow-hidden shadow-sm">
      
      {/* Tab Navigation Bar */}
      <div className="flex items-center justify-between border-b border-earth-200 dark:border-forest-850 px-2 sm:px-4 bg-earth-50/70 dark:bg-forest-950/60 overflow-x-auto">
        <div className="flex space-x-1 py-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white dark:bg-forest-850 text-botanic-700 dark:text-botanic-300 shadow-sm'
                    : 'text-earth-600 dark:text-earth-400 hover:text-earth-900 dark:hover:text-white hover:bg-earth-100 dark:hover:bg-forest-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-botanic-600 dark:text-botanic-400' : 'text-earth-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Copy Report Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-earth-600 dark:text-earth-400 hover:bg-earth-200/60 dark:hover:bg-forest-850 transition-colors shrink-0"
          title="Copy diagnosis and treatment checklist"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-botanic-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="p-5 sm:p-6 min-h-[220px]">
        
        {/* Immediate Tab */}
        {activeTab === 'immediate' && (
          <div className="animate-fade-in space-y-3">
            <h5 className="text-xs font-bold text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Urgent Quarantine & Remedial Checklist
            </h5>
            <ul className="space-y-2.5">
              {treatment.immediate_actions?.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-earth-800 dark:text-earth-200">
                  <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Organic Tab */}
        {activeTab === 'organic' && (
          <div className="animate-fade-in space-y-3">
            <h5 className="text-xs font-bold text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Bio-Fungicides & Non-Toxic Home Interventions
            </h5>
            <ul className="space-y-2.5">
              {treatment.organic_treatments?.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-earth-800 dark:text-earth-200">
                  <span className="w-5 h-5 rounded-full bg-botanic-100 dark:bg-botanic-950/60 text-botanic-700 dark:text-botanic-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    🌿
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prevention Tab */}
        {activeTab === 'prevention' && (
          <div className="animate-fade-in space-y-3">
            <h5 className="text-xs font-bold text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Cultural Practices & Long-Term Immunity
            </h5>
            <ul className="space-y-2.5">
              {treatment.prevention_tips?.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-earth-800 dark:text-earth-200">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    🛡️
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Clinical Specs Tab */}
        {activeTab === 'clinical' && (
          <div className="animate-fade-in space-y-3">
            <h5 className="text-xs font-bold text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Pathology & Taxonomic Profile
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-earth-50 dark:bg-forest-850">
                <span className="text-earth-400 dark:text-earth-500 block">Scientific Binomial</span>
                <span className="font-semibold italic text-earth-900 dark:text-white mt-0.5 block">
                  {treatment.scientific_name}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-earth-50 dark:bg-forest-850">
                <span className="text-earth-400 dark:text-earth-500 block">Pathogen / Etiology</span>
                <span className="font-semibold text-earth-900 dark:text-white mt-0.5 block">
                  {treatment.pathogen}
                </span>
              </div>
              <div className="sm:col-span-2 p-3 rounded-xl bg-earth-50 dark:bg-forest-850">
                <span className="text-earth-400 dark:text-earth-500 block mb-1">Etiological Overview</span>
                <p className="text-earth-700 dark:text-earth-300 leading-relaxed">
                  {treatment.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
