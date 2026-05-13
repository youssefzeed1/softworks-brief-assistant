"use client";

import React from 'react';

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-10 shadow-sm text-center text-black">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
          ✓
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Submission Received</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your project brief has been successfully generated.
        </p>
        
        <button 
          onClick={() => window.location.href = '/'}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </main>
  );
}