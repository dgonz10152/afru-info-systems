"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart2,
  Save,
} from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ClassStudent {
  id: string;
  studentNumber: string;
  name: string;
  program: string;
  email: string;
}

interface Assessment {
  id: string;
  name: string;
  type: "cat" | "assignment" | "exam";
  maxScore: number;
  weight: number; // percentage, e.g. 15
}

interface CourseClass {
  id: string;
  name: string;
  code: string;
  room: string;
  time: string;
  days: string;
  semester: string;
  students: ClassStudent[];
  assessments: Assessment[];
}

type AttendanceStatus = "present" | "absent" | "late";
// key: "YYYY-MM-DD" → studentId → status
type AttendanceStore = Record<string, Record<string, AttendanceStatus>>;
// studentId → assessmentId → score
type GradeStore = Record<string, Record<string, number | null>>;

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CLASSES: CourseClass[] = [
  {
    id: "CLS001",
    name: "Data Structures & Algorithms",
    code: "CS301",
    room: "Block A – Room 205",
    time: "9:00 AM – 11:00 AM",
    days: "Monday, Wednesday",
    semester: "Semester 1 – 2025/2026",
    assessments: [
      { id: "a1", name: "CAT 1",       type: "cat",        maxScore: 30, weight: 15 },
      { id: "a2", name: "CAT 2",       type: "cat",        maxScore: 30, weight: 15 },
      { id: "a3", name: "Assignment",  type: "assignment", maxScore: 20, weight: 20 },
      { id: "a4", name: "Final Exam",  type: "exam",       maxScore: 100, weight: 50 },
    ],
    students: [
      { id: "s1", studentNumber: "2023000045", name: "James Ssempijja", program: "BSc. Computer Science",        email: "james.s@aru.ac.ug" },
      { id: "s2", studentNumber: "2024000109", name: "Achieng Sarah",   program: "BSc. Computer Science",        email: "sarah.a@aru.ac.ug" },
      { id: "s3", studentNumber: "2023000082", name: "Peter Okello",    program: "BSc. Computer Science",        email: "peter.o@aru.ac.ug" },
      { id: "s4", studentNumber: "2022000055", name: "Faith Nakitto",   program: "BSc. Computer Science",        email: "faith.n@aru.ac.ug" },
      { id: "s5", studentNumber: "2024000078", name: "Moses Wafula",    program: "BSc. Computer Science",        email: "moses.w@aru.ac.ug" },
    ],
  },
  {
    id: "CLS002",
    name: "Systematic Theology",
    code: "TH201",
    room: "Block C – Room 302",
    time: "10:00 AM – 12:00 PM",
    days: "Monday, Wednesday, Friday",
    semester: "Semester 1 – 2025/2026",
    assessments: [
      { id: "a1", name: "CAT 1",      type: "cat",        maxScore: 30, weight: 15 },
      { id: "a2", name: "CAT 2",      type: "cat",        maxScore: 30, weight: 15 },
      { id: "a3", name: "Assignment", type: "assignment", maxScore: 20, weight: 20 },
      { id: "a4", name: "Final Exam", type: "exam",       maxScore: 100, weight: 50 },
    ],
    students: [
      { id: "s6",  studentNumber: "2023000082", name: "Mary Nalubega",   program: "BA. Theology", email: "mary.n@aru.ac.ug" },
      { id: "s7",  studentNumber: "2025000012", name: "Ruth Achieng",    program: "BA. Theology", email: "ruth.a@aru.ac.ug" },
      { id: "s8",  studentNumber: "2024000015", name: "Joseph Mugisha",  program: "BA. Theology", email: "joseph.m@aru.ac.ug" },
      { id: "s9",  studentNumber: "2025000376", name: "DANIEL Gonzalez", program: "BA. Theology", email: "daniel.g@aru.ac.ug" },
    ],
  },
  {
    id: "CLS003",
    name: "Strategic Management",
    code: "BA401",
    room: "Block A – Room 110",
    time: "8:00 AM – 10:00 AM",
    days: "Tuesday, Thursday",
    semester: "Semester 1 – 2025/2026",
    assessments: [
      { id: "a1", name: "CAT 1",      type: "cat",        maxScore: 30, weight: 15 },
      { id: "a2", name: "CAT 2",      type: "cat",        maxScore: 30, weight: 15 },
      { id: "a3", name: "Assignment", type: "assignment", maxScore: 20, weight: 20 },
      { id: "a4", name: "Final Exam", type: "exam",       maxScore: 100, weight: 50 },
    ],
    students: [
      { id: "s10", studentNumber: "2022000031", name: "Emmanuel Okot",    program: "BBA. Business Administration", email: "emmanuel.o@aru.ac.ug" },
      { id: "s11", studentNumber: "2021000088", name: "Agnes Nantongo",   program: "BBA. Business Administration", email: "agnes.n@aru.ac.ug" },
      { id: "s12", studentNumber: "2024000109", name: "Achieng Sarah",    program: "BBA. Business Administration", email: "sarah.a@aru.ac.ug" },
      { id: "s13", studentNumber: "2023000045", name: "Brian Ouma",       program: "BBA. Business Administration", email: "brian.o@aru.ac.ug" },
      { id: "s14", studentNumber: "2022000055", name: "Wafula Patrick",   program: "BBA. Business Administration", email: "wafula.p@aru.ac.ug" },
      { id: "s15", studentNumber: "2025000412", name: "GRACE Nakato",     program: "BBA. Business Administration", email: "grace.n@aru.ac.ug" },
    ],
  },
];

