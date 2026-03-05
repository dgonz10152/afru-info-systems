"use client";

import React from "react"

import { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import {
  Search,
  FileText,
  ArrowLeft,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Building2,
  Phone,
  Mail,
  Hash,
} from "lucide-react";

// --- Types ---
interface Invoice {
  id: string;
  invoiceNo: string;
  companyName: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  serialNumber: string;
  amount: number;
  jobDescription: string;
  category: "Maintenance" | "Supply" | "Repair" | "Construction" | "Consulting" | "IT Services";
  dateSubmitted: string;
  dateRequired: string;
  status: "pending" | "approved" | "rejected" | "under-review";
  approvedBy: string | null;
  approvalDate: string | null;
  notes: string;
  items: InvoiceItem[];
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

// --- Mock Data ---
const MOCK_INVOICES: Invoice[] = [
  {
    id: "1", invoiceNo: "QT-2026-0001", companyName: "Kampala Scientific Suppliers Ltd",
    contactPerson: "James Okello", contactPhone: "+256 770 123 456", contactEmail: "james@kampalascientific.co.ug",
    serialNumber: "KSS-2026-A001", amount: 15800000, jobDescription: "Supply of laboratory chemicals and reagents for Chemistry department",
    category: "Supply", dateSubmitted: "2026-01-15", dateRequired: "2026-02-15",
    status: "approved", approvedBy: "Dr. Namutebi Grace", approvalDate: "2026-01-20",
    notes: "Recurring order - annual lab supplies restocking.",
    items: [
      { description: "Hydrochloric Acid (2.5L)", quantity: 20, unitPrice: 180000 },
      { description: "Sodium Hydroxide Pellets (1kg)", quantity: 15, unitPrice: 120000 },
      { description: "Lab Safety Goggles", quantity: 50, unitPrice: 45000 },
      { description: "Glass Beakers Set (250ml)", quantity: 30, unitPrice: 85000 },
    ],
  },
  {
    id: "2", invoiceNo: "QT-2026-0002", companyName: "TechRepair Uganda",
    contactPerson: "David Mugisha", contactPhone: "+256 755 987 654", contactEmail: "david@techrepair.ug",
    serialNumber: "TRU-2026-B045", amount: 8500000, jobDescription: "Repair and servicing of 15 desktop computers in CS Lab 2",
    category: "Repair", dateSubmitted: "2026-01-18", dateRequired: "2026-02-01",
    status: "under-review", approvedBy: null, approvalDate: null,
    notes: "Computers experiencing frequent BSODs, likely storage failures.",
    items: [
      { description: "SSD 512GB Replacement", quantity: 10, unitPrice: 350000 },
      { description: "RAM 8GB DDR4 Module", quantity: 5, unitPrice: 280000 },
      { description: "Labor & Diagnostics", quantity: 15, unitPrice: 150000 },
    ],
  },
  {
    id: "3", invoiceNo: "QT-2026-0003", companyName: "AutoFix Garage Ltd",
    contactPerson: "Robert Ssemakula", contactPhone: "+256 780 456 789", contactEmail: "robert@autofix.co.ug",
    serialNumber: "AFG-2026-V012", amount: 4200000, jobDescription: "Suspension system overhaul for Toyota Hiace campus shuttle",
    category: "Repair", dateSubmitted: "2026-01-05", dateRequired: "2026-01-25",
    status: "approved", approvedBy: "Mr. Kayemba Isaac", approvalDate: "2026-01-08",
    notes: "Vehicle AST-003 - front and rear suspension replacement needed.",
    items: [
      { description: "Front Shock Absorbers (pair)", quantity: 1, unitPrice: 1200000 },
      { description: "Rear Leaf Springs (set)", quantity: 1, unitPrice: 1500000 },
      { description: "Bushings & Bolts Kit", quantity: 1, unitPrice: 350000 },
      { description: "Wheel Alignment", quantity: 1, unitPrice: 150000 },
      { description: "Labor", quantity: 1, unitPrice: 1000000 },
    ],
  },
  {
    id: "4", invoiceNo: "QT-2026-0004", companyName: "FurniCare Ltd",
    contactPerson: "Alice Namuli", contactPhone: "+256 702 333 222", contactEmail: "alice@furnicare.co.ug",
    serialNumber: "FCL-2026-F088", amount: 24000000, jobDescription: "Supply and installation of 60 new office desks for Admin Block renovation",
    category: "Supply", dateSubmitted: "2026-01-22", dateRequired: "2026-03-01",
    status: "pending", approvedBy: null, approvalDate: null,
    notes: "Part of the 2026 Admin Block renovation project.",
    items: [
      { description: "Executive Office Desk (L-shaped)", quantity: 10, unitPrice: 850000 },
      { description: "Standard Office Desk (Rectangular)", quantity: 50, unitPrice: 320000 },
      { description: "Delivery & Installation", quantity: 1, unitPrice: 1500000 },
    ],
  },
  {
    id: "5", invoiceNo: "QT-2026-0005", companyName: "PrintTech Solutions",
    contactPerson: "Samuel Wabwire", contactPhone: "+256 771 555 888", contactEmail: "samuel@printtech.ug",
    serialNumber: "PTS-2026-P023", amount: 3200000, jobDescription: "Quarterly printer servicing and toner supply for all campus printers",
    category: "Maintenance", dateSubmitted: "2026-02-01", dateRequired: "2026-02-10",
    status: "pending", approvedBy: null, approvalDate: null,
    notes: "Covers 8 printers across 4 departments.",
    items: [
      { description: "HP Toner Cartridge (High Yield)", quantity: 8, unitPrice: 250000 },
      { description: "Printer Servicing Fee", quantity: 8, unitPrice: 75000 },
      { description: "Replacement Drums", quantity: 3, unitPrice: 180000 },
    ],
  },
  {
    id: "6", invoiceNo: "QT-2026-0006", companyName: "BuildRight Contractors",
    contactPerson: "Peter Ochieng", contactPhone: "+256 788 111 222", contactEmail: "peter@buildright.co.ug",
    serialNumber: "BRC-2026-C005", amount: 45000000, jobDescription: "Renovation of Science Block ground floor - tiling, painting, and electrical upgrades",
    category: "Construction", dateSubmitted: "2026-01-10", dateRequired: "2026-04-30",
    status: "rejected", approvedBy: "Finance Committee", approvalDate: "2026-01-28",
    notes: "Rejected: Budget exceeded allocation. Resubmit with revised scope.",
    items: [
      { description: "Floor Tiling (450 sqm)", quantity: 1, unitPrice: 18000000 },
      { description: "Interior Painting (900 sqm)", quantity: 1, unitPrice: 9000000 },
      { description: "Electrical Rewiring", quantity: 1, unitPrice: 12000000 },
      { description: "Project Management Fee", quantity: 1, unitPrice: 6000000 },
    ],
  },
  {
    id: "7", invoiceNo: "QT-2026-0007", companyName: "NetSecure IT Consulting",
    contactPerson: "Diana Atim", contactPhone: "+256 756 777 999", contactEmail: "diana@netsecure.ug",
    serialNumber: "NIC-2026-IT01", amount: 12000000, jobDescription: "Campus network security audit and firewall configuration upgrade",
    category: "IT Services", dateSubmitted: "2026-02-05", dateRequired: "2026-03-15",
    status: "under-review", approvedBy: null, approvalDate: null,
    notes: "Recommended by ICT department after recent phishing incident.",
    items: [
      { description: "Network Security Audit", quantity: 1, unitPrice: 5000000 },
      { description: "Firewall License (1 year)", quantity: 1, unitPrice: 4000000 },
      { description: "Configuration & Deployment", quantity: 1, unitPrice: 2000000 },
      { description: "Staff Training Workshop", quantity: 1, unitPrice: 1000000 },
    ],
  },
];

const formatCurrency = (amount: number) =>
  `UGX ${amount.toLocaleString()}`;

const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock className="h-3 w-3" />, label: "Pending" },
  approved: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="h-3 w-3" />, label: "Approved" },
  rejected: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="h-3 w-3" />, label: "Rejected" },
  "under-review": { bg: "bg-blue-100", text: "text-blue-700", icon: <Eye className="h-3 w-3" />, label: "Under Review" },
};

