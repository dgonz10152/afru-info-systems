"use client";

import React from "react";
import { useState } from "react";
import {
  Search,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  XCircle,
  DollarSign,
  Monitor,
  Shield,
  Building2,
  Heart,
  BookOpen,
  GraduationCap,
  FileText,
  Download,
} from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

interface StudentPayment {
  id: string;
  name: string;
  studentId: string;
  program: string;
  year: string;
  semester: string;
  totalFees: number;
  amountPaid: number;
  balance: number;
  percentPaid: number;
  paymentDeadline: string;
  moodleAccess: boolean;
  examEligible: boolean;
  lastPaymentDate: string;
  payments: Array<{
    id: string;
    date: string;
    amount: number;
    method: string;
    reference: string;
  }>;
  clearance: {
    hostel: "cleared" | "pending" | "blocked";
    medical: "cleared" | "pending" | "blocked";
    classes: "cleared" | "pending" | "blocked";
    exams: "cleared" | "pending" | "blocked";
    library: "cleared" | "pending" | "blocked";
  };
}

const MOCK_STUDENTS: StudentPayment[] = [
  {
    id: "1",
    name: "Achieng Sarah",
    studentId: "ARU/2024/001",
    program: "Bachelor of Business Administration",
    year: "Year 2",
    semester: "Semester 1 - 2025/2026",
    totalFees: 4500000,
    amountPaid: 2700000,
    balance: 1800000,
    percentPaid: 60,
    paymentDeadline: "2026-03-15",
    moodleAccess: true,
    examEligible: false,
    lastPaymentDate: "2026-01-10",
    payments: [
      { id: "p1", date: "2025-09-02", amount: 1500000, method: "Bank Transfer", reference: "TXN-90812" },
      { id: "p2", date: "2025-11-15", amount: 700000, method: "Mobile Money", reference: "MM-44521" },
      { id: "p3", date: "2026-01-10", amount: 500000, method: "Cash", reference: "RCP-7823" },
    ],
    clearance: { hostel: "cleared", medical: "cleared", classes: "cleared", exams: "pending", library: "cleared" },
  },
  {
    id: "2",
    name: "Mukisa Brian",
    studentId: "ARU/2023/045",
    program: "Bachelor of Computer Science",
    year: "Year 3",
    semester: "Semester 1 - 2025/2026",
    totalFees: 5000000,
    amountPaid: 2000000,
    balance: 3000000,
    percentPaid: 40,
    paymentDeadline: "2026-03-15",
    moodleAccess: false,
    examEligible: false,
    lastPaymentDate: "2025-10-20",
    payments: [
      { id: "p1", date: "2025-09-01", amount: 1500000, method: "Bank Transfer", reference: "TXN-71234" },
      { id: "p2", date: "2025-10-20", amount: 500000, method: "Mobile Money", reference: "MM-33812" },
    ],
    clearance: { hostel: "blocked", medical: "pending", classes: "blocked", exams: "blocked", library: "blocked" },
  },
  {
    id: "3",
    name: "Nakato Faith",
    studentId: "ARU/2024/078",
    program: "Bachelor of Education",
    year: "Year 2",
    semester: "Semester 1 - 2025/2026",
    totalFees: 3800000,
    amountPaid: 3800000,
    balance: 0,
    percentPaid: 100,
    paymentDeadline: "2026-03-15",
    moodleAccess: true,
    examEligible: true,
    lastPaymentDate: "2026-01-25",
    payments: [
      { id: "p1", date: "2025-08-28", amount: 2000000, method: "Bank Transfer", reference: "TXN-65492" },
      { id: "p2", date: "2025-11-03", amount: 1000000, method: "Mobile Money", reference: "MM-55102" },
      { id: "p3", date: "2026-01-25", amount: 800000, method: "Bank Transfer", reference: "TXN-88103" },
    ],
    clearance: { hostel: "cleared", medical: "cleared", classes: "cleared", exams: "cleared", library: "cleared" },
  },
  {
    id: "4",
    name: "Ochieng David",
    studentId: "ARU/2025/012",
    program: "Bachelor of Theology",
    year: "Year 1",
    semester: "Semester 1 - 2025/2026",
    totalFees: 3500000,
    amountPaid: 1750000,
    balance: 1750000,
    percentPaid: 50,
    paymentDeadline: "2026-03-15",
    moodleAccess: false,
    examEligible: false,
    lastPaymentDate: "2025-12-05",
    payments: [
      { id: "p1", date: "2025-09-05", amount: 1000000, method: "Cash", reference: "RCP-4412" },
      { id: "p2", date: "2025-12-05", amount: 750000, method: "Mobile Money", reference: "MM-77231" },
    ],
    clearance: { hostel: "pending", medical: "cleared", classes: "blocked", exams: "blocked", library: "pending" },
  },
];

