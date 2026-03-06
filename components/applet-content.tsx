"use client";

import { FileText, Table, Settings, Users, DollarSign, Calendar, BarChart3, Plus, Edit2, Trash2, RefreshCw } from "lucide-react";
import { AccountTransactionsForm } from "./account-transactions-form";
import { PaymentStatus, StudentClearance, FeeStructure } from "./finance/student-payments";
import { BillingDashboard, QuickBooksExport } from "./finance/billing-payments";
import { PayrollDashboard } from "./finance/payroll-dashboard";
import { AssetDashboard, RestorationHistory } from "./assets/asset-tracking";
import { InvoiceDashboard } from "./assets/invoice-quotes";
import { ManageAssets, ManageInvoices } from "./assets/asset-config";
import { InterviewCandidates, InterviewScores, InterviewStatus } from "./hr/interview-management";
import { StudentDashboard } from "./hr/student-records";
import { StaffDashboard } from "./hr/staff-records";
import { TeachingAppraisal, AdminAppraisal } from "./hr/performance-appraisal";
import { OnboardingContracts } from "./hr/onboarding";
import { TrainingDashboard, TrainingRequests } from "./hr/staff-trainings";
import { ForecastingDashboard } from "./hr/forecasting";
import { LeaveApplications } from "./hr/leave-management";
import { ManualApplicationEntry } from "./enrollment/manual-application";
import { TranscriptGeneration } from "./enrollment/transcript-generation";

interface AppletContentProps {
  appletId: string | null;
  appletLabel: string | null;
}

function DefaultApplet() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <FileText className="h-12 w-12 mb-3 opacity-50" />
      <p className="text-sm">Select an item from the sidebar to open an applet</p>
    </div>
  );
}

function GenericApplet({ id, label }: { id: string; label: string }) {
  const getIcon = () => {
    if (id.includes("transaction") || id.includes("payment") || id.includes("income") || id.includes("expense")) {
      return <DollarSign className="h-6 w-6 text-blue-600" />;
    }
    if (id.includes("user") || id.includes("employee") || id.includes("member") || id.includes("student")) {
      return <Users className="h-6 w-6 text-purple-600" />;
    }
    if (id.includes("report") || id.includes("balance") || id.includes("cash")) {
      return <BarChart3 className="h-6 w-6 text-green-600" />;
    }
    if (id.includes("schedule") || id.includes("calendar")) {
      return <Calendar className="h-6 w-6 text-orange-500" />;
    }
    if (id.includes("setting") || id.includes("config")) {
      return <Settings className="h-6 w-6 text-cyan-600" />;
    }
    return <FileText className="h-6 w-6 text-gray-500" />;
  };

  return (
    <div className="p-6 flex flex-col h-full bg-white">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        {getIcon()}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{label}</h2>
          <p className="text-xs text-gray-500">Manage your {label.toLowerCase()}</p>
        </div>
      </div>
      
      <div className="bg-slate-50 rounded-lg p-4 border border-gray-200 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Table className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-semibold text-gray-500">Data Grid</span>
        </div>
        
        <div className="border border-gray-200 bg-white rounded overflow-hidden flex-1 flex flex-col">
          <div className="grid grid-cols-4 gap-0 bg-gray-100">
            <div className="bg-slate-100 px-4 py-3 text-xs font-semibold text-gray-700 border-b border-gray-200">ID</div>
            <div className="bg-slate-100 px-4 py-3 text-xs font-semibold text-gray-700 border-b border-gray-200">Name</div>
            <div className="bg-slate-100 px-4 py-3 text-xs font-semibold text-gray-700 border-b border-gray-200">Status</div>
            <div className="bg-slate-100 px-4 py-3 text-xs font-semibold text-gray-700 border-b border-gray-200">Date</div>
          </div>
          
          <div className="grid grid-cols-4 gap-0 hover:bg-blue-50 transition-colors border-b border-gray-100">
            <div className="bg-white px-4 py-3 text-sm text-gray-700">001</div>
            <div className="bg-white px-4 py-3 text-sm text-gray-700">Sample Entry</div>
            <div className="bg-white px-4 py-3 text-sm"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">Active</span></div>
            <div className="bg-white px-4 py-3 text-sm text-gray-700">2026-01-28</div>
          </div>
          
          <div className="grid grid-cols-4 gap-0 hover:bg-blue-50 transition-colors border-b border-gray-100">
            <div className="bg-white px-4 py-3 text-sm text-gray-700">002</div>
            <div className="bg-white px-4 py-3 text-sm text-gray-700">Another Entry</div>
            <div className="bg-white px-4 py-3 text-sm"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded font-medium">Pending</span></div>
            <div className="bg-white px-4 py-3 text-sm text-gray-700">2026-01-27</div>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm">
            <Plus className="h-4 w-4" />
            Add New
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
            <Edit2 className="h-4 w-4" />
            Edit
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppletContent({ appletId, appletLabel }: AppletContentProps) {
  if (!appletId || !appletLabel) {
    return <DefaultApplet />;
  }

  // Finance - Student Payments
  if (appletId === "fin-payment-status") return <PaymentStatus />;
  if (appletId === "fin-student-clearance") return <StudentClearance />;
  if (appletId === "fin-fee-structure") return <FeeStructure />;

  // Finance - Billing & QuickBooks
  if (appletId === "fin-billing-dashboard") return <BillingDashboard />;
  if (appletId === "fin-quickbooks-export") return <QuickBooksExport />;

  // Finance - Payroll
  if (appletId === "fin-payroll-dashboard") return <PayrollDashboard />;

  // Show custom form for Account Transactions
  if (appletId === "account-transactions") {
    return <AccountTransactionsForm />;
  }

  // Asset Management
  if (appletId === "am-asset-dashboard") return <AssetDashboard />;
  if (appletId === "am-restoration-history") return <RestorationHistory />;
  if (appletId === "am-invoice-dashboard") return <InvoiceDashboard />;
  if (appletId === "am-manage-assets") return <ManageAssets />;
  if (appletId === "am-manage-invoices") return <ManageInvoices />;

  // HR - Interview Management
  if (appletId === "hr-candidates") return <InterviewCandidates />;
  if (appletId === "hr-interview-scores") return <InterviewScores />;
  if (appletId === "hr-interview-status") return <InterviewStatus />;

  // HR - Student Records
  if (appletId === "hr-student-dashboard") return <StudentDashboard />;
  if (appletId === "student-list") return <StudentDashboard />;

  // HR - Staff Records
  if (appletId === "hr-staff-dashboard") return <StaffDashboard />;

  // HR - Performance Appraisal
  if (appletId === "hr-appraisal-teaching") return <TeachingAppraisal />;
  if (appletId === "hr-appraisal-admin") return <AdminAppraisal />;

  // HR - Onboarding
  if (appletId === "hr-onboarding-contracts") return <OnboardingContracts />;

  // HR - Staff Trainings
  if (appletId === "hr-training-dashboard") return <TrainingDashboard />;
  if (appletId === "hr-training-requests") return <TrainingRequests />;

  // HR - Forecasting
  if (appletId === "hr-forecasting-dashboard") return <ForecastingDashboard />;

  // HR - Leave Management
  if (appletId === "hr-leave-applications") return <LeaveApplications />;

  // Enrollment Management
  if (appletId === "enr-manual-application") return <ManualApplicationEntry />;
  if (appletId === "enr-transcript-generation") return <TranscriptGeneration />;

  return <GenericApplet id={appletId} label={appletLabel} />;
}
