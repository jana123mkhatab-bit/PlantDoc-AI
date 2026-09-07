import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DomainSelector from './components/DomainSelector';
import UploadZone from './components/UploadZone';
import ScanningView from './components/ScanningView';
import ResultsView from './components/ResultsView';
import ArchitectureView from './components/ArchitectureView';
import ModelStatsModal from './components/ModelStatsModal';
import HistoryGallery from './components/HistoryGallery';
import Footer from './components/Footer';

import { predictPlantDisease, checkSystemHealth } from './utils/api';

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('plantdoc_dark_mode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Diagnostic State
  const [selectedDomain, setSelectedDomain] = useState('auto');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSavedInHistory, setIsSavedInHistory] = useState(false);

  // Modals & Drawers
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Backend Health Ping
  const [systemStatus, setSystemStatus] = useState(null);

  // Session History in LocalStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('plantdoc_scan_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const scannerRef = useRef(null);

  // Dark Mode synchronization with HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('plantdoc_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('plantdoc_dark_mode', 'false');
    }
  }, [darkMode]);

  // Check health on mount
  useEffect(() => {
    checkSystemHealth().then((status) => {
      setSystemStatus(status);
    });
  }, []);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('plantdoc_scan_history', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to persist history:', e);
    }
  }, [history]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageSelected = (file, explicitDomain = null) => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setError(null);
    setDiagnosisResult(null);
    setIsSavedInHistory(false);
    if (explicitDomain) {
      setSelectedDomain(explicitDomain);
    }
  };

  const handleClearImage = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setDiagnosisResult(null);
    setError(null);
    setIsSavedInHistory(false);
  };

  const handleRunDiagnosis = async () => {
    if (!selectedFile) {
      setError('Please upload a leaf photograph before running diagnosis.');
      return;
    }

    setIsScanning(true);
    setError(null);

    const startTime = Date.now();

    try {
      const result = await predictPlantDisease(selectedFile, selectedDomain);
      
      // Ensure the high-tech scan animation runs for at least 900ms for delightful UX
      const elapsed = Date.now() - startTime;
      const remainingWait = Math.max(0, 900 - elapsed);

      setTimeout(() => {
        setIsScanning(false);
        setDiagnosisResult(result);
        setIsSavedInHistory(false);
      }, remainingWait);
    } catch (err) {
      setIsScanning(false);
      setError(err.message || 'Diagnostic failed. Please check your image and retry.');
    }
  };

  const handleSaveToHistory = () => {
    if (!diagnosisResult || isSavedInHistory) return;

    const newEntry = {
      id: Date.now().toString(),
      plant_name: diagnosisResult.plant_name,
      condition: diagnosisResult.condition,
      confidence: diagnosisResult.confidence,
      domain: diagnosisResult.domain,
      previewUrl: previewUrl,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      fullResult: diagnosisResult,
    };

    setHistory((prev) => [newEntry, ...prev.slice(0, 19)]); // keep last 20
    setIsSavedInHistory(true);
  };

  const handleSelectFromHistory = (scan) => {
    setPreviewUrl(scan.previewUrl);
    setDiagnosisResult(scan.fullResult);
    setIsSavedInHistory(true);
    setSelectedDomain(scan.domain || 'auto');
    if (scannerRef.current) {
      scannerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('plantdoc_scan_history');
  };

  const handleScrollToScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] dark:bg-forest-950 text-earth-900 dark:text-earth-100 transition-colors duration-200">
      
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        systemStatus={systemStatus}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <Hero
          onScrollToScanner={handleScrollToScanner}
          onOpenArchitecture={() => setIsArchitectureOpen(true)}
        />

        {/* Diagnostic Core Section */}
        <section ref={scannerRef} className="py-8 scroll-mt-20">
          
          {!diagnosisResult && !isScanning && (
            <>
              {/* Domain Switcher */}
              <DomainSelector
                selectedDomain={selectedDomain}
                onChangeDomain={setSelectedDomain}
              />

              {/* Upload Dropzone */}
              <UploadZone
                selectedImage={selectedFile}
                previewUrl={previewUrl}
                onImageSelected={handleImageSelected}
                onClearImage={handleClearImage}
                onAnalyze={handleRunDiagnosis}
                isLoading={isScanning}
                error={error}
              />
            </>
          )}

          {/* High-Tech Animated Scanner State */}
          {isScanning && (
            <ScanningView
              previewUrl={previewUrl}
              selectedDomain={selectedDomain}
            />
          )}

          {/* Diagnosis Results Presentation */}
          {diagnosisResult && !isScanning && (
            <ResultsView
              result={diagnosisResult}
              previewUrl={previewUrl}
              onReset={handleClearImage}
              onSaveToHistory={handleSaveToHistory}
              isSaved={isSavedInHistory}
            />
          )}

        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <ArchitectureView
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      <ModelStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
      />

      <HistoryGallery
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectScan={handleSelectFromHistory}
        onClearHistory={handleClearHistory}
      />

    </div>
  );
}
