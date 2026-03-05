"use client";

import React from "react"

import { useState } from "react";
import {
  Search,
  Package,
  ArrowLeft,
  Wrench,
  MapPin,
  Tag,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  History,
  BarChart3,
  Box,
  Monitor,
  Truck,
  Building2,
} from "lucide-react";

// --- Types ---
interface Asset {
  id: string;
  assetTag: string;
  name: string;
  category: "IT Equipment" | "Furniture" | "Vehicles" | "Lab Equipment" | "Office Supplies" | "Building";
  location: string;
  department: string;
  condition: "excellent" | "good" | "fair" | "poor" | "decommissioned";
  quantity: number;
  unitValue: number;
  purchaseDate: string;
  warrantyExpiry: string | null;
  assignedTo: string | null;
  lastInspection: string;
  restorations: Restoration[];
}

interface Restoration {
  id: string;
  date: string;
  type: "repair" | "maintenance" | "refurbishment" | "replacement";
  description: string;
  vendor: string;
  cost: number;
  status: "completed" | "in-progress" | "scheduled";
}

// --- Mock Data ---
const MOCK_ASSETS: Asset[] = [
  {
    id: "1", assetTag: "AST-001", name: "Dell OptiPlex 7090 Desktop", category: "IT Equipment",
    location: "Block A - Room 201", department: "Computer Science", condition: "good", quantity: 25,
    unitValue: 3500000, purchaseDate: "2023-06-15", warrantyExpiry: "2026-06-15",
    assignedTo: "CS Lab 1", lastInspection: "2025-12-01",
    restorations: [
      { id: "r1", date: "2025-03-12", type: "repair", description: "Replaced 3 faulty motherboards", vendor: "TechRepair Uganda", cost: 1200000, status: "completed" },
      { id: "r2", date: "2025-09-20", type: "maintenance", description: "Full system cleanup and software update", vendor: "In-House IT", cost: 150000, status: "completed" },
    ],
  },
  {
    id: "2", assetTag: "AST-002", name: "HP LaserJet Pro MFP M428", category: "IT Equipment",
    location: "Admin Block - Reception", department: "Administration", condition: "fair", quantity: 3,
    unitValue: 2800000, purchaseDate: "2022-01-20", warrantyExpiry: "2025-01-20",
    assignedTo: "Admin Office", lastInspection: "2025-11-15",
    restorations: [
      { id: "r3", date: "2024-07-05", type: "repair", description: "Drum and toner replacement", vendor: "PrintTech Solutions", cost: 450000, status: "completed" },
      { id: "r4", date: "2025-11-15", type: "refurbishment", description: "Full service and roller replacement", vendor: "PrintTech Solutions", cost: 800000, status: "completed" },
    ],
  },
  {
    id: "3", assetTag: "AST-003", name: "Toyota Hiace (14-Seater)", category: "Vehicles",
    location: "Parking Lot B", department: "Transport", condition: "good", quantity: 2,
    unitValue: 85000000, purchaseDate: "2021-03-10", warrantyExpiry: null,
    assignedTo: "Transport Dept.", lastInspection: "2026-01-05",
    restorations: [
      { id: "r5", date: "2025-06-18", type: "maintenance", description: "Full engine service, oil change, brake pads", vendor: "AutoFix Garage", cost: 2500000, status: "completed" },
      { id: "r6", date: "2026-01-05", type: "repair", description: "Suspension system overhaul", vendor: "AutoFix Garage", cost: 4200000, status: "in-progress" },
    ],
  },
  {
    id: "4", assetTag: "AST-004", name: "Laboratory Microscopes (Olympus CX23)", category: "Lab Equipment",
    location: "Science Block - Lab 3", department: "Biology", condition: "excellent", quantity: 30,
    unitValue: 1800000, purchaseDate: "2024-02-01", warrantyExpiry: "2027-02-01",
    assignedTo: "Bio Lab 3", lastInspection: "2025-12-10",
    restorations: [],
  },
  {
    id: "5", assetTag: "AST-005", name: "Lecture Hall Chairs (Stackable)", category: "Furniture",
    location: "Main Hall", department: "Facilities", condition: "fair", quantity: 200,
    unitValue: 120000, purchaseDate: "2019-08-01", warrantyExpiry: null,
    assignedTo: "Main Lecture Hall", lastInspection: "2025-10-20",
    restorations: [
      { id: "r7", date: "2023-04-10", type: "refurbishment", description: "Reupholstered 45 chairs", vendor: "FurniCare Ltd", cost: 3600000, status: "completed" },
      { id: "r8", date: "2025-10-20", type: "replacement", description: "Replaced 12 broken chairs", vendor: "Office World", cost: 1440000, status: "completed" },
    ],
  },
  {
    id: "6", assetTag: "AST-006", name: "Epson EB-2265U Projectors", category: "IT Equipment",
    location: "Various Lecture Halls", department: "ICT Services", condition: "good", quantity: 15,
    unitValue: 4500000, purchaseDate: "2022-09-15", warrantyExpiry: "2025-09-15",
    assignedTo: "Lecture Halls", lastInspection: "2025-11-30",
    restorations: [
      { id: "r9", date: "2025-05-22", type: "repair", description: "Bulb replacement on 4 units", vendor: "ProjectorHub Uganda", cost: 3200000, status: "completed" },
    ],
  },
  {
    id: "7", assetTag: "AST-007", name: "Water Storage Tanks (10,000L)", category: "Building",
    location: "Roof - Block C", department: "Facilities", condition: "good", quantity: 4,
    unitValue: 2500000, purchaseDate: "2020-11-01", warrantyExpiry: null,
    assignedTo: "Facilities Dept.", lastInspection: "2025-08-15",
    restorations: [
      { id: "r10", date: "2025-08-15", type: "maintenance", description: "Tank cleaning and pipe inspection", vendor: "WaterWorks Co.", cost: 600000, status: "completed" },
    ],
  },
  {
    id: "8", assetTag: "AST-008", name: "Standing Desks (Adjustable)", category: "Furniture",
    location: "Admin Block - Floor 2", department: "Administration", condition: "excellent", quantity: 12,
    unitValue: 950000, purchaseDate: "2025-01-10", warrantyExpiry: "2028-01-10",
    assignedTo: "Admin Staff", lastInspection: "2025-12-20",
    restorations: [],
  },
];

