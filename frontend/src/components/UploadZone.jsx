import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';

export default function UploadZone({
  selectedImage,
  previewUrl,
  onImageSelected,
  onClearImage,
  onAnalyze,
  isLoading,
  error,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Sample leaf cards for 1-click evaluation by recruiters
  const sampleLeaves = [
    {
      name: 'Tomato Early Blight',
      category: 'Crop (Model A)',
      domain: 'crop',
      file: '/samples/tomato_early_blight.jpg',
      badge: 'Fungal Lesion',
    },
    {
      name: 'Corn Common Rust',
      category: 'Crop (Model A)',
      domain: 'crop',
      file: '/samples/corn_common_rust.jpg',
      badge: 'Rust Pustules',
    },
    {
      name: 'Snake Plant Rot',
      category: 'Indoor (Model B)',
      domain: 'indoor',
      file: '/samples/snake_plant_rot.jpg',
      badge: 'Crown Collapse',
    },
    {
      name: 'Aloe Vera Leaf Spot',
      category: 'Indoor (Model B)',
      domain: 'indoor',
      file: '/samples/aloe_vera_leaf_spot.jpg',
      badge: 'Necrotic Spots',
    },
    {
      name: 'Healthy Peach',
      category: 'Crop (Control)',
      domain: 'crop',
      file: '/samples/peach_healthy.jpg',
      badge: 'Healthy Leaf',
    },
  ];

  // Handle file drop or selection
  const handleProcessFile = async (file) => {
    if (!file) return;
    try {
      const optimized = await compressImage(file);
      onImageSelected(optimized);
    } catch (err) {
      onImageSelected(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  // Support pasting image from clipboard (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          handleProcessFile(file);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Handle clicking a sample card
  const handleSelectSample = async (sample) => {
    try {
      const response = await fetch(sample.file);
      const blob = await response.blob();
      const file = new File([blob], sample.file.split('/').pop(), { type: 'image/jpeg' });
      onImageSelected(file, sample.domain);
    } catch (err) {
      console.error('Failed to load sample image:', err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      {/* Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !previewUrl && fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 p-6 sm:p-8 text-center ${
          previewUrl
            ? 'border-botanic-500/40 bg-botanic-50/20 dark:bg-forest-900/30'
            : isDragging
            ? 'border-botanic-500 bg-botanic-50/50 dark:bg-forest-900/60 scale-[1.01]'
            : 'border-earth-300 dark:border-forest-850 hover:border-botanic-400 bg-white/70 dark:bg-forest-900/40 cursor-pointer'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleProcessFile(e.target.files[0]);
          }}
        />

        {previewUrl ? (
          /* Live Image Preview Mode */
          <div className="flex flex-col items-center">
            <div className="relative group max-w-xs sm:max-w-sm rounded-xl overflow-hidden shadow-md border border-earth-200 dark:border-forest-800 bg-black/5">
              <img
                src={previewUrl}
                alt="Selected Leaf"
                className="w-full h-56 object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearImage();
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between w-full max-w-sm px-2 text-xs text-earth-500 dark:text-earth-400">
              <span className="truncate max-w-[200px]">{selectedImage?.name}</span>
              <span>{(selectedImage?.size / 1024).toFixed(1)} KB</span>
            </div>

            {/* Main Run Diagnosis Action */}
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={onAnalyze}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-botanic-600 hover:bg-botanic-700 disabled:opacity-50 text-white font-semibold shadow-md shadow-botanic-600/20 hover:shadow-botanic-600/30 transition-all text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run Neural Diagnosis</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-earth-100 hover:bg-earth-200 dark:bg-forest-850 dark:hover:bg-forest-800 text-earth-700 dark:text-earth-300 text-sm font-medium transition-colors"
              >
                Change Photo
              </button>
            </div>
          </div>
        ) : (
          /* Empty Dropzone State */
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-botanic-50 dark:bg-forest-850 text-botanic-600 dark:text-botanic-400 flex items-center justify-center mb-3">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-earth-900 dark:text-white">
              Drop your leaf photo here, or <span className="text-botanic-600 dark:text-botanic-400 underline">browse</span>
            </h3>
            <p className="mt-1 text-xs text-earth-500 dark:text-earth-400">
              Supports JPEG, PNG, or WebP up to 15MB • Paste from clipboard (Ctrl+V)
            </p>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mt-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to analyze leaf</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* 1-Click Recruiter Sample Leaves Row */}
      <div className="mt-6 pt-5 border-t border-earth-200/80 dark:border-forest-850/80">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-earth-600 dark:text-earth-400">
            Or test with a 1-click sample leaf:
          </span>
          <span className="text-[11px] text-earth-400 dark:text-earth-500">
            Curated benchmark cards
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {sampleLeaves.map((sample, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="group relative flex flex-col items-center p-2 rounded-xl bg-white dark:bg-forest-900/60 hover:bg-botanic-50 dark:hover:bg-forest-850 border border-earth-200 dark:border-forest-850 transition-all text-left overflow-hidden hover:shadow-sm"
            >
              <div className="w-full h-16 rounded-lg overflow-hidden bg-earth-100 dark:bg-forest-950 mb-1.5">
                <img
                  src={sample.file}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="w-full">
                <p className="text-[11px] font-semibold text-earth-900 dark:text-white truncate">
                  {sample.name}
                </p>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[10px] text-earth-500 dark:text-earth-400 truncate">
                    {sample.badge}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
