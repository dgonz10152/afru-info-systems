export interface NavigationItem {
  id: string;
  label: string;
  icon?: "folder" | "document" | "user";
  children?: NavigationItem[];
}

export interface NavigationModule {
  id: string;
  title: string;
  items: NavigationItem[];
}

// Navigation data - easily extendable by adding new modules or items
export const navigationData: NavigationModule[] = [
  {
    id: "finance",
    title: "Finance",
    items: [
      {
        id: "fin-student-payments",
        label: "Student Payments",
        icon: "folder",
        children: [
          { id: "fin-payment-status", label: "Payment Status", icon: "user" },
          { id: "fin-student-clearance", label: "Student Clearance", icon: "document" },
          { id: "fin-fee-structure", label: "Fee Structure", icon: "document" },
        ],
      },
      {
        id: "accounts",
        label: "Accounts",
        icon: "folder",
        children: [
          { id: "account-transactions", label: "Account Transactions", icon: "document" },
          { id: "income-expense", label: "Income Expense", icon: "document" },
          { id: "entity-transactions", label: "Entity Transactions", icon: "document" },
          { id: "transaction-codes", label: "Transaction Codes", icon: "document" },
        ],
      },
      {
        id: "fin-billing",
        label: "Billing & Payments",
        icon: "folder",
        children: [
          { id: "fin-billing-dashboard", label: "Billing Dashboard", icon: "document" },
          { id: "fin-quickbooks-export", label: "QuickBooks Export", icon: "document" },
        ],
      },
      {
        id: "fin-payroll",
        label: "Payroll",
        icon: "folder",
        children: [
          { id: "fin-payroll-dashboard", label: "Payroll Dashboard", icon: "document" },
        ],
      },
      {
        id: "electronic-banking",
        label: "Electronic Banking",
        icon: "folder",
        children: [
          { id: "electronic-banking-item", label: "Electronic Banking", icon: "document" },
        ],
      },
      {
        id: "planning",
        label: "Planning",
        icon: "folder",
        children: [
          { id: "budget", label: "Budget", icon: "document" },
        ],
      },
      {
        id: "procurement",
        label: "Procurement",
        icon: "folder",
        children: [
          { id: "receipting", label: "Receipting", icon: "document" },
          { id: "stores", label: "Stores", icon: "document" },
        ],
      },
      {
        id: "transactions",
        label: "Transactions",
        icon: "folder",
        children: [
          { id: "payment-voucher", label: "Payment Voucher", icon: "document" },
          { id: "display-transactions", label: "Display Transactions", icon: "document" },
          { id: "transactions-item", label: "Transactions", icon: "document" },
          { id: "event-charges", label: "Event Charges", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "human-resources",
    title: "Human Resources",
    items: [
      {
        id: "hr-interview-mgmt",
        label: "Interview Management",
        icon: "folder",
        children: [
          { id: "hr-candidates", label: "Candidates", icon: "user" },
          { id: "hr-interview-scores", label: "Interview Scores", icon: "document" },
          { id: "hr-interview-status", label: "Application Status", icon: "document" },
        ],
      },
      {
        id: "hr-student-records",
        label: "Student Records",
        icon: "folder",
        children: [
          { id: "hr-student-dashboard", label: "Student Dashboard", icon: "user" },
        ],
      },
      {
        id: "hr-staff-records",
        label: "Staff Records",
        icon: "folder",
        children: [
          { id: "hr-staff-dashboard", label: "Staff Dashboard", icon: "user" },
        ],
      },
      {
        id: "hr-performance",
        label: "Performance Appraisal",
        icon: "folder",
        children: [
          { id: "hr-appraisal-teaching", label: "Teaching Staff", icon: "document" },
          { id: "hr-appraisal-admin", label: "Administrative Staff", icon: "document" },
        ],
      },
      {
        id: "hr-onboarding",
        label: "Onboarding",
        icon: "folder",
        children: [
          { id: "hr-onboarding-contracts", label: "Contract Generation", icon: "document" },
        ],
      },
      {
        id: "hr-trainings",
        label: "Staff Trainings",
        icon: "folder",
        children: [
          { id: "hr-training-dashboard", label: "Training Dashboard", icon: "document" },
          { id: "hr-training-requests", label: "Training Requests", icon: "document" },
        ],
      },
      {
        id: "hr-forecasting",
        label: "Forecasting",
        icon: "folder",
        children: [
          { id: "hr-forecasting-dashboard", label: "Analytics Dashboard", icon: "document" },
        ],
      },
      {
        id: "hr-leave",
        label: "Leave Management",
        icon: "folder",
        children: [
          { id: "hr-leave-applications", label: "Leave Applications", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "asset-management",
    title: "Asset Management",
    items: [
      {
        id: "am-tracking",
        label: "Asset Tracking",
        icon: "folder",
        children: [
          { id: "am-asset-dashboard", label: "Asset Dashboard", icon: "document" },
          { id: "am-restoration-history", label: "Restoration History", icon: "document" },
        ],
      },
      {
        id: "am-invoices",
        label: "Invoices & Quotes",
        icon: "folder",
        children: [
          { id: "am-invoice-dashboard", label: "Invoice Dashboard", icon: "document" },
        ],
      },
      {
        id: "am-configuration",
        label: "Configuration",
        icon: "folder",
        children: [
          { id: "am-manage-assets", label: "Manage Assets", icon: "document" },
          { id: "am-manage-invoices", label: "Manage Invoices", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "membership",
    title: "Membership",
    items: [
      {
        id: "members",
        label: "Members",
        icon: "folder",
        children: [
          { id: "member-list", label: "Member List", icon: "user" },
          { id: "member-types", label: "Member Types", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "online",
    title: "Online",
    items: [
      {
        id: "web-services",
        label: "Web Services",
        icon: "folder",
        children: [
          { id: "api-config", label: "API Configuration", icon: "document" },
          { id: "webhooks", label: "Webhooks", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    items: [
      {
        id: "financial-reports",
        label: "Financial Reports",
        icon: "folder",
        children: [
          { id: "balance-sheet", label: "Balance Sheet", icon: "document" },
          { id: "income-statement", label: "Income Statement", icon: "document" },
          { id: "cash-flow", label: "Cash Flow", icon: "document" },
        ],
      },
      {
        id: "operational-reports",
        label: "Operational Reports",
        icon: "folder",
        children: [
          { id: "activity-report", label: "Activity Report", icon: "document" },
          { id: "audit-log", label: "Audit Log", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "teaching",
    title: "Teaching",
    items: [
      {
        id: "teach-management",
        label: "Classroom Management",
        icon: "folder",
        children: [
          { id: "teach-classroom-mgmt", label: "Classroom Manager", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "students",
    title: "Students",
    items: [
      {
        id: "student-management",
        label: "Student Management",
        icon: "folder",
        children: [
          { id: "student-list", label: "Student List", icon: "user" },
          { id: "enrollment", label: "Enrollment", icon: "document" },
          { id: "grades", label: "Grades", icon: "document" },
        ],
      },
      {
        id: "enr-management",
        label: "Enrollment Management",
        icon: "folder",
        children: [
          { id: "enr-manual-application", label: "Manual Application Entry", icon: "document" },
          { id: "enr-transcript-generation", label: "Transcript Generation", icon: "document" },
        ],
      },
      {
        id: "acad-standing",
        label: "Academic Standing",
        icon: "folder",
        children: [
          { id: "acad-retakes", label: "Course Retakes", icon: "document" },
          { id: "acad-probation", label: "Academic Probation", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "subscription",
    title: "Subscription",
    items: [
      {
        id: "plans",
        label: "Plans",
        icon: "folder",
        children: [
          { id: "subscription-plans", label: "Subscription Plans", icon: "document" },
          { id: "billing", label: "Billing", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "system-administration",
    title: "System Administration",
    items: [
      {
        id: "users",
        label: "Users",
        icon: "folder",
        children: [
          { id: "user-management", label: "User Management", icon: "user" },
          { id: "roles-permissions", label: "Roles & Permissions", icon: "document" },
        ],
      },
      {
        id: "settings",
        label: "Settings",
        icon: "folder",
        children: [
          { id: "general-settings", label: "General Settings", icon: "document" },
          { id: "email-config", label: "Email Configuration", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "time-table",
    title: "Time Table",
    items: [
      {
        id: "schedules",
        label: "Schedules",
        icon: "folder",
        children: [
          { id: "class-schedule", label: "Class Schedule", icon: "document" },
          { id: "event-calendar", label: "Event Calendar", icon: "document" },
        ],
      },
    ],
  },
  {
    id: "social-page",
    title: "Social Page",
    items: [
      {
        id: "social-media",
        label: "Social Media",
        icon: "folder",
        children: [
          { id: "posts", label: "Posts", icon: "document" },
          { id: "announcements", label: "Announcements", icon: "document" },
        ],
      },
    ],
  },
];

// User info type
export interface UserInfo {
  userId: string;
  fullName: string;
  level: string;
  database: string;
}

export const defaultUserInfo: UserInfo = {
  userId: "Jonah",
  fullName: "Mukiibi Jonathan",
  level: "Administrator",
  database: "afru",
};