// --- Invoice Dashboard ---
export function InvoiceDashboard() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const categories = [...new Set(MOCK_INVOICES.map((inv) => inv.category))];

  const filtered = MOCK_INVOICES.filter((inv) => {
    const matchSearch =
      inv.companyName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      inv.jobDescription.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || inv.status === filterStatus;
    const matchCategory = filterCategory === "all" || inv.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  const totalValue = MOCK_INVOICES.reduce((s, inv) => s + inv.amount, 0);
  const approvedValue = MOCK_INVOICES.filter((inv) => inv.status === "approved").reduce((s, inv) => s + inv.amount, 0);

  // Detail View
  if (selectedInvoice) {
    const inv = selectedInvoice;
    const sc = statusConfig[inv.status];
    return (
      <div className="p-6 flex flex-col h-full bg-white overflow-auto">
        <button
          onClick={() => setSelectedInvoice(null)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-4 w-fit transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Invoices
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <FileText className="h-6 w-6 text-blue-600" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{inv.invoiceNo}</h2>
            <p className="text-xs text-gray-500">{inv.companyName}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${sc.bg} ${sc.text}`}>
            {sc.icon} {sc.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Company & Contact Info */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Company & Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-800">{inv.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{inv.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{inv.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-blue-600">{inv.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Serial: {inv.serialNumber}</span>
              </div>
            </div>
          </div>

          {/* Quote Details */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Quote Details</h4>
            <div className="space-y-2">
              {[
                ["Category", inv.category],
                ["Date Submitted", inv.dateSubmitted],
                ["Date Required", inv.dateRequired],
                ["Approved By", inv.approvedBy ?? "Pending"],
                ["Approval Date", inv.approvalDate ?? "N/A"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-medium text-gray-800">{value}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between">
                <span className="text-sm font-semibold text-gray-700">Total Amount</span>
                <span className="text-sm font-bold text-gray-900">{formatCurrency(inv.amount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Job Description</h4>
          <p className="text-sm text-gray-700">{inv.jobDescription}</p>
          {inv.notes && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-medium text-amber-800">Notes: {inv.notes}</p>
            </div>
          )}
        </div>

        {/* Line Items */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className="grid grid-cols-[1fr_80px_120px_130px] bg-slate-100 border-b border-gray-200">
            <div className="px-4 py-3 text-xs font-semibold text-gray-600">Item Description</div>
            <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-center">Qty</div>
            <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Unit Price</div>
            <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Subtotal</div>
          </div>
          {inv.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_80px_120px_130px] border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
              <div className="px-4 py-3 text-sm text-gray-800">{item.description}</div>
              <div className="px-3 py-3 text-sm text-gray-700 text-center">{item.quantity}</div>
              <div className="px-3 py-3 text-sm text-gray-700 text-right">{formatCurrency(item.unitPrice)}</div>
              <div className="px-3 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(item.quantity * item.unitPrice)}</div>
            </div>
          ))}
          <div className="grid grid-cols-[1fr_80px_120px_130px] bg-slate-50 border-t border-gray-200">
            <div className="px-4 py-3 text-sm font-bold text-gray-700" />
            <div className="px-3 py-3" />
            <div className="px-3 py-3 text-sm font-bold text-gray-700 text-right">Total</div>
            <div className="px-3 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(inv.amount)}</div>
          </div>
        </div>

        {/* Approval Actions */}
        {(inv.status === "pending" || inv.status === "under-review") && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-sm text-gray-600">Actions:</span>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors font-medium">
              <CheckCircle className="h-4 w-4" /> Approve
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-medium">
              <XCircle className="h-4 w-4" /> Reject
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
              <AlertTriangle className="h-4 w-4" /> Request Revision
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Invoice & Quote Dashboard</h2>
          <p className="text-xs text-gray-500">Track quotes, manage approvals, and monitor vendor invoices</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-700">{MOCK_INVOICES.length}</div>
          <div className="text-xs text-blue-600">Total Quotes</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-700">{MOCK_INVOICES.filter((i) => i.status === "approved").length}</div>
          <div className="text-xs text-green-600">Approved</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-700">{MOCK_INVOICES.filter((i) => i.status === "pending" || i.status === "under-review").length}</div>
          <div className="text-xs text-yellow-600">Pending Review</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-700">{formatCurrency(totalValue)}</div>
          <div className="text-xs text-purple-600">Total Value</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); }}
            className="flex-1 text-sm bg-transparent placeholder-gray-400 focus:outline-none text-gray-800"
            placeholder="Search by company, invoice, serial, contact..."
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <DataGrid
        columns={[
          { label: "Invoice #" },
          { label: "Company / Job" },
          { label: "Serial No." },
          { label: "Category" },
          { label: "Amount", className: "text-right" },
          { label: "Status", className: "text-center" },
          { label: "View", className: "text-center" },
        ]}
        colTemplate="90px 1fr 130px 100px 120px 100px 60px"
        data={filtered}
        getKey={(inv) => inv.id}
        pageSize={6}
        totalLabel="invoices"
        onRowClick={(inv) => setSelectedInvoice(inv)}
        renderRow={(inv) => {
          const sc = statusConfig[inv.status];
          return (
            <>
              <div className="px-3 py-3 text-sm font-mono text-blue-700">{inv.invoiceNo}</div>
              <div className="px-3 py-3">
                <div className="text-sm font-medium text-gray-900">{inv.companyName}</div>
                <div className="text-xs text-gray-500 truncate">{inv.jobDescription}</div>
              </div>
              <div className="px-3 py-3 text-sm text-gray-600 font-mono flex items-center">{inv.serialNumber}</div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{inv.category}</div>
              <div className="px-3 py-3 text-sm font-medium text-gray-800 text-right flex items-center justify-end">{formatCurrency(inv.amount)}</div>
              <div className="px-3 py-3 flex items-center justify-center">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium ${sc.bg} ${sc.text}`}>
                  {sc.icon} {sc.label}
                </span>
              </div>
              <div className="px-3 py-3 flex items-center justify-center">
                <button className="text-xs text-blue-600 hover:underline font-medium" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); }}>
                  View
                </button>
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
