"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Citing standard path based on your structure

/**
 * Main Home Component for Softworks Brief Assistant
 * Focuses on Clean UI and seamless Database integration.
 */
export default function Home() {
  // State management for input and loading status
  const [projectDescription, setProjectDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  /**
   * Handles the 'Analyze' action: 
   * 1. Validates input.
   * 2. Saves data to Supabase.
   * 3. Redirects to the confirmation page.
   */
  const handleAnalyze = async () => {
    // Prevent empty submissions
    if (!projectDescription.trim()) {
      alert("Please provide a project description before analyzing.");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Logic to insert the brief request into Supabase
      const { data, error } = await supabase
        .from("projects") // Ensure this table exists in your Supabase dashboard
        .insert([
          { 
            description: projectDescription,
            created_at: new Date().toISOString() 
          }
        ])
        .select();

      if (error) throw error;

      console.log("Brief context saved:", data);
      
      // Navigate to confirmation page upon success
      router.push("/confirmation");
    } catch (error: any) {
      console.error("Database Connection Error:", error.message);
      alert("System could not connect to the database. Please check your configuration.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a] selection:bg-blue-100">
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-6">
        
        {/* Hero Header Section */}
        <header className="mb-16 text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-6xl font-extrabold tracking-tight mb-6">
            Softworks <span className="text-blue-600">Brief</span> Assistant
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            Standardize your project requirements instantly. Provide your project context to generate a high-fidelity professional brief.
          </p>
        </header>

        {/* Interaction Card */}
        <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <section className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl shadow-gray-100/50">
            <div className="space-y-10">
              
              {/* Text Input Area */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Project Context & Goals
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Tell us about your project, target audience, and core requirements..."
                  className="w-full h-48 p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none text-lg leading-relaxed"
                />
              </div>

              {/* Upload Section Placeholder */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Supporting Assets
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-14 text-center hover:bg-blue-50/30 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    <p className="text-sm font-medium">Drop project documents, images, or memos here</p>
                    <p className="text-xs mt-2 opacity-60">Supports PDF, DOCX, and JPG (Max 10MB)</p>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] ${
                    isAnalyzing 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-[#1a1a1a] text-white hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200"
                  }`}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                      Processing Brief...
                    </span>
                  ) : (
                    "Analyze & Generate Brief"
                  )}
                </button>
              </div>
              
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}