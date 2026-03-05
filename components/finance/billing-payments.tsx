"use client";

import { useState } from "react";
import {
  Search,
  Download,
  Filter,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpDown,
  FileSpreadsheet,
} from "lucide-react";

// -- Mock Billing Data --
interface BillingRecord {
  id: string;
  invoiceNo: string;
  description: string;
  category: string;
  payer: string;
  payerType: "student" | "staff" | "vendor" | "institution";
  amount: number;
  amountPaid: number;
  balance: number;
  status: "paid" | "partial" | "unpaid" | "overdue";
  issueDate: string;
  dueDate: string;
  paymentDate: string | null;
  paymentMethod: string | null;
}

const MOCK_BILLING: BillingRecord[] = [
  {
    id: "1", invoiceNo: "INV-2026-0001", description: "Semester 1 Tuition", category: "Tuition Fees",
    payer: "Achieng Sarah", payerType: "student", amount: 4500000, amountPaid: 2700000, balance: 1800000,
    status: "partial", issueDate: "2025-08-15", dueDate: "2026-03-15", paymentDate: "2026-01-10", paymentMethod: "Bank Transfer",
  },
  {
    id: "2", invoiceNo: "INV-2026-0002", description: "Lab Equipment Purchase", category: "Procurement",
    payer: "Kampala Scientific Suppliers", payerType: "vendor", amount: 15000000, amountPaid: 15000000, balance: 0,
    status: "paid", issueDate: "2025-09-01", dueDate: "2025-12-01", paymentDate: "2025-11-28", paymentMethod: "Bank Transfer",
  },
  {
    id: "3", invoiceNo: "INV-2026-0003", description: "Hostel Accommodation Fee", category: "Accommodation",
    payer: "Mukisa Brian", payerType: "student", amount: 1500000, amountPaid: 0, balance: 1500000,
    status: "overdue", issueDate: "2025-08-15", dueDate: "2025-10-15", paymentDate: null, paymentMethod: null,
  },
  {
    id: "4", invoiceNo: "INV-2026-0004", description: "Printing Services - Q1", category: "Services",
    payer: "Crown Printers Ltd", payerType: "vendor", amount: 2500000, amountPaid: 0, balance: 2500000,
    status: "unpaid", issueDate: "2026-01-05", dueDate: "2026-02-28", paymentDate: null, paymentMethod: null,
  },
  {
    id: "5", invoiceNo: "INV-2026-0005", description: "Medical Insurance - Staff", category: "Insurance",
    payer: "AAR Health Services", payerType: "institution", amount: 8000000, amountPaid: 8000000, balance: 0,
    status: "paid", issueDate: "2025-07-01", dueDate: "2025-08-01", paymentDate: "2025-07-25", paymentMethod: "Bank Transfer",
  },
  {
    id: "6", invoiceNo: "INV-2026-0006", description: "Semester 1 Tuition", category: "Tuition Fees",
    payer: "Ochieng David", payerType: "student", amount: 3500000, amountPaid: 1750000, balance: 1750000,
    status: "partial", issueDate: "2025-08-15", dueDate: "2026-03-15", paymentDate: "2025-12-05", paymentMethod: "Mobile Money",
  },
  {
    id: "7", invoiceNo: "INV-2026-0007", description: "Conference Room Renovation", category: "Maintenance",
    payer: "BuildRight Contractors", payerType: "vendor", amount: 12000000, amountPaid: 6000000, balance: 6000000,
    status: "partial", issueDate: "2025-11-01", dueDate: "2026-02-01", paymentDate: "2025-12-15", paymentMethod: "Bank Transfer",
  },
  {
    id: "8", invoiceNo: "INV-2026-0008", description: "Semester 1 Tuition", category: "Tuition Fees",
    payer: "Nakato Faith", payerType: "student", amount: 3800000, amountPaid: 3800000, balance: 0,
    status: "paid", issueDate: "2025-08-15", dueDate: "2026-03-15", paymentDate: "2026-01-25", paymentMethod: "Bank Transfer",
  },
];

const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

