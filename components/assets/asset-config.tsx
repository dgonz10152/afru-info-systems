"use client";

import { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Package,
  FileText,
  AlertTriangle,
  CheckCircle,
  Building2,
  Phone,
  Mail,
  Hash,
} from "lucide-react";

// ===== MANAGE ASSETS =====

interface AssetEntry {
  id: string;
  assetTag: string;
  name: string;
  category: string;
  location: string;
  department: string;
  condition: string;
  quantity: number;
  unitValue: number;
  purchaseDate: string;
  warrantyExpiry: string;
  assignedTo: string;
}

const INITIAL_ASSETS: AssetEntry[] = [
  { id: "1", assetTag: "AST-001", name: "Dell OptiPlex 7090 Desktop", category: "IT Equipment", location: "Block A - Room 201", department: "Computer Science", condition: "good", quantity: 25, unitValue: 3500000, purchaseDate: "2023-06-15", warrantyExpiry: "2026-06-15", assignedTo: "CS Lab 1" },
  { id: "2", assetTag: "AST-002", name: "HP LaserJet Pro MFP M428", category: "IT Equipment", location: "Admin Block - Reception", department: "Administration", condition: "fair", quantity: 3, unitValue: 2800000, purchaseDate: "2022-01-20", warrantyExpiry: "2025-01-20", assignedTo: "Admin Office" },
  { id: "3", assetTag: "AST-003", name: "Toyota Hiace (14-Seater)", category: "Vehicles", location: "Parking Lot B", department: "Transport", condition: "good", quantity: 2, unitValue: 85000000, purchaseDate: "2021-03-10", warrantyExpiry: "", assignedTo: "Transport Dept." },
  { id: "4", assetTag: "AST-004", name: "Laboratory Microscopes (Olympus CX23)", category: "Lab Equipment", location: "Science Block - Lab 3", department: "Biology", condition: "excellent", quantity: 30, unitValue: 1800000, purchaseDate: "2024-02-01", warrantyExpiry: "2027-02-01", assignedTo: "Bio Lab 3" },
  { id: "5", assetTag: "AST-005", name: "Lecture Hall Chairs (Stackable)", category: "Furniture", location: "Main Hall", department: "Facilities", condition: "fair", quantity: 200, unitValue: 120000, purchaseDate: "2019-08-01", warrantyExpiry: "", assignedTo: "Main Lecture Hall" },
  { id: "6", assetTag: "AST-006", name: "Epson EB-2265U Projectors", category: "IT Equipment", location: "Various Lecture Halls", department: "ICT Services", condition: "good", quantity: 15, unitValue: 4500000, purchaseDate: "2022-09-15", warrantyExpiry: "2025-09-15", assignedTo: "Lecture Halls" },
  { id: "7", assetTag: "AST-007", name: "Water Storage Tanks (10,000L)", category: "Building", location: "Roof - Block C", department: "Facilities", condition: "good", quantity: 4, unitValue: 2500000, purchaseDate: "2020-11-01", warrantyExpiry: "", assignedTo: "Facilities Dept." },
  { id: "8", assetTag: "AST-008", name: "Chemistry Lab Fume Hoods", category: "Lab Equipment", location: "Science Block - Lab 1", department: "Chemistry", condition: "excellent", quantity: 6, unitValue: 12000000, purchaseDate: "2024-08-15", warrantyExpiry: "2029-08-15", assignedTo: "Chem Lab 1" },
];

const ASSET_CATEGORIES = ["IT Equipment", "Furniture", "Vehicles", "Lab Equipment", "Office Supplies", "Building"];
const ASSET_CONDITIONS = ["excellent", "good", "fair", "poor", "decommissioned"];

const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

const emptyAsset: AssetEntry = {
  id: "", assetTag: "", name: "", category: "IT Equipment", location: "", department: "", condition: "good", quantity: 1, unitValue: 0, purchaseDate: "", warrantyExpiry: "", assignedTo: "",
};

