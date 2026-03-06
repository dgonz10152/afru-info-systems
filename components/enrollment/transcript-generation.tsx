"use client";

import { useState, useRef, useCallback } from "react";
import {
  FileText,
  Upload,
  Download,
  CheckCircle,
  Search,
  Users,
  X,
  AlertCircle,
  Loader2,
  FileDown,
  Printer,
  Package,
} from "lucide-react";

// --- Student roster used for selection ---
interface StudentRecord {
  id: string;
  studentNumber: string;
  name: string;
  program: string;
  programCode: string;
  year: string;
  campus: string;
  status: "Active" | "Graduated" | "Suspended";
}

const STUDENT_ROSTER: StudentRecord[] = [
  { id: "1", studentNumber: "2025000376", name: "DANIEL Gonzalez",        program: "Bachelor of Business Administration", programCode: "BBAD",  year: "Year 1", campus: "Main Campus", status: "Active" },
  { id: "2", studentNumber: "2025000412", name: "GRACE Nakato",           program: "Bachelor of Computer Science",         programCode: "BCS",   year: "Year 1", campus: "Main Campus", status: "Active" },
  { id: "3", studentNumber: "2026000015", name: "BRIAN Ouma",             program: "Bachelor of Education",               programCode: "BED",   year: "Year 1", campus: "Main Campus", status: "Active" },
  { id: "4", studentNumber: "2023000045", name: "James Ssempijja",        program: "BSc. Computer Science",               programCode: "BCS",   year: "Year 3", campus: "Main Campus", status: "Active" },
  { id: "5", studentNumber: "2023000082", name: "Mary Nalubega",          program: "BA. Theology",                        programCode: "BTHEO", year: "Year 2", campus: "Main Campus", status: "Active" },
  { id: "6", studentNumber: "2022000031", name: "Emmanuel Okot",          program: "BBA. Business Administration",        programCode: "BBAD",  year: "Year 4", campus: "Main Campus", status: "Active" },
  { id: "7", studentNumber: "2024000109", name: "Achieng Sarah",          program: "Bachelor of Business Administration", programCode: "BBAD",  year: "Year 2", campus: "Main Campus", status: "Active" },
  { id: "8", studentNumber: "2023000045", name: "Mukisa Brian",           program: "Bachelor of Computer Science",        programCode: "BCS",   year: "Year 3", campus: "Main Campus", status: "Active" },
  { id: "9", studentNumber: "2024000078", name: "Nakato Faith",           program: "Bachelor of Education",              programCode: "BED",   year: "Year 2", campus: "Main Campus", status: "Active" },
  { id: "10", studentNumber: "2025000012", name: "Ochieng David",         program: "Bachelor of Theology",               programCode: "BTHEO", year: "Year 1", campus: "Main Campus", status: "Active" },
  { id: "11", studentNumber: "2021000088", name: "Namutebi Agnes",        program: "Bachelor of Laws",                   programCode: "BLA",   year: "Year 4", campus: "City Campus",  status: "Graduated" },
  { id: "12", studentNumber: "2022000055", name: "Wafula Patrick",        program: "BSc. Computer Science",              programCode: "BCS",   year: "Year 3", campus: "Main Campus",  status: "Active" },
];

interface GeneratedReport {
  studentId: string;
  studentNumber: string;
  name: string;
  program: string;
  filename: string;
  blob: Blob;
}

