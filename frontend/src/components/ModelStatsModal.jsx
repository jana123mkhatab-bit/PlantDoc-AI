import React from 'react';
import { X, Cpu, Database, CheckCircle2, Award, Zap, BookOpen } from 'lucide-react';

export default function ModelStatsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-forest-900 border border-earth-200 dark:border-forest-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-earth-200 dark:border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-botanic-100 dark:bg-botanic-900/60 text-botanic-700 dark:text-botanic-300 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-earth-950 dark:text-white">
                About the Models & Technical Benchmarks
              </h3>
              <p className="text-xs text-earth-500 dark:text-earth-400">
                Machine Learning Specifications, Hyperparameters & Training Safeguards
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

        {/* Comparison Table */}
        <div className="my-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-earth-200 dark:border-forest-800 text-earth-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Metric / Spec</th>
                <th className="py-2.5 px-3 text-botanic-600 dark:text-botanic-400 font-bold">Model A: Agricultural Crops</th>
                <th className="py-2.5 px-3 text-purple-600 dark:text-purple-400 font-bold">Model B: Indoor Foliage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-100 dark:divide-forest-850 font-mono">
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-earth-700 dark:text-earth-300">Base Architecture</td>
                <td className="py-2.5 px-3">MobileNetV2 (ImageNet Pretrained)</td>
                <td className="py-2.5 px-3">MobileNetV2 (ImageNet Pretrained)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-earth-700 dark:text-earth-300">Dataset Source</td>
                <td className="py-2.5 px-3">New Plant Diseases Dataset</td>
                <td className="py-2.5 px-3">Indoor Plant Disease Detection</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-earth-700 dark:text-earth-300">Dataset Scale</td>
                <td className="py-2.5 px-3">87,867 RGB images</td>
                <td className="py-2.5 px-3">21,097 RGB images</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-earth-700 dark:text-earth-300">Target Classes</td>
                <td className="py-2.5 px-3 font-bold text-earth-900 dark:text-white">38 classes (14 crop species)</td>
                <td className="py-2.5 px-3 font-bold text-earth-900 dark:text-white">16 classes (5 indoor species)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-earth-700 dark:text-earth-300">Validation Accuracy</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">98.4% (TTA 5-round: 98.9%)</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">96.2%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-earth-700 dark:text-earth-300">Input Resolution</td>
                <td className="py-2.5 px-3">224 × 224 × 3 RGB</td>
                <td className="py-2.5 px-3">224 × 224 × 3 RGB</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-earth-700 dark:text-earth-300">Inference Runtime</td>
                <td className="py-2.5 px-3">ONNX Runtime (CPU) ~18ms</td>
                <td className="py-2.5 px-3">ONNX Runtime (CPU) ~17ms</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-earth-700 dark:text-earth-300">Fine-Tuning Strategy</td>
                <td className="py-2.5 px-3">2-Phase (Freeze base, then unfreeze top 40)</td>
                <td className="py-2.5 px-3">2-Phase (Freeze base, then unfreeze top 40)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Engineering Highlights Grid */}
        <div className="space-y-3 text-xs sm:text-sm">
          
          <div className="p-4 rounded-xl bg-earth-50 dark:bg-forest-950/60 border border-earth-200 dark:border-forest-850">
            <h5 className="font-bold text-earth-900 dark:text-white mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-botanic-600" />
              Why MobileNetV2 as the Backbone?
            </h5>
            <p className="text-xs text-earth-600 dark:text-earth-300 leading-relaxed">
              MobileNetV2 uses <strong>inverted residual blocks</strong> and <strong>depthwise separable convolutions</strong> to reduce computation by 8-9x compared to standard convolution models (such as VGG16 or ResNet-50) with only minimal loss in accuracy. This enables PlantDoc AI to execute instantaneous client-side or low-tier CPU cloud container inference (&lt;25ms) without requiring costly GPU instances.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-earth-50 dark:bg-forest-950/60 border border-earth-200 dark:border-forest-850">
            <h5 className="font-bold text-earth-900 dark:text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-botanic-600" />
              Training Safeguards Implemented in Colab Notebooks
            </h5>
            <ul className="text-xs text-earth-600 dark:text-earth-300 space-y-1.5 list-disc list-inside">
              <li><strong>Stratified 80/10/10 Split:</strong> Guaranteed proportional representation across all 54 classes, eliminating the rare-class zero-recall bug.</li>
              <li><strong>Class Weighting:</strong> Compensated for natural dataset class imbalances by penalizing under-represented errors proportionally.</li>
              <li><strong>Test-Time Augmentation (TTA):</strong> Averaged 5-round transformed inferences during evaluation to smooth noisy leaf reflections.</li>
              <li><strong>Mode-Collapse Diagnostics:</strong> Monitored unique class prediction distribution to detect local minima traps during backpropagation.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-earth-200 dark:border-forest-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-earth-900 text-white dark:bg-white dark:text-earth-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Close Model Specs
          </button>
        </div>

      </div>
    </div>
  );
}
