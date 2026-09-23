"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/context";
import { TestProfileRunResult, Scheme } from "@/lib/types";
import { runTestProfiles, fetchSchemes } from "@/lib/api";
import { LayoutDashboard, CheckCircle2, XCircle, Upload, Play, Database, ShieldCheck, FileJson } from "lucide-react";

export default function AdminPage() {
  const { language, t } = useApp();
  const [metrics, setMetrics] = useState({
    totalSchemes: 12,
    activeSchemes: 10,
    householdsScreened: 150,
    potentialMatches: 83,
  });
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [testResults, setTestResults] = useState<TestProfileRunResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importStatus, setImportStatus] = useState("");

  useEffect(() => {
    (async () => {
      const data = await fetchSchemes();
      setSchemes(data);
    })();
  }, []);

  const handleRunTests = async () => {
    setTesting(true);
    try {
      const results = await runTestProfiles();
      setTestResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setTesting(false);
    }
  };

  const handleImportPack = async () => {
    try {
      const parsed = JSON.parse(importJson);
      const res = await fetch("http://localhost:8000/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (res.ok) {
        const data = await res.json();
        setImportStatus(data.message);
        const updated = await fetchSchemes();
        setSchemes(updated);
      } else {
        setImportStatus("Import failed: invalid payload structure.");
      }
    } catch (e) {
      setImportStatus("JSON Syntax Error. Please check input.");
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
            <LayoutDashboard className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t.adminTitle}</h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage scheme rules, test profile evaluation, and import organizer resource packs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunTests}
            disabled={testing}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{testing ? "Running..." : t.runTestProfiles}</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">{t.totalSchemes}</p>
          <p className="text-3xl font-black text-slate-900">{metrics.totalSchemes}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">{t.activeSchemes}</p>
          <p className="text-3xl font-black text-emerald-600">{metrics.activeSchemes}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">{t.screeningsRun}</p>
          <p className="text-3xl font-black text-blue-600">{metrics.householdsScreened}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">{t.potentialMatches}</p>
          <p className="text-3xl font-black text-teal-600">{metrics.potentialMatches}</p>
        </div>
      </div>

      {/* Automated Test Profiles Evaluation Runner */}
      {testResults.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Automated Test Profiles Results</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Profile Name</th>
                  <th className="p-3">Expected Schemes</th>
                  <th className="p-3">Actual Matched</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {testResults.map((tr) => (
                  <tr key={tr.profileId} className="hover:bg-slate-50">
                    <td className="p-3 font-bold">{tr.profileName}</td>
                    <td className="p-3 text-slate-600">{tr.expectedMatches.join(", ")}</td>
                    <td className="p-3 text-emerald-700 font-bold">{tr.actualMatches.join(", ")}</td>
                    <td className="p-3">
                      {tr.status === "PASS" ? (
                        <span className="bg-emerald-100 text-emerald-900 font-black px-2.5 py-1 rounded-md text-[10px] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PASS
                        </span>
                      ) : (
                        <span className="bg-rose-100 text-rose-900 font-black px-2.5 py-1 rounded-md text-[10px] inline-flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> FAIL
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resource Pack Import Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <FileJson className="w-5 h-5 text-teal-600" />
          <span>{t.importPack}</span>
        </h3>
        <p className="text-xs text-slate-500">
          Paste verified JSON resource pack provided by hackathon organizers to update eligibility rules and scheme records.
        </p>

        <textarea
          rows={5}
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          placeholder='{"schemes": [{"id": "VERIFIED-001", "name": "Official Welfare Scheme", ...}]}'
          className="w-full p-3.5 font-mono text-xs rounded-2xl border border-slate-300 focus:border-emerald-600 outline-none bg-slate-50"
        ></textarea>

        <div className="flex items-center justify-between">
          <button
            onClick={handleImportPack}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>{t.importBtn}</span>
          </button>

          {importStatus && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              {importStatus}
            </span>
          )}
        </div>
      </div>

      {/* Schemes Management Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-600" />
          <span>Registered Schemes ({schemes.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">ID</th>
                <th className="p-3">Scheme Name</th>
                <th className="p-3">Target Group</th>
                <th className="p-3">Rules Count</th>
                <th className="p-3">Source</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {schemes.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{s.id}</td>
                  <td className="p-3 font-bold">{s.name}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                      {s.targetGroup}
                    </span>
                  </td>
                  <td className="p-3">{s.eligibilityRules.length} rules</td>
                  <td className="p-3 text-slate-500">{s.source}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
