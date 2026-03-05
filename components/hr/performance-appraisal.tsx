"use client";

import { useState } from "react";
import { ClipboardCheck, CheckCircle, AlertTriangle, Clock, X } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

interface AppraisalRecord {
  id: string;
  staffName: string;
  staffId: string;
  period: string;
  lecturerStatus: "pending" | "submitted";
  supervisorStatus: "pending" | "submitted";
  reconciled: boolean;
  disagreement: boolean;
  lecturerScores: { criteria: string; score: number }[];
  supervisorScores: { criteria: string; score: number }[];
}

const TEACHING_CRITERIA = [
  "Course Preparation & Delivery",
  "Student Engagement",
  "Assessment Quality",
  "Research Output",
  "Community Service",
  "Professional Development",
];

const ADMIN_CRITERIA = [
  "Job Knowledge & Competence",
  "Quality of Work",
  "Communication Skills",
  "Teamwork & Collaboration",
  "Attendance & Punctuality",
  "Initiative & Problem Solving",
];

const MOCK_TEACHING_APPRAISALS: AppraisalRecord[] = [
  {
    id: "AP001", staffName: "Dr. Sarah Namukasa", staffId: "EMP001",
    period: "Semester 1 - 2025/2026",
    lecturerStatus: "submitted", supervisorStatus: "submitted",
    reconciled: true, disagreement: false,
    lecturerScores: TEACHING_CRITERIA.map((c, i) => ({ criteria: c, score: [8, 7, 9, 7, 6, 8][i] })),
    supervisorScores: TEACHING_CRITERIA.map((c, i) => ({ criteria: c, score: [8, 8, 8, 7, 7, 8][i] })),
  },
  {
    id: "AP002", staffName: "Prof. Daniel Mukasa", staffId: "EMP002",
    period: "Semester 1 - 2025/2026",
    lecturerStatus: "submitted", supervisorStatus: "submitted",
    reconciled: false, disagreement: true,
    lecturerScores: TEACHING_CRITERIA.map((c, i) => ({ criteria: c, score: [9, 9, 8, 9, 7, 8][i] })),
    supervisorScores: TEACHING_CRITERIA.map((c, i) => ({ criteria: c, score: [7, 6, 7, 7, 6, 7][i] })),
  },
  {
    id: "AP003", staffName: "Dr. Grace Atuhaire", staffId: "EMP004",
    period: "Semester 1 - 2025/2026",
    lecturerStatus: "submitted", supervisorStatus: "pending",
    reconciled: false, disagreement: false,
    lecturerScores: TEACHING_CRITERIA.map((c, i) => ({ criteria: c, score: [7, 8, 7, 6, 8, 7][i] })),
    supervisorScores: [],
  },
];

const MOCK_ADMIN_APPRAISALS: AppraisalRecord[] = [
  {
    id: "AP004", staffName: "Agnes Birungi", staffId: "EMP003",
    period: "2025/2026 Annual",
    lecturerStatus: "submitted", supervisorStatus: "submitted",
    reconciled: true, disagreement: false,
    lecturerScores: ADMIN_CRITERIA.map((c, i) => ({ criteria: c, score: [8, 9, 7, 8, 9, 7][i] })),
    supervisorScores: ADMIN_CRITERIA.map((c, i) => ({ criteria: c, score: [8, 8, 7, 8, 9, 8][i] })),
  },
];

const SCORES_COLUMNS = [
  { label: "Criteria" },
  { label: "Self Score", className: "text-center" },
  { label: "Supervisor", className: "text-center" },
  { label: "Diff", className: "text-center" },
];

