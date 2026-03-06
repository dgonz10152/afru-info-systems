"use client";

import { useState } from "react";
import {
  ClipboardList,
  ArrowLeft,
  Plus,
  CheckCircle,
  Clock,
  User,
  Trash2,
  X,
} from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

// --- Types ---
interface ApplicationEntry {
  id: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
  programCode: string;
  program: string;
  studyTime: "Day" | "Evening" | "Weekend";
  admissionDate: string;
  admissionYear: number;
  registrationNumber: string;
  campus: string;
  scheme: string;
  admissionNo: number;
  admissionCategory: string;
  status: "draft" | "submitted";
  createdAt: string;
}

// --- Reference Data ---
const PROGRAMS: { code: string; name: string }[] = [
  { code: "BBAD", name: "Bachelor of Business Administration" },
  { code: "BCS", name: "Bachelor of Computer Science" },
  { code: "BED", name: "Bachelor of Education" },
  { code: "BTHEO", name: "Bachelor of Theology" },
  { code: "BNSG", name: "Bachelor of Nursing Science" },
  { code: "BLA", name: "Bachelor of Laws" },
];

const STUDY_TIMES = ["Day", "Evening", "Weekend"] as const;
const CAMPUSES = ["Main Campus", "City Campus", "Online"];
const SCHEMES = ["Full Fee", "40% Discount", "50% Discount", "Government Sponsored", "Scholarship"];
const ADMISSION_CATEGORIES = ["August Intake", "January Intake", "May Intake"];

// --- Mock Seed Data ---
const INITIAL_APPLICATIONS: ApplicationEntry[] = [
  {
    id: "1",
    studentNumber: "2025000376",
    firstName: "DANIEL",
    lastName: "Gonzalez",
    programCode: "BBAD",
    program: "Bachelor of Business Administration",
    studyTime: "Day",
    admissionDate: "2025-08-25",
    admissionYear: 2025,
    registrationNumber: "25/376BBA/AP/USA",
    campus: "Main Campus",
    scheme: "40% Discount",
    admissionNo: 1,
    admissionCategory: "August Intake",
    status: "submitted",
    createdAt: "2025-08-25",
  },
  {
    id: "2",
    studentNumber: "2025000412",
    firstName: "GRACE",
    lastName: "Nakato",
    programCode: "BCS",
    program: "Bachelor of Computer Science",
    studyTime: "Day",
    admissionDate: "2025-08-25",
    admissionYear: 2025,
    registrationNumber: "25/412BCS/AP/UGA",
    campus: "Main Campus",
    scheme: "Full Fee",
    admissionNo: 2,
    admissionCategory: "August Intake",
    status: "submitted",
    createdAt: "2025-08-25",
  },
  {
    id: "3",
    studentNumber: "2026000015",
    firstName: "BRIAN",
    lastName: "Ouma",
    programCode: "BED",
    program: "Bachelor of Education",
    studyTime: "Evening",
    admissionDate: "2026-01-13",
    admissionYear: 2026,
    registrationNumber: "26/015BED/AP/UGA",
    campus: "Main Campus",
    scheme: "Government Sponsored",
    admissionNo: 15,
    admissionCategory: "January Intake",
    status: "draft",
    createdAt: "2026-01-13",
  },
];

const EMPTY_FORM: Omit<ApplicationEntry, "id" | "createdAt"> = {
  studentNumber: "",
  firstName: "",
  lastName: "",
  programCode: "",
  program: "",
  studyTime: "Day",
  admissionDate: "",
  admissionYear: new Date().getFullYear(),
  registrationNumber: "",
  campus: "Main Campus",
  scheme: "Full Fee",
  admissionNo: 1,
  admissionCategory: "August Intake",
  status: "draft",
};

const APP_COLUMNS = [
  { label: "Student No." },
  { label: "Full Name" },
  { label: "Program" },
  { label: "Study Time", className: "text-center" },
  { label: "Campus" },
  { label: "Category" },
  { label: "Status", className: "text-center" },
  { label: "Action", className: "text-center" },
];

function generateStudentNumber(): string {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 900000) + 100000);
  return `${year}${seq}`;
}

