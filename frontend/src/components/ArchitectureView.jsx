import React from 'react';
import { X, Layers, ArrowRight, Wheat, Flower2, Database, Cpu, CheckCircle2, Shield } from 'lucide-react';

export default function ArchitectureView({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-forest-900 border border-earth-200 dark:border-forest-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-earth-200 dark:border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-botanic-100 dark:bg-botanic-900/60 text-botanic-700 dark:text-botanic-300 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-earth-950 dark:text-white">
                How It Works: Two-Stage Architecture
              </h3>
              <p className="text-xs text-earth-500 dark:text-earth-400">
                Partitioned Specialist Inference Pipeline vs Monolithic Classification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-earth-500 hover:text-earth-900 dark:text-earth-400 dark:hover:text-white hover:bg-earth-100 dark:hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Pipeline Flowchart */}
        <div className="my-6 p-6 rounded-2xl bg-earth-50 dark:bg-forest-950/70 border border-earth-200 dark:border-forest-850">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            
            {/* Step 1: Upload */}
            <div className="flex-1 text-center p-3 rounded-xl bg-white dark:bg-forest-900 border border-earth-200 dark:border-forest-800 shadow-sm w-full">
              <div className="w-8 h-8 rounded-lg bg-botanic-100 dark:bg-botanic-900/60 text-botanic-700 dark:text-botanic-300 flex items-center justify-center mx-auto mb-2 text-xs font-bold font-mono">
                01
              </div>
              <p className="text-xs font-bold text-earth-900 dark:text-white">Leaf Input</p>
              <p className="text-[11px] text-earth-500 dark:text-earth-400 mt-0.5">224×224 [-1, 1]</p>
            </div>

            <ArrowRight className="hidden md:block w-4 h-4 text-earth-400 shrink-0" />

            {/* Step 2: Router */}
            <div className="flex-1 text-center p-3 rounded-xl bg-white dark:bg-forest-900 border border-botanic-300 dark:border-botanic-800 ring-2 ring-botanic-500/20 shadow-sm w-full">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto mb-2 text-xs font-bold font-mono">
                02
              </div>
              <p className="text-xs font-bold text-earth-900 dark:text-white">Domain Router</p>
              <p className="text-[11px] text-earth-500 dark:text-earth-400 mt-0.5">Entropy Margin</p>
            </div>

            <ArrowRight className="hidden md:block w-4 h-4 text-earth-400 shrink-0" />

            {/* Step 3: Specialists */}
            <div className="flex-1 space-y-2 w-full">
              <div className="p-2 rounded-lg bg-white dark:bg-forest-900 border border-earth-200 dark:border-forest-800 shadow-sm flex items-center gap-2">
                <Wheat className="w-4 h-4 text-botanic-600 shrink-0" />
                <div className="text-left truncate">
                  <p className="text-[11px] font-bold text-earth-900 dark:text-white">Crop Specialist</p>
                  <p className="text-[10px] text-earth-500">38 Agricultural Classes</p>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-forest-900 border border-earth-200 dark:border-forest-800 shadow-sm flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-purple-500 shrink-0" />
                <div className="text-left truncate">
                  <p className="text-[11px] font-bold text-earth-900 dark:text-white">Indoor Specialist</p>
                  <p className="text-[10px] text-earth-500">16 Houseplant Classes</p>
                </div>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-4 h-4 text-earth-400 shrink-0" />

            {/* Step 4: Treatment DB */}
            <div className="flex-1 text-center p-3 rounded-xl bg-white dark:bg-forest-900 border border-earth-200 dark:border-forest-800 shadow-sm w-full">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center mx-auto mb-2 text-xs font-bold font-mono">
                04
              </div>
              <p className="text-xs font-bold text-earth-900 dark:text-white">Treatment Engine</p>
              <p className="text-[11px] text-earth-500 dark:text-earth-400 mt-0.5">54 Clinical Guides</p>
            </div>

          </div>

        </div>

        {/* Engineering Rationale Content */}
        <div className="space-y-4 text-xs sm:text-sm text-earth-700 dark:text-earth-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-botanic-50 dark:bg-forest-850/60 border border-botanic-200/80 dark:border-botanic-800/80">
            <h4 className="font-bold text-earth-950 dark:text-white mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-botanic-600 dark:text-botanic-400" />
              Why Two Separate Models Instead of One Monolith?
            </h4>
            <p className="text-xs text-earth-600 dark:text-earth-300 leading-normal">
              Combining agricultural monocultures (e.g. 10+ tomato diseases) with delicate indoor succulents (e.g. Aloe Vera rust, Snake Plant crown rot) into a single 54-class softmax layer introduces severe gradient competition. Agricultural crop leaves have completely different background textures (soil, mulches, direct full sun) compared to houseplants (pots, low indoor lighting, variegated foliage). Partitioning the problem space eliminates inter-domain class confusion and allows each model to achieve higher recall on rare pathologies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-earth-200 dark:border-forest-800 bg-white dark:bg-forest-900">
              <span className="font-bold text-earth-900 dark:text-white block mb-1">
                ⚡ Calibrated Dual-Inference Routing
              </span>
              <p className="text-earth-600 dark:text-earth-400">
                In auto mode, the router runs both ONNX sessions in parallel on CPU (&lt;30ms total). It scores peak softmax probability penalized by distribution entropy ($H(P) = -\sum p_i \log p_i$) to guarantee out-of-domain leaves are never misdiagnosed.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-earth-200 dark:border-forest-800 bg-white dark:bg-forest-900">
              <span className="font-bold text-earth-900 dark:text-white block mb-1">
                🚀 High-Throughput ONNX Runtime
              </span>
              <p className="text-earth-600 dark:text-earth-400">
                By exporting Keras/PyTorch graphs to ONNX, we avoid heavy TensorFlow runtime overhead, enabling low-memory microservice containerization and sub-30ms inference on standard CPUs without GPU dependencies.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-earth-200 dark:border-forest-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-earth-900 text-white dark:bg-white dark:text-earth-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Close Architecture Guide
          </button>
        </div>

      </div>
    </div>
  );
}
