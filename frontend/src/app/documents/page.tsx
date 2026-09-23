"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context";
import { Printer, CheckSquare, Square, FileText, Info } from "lucide-react";

export default function DocumentsPage() {
  const { results, language, t, easyMode } = useApp();

  const docList = language === "ml"
    ? (results?.combinedDocuments_ml || [
        "മത്സ്യത്തൊഴിലാളി ക്ഷേമനിധി ബോർഡ് പാസ്ബുക്ക്",
        "തോട്ടം തൊഴിലാളി ക്ഷേമനിധി പാസ്ബുക്ക്",
        "ആധാർ കാർഡ് പകർപ്പ്",
        "റേഷൻ കാർഡ് (മുൻഗണനാ കാർഡ്)",
        "ബാങ്ക് പാസ്ബുക്ക് പകർപ്പ്",
        "വരുമാന സർട്ടിഫിക്കറ്റ് (വില്ലേജ് ഓഫീസ്)"
      ])
    : (results?.combinedDocuments || [
        "Fishermen Welfare Board Passbook",
        "Plantation Labour Welfare Fund Passbook",
        "Aadhaar Card Copy",
        "Ration Card (Priority Category)",
        "Bank Passbook Copy",
        "Income Certificate (Village Officer)"
      ]);

  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({});

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={`font-extrabold text-slate-900 ${easyMode ? "text-3xl" : "text-2xl sm:text-3xl"}`}>
            {t.docsTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {t.docsSub}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-md transition"
        >
          <Printer className="w-4 h-4" />
          <span>{t.downloadChecklist}</span>
        </button>
      </div>

      {/* Printable Checklist Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 print:shadow-none print:border-none">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>SAHAYA Household Document Checklist</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Total: {docList.length} items
          </span>
        </div>

        <div className="space-y-3">
          {docList.map((doc, idx) => {
            const isChecked = !!checkedDocs[doc];
            return (
              <div
                key={idx}
                onClick={() => toggleDoc(doc)}
                className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                  isChecked
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <span className="text-sm">{doc}</span>
              </div>
            );
          })}
        </div>

        {/* Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900 font-medium">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>{t.docDisclaimer}</span>
        </div>
      </div>
    </div>
  );
}