const formatCurrency = (amount: number) =>
  `UGX ${amount.toLocaleString()}`;

const conditionConfig: Record<string, { bg: string; text: string; label: string }> = {
  excellent: { bg: "bg-green-100", text: "text-green-700", label: "Excellent" },
  good: { bg: "bg-blue-100", text: "text-blue-700", label: "Good" },
  fair: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Fair" },
  poor: { bg: "bg-red-100", text: "text-red-700", label: "Poor" },
  decommissioned: { bg: "bg-gray-200", text: "text-gray-600", label: "Decommissioned" },
};

const categoryIcon: Record<string, React.ReactNode> = {
  "IT Equipment": <Monitor className="h-4 w-4 text-blue-600" />,
  "Furniture": <Box className="h-4 w-4 text-amber-600" />,
  "Vehicles": <Truck className="h-4 w-4 text-green-600" />,
  "Lab Equipment": <Package className="h-4 w-4 text-purple-600" />,
  "Office Supplies": <Tag className="h-4 w-4 text-cyan-600" />,
  "Building": <Building2 className="h-4 w-4 text-gray-600" />,
};

// --- Asset Dashboard ---
export function AssetDashboard() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterCondition, setFilterCondition] = useState<string>("all");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [...new Set(MOCK_ASSETS.map((a) => a.category))];

  const filtered = MOCK_ASSETS.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.assetTag.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "all" || a.category === filterCategory;
    const matchCondition = filterCondition === "all" || a.condition === filterCondition;
    return matchSearch && matchCategory && matchCondition;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalAssetValue = MOCK_ASSETS.reduce((sum, a) => sum + a.quantity * a.unitValue, 0);
  const totalItems = MOCK_ASSETS.reduce((sum, a) => sum + a.quantity, 0);
  const needsAttention = MOCK_ASSETS.filter((a) => a.condition === "poor" || a.condition === "fair").length;

  // Detail View
  if (selectedAsset) {
    const a = selectedAsset;
    const cond = conditionConfig[a.condition];
    return (
      <div className="p-6 flex flex-col h-full bg-white overflow-auto">
        <button
          onClick={() => setSelectedAsset(null)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-4 w-fit transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Assets
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          {categoryIcon[a.category]}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{a.name}</h2>
            <p className="text-xs text-gray-500">{a.assetTag} - {a.department}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${cond.bg} ${cond.text}`}>{cond.label}</span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-700">{a.quantity}</div>
            <div className="text-xs text-blue-600 mt-0.5">Total Count</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-700">{formatCurrency(a.unitValue)}</div>
            <div className="text-xs text-green-600 mt-0.5">Unit Value</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-700">{formatCurrency(a.quantity * a.unitValue)}</div>
            <div className="text-xs text-purple-600 mt-0.5">Total Value</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-orange-700">{formatCurrency(a.restorations.reduce((s, r) => s + r.cost, 0))}</div>
            <div className="text-xs text-orange-600 mt-0.5">Restoration Cost</div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Asset Details</h4>
            <div className="space-y-2">
              {[
                ["Category", a.category],
                ["Location", a.location],
                ["Department", a.department],
                ["Assigned To", a.assignedTo || "Unassigned"],
                ["Purchase Date", a.purchaseDate],
                ["Warranty Expiry", a.warrantyExpiry ?? "N/A"],
                ["Last Inspection", a.lastInspection],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Restoration History ({a.restorations.length})</h4>
            {a.restorations.length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-6">No restorations on record.</div>
            ) : (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {a.restorations.map((r) => {
                  const typeColor: Record<string, string> = {
                    repair: "bg-red-100 text-red-700",
                    maintenance: "bg-blue-100 text-blue-700",
                    refurbishment: "bg-purple-100 text-purple-700",
                    replacement: "bg-orange-100 text-orange-700",
                  };
                  const statusColor: Record<string, string> = {
                    completed: "text-green-600",
                    "in-progress": "text-yellow-600",
                    scheduled: "text-blue-600",
                  };
                  return (
                    <div key={r.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${typeColor[r.type]}`}>
                          {r.type.charAt(0).toUpperCase() + r.type.slice(1)}
                        </span>
                        <span className={`text-xs font-medium ${statusColor[r.status]}`}>
                          {r.status === "completed" ? "Completed" : r.status === "in-progress" ? "In Progress" : "Scheduled"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{r.description}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{r.vendor} - {r.date}</span>
                        <span className="text-xs font-medium text-gray-700">{formatCurrency(r.cost)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <Package className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Asset Dashboard</h2>
          <p className="text-xs text-gray-500">Track and manage institutional resources</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-700">{MOCK_ASSETS.length}</div>
          <div className="text-xs text-blue-600">Asset Types</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-700">{totalItems}</div>
          <div className="text-xs text-green-600">Total Items</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-700">{formatCurrency(totalAssetValue)}</div>
          <div className="text-xs text-purple-600">Total Value</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-700">{needsAttention}</div>
          <div className="text-xs text-orange-600">Needs Attention</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 text-sm bg-transparent placeholder-gray-400 focus:outline-none text-gray-800"
            placeholder="Search by name, tag, department, location..."
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filterCondition}
          onChange={(e) => { setFilterCondition(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Conditions</option>
          {Object.entries(conditionConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[70px_1fr_120px_120px_70px_100px_100px_60px] bg-slate-100 border-b border-gray-200">
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Tag</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Asset Name</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Category</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Location</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-center">Qty</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Total Value</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-center">Condition</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-center">View</div>
        </div>
        {paginatedData.map((a) => {
          const cond = conditionConfig[a.condition];
          return (
            <div
              key={a.id}
              className="grid grid-cols-[70px_1fr_120px_120px_70px_100px_100px_60px] border-b border-gray-100 hover:bg-blue-50/50 transition-colors cursor-pointer"
              onClick={() => setSelectedAsset(a)}
            >
              <div className="px-3 py-3 text-sm font-mono text-blue-700">{a.assetTag}</div>
              <div className="px-3 py-3">
                <div className="text-sm font-medium text-gray-900">{a.name}</div>
                <div className="text-xs text-gray-500">{a.department}</div>
              </div>
              <div className="px-3 py-3 flex items-center gap-1.5 text-sm text-gray-600">
                {categoryIcon[a.category]}
                <span className="truncate">{a.category}</span>
              </div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{a.location}</div>
              <div className="px-3 py-3 text-sm text-gray-800 font-medium text-center flex items-center justify-center">{a.quantity}</div>
              <div className="px-3 py-3 text-sm text-gray-700 text-right flex items-center justify-end">{formatCurrency(a.quantity * a.unitValue)}</div>
              <div className="px-3 py-3 flex items-center justify-center">
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${cond.bg} ${cond.text}`}>{cond.label}</span>
              </div>
              <div className="px-3 py-3 flex items-center justify-center">
                <button className="text-xs text-blue-600 hover:underline font-medium" onClick={(e) => { e.stopPropagation(); setSelectedAsset(a); }}>
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} assets
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

// --- Restoration History (global view) ---
export function RestorationHistory() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allRestorations = MOCK_ASSETS.flatMap((a) =>
    a.restorations.map((r) => ({ ...r, assetName: a.name, assetTag: a.assetTag, assetCategory: a.category }))
  ).sort((a, b) => b.date.localeCompare(a.date));

  const filtered = allRestorations.filter((r) => {
    const matchSearch =
      r.assetName.toLowerCase().includes(search.toLowerCase()) ||
      r.assetTag.toLowerCase().includes(search.toLowerCase()) ||
      r.vendor.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || r.type === filterType;
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalCost = allRestorations.reduce((s, r) => s + r.cost, 0);

  const typeColor: Record<string, { bg: string; text: string }> = {
    repair: { bg: "bg-red-100", text: "text-red-700" },
    maintenance: { bg: "bg-blue-100", text: "text-blue-700" },
    refurbishment: { bg: "bg-purple-100", text: "text-purple-700" },
    replacement: { bg: "bg-orange-100", text: "text-orange-700" },
  };

  const statusColor: Record<string, { bg: string; text: string }> = {
    completed: { bg: "bg-green-100", text: "text-green-700" },
    "in-progress": { bg: "bg-yellow-100", text: "text-yellow-700" },
    scheduled: { bg: "bg-blue-100", text: "text-blue-700" },
  };

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <History className="h-6 w-6 text-orange-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Restoration History</h2>
          <p className="text-xs text-gray-500">Complete log of all asset repairs, maintenance, and replacements</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-700">{allRestorations.length}</div>
          <div className="text-xs text-blue-600">Total Records</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-700">{allRestorations.filter((r) => r.status === "completed").length}</div>
          <div className="text-xs text-green-600">Completed</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-700">{allRestorations.filter((r) => r.status === "in-progress").length}</div>
          <div className="text-xs text-yellow-600">In Progress</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-orange-700">{formatCurrency(totalCost)}</div>
          <div className="text-xs text-orange-600">Total Spent</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 text-sm bg-transparent placeholder-gray-400 focus:outline-none text-gray-800"
            placeholder="Search by asset, vendor, description..."
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="repair">Repair</option>
          <option value="maintenance">Maintenance</option>
          <option value="refurbishment">Refurbishment</option>
          <option value="replacement">Replacement</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      {/* Grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[90px_1fr_100px_1fr_130px_120px_80px] bg-slate-100 border-b border-gray-200">
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Date</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Asset</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-center">Type</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Description</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600">Vendor</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-right">Cost</div>
          <div className="px-3 py-3 text-xs font-semibold text-gray-600 text-center">Status</div>
        </div>
        {paginatedData.map((r) => {
          const tc = typeColor[r.type];
          const sc = statusColor[r.status];
          return (
            <div key={r.id} className="grid grid-cols-[90px_1fr_100px_1fr_130px_120px_80px] border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
              <div className="px-3 py-3 text-sm text-gray-700">{r.date}</div>
              <div className="px-3 py-3">
                <div className="text-sm font-medium text-gray-900 truncate">{r.assetName}</div>
                <div className="text-xs text-gray-500">{r.assetTag}</div>
              </div>
              <div className="px-3 py-3 flex items-center justify-center">
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${tc.bg} ${tc.text}`}>
                  {r.type.charAt(0).toUpperCase() + r.type.slice(1)}
                </span>
              </div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{r.description}</div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{r.vendor}</div>
              <div className="px-3 py-3 text-sm font-medium text-gray-800 text-right flex items-center justify-end">{formatCurrency(r.cost)}</div>
              <div className="px-3 py-3 flex items-center justify-center">
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${sc.bg} ${sc.text}`}>
                  {r.status === "completed" ? "Done" : r.status === "in-progress" ? "Active" : "Soon"}
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
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} records
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
