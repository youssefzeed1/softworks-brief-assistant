"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span className="font-bold text-xl tracking-tight text-slate-900">
          Softworks AI
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
        <Link href="/briefs" className="hover:text-black transition-colors">Briefs</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-slate-800 transition-all">
          Get Started
        </button>
      </div>
    </nav>
  );
}