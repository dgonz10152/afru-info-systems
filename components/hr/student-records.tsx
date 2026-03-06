"use client";

import { useState } from "react";
import { Search, Users, BookOpen, Clock, MapPin, ArrowLeft, User, Plus, RefreshCw, X, Check, AlertTriangle } from "lucide-react";
import {
  MOCK_RETAKES, MOCK_PROBATION,
  RETAKE_STATUS_STYLE, RETAKE_STATUS_LABEL,
  PROBATION_STATUS_STYLE, PROBATION_STATUS_LABEL,
} from "@/components/students/academic-standing";

interface ClassInfo {
  id: string;
  name: string;
  code: string;
  room: string;
  lecturer: string;
  time: string;
  day: string;
  students: { id: string; name: string }[];
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  program: string;
  programKey: string;
  year: number;
  gpa: string;
  status: string;
  address: string;
  nationality: string;
  classes: ClassInfo[];
}

// Available classes per program (dummy data — replace with API later)
const AVAILABLE_CLASSES: Record<string, ClassInfo[]> = {
  "BSc. Computer Science": [
    { id: "CLS001", name: "Data Structures & Algorithms", code: "CS301", room: "Block A - Room 205", lecturer: "Dr. Sarah Namukasa", time: "9:00 AM - 11:00 AM", day: "Monday, Wednesday", students: [] },
    { id: "CLS002", name: "Software Engineering", code: "CS302", room: "Block B - Room 101", lecturer: "Prof. Daniel Mukasa", time: "2:00 PM - 4:00 PM", day: "Tuesday, Thursday", students: [] },
    { id: "CLS005", name: "Database Systems", code: "CS303", room: "Block A - Room 210", lecturer: "Dr. Paul Kigozi", time: "11:00 AM - 1:00 PM", day: "Monday, Friday", students: [] },
    { id: "CLS006", name: "Computer Networks", code: "CS304", room: "Block B - Room 115", lecturer: "Dr. Alice Nabatanzi", time: "3:00 PM - 5:00 PM", day: "Wednesday, Friday", students: [] },
    { id: "CLS007", name: "Operating Systems", code: "CS305", room: "Block C - Room 201", lecturer: "Prof. John Byaruhanga", time: "8:00 AM - 10:00 AM", day: "Tuesday, Thursday", students: [] },
    { id: "CLS008", name: "Artificial Intelligence", code: "CS401", room: "Block A - Room 220", lecturer: "Dr. Sarah Namukasa", time: "1:00 PM - 3:00 PM", day: "Monday, Wednesday", students: [] },
  ],
  "BA. Theology": [
    { id: "CLS003", name: "Systematic Theology", code: "TH201", room: "Block C - Room 302", lecturer: "Dr. Grace Atuhaire", time: "10:00 AM - 12:00 PM", day: "Monday, Wednesday, Friday", students: [] },
    { id: "CLS009", name: "Biblical Hermeneutics", code: "TH202", room: "Block C - Room 310", lecturer: "Rev. Simon Ochieng", time: "8:00 AM - 10:00 AM", day: "Tuesday, Thursday", students: [] },
    { id: "CLS010", name: "Church History", code: "TH203", room: "Block C - Room 305", lecturer: "Dr. Grace Atuhaire", time: "2:00 PM - 4:00 PM", day: "Monday, Wednesday", students: [] },
    { id: "CLS011", name: "Ethics & Moral Theology", code: "TH301", room: "Block D - Room 101", lecturer: "Prof. Emmanuel Okello", time: "11:00 AM - 1:00 PM", day: "Tuesday, Friday", students: [] },
    { id: "CLS012", name: "Pastoral Ministry", code: "TH302", room: "Block C - Room 302", lecturer: "Rev. Simon Ochieng", time: "3:00 PM - 5:00 PM", day: "Thursday", students: [] },
  ],
  "BBA. Business Administration": [
    { id: "CLS004", name: "Strategic Management", code: "BA401", room: "Block A - Room 110", lecturer: "Dr. John Kato", time: "8:00 AM - 10:00 AM", day: "Tuesday, Thursday", students: [] },
    { id: "CLS013", name: "Financial Accounting", code: "BA201", room: "Block A - Room 105", lecturer: "Dr. Rose Namayanja", time: "10:00 AM - 12:00 PM", day: "Monday, Wednesday", students: [] },
    { id: "CLS014", name: "Marketing Management", code: "BA301", room: "Block B - Room 210", lecturer: "Prof. David Ssali", time: "1:00 PM - 3:00 PM", day: "Tuesday, Thursday", students: [] },
    { id: "CLS015", name: "Business Law", code: "BA302", room: "Block A - Room 108", lecturer: "Dr. John Kato", time: "9:00 AM - 11:00 AM", day: "Monday, Friday", students: [] },
    { id: "CLS016", name: "Entrepreneurship", code: "BA303", room: "Block B - Room 205", lecturer: "Dr. Rose Namayanja", time: "2:00 PM - 4:00 PM", day: "Wednesday, Friday", students: [] },
    { id: "CLS017", name: "Operations Management", code: "BA402", room: "Block A - Room 115", lecturer: "Prof. David Ssali", time: "11:00 AM - 1:00 PM", day: "Tuesday, Thursday", students: [] },
  ],
};

