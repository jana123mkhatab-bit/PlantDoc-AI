import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowLeft, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  BookmarkPlus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ConfidenceChart from './ConfidenceChart';
import TreatmentTabs from './TreatmentTabs';

export default function ResultsView({
  result,
  previewUrl,
  onReset,
  onSaveToHistory,
  isSaved,
}) {
  if (!result) return null;

  const {
    predicted_class,
    plant_name,
    condition,
    domain,
    confidence,
    confidence_badge,
    top_predictions,
    distribution,
    treatment,
    routing,
    inference_time_ms,
    warning,
  } = result;

  const isHealthy = condition.toLowerCase().includes('healthy');

  // Trigger celebration confetti if a healthy plant is diagnosed!
  useEffect(() => {
    if (isHealthy && confidence > 0.7) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4c8a57', '#6ea678', '#a4c2a4'],
      });
    }
  }, [isHealthy, confidence]);

  // Color-coded confidence badge styling
  const badgeConfig = {
    high: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800',
      dot: 'bg-emerald-500',
      label: 'High Confidence',
    },
    moderate: {
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800',
      dot: 'bg-amber-500',
      label: 'Moderate Confidence',
    },
    low: {
      bg: 'bg-rose-50 dark:bg-rose-950/60',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-200 dark:border-rose-800',
      dot: 'bg-rose-500',
      label: 'Low / Uncertain',
    },
  }[confidence_badge] || {
    bg: 'bg-earth-100',
    text: 'text-earth-700',
    border: 'border-earth-200',
    dot: 'bg-earth-500',
    label: 'Evaluated',
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-slide-up pb-12">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-forest-900 border border-earth-200 dark:border-forest-850 text-xs font-semibold text-earth-700 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-forest-850 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Scan Another Leaf</span>
        </button>

        <button
          type="button"
          onClick={onSaveToHistory}
          disabled={isSaved}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            isSaved
              ? 'bg-botanic-100 dark:bg-botanic-900/60 text-botanic-800 dark:text-botanic-200 border border-botanic-200 dark:border-botanic-800'
              : 'bg-white dark:bg-forest-900 text-earth-700 dark:text-earth-300 border border-earth-200 dark:border-forest-850 hover:bg-earth-50 dark:hover:bg-forest-850 shadow-sm'
          }`}
        >
          <BookmarkPlus className="w-4 h-4" />
          <span>{isSaved ? 'Saved to Session' : 'Save Result'}</span>
        </button>
      </div>

      {/* Main Diagnosis Banner Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-sm border border-earth-200 dark:border-forest-850/80 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Plant Photo Thumbnail & Title */}
          <div className="flex items-center gap-4 sm:gap-5">
            {previewUrl && (
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md border border-earth-200 dark:border-forest-800 shrink-0 bg-black/10">
                <img
                  src={previewUrl}
                  alt={plant_name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold tracking-wider uppercase text-botanic-600 dark:text-botanic-400">
                  {plant_name} Diagnosis
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeConfig.bg} ${badgeConfig.text} ${badgeConfig.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${badgeConfig.dot}`}></span>
                  <span>{(confidence * 100).toFixed(1)}% — {badgeConfig.label}</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-earth-950 dark:text-white">
                {condition}
              </h2>
              <p className="text-xs text-earth-500 dark:text-earth-400 mt-1">
                Taxonomy: <span className="italic">{treatment?.scientific_name}</span> • Severity: <span className="font-semibold text-earth-700 dark:text-earth-300">{treatment?.severity}</span>
              </p>
            </div>
          </div>

          {/* Model Routing & Benchmark Stats Pill */}
          <div className="flex flex-col sm:items-end gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-earth-200 dark:border-forest-850">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-earth-100 dark:bg-forest-850 text-earth-800 dark:text-earth-200 border border-earth-200 dark:border-forest-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-botanic-600 dark:text-botanic-400" />
                <span>
                  {domain === 'crop' ? '🌾 Crop Specialist (Model A)' : '🪴 Indoor Specialist (Model B)'}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-earth-500 dark:text-earth-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-botanic-500" />
                {inference_time_ms} ms CPU
              </span>
              <span>•</span>
              <span>Route: {routing?.mode}</span>
            </div>
          </div>

        </div>

        {/* Auto-Routing Decision Explanation Pill */}
        {routing?.mode === 'auto' && (
          <div className="mt-5 pt-4 border-t border-earth-200/80 dark:border-forest-850/80 flex items-start gap-2.5 text-xs text-earth-600 dark:text-earth-300">
            <Sparkles className="w-4 h-4 text-botanic-600 dark:text-botanic-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-earth-900 dark:text-white">Intelligent Domain Routing: </span>
              <span>{routing.reason}</span>
            </div>
          </div>
        )}

        {/* Advisory Warning Banner if any */}
        {warning && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2 text-xs text-amber-800 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <span>{warning}</span>
          </div>
        )}

      </div>

      {/* Grid: Left Column = Confidence Distribution | Right Column = Treatment Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <ConfidenceChart
            distribution={distribution}
            topPredictions={top_predictions}
            primaryConfidence={confidence}
          />
        </div>
        <div className="lg:col-span-7">
          <TreatmentTabs treatment={treatment} />
        </div>
      </div>

    </div>
  );
}
