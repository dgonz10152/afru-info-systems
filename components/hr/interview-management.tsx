"use client";

import { useState } from "react";
import { Search, Plus, Eye, FileText, X } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  applicationDate: string;
  status: "processing" | "employed" | "rejected";
  scores: { criteria: string; score: number; maxScore: number }[];
  resumeFile: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "C001",
    name: "Sarah Namukasa",
    position: "Lecturer - Computer Science",
    email: "sarah.n@email.com",
    phone: "+256 700 123 456",
    applicationDate: "2026-01-10",
    status: "processing",
    scores: [
      { criteria: "Academic Qualifications", score: 8, maxScore: 10 },
      { criteria: "Teaching Experience", score: 7, maxScore: 10 },
      { criteria: "Interview Performance", score: 9, maxScore: 10 },
      { criteria: "Research Publications", score: 6, maxScore: 10 },
    ],
    resumeFile: "sarah_namukasa_cv.pdf",
  },
  {
    id: "C002",
    name: "David Ochieng",
    position: "Administrative Assistant",
    email: "david.o@email.com",
    phone: "+256 770 234 567",
    applicationDate: "2026-01-08",
    status: "employed",
    scores: [
      { criteria: "Academic Qualifications", score: 7, maxScore: 10 },
      { criteria: "Work Experience", score: 8, maxScore: 10 },
      { criteria: "Interview Performance", score: 8, maxScore: 10 },
      { criteria: "Communication Skills", score: 9, maxScore: 10 },
    ],
    resumeFile: "david_ochieng_cv.pdf",
  },
  {
    id: "C003",
    name: "Grace Atuhaire",
    position: "Lecturer - Theology",
    email: "grace.a@email.com",
    phone: "+256 780 345 678",
    applicationDate: "2026-01-15",
    status: "rejected",
    scores: [
      { criteria: "Academic Qualifications", score: 5, maxScore: 10 },
      { criteria: "Teaching Experience", score: 4, maxScore: 10 },
      { criteria: "Interview Performance", score: 6, maxScore: 10 },
      { criteria: "Research Publications", score: 3, maxScore: 10 },
    ],
    resumeFile: "grace_atuhaire_cv.pdf",
  },
];

const statusColors = {
  processing: "bg-yellow-100 text-yellow-700",
  employed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const CANDIDATES_COLUMNS = [
  { label: "ID" },
  { label: "Name" },
  { label: "Position" },
  { label: "Date" },
  { label: "Status" },
  { label: "Actions" },
];

interface CandidatesListProps {
  onSelectCandidate: (candidate: Candidate) => void;
  selectedId: string | null;
}

function CandidatesList({ onSelectCandidate, selectedId }: CandidatesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = MOCK_CANDIDATES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="processing">Processing</option>
          <option value="employed">Employed</option>
          <option value="rejected">Rejected</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
          <Plus className="h-4 w-4" />
          Add Candidate
        </button>
      </div>

      <DataGrid
        columns={CANDIDATES_COLUMNS}
        colTemplate="60px 1fr 1fr 120px 120px 80px"
        data={filtered}
        getKey={(c) => c.id}
        totalLabel="candidates"
        onRowClick={onSelectCandidate}
        getRowClass={(c) => selectedId === c.id ? "bg-blue-50" : ""}
        renderRow={(c) => (
          <>
            <div className="px-3 py-2.5 text-sm text-gray-600">{c.id}</div>
            <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{c.name}</div>
            <div className="px-3 py-2.5 text-sm text-gray-600">{c.position}</div>
            <div className="px-3 py-2.5 text-sm text-gray-600">{c.applicationDate}</div>
            <div className="px-3 py-2.5">
              <span className={`px-2 py-1 text-xs rounded font-medium ${statusColors[c.status]}`}>
                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <button
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                onClick={(e) => { e.stopPropagation(); onSelectCandidate(c); }}
              >
                <Eye className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </>
        )}
      />
    </div>
  );
}

interface CandidateDetailProps {
  candidate: Candidate;
  onClose: () => void;
}

