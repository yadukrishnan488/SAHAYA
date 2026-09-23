"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const { t, language } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                സ
              </div>
              <span className="text-xl font-extrabold text-white">SAHAYA</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Welfare Entitlement Assistant for Plantation and Fishing Families. Designed for Hackathon Demonstration.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t.privacyNotice}</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition">{t.navHome}</Link></li>
              <li><Link href="/start" className="hover:text-emerald-400 transition">{t.startScreening}</Link></li>
              <li><Link href="/documents" className="hover:text-emerald-400 transition">{t.navDocs}</Link></li>
              <li><Link href="/centres" className="hover:text-emerald-400 transition">{t.navCentres}</Link></li>
              <li><Link href="/assistant" className="hover:text-emerald-400 transition">{t.navAssistant}</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-400 transition">{t.navAdmin}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Target Communities</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>🎣 Coastal Fishing Families (തീരദേശ മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങൾ)</li>
              <li>🌿 Plantation Labor Households (തോട്ടം തൊഴിലാളി കുടുംബങ്ങൾ)</li>
              <li>📍 Ernakulam, Kottayam, Idukki, Alappuzha, Wayanad & all Kerala districts</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SAHAYA - Hackathon Prototype. Built with Next.js, FastAPI & Rules Engine.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Kerala Welfare Screening
          </p>
        </div>
      </div>
    </footer>
  );
}