export function ManageAssets() {
  const [assets, setAssets] = useState<AssetEntry[]>(INITIAL_ASSETS);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<AssetEntry | null>(null);
  const [formData, setFormData] = useState<AssetEntry>(emptyAsset);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = assets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.assetTag.toLowerCase().includes(search.toLowerCase()) ||
    a.department.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleNew = () => {
    const nextNum = assets.length + 1;
    setFormData({ ...emptyAsset, id: String(Date.now()), assetTag: `AST-${String(nextNum).padStart(3, "0")}` });
    setEditingAsset(null);
    setShowForm(true);
  };

  const handleEdit = (asset: AssetEntry) => {
    setFormData({ ...asset });
    setEditingAsset(asset);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.assetTag) return;
    if (editingAsset) {
      setAssets((prev) => prev.map((a) => (a.id === editingAsset.id ? formData : a)));
    } else {
      setAssets((prev) => [...prev, formData]);
    }
    setShowForm(false);
    setEditingAsset(null);
    setFormData(emptyAsset);
  };

  const handleDelete = (id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAsset(null);
    setFormData(emptyAsset);
  };

  // Form overlay
  if (showForm) {
    return (
      <div className="p-6 flex flex-col h-full bg-white overflow-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{editingAsset ? "Edit Asset" : "New Asset"}</h2>
              <p className="text-xs text-gray-500">{editingAsset ? `Editing ${editingAsset.assetTag}` : "Add a new asset to the registry"}</p>
            </div>
          </div>
          <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Asset Tag</label>
            <input type="text" value={formData.assetTag} onChange={(e) => setFormData({ ...formData, assetTag: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Asset Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. Dell OptiPlex 7090" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              {ASSET_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Condition</label>
            <select value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              {ASSET_CONDITIONS.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. Block A - Room 201" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Department</label>
            <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. Computer Science" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Quantity</label>
            <input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" min={1} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Unit Value (UGX)</label>
            <input type="number" value={formData.unitValue} onChange={(e) => setFormData({ ...formData, unitValue: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" min={0} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Purchase Date</label>
            <input type="date" value={formData.purchaseDate} onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Warranty Expiry</label>
            <input type="date" value={formData.warrantyExpiry} onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Assigned To</label>
            <input type="text" value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. CS Lab 1" />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="h-4 w-4" /> {editingAsset ? "Save Changes" : "Create Asset"}
          </button>
          <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 bg-transparent text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <Package className="h-6 w-6 text-blue-600" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">Manage Assets</h2>
          <p className="text-xs text-gray-500">Create, edit, and remove assets from the registry</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" /> New Asset
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); }}
            placeholder="Search by name, tag, department, category..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <DataGrid
        columns={[
          { label: "Tag" },
          { label: "Name" },
          { label: "Category" },
          { label: "Department" },
          { label: "Qty", className: "text-center" },
          { label: "Unit Value", className: "text-right" },
          { label: "Status", className: "text-center" },
          { label: "Actions", className: "text-center" },
        ]}
        colTemplate="90px 1fr 120px 120px 60px 110px 80px 80px"
        data={filtered}
        getKey={(asset) => asset.id}
        pageSize={6}
        totalLabel="assets"
        emptyMessage="No assets found."
        renderRow={(asset) => (
          <>
            <div className="px-3 py-3 text-sm font-mono text-blue-700">{asset.assetTag}</div>
            <div className="px-3 py-3">
              <div className="text-sm font-medium text-gray-900 truncate">{asset.name}</div>
              <div className="text-xs text-gray-500">{asset.location}</div>
            </div>
            <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{asset.category}</div>
            <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{asset.department}</div>
            <div className="px-3 py-3 text-sm text-gray-700 text-center flex items-center justify-center">{asset.quantity}</div>
            <div className="px-3 py-3 text-sm text-gray-700 text-right flex items-center justify-end">{formatCurrency(asset.unitValue)}</div>
            <div className="px-3 py-3 flex items-center justify-center">
              <span className={`inline-flex px-2 py-0.5 text-xs rounded font-medium ${
                asset.condition === "excellent" ? "bg-green-100 text-green-700" :
                asset.condition === "good" ? "bg-blue-100 text-blue-700" :
                asset.condition === "fair" ? "bg-yellow-100 text-yellow-700" :
                asset.condition === "poor" ? "bg-red-100 text-red-700" :
                "bg-gray-100 text-gray-700"
              }`}>
                {asset.condition.charAt(0).toUpperCase() + asset.condition.slice(1)}
              </span>
            </div>
            <div className="px-3 py-3 flex items-center justify-center gap-1">
              <button onClick={(e) => { e.stopPropagation(); handleEdit(asset); }} className="p-1 hover:bg-blue-100 rounded transition-colors" title="Edit">
                <Edit2 className="h-3.5 w-3.5 text-blue-600" />
              </button>
              {deleteConfirm === asset.id ? (
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(asset.id); }} className="p-1 hover:bg-red-100 rounded transition-colors" title="Confirm delete">
                    <CheckCircle className="h-3.5 w-3.5 text-red-600" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }} className="p-1 hover:bg-gray-100 rounded transition-colors" title="Cancel">
                    <X className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                </div>
              ) : (
                <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(asset.id); }} className="p-1 hover:bg-red-100 rounded transition-colors" title="Delete">
                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                </button>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}


// ===== MANAGE INVOICES =====

interface InvoiceEntry {
  id: string;
  invoiceNo: string;
  companyName: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  serialNumber: string;
  amount: number;
  jobDescription: string;
  category: string;
  dateSubmitted: string;
  dateRequired: string;
  status: string;
  notes: string;
  items: { description: string; quantity: number; unitPrice: number }[];
}

const INVOICE_CATEGORIES = ["Maintenance", "Supply", "Repair", "Construction", "Consulting", "IT Services"];
const INVOICE_STATUSES = ["pending", "approved", "rejected", "under-review"];

const INITIAL_INVOICES: InvoiceEntry[] = [
  { id: "1", invoiceNo: "QT-2026-0001", companyName: "Kampala Scientific Suppliers Ltd", contactPerson: "James Okello", contactPhone: "+256 770 123 456", contactEmail: "james@kampalascientific.co.ug", serialNumber: "KSS-2026-A001", amount: 15800000, jobDescription: "Supply of laboratory chemicals and reagents for Chemistry department", category: "Supply", dateSubmitted: "2026-01-15", dateRequired: "2026-02-15", status: "approved", notes: "Recurring order.", items: [{ description: "Hydrochloric Acid (2.5L)", quantity: 20, unitPrice: 180000 }] },
  { id: "2", invoiceNo: "QT-2026-0002", companyName: "TechRepair Uganda", contactPerson: "David Mugisha", contactPhone: "+256 755 987 654", contactEmail: "david@techrepair.ug", serialNumber: "TRU-2026-B045", amount: 8500000, jobDescription: "Repair and servicing of 15 desktop computers in CS Lab 2", category: "Repair", dateSubmitted: "2026-01-18", dateRequired: "2026-02-01", status: "under-review", notes: "BSODs likely storage failures.", items: [{ description: "SSD 512GB Replacement", quantity: 10, unitPrice: 350000 }] },
  { id: "3", invoiceNo: "QT-2026-0003", companyName: "AutoFix Garage Ltd", contactPerson: "Robert Ssemakula", contactPhone: "+256 780 456 789", contactEmail: "robert@autofix.co.ug", serialNumber: "AFG-2026-V012", amount: 4200000, jobDescription: "Suspension system overhaul for Toyota Hiace campus shuttle", category: "Repair", dateSubmitted: "2026-01-05", dateRequired: "2026-01-25", status: "approved", notes: "Vehicle AST-003.", items: [{ description: "Front Shock Absorbers", quantity: 1, unitPrice: 1200000 }] },
  { id: "4", invoiceNo: "QT-2026-0004", companyName: "FurniCare Ltd", contactPerson: "Alice Namuli", contactPhone: "+256 702 333 222", contactEmail: "alice@furnicare.co.ug", serialNumber: "FCL-2026-F088", amount: 24000000, jobDescription: "Supply and installation of 60 new office desks for Admin Block renovation", category: "Supply", dateSubmitted: "2026-01-22", dateRequired: "2026-03-01", status: "pending", notes: "Part of renovation project.", items: [{ description: "Executive Office Desk (L-shaped)", quantity: 10, unitPrice: 850000 }] },
  { id: "5", invoiceNo: "QT-2026-0005", companyName: "PrintTech Solutions", contactPerson: "Samuel Wabwire", contactPhone: "+256 771 555 888", contactEmail: "samuel@printtech.ug", serialNumber: "PTS-2026-P023", amount: 3200000, jobDescription: "Quarterly printer servicing and toner supply for all campus printers", category: "Maintenance", dateSubmitted: "2026-02-01", dateRequired: "2026-02-10", status: "pending", notes: "Covers 8 printers.", items: [{ description: "HP Toner Cartridge", quantity: 8, unitPrice: 250000 }] },
  { id: "6", invoiceNo: "QT-2026-0006", companyName: "BuildRight Contractors", contactPerson: "Peter Ochieng", contactPhone: "+256 788 111 222", contactEmail: "peter@buildright.co.ug", serialNumber: "BRC-2026-C005", amount: 45000000, jobDescription: "Renovation of Science Block ground floor", category: "Construction", dateSubmitted: "2026-01-10", dateRequired: "2026-04-30", status: "rejected", notes: "Budget exceeded allocation.", items: [{ description: "Floor Tiling (450 sqm)", quantity: 1, unitPrice: 18000000 }] },
  { id: "7", invoiceNo: "QT-2026-0007", companyName: "NetSecure IT Consulting", contactPerson: "Diana Atim", contactPhone: "+256 756 777 999", contactEmail: "diana@netsecure.ug", serialNumber: "NIC-2026-IT01", amount: 12000000, jobDescription: "Campus network security audit and firewall configuration upgrade", category: "IT Services", dateSubmitted: "2026-02-05", dateRequired: "2026-03-15", status: "under-review", notes: "Recommended after phishing incident.", items: [{ description: "Network Security Audit", quantity: 1, unitPrice: 5000000 }] },
];

const emptyInvoice: InvoiceEntry = {
  id: "", invoiceNo: "", companyName: "", contactPerson: "", contactPhone: "", contactEmail: "", serialNumber: "", amount: 0, jobDescription: "", category: "Maintenance", dateSubmitted: "", dateRequired: "", status: "pending", notes: "", items: [],
};

export function ManageInvoices() {
  const [invoices, setInvoices] = useState<InvoiceEntry[]>(INITIAL_INVOICES);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceEntry | null>(null);
  const [formData, setFormData] = useState<InvoiceEntry>(emptyInvoice);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Line items management
  const [newItem, setNewItem] = useState({ description: "", quantity: 1, unitPrice: 0 });

  const filtered = invoices.filter((inv) =>
    inv.companyName.toLowerCase().includes(search.toLowerCase()) ||
    inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
    inv.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
    inv.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
    inv.jobDescription.toLowerCase().includes(search.toLowerCase())
  );

  const handleNew = () => {
    const nextNum = invoices.length + 1;
    setFormData({ ...emptyInvoice, id: String(Date.now()), invoiceNo: `QT-2026-${String(nextNum).padStart(4, "0")}` });
    setEditingInvoice(null);
    setShowForm(true);
  };

  const handleEdit = (inv: InvoiceEntry) => {
    setFormData({ ...inv });
    setEditingInvoice(inv);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.companyName || !formData.invoiceNo) return;
    const computedAmount = formData.items.reduce((s, it) => s + it.quantity * it.unitPrice, 0);
    const toSave = { ...formData, amount: computedAmount || formData.amount };
    if (editingInvoice) {
      setInvoices((prev) => prev.map((inv) => (inv.id === editingInvoice.id ? toSave : inv)));
    } else {
      setInvoices((prev) => [...prev, toSave]);
    }
    setShowForm(false);
    setEditingInvoice(null);
    setFormData(emptyInvoice);
  };

  const handleDelete = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    setDeleteConfirm(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingInvoice(null);
    setFormData(emptyInvoice);
  };

  const addLineItem = () => {
    if (!newItem.description) return;
    setFormData({ ...formData, items: [...formData.items, { ...newItem }] });
    setNewItem({ description: "", quantity: 1, unitPrice: 0 });
  };

  const removeLineItem = (idx: number) => {
    setFormData({ ...formData, items: formData.items.filter((_, i) => i !== idx) });
  };

  const statusConfig: Record<string, { bg: string; text: string }> = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
    approved: { bg: "bg-green-100", text: "text-green-700" },
    rejected: { bg: "bg-red-100", text: "text-red-700" },
    "under-review": { bg: "bg-blue-100", text: "text-blue-700" },
  };

  // Form overlay
  if (showForm) {
    const lineTotal = formData.items.reduce((s, it) => s + it.quantity * it.unitPrice, 0);
    return (
      <div className="p-6 flex flex-col h-full bg-white overflow-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{editingInvoice ? "Edit Invoice" : "New Invoice / Quote"}</h2>
              <p className="text-xs text-gray-500">{editingInvoice ? `Editing ${editingInvoice.invoiceNo}` : "Create a new invoice or quote entry"}</p>
            </div>
          </div>
          <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Company & Contact */}
        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Company & Contact</h4>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Invoice / Quote No.</label>
            <input type="text" value={formData.invoiceNo} onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name</label>
            <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. TechRepair Uganda" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Contact Person</label>
            <input type="text" value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Contact Phone</label>
            <input type="text" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="+256 7XX XXX XXX" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Contact Email</label>
            <input type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Serial Number</label>
            <input type="text" value={formData.serialNumber} onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        {/* Job Details */}
        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Job Details</h4>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Job Description</label>
            <textarea value={formData.jobDescription} onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none" placeholder="Describe the work to be done..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              {INVOICE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              {INVOICE_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Date Submitted</label>
            <input type="date" value={formData.dateSubmitted} onChange={(e) => setFormData({ ...formData, dateSubmitted: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Date Required</label>
            <input type="date" value={formData.dateRequired} onChange={(e) => setFormData({ ...formData, dateRequired: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label>
            <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none" />
          </div>
        </div>

        {/* Line Items */}
        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Line Items</h4>
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
          <div className="grid grid-cols-[1fr_80px_120px_60px] bg-slate-100 border-b border-gray-200">
            <div className="px-3 py-2 text-xs font-semibold text-gray-600">Description</div>
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 text-center">Qty</div>
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 text-right">Unit Price</div>
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 text-center" />
          </div>
          {formData.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_80px_120px_60px] border-b border-gray-100">
              <div className="px-3 py-2 text-sm text-gray-800">{item.description}</div>
              <div className="px-3 py-2 text-sm text-gray-700 text-center">{item.quantity}</div>
              <div className="px-3 py-2 text-sm text-gray-700 text-right">{formatCurrency(item.unitPrice)}</div>
              <div className="px-3 py-2 flex items-center justify-center">
                <button onClick={() => removeLineItem(idx)} className="p-1 hover:bg-red-100 rounded transition-colors">
                  <X className="h-3.5 w-3.5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
          {formData.items.length === 0 && (
            <div className="px-3 py-4 text-sm text-gray-400 text-center">No line items yet. Add one below.</div>
          )}
        </div>

        {/* Add new line item */}
        <div className="grid grid-cols-[1fr_80px_120px_80px] gap-2 mb-2">
          <input type="text" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Item description" className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <input type="number" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })} min={1} className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <input type="number" value={newItem.unitPrice} onChange={(e) => setNewItem({ ...newItem, unitPrice: Number(e.target.value) })} min={0} className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <button onClick={addLineItem} className="flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
        {lineTotal > 0 && (
          <div className="text-sm text-gray-600 mb-6">Line Items Total: <span className="font-semibold text-gray-900">{formatCurrency(lineTotal)}</span></div>
        )}

        <div className="flex gap-3 mt-2">
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="h-4 w-4" /> {editingInvoice ? "Save Changes" : "Create Invoice"}
          </button>
          <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 bg-transparent text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <FileText className="h-6 w-6 text-blue-600" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">Manage Invoices & Quotes</h2>
          <p className="text-xs text-gray-500">Create, edit, and manage invoice and quote entries</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" /> New Invoice
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); }}
            placeholder="Search by company, invoice no., contact, serial, description..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <DataGrid
        columns={[
          { label: "Invoice No." },
          { label: "Company / Job" },
          { label: "Contact" },
          { label: "Serial No." },
          { label: "Amount", className: "text-right" },
          { label: "Status", className: "text-center" },
          { label: "Actions", className: "text-center" },
        ]}
        colTemplate="90px 1fr 130px 110px 130px 80px 80px"
        data={filtered}
        getKey={(inv) => inv.id}
        pageSize={6}
        totalLabel="invoices"
        emptyMessage="No invoices found."
        renderRow={(inv) => {
          const sc = statusConfig[inv.status] || statusConfig.pending;
          return (
            <>
              <div className="px-3 py-3 text-sm font-mono text-blue-700">{inv.invoiceNo}</div>
              <div className="px-3 py-3">
                <div className="text-sm font-medium text-gray-900 truncate">{inv.companyName}</div>
                <div className="text-xs text-gray-500 truncate">{inv.jobDescription}</div>
              </div>
              <div className="px-3 py-3">
                <div className="text-sm text-gray-800">{inv.contactPerson}</div>
                <div className="text-xs text-gray-500">{inv.contactPhone}</div>
              </div>
              <div className="px-3 py-3 text-sm text-gray-600 flex items-center">{inv.serialNumber}</div>
              <div className="px-3 py-3 text-sm font-medium text-gray-900 text-right flex items-center justify-end">{formatCurrency(inv.amount)}</div>
              <div className="px-3 py-3 flex items-center justify-center">
                <span className={`inline-flex px-2 py-0.5 text-xs rounded font-medium ${sc.bg} ${sc.text}`}>
                  {inv.status.charAt(0).toUpperCase() + inv.status.slice(1).replace("-", " ")}
                </span>
              </div>
              <div className="px-3 py-3 flex items-center justify-center gap-1">
                <button onClick={(e) => { e.stopPropagation(); handleEdit(inv); }} className="p-1 hover:bg-blue-100 rounded transition-colors" title="Edit">
                  <Edit2 className="h-3.5 w-3.5 text-blue-600" />
                </button>
                {deleteConfirm === inv.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(inv.id); }} className="p-1 hover:bg-red-100 rounded transition-colors" title="Confirm delete">
                      <CheckCircle className="h-3.5 w-3.5 text-red-600" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }} className="p-1 hover:bg-gray-100 rounded transition-colors" title="Cancel">
                      <X className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(inv.id); }} className="p-1 hover:bg-red-100 rounded transition-colors" title="Delete">
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                )}
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
