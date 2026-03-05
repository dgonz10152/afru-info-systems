"use client";

import { useState } from "react";
import { Calendar, CheckCircle, Clock, X, AlertTriangle, Eye } from "lucide-react";

interface LeaveApplication {
  id: string;
  staffName: string;
  staffId: string;
  department: string;
  leaveType: "vacation" | "sick" | "personal" | "maternity" | "study";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  classesMissed: { code: string; name: string; day: string; time: string }[];
  workHoursMissed: number;
  requestDate: string;
}

const MOCK_LEAVE: LeaveApplication[] = [
  {
    id: "LV001",
    staffName: "Prof. Daniel Mukasa",
    staffId: "EMP002",
    department: "Computer Science",
    leaveType: "vacation",
    startDate: "2026-02-10",
    endDate: "2026-02-16",
    days: 5,
    reason: "Family vacation to visit relatives in Mombasa. Have arranged for Dr. Sarah Namukasa to cover my Software Engineering class during this period.",
    status: "pending",
    classesMissed: [
      { code: "CS302", name: "Software Engineering", day: "Tuesday, Thursday", time: "2:00 PM - 4:00 PM" },
      { code: "CS401", name: "Senior Capstone", day: "Wednesday", time: "10:00 AM - 12:00 PM" },
    ],
    workHoursMissed: 45,
    requestDate: "2026-01-28",
  },
  {
    id: "LV002",
    staffName: "Agnes Birungi",
    staffId: "EMP003",
    department: "Administration",
    leaveType: "sick",
    startDate: "2026-01-27",
    endDate: "2026-01-29",
    days: 3,
    reason: "Medical leave for scheduled dental procedure. Supporting medical documentation provided. Tasks have been delegated to the reception team.",
    status: "approved",
    classesMissed: [],
    workHoursMissed: 27,
    requestDate: "2026-01-24",
  },
  {
    id: "LV003",
    staffName: "Dr. Sarah Namukasa",
    staffId: "EMP001",
    department: "Computer Science",
    leaveType: "study",
    startDate: "2026-03-01",
    endDate: "2026-03-15",
    days: 10,
    reason: "Research sabbatical to collaborate with University of Cape Town on AI in education research project. Will present findings at faculty seminar upon return.",
    status: "pending",
    classesMissed: [
      { code: "CS301", name: "Data Structures & Algorithms", day: "Monday, Wednesday", time: "9:00 AM - 11:00 AM" },
    ],
    workHoursMissed: 90,
    requestDate: "2026-01-20",
  },
  {
    id: "LV004",
    staffName: "Dr. Grace Atuhaire",
    staffId: "EMP004",
    department: "Theology",
    leaveType: "personal",
    startDate: "2026-02-03",
    endDate: "2026-02-04",
    days: 2,
    reason: "Personal family matter requiring travel to Mbarara.",
    status: "rejected",
    classesMissed: [
      { code: "TH201", name: "Systematic Theology", day: "Monday, Wednesday, Friday", time: "10:00 AM - 12:00 PM" },
    ],
    workHoursMissed: 18,
    requestDate: "2026-01-25",
  },
];

const leaveTypeColors: Record<string, string> = {
  vacation: "bg-blue-100 text-blue-700",
  sick: "bg-red-100 text-red-700",
  personal: "bg-purple-100 text-purple-700",
  maternity: "bg-pink-100 text-pink-700",
  study: "bg-teal-100 text-teal-700",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

function LeaveDetailModal({ leave, onClose }: { leave: LeaveApplication; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Leave Application - {leave.id}</h3>
            <p className="text-sm text-gray-500">{leave.staffName} ({leave.staffId})</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Department:</span><span className="text-gray-800">{leave.department}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Leave Type:</span><span className={`px-2 py-0.5 rounded text-xs font-medium ${leaveTypeColors[leave.leaveType]}`}>{leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Requested:</span><span className="text-gray-800">{leave.requestDate}</span></div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">From:</span><span className="text-gray-800">{leave.startDate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">To:</span><span className="text-gray-800">{leave.endDate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Duration:</span><span className="text-gray-800 font-medium">{leave.days} day(s)</span></div>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Reason</h4>
            <p className="text-sm text-gray-600 bg-slate-50 border border-gray-200 rounded-lg p-3">{leave.reason}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-xs font-medium text-orange-700">Work Hours Missed</span>
              </div>
              <div className="text-xl font-bold text-orange-800">{leave.workHoursMissed}h</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Classes Affected</span>
              </div>
              <div className="text-xl font-bold text-blue-800">{leave.classesMissed.length}</div>
            </div>
          </div>

          {leave.classesMissed.length > 0 && (
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Classes That Would Be Missed</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-[80px_1fr_1fr_1fr] bg-slate-100 border-b border-gray-200">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-600">Code</div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-600">Class</div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-600">Days</div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-600">Time</div>
                </div>
                {leave.classesMissed.map((cls) => (
                  <div key={cls.code} className="grid grid-cols-[80px_1fr_1fr_1fr] border-b border-gray-100">
                    <div className="px-3 py-2 text-sm text-blue-600 font-medium">{cls.code}</div>
                    <div className="px-3 py-2 text-sm text-gray-800">{cls.name}</div>
                    <div className="px-3 py-2 text-sm text-gray-600">{cls.day}</div>
                    <div className="px-3 py-2 text-sm text-gray-600">{cls.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {leave.status === "pending" && (
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="px-5 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors font-medium">Approve Leave</button>
              <button className="px-5 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-medium">Reject Leave</button>
              <button className="px-5 py-2 bg-white text-gray-600 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Request Clarification</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function LeaveApplications() {
  const [viewLeave, setViewLeave] = useState<LeaveApplication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(MOCK_LEAVE.length / itemsPerPage);
  const paginatedLeave = MOCK_LEAVE.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <Calendar className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Leave Applications</h2>
          <p className="text-xs text-gray-500">Staff leave requests -- view impact on classes and work hours</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{MOCK_LEAVE.filter(l => l.status === "pending").length}</div>
          <div className="text-xs text-yellow-600 mt-1">Pending</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{MOCK_LEAVE.filter(l => l.status === "approved").length}</div>
          <div className="text-xs text-green-600 mt-1">Approved</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{MOCK_LEAVE.filter(l => l.status === "rejected").length}</div>
          <div className="text-xs text-red-600 mt-1">Rejected</div>
        </div>
      </div>

      <div className="space-y-3">
        {paginatedLeave.map((leave) => (
          <div key={leave.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-semibold text-gray-800">{leave.staffName}</h4>
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${leaveTypeColors[leave.leaveType]}`}>
                  {leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${statusColors[leave.status]}`}>
                  {leave.status === "pending" && <Clock className="inline h-3 w-3 mr-1" />}
                  {leave.status === "approved" && <CheckCircle className="inline h-3 w-3 mr-1" />}
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
                <button onClick={() => setViewLeave(leave)} className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Eye className="h-4 w-4 text-blue-600" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{leave.reason}</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>{leave.startDate} to {leave.endDate} ({leave.days} days)</span>
              <span>{leave.classesMissed.length} classes affected</span>
              <span>{leave.workHoursMissed}h work missed</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, MOCK_LEAVE.length)} of {MOCK_LEAVE.length} applications
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {viewLeave && <LeaveDetailModal leave={viewLeave} onClose={() => setViewLeave(null)} />}
    </div>
  );
}
