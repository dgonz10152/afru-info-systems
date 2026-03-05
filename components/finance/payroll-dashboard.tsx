"use client";

import { useState } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Download,
  Search,
  CheckCircle,
  Clock,
  Briefcase,
} from "lucide-react";

// -- Mock Data --
interface PayrollEntry {
  id: string;
  staffName: string;
  staffId: string;
  department: string;
  role: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: "paid" | "processing" | "pending";
  payDate: string | null;
}

const MOCK_PAYROLL: PayrollEntry[] = [
  { id: "1", staffName: "Dr. Okello James", staffId: "STF-001", department: "Computer Science", role: "Senior Lecturer", baseSalary: 4200000, allowances: 800000, deductions: 750000, netPay: 4250000, status: "paid", payDate: "2026-01-28" },
  { id: "2", staffName: "Prof. Nansubuga Grace", staffId: "STF-002", department: "Education", role: "Professor", baseSalary: 5500000, allowances: 1200000, deductions: 1050000, netPay: 5650000, status: "paid", payDate: "2026-01-28" },
  { id: "3", staffName: "Mugisha Robert", staffId: "STF-003", department: "Administration", role: "Registrar", baseSalary: 3800000, allowances: 600000, deductions: 650000, netPay: 3750000, status: "paid", payDate: "2026-01-28" },
  { id: "4", staffName: "Atim Florence", staffId: "STF-004", department: "Finance", role: "Accountant", baseSalary: 3200000, allowances: 500000, deductions: 550000, netPay: 3150000, status: "processing", payDate: null },
  { id: "5", staffName: "Kato Emmanuel", staffId: "STF-005", department: "IT Services", role: "Systems Admin", baseSalary: 3500000, allowances: 700000, deductions: 620000, netPay: 3580000, status: "processing", payDate: null },
  { id: "6", staffName: "Dr. Wandera Patrick", staffId: "STF-006", department: "Theology", role: "Lecturer", baseSalary: 3800000, allowances: 600000, deductions: 660000, netPay: 3740000, status: "pending", payDate: null },
  { id: "7", staffName: "Nabirye Esther", staffId: "STF-007", department: "Library", role: "Librarian", baseSalary: 2500000, allowances: 400000, deductions: 430000, netPay: 2470000, status: "pending", payDate: null },
  { id: "8", staffName: "Ouma Daniel", staffId: "STF-008", department: "Student Affairs", role: "Dean of Students", baseSalary: 4000000, allowances: 900000, deductions: 730000, netPay: 4170000, status: "paid", payDate: "2026-01-28" },
];

const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

export function PayrollDashboard() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "processing" | "pending">("all");
  const [selectedMonth, setSelectedMonth] = useState("2026-01");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = MOCK_PAYROLL.filter((p) => {
    const matchSearch =
      p.staffName.toLowerCase().includes(search.toLowerCase()) ||
      p.staffId.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalBase = MOCK_PAYROLL.reduce((s, p) => s + p.baseSalary, 0);
  const totalAllowances = MOCK_PAYROLL.reduce((s, p) => s + p.allowances, 0);
  const totalDeductions = MOCK_PAYROLL.reduce((s, p) => s + p.deductions, 0);
  const totalNet = MOCK_PAYROLL.reduce((s, p) => s + p.netPay, 0);
  const paidCount = MOCK_PAYROLL.filter((p) => p.status === "paid").length;
  const processingCount = MOCK_PAYROLL.filter((p) => p.status === "processing").length;
  const pendingCount = MOCK_PAYROLL.filter((p) => p.status === "pending").length;

  const monthlyTrend = [
    { month: "Aug 2025", total: 28500000 },
    { month: "Sep 2025", total: 29100000 },
    { month: "Oct 2025", total: 29100000 },
    { month: "Nov 2025", total: 30200000 },
    { month: "Dec 2025", total: 31800000 },
    { month: "Jan 2026", total: totalNet },
  ];

  const maxTrend = Math.max(...monthlyTrend.map((m) => m.total));

  const statusConfig = {
    paid: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="h-3.5 w-3.5" /> },
    processing: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="h-3.5 w-3.5" /> },
    pending: { bg: "bg-gray-100", text: "text-gray-600", icon: <Clock className="h-3.5 w-3.5" /> },
  };

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Payroll Dashboard</h2>
            <p className="text-xs text-gray-500">Monthly payroll overview and management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Total Base Pay</span>
          </div>
          <div className="text-xl font-bold text-blue-700">{formatCurrency(totalBase)}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Total Allowances</span>
          </div>
          <div className="text-xl font-bold text-green-700">{formatCurrency(totalAllowances)}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-red-600" />
            <span className="text-xs text-red-600 font-medium">Total Deductions</span>
          </div>
          <div className="text-xl font-bold text-red-700">{formatCurrency(totalDeductions)}</div>
        </div>
        <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-gray-600" />
            <span className="text-xs text-gray-600 font-medium">Total Net Pay</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{formatCurrency(totalNet)}</div>
        </div>
      </div>

      {/* Status Summary + Monthly Trend */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Payment Status</h3>
          <div className="flex gap-4">
            <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-700">{paidCount}</div>
              <div className="text-xs text-green-600">Paid</div>
            </div>
            <div className="flex-1 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-700">{processingCount}</div>
              <div className="text-xs text-yellow-600">Processing</div>
            </div>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-600">{pendingCount}</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Monthly Payroll Trend</h3>
          <div className="flex items-end gap-2 h-24">
            {monthlyTrend.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(m.total / maxTrend) * 100}%` }}
                  title={formatCurrency(m.total)}
                />
                <span className="text-[10px] text-gray-500">{m.month.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff name, ID, or department..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
          />
        </div>
        <div className="flex gap-1 border border-gray-300 rounded-lg p-0.5">
          {(["all", "paid", "processing", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterStatus === f ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4" /> Export Payslips
        </button>
      </div>

      {/* Payroll Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_80px_120px_110px_110px_110px_110px_80px] bg-slate-100 border-b border-gray-200">
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Staff</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">ID</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Department</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Base Salary</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Allowances</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Deductions</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Net Pay</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-center">Status</div>
        </div>
        {paginatedData.map((p) => {
          const sc = statusConfig[p.status];
          return (
            <div key={p.id} className="grid grid-cols-[1fr_80px_120px_110px_110px_110px_110px_80px] border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
              <div className="px-3 py-3">
                <div className="text-sm font-medium text-gray-900">{p.staffName}</div>
                <div className="text-xs text-gray-500">{p.role}</div>
              </div>
              <div className="px-3 py-3 text-sm text-gray-700 flex items-center">{p.staffId}</div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{p.department}</div>
              <div className="px-3 py-3 text-sm text-gray-700 text-right flex items-center justify-end">{formatCurrency(p.baseSalary)}</div>
              <div className="px-3 py-3 text-sm text-green-700 text-right flex items-center justify-end">+{formatCurrency(p.allowances)}</div>
              <div className="px-3 py-3 text-sm text-red-700 text-right flex items-center justify-end">-{formatCurrency(p.deductions)}</div>
              <div className="px-3 py-3 text-sm font-semibold text-gray-900 text-right flex items-center justify-end">{formatCurrency(p.netPay)}</div>
              <div className="px-3 py-3 flex items-center justify-center">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium ${sc.bg} ${sc.text}`}>
                  {sc.icon}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
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
    </div>
  );
}
