"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context";
import { ShieldCheck, Languages, Eye, Trash2, Mic, MapPin, FileCheck, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { language, setLanguage, easyMode, setEasyMode, clearData, t } = useApp();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
      {/* Top Banner: Hackathon Demo Warning */}
      <div className="bg-emerald-950 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
          <span className="bg-emerald-500 text-emerald-950 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
            {t.demoBadge}
          </span>
          <span className="truncate">{t.demoDisclaimer}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-emerald-700 transition">
            സ
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">SAHAYA</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                സഹായ
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">{t.appSubName}</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-700">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg transition ${pathname === "/" ? "bg-emerald-50 text-emerald-700 font-bold" : "hover:bg-slate-50 hover:text-emerald-600"}`}
          >
            {t.navHome}
          </Link>
          <Link
            href="/start"
            className={`px-3 py-2 rounded-lg transition ${pathname === "/start" ? "bg-emerald-50 text-emerald-700 font-bold" : "hover:bg-slate-50 hover:text-emerald-600"}`}
          >
            {t.navStart}
          </Link>
          <Link
            href="/documents"
            className={`px-3 py-2 rounded-lg transition ${pathname === "/documents" ? "bg-emerald-50 text-emerald-700 font-bold" : "hover:bg-slate-50 hover:text-emerald-600"}`}
          >
            {t.navDocs}
          </Link>
          <Link
            href="/centres"
            className={`px-3 py-2 rounded-lg transition ${pathname === "/centres" ? "bg-emerald-50 text-emerald-700 font-bold" : "hover:bg-slate-50 hover:text-emerald-600"}`}
          >
            {t.navCentres}
          </Link>
          <Link
            href="/assistant"
            className={`px-3 py-2 rounded-lg transition ${pathname === "/assistant" ? "bg-emerald-50 text-emerald-700 font-bold" : "hover:bg-slate-50 hover:text-emerald-600"}`}
          >
            {t.navAssistant}
          </Link>
          <Link
            href="/admin"
            className={`px-3 py-2 rounded-lg transition ${pathname?.startsWith("/admin") ? "bg-emerald-50 text-emerald-700 font-bold" : "hover:bg-slate-50 hover:text-emerald-600"}`}
          >
            {t.navAdmin}
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Easy Mode Toggle */}
          <button
            onClick={() => setEasyMode(!easyMode)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition ${
              easyMode
                ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
            title="Toggle Large Text Easy Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{easyMode ? t.easyModeActive : t.easyMode}</span>
          </button>

          {/* Language Selector Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setLanguage("ml")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                language === "ml"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-700 hover:text-emerald-700"
              }`}
            >
              മലയാളം
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                language === "en"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-700 hover:text-emerald-700"
              }`}
            >
              English
            </button>
          </div>

          {/* Clear My Data */}
          <button
            onClick={() => {
              clearData();
              alert(language === "ml" ? "ഡെമോ വിവരങ്ങൾ മായ്ച്ചു." : "Demo session cleared.");
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
            title={t.clearData}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
