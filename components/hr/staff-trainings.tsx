"use client";

import { useState } from "react";
import { BookOpen, Eye, X, ExternalLink } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

interface TrainingItem {
  id: string;
  title: string;
  provider: string;
  type: "in-house" | "external";
  status: "upcoming" | "ongoing" | "completed";
  startDate: string;
  endDate: string;
  participants: string[];
}

interface TrainingRequest {
  id: string;
  staffName: string;
  staffId: string;
  trainingTitle: string;
  provider: string;
  estimatedCost: string;
  subsidyRequested: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
}

const MOCK_TRAININGS: TrainingItem[] = [
  {
    id: "TRN001", title: "Advanced Machine Learning Workshop", provider: "Makerere University",
    type: "external", status: "completed", startDate: "2025-09-10", endDate: "2025-09-15",
    participants: ["Dr. Sarah Namukasa", "Prof. Daniel Mukasa"],
  },
  {
    id: "TRN002", title: "New LMS Platform Training", provider: "AFRU IT Department",
    type: "in-house", status: "completed", startDate: "2025-11-18", endDate: "2025-11-20",
    participants: ["Dr. Sarah Namukasa", "Dr. Grace Atuhaire", "Agnes Birungi"],
  },
  {
    id: "TRN003", title: "Academic Leadership Seminar", provider: "AFRU HR",
    type: "in-house", status: "ongoing", startDate: "2026-01-15", endDate: "2026-02-15",
    participants: ["Prof. Daniel Mukasa"],
  },
  {
    id: "TRN004", title: "Cybersecurity Fundamentals", provider: "Uganda Technology Institute",
    type: "external", status: "upcoming", startDate: "2026-03-01", endDate: "2026-03-05",
    participants: [],
  },
];

const MOCK_REQUESTS: TrainingRequest[] = [
  {
    id: "REQ001", staffName: "Dr. Sarah Namukasa", staffId: "EMP001",
    trainingTitle: "Cloud Computing Certification", provider: "AWS Training Center",
    estimatedCost: "UGX 2,500,000", subsidyRequested: "UGX 2,000,000",
    reason: "To enhance cloud computing skills for teaching the new Cloud Computing module and improve AFRU's IT infrastructure knowledge base.",
    status: "pending", requestDate: "2026-01-22",
  },
  {
    id: "REQ002", staffName: "Agnes Birungi", staffId: "EMP003",
    trainingTitle: "Project Management Professional (PMP)", provider: "PMI Uganda",
    estimatedCost: "UGX 3,000,000", subsidyRequested: "UGX 2,500,000",
    reason: "To improve project management capabilities for the administration department and manage upcoming campus expansion projects.",
    status: "approved", requestDate: "2026-01-10",
  },
  {
    id: "REQ003", staffName: "Prof. Daniel Mukasa", staffId: "EMP002",
    trainingTitle: "AI in Education Conference", provider: "International AI Society",
    estimatedCost: "UGX 5,000,000", subsidyRequested: "UGX 4,000,000",
    reason: "Attending international conference to present research and learn about latest AI integration in higher education.",
    status: "rejected", requestDate: "2025-12-15",
  },
];

const statusColors = {
  upcoming: "bg-blue-100 text-blue-700",
  ongoing: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const TRAINING_COLUMNS = [
  { label: "ID" },
  { label: "Training" },
  { label: "Provider" },
  { label: "Type" },
  { label: "Dates" },
  { label: "Status" },
  { label: "View" },
];

export function TrainingDashboard() {
  const [viewTraining, setViewTraining] = useState<TrainingItem | null>(null);

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Training Dashboard</h2>
          <p className="text-xs text-gray-500">View all staff trainings -- both in-house and external</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{MOCK_TRAININGS.filter(t => t.status === "completed").length}</div>
          <div className="text-xs text-green-600 mt-1">Completed</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{MOCK_TRAININGS.filter(t => t.status === "ongoing").length}</div>
          <div className="text-xs text-yellow-600 mt-1">Ongoing</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{MOCK_TRAININGS.filter(t => t.status === "upcoming").length}</div>
          <div className="text-xs text-blue-600 mt-1">Upcoming</div>
        </div>
      </div>

      <DataGrid
        columns={TRAINING_COLUMNS}
        colTemplate="60px 1fr 1fr 100px 100px 100px 60px"
        data={MOCK_TRAININGS}
        getKey={(t) => t.id}
        totalLabel="trainings"
        renderRow={(t) => (
          <>
            <div className="px-3 py-2.5 text-sm text-gray-600">{t.id}</div>
            <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{t.title}</div>
            <div className="px-3 py-2.5 text-sm text-gray-600">{t.provider}</div>
            <div className="px-3 py-2.5">
              <span className={`px-2 py-0.5 text-xs rounded font-medium ${t.type === "in-house" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                {t.type === "in-house" ? "In-house" : "External"}
              </span>
            </div>
            <div className="px-3 py-2.5 text-xs text-gray-600">{t.startDate}</div>
            <div className="px-3 py-2.5">
              <span className={`px-2 py-0.5 text-xs rounded font-medium ${statusColors[t.status]}`}>
                {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <button onClick={(e) => { e.stopPropagation(); setViewTraining(t); }} className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Eye className="h-4 w-4 text-blue-600" />
              </button>
            </div>
          </>
        )}
      />

      {viewTraining && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{viewTraining.title}</h3>
              <button onClick={() => setViewTraining(null)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Provider:</span><span className="text-gray-800">{viewTraining.provider}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Type:</span><span className="text-gray-800">{viewTraining.type === "in-house" ? "In-house" : "External"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Start:</span><span className="text-gray-800">{viewTraining.startDate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">End:</span><span className="text-gray-800">{viewTraining.endDate}</span></div>
              <div>
                <span className="text-gray-500">Participants ({viewTraining.participants.length}):</span>
                {viewTraining.participants.length > 0 ? (
                  <ul className="mt-1 space-y-1">
                    {viewTraining.participants.map((p) => <li key={p} className="text-gray-800">- {p}</li>)}
                  </ul>
                ) : <p className="text-gray-400 mt-1">No participants registered yet.</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TrainingRequests() {
  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <ExternalLink className="h-6 w-6 text-purple-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Training Requests</h2>
          <p className="text-xs text-gray-500">Staff applications for external trainings subsidized by AFRU</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{MOCK_REQUESTS.filter(r => r.status === "pending").length}</div>
          <div className="text-xs text-yellow-600 mt-1">Pending Review</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{MOCK_REQUESTS.filter(r => r.status === "approved").length}</div>
          <div className="text-xs text-green-600 mt-1">Approved</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{MOCK_REQUESTS.filter(r => r.status === "rejected").length}</div>
          <div className="text-xs text-red-600 mt-1">Rejected</div>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_REQUESTS.map((req) => (
          <div key={req.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{req.trainingTitle}</h4>
                <p className="text-xs text-gray-500">Requested by {req.staffName} ({req.staffId}) on {req.requestDate}</p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusColors[req.status]}`}>
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{req.reason}</p>
            <div className="flex gap-6 text-xs text-gray-500 mb-3">
              <span>Provider: <span className="font-medium text-gray-700">{req.provider}</span></span>
              <span>Cost: <span className="font-medium text-gray-700">{req.estimatedCost}</span></span>
              <span>Subsidy: <span className="font-medium text-gray-700">{req.subsidyRequested}</span></span>
            </div>
            {req.status === "pending" && (
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="px-4 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors font-medium">Approve</button>
                <button className="px-4 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors font-medium">Reject</button>
                <button className="px-4 py-1.5 bg-white text-gray-600 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Request More Info</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