function AppraisalDetailModal({ appraisal, onClose, criteria }: { appraisal: AppraisalRecord; onClose: () => void; criteria: string[] }) {
  const scoreRows = criteria.map((c, i) => ({
    id: `${appraisal.id}-${i}`,
    criteria: c,
    selfScore: appraisal.lecturerScores[i]?.score ?? null,
    supScore: appraisal.supervisorScores[i]?.score ?? null,
  }));

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{appraisal.staffName}</h3>
            <p className="text-sm text-gray-500">{appraisal.period}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="p-5">
          {appraisal.disagreement && !appraisal.reconciled && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div>
                <span className="text-sm font-medium text-amber-800">Scores in disagreement.</span>
                <span className="text-sm text-amber-700 ml-1">HR reconciliation required.</span>
              </div>
              <button className="ml-auto px-3 py-1 bg-amber-600 text-white text-xs rounded-lg hover:bg-amber-700 transition-colors font-medium">Reconcile</button>
            </div>
          )}

          <DataGrid
            columns={SCORES_COLUMNS}
            colTemplate="1fr 100px 100px 80px"
            data={scoreRows}
            getKey={(r) => r.id}
            renderRow={(r) => {
              const diff = r.selfScore !== null && r.supScore !== null ? r.selfScore - r.supScore : null;
              return (
                <>
                  <div className="px-3 py-2.5 text-sm text-gray-700">{r.criteria}</div>
                  <div className="px-3 py-2.5 text-sm text-gray-800 text-center font-medium">
                    {r.selfScore !== null ? `${r.selfScore}/10` : "-"}
                  </div>
                  <div className="px-3 py-2.5 text-sm text-gray-800 text-center font-medium">
                    {r.supScore !== null ? `${r.supScore}/10` : "Pending"}
                  </div>
                  <div className="px-3 py-2.5 text-sm text-center font-medium">
                    {diff !== null ? (
                      <span className={Math.abs(diff) > 2 ? "text-red-600" : diff !== 0 ? "text-amber-600" : "text-green-600"}>
                        {diff > 0 ? `+${diff}` : diff}
                      </span>
                    ) : "-"}
                  </div>
                </>
              );
            }}
          />

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <div className="text-xs text-blue-600 mb-1">Self-Assessment Average</div>
              <div className="text-xl font-bold text-blue-700">
                {appraisal.lecturerScores.length > 0
                  ? (appraisal.lecturerScores.reduce((s, sc) => s + sc.score, 0) / appraisal.lecturerScores.length).toFixed(1)
                  : "-"}/10
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <div className="text-xs text-green-600 mb-1">Supervisor Average</div>
              <div className="text-xl font-bold text-green-700">
                {appraisal.supervisorScores.length > 0
                  ? (appraisal.supervisorScores.reduce((s, sc) => s + sc.score, 0) / appraisal.supervisorScores.length).toFixed(1)
                  : "Pending"}{appraisal.supervisorScores.length > 0 ? "/10" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const APPRAISAL_COLUMNS = [
  { label: "ID" },
  { label: "Staff" },
  { label: "Period" },
  { label: "Self-Eval" },
  { label: "Supervisor" },
  { label: "Status" },
  { label: "View" },
];

function AppraisalTable({ records, criteria }: { records: AppraisalRecord[]; criteria: string[] }) {
  const [viewAppraisal, setViewAppraisal] = useState<AppraisalRecord | null>(null);

  return (
    <>
      <DataGrid
        columns={APPRAISAL_COLUMNS}
        colTemplate="60px 1fr 1fr 110px 110px 100px 80px"
        data={records}
        getKey={(a) => a.id}
        totalLabel="records"
        renderRow={(a) => (
          <>
            <div className="px-3 py-2.5 text-sm text-gray-600">{a.id}</div>
            <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{a.staffName}</div>
            <div className="px-3 py-2.5 text-sm text-gray-600">{a.period}</div>
            <div className="px-3 py-2.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium ${a.lecturerStatus === "submitted" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {a.lecturerStatus === "submitted" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                {a.lecturerStatus === "submitted" ? "Done" : "Pending"}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium ${a.supervisorStatus === "submitted" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {a.supervisorStatus === "submitted" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                {a.supervisorStatus === "submitted" ? "Done" : "Pending"}
              </span>
            </div>
            <div className="px-3 py-2.5">
              {a.disagreement && !a.reconciled ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium bg-red-100 text-red-700">
                  <AlertTriangle className="h-3 w-3" /> Disagree
                </span>
              ) : a.reconciled ? (
                <span className="px-2 py-0.5 text-xs rounded font-medium bg-green-100 text-green-700">Reconciled</span>
              ) : (
                <span className="px-2 py-0.5 text-xs rounded font-medium bg-gray-100 text-gray-500">In Progress</span>
              )}
            </div>
            <div className="px-3 py-2.5">
              <button
                onClick={(e) => { e.stopPropagation(); setViewAppraisal(a); }}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                View
              </button>
            </div>
          </>
        )}
      />
      {viewAppraisal && <AppraisalDetailModal appraisal={viewAppraisal} onClose={() => setViewAppraisal(null)} criteria={criteria} />}
    </>
  );
}

export function TeachingAppraisal() {
  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <ClipboardCheck className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Teaching Staff Appraisal</h2>
          <p className="text-xs text-gray-500">Semesterly evaluation -- both lecturer self-assessment and supervisor review</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{MOCK_TEACHING_APPRAISALS.filter(a => a.reconciled).length}</div>
          <div className="text-xs text-green-600 mt-1">Reconciled</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-700">{MOCK_TEACHING_APPRAISALS.filter(a => a.disagreement && !a.reconciled).length}</div>
          <div className="text-xs text-amber-600 mt-1">Needs Reconciliation</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-700">{MOCK_TEACHING_APPRAISALS.filter(a => a.supervisorStatus === "pending").length}</div>
          <div className="text-xs text-gray-500 mt-1">Awaiting Supervisor</div>
        </div>
      </div>

      <AppraisalTable records={MOCK_TEACHING_APPRAISALS} criteria={TEACHING_CRITERIA} />
    </div>
  );
}

export function AdminAppraisal() {
  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <ClipboardCheck className="h-6 w-6 text-purple-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Administrative Staff Appraisal</h2>
          <p className="text-xs text-gray-500">Annual evaluation -- HR evaluates administrative staff performance</p>
        </div>
      </div>

      <AppraisalTable records={MOCK_ADMIN_APPRAISALS} criteria={ADMIN_CRITERIA} />
    </div>
  );
}
