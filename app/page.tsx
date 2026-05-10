"use client";

import React, { useState } from 'react';

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setIsUploading(true);
    // محاكاة للتحميل (Simulation)
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          window.location.href = '/confirmation';
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
      <div className="max-w-4xl mx-auto pt-20 pb-12 px-6">
        
        <header className="mb-16 text-left">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Softworks <span className="text-blue-600">Brief</span> Assistant
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Standardize your project requirements. Upload notes, images, or video memos.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="space-y-8">
              
              {/* Text Context */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Project Context
                </label>
                <textarea
                  rows={5}
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none text-black"
                  placeholder="Describe your project goals..."
                ></textarea>
              </div>

              {/* Assets Upload Area */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Supporting Assets (MP4/MP3/Images)
                </label>
                <div 
                  className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <p className="text-sm text-gray-600">Click to upload files</p>
                  <input id="file-upload" type="file" className="hidden" multiple accept="image/*,audio/*,video/mp4,.pdf" />
                </div>
              </div>

              {/* Progress Bar (يظهر فقط عند التحميل) */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-blue-600">
                    <span>Uploading Assets...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={handleGenerate}
                  className={`w-full font-bold py-4 rounded-xl transition-all duration-300 shadow-lg ${
                    isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1a1a1a] text-white hover:bg-blue-600 shadow-gray-200'
                  }`}
                >
                  {isUploading ? 'Processing...' : 'Generate Analysis'}
                </button>
              </div>

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}