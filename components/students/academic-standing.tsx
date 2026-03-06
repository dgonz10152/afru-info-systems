"use client";

import { useState, useMemo } from "react";
import { RefreshCw, AlertTriangle, Search, X, Check, BookOpen, User, Calendar, FileText } from "lucide-react";
import { DataGrid, GridColumn } from "@/components/ui/data-grid";

// ─── Types ───────────────────────────────────────────────────────────────────

export type RetakeStatus = "in-progress" | "passed" | "failed" | "pending";

export interface RetakeRecord {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  courseCode: string;
  courseName: string;
  originalGrade: string;
  originalScore: number;
  retakeAttempt: number;
  semester: string;
  retakeScore: number | null;
  retakeGrade: string | null;
  status: RetakeStatus;
}

export type ProbationStatus = "active" | "cleared" | "dismissed" | "warning";

export interface ProbationRecord {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  year: number;
  cgpa: number;
  threshold: number;
  semestersOnProbation: number;
  placedDate: string;
  reviewDate: string;
  status: ProbationStatus;
  notes: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_RETAKES: RetakeRecord[] = [
  {
    id: "RT001", studentId: "STU001", studentName: "James Ssempijja", program: "BSc. Computer Science",
    courseCode: "CS201", courseName: "Calculus for Computing", originalGrade: "F", originalScore: 38,
    retakeAttempt: 1, semester: "Semester 1 2025/2026", retakeScore: 62, retakeGrade: "C", status: "passed",
  },
  {
    id: "RT002", studentId: "STU001", studentName: "James Ssempijja", program: "BSc. Computer Science",
    courseCode: "CS202", courseName: "Discrete Mathematics", originalGrade: "D", originalScore: 48,
    retakeAttempt: 1, semester: "Semester 2 2025/2026", retakeScore: null, retakeGrade: null, status: "in-progress",
  },
  {
    id: "RT003", studentId: "STU002", studentName: "Mary Nalubega", program: "BA. Theology",
    courseCode: "TH101", courseName: "Introduction to Philosophy", originalGrade: "F", originalScore: 32,
    retakeAttempt: 1, semester: "Semester 1 2025/2026", retakeScore: 45, retakeGrade: "D", status: "failed",
  },
  {
    id: "RT004", studentId: "STU002", studentName: "Mary Nalubega", program: "BA. Theology",
    courseCode: "TH101", courseName: "Introduction to Philosophy", originalGrade: "F", originalScore: 32,
    retakeAttempt: 2, semester: "Semester 2 2025/2026", retakeScore: null, retakeGrade: null, status: "pending",
  },
  {
    id: "RT005", studentId: "STU003", studentName: "Emmanuel Okot", program: "BBA. Business Administration",
    courseCode: "BA101", courseName: "Principles of Accounting", originalGrade: "F", originalScore: 40,
    retakeAttempt: 1, semester: "Semester 1 2025/2026", retakeScore: 71, retakeGrade: "B", status: "passed",
  },
  {
    id: "RT006", studentId: "STU004", studentName: "Peter Okello", program: "BSc. Computer Science",
    courseCode: "CS103", courseName: "Programming Fundamentals", originalGrade: "D", originalScore: 49,
    retakeAttempt: 1, semester: "Semester 2 2025/2026", retakeScore: null, retakeGrade: null, status: "in-progress",
  },
  {
    id: "RT007", studentId: "STU005", studentName: "Faith Nakitto", program: "BSc. Computer Science",
    courseCode: "CS201", courseName: "Calculus for Computing", originalGrade: "F", originalScore: 35,
    retakeAttempt: 1, semester: "Semester 1 2025/2026", retakeScore: 52, retakeGrade: "C+", status: "passed",
  },
  {
    id: "RT008", studentId: "STU008", studentName: "Ruth Achieng", program: "BA. Theology",
    courseCode: "TH102", courseName: "Old Testament Survey", originalGrade: "F", originalScore: 41,
    retakeAttempt: 1, semester: "Semester 2 2025/2026", retakeScore: null, retakeGrade: null, status: "pending",
  },
];

export const MOCK_PROBATION: ProbationRecord[] = [
  {
    id: "PR001", studentId: "STU009", studentName: "Joseph Mugisha", program: "BA. Theology",
    year: 2, cgpa: 1.5, threshold: 2.0, semestersOnProbation: 2,
    placedDate: "2025-02-01", reviewDate: "2026-06-30", status: "active",
    notes: "Student has been counselled. Attending remedial sessions.",
  },
  {
    id: "PR002", studentId: "STU004", studentName: "Peter Okello", program: "BSc. Computer Science",
    year: 3, cgpa: 1.8, threshold: 2.0, semestersOnProbation: 1,
    placedDate: "2025-09-01", reviewDate: "2026-02-28", status: "warning",
    notes: "First semester on probation. Performance improving.",
  },
  {
    id: "PR003", studentId: "STU010", studentName: "Agnes Nantongo", program: "BBA. Business Administration",
    year: 2, cgpa: 1.2, threshold: 2.0, semestersOnProbation: 3,
    placedDate: "2024-09-01", reviewDate: "2025-12-31", status: "dismissed",
    notes: "Failed to meet improvement targets after 3 semesters. Case forwarded to academic board.",
  },
  {
    id: "PR004", studentId: "STU005", studentName: "Faith Nakitto", program: "BSc. Computer Science",
    year: 2, cgpa: 1.9, threshold: 2.0, semestersOnProbation: 1,
    placedDate: "2025-09-01", reviewDate: "2026-02-28", status: "active",
    notes: "Retaking two courses. Meeting with advisor bi-weekly.",
  },
  {
    id: "PR005", studentId: "STU008", studentName: "Ruth Achieng", program: "BA. Theology",
    year: 1, cgpa: 1.7, threshold: 2.0, semestersOnProbation: 1,
    placedDate: "2025-09-01", reviewDate: "2026-02-28", status: "warning",
    notes: "New student struggling with transition. Extra tutoring arranged.",
  },
  {
    id: "PR006", studentId: "STU011", studentName: "Moses Wafula", program: "BSc. Computer Science",
    year: 3, cgpa: 2.1, threshold: 2.0, semestersOnProbation: 2,
    placedDate: "2025-02-01", reviewDate: "2026-01-31", status: "cleared",
    notes: "Successfully raised CGPA above threshold. Probation lifted.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const RETAKE_STATUS_STYLE: Record<RetakeStatus, string> = {
  "in-progress": "bg-blue-100 text-blue-700",
  passed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

export const RETAKE_STATUS_LABEL: Record<RetakeStatus, string> = {
  "in-progress": "In Progress",
  passed: "Passed",
  failed: "Failed",
  pending: "Pending",
};

export const PROBATION_STATUS_STYLE: Record<ProbationStatus, string> = {
  active: "bg-red-100 text-red-700",
  cleared: "bg-green-100 text-green-700",
  dismissed: "bg-gray-200 text-gray-600",
  warning: "bg-yellow-100 text-yellow-700",
};

export const PROBATION_STATUS_LABEL: Record<ProbationStatus, string> = {
  active: "Active",
  cleared: "Cleared",
  dismissed: "Dismissed",
  warning: "Warning",
};

const PROGRAMS = ["BSc. Computer Science", "BA. Theology", "BBA. Business Administration"];

// ─── CourseRetakes ────────────────────────────────────────────────────────────

const RETAKE_COLUMNS: GridColumn[] = [
  { label: "Student ID" },
  { label: "Student Name" },
  { label: "Course" },
  { label: "Attempt" },
  { label: "Original" },
  { label: "Retake" },
  { label: "Grade" },
  { label: "Semester" },
  { label: "Status" },
];

function RetakeDetail({ record, onClose }: { record: RetakeRecord; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-[480px]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Retake Record — {record.courseCode}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{record.courseName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-gray-100 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><User className="h-3 w-3" /> Student</div>
              <div className="text-sm font-medium text-gray-800">{record.studentName}</div>
              <div className="text-xs text-gray-500">{record.studentId}</div>
            </div>
            <div className="bg-slate-50 border border-gray-100 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><BookOpen className="h-3 w-3" /> Program</div>
              <div className="text-sm font-medium text-gray-800">{record.program}</div>
            </div>
            <div className="bg-slate-50 border border-gray-100 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Original Attempt</div>
              <div className="text-sm font-medium text-gray-800">Grade: <span className="text-red-600 font-semibold">{record.originalGrade}</span></div>
              <div className="text-xs text-gray-500">Score: {record.originalScore}/100</div>
            </div>
            <div className="bg-slate-50 border border-gray-100 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Retake Attempt #{record.retakeAttempt}</div>
              {record.retakeScore !== null ? (
                <>
                  <div className="text-sm font-medium text-gray-800">Grade: <span className="text-green-700 font-semibold">{record.retakeGrade}</span></div>
                  <div className="text-xs text-gray-500">Score: {record.retakeScore}/100</div>
                </>
              ) : (
                <div className="text-sm text-gray-400 italic">Not yet sat</div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {record.semester}</span>
            <span className={`px-2 py-0.5 text-xs rounded font-medium ${RETAKE_STATUS_STYLE[record.status]}`}>
              {RETAKE_STATUS_LABEL[record.status]}
            </span>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function CourseRetakes() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RetakeStatus>("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [selected, setSelected] = useState<RetakeRecord | null>(null);

  const filtered = useMemo(() => {
    return MOCK_RETAKES.filter((r) => {
      const matchSearch =
        r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.courseCode.toLowerCase().includes(search.toLowerCase()) ||
        r.courseName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      const matchProgram = programFilter === "all" || r.program === programFilter;
      return matchSearch && matchStatus && matchProgram;
    });
  }, [search, statusFilter, programFilter]);

  const total = MOCK_RETAKES.length;
  const inProgress = MOCK_RETAKES.filter((r) => r.status === "in-progress").length;
  const passed = MOCK_RETAKES.filter((r) => r.status === "passed").length;
  const failed = MOCK_RETAKES.filter((r) => r.status === "failed").length;

  return (
    <div className="p-6 flex flex-col h-full bg-white">
      {selected && <RetakeDetail record={selected} onClose={() => setSelected(null)} />}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <RefreshCw className="h-6 w-6 text-blue-600" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">Course Retakes</h2>
          <p className="text-xs text-gray-500">Track students retaking courses and their outcomes</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">{total} Total</span>
          <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">{inProgress} In Progress</span>
          <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">{passed} Passed</span>
          <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">{failed} Failed</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or course code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | RetakeStatus)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="in-progress">In Progress</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Programs</option>
          {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0">
        <DataGrid
          columns={RETAKE_COLUMNS}
          colTemplate="90px 1fr 1fr 70px 80px 70px 70px 160px 110px"
          data={filtered}
          getKey={(r) => r.id}
          pageSize={8}
          totalLabel="retake records"
          emptyMessage="No retake records match the current filters."
          onRowClick={(r) => setSelected(r)}
          renderRow={(r) => (
            <>
              <div className="px-3 py-2.5 text-sm text-gray-500">{r.studentId}</div>
              <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{r.studentName}</div>
              <div className="px-3 py-2.5 text-sm text-gray-700">
                <span className="font-medium text-blue-600">{r.courseCode}</span>
                <span className="text-gray-500 ml-1 text-xs truncate block">{r.courseName}</span>
              </div>
              <div className="px-3 py-2.5 text-sm text-gray-600 text-center">#{r.retakeAttempt}</div>
              <div className="px-3 py-2.5 text-sm">
                <span className="text-red-600 font-semibold">{r.originalGrade}</span>
                <span className="text-gray-400 text-xs ml-1">({r.originalScore})</span>
              </div>
              <div className="px-3 py-2.5 text-sm">
                {r.retakeScore !== null
                  ? <><span className="text-green-700 font-semibold">{r.retakeGrade}</span><span className="text-gray-400 text-xs ml-1">({r.retakeScore})</span></>
                  : <span className="text-gray-300">—</span>}
              </div>
              <div className="px-3 py-2.5 text-sm text-gray-600">
                {r.retakeGrade ?? <span className="text-gray-300">—</span>}
              </div>
              <div className="px-3 py-2.5 text-xs text-gray-500">{r.semester}</div>
              <div className="px-3 py-2.5">
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${RETAKE_STATUS_STYLE[r.status]}`}>
                  {RETAKE_STATUS_LABEL[r.status]}
                </span>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}

// ─── AcademicProbation ────────────────────────────────────────────────────────

const PROBATION_COLUMNS: GridColumn[] = [
  { label: "Student ID" },
  { label: "Name" },
  { label: "Program" },
  { label: "Year" },
  { label: "CGPA" },
  { label: "Threshold" },
  { label: "Semesters" },
  { label: "Review Date" },
  { label: "Status" },
];

function ProbationDetail({
  record,
  threshold,
  onClose,
  onUpdate,
}: {
  record: ProbationRecord;
  threshold: number;
  onClose: () => void;
  onUpdate: (id: string, status: ProbationStatus, notes: string) => void;
}) {
  const [notes, setNotes] = useState(record.notes);
  const [status, setStatus] = useState<ProbationStatus>(record.status);
  const [saved, setSaved] = useState(false);

  function handleUpdate() {
    onUpdate(record.id, status, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  // Dummy CGPA history for sparkline
  const cgpaHistory = [1.0, 1.3, 1.5, record.cgpa];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-[520px] max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Probation Record — {record.studentName}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{record.studentId} · {record.program}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-4">
          {/* Info cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-gray-100 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Current CGPA</div>
              <div className={`text-2xl font-bold ${record.cgpa < threshold ? "text-red-600" : "text-green-700"}`}>
                {record.cgpa.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">Threshold: {threshold.toFixed(1)}</div>
            </div>
            <div className="bg-slate-50 border border-gray-100 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Semesters on Probation</div>
              <div className="text-2xl font-bold text-orange-500">{record.semestersOnProbation}</div>
            </div>
            <div className="bg-slate-50 border border-gray-100 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Year of Study</div>
              <div className="text-2xl font-bold text-gray-700">Year {record.year}</div>
            </div>
          </div>

          {/* CGPA trend (simple bar sparkline) */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" /> CGPA Trend (last 4 semesters)
            </div>
            <div className="flex items-end gap-2 h-12">
              {cgpaHistory.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-sm ${val < threshold ? "bg-red-300" : "bg-green-400"}`}
                    style={{ height: `${(val / 4.0) * 100}%` }}
                  />
                  <span className="text-xs text-gray-400">{val.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">Placed:</span>
              <span>{record.placedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">Review:</span>
              <span>{record.reviewDate}</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Advisor Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Status update */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-gray-600 whitespace-nowrap">Update Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProbationStatus)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="active">Active</option>
              <option value="warning">Warning</option>
              <option value="cleared">Cleared</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-200 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {saved ? <><Check className="h-4 w-4" /> Saved</> : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AcademicProbation() {
  const [threshold, setThreshold] = useState(2.0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ProbationStatus>("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [records, setRecords] = useState<ProbationRecord[]>(MOCK_PROBATION);
  const [selected, setSelected] = useState<ProbationRecord | null>(null);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.studentId.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      const matchProgram = programFilter === "all" || r.program === programFilter;
      return matchSearch && matchStatus && matchProgram;
    });
  }, [records, search, statusFilter, programFilter]);

  const activeCount = records.filter((r) => r.status === "active").length;
  const clearedCount = records.filter((r) => r.status === "cleared").length;
  const dismissedCount = records.filter((r) => r.status === "dismissed").length;
  const atRiskCount = records.filter((r) => r.cgpa < threshold && r.status !== "active" && r.status !== "dismissed").length;

  function handleUpdate(id: string, status: ProbationStatus, notes: string) {
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status, notes } : r));
    setSelected((prev) => prev && prev.id === id ? { ...prev, status, notes } : prev);
  }

  return (
    <div className="p-6 flex flex-col h-full bg-white">
      {selected && (
        <ProbationDetail
          record={selected}
          threshold={threshold}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <AlertTriangle className="h-6 w-6 text-orange-500" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">Academic Probation</h2>
          <p className="text-xs text-gray-500">Monitor students below the CGPA threshold and manage their probation status</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 font-medium whitespace-nowrap">Probation Threshold:</label>
          <input
            type="number"
            min={0}
            max={4.0}
            step={0.1}
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value) || 0)}
            className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-center font-semibold"
          />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">{activeCount}</div>
          <div className="text-xs text-red-500 font-medium mt-0.5">On Probation</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{clearedCount}</div>
          <div className="text-xs text-green-600 font-medium mt-0.5">Cleared</div>
        </div>
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-600">{dismissedCount}</div>
          <div className="text-xs text-gray-500 font-medium mt-0.5">Dismissed</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-600">{atRiskCount}</div>
          <div className="text-xs text-yellow-600 font-medium mt-0.5">At-Risk (CGPA &lt; {threshold.toFixed(1)})</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | ProbationStatus)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="warning">Warning</option>
          <option value="cleared">Cleared</option>
          <option value="dismissed">Dismissed</option>
        </select>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Programs</option>
          {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0">
        <DataGrid
          columns={PROBATION_COLUMNS}
          colTemplate="90px 1fr 1fr 60px 80px 90px 100px 110px 90px"
          data={filtered}
          getKey={(r) => r.id}
          pageSize={8}
          totalLabel="students"
          emptyMessage="No probation records match the current filters."
          onRowClick={(r) => setSelected(r)}
          renderRow={(r) => (
            <>
              <div className="px-3 py-2.5 text-sm text-gray-500">{r.studentId}</div>
              <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{r.studentName}</div>
              <div className="px-3 py-2.5 text-sm text-gray-600 truncate">{r.program}</div>
              <div className="px-3 py-2.5 text-sm text-gray-600 text-center">Yr {r.year}</div>
              <div className="px-3 py-2.5 text-sm font-bold text-center">
                <span className={r.cgpa < threshold ? "text-red-600" : "text-green-700"}>
                  {r.cgpa.toFixed(2)}
                </span>
              </div>
              <div className="px-3 py-2.5 text-sm text-gray-500 text-center">{r.threshold.toFixed(1)}</div>
              <div className="px-3 py-2.5 text-sm text-gray-600 text-center">{r.semestersOnProbation}</div>
              <div className="px-3 py-2.5 text-xs text-gray-500">{r.reviewDate}</div>
              <div className="px-3 py-2.5">
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${PROBATION_STATUS_STYLE[r.status]}`}>
                  {PROBATION_STATUS_LABEL[r.status]}
                </span>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}
