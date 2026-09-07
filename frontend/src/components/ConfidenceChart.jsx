import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

export default function ConfidenceChart({ distribution = [], topPredictions = [], primaryConfidence = 0 }) {
  return (
    <div className="bg-white dark:bg-forest-900/70 rounded-2xl border border-earth-200 dark:border-forest-850 p-5 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-botanic-600 dark:text-botanic-400" />
          <h4 className="text-sm font-bold text-earth-900 dark:text-white">
            Confidence Probability Distribution
          </h4>
        </div>
        <span className="text-[11px] font-mono text-earth-500 dark:text-earth-400">
          Top Candidates
        </span>
      </div>

      {/* Distribution Bars */}
      <div className="space-y-3">
        {distribution.map((item, index) => {
          const percentage = (item.confidence * 100).toFixed(1);
          const isTop = index === 0;

          // Color palette based on probability rank
          let barColor = 'bg-botanic-600';
          let textColor = 'text-botanic-800 dark:text-botanic-200 font-bold';

          if (!isTop) {
            if (item.confidence > 0.15) {
              barColor = 'bg-amber-500/80';
              textColor = 'text-amber-700 dark:text-amber-300';
            } else {
              barColor = 'bg-earth-300 dark:bg-forest-700';
              textColor = 'text-earth-500 dark:text-earth-400';
            }
          }

          return (
            <div key={item.class_id || index} className="text-xs">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 truncate max-w-[75%]">
                  <span className={`w-4 text-center font-mono text-[10px] ${isTop ? 'font-bold text-botanic-600' : 'text-earth-400'}`}>
                    #{index + 1}
                  </span>
                  <span className="font-medium text-earth-900 dark:text-earth-200 truncate">
                    {item.plant_name} — {item.condition}
                  </span>
                </div>
                <span className={`font-mono text-[11px] ${textColor}`}>
                  {percentage}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="h-2 w-full bg-earth-100 dark:bg-forest-950 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
                  style={{ width: `${Math.max(Number(percentage), 2)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Differential Diagnosis Small Ranked Summary */}
      {topPredictions.length > 0 && (
        <div className="mt-5 pt-4 border-t border-earth-100 dark:border-forest-850">
          <span className="text-[11px] font-semibold text-earth-500 dark:text-earth-400 uppercase tracking-wider block mb-2">
            Alternative Differential Possibilities
          </span>
          <div className="space-y-1.5">
            {topPredictions.map((alt, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-earth-50 dark:bg-forest-850/60 text-xs"
              >
                <span className="text-earth-700 dark:text-earth-300 font-medium truncate">
                  {alt.plant_name} — {alt.condition}
                </span>
                <span className="font-mono text-earth-500 dark:text-earth-400 shrink-0 ml-2">
                  {alt.formatted_confidence}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
