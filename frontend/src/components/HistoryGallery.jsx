import React from 'react';
import { X, Trash2, Clock, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export default function HistoryGallery({
  isOpen,
  onClose,
  history = [],
  onSelectScan,
  onClearHistory,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-forest-900 border-l border-earth-200 dark:border-forest-800 w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b border-earth-200 dark:border-forest-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-earth-950 dark:text-white flex items-center gap-2">
              <span>Diagnosis History</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-botanic-100 text-botanic-800 dark:bg-botanic-900 dark:text-botanic-300">
                {history.length}
              </span>
            </h3>
            <p className="text-xs text-earth-500 dark:text-earth-400 mt-0.5">
              Current browser session scans
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-earth-400 hover:text-earth-700 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-earth-400 dark:text-earth-500">
              <Clock className="w-10 h-10 mb-2 stroke-[1.5] opacity-50" />
              <p className="text-sm font-semibold text-earth-700 dark:text-earth-300">No scans recorded yet</p>
              <p className="text-xs mt-1">Upload a leaf or try a 1-click sample to build your diagnostic session history.</p>
            </div>
          ) : (
            history.map((scan) => {
              const confPercent = (scan.confidence * 100).toFixed(0);
              return (
                <div
                  key={scan.id}
                  onClick={() => {
                    onSelectScan(scan);
                    onClose();
                  }}
                  className="group relative flex items-center gap-3.5 p-3 rounded-2xl bg-earth-50 dark:bg-forest-850 hover:bg-botanic-50 dark:hover:bg-forest-800 border border-earth-200 dark:border-forest-800/80 cursor-pointer transition-all hover:shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/10 shrink-0 border border-earth-200 dark:border-forest-700">
                    <img
                      src={scan.previewUrl}
                      alt={scan.plant_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-earth-900 dark:text-white truncate">
                        {scan.plant_name}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-botanic-600 dark:text-botanic-400">
                        {confPercent}%
                      </span>
                    </div>
                    <p className="text-xs text-earth-600 dark:text-earth-300 truncate mt-0.5">
                      {scan.condition}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-earth-400 dark:text-earth-500 font-mono">
                      <span>{scan.domain === 'crop' ? '🌾 Crop' : '🪴 Indoor'}</span>
                      <span>•</span>
                      <span>{scan.timeAgo}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Clear Action */}
        {history.length > 0 && (
          <div className="p-4 border-t border-earth-200 dark:border-forest-800 bg-earth-50/50 dark:bg-forest-950/40 flex justify-between items-center">
            <span className="text-xs text-earth-400">
              Stored in localStorage
            </span>
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
