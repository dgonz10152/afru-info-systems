"use client";

import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const studentPopulationData = [
  { year: "2020", students: 420 },
  { year: "2021", students: 485 },
  { year: "2022", students: 560 },
  { year: "2023", students: 640 },
  { year: "2024", students: 720 },
  { year: "2025", students: 810 },
  { year: "2026 (proj)", students: 920 },
  { year: "2027 (proj)", students: 1050 },
];

const tuitionData = [
  { year: "2020", amount: 840 },
  { year: "2021", amount: 970 },
  { year: "2022", amount: 1120 },
  { year: "2023", amount: 1340 },
  { year: "2024", amount: 1520 },
  { year: "2025", amount: 1750 },
  { year: "2026 (proj)", amount: 2000 },
  { year: "2027 (proj)", amount: 2300 },
];

const staffToStudentRatio = [
  { year: "2020", ratio: 15 },
  { year: "2021", ratio: 16 },
  { year: "2022", ratio: 17 },
  { year: "2023", ratio: 18 },
  { year: "2024", ratio: 19 },
  { year: "2025", ratio: 20 },
  { year: "2026 (proj)", ratio: 21 },
  { year: "2027 (proj)", ratio: 23 },
];

const departmentGrowth = [
  { department: "Science & Tech", current: 180, projected: 260 },
  { department: "Business", current: 220, projected: 290 },
  { department: "Theology", current: 120, projected: 140 },
  { department: "Education", current: 150, projected: 200 },
  { department: "Social Sciences", current: 140, projected: 180 },
];

export function ForecastingDashboard() {
  return (
    <div className="p-6 flex flex-col h-full bg-white overflow-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <BarChart3 className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Forecasting & Analytics</h2>
          <p className="text-xs text-gray-500">Data analytics to track AFRU needs and forecast future trends</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Current Students</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">810</div>
          <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" /> +12.5% YoY
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Tuition Revenue</span>
          </div>
          <div className="text-2xl font-bold text-green-700">1.75B</div>
          <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" /> +15.1% YoY
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-orange-600" />
            <span className="text-xs text-orange-600 font-medium">Staff Count</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">42</div>
          <div className="text-xs text-orange-500">1:20 staff-student ratio</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">Projected 2027</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">1,050</div>
          <div className="text-xs text-purple-500">students projected</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Student Population Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={studentPopulationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#666" }} />
              <YAxis tick={{ fontSize: 11, fill: "#666" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="students" stroke="#3b82f6" fill="#3b82f620" strokeWidth={2} name="Students" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Total Tuition Paid Over Time (Millions UGX)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tuitionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#666" }} />
              <YAxis tick={{ fontSize: 11, fill: "#666" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} name="Revenue (M)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Staff-to-Student Ratio</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={staffToStudentRatio}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#666" }} />
              <YAxis tick={{ fontSize: 11, fill: "#666" }} domain={[10, 30]} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="ratio" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} name="Students per Staff" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">Note: Rising ratio suggests need for additional staff hiring.</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Department Growth (Current vs Projected 2027)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="department" tick={{ fontSize: 10, fill: "#666" }} />
              <YAxis tick={{ fontSize: 11, fill: "#666" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="current" fill="#3b82f6" name="Current" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projected" fill="#93c5fd" name="Projected" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Key Insights & Recommendations</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <TrendingUp className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-800">Staffing Needs Increasing</h4>
              <p className="text-xs text-amber-700">Staff-to-student ratio is projected to reach 1:23 by 2027. Consider hiring 5-8 additional faculty members to maintain quality standards.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">Science & Technology Growing Fastest</h4>
              <p className="text-xs text-blue-700">Science & Technology department is projected to grow by 44%. Additional lab space and IT infrastructure investment recommended.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-800">Revenue Growth On Track</h4>
              <p className="text-xs text-green-700">Tuition revenue is projected to exceed UGX 2.3B by 2027, supporting planned expansion initiatives.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