const MOCK_STUDENTS: Student[] = [
  {
    id: "STU001",
    name: "James Ssempijja",
    email: "james.s@aru.ac.ug",
    phone: "+256 700 111 222",
    dateOfBirth: "2002-03-15",
    gender: "Male",
    program: "BSc. Computer Science",
    programKey: "BSc. Computer Science",
    year: 3,
    gpa: "3.8",
    status: "Active",
    address: "Kampala, Uganda",
    nationality: "Ugandan",
    classes: [
      {
        id: "CLS001", name: "Data Structures & Algorithms", code: "CS301",
        room: "Block A - Room 205", lecturer: "Dr. Sarah Namukasa", time: "9:00 AM - 11:00 AM", day: "Monday, Wednesday",
        students: [
          { id: "STU001", name: "James Ssempijja" }, { id: "STU004", name: "Peter Okello" },
          { id: "STU005", name: "Faith Nakitto" }, { id: "STU006", name: "Moses Wafula" },
        ],
      },
      {
        id: "CLS002", name: "Software Engineering", code: "CS302",
        room: "Block B - Room 101", lecturer: "Prof. Daniel Mukasa", time: "2:00 PM - 4:00 PM", day: "Tuesday, Thursday",
        students: [
          { id: "STU001", name: "James Ssempijja" }, { id: "STU004", name: "Peter Okello" },
          { id: "STU007", name: "Esther Amuge" },
        ],
      },
    ],
  },
  {
    id: "STU002",
    name: "Mary Nalubega",
    email: "mary.n@aru.ac.ug",
    phone: "+256 770 333 444",
    dateOfBirth: "2003-07-22",
    gender: "Female",
    program: "BA. Theology",
    programKey: "BA. Theology",
    year: 2,
    gpa: "3.5",
    status: "Active",
    address: "Entebbe, Uganda",
    nationality: "Ugandan",
    classes: [
      {
        id: "CLS003", name: "Systematic Theology", code: "TH201",
        room: "Block C - Room 302", lecturer: "Dr. Grace Atuhaire", time: "10:00 AM - 12:00 PM", day: "Monday, Wednesday, Friday",
        students: [
          { id: "STU002", name: "Mary Nalubega" }, { id: "STU008", name: "Ruth Achieng" },
          { id: "STU009", name: "Joseph Mugisha" },
        ],
      },
    ],
  },
  {
    id: "STU003",
    name: "Emmanuel Okot",
    email: "emmanuel.o@aru.ac.ug",
    phone: "+256 780 555 666",
    dateOfBirth: "2001-11-08",
    gender: "Male",
    program: "BBA. Business Administration",
    programKey: "BBA. Business Administration",
    year: 4,
    gpa: "3.2",
    status: "Active",
    address: "Gulu, Uganda",
    nationality: "Ugandan",
    classes: [
      {
        id: "CLS004", name: "Strategic Management", code: "BA401",
        room: "Block A - Room 110", lecturer: "Dr. John Kato", time: "8:00 AM - 10:00 AM", day: "Tuesday, Thursday",
        students: [
          { id: "STU003", name: "Emmanuel Okot" }, { id: "STU010", name: "Agnes Nantongo" },
        ],
      },
    ],
  },
];