const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

const PAYMENT_STATUS_COLUMNS = [
  { label: "Student" },
  { label: "Student ID" },
  { label: "Total Fees", className: "text-right" },
  { label: "Balance", className: "text-right" },
  { label: "% Paid", className: "text-center" },
  { label: "Moodle", className: "text-center" },
  { label: "Exams", className: "text-center" },
  { label: "Action", className: "text-center" },
];

export function PaymentStatus() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "cleared" | "partial" | "critical">("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentPayment | null>(null);

  const filtered = MOCK_STUDENTS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "cleared" && s.percentPaid === 100) ||
      (filterStatus === "partial" && s.percentPaid >= 60 && s.percentPaid < 100) ||
      (filterStatus === "critical" && s.percentPaid < 60);
    return matchSearch && matchStatus;
  });

  if (selectedStudent) {
    return <StudentDetail student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <DollarSign className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Student Payment Status</h2>
          <p className="text-xs text-gray-500">Track student fees, Moodle access, and exam eligibility</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-700">{MOCK_STUDENTS.filter((s) => s.percentPaid === 100).length}</div>
          <div className="text-xs text-green-600 mt-1">Fully Paid</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-700">{MOCK_STUDENTS.filter((s) => s.percentPaid >= 60 && s.percentPaid < 100).length}</div>
          <div className="text-xs text-yellow-600 mt-1">Partial (60%+)</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-700">{MOCK_STUDENTS.filter((s) => s.percentPaid < 60).length}</div>
          <div className="text-xs text-red-600 mt-1">{"Critical (<60%)"}</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-700">{formatCurrency(MOCK_STUDENTS.reduce((sum, s) => sum + s.balance, 0))}</div>
          <div className="text-xs text-blue-600 mt-1">Total Outstanding</div>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or student ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
          />
        </div>
        <div className="flex gap-1 border border-gray-300 rounded-lg p-0.5">
          {(["all", "cleared", "partial", "critical"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterStatus === f ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {f === "all" ? "All" : f === "cleared" ? "Fully Paid" : f === "partial" ? "Partial" : "Critical"}
            </button>
          ))}
        </div>
      </div>

      <DataGrid
        columns={PAYMENT_STATUS_COLUMNS}
        colTemplate="1fr 120px 130px 130px 100px 80px 80px 80px"
        data={filtered}
        getKey={(s) => s.id}
        totalLabel="students"
        onRowClick={setSelectedStudent}
        renderRow={(s) => (
          <>
            <div className="px-4 py-3">
              <div className="text-sm font-medium text-gray-900">{s.name}</div>
              <div className="text-xs text-gray-500">{s.program}</div>
            </div>
            <div className="px-3 py-3 text-sm text-gray-700 flex items-center">{s.studentId}</div>
            <div className="px-3 py-3 text-sm text-gray-700 text-right flex items-center justify-end">{formatCurrency(s.totalFees)}</div>
            <div className="px-3 py-3 text-sm font-medium text-right flex items-center justify-end">
              <span className={s.balance === 0 ? "text-green-700" : s.percentPaid < 60 ? "text-red-700" : "text-yellow-700"}>
                {formatCurrency(s.balance)}
              </span>
            </div>
            <div className="px-3 py-3 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      s.percentPaid === 100 ? "bg-green-500" : s.percentPaid >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${s.percentPaid}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{s.percentPaid}%</span>
              </div>
            </div>
            <div className="px-3 py-3 flex items-center justify-center">
              {s.moodleAccess ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-500" />}
            </div>
            <div className="px-3 py-3 flex items-center justify-center">
              {s.examEligible ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-500" />}
            </div>
            <div className="px-3 py-3 flex items-center justify-center">
              <button
                className="text-xs text-blue-600 hover:underline font-medium"
                onClick={(e) => { e.stopPropagation(); setSelectedStudent(s); }}
              >
                View
              </button>
            </div>
          </>
        )}
      />
    </div>
  );
}

const PAYMENT_HISTORY_COLUMNS = [
  { label: "Date" },
  { label: "Reference" },
  { label: "Method" },
  { label: "Amount", className: "text-right" },
];

function StudentDetail({ student, onBack }: { student: StudentPayment; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "payments" | "clearance">("overview");

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Student List
      </button>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
            <p className="text-sm text-gray-500">{student.studentId} -- {student.program} -- {student.year}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!student.moodleAccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
              <Monitor className="h-4 w-4 text-red-600" />
              <span className="text-xs font-medium text-red-700">Moodle Blocked</span>
            </div>
          )}
          {!student.examEligible && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-xs font-medium text-orange-700">Not Exam Eligible</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {(["overview", "payments", "clearance"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors -mb-px ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "overview" ? "Overview" : tab === "payments" ? "Payment History" : "Clearance Status"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Total Fees</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(student.totalFees)}</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-xs text-green-600 mb-1">Amount Paid</div>
              <div className="text-lg font-bold text-green-700">{formatCurrency(student.amountPaid)}</div>
            </div>
            <div className={`${student.balance > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"} border rounded-lg p-4`}>
              <div className={`text-xs ${student.balance > 0 ? "text-red-600" : "text-green-600"} mb-1`}>Balance</div>
              <div className={`text-lg font-bold ${student.balance > 0 ? "text-red-700" : "text-green-700"}`}>{formatCurrency(student.balance)}</div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Payment Progress</span>
              <span className="text-sm font-bold text-gray-900">{student.percentPaid}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  student.percentPaid === 100 ? "bg-green-500" : student.percentPaid >= 60 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${student.percentPaid}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>0%</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500" /> 60% - Moodle Access
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" /> 100% - Full Clearance
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${student.moodleAccess ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <Monitor className={`h-5 w-5 ${student.moodleAccess ? "text-green-600" : "text-red-600"}`} />
              <div>
                <div className={`text-sm font-medium ${student.moodleAccess ? "text-green-800" : "text-red-800"}`}>Moodle Access</div>
                <div className={`text-xs ${student.moodleAccess ? "text-green-600" : "text-red-600"}`}>
                  {student.moodleAccess ? "Active - Student can access online resources" : `Blocked - Requires 60% payment (currently ${student.percentPaid}%)`}
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${student.examEligible ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}>
              <FileText className={`h-5 w-5 ${student.examEligible ? "text-green-600" : "text-orange-600"}`} />
              <div>
                <div className={`text-sm font-medium ${student.examEligible ? "text-green-800" : "text-orange-800"}`}>Exam Eligibility</div>
                <div className={`text-xs ${student.examEligible ? "text-green-600" : "text-orange-600"}`}>
                  {student.examEligible ? "Eligible - Student can sit for exams" : "Not eligible - Full payment required"}
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div><span className="text-gray-500">Semester:</span> <span className="font-medium text-gray-900">{student.semester}</span></div>
              <div><span className="text-gray-500">Deadline:</span> <span className="font-medium text-gray-900">{student.paymentDeadline}</span></div>
              <div><span className="text-gray-500">Last Payment:</span> <span className="font-medium text-gray-900">{student.lastPaymentDate}</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "payments" && (
        <div>
          <DataGrid
            columns={PAYMENT_HISTORY_COLUMNS}
            colTemplate="100px 1fr 120px 120px"
            data={student.payments}
            getKey={(p) => p.id}
            totalLabel="payments"
            renderRow={(p) => (
              <>
                <div className="px-4 py-3 text-sm text-gray-700">{p.date}</div>
                <div className="px-4 py-3 text-sm text-gray-800 font-mono">{p.reference}</div>
                <div className="px-4 py-3 text-sm text-gray-600">{p.method}</div>
                <div className="px-4 py-3 text-sm font-medium text-green-700 text-right">{formatCurrency(p.amount)}</div>
              </>
            )}
          />
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
              <DollarSign className="h-4 w-4" /> Record Payment
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" /> Export Statement
            </button>
          </div>
        </div>
      )}

      {activeTab === "clearance" && (
        <ClearanceView student={student} />
      )}
    </div>
  );
}

