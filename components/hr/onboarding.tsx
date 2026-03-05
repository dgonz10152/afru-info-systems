"use client";

import { useState } from "react";
import { FileText, Plus, CheckCircle, Loader2 } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

interface ContractTemplate {
  id: string;
  role: string;
  department: string;
  baseSalary: string;
  probation: string;
  duration: string;
  benefits: string[];
}

const TEMPLATES: ContractTemplate[] = [
  {
    id: "TPL001", role: "Lecturer", department: "Academic",
    baseSalary: "UGX 3,500,000", probation: "6 months", duration: "5 years",
    benefits: ["Medical insurance", "Housing allowance", "Research fund", "Annual leave (30 days)"],
  },
  {
    id: "TPL002", role: "Senior Lecturer", department: "Academic",
    baseSalary: "UGX 5,000,000", probation: "3 months", duration: "5 years",
    benefits: ["Medical insurance", "Housing allowance", "Research fund", "Sabbatical leave", "Annual leave (30 days)"],
  },
  {
    id: "TPL003", role: "Administrative Assistant", department: "Administration",
    baseSalary: "UGX 1,800,000", probation: "3 months", duration: "3 years",
    benefits: ["Medical insurance", "Transport allowance", "Annual leave (21 days)"],
  },
  {
    id: "TPL004", role: "IT Officer", department: "IT",
    baseSalary: "UGX 2,500,000", probation: "3 months", duration: "3 years",
    benefits: ["Medical insurance", "Transport allowance", "Training budget", "Annual leave (21 days)"],
  },
];

interface GeneratedContract {
  id: string;
  employeeName: string;
  role: string;
  generatedDate: string;
  status: "draft" | "signed";
}

const GENERATED_CONTRACTS: GeneratedContract[] = [
  { id: "GC001", employeeName: "David Ochieng", role: "Administrative Assistant", generatedDate: "2026-01-20", status: "signed" },
  { id: "GC002", employeeName: "Faith Nakibuuka", role: "Lecturer", generatedDate: "2026-01-25", status: "draft" },
];

const CONTRACT_COLUMNS = [
  { label: "ID" },
  { label: "Employee" },
  { label: "Role" },
  { label: "Generated" },
  { label: "Status" },
  { label: "Action" },
];

export function OnboardingContracts() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowForm(false);
      setSelectedTemplate(null);
    }, 2000);
  };

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Contract Generation</h2>
          <p className="text-xs text-gray-500">Automatically generate employment contracts from role-based templates</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Contract Templates</h3>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Generate New Contract
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {TEMPLATES.map((t) => (
          <div
            key={t.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedTemplate?.id === t.id
                ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                : "border-gray-200 hover:border-blue-300 hover:bg-slate-50"
            }`}
            onClick={() => setSelectedTemplate(t)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-800">{t.role}</h4>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{t.department}</span>
            </div>
            <div className="space-y-1 text-xs text-gray-600">
              <div>Base Salary: <span className="font-medium text-gray-800">{t.baseSalary}</span></div>
              <div>Probation: {t.probation} | Duration: {t.duration}</div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {t.benefits.map((b) => (
                <span key={b} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">{b}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Generate Contract</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Employee Name</label>
              <input type="text" placeholder="Enter name..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Role / Template</label>
              <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">Select template...</option>
                {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.role} - {t.department}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
              <input type="date" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Custom Salary (optional)</label>
              <input type="text" placeholder="Leave blank for template default" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleGenerate} disabled={isGenerating} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50">
              {isGenerating ? <><Loader2 className="h-4 w-4 animate-spin" />Generating...</> : "Generate Contract"}
            </button>
            <button onClick={() => { setShowForm(false); setSelectedTemplate(null); }} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <h3 className="text-sm font-semibold text-gray-700 mb-3">Recently Generated Contracts</h3>
      <DataGrid
        columns={CONTRACT_COLUMNS}
        colTemplate="60px 1fr 1fr 120px 100px 80px"
        data={GENERATED_CONTRACTS}
        getKey={(gc) => gc.id}
        totalLabel="contracts"
        renderRow={(gc) => (
          <>
            <div className="px-3 py-2.5 text-sm text-gray-600">{gc.id}</div>
            <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{gc.employeeName}</div>
            <div className="px-3 py-2.5 text-sm text-gray-600">{gc.role}</div>
            <div className="px-3 py-2.5 text-sm text-gray-600">{gc.generatedDate}</div>
            <div className="px-3 py-2.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium ${gc.status === "signed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {gc.status === "signed" ? <CheckCircle className="h-3 w-3" /> : null}
                {gc.status.charAt(0).toUpperCase() + gc.status.slice(1)}
              </span>
            </div>
            <div className="px-3 py-2.5 text-sm text-blue-600 hover:underline cursor-pointer">Download</div>
          </>
        )}
      />
    </div>
  );
}