function CandidateDetail({ candidate, onClose }: CandidateDetailProps) {
  const totalScore = candidate.scores.reduce((sum, s) => sum + s.score, 0);
  const maxTotal = candidate.scores.reduce((sum, s) => sum + s.maxScore, 0);
  const percentage = Math.round((totalScore / maxTotal) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Biodata</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Position:</span><span className="text-gray-800">{candidate.position}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="text-gray-800">{candidate.email}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="text-gray-800">{candidate.phone}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Applied:</span><span className="text-gray-800">{candidate.applicationDate}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[candidate.status]}`}>{candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}</span></div>
          </div>

          <h4 className="text-sm font-semibold text-gray-700 mt-5 mb-3">Application File</h4>
          <div className="flex items-center gap-2 p-3 bg-slate-50 border border-gray-200 rounded-lg">
            <FileText className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-700 flex-1">{candidate.resumeFile}</span>
            <button className="text-xs text-blue-600 hover:underline font-medium">Download</button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Interview Scores</h4>
          <div className="space-y-3">
            {candidate.scores.map((score) => (
              <div key={score.criteria}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{score.criteria}</span>
                  <span className="text-gray-800 font-medium">{score.score}/{score.maxScore}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${(score.score / score.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <span className="text-sm text-gray-600">Overall Score: </span>
            <span className="text-lg font-bold text-blue-700">{percentage}%</span>
            <span className="text-sm text-gray-500"> ({totalScore}/{maxTotal})</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2 pt-4 border-t border-gray-200">
        <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors font-medium">Approve & Employ</button>
        <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-medium">Reject</button>
        <button className="px-4 py-2 bg-white text-gray-700 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Update Status</button>
      </div>
    </div>
  );
}

export function InterviewCandidates() {
  const [selected, setSelected] = useState<Candidate | null>(null);

  return (
    <div className="p-6 flex flex-col h-full bg-white">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Candidates</h2>
          <p className="text-xs text-gray-500">Manage interview candidates and their applications</p>
        </div>
      </div>

      <CandidatesList onSelectCandidate={setSelected} selectedId={selected?.id ?? null} />

      {selected && (
        <div className="mt-4">
          <CandidateDetail candidate={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}

const SCORES_SUMMARY_COLUMNS = [
  { label: "ID" },
  { label: "Candidate" },
  { label: "Position" },
  { label: "Total" },
  { label: "Percentage" },
  { label: "Verdict" },
];

export function InterviewScores() {
  const scoredCandidates = MOCK_CANDIDATES.map((c) => {
    const total = c.scores.reduce((s, sc) => s + sc.score, 0);
    const max = c.scores.reduce((s, sc) => s + sc.maxScore, 0);
    const pct = Math.round((total / max) * 100);
    return { ...c, total, max, pct };
  });

  return (
    <div className="p-6 flex flex-col h-full bg-white">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Interview Scores</h2>
          <p className="text-xs text-gray-500">View and manage interview criteria scoring</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border border-gray-200 flex-1">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Scoring Summary</h3>
        <DataGrid
          columns={SCORES_SUMMARY_COLUMNS}
          colTemplate="60px 1fr 1fr 100px 100px 100px"
          data={scoredCandidates}
          getKey={(c) => c.id}
          totalLabel="candidates"
          renderRow={(c) => (
            <>
              <div className="px-3 py-2.5 text-sm text-gray-600">{c.id}</div>
              <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{c.name}</div>
              <div className="px-3 py-2.5 text-sm text-gray-600">{c.position}</div>
              <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{c.total}/{c.max}</div>
              <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{c.pct}%</div>
              <div className="px-3 py-2.5">
                <span className={`px-2 py-1 text-xs rounded font-medium ${c.pct >= 70 ? "bg-green-100 text-green-700" : c.pct >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                  {c.pct >= 70 ? "Pass" : c.pct >= 50 ? "Borderline" : "Fail"}
                </span>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}

const STATUS_COLUMNS = [
  { label: "ID" },
  { label: "Candidate" },
  { label: "Position" },
  { label: "Date Applied" },
  { label: "Status" },
];

export function InterviewStatus() {
  return (
    <div className="p-6 flex flex-col h-full bg-white">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Application Status</h2>
          <p className="text-xs text-gray-500">Track the status of all candidate applications</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{MOCK_CANDIDATES.filter(c => c.status === "processing").length}</div>
          <div className="text-sm text-yellow-600 mt-1">Processing</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{MOCK_CANDIDATES.filter(c => c.status === "employed").length}</div>
          <div className="text-sm text-green-600 mt-1">Employed</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{MOCK_CANDIDATES.filter(c => c.status === "rejected").length}</div>
          <div className="text-sm text-red-600 mt-1">Rejected</div>
        </div>
      </div>

      <DataGrid
        columns={STATUS_COLUMNS}
        colTemplate="60px 1fr 1fr 120px 120px"
        data={MOCK_CANDIDATES}
        getKey={(c) => c.id}
        totalLabel="candidates"
        renderRow={(c) => (
          <>
            <div className="px-3 py-2.5 text-sm text-gray-600">{c.id}</div>
            <div className="px-3 py-2.5 text-sm text-gray-800 font-medium">{c.name}</div>
            <div className="px-3 py-2.5 text-sm text-gray-600">{c.position}</div>
            <div className="px-3 py-2.5 text-sm text-gray-600">{c.applicationDate}</div>
            <div className="px-3 py-2.5">
              <span className={`px-2 py-1 text-xs rounded font-medium ${statusColors[c.status]}`}>
                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
              </span>
            </div>
          </>
        )}
      />
    </div>
  );
}
