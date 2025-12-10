"use client";
import { useState, useEffect, useRef } from "react";
import type * as pdfjsLibTypes from "pdfjs-dist";

interface TermItem {
  term: string;
  meaning: string;
  example: string;
}

interface AnalysisResult {
  critical: TermItem[];
  medium: TermItem[];
  low: TermItem[];
}

function CategorySection({
  title,
  items,
  color,
  bgColor,
  borderColor,
  icon,
}: {
  title: string;
  items: TermItem[];
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={`${bgColor} ${borderColor} border-l-4 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
        <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-white shadow-md ${color}`}>
          {icon}
        </div>
        <div>
          <h2 className={`text-xl md:text-3xl font-extrabold ${color}`}>
            {title}
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} found
          </p>
        </div>
      </div>

      <div className="space-y-2 md:space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg md:rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 md:px-6 py-3 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg ${bgColor} flex items-center justify-center ${color} font-bold text-base md:text-lg transition-transform shrink-0 ${expandedItems.has(index) ? 'rotate-90' : ''}`}>
                  ›
                </div>
                <span className="font-bold text-gray-900 text-sm md:text-lg group-hover:text-indigo-600 transition-colors truncate">{item.term}</span>
              </div>
              <svg className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform shrink-0 ml-2 ${expandedItems.has(index) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedItems.has(index) && (
              <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t-2 border-gray-100 bg-linear-to-br from-gray-50 to-white animate-fade-in">
                <div className="space-y-3 md:space-y-4">
                  <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                    <div className="flex items-start gap-2 mb-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                          What it means
                        </p>
                        <p className="text-gray-800 text-sm md:text-base leading-relaxed">{item.meaning}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                    <div className="flex items-start gap-2 mb-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                          Example
                        </p>
                        <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">{item.example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PolicyCheck() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfjsLib, setPdfjsLib] = useState<typeof pdfjsLibTypes | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load PDF.js dynamically on client side only
  useEffect(() => {
    const loadPdfJs = async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      setPdfjsLib(pdfjs);
    };
    loadPdfJs();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setError("");

    // Check if it's a PDF file
    if (uploadedFile.type === "application/pdf" || uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      if (!pdfjsLib) {
        setError("PDF library is still loading. Please try again in a moment.");
        return;
      }

      try {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";

        // Extract text from all pages
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pageText = textContent.items
            .map((item: any) => {
              if ('str' in item) {
                return item.str;
              }
              return '';
            })
            .join(" ");
          fullText += pageText + "\n";
        }

        setText(fullText);
      } catch (err) {
        setError("Failed to read PDF file. Please try again.");
        console.error(err);
      }
    } else {
      // Read as text file
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.onerror = () => {
        setError("Failed to read file. Please try again.");
      };
      reader.readAsText(uploadedFile);
    }
  };

  const analyze = async () => {
    if (!text.trim()) {
      setError("Please enter or upload terms and conditions text");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyzeTermsAndConditions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to analyze. Please try again.");
        return;
      }

      setResult(data.analysis);
      
      // Clear input and file after successful analysis
      setText("");
      setFile(null);
      
      // Scroll to results after a brief delay to ensure rendering
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }, 100);
    } catch (err) {
      setError("Failed to connect to the analyzer. Please check your internet connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText("");
    setFile(null);
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back button */}
        <div className="mb-6">
          <a href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium group" aria-label="Back to home">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-block mb-3 md:mb-4">
            <span className="bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-indigo-200">
              🔍 AI-Powered Analysis
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 md:mb-4 px-4">
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Terms & Conditions
            </span>
            <br />
            Analyzer
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Upload or paste your T&C document to get a detailed risk analysis in seconds
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 mb-6 md:mb-8 border border-gray-200 animate-slide-up">
          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-800 mb-2 md:mb-3">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Document
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="group flex items-center justify-center w-full px-4 md:px-6 py-6 md:py-8 border-2 border-dashed border-gray-300 rounded-xl md:rounded-2xl cursor-pointer hover:border-indigo-500 hover:bg-linear-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
              >
                <div className="text-center">
                  {file ? (
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-indigo-600">
                      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="text-center md:text-left">
                        <p className="font-semibold text-sm md:text-lg break-all px-2">{file.name}</p>
                        <p className="text-xs md:text-sm text-gray-500">Click to change file</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="h-6 w-6 md:h-8 md:w-8 text-indigo-600"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sm md:text-base text-gray-700 font-medium mb-1 px-2">
                        <span className="font-bold text-indigo-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 flex items-center justify-center gap-1.5 md:gap-2 mt-2 flex-wrap px-2">
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 rounded text-xs font-mono">TXT</span>
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 rounded text-xs font-mono">PDF</span>
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 rounded text-xs font-mono">DOC</span>
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="flex-1 border-t border-gray-300" />
              <span className="px-2 md:px-4 text-xs md:text-sm text-gray-500 font-semibold">OR PASTE TEXT</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-800 mb-2 md:mb-3">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Paste Text Directly
            </label>
            <textarea
              className="w-full p-3 md:p-5 border-2 border-gray-300 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none font-mono text-xs md:text-sm text-gray-600"
              rows={8}
              placeholder="Paste your terms and conditions text here...&#10;&#10;Our AI will analyze it and categorize risks automatically."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
              <p className="mt-2 text-xs md:text-sm text-gray-500 flex items-center gap-1">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {text.length.toLocaleString()} characters ready to analyze
              </p>
            )}
          </div>

          {error && (
            <div className="mb-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-start gap-3 animate-fade-in">
              <svg className="w-6 h-6 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-red-800">Error</p>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={analyze}
              disabled={loading || !text.trim()}
              className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-5 rounded-xl font-bold text-base md:text-lg hover:shadow-2xl disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2 md:gap-3">
                  <svg
                    className="animate-spin h-5 w-5 md:h-6 md:w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Analyzing with AI...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span className="text-sm md:text-base">Analyze Terms & Conditions</span>
                </span>
              )}
            </button>

            {(text || file || result) && (
              <button
                onClick={clearAll}
                className="px-6 md:px-8 py-3 md:py-5 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-sm md:text-base hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div ref={resultsRef} className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-block bg-linear-to-r from-green-100 to-blue-100 px-4 md:px-6 py-2 md:py-3 rounded-full">
                <p className="text-green-700 text-sm md:text-base font-bold flex items-center gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Analysis Complete!
                </p>
              </div>
            </div>

            <CategorySection
              title="Critical Risks"
              items={result.critical}
              color="text-red-600"
              bgColor="bg-red-50"
              borderColor="border-red-500"
              icon={
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            />

            <CategorySection
              title="Medium Risks"
              items={result.medium}
              color="text-orange-600"
              bgColor="bg-orange-50"
              borderColor="border-orange-500"
              icon={
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <CategorySection
              title="Low Risks"
              items={result.low}
              color="text-green-600"
              bgColor="bg-green-50"
              borderColor="border-green-500"
              icon={
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl md:rounded-2xl p-6 md:p-8 text-center text-white shadow-xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Want to analyze another document?</h3>
              <p className="mb-4 md:mb-6 text-sm md:text-base text-indigo-100">Upload a new file or paste different text above to get started.</p>
              <button
                onClick={clearAll}
                className="bg-white text-indigo-600 px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold hover:scale-105 transition-all shadow-lg"
              >
                Analyze Another Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