// --- Main Component ---
export function ManualApplicationEntry() {
  const [applications, setApplications] = useState<ApplicationEntry[]>(INITIAL_APPLICATIONS);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ApplicationEntry, "id" | "createdAt">>(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const totalCount = applications.length;
  const submittedCount = applications.filter((a) => a.status === "submitted").length;
  const draftCount = applications.filter((a) => a.status === "draft").length;

  const openNew = () => {
    setFormData({ ...EMPTY_FORM, studentNumber: generateStudentNumber() });
    setEditingId(null);
    setView("form");
  };

  const openEdit = (app: ApplicationEntry) => {
    const { id, createdAt, ...rest } = app;
    setFormData(rest);
    setEditingId(id);
    setView("form");
  };

  const handleProgramChange = (programName: string) => {
    const match = PROGRAMS.find((p) => p.name === programName);
    setFormData((prev) => ({
      ...prev,
      program: programName,
      programCode: match?.code ?? prev.programCode,
    }));
  };

  const handleDateChange = (date: string) => {
    const year = date ? new Date(date).getFullYear() : new Date().getFullYear();
    setFormData((prev) => ({ ...prev, admissionDate: date, admissionYear: year }));
  };

  const handleSave = (status: "draft" | "submitted") => {
    const entry: ApplicationEntry = {
      ...formData,
      status,
      id: editingId ?? String(Date.now()),
      createdAt: editingId
        ? applications.find((a) => a.id === editingId)?.createdAt ?? new Date().toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    };

    if (editingId) {
      setApplications((prev) => prev.map((a) => (a.id === editingId ? entry : a)));
    } else {
      setApplications((prev) => [...prev, entry]);
    }
    setView("list");
  };

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  const isFormValid = formData.firstName.trim() && formData.lastName.trim() && formData.program && formData.admissionDate;

  // --- Form View ---
  if (view === "form") {
    return (
      <div className="p-6 flex flex-col h-full bg-white overflow-auto">
        <button
          onClick={() => setView("list")}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-4 w-fit transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <ClipboardList className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId ? "Edit Application" : "New Application"}
            </h2>
            <p className="text-xs text-gray-500">
              {editingId ? `Editing ${formData.firstName} ${formData.lastName}` : "Enter applicant details below"}
            </p>
          </div>
        </div>

        {/* Section 1 — Student Identity */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Student Identity</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Student Number</label>
              <input
                type="text"
                value={formData.studentNumber}
                onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. 2025000376"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Admission No.</label>
              <input
                type="number"
                value={formData.admissionNo}
                onChange={(e) => setFormData({ ...formData, admissionNo: Number(e.target.value) })}
                min={1}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. DANIEL"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Gonzalez"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2 — Program & Study */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Program & Study</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Program <span className="text-red-500">*</span></label>
              <select
                value={formData.program}
                onChange={(e) => handleProgramChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a program...</option>
                {PROGRAMS.map((p) => (
                  <option key={p.code} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Program Code</label>
              <input
                type="text"
                value={formData.programCode}
                onChange={(e) => setFormData({ ...formData, programCode: e.target.value })}
                placeholder="Auto-filled from program"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Study Time</label>
              <select
                value={formData.studyTime}
                onChange={(e) => setFormData({ ...formData, studyTime: e.target.value as ApplicationEntry["studyTime"] })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {STUDY_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Admission Category</label>
              <select
                value={formData.admissionCategory}
                onChange={(e) => setFormData({ ...formData, admissionCategory: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {ADMISSION_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3 — Dates & Registration */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Dates & Registration</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Admission Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={formData.admissionDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Admission Year</label>
              <input
                type="number"
                value={formData.admissionYear}
                onChange={(e) => setFormData({ ...formData, admissionYear: Number(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Registration Number</label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                placeholder="e.g. 25/376BBA/AP/USA"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4 — Campus & Fees */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Campus & Fees</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Campus</label>
              <select
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {CAMPUSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Scheme</label>
              <select
                value={formData.scheme}
                onChange={(e) => setFormData({ ...formData, scheme: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {SCHEMES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave("submitted")}
            disabled={!isFormValid}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-4 w-4" />
            Submit Application
          </button>
          <button
            onClick={() => handleSave("draft")}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Clock className="h-4 w-4" />
            Save as Draft
          </button>
          <button
            onClick={() => setView("list")}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <ClipboardList className="h-6 w-6 text-blue-600" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">Manual Application Entry</h2>
          <p className="text-xs text-gray-500">Create and manage student admission applications</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Application
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Total Applications</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">{totalCount}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-xs font-medium text-green-600">Submitted</span>
          </div>
          <div className="text-2xl font-bold text-green-700">{submittedCount}</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span className="text-xs font-medium text-yellow-600">Drafts</span>
          </div>
          <div className="text-2xl font-bold text-yellow-700">{draftCount}</div>
        </div>
      </div>

      <DataGrid
        columns={APP_COLUMNS}
        colTemplate="110px 1fr 1fr 80px 110px 120px 80px 70px"
        data={applications}
        getKey={(a) => a.id}
        pageSize={8}
        totalLabel="applications"
        emptyMessage="No applications yet. Click 'New Application' to get started."
        renderRow={(a) => (
          <>
            <div className="px-3 py-3 text-sm font-mono text-blue-700 flex items-center">{a.studentNumber}</div>
            <div className="px-3 py-3">
              <div className="text-sm font-medium text-gray-900">{a.firstName} {a.lastName}</div>
              <div className="text-xs text-gray-500">{a.registrationNumber}</div>
            </div>
            <div className="px-3 py-3">
              <div className="text-sm text-gray-800 truncate">{a.program}</div>
              <div className="text-xs text-gray-500">{a.programCode}</div>
            </div>
            <div className="px-3 py-3 text-sm text-gray-600 flex items-center justify-center">{a.studyTime}</div>
            <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{a.campus}</div>
            <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{a.admissionCategory}</div>
            <div className="px-3 py-3 flex items-center justify-center">
              {a.status === "submitted" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3" /> Submitted
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium bg-yellow-100 text-yellow-700">
                  <Clock className="h-3 w-3" /> Draft
                </span>
              )}
            </div>
            <div className="px-3 py-3 flex items-center justify-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); openEdit(a); }}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                View
              </button>
              {a.status === "draft" && (
                deleteConfirm === a.id ? (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(a.id); }}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Confirm delete"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-red-600" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Cancel"
                    >
                      <X className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm(a.id); }}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                    title="Delete draft"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                )
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
