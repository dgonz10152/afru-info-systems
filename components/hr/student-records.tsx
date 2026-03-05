"use client";

import { useState } from "react";
import { Search, Users, BookOpen, Clock, MapPin, ArrowLeft, User } from "lucide-react";

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
  year: number;
  gpa: string;
  status: string;
  address: string;
  nationality: string;
  classes: ClassInfo[];
}

const MOCK_STUDENTS: Student[] = [
  {
    id: "STU001",
    name: "James Ssempijja",
    email: "james.s@aru.ac.ug",
    phone: "+256 700 111 222",
    dateOfBirth: "2002-03-15",
    gender: "Male",
    program: "BSc. Computer Science",
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
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);

  const filtered = MOCK_STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="grid grid-cols-[80px_1fr_1fr_60px_60px_80px] bg-slate-100 border-b border-gray-200">
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">ID</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Name</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Program</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Year</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">GPA</div>
            <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Status</div>
          </div>
          {filtered.map((student) => (
            <div
              key={student.id}
              className="grid grid-cols-[80px_1fr_1fr_60px_60px_80px] border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => setSelectedStudent(student)}
            >
              <div className="px-3 py-2.5 text-sm text-gray-600">{student.id}</div>
              <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{student.name}</div>
              <div className="px-3 py-2.5 text-sm text-gray-600">{student.program}</div>
              <div className="px-3 py-2.5 text-sm text-gray-600">{student.year}</div>
              <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{student.gpa}</div>
              <div className="px-3 py-2.5"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">{student.status}</span></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to list
          </button>

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

          <h4 className="text-sm font-semibold text-gray-700 mb-3">Class Schedule</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_100px_120px_1fr] bg-slate-100 border-b border-gray-200">
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Code</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Class Name</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Room</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Time</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Days</div>
            </div>
            {selectedStudent.classes.map((cls) => (
              <div
                key={cls.id}
                className="grid grid-cols-[80px_1fr_100px_120px_1fr] border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => setSelectedClass(cls)}
              >
                <div className="px-3 py-2.5 text-sm text-blue-600 font-medium">{cls.code}</div>
                <div className="px-3 py-2.5 text-sm text-gray-800 hover:text-blue-600">{cls.name}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{cls.room}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{cls.time}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{cls.day}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">Click on a class to view full details and enrolled students.</p>
        </div>
      )}
    </div>
  );
}