function ClearanceView({ student }: { student: StudentPayment }) {
  const departments: Array<{
    key: keyof StudentPayment["clearance"];
    label: string;
    icon: React.ReactNode;
    description: string;
  }> = [
    { key: "hostel", label: "Hostels", icon: <Building2 className="h-5 w-5" />, description: "Accommodation and residence clearance" },
    { key: "medical", label: "Medical Center", icon: <Heart className="h-5 w-5" />, description: "Health services and insurance clearance" },
    { key: "classes", label: "Classes", icon: <BookOpen className="h-5 w-5" />, description: "Course registration and attendance clearance" },
    { key: "exams", label: "Examinations", icon: <FileText className="h-5 w-5" />, description: "Examination eligibility clearance" },
    { key: "library", label: "Library", icon: <GraduationCap className="h-5 w-5" />, description: "Library access and borrowed items clearance" },
  ];

  const statusConfig = {
    cleared: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", icon: <CheckCircle className="h-5 w-5 text-green-600" />, label: "Cleared" },
    pending: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />, label: "Pending" },
    blocked: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", icon: <XCircle className="h-5 w-5 text-red-600" />, label: "Blocked" },
  };

  return (
    <div className="space-y-3">
      {departments.map((dept) => {
        const status = student.clearance[dept.key];
        const config = statusConfig[status];
        return (
          <div key={dept.key} className={`flex items-center justify-between p-4 rounded-lg border ${config.bg} ${config.border}`}>
            <div className="flex items-center gap-4">
              <div className={config.text}>{dept.icon}</div>
              <div>
                <div className={`text-sm font-semibold ${config.text}`}>{dept.label}</div>
                <div className="text-xs text-gray-500">{dept.description}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {config.icon}
              <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const CLEARANCE_SUMMARY_COLUMNS = [
  { label: "Student" },
  { label: "Student ID" },
  { label: "Hostel", className: "text-center" },
  { label: "Medical", className: "text-center" },
  { label: "Classes", className: "text-center" },
  { label: "Exams", className: "text-center" },
  { label: "Library", className: "text-center" },
  { label: "Action", className: "text-center" },
];

export function StudentClearance() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentPayment | null>(null);

  const filtered = MOCK_STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const icon = (status: "cleared" | "pending" | "blocked") =>
    status === "cleared" ? <CheckCircle className="h-4 w-4 text-green-600" /> :
    status === "pending" ? <AlertTriangle className="h-4 w-4 text-yellow-500" /> :
    <XCircle className="h-4 w-4 text-red-500" />;

  if (selectedStudent) {
    return (
      <div className="p-6 flex flex-col h-full bg-white overflow-auto">
        <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Students
        </button>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <Shield className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Clearance: {selectedStudent.name}</h2>
            <p className="text-xs text-gray-500">{selectedStudent.studentId} -- {selectedStudent.program}</p>
          </div>
        </div>
        <ClearanceView student={selectedStudent} />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <Shield className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Student Clearance</h2>
          <p className="text-xs text-gray-500">Manage departmental clearances for hostels, medical, classes, exams, and library</p>
        </div>
      </div>

      <div className="relative max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or student ID..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
        />
      </div>

      <DataGrid
        columns={CLEARANCE_SUMMARY_COLUMNS}
        colTemplate="1fr 120px 80px 80px 80px 80px 80px 80px"
        data={filtered}
        getKey={(s) => s.id}
        totalLabel="students"
        onRowClick={setSelectedStudent}
        renderRow={(s) => (
          <>
            <div className="px-4 py-3">
              <div className="text-sm font-medium text-gray-900">{s.name}</div>
              <div className="text-xs text-gray-500">{s.program}</div>
            </div>
            <div className="px-3 py-3 text-sm text-gray-700 flex items-center">{s.studentId}</div>
            <div className="px-3 py-3 flex items-center justify-center">{icon(s.clearance.hostel)}</div>
            <div className="px-3 py-3 flex items-center justify-center">{icon(s.clearance.medical)}</div>
            <div className="px-3 py-3 flex items-center justify-center">{icon(s.clearance.classes)}</div>
            <div className="px-3 py-3 flex items-center justify-center">{icon(s.clearance.exams)}</div>
            <div className="px-3 py-3 flex items-center justify-center">{icon(s.clearance.library)}</div>
            <div className="px-3 py-3 flex items-center justify-center">
              <button
                className="text-xs text-blue-600 hover:underline font-medium"
                onClick={(e) => { e.stopPropagation(); setSelectedStudent(s); }}
              >
                Details
              </button>
            </div>
          </>
        )}
      />
    </div>
  );
}

const FEE_STRUCTURE_COLUMNS = [
  { label: "Program" },
  { label: "Tuition", className: "text-right" },
  { label: "Functional", className: "text-right" },
  { label: "ICT", className: "text-right" },
  { label: "Library", className: "text-right" },
  { label: "Total", className: "text-right" },
];

export function FeeStructure() {
  const programs = [
    { id: "1", name: "Bachelor of Business Administration", tuition: 3500000, functional: 500000, ict: 300000, library: 200000, total: 4500000 },
    { id: "2", name: "Bachelor of Computer Science", tuition: 4000000, functional: 500000, ict: 300000, library: 200000, total: 5000000 },
    { id: "3", name: "Bachelor of Education", tuition: 2800000, functional: 500000, ict: 300000, library: 200000, total: 3800000 },
    { id: "4", name: "Bachelor of Theology", tuition: 2500000, functional: 500000, ict: 300000, library: 200000, total: 3500000 },
  ];

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Fee Structure</h2>
          <p className="text-xs text-gray-500">Academic year 2025/2026 fee breakdown by program</p>
        </div>
      </div>

      <DataGrid
        columns={FEE_STRUCTURE_COLUMNS}
        colTemplate="1fr 120px 120px 100px 100px 130px"
        data={programs}
        getKey={(p) => p.id}
        renderRow={(p) => (
          <>
            <div className="px-4 py-3 text-sm font-medium text-gray-900">{p.name}</div>
            <div className="px-3 py-3 text-sm text-gray-700 text-right">{formatCurrency(p.tuition)}</div>
            <div className="px-3 py-3 text-sm text-gray-700 text-right">{formatCurrency(p.functional)}</div>
            <div className="px-3 py-3 text-sm text-gray-700 text-right">{formatCurrency(p.ict)}</div>
            <div className="px-3 py-3 text-sm text-gray-700 text-right">{formatCurrency(p.library)}</div>
            <div className="px-3 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(p.total)}</div>
          </>
        )}
      />
    </div>
  );
}
