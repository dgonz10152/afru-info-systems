"use client";

import { useState } from "react";
import {
  Search,
  Download,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpDown,
  FileSpreadsheet,
} from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";

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

const statusConfig = {
  paid: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="h-3.5 w-3.5" /> },
  partial: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="h-3.5 w-3.5" /> },
  unpaid: { bg: "bg-gray-100", text: "text-gray-700", icon: <XCircle className="h-3.5 w-3.5" /> },
  overdue: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="h-3.5 w-3.5" /> },
};

const BILLING_COLUMNS = [
  { label: "Invoice" },
  { label: "Description / Payer" },
  { label: "Category" },
  { label: "Amount", className: "text-right" },
  { label: "Balance", className: "text-right" },
  { label: "Due Date" },
  { label: "Status", className: "text-center" },
];

export function BillingDashboard() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "partial" | "unpaid" | "overdue">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<"date" | "amount">("date");
  const [sortAsc, setSortAsc] = useState(false);

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

  const totalBilled = MOCK_BILLING.reduce((s, b) => s + b.amount, 0);
  const totalCollected = MOCK_BILLING.reduce((s, b) => s + b.amountPaid, 0);
  const totalOutstanding = MOCK_BILLING.reduce((s, b) => s + b.balance, 0);

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Billing Dashboard</h2>
          <p className="text-xs text-gray-500">Track all school billing, invoices, and payment statuses</p>
        </div>
      </div>

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
          onClick={() => setSortAsc(!sortAsc)}
          className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors bg-white"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          {sortField === "date" ? "Date" : "Amount"} {sortAsc ? "Asc" : "Desc"}
        </button>
      </div>

      <DataGrid
        columns={BILLING_COLUMNS}
        colTemplate="100px 1fr 120px 120px 130px 130px 80px"
        data={filtered}
        getKey={(b) => b.id}
        totalLabel="invoices"
        renderRow={(b) => {
          const sc = statusConfig[b.status];
          return (
            <>
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
            </>
          );
        }}
      />
    </div>
  );
}

const EXPORT_HISTORY_COLUMNS = [
  { label: "Date" },
  { label: "Type" },
  { label: "Records", className: "text-right" },
  { label: "Exported By" },
];

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
    { id: "1", date: "2026-01-28", type: "All Transactions", records: 847, user: "Mukiibi Jonathan" },
    { id: "2", date: "2026-01-15", type: "Income Only", records: 312, user: "Mukiibi Jonathan" },
    { id: "3", date: "2025-12-31", type: "All Transactions", records: 1204, user: "Admin" },
    { id: "4", date: "2025-12-15", type: "Payroll", records: 45, user: "Admin" },
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

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Export History</h3>
          <DataGrid
            columns={EXPORT_HISTORY_COLUMNS}
            colTemplate="100px 1fr 80px 120px"
            data={exportHistory}
            getKey={(h) => h.id}
            totalLabel="exports"
            renderRow={(h) => (
              <>
                <div className="px-3 py-2.5 text-sm text-gray-700">{h.date}</div>
                <div className="px-3 py-2.5 text-sm text-gray-800">{h.type}</div>
                <div className="px-3 py-2.5 text-sm text-gray-700 text-right">{h.records}</div>
                <div className="px-3 py-2.5 text-sm text-gray-600">{h.user}</div>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
