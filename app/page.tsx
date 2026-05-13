"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase"; 
import { useRouter } from "next/navigation";

export default function Home() {
  const [projectDescription, setProjectDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!projectDescription) {
      alert("Please describe your project first.");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Saving the project context to your new Supabase 'briefs' table
      const { data, error } = await supabase
        .from("briefs") 
        .insert([{ description: projectDescription }])
        .select();

      if (error) throw error;

      console.log("Brief saved successfully:", data);
      
      // Redirecting to confirmation page
      router.push("/confirmation");
    } catch (error) {
      console.error("Database Connection Error:", error);
      alert("Connection failed. Please ensure the 'briefs' table exists in your new Supabase project.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
      <div className="max-w-4xl mx-auto pt-20 pb-12 px-6">
        
        {/* Header Section */}
        <header className="mb-16 text-left">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Softworks <span className="text-blue-600">Brief</span> Assistant
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Standardize your project requirements professionally. Use the area below to provide context for your professional brief.
          </p>
        </header>

        {/* Input Section */}
        <div className="grid grid-cols-1 gap-8">
          <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Project Context
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your project goals, target audience, and key features..."
                  className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              {/* Assets Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Assets Upload Area
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <p className="text-gray-400">Click or drag files to this area to upload</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                    isAnalyzing 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
                  }`}
                >
                  {isAnalyzing ? "Analyzing Project..." : "Analyze & Generate Brief"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}