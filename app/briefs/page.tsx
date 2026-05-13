"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase"; // تأكد من صحة المسار حسب مشروعك
import Link from "next/link";

export default function BriefsListPage() {
  const [briefs, setBriefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBriefs = async () => {
      const { data, error } = await supabase
        .from("briefs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setBriefs(data || []);
      setLoading(false);
    };
    fetchBriefs();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center font-semibold text-gray-400">
      Loading Projects...
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
      <div className="max-w-5xl mx-auto pt-20 px-6">
        {/* Header - متناسق مع الداشبورد */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Project <span className="text-blue-600">Briefs</span>
            </h1>
            <p className="text-gray-500 font-medium italic">
              Explore all generated analyses and creative directions.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 font-bold text-blue-600">
             {briefs.length} Total
          </div>
        </header>

        {/* Grid of Brief Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {briefs.length === 0 ? (
            <div className="col-span-full p-20 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
              No briefs generated yet.
            </div>
          ) : (
            briefs.map((brief) => (
              <Link 
                key={brief.id} 
                href={`/briefs/${brief.id}`}
                className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                      Analysis
                    </span>
                    <span className="text-[10px] text-gray-300 font-mono">
                      {new Date(brief.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 leading-tight line-clamp-3 mb-6 group-hover:text-blue-600 transition-colors">
                    {brief.description}
                  </h3>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                  View Full Result <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}