// Simulates generating a transcript PDF as a plain-text blob (Crystal Reports renders server-side in production)
function buildTranscriptBlob(student: StudentRecord, templateName: string): Blob {
  const content = [
    "═══════════════════════════════════════════════════════",
    "            AFRICA RENEWAL UNIVERSITY",
    "                 OFFICIAL TRANSCRIPT",
    "═══════════════════════════════════════════════════════",
    "",
    `Template: ${templateName}`,
    `Generated: ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`,
    "",
    "── STUDENT INFORMATION ─────────────────────────────────",
    `Student Number : ${student.studentNumber}`,
    `Full Name      : ${student.name}`,
    `Program        : ${student.program} (${student.programCode})`,
    `Year           : ${student.year}`,
    `Campus         : ${student.campus}`,
    `Status         : ${student.status}`,
    "",
    "── ACADEMIC RECORD ─────────────────────────────────────",
    "Semester  Course Code  Course Name                    Grade  Credits",
    "────────  ───────────  ─────────────────────────────  ─────  ───────",
    "2024/S1   CS101        Introduction to Computing       A       3",
    "2024/S1   MA101        Mathematics I                   B+      3",
    "2024/S1   EN101        Communication Skills            A-      2",
    "2024/S2   CS102        Data Structures                 A       3",
    "2024/S2   MA102        Mathematics II                  B       3",
    "2024/S2   GS101        General Studies                 B+      2",
    "",
    "── CUMULATIVE SUMMARY ──────────────────────────────────",
    "Total Credits Attempted  : 16",
    "Total Credits Earned     : 16",
    "Cumulative GPA           : 3.65",
    "",
    "═══════════════════════════════════════════════════════",
    "  This transcript is issued by the Registrar's Office.",
    "  Verify authenticity at: verify.aru.ac.ug",
    "═══════════════════════════════════════════════════════",
  ].join("\n");
  return new Blob([content], { type: "text/plain" });
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Default templates ---
interface TemplateOption {
  id: string;
  name: string;
  description: string;
  filename: string;
}

const DEFAULT_TEMPLATES: TemplateOption[] = [
  { id: "t1", name: "Official Transcript",        description: "Full academic transcript with grades and GPA",       filename: "official_transcript.rpt" },
  { id: "t2", name: "Provisional Transcript",     description: "Provisional results for current semester",           filename: "provisional_transcript.rpt" },
  { id: "t3", name: "Completion Certificate",     description: "Certificate of course completion with credits",      filename: "completion_certificate.rpt" },
  { id: "t4", name: "Weighted Grade Report",      description: "Detailed weighted grade breakdown per course",       filename: "weighted_grade_report.rpt" },
  { id: "t5", name: "Senate-Approved Transcript", description: "Sealed transcript approved by the Senate board",    filename: "senate_transcript.rpt" },
];

// --- Component ---
export function TranscriptGeneration() {
  // Template state
  const [template, setTemplate] = useState<{ name: string; size: string } | null>({
    name: DEFAULT_TEMPLATES[0].filename,
    size: "Default",
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(DEFAULT_TEMPLATES[0].id);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Student selection
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Options
  const [outputFormat, setOutputFormat] = useState<"pdf" | "excel" | "word">("pdf");
  const [includeWatermark, setIncludeWatermark] = useState(false);
  const [includeSignature, setIncludeSignature] = useState(true);
  const [includeHeader, setIncludeHeader] = useState(true);

  // Generation
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([]);

  const filteredStudents = STUDENT_ROSTER.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentNumber.includes(search) ||
      s.program.toLowerCase().includes(search.toLowerCase())
  );

  const allFilteredSelected = filteredStudents.length > 0 && filteredStudents.every((s) => selected.has(s.id));

  const toggleStudent = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAllFiltered = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filteredStudents.forEach((s) => next.delete(s.id));
      } else {
        filteredStudents.forEach((s) => next.add(s.id));
      }
      return next;
    });
  };

  const selectDefaultTemplate = (t: TemplateOption) => {
    setSelectedTemplateId(t.id);
    setTemplate({ name: t.filename, size: "Default" });
  };

  const handleTemplateFile = (file: File) => {
    const kb = (file.size / 1024).toFixed(1);
    const mb = file.size / (1024 * 1024);
    setSelectedTemplateId("");
    setTemplate({ name: file.name, size: mb >= 1 ? `${mb.toFixed(1)} MB` : `${kb} KB` });
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleTemplateFile(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleTemplateFile(file);
  };

  const handleGenerate = async () => {
    if (!template || selected.size === 0) return;
    setGenerating(true);
    setProgress(0);
    setGeneratedReports([]);

    const students = STUDENT_ROSTER.filter((s) => selected.has(s.id));
    const reports: GeneratedReport[] = [];

    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      // Simulate per-student generation delay
      await new Promise((res) => setTimeout(res, 400));
      const ext = outputFormat === "pdf" ? "pdf" : outputFormat === "excel" ? "xlsx" : "docx";
      const safeName = s.name.replace(/\s+/g, "_").toUpperCase();
      const filename = `Transcript_${safeName}_${s.studentNumber}.${ext}`;
      const blob = buildTranscriptBlob(s, template.name);
      reports.push({ studentId: s.id, studentNumber: s.studentNumber, name: s.name, program: s.program, filename, blob });
      setProgress(Math.round(((i + 1) / students.length) * 100));
    }

    setGeneratedReports(reports);
    setGenerating(false);
  };

  const downloadAll = () => {
    generatedReports.forEach((r, i) => {
      setTimeout(() => triggerDownload(r.blob, r.filename), i * 150);
    });
  };

  const canGenerate = !!template && selected.size > 0 && !generating;

  const statusColors: Record<StudentRecord["status"], string> = {
    Active: "bg-green-100 text-green-700",
    Graduated: "bg-blue-100 text-blue-700",
    Suspended: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">Transcript Generation</h2>
          <p className="text-xs text-gray-500">Upload a Crystal Reports template, select students, and generate transcripts in batch</p>
        </div>
        {selected.size > 0 && (
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
            {selected.size} student{selected.size !== 1 ? "s" : ""} selected
          </span>
        )}
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-5 flex-1 min-h-0">
        {/* Left column */}
        <div className="flex flex-col gap-5 min-h-0 overflow-auto">

          {/* Template Selection */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                <Printer className="h-3.5 w-3.5" /> Report Template
              </h3>
              {/* Compact upload button */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
              >
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-lg transition-colors ${
                    dragOver
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-blue-400"
                  }`}
                >
                  <Upload className="h-3 w-3" /> Upload .rpt
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".rpt,.RPT"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>
            </div>

            {/* Default template list */}
            <div className="space-y-1.5 mb-3">
              {DEFAULT_TEMPLATES.map((t) => {
                const isSelected = selectedTemplateId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => selectDefaultTemplate(t)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-blue-600" : "border-gray-300"
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${isSelected ? "text-blue-800" : "text-gray-800"}`}>
                        {t.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{t.description}</div>
                    </div>
                    <span className="text-xs text-gray-400 font-mono shrink-0">.rpt</span>
                  </button>
                );
              })}
            </div>

            {/* Uploaded custom template indicator */}
            {template && !selectedTemplateId && (
              <div className="flex items-center gap-2 p-2.5 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-green-800 truncate">{template.name}</div>
                  <div className="text-xs text-green-600">{template.size} · Custom template</div>
                </div>
                <button
                  onClick={() => {
                    setTemplate({ name: DEFAULT_TEMPLATES[0].filename, size: "Default" });
                    setSelectedTemplateId(DEFAULT_TEMPLATES[0].id);
                  }}
                  className="p-1 hover:bg-green-100 rounded transition-colors"
                  title="Remove custom template"
                >
                  <X className="h-3.5 w-3.5 text-green-700" />
                </button>
              </div>
            )}

            <div className="flex items-start gap-2 mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                Templates are rendered server-side via the Crystal Reports runtime.
              </p>
            </div>
          </div>

          {/* Student Selection */}
          <div className="border border-gray-200 rounded-lg p-4 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> Select Students
              </h3>
              <div className="flex items-center gap-3">
                {selected.size > 0 && (
                  <button
                    onClick={() => setSelected(new Set())}
                    className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={toggleAllFiltered}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {allFilteredSelected ? "Deselect all" : "Select all"}
                </button>
              </div>
            </div>

            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, student number, or program..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Grid header */}
            <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
              <div className="grid bg-slate-100 border-b border-gray-200" style={{ gridTemplateColumns: "40px 110px 1fr 1fr 70px 80px" }}>
                <div className="px-3 py-2.5 flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={toggleAllFiltered}
                    className="h-3.5 w-3.5 accent-blue-600 cursor-pointer"
                  />
                </div>
                <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Student No.</div>
                <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Name</div>
                <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Program</div>
                <div className="px-3 py-2.5 text-xs font-semibold text-gray-600 text-center">Year</div>
                <div className="px-3 py-2.5 text-xs font-semibold text-gray-600 text-center">Status</div>
              </div>
              <div className="overflow-auto max-h-72">
                {filteredStudents.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-gray-400">No students match your search.</div>
                ) : (
                  filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      className={`grid border-b border-gray-100 cursor-pointer transition-colors ${
                        selected.has(s.id) ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
                      }`}
                      style={{ gridTemplateColumns: "40px 110px 1fr 1fr 70px 80px" }}
                      onClick={() => toggleStudent(s.id)}
                    >
                      <div className="px-3 py-2.5 flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={selected.has(s.id)}
                          onChange={() => toggleStudent(s.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-3.5 w-3.5 accent-blue-600 cursor-pointer"
                        />
                      </div>
                      <div className="px-3 py-2.5 text-sm font-mono text-blue-700 flex items-center">{s.studentNumber}</div>
                      <div className="px-3 py-2.5 text-sm font-medium text-gray-900 flex items-center">{s.name}</div>
                      <div className="px-3 py-2.5 text-xs text-gray-600 flex items-center">
                        <span className="truncate">{s.programCode} — {s.program}</span>
                      </div>
                      <div className="px-3 py-2.5 text-sm text-gray-600 flex items-center justify-center">{s.year}</div>
                      <div className="px-3 py-2.5 flex items-center justify-center">
                        <span className={`px-2 py-0.5 text-xs rounded font-medium ${statusColors[s.status]}`}>
                          {s.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{STUDENT_ROSTER.length} total students · {selected.size} selected</p>
          </div>
        </div>

        {/* Right column — options + generate + results */}
        <div className="flex flex-col gap-5">

          {/* Output Options */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Output Options</h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 mb-2">Format</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["pdf", "excel", "word"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setOutputFormat(fmt)}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      outputFormat === fmt
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {fmt === "pdf" ? "PDF" : fmt === "excel" ? "Excel" : "Word"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Include</label>
              {[
                { key: "header", label: "Official University Header", value: includeHeader, set: setIncludeHeader },
                { key: "signature", label: "Registrar Signature Block", value: includeSignature, set: setIncludeSignature },
                { key: "watermark", label: "Official Watermark", value: includeWatermark, set: setIncludeWatermark },
              ].map(({ key, label, value, set }) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => set(e.target.checked)}
                    className="h-3.5 w-3.5 accent-blue-600"
                  />
                  <span className="text-xs text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Generate</h3>

            {!template && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                Upload a report template to enable generation.
              </p>
            )}
            {template && selected.size === 0 && (
              <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-3">
                Select at least one student to generate transcripts.
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
              ) : (
                <><FileDown className="h-4 w-4" /> Generate {selected.size > 0 ? `${selected.size} Transcript${selected.size !== 1 ? "s" : ""}` : "Transcripts"}</>
              )}
            </button>

            {/* Progress bar */}
            {generating && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Processing students…</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generated Reports */}
          {generatedReports.length > 0 && (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-green-700 uppercase flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" /> {generatedReports.length} Report{generatedReports.length !== 1 ? "s" : ""} Ready
                </h3>
                {generatedReports.length > 1 && (
                  <button
                    onClick={downloadAll}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Package className="h-3.5 w-3.5" /> Download All
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-64 overflow-auto">
                {generatedReports.map((r) => (
                  <div key={r.studentId} className="flex items-center gap-2 p-2.5 bg-white border border-green-200 rounded-lg">
                    <FileText className="h-4 w-4 text-green-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-900 truncate">{r.name}</div>
                      <div className="text-xs text-gray-500 truncate">{r.filename}</div>
                    </div>
                    <button
                      onClick={() => triggerDownload(r.blob, r.filename)}
                      className="p-1.5 hover:bg-green-100 rounded-lg transition-colors shrink-0"
                      title="Download"
                    >
                      <Download className="h-3.5 w-3.5 text-green-700" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
