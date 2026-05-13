"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";


export default function Dashboard() {
  const [briefs, setBriefs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBriefs = async () => {
      const { data } = await supabase.from("briefs").select("*").order("created_at", { ascending: false });
      if (data) setBriefs(data);
    };
    fetchBriefs();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-10">Manager Dashboard</h1>
        <div className="grid gap-4">
          {briefs.map((b) => (
            <div key={b.id} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all">
              <div className="flex-1">
                <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Project Summary</p>
                <p className="text-lg font-bold text-slate-800">{b.description}</p>
              </div>
              
              
              <Link 
                href={`/briefs/${b.id}`} 
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 shadow-md transition-all active:scale-95"
              >
                View Full Analysis →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}