// -- Billing Dashboard --
export function BillingDashboard() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "partial" | "unpaid" | "overdue">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<"date" | "amount">("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = [...new Set(MOCK_BILLING.map((b) => b.category))];

  const filtered = MOCK_BILLING
    .filter((b) => {
      const matchSearch =
        b.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
        b.payer.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "all" || b.status === filterStatus;
      const matchCategory = filterCategory === "all" || b.category === filterCategory;
      return matchSearch && matchStatus && matchCategory;
    })
    .sort((a, b) => {
      if (sortField === "date") {
        return sortAsc ? a.issueDate.localeCompare(b.issueDate) : b.issueDate.localeCompare(a.issueDate);
      }
      return sortAsc ? a.amount - b.amount : b.amount - a.amount;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalBilled = MOCK_BILLING.reduce((s, b) => s + b.amount, 0);
  const totalCollected = MOCK_BILLING.reduce((s, b) => s + b.amountPaid, 0);
  const totalOutstanding = MOCK_BILLING.reduce((s, b) => s + b.balance, 0);

  const statusConfig = {
    paid: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="h-3.5 w-3.5" /> },
    partial: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="h-3.5 w-3.5" /> },
    unpaid: { bg: "bg-gray-100", text: "text-gray-700", icon: <XCircle className="h-3.5 w-3.5" /> },
    overdue: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="h-3.5 w-3.5" /> },
  };

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Billing Dashboard</h2>
          <p className="text-xs text-gray-500">Track all school billing, invoices, and payment statuses</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-700">{formatCurrency(totalBilled)}</div>
          <div className="text-xs text-blue-600 mt-1">Total Billed</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-700">{formatCurrency(totalCollected)}</div>
          <div className="text-xs text-green-600 mt-1">Total Collected</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-700">{formatCurrency(totalOutstanding)}</div>
          <div className="text-xs text-red-600 mt-1">Outstanding</div>
        </div>
        <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-800">{MOCK_BILLING.length}</div>
          <div className="text-xs text-gray-600 mt-1">Total Invoices</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoices, payers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
          />
        </div>
        <div className="flex gap-1 border border-gray-300 rounded-lg p-0.5">
          {(["all", "paid", "partial", "unpaid", "overdue"] as const).map((f) => (
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
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={() => { setSortAsc(!sortAsc); }}
          className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors bg-white"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          {sortField === "date" ? "Date" : "Amount"} {sortAsc ? "Asc" : "Desc"}
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[100px_1fr_120px_120px_130px_130px_80px] bg-slate-100 border-b border-gray-200">
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Invoice</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Description / Payer</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Category</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Amount</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Balance</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Due Date</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-center">Status</div>
        </div>
        {paginatedData.map((b) => {
          const sc = statusConfig[b.status];
          return (
            <div key={b.id} className="grid grid-cols-[100px_1fr_120px_120px_130px_130px_80px] border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
              <div className="px-3 py-3 text-sm font-mono text-blue-700">{b.invoiceNo}</div>
              <div className="px-3 py-3">
                <div className="text-sm font-medium text-gray-900">{b.description}</div>
                <div className="text-xs text-gray-500">{b.payer}</div>
              </div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{b.category}</div>
              <div className="px-3 py-3 text-sm text-gray-700 text-right flex items-center justify-end">{formatCurrency(b.amount)}</div>
              <div className="px-3 py-3 text-sm font-medium text-right flex items-center justify-end">
                <span className={b.balance > 0 ? "text-red-700" : "text-green-700"}>{formatCurrency(b.balance)}</span>
              </div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{b.dueDate}</div>
              <div className="px-3 py-3 flex items-center justify-center">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium ${sc.bg} ${sc.text}`}>
                  {sc.icon} {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
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
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} invoices
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

// -- QuickBooks Export Page --
export function QuickBooksExport() {
  const [dateFrom, setDateFrom] = useState("2025-07-01");
  const [dateTo, setDateTo] = useState("2026-01-31");
  const [exportType, setExportType] = useState<"all" | "income" | "expenses" | "payroll">("all");
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
      // Generate CSV content
      const headers = ["Invoice No,Description,Category,Payer,Amount,Amount Paid,Balance,Status,Issue Date,Due Date,Payment Date,Payment Method"];
      const rows = MOCK_BILLING.map((b) =>
        `${b.invoiceNo},${b.description},${b.category},${b.payer},${b.amount},${b.amountPaid},${b.balance},${b.status},${b.issueDate},${b.dueDate},${b.paymentDate || ""},${b.paymentMethod || ""}`
      );
      const csv = [...headers, ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quickbooks-export-${dateFrom}-to-${dateTo}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1500);
  };

  const exportHistory = [
    { date: "2026-01-28", type: "All Transactions", records: 847, user: "Mukiibi Jonathan" },
    { date: "2026-01-15", type: "Income Only", records: 312, user: "Mukiibi Jonathan" },
    { date: "2025-12-31", type: "All Transactions", records: 1204, user: "Admin" },
    { date: "2025-12-15", type: "Payroll", records: 45, user: "Admin" },
  ];

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileSpreadsheet className="h-6 w-6 text-green-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">QuickBooks Export</h2>
          <p className="text-xs text-gray-500">Export financial data into CSV format for QuickBooks integration</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Export Configuration */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Export Configuration</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Date From:</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Date To:</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Export Type:</label>
              <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value as typeof exportType)}
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Transactions</option>
                <option value="income">Income Only</option>
                <option value="expenses">Expenses Only</option>
                <option value="payroll">Payroll Only</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Export Details</h4>
            <div className="space-y-1 text-xs text-blue-700">
              <div>Format: CSV (Comma Separated Values)</div>
              <div>Compatible with: QuickBooks Desktop / Online</div>
              <div>Columns: Invoice No, Description, Category, Payer, Amount, Status, Dates</div>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isExporting ? "Exporting..." : "Export to CSV"}
          </button>

          {exported && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
              <CheckCircle className="h-4 w-4" />
              Export completed. CSV file has been downloaded.
            </div>
          )}
        </div>

        {/* Export History */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Export History</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-[100px_1fr_80px_120px] bg-slate-100 border-b border-gray-200">
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Date</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Type</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600 text-right">Records</div>
              <div className="px-3 py-2.5 text-xs font-semibold text-gray-600">Exported By</div>
            </div>
            {exportHistory.map((h, i) => (
              <div key={i} className="grid grid-cols-[100px_1fr_80px_120px] border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                <div className="px-3 py-2.5 text-sm text-gray-700">{h.date}</div>
                <div className="px-3 py-2.5 text-sm text-gray-800">{h.type}</div>
                <div className="px-3 py-2.5 text-sm text-gray-700 text-right">{h.records}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{h.user}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
