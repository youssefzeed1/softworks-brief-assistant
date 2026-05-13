"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase"; // تأكد من عدد النقاط للرجوع للمجلد الصحيح
import { useParams } from "next/navigation";

export default function AnalysisPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: res } = await supabase.from("briefs").select("*").eq("id", id).single();
      if (res) setData(res);
    };
    if (id) fetchData();
  }, [id]);

  if (!data) return <div className="p-20 text-center font-bold text-slate-400">Fetching Project Details...</div>;

  return (
    <main className="min-h-screen bg-white p-10 md:p-24 text-slate-900">
      <div className="max-w-3xl mx-auto">
        <header className="border-l-8 border-blue-600 pl-8 mb-16">
          <h1 className="text-5xl font-black text-slate-900">Analysis Result</h1>
        </header>
        <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 shadow-inner">
          <p className="text-2xl text-slate-800 leading-relaxed italic">
            "{data.description}"
          </p>
        </div>
      </div>
    </main>
  );
}