function ClassSwapModal({
  student,
  swappingClass,
  onClose,
  onSave,
}: {
  student: Student;
  swappingClass: ClassInfo | null;
  onClose: () => void;
  onSave: (selected: ClassInfo, replacing: ClassInfo | null) => void;
}) {
  const available = AVAILABLE_CLASSES[student.programKey] ?? [];
  const enrolledIds = new Set(student.classes.map((c) => c.id));
  const [selected, setSelected] = useState<ClassInfo | null>(null);
  const [search, setSearch] = useState("");

  const options = available.filter(
    (c) =>
      (swappingClass ? c.id !== swappingClass.id : !enrolledIds.has(c.id)) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-[560px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {swappingClass ? `Swap: ${swappingClass.code} — ${swappingClass.name}` : "Add Class"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {swappingClass
                ? "Select a replacement from available courses for this program."
                : "Select a class to enroll the student in."}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by code or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5 py-3 space-y-2">
          {options.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">No available classes found.</p>
          )}
          {options.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setSelected(cls)}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selected?.id === cls.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">{cls.code}</span>
                    <span className="text-sm font-medium text-gray-800">{cls.name}</span>
                    {selected?.id === cls.id && <Check className="h-4 w-4 text-blue-600 ml-auto" />}
                  </div>
                  <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-gray-500">
                    <span><MapPin className="inline h-3 w-3 mr-1" />{cls.room}</span>
                    <span><Clock className="inline h-3 w-3 mr-1" />{cls.time}</span>
                    <span><User className="inline h-3 w-3 mr-1" />{cls.lecturer}</span>
                    <span><BookOpen className="inline h-3 w-3 mr-1" />{cls.day}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-gray-200 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => selected && onSave(selected, swappingClass)}
            disabled={!selected}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {swappingClass ? "Swap Class" : "Add Class"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ClassDetail({ cls, onBack }: { cls: ClassInfo; onBack: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-gray-200 px-5 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1 hover:bg-gray-200 rounded transition-colors">
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </button>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{cls.name}</h4>
          <span className="text-xs text-gray-500">{cls.code}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-gray-100">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div><div className="text-xs text-gray-500">Room</div><div className="text-sm font-medium text-gray-800">{cls.room}</div></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-gray-100">
            <User className="h-5 w-5 text-purple-600" />
            <div><div className="text-xs text-gray-500">Lecturer</div><div className="text-sm font-medium text-gray-800">{cls.lecturer}</div></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-gray-100">
            <Clock className="h-5 w-5 text-orange-500" />
            <div><div className="text-xs text-gray-500">Time</div><div className="text-sm font-medium text-gray-800">{cls.time}</div></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-gray-100">
            <BookOpen className="h-5 w-5 text-green-600" />
            <div><div className="text-xs text-gray-500">Days</div><div className="text-sm font-medium text-gray-800">{cls.day}</div></div>
          </div>
        </div>

        <h4 className="text-sm font-semibold text-gray-700 mb-3">Enrolled Students ({cls.students.length})</h4>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[60px_1fr] bg-slate-100 border-b border-gray-200">
            <div className="px-3 py-2 text-xs font-semibold text-gray-600">ID</div>
            <div className="px-3 py-2 text-xs font-semibold text-gray-600">Name</div>
          </div>
          {cls.students.map((s) => (
            <div key={s.id} className="grid grid-cols-[60px_1fr] border-b border-gray-100 hover:bg-blue-50 transition-colors">
              <div className="px-3 py-2 text-sm text-gray-600">{s.id}</div>
              <div className="px-3 py-2 text-sm text-gray-800">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [swappingClass, setSwappingClass] = useState<ClassInfo | null>(null);
  const [removeConfirm, setRemoveConfirm] = useState<string | null>(null);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSaveClass(newCls: ClassInfo, replacing: ClassInfo | null) {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== selectedStudent?.id) return s;
        const updatedClasses = replacing
          ? s.classes.map((c) => (c.id === replacing.id ? newCls : c))
          : [...s.classes, newCls];
        return { ...s, classes: updatedClasses };
      })
    );
    setSelectedStudent((prev) => {
      if (!prev) return prev;
      const updatedClasses = replacing
        ? prev.classes.map((c) => (c.id === replacing.id ? newCls : c))
        : [...prev.classes, newCls];
      return { ...prev, classes: updatedClasses };
    });
    setModalOpen(false);
    setSwappingClass(null);
  }

  function handleRemoveClass(classId: string) {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== selectedStudent?.id) return s;
        return { ...s, classes: s.classes.filter((c) => c.id !== classId) };
      })
    );
    setSelectedStudent((prev) => {
      if (!prev) return prev;
      return { ...prev, classes: prev.classes.filter((c) => c.id !== classId) };
    });
    setRemoveConfirm(null);
  }

  if (selectedClass) {
    return (
      <div className="p-6 bg-white h-full overflow-auto">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Class Details</h2>
            <p className="text-xs text-gray-500">Viewing class information</p>
          </div>
        </div>
        <ClassDetail cls={selectedClass} onBack={() => setSelectedClass(null)} />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full bg-white">
      {modalOpen && selectedStudent && (
        <ClassSwapModal
          student={selectedStudent}
          swappingClass={swappingClass}
          onClose={() => { setModalOpen(false); setSwappingClass(null); }}
          onSave={handleSaveClass}
        />
      )}

      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <Users className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Student Records</h2>
          <p className="text-xs text-gray-500">Search and view student records, biodata, and class schedules</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Student ID or Name..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setSelectedStudent(null); }}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {!selectedStudent ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden flex-1">
          <div className="grid bg-slate-100 border-b border-gray-200" style={{ gridTemplateColumns: "80px 1fr 1fr 60px 60px 80px 80px" }}>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">ID</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Name</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Program</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Year</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">GPA</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Status</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Flags</div>
          </div>
          {filtered.map((student) => {
            const probation = MOCK_PROBATION.find((p) => p.studentId === student.id && (p.status === "active" || p.status === "warning"));
            const retakeCount = MOCK_RETAKES.filter((r) => r.studentId === student.id && r.status === "in-progress").length;
            return (
              <div
                key={student.id}
                className="grid border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                style={{ gridTemplateColumns: "80px 1fr 1fr 60px 60px 80px 80px" }}
                onClick={() => setSelectedStudent(student)}
              >
                <div className="px-3 py-2.5 text-sm text-gray-600">{student.id}</div>
                <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{student.name}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{student.program}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{student.year}</div>
                <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{student.gpa}</div>
                <div className="px-3 py-2.5"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">{student.status}</span></div>
                <div className="px-3 py-2.5 flex items-center gap-1 flex-wrap">
                  {probation && (
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded font-medium flex items-center gap-0.5">
                      <AlertTriangle className="h-2.5 w-2.5" /> Probation
                    </span>
                  )}
                  {retakeCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                      {retakeCount} Retake{retakeCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to list
          </button>

          {/* Probation alert banner */}
          {(() => {
            const prob = MOCK_PROBATION.find((p) => p.studentId === selectedStudent.id && (p.status === "active" || p.status === "warning"));
            if (!prob) return null;
            return (
              <div className="mb-4 flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                <div className="flex-1 text-sm">
                  <span className="font-semibold text-orange-800">Academic Probation</span>
                  <span className="text-orange-700"> — CGPA {prob.cgpa.toFixed(2)} (threshold {prob.threshold.toFixed(1)})</span>
                  <span className="text-orange-600 ml-2">· {prob.semestersOnProbation} semester{prob.semestersOnProbation > 1 ? "s" : ""} on probation</span>
                  <span className="text-orange-500 ml-2 text-xs">· Review: {prob.reviewDate}</span>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded font-medium shrink-0 ${PROBATION_STATUS_STYLE[prob.status]}`}>
                  {PROBATION_STATUS_LABEL[prob.status]}
                </span>
              </div>
            );
          })()}

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Biodata</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Full Name:</span><span className="text-gray-800">{selectedStudent.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Student ID:</span><span className="text-gray-800">{selectedStudent.id}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="text-gray-800">{selectedStudent.email}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="text-gray-800">{selectedStudent.phone}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Date of Birth:</span><span className="text-gray-800">{selectedStudent.dateOfBirth}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Gender:</span><span className="text-gray-800">{selectedStudent.gender}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Nationality:</span><span className="text-gray-800">{selectedStudent.nationality}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Address:</span><span className="text-gray-800">{selectedStudent.address}</span></div>
              </div>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Academic Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Program:</span><span className="text-gray-800">{selectedStudent.program}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Year:</span><span className="text-gray-800">Year {selectedStudent.year}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">GPA:</span><span className="text-gray-800 font-semibold">{selectedStudent.gpa}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium">{selectedStudent.status}</span></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">
              Class Schedule <span className="text-gray-400 font-normal">({selectedStudent.classes.length} enrolled)</span>
            </h4>
            <button
              onClick={() => { setSwappingClass(null); setModalOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="h-3.5 w-3.5" /> Add Class
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="grid bg-slate-100 border-b border-gray-200"
              style={{ gridTemplateColumns: "80px 1fr 110px 130px 1fr 80px" }}
            >
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Code</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Class Name</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Room</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Time</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Days</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Actions</div>
            </div>
            {selectedStudent.classes.length === 0 && (
              <div className="px-4 py-6 text-sm text-gray-400 text-center">
                No classes enrolled. Use &quot;Add Class&quot; to enroll.
              </div>
            )}
            {selectedStudent.classes.map((cls) => (
              <div
                key={cls.id}
                className="grid border-b border-gray-100 hover:bg-blue-50 transition-colors"
                style={{ gridTemplateColumns: "80px 1fr 110px 130px 1fr 80px" }}
              >
                <div
                  className="px-3 py-2.5 text-sm text-blue-600 font-medium cursor-pointer"
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls.code}
                </div>
                <div
                  className="px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:text-blue-600"
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls.name}
                </div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{cls.room}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{cls.time}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{cls.day}</div>
                <div className="px-3 py-2.5 flex items-center gap-1">
                  {removeConfirm === cls.id ? (
                    <>
                      <button
                        onClick={() => handleRemoveClass(cls.id)}
                        className="p-1 rounded text-red-600 hover:bg-red-50 transition-colors"
                        title="Confirm remove"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setRemoveConfirm(null)}
                        className="p-1 rounded text-gray-500 hover:bg-gray-100 transition-colors"
                        title="Cancel"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setSwappingClass(cls); setModalOpen(true); }}
                        className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Swap class"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setRemoveConfirm(cls.id)}
                        className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove class"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Click a class code or name to view details. Use <RefreshCw className="inline h-3 w-3" /> to swap or <X className="inline h-3 w-3" /> to remove.
          </p>

          {/* Course Retakes section */}
          {(() => {
            const retakes = MOCK_RETAKES.filter((r) => r.studentId === selectedStudent.id);
            if (retakes.length === 0) return null;
            return (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-blue-600" />
                  Course Retakes
                  <span className="text-gray-400 font-normal">({retakes.length} record{retakes.length > 1 ? "s" : ""})</span>
                </h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid bg-slate-100 border-b border-gray-200" style={{ gridTemplateColumns: "80px 1fr 70px 80px 70px 160px 110px" }}>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-600">Code</div>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-600">Course</div>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-600">Attempt</div>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-600">Original</div>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-600">Retake</div>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-600">Semester</div>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-600">Status</div>
                  </div>
                  {retakes.map((r) => (
                    <div key={r.id} className="grid border-b border-gray-100 hover:bg-slate-50 transition-colors" style={{ gridTemplateColumns: "80px 1fr 70px 80px 70px 160px 110px" }}>
                      <div className="px-3 py-2.5 text-sm text-blue-600 font-medium">{r.courseCode}</div>
                      <div className="px-3 py-2.5 text-sm text-gray-700">{r.courseName}</div>
                      <div className="px-3 py-2.5 text-sm text-gray-500 text-center">#{r.retakeAttempt}</div>
                      <div className="px-3 py-2.5 text-sm">
                        <span className="text-red-600 font-semibold">{r.originalGrade}</span>
                        <span className="text-gray-400 text-xs ml-1">({r.originalScore})</span>
                      </div>
                      <div className="px-3 py-2.5 text-sm">
                        {r.retakeScore !== null
                          ? <><span className="text-green-700 font-semibold">{r.retakeGrade}</span><span className="text-gray-400 text-xs ml-1">({r.retakeScore})</span></>
                          : <span className="text-gray-300 text-xs">Pending</span>}
                      </div>
                      <div className="px-3 py-2.5 text-xs text-gray-500">{r.semester}</div>
                      <div className="px-3 py-2.5">
                        <span className={`px-2 py-0.5 text-xs rounded font-medium ${RETAKE_STATUS_STYLE[r.status]}`}>
                          {RETAKE_STATUS_LABEL[r.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