// Pre-seed attendance for CLS001
const INITIAL_ATTENDANCE: Record<string, AttendanceStore> = {
  CLS001: {
    "2026-03-02": { s1: "present", s2: "present", s3: "late",    s4: "absent",  s5: "present" },
    "2026-03-04": { s1: "present", s2: "absent",  s3: "present", s4: "present", s5: "late"    },
  },
  CLS002: {
    "2026-03-03": { s6: "present", s7: "present", s8: "present", s9: "absent" },
    "2026-03-05": { s6: "late",    s7: "present", s8: "absent",  s9: "present" },
  },
  CLS003: {
    "2026-03-03": { s10: "present", s11: "present", s12: "absent",  s13: "present", s14: "present", s15: "late"    },
    "2026-03-05": { s10: "present", s11: "late",    s12: "present", s13: "present", s14: "absent",  s15: "present" },
  },
};

// Pre-seed grades for CLS001
const INITIAL_GRADES: Record<string, GradeStore> = {
  CLS001: {
    s1: { a1: 26, a2: 24, a3: 18, a4: 82 },
    s2: { a1: 22, a2: 20, a3: 16, a4: 74 },
    s3: { a1: 18, a2: 21, a3: 14, a4: 68 },
    s4: { a1: 28, a2: 27, a3: 19, a4: 90 },
    s5: { a1: 15, a2: 16, a3: 12, a4: 55 },
  },
  CLS002: {
    s6:  { a1: 24, a2: 22, a3: 17, a4: 78 },
    s7:  { a1: 20, a2: 19, a3: 15, a4: 65 },
    s8:  { a1: 27, a2: 26, a3: 19, a4: 88 },
    s9:  { a1: 21, a2: 23, a3: 16, a4: 71 },
  },
  CLS003: {
    s10: { a1: 23, a2: 22, a3: 17, a4: 76 },
    s11: { a1: 19, a2: 18, a3: 14, a4: 62 },
    s12: { a1: 25, a2: 24, a3: 18, a4: 84 },
    s13: { a1: 17, a2: 20, a3: 13, a4: 59 },
    s14: { a1: 28, a2: 27, a3: 20, a4: 92 },
    s15: { a1: 22, a2: 21, a3: 16, a4: 73 },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TODAY = new Date().toISOString().slice(0, 10);

function letterGrade(pct: number): string {
  if (pct >= 80) return "A";
  if (pct >= 75) return "B+";
  if (pct >= 70) return "B";
  if (pct >= 65) return "C+";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}

function gradeColor(pct: number | null): string {
  if (pct === null) return "bg-gray-50";
  if (pct >= 70) return "bg-green-50";
  if (pct >= 50) return "bg-yellow-50";
  return "bg-red-50";
}

function cellScorePct(score: number | null, maxScore: number): number | null {
  return score === null ? null : (score / maxScore) * 100;
}

function computeWeightedAvg(grades: Record<string, number | null>, assessments: Assessment[]): number | null {
  let totalWeight = 0;
  let weightedSum = 0;
  let hasAny = false;
  for (const a of assessments) {
    const score = grades[a.id];
    if (score !== null && score !== undefined) {
      weightedSum += (score / a.maxScore) * 100 * a.weight;
      totalWeight += a.weight;
      hasAny = true;
    }
  }
  if (!hasAny || totalWeight === 0) return null;
  return weightedSum / totalWeight;
}

const ROSTER_COLUMNS = [
  { label: "Student No." },
  { label: "Name" },
  { label: "Program" },
  { label: "Email" },
  { label: "Status", className: "text-center" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ClassroomManagement() {
  const [classId, setClassId] = useState(CLASSES[0].id);
  const [tab, setTab] = useState<"roster" | "attendance" | "grades">("roster");

  // Attendance state (per class)
  const [attendanceStore, setAttendanceStore] = useState<Record<string, AttendanceStore>>(INITIAL_ATTENDANCE);
  const [attendanceDate, setAttendanceDate] = useState(TODAY);
  const [pendingAttendance, setPendingAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Grades state (per class)
  const [gradesStore, setGradesStore] = useState<Record<string, GradeStore>>(INITIAL_GRADES);
  const [pendingGrades, setPendingGrades] = useState<GradeStore>({});
  const [gradesSaved, setGradesSaved] = useState(false);

  const cls = CLASSES.find((c) => c.id === classId)!;

  // When class changes, reset tab and reload pending state
  useEffect(() => {
    setTab("roster");
    const savedForDate = attendanceStore[classId]?.[attendanceDate] ?? {};
    setPendingAttendance({ ...savedForDate });
    setPendingGrades({ ...(gradesStore[classId] ?? {}) });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  // When attendance date changes, reload pending
  useEffect(() => {
    const savedForDate = attendanceStore[classId]?.[attendanceDate] ?? {};
    setPendingAttendance({ ...savedForDate });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendanceDate, classId]);

  // When tab switches to grades, sync pending from store
  useEffect(() => {
    if (tab === "grades") {
      setPendingGrades({ ...(gradesStore[classId] ?? {}) });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  // ── Derived stats ──────────────────────────────────────────────────────────

  // Attendance rate: across all recorded dates for this class
  const classAttendance = attendanceStore[classId] ?? {};
  const allDates = Object.keys(classAttendance);
  const totalPossible = allDates.length * cls.students.length;
  const totalPresent = allDates.reduce((sum, d) => {
    return sum + Object.values(classAttendance[d]).filter((s) => s === "present").length;
  }, 0);
  const attendanceRate = totalPossible > 0 ? Math.round((totalPresent / totalPossible) * 100) : null;

  // Class average from saved grades
  const classGrades = gradesStore[classId] ?? {};
  const studentAvgs = cls.students.map((s) => computeWeightedAvg(classGrades[s.id] ?? {}, cls.assessments)).filter((v): v is number => v !== null);
  const classAvg = studentAvgs.length > 0 ? studentAvgs.reduce((a, b) => a + b, 0) / studentAvgs.length : null;

  // ── Attendance handlers ────────────────────────────────────────────────────

  const toggleAttendance = (studentId: string, status: AttendanceStatus) => {
    setPendingAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? (undefined as unknown as AttendanceStatus) : status,
    }));
  };

  const saveAttendance = () => {
    setAttendanceStore((prev) => ({
      ...prev,
      [classId]: { ...(prev[classId] ?? {}), [attendanceDate]: { ...pendingAttendance } },
    }));
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 2000);
  };

  const clearAttendance = () => setPendingAttendance({});

  const attendanceCounts = {
    present: cls.students.filter((s) => pendingAttendance[s.id] === "present").length,
    late:    cls.students.filter((s) => pendingAttendance[s.id] === "late").length,
    absent:  cls.students.filter((s) => pendingAttendance[s.id] === "absent").length,
    unmarked: cls.students.filter((s) => !pendingAttendance[s.id]).length,
  };

  // ── Grade handlers ─────────────────────────────────────────────────────────

  const setGrade = (studentId: string, assessmentId: string, value: string) => {
    const parsed = value === "" ? null : Number(value);
    setPendingGrades((prev) => ({
      ...prev,
      [studentId]: { ...(prev[studentId] ?? {}), [assessmentId]: parsed },
    }));
  };

  const saveGrades = () => {
    setGradesStore((prev) => ({ ...prev, [classId]: { ...pendingGrades } }));
    setGradesSaved(true);
    setTimeout(() => setGradesSaved(false), 2000);
  };

  // Class stats from pending grades
  const pendingAvgs = cls.students.map((s) => computeWeightedAvg(pendingGrades[s.id] ?? {}, cls.assessments)).filter((v): v is number => v !== null);
  const pendingClassMean = pendingAvgs.length > 0 ? pendingAvgs.reduce((a, b) => a + b, 0) / pendingAvgs.length : null;
  const pendingHighest = pendingAvgs.length > 0 ? Math.max(...pendingAvgs) : null;
  const pendingLowest  = pendingAvgs.length > 0 ? Math.min(...pendingAvgs) : null;
  const pendingPassRate = pendingAvgs.length > 0 ? Math.round((pendingAvgs.filter((v) => v >= 50).length / cls.students.length) * 100) : null;

  // Grade grid column template
  const gradeColTemplate = `200px ${cls.assessments.map(() => "80px").join(" ")} 100px 70px`;

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-blue-600 shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Classroom Manager</h2>
            <p className="text-xs text-gray-500">Manage attendance, grades, and class roster</p>
          </div>
        </div>
        {/* Class selector */}
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[280px]"
        >
          {CLASSES.map((c) => (
            <option key={c.id} value={c.id}>{c.code} — {c.name}</option>
          ))}
        </select>
      </div>

      {/* Class meta + summary cards */}
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 mb-5 items-start">
        <div className="bg-slate-50 border border-gray-200 rounded-lg px-4 py-3">
          <div className="text-xs text-gray-500 mb-1">{cls.code} · {cls.semester}</div>
          <div className="text-sm font-medium text-gray-900">{cls.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{cls.room} · {cls.days} · {cls.time}</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-center min-w-[110px]">
          <Users className="h-4 w-4 text-blue-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-blue-700">{cls.students.length}</div>
          <div className="text-xs text-blue-600">Enrolled</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center min-w-[110px]">
          <CheckCircle className="h-4 w-4 text-green-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-green-700">{attendanceRate !== null ? `${attendanceRate}%` : "—"}</div>
          <div className="text-xs text-green-600">Attendance</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 text-center min-w-[110px]">
          <BarChart2 className="h-4 w-4 text-purple-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-purple-700">{classAvg !== null ? `${classAvg.toFixed(1)}%` : "—"}</div>
          <div className="text-xs text-purple-600">Class Avg</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-4 border-b border-gray-200">
        {(["roster", "attendance", "grades"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-sm font-medium transition-colors -mb-px ${
              tab === t
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "roster" ? "Roster" : t === "attendance" ? "Attendance" : "Grades"}
          </button>
        ))}
      </div>

      {/* ── Roster Tab ── */}
      {tab === "roster" && (
        <DataGrid
          columns={ROSTER_COLUMNS}
          colTemplate="110px 1fr 1fr 1fr 80px"
          data={cls.students}
          getKey={(s) => s.id}
          pageSize={10}
          totalLabel="students"
          renderRow={(s) => (
            <>
              <div className="px-3 py-3 text-sm font-mono text-blue-700 flex items-center">{s.studentNumber}</div>
              <div className="px-3 py-3 text-sm font-medium text-gray-900 flex items-center">{s.name}</div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{s.program}</div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{s.email}</div>
              <div className="px-3 py-3 flex items-center justify-center">
                <span className="px-2 py-0.5 text-xs rounded font-medium bg-green-100 text-green-700">Active</span>
              </div>
            </>
          )}
        />
      )}

      {/* ── Attendance Tab ── */}
      {tab === "attendance" && (
        <div className="flex flex-col gap-4">
          {/* Date picker + actions */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-gray-600">Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex-1" />
            <button
              onClick={clearAttendance}
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={saveAttendance}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {attendanceSaved ? <><CheckCircle className="h-3.5 w-3.5" /> Saved</> : <><Save className="h-3.5 w-3.5" /> Save Attendance</>}
            </button>
          </div>

          {/* Attendance grid */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid bg-slate-100 border-b border-gray-200" style={{ gridTemplateColumns: "1fr 260px" }}>
              <div className="px-4 py-2.5 text-xs font-semibold text-gray-600">Student</div>
              <div className="px-4 py-2.5 text-xs font-semibold text-gray-600 text-center">Mark Attendance</div>
            </div>
            {cls.students.map((s) => {
              const status = pendingAttendance[s.id];
              return (
                <div key={s.id} className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors" style={{ gridTemplateColumns: "1fr 260px" }}>
                  <div className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.studentNumber}</div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => toggleAttendance(s.id, "present")}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        status === "present" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <CheckCircle className="h-3.5 w-3.5" /> Present
                    </button>
                    <button
                      onClick={() => toggleAttendance(s.id, "late")}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        status === "late" ? "bg-yellow-400 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <AlertTriangle className="h-3.5 w-3.5" /> Late
                    </button>
                    <button
                      onClick={() => toggleAttendance(s.id, "absent")}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        status === "absent" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <XCircle className="h-3.5 w-3.5" /> Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary strip */}
          <div className="flex items-center gap-4 px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm">
            <span className="flex items-center gap-1.5 text-green-700 font-medium"><CheckCircle className="h-3.5 w-3.5" /> Present: {attendanceCounts.present}</span>
            <span className="flex items-center gap-1.5 text-yellow-700 font-medium"><AlertTriangle className="h-3.5 w-3.5" /> Late: {attendanceCounts.late}</span>
            <span className="flex items-center gap-1.5 text-red-700 font-medium"><XCircle className="h-3.5 w-3.5" /> Absent: {attendanceCounts.absent}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">Not marked: {attendanceCounts.unmarked}</span>
          </div>
        </div>
      )}

      {/* ── Grades Tab ── */}
      {tab === "grades" && (
        <div className="flex flex-col gap-4">
          {/* Assessment legend */}
          <div className="flex items-center gap-2 flex-wrap">
            {cls.assessments.map((a) => (
              <span key={a.id} className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                a.type === "exam" ? "bg-purple-50 border-purple-200 text-purple-700"
                : a.type === "cat" ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-orange-50 border-orange-200 text-orange-700"
              }`}>
                {a.name} · /{a.maxScore} · {a.weight}%
              </span>
            ))}
            <div className="flex-1" />
            <button
              onClick={saveGrades}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {gradesSaved ? <><CheckCircle className="h-3.5 w-3.5" /> Saved</> : <><Save className="h-3.5 w-3.5" /> Save Grades</>}
            </button>
          </div>

          {/* Grade input grid */}
          <div className="border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
            {/* Header */}
            <div className="grid bg-slate-100 border-b border-gray-200" style={{ gridTemplateColumns: gradeColTemplate }}>
              <div className="px-4 py-2.5 text-xs font-semibold text-gray-600">Student</div>
              {cls.assessments.map((a) => (
                <div key={a.id} className="px-2 py-2.5 text-xs font-semibold text-gray-600 text-center">{a.name}</div>
              ))}
              <div className="px-2 py-2.5 text-xs font-semibold text-gray-600 text-center">Avg</div>
              <div className="px-2 py-2.5 text-xs font-semibold text-gray-600 text-center">Grade</div>
            </div>

            {/* Rows */}
            {cls.students.map((s) => {
              const studentGrades = pendingGrades[s.id] ?? {};
              const avg = computeWeightedAvg(studentGrades, cls.assessments);
              const grade = avg !== null ? letterGrade(avg) : "—";
              return (
                <div key={s.id} className="grid border-b border-gray-100 hover:bg-gray-50/50 transition-colors" style={{ gridTemplateColumns: gradeColTemplate }}>
                  <div className="px-4 py-2.5">
                    <div className="text-sm font-medium text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.studentNumber}</div>
                  </div>
                  {cls.assessments.map((a) => {
                    const score = studentGrades[a.id] ?? null;
                    const pct = cellScorePct(score, a.maxScore);
                    const isInvalid = score !== null && (score < 0 || score > a.maxScore);
                    return (
                      <div key={a.id} className={`px-1 py-2 flex items-center justify-center ${gradeColor(pct)}`}>
                        <input
                          type="number"
                          min={0}
                          max={a.maxScore}
                          value={score ?? ""}
                          onChange={(e) => setGrade(s.id, a.id, e.target.value)}
                          className={`w-14 text-center text-sm rounded border py-1 focus:outline-none focus:ring-1 bg-white ${
                            isInvalid ? "border-red-400 focus:ring-red-400" : "border-gray-200 focus:ring-blue-400"
                          }`}
                          placeholder="—"
                        />
                      </div>
                    );
                  })}
                  <div className={`px-2 py-2.5 text-sm font-semibold text-center flex items-center justify-center ${gradeColor(avg)}`}>
                    {avg !== null ? `${avg.toFixed(1)}%` : "—"}
                  </div>
                  <div className="px-2 py-2.5 flex items-center justify-center">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                      avg === null ? "text-gray-400" :
                      avg >= 70 ? "bg-green-100 text-green-800" :
                      avg >= 50 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>{grade}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Class stats strip */}
          <div className="flex items-center gap-6 px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm">
            <span className="text-gray-600">Highest: <span className="font-semibold text-gray-900">{pendingHighest !== null ? `${pendingHighest.toFixed(1)}%` : "—"}</span></span>
            <span className="text-gray-600">Lowest: <span className="font-semibold text-gray-900">{pendingLowest !== null ? `${pendingLowest.toFixed(1)}%` : "—"}</span></span>
            <span className="text-gray-600">Mean: <span className="font-semibold text-gray-900">{pendingClassMean !== null ? `${pendingClassMean.toFixed(1)}%` : "—"}</span></span>
            <span className="text-gray-600">Pass Rate: <span className="font-semibold text-gray-900">{pendingPassRate !== null ? `${pendingPassRate}%` : "—"}</span></span>
          </div>
        </div>
      )}
    </div>
  );
}
