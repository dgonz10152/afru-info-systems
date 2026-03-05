"use client";

import React from "react";
import { useState } from "react";
import { Search, Users, ArrowLeft, FileText, Download, Upload, Plus, Clock, Building2, Heart, BookOpen, User, Briefcase, ClipboardCheck, CheckCircle } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

interface Training {
  id: string;
  title: string;
  type: "in-house" | "external";
  date: string;
  description: string;
  certification: string;
}

interface MedicalRecord {
  id: string;
  date: string;
  invoiceNo: string;
  provider: string;
  amount: string;
  description: string;
}

interface DocumentScan {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  fileSize: string;
}

interface Contract {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface ExitEntry {
  date: string;
  checkIn: string;
  checkOut: string;
  hours: string;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  role: string;
  department: string;
  school: string;
  status: string;
  address: string;
  nationality: string;
  nextOfKin: { name: string; relationship: string; phone: string; address: string };
  contracts: Contract[];
  exitEntry: ExitEntry[];
  trainings: Training[];
  medicalRecords: MedicalRecord[];
  documents: DocumentScan[];
}

const MOCK_STAFF: StaffMember[] = [
  {
    id: "EMP001",
    name: "Dr. Sarah Namukasa",
    email: "sarah.n@aru.ac.ug",
    phone: "+256 700 123 456",
    dateOfBirth: "1985-04-12",
    gender: "Female",
    role: "Senior Lecturer - Computer Science",
    department: "Computer Science",
    school: "School of Science & Technology",
    status: "Active",
    address: "Kampala, Uganda",
    nationality: "Ugandan",
    nextOfKin: { name: "John Namukasa", relationship: "Spouse", phone: "+256 700 789 012", address: "Kampala, Uganda" },
    contracts: [
      { id: "CON001", type: "Employment Contract", startDate: "2020-01-15", endDate: "2027-01-14", status: "Active" },
      { id: "CON002", type: "Research Agreement", startDate: "2025-06-01", endDate: "2026-05-31", status: "Active" },
    ],
    exitEntry: [
      { date: "2026-01-28", checkIn: "8:02 AM", checkOut: "5:15 PM", hours: "9h 13m" },
      { date: "2026-01-27", checkIn: "7:55 AM", checkOut: "5:00 PM", hours: "9h 5m" },
      { date: "2026-01-24", checkIn: "8:10 AM", checkOut: "4:50 PM", hours: "8h 40m" },
    ],
    trainings: [
      { id: "TR001", title: "Advanced Machine Learning Workshop", type: "external", date: "2025-09-15", description: "Completed ML certification at Makerere University", certification: "ML Professional Certificate" },
      { id: "TR002", title: "New LMS Platform Training", type: "in-house", date: "2025-11-20", description: "Training on the new Learning Management System", certification: "Internal Certification" },
    ],
    medicalRecords: [
      { id: "MED001", date: "2026-01-10", invoiceNo: "CMC-2026-0145", provider: "CMC Hospital", amount: "UGX 350,000", description: "General consultation and lab work" },
    ],
    documents: [
      { id: "DOC001", name: "Employment Application.pdf", type: "Application", uploadDate: "2020-01-05", fileSize: "2.3 MB" },
      { id: "DOC002", name: "PhD Certificate.pdf", type: "Qualification", uploadDate: "2020-01-05", fileSize: "1.1 MB" },
      { id: "DOC003", name: "Employment Contract 2020.pdf", type: "Contract", uploadDate: "2020-01-15", fileSize: "0.8 MB" },
    ],
  },
  {
    id: "EMP002",
    name: "Prof. Daniel Mukasa",
    email: "daniel.m@aru.ac.ug",
    phone: "+256 770 234 567",
    dateOfBirth: "1978-08-25",
    gender: "Male",
    role: "Professor - Software Engineering",
    department: "Computer Science",
    school: "School of Science & Technology",
    status: "Active",
    address: "Mukono, Uganda",
    nationality: "Ugandan",
    nextOfKin: { name: "Grace Mukasa", relationship: "Spouse", phone: "+256 770 890 123", address: "Mukono, Uganda" },
    contracts: [
      { id: "CON003", type: "Employment Contract", startDate: "2015-03-01", endDate: "2028-02-28", status: "Active" },
    ],
    exitEntry: [
      { date: "2026-01-28", checkIn: "7:45 AM", checkOut: "5:30 PM", hours: "9h 45m" },
      { date: "2026-01-27", checkIn: "8:00 AM", checkOut: "5:10 PM", hours: "9h 10m" },
    ],
    trainings: [
      { id: "TR003", title: "IT Infrastructure Management", type: "external", date: "2025-07-10", description: "Received IT infrastructure training - now qualified to teach IT courses", certification: "ITIL Foundation" },
      { id: "TR004", title: "Academic Leadership Seminar", type: "in-house", date: "2025-10-05", description: "Internal leadership development program", certification: "Leadership Certificate" },
    ],
    medicalRecords: [
      { id: "MED002", date: "2025-12-15", invoiceNo: "CMC-2025-1892", provider: "CMC Hospital", amount: "UGX 200,000", description: "Annual health check-up" },
    ],
    documents: [
      { id: "DOC004", name: "Employment Application.pdf", type: "Application", uploadDate: "2015-02-20", fileSize: "1.9 MB" },
      { id: "DOC005", name: "Employment Contract 2015.pdf", type: "Contract", uploadDate: "2015-03-01", fileSize: "0.7 MB" },
    ],
  },
  {
    id: "EMP003",
    name: "Agnes Birungi",
    email: "agnes.b@aru.ac.ug",
    phone: "+256 780 345 678",
    dateOfBirth: "1990-12-03",
    gender: "Female",
    role: "Administrative Officer",
    department: "Administration",
    school: "School of Business",
    status: "Active",
    address: "Kampala, Uganda",
    nationality: "Ugandan",
    nextOfKin: { name: "Robert Birungi", relationship: "Brother", phone: "+256 780 456 789", address: "Kampala, Uganda" },
    contracts: [
      { id: "CON004", type: "Employment Contract", startDate: "2022-06-01", endDate: "2027-05-31", status: "Active" },
    ],
    exitEntry: [
      { date: "2026-01-28", checkIn: "8:00 AM", checkOut: "5:00 PM", hours: "9h 0m" },
    ],
    trainings: [],
    medicalRecords: [],
    documents: [
      { id: "DOC006", name: "Employment Application.pdf", type: "Application", uploadDate: "2022-05-15", fileSize: "1.5 MB" },
    ],
  },
];

type StaffTab = "biodata" | "nextOfKin" | "school" | "contracts" | "exitEntry" | "trainings" | "medical" | "documents" | "professorReports" | "appraisal";

const CONTRACTS_COLUMNS = [
  { label: "ID" },
  { label: "Type" },
  { label: "Start Date" },
  { label: "End Date" },
  { label: "Status" },
];

const EXIT_ENTRY_COLUMNS = [
  { label: "Date" },
  { label: "Check In" },
  { label: "Check Out" },
  { label: "Total Hours" },
];

const MEDICAL_COLUMNS = [
  { label: "Date" },
  { label: "Invoice No" },
  { label: "Provider" },
  { label: "Amount" },
  { label: "Description" },
];

const DOCUMENTS_COLUMNS = [
  { label: "Document Name" },
  { label: "Type" },
  { label: "Uploaded" },
  { label: "Size" },
  { label: "Action" },
];

const APPRAISAL_SCORES_COLUMNS = [
  { label: "Criteria" },
  { label: "Self Score", className: "text-center" },
  { label: "Supervisor", className: "text-center" },
  { label: "Diff", className: "text-center" },
  { label: "Status" },
];

function StaffDetail({ staff, onBack }: { staff: StaffMember; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<StaffTab>("biodata");

  const tabs: { key: StaffTab; label: string; icon: React.ReactNode }[] = [
    { key: "biodata", label: "Biodata", icon: <User className="h-3.5 w-3.5" /> },
    { key: "nextOfKin", label: "Next of Kin", icon: <Users className="h-3.5 w-3.5" /> },
    { key: "school", label: "School", icon: <Building2 className="h-3.5 w-3.5" /> },
    { key: "contracts", label: "Contracts", icon: <Briefcase className="h-3.5 w-3.5" /> },
    { key: "exitEntry", label: "Exit/Entry", icon: <Clock className="h-3.5 w-3.5" /> },
    { key: "trainings", label: "Trainings", icon: <BookOpen className="h-3.5 w-3.5" /> },
    { key: "medical", label: "Medical", icon: <Heart className="h-3.5 w-3.5" /> },
    { key: "documents", label: "Documents", icon: <FileText className="h-3.5 w-3.5" /> },
    { key: "appraisal", label: "Performance Appraisal", icon: <ClipboardCheck className="h-3.5 w-3.5" /> },
    ...(staff.role.includes("Lecturer") || staff.role.includes("Professor")
      ? [{ key: "professorReports" as StaffTab, label: "Professor Reports", icon: <BookOpen className="h-3.5 w-3.5" /> }]
      : []),
  ];

  const appraisalCriteria = staff.role.includes("Lecturer") || staff.role.includes("Professor")
    ? ["Course Prep", "Engagement", "Assessment", "Research", "Community", "Dev"]
    : ["Job Knowledge", "Work Quality", "Communication", "Teamwork", "Attendance", "Initiative"];

  const appraisalRows = appraisalCriteria.map((c, i) => {
    const selfScore = [8, 7, 9, 7, 6, 8][i];
    const supScore = [8, 8, 8, 7, 7, 8][i];
    return { id: `${i}`, criteria: c, selfScore, supScore, diff: selfScore - supScore };
  });

  const exitRows = staff.exitEntry.map((e, i) => ({ ...e, id: `exit-${i}` }));

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to staff list
      </button>

      <div className="bg-slate-50 border border-gray-200 rounded-lg p-4 mb-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
          {staff.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
          <p className="text-sm text-gray-500">{staff.role} - {staff.id}</p>
        </div>
        <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">{staff.status}</span>
      </div>

      <div className="flex gap-1 mb-4 flex-wrap border-b border-gray-200 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === tab.key
                ? "bg-white text-blue-600 font-medium border border-gray-200 border-b-white -mb-px"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-b-lg rounded-tr-lg p-5">
        {activeTab === "biodata" && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Full Name:</span><span className="text-gray-800">{staff.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="text-gray-800">{staff.email}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="text-gray-800">{staff.phone}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date of Birth:</span><span className="text-gray-800">{staff.dateOfBirth}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Gender:</span><span className="text-gray-800">{staff.gender}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Nationality:</span><span className="text-gray-800">{staff.nationality}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Address:</span><span className="text-gray-800">{staff.address}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Department:</span><span className="text-gray-800">{staff.department}</span></div>
          </div>
        )}

        {activeTab === "nextOfKin" && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Name:</span><span className="text-gray-800">{staff.nextOfKin.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Relationship:</span><span className="text-gray-800">{staff.nextOfKin.relationship}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="text-gray-800">{staff.nextOfKin.phone}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Address:</span><span className="text-gray-800">{staff.nextOfKin.address}</span></div>
          </div>
        )}

        {activeTab === "school" && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">School:</span><span className="text-gray-800 font-medium">{staff.school}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Department:</span><span className="text-gray-800">{staff.department}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Role:</span><span className="text-gray-800">{staff.role}</span></div>
          </div>
        )}

        {activeTab === "contracts" && (
          <DataGrid
            columns={CONTRACTS_COLUMNS}
            colTemplate="80px 1fr 120px 120px 100px"
            data={staff.contracts}
            getKey={(c) => c.id}
            totalLabel="contracts"
            renderRow={(c) => (
              <>
                <div className="px-3 py-2.5 text-sm text-gray-600">{c.id}</div>
                <div className="px-3 py-2.5 text-sm text-gray-800">{c.type}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{c.startDate}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{c.endDate}</div>
                <div className="px-3 py-2.5"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">{c.status}</span></div>
              </>
            )}
          />
        )}

        {activeTab === "exitEntry" && (
          <DataGrid
            columns={EXIT_ENTRY_COLUMNS}
            colTemplate="1fr 1fr 1fr 1fr"
            data={exitRows}
            getKey={(e) => e.id}
            totalLabel="entries"
            renderRow={(e) => (
              <>
                <div className="px-3 py-2.5 text-sm text-gray-600">{e.date}</div>
                <div className="px-3 py-2.5 text-sm text-green-600 font-medium">{e.checkIn}</div>
                <div className="px-3 py-2.5 text-sm text-red-600 font-medium">{e.checkOut}</div>
                <div className="px-3 py-2.5 text-sm text-gray-800">{e.hours}</div>
              </>
            )}
          />
        )}

        {activeTab === "trainings" && (
          <div>
            <div className="flex justify-end mb-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Plus className="h-4 w-4" /> Add Training Record
              </button>
            </div>
            {staff.trainings.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No training records found.</p>
            ) : (
              <div className="space-y-3">
                {staff.trainings.map((t) => (
                  <div key={t.id} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-semibold text-gray-800">{t.title}</h5>
                      <span className={`px-2 py-1 text-xs rounded font-medium ${t.type === "in-house" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                        {t.type === "in-house" ? "In-house" : "External"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{t.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Date: {t.date}</span>
                      <span>Certification: {t.certification}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "medical" && (
          staff.medicalRecords.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No medical records found.</p>
          ) : (
            <DataGrid
              columns={MEDICAL_COLUMNS}
              colTemplate="100px 120px 1fr 120px 1fr"
              data={staff.medicalRecords}
              getKey={(m) => m.id}
              totalLabel="records"
              renderRow={(m) => (
                <>
                  <div className="px-3 py-2.5 text-sm text-gray-600">{m.date}</div>
                  <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{m.invoiceNo}</div>
                  <div className="px-3 py-2.5 text-sm text-gray-600">{m.provider}</div>
                  <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{m.amount}</div>
                  <div className="px-3 py-2.5 text-sm text-gray-600">{m.description}</div>
                </>
              )}
            />
          )
        )}

        {activeTab === "documents" && (
          <div>
            <div className="flex justify-end mb-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Upload className="h-4 w-4" /> Upload Document
              </button>
            </div>
            <DataGrid
              columns={DOCUMENTS_COLUMNS}
              colTemplate="1fr 120px 120px 80px 80px"
              data={staff.documents}
              getKey={(d) => d.id}
              totalLabel="documents"
              renderRow={(d) => (
                <>
                  <div className="px-3 py-2.5 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-800">{d.name}</span>
                  </div>
                  <div className="px-3 py-2.5 text-sm text-gray-600">{d.type}</div>
                  <div className="px-3 py-2.5 text-sm text-gray-600">{d.uploadDate}</div>
                  <div className="px-3 py-2.5 text-sm text-gray-600">{d.fileSize}</div>
                  <div className="px-3 py-2.5">
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Download">
                      <Download className="h-4 w-4 text-blue-600" />
                    </button>
                  </div>
                </>
              )}
            />
          </div>
        )}

        {activeTab === "professorReports" && (
          <div className="space-y-4">
            {[
              { semester: "Semester 1 - 2025/2026", materialUploaded: 45, avgGradingTime: "2.3 days", lectureAttendance: "92%" },
              { semester: "Semester 2 - 2024/2025", materialUploaded: 38, avgGradingTime: "3.1 days", lectureAttendance: "88%" },
            ].map((sem) => (
              <div key={sem.semester} className="border border-gray-200 rounded-lg p-5">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">{sem.semester}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">{sem.materialUploaded}</div>
                    <div className="text-xs text-blue-600 mt-1">Materials Uploaded</div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-700">{sem.avgGradingTime}</div>
                    <div className="text-xs text-orange-600 mt-1">Avg. Grading Time</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">{sem.lectureAttendance}</div>
                    <div className="text-xs text-green-600 mt-1">Lecture Attendance</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "appraisal" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-800">Performance Appraisal Records</h4>
              <div className="text-xs text-gray-500">Period: Semester 1 - 2025/2026</div>
            </div>
            <DataGrid
              columns={APPRAISAL_SCORES_COLUMNS}
              colTemplate="1fr 100px 100px 80px 120px"
              data={appraisalRows}
              getKey={(r) => r.id}
              renderRow={(r) => (
                <>
                  <div className="px-3 py-2.5 text-sm text-gray-700">{r.criteria}</div>
                  <div className="px-3 py-2.5 text-sm text-gray-800 text-center font-medium">{r.selfScore}/10</div>
                  <div className="px-3 py-2.5 text-sm text-gray-800 text-center font-medium">{r.supScore}/10</div>
                  <div className="px-3 py-2.5 text-sm text-center font-medium">
                    <span className={Math.abs(r.diff) > 2 ? "text-red-600" : r.diff !== 0 ? "text-amber-600" : "text-green-600"}>
                      {r.diff > 0 ? `+${r.diff}` : r.diff}
                    </span>
                  </div>
                  <div className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium bg-green-100 text-green-700">
                      <CheckCircle className="h-3 w-3" /> Submitted
                    </span>
                  </div>
                </>
              )}
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-xs text-blue-600 mb-1">Self-Assessment Average</div>
                <div className="text-xl font-bold text-blue-700">7.5/10</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="text-xs text-green-600 mb-1">Supervisor Average</div>
                <div className="text-xl font-bold text-green-700">7.5/10</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const STAFF_LIST_COLUMNS = [
  { label: "ID" },
  { label: "Name" },
  { label: "Role" },
  { label: "School" },
  { label: "Status" },
];

export function StaffDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const filtered = MOCK_STAFF.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <Users className="h-6 w-6 text-purple-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Staff Records</h2>
          <p className="text-xs text-gray-500">View and manage staff biodata, contracts, trainings, and documents</p>
        </div>
      </div>

      {!selectedStaff ? (
        <>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Staff ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <DataGrid
            columns={STAFF_LIST_COLUMNS}
            colTemplate="80px 1fr 1fr 1fr 80px"
            data={filtered}
            getKey={(s) => s.id}
            totalLabel="staff"
            onRowClick={(s) => setSelectedStaff(s)}
            renderRow={(s) => (
              <>
                <div className="px-3 py-2.5 text-sm text-gray-600">{s.id}</div>
                <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{s.name}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{s.role}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{s.school}</div>
                <div className="px-3 py-2.5"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">{s.status}</span></div>
              </>
            )}
          />
        </>
      ) : (
        <StaffDetail staff={selectedStaff} onBack={() => setSelectedStaff(null)} />
      )}
    </div>
  );
}
