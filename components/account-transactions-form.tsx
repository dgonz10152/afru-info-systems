"use client";

import { useState } from "react";
import { Loader2, Save, X } from "lucide-react";

export function AccountTransactionsForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="p-6 flex flex-col h-full bg-white">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Transactions</h2>
      
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Input Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Institution:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Africa Renewal University</option>
                <option>Other Institution</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Transaction Date:</label>
              <input 
                type="date" 
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Transaction Type:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Select Type</option>
                <option>Transfer</option>
                <option>Payment</option>
                <option>Receipt</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">DR/CR:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Credit</option>
                <option>Debit</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Currency:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Uganda Shillings</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Exchange Rate:</label>
              <input 
                type="text" 
                defaultValue="1"
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Destination Account No:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Select Account</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">To Transaction Method:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Select Method</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Mobile Money</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Amount:</label>
              <input 
                type="number" 
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Transaction Note:</label>
              <input 
                type="text" 
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Second Note:</label>
              <input 
                type="text" 
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Year:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>2025/2026</option>
                <option>2024/2025</option>
                <option>2023/2024</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Class No:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Select Class</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Block No:</label>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>Select Block</option>
              </select>
            </div>
          </div>

          {/* Right Column - Display Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-[200px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Source Account No:</label>
              <div className="bg-slate-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500">
                -
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Destination Account No:</label>
              <div className="bg-slate-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500">
                -
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Default Rate:</label>
              <div className="bg-slate-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500">
                -
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Default Currency:</label>
              <div className="bg-slate-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500">
                -
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Currency Used:</label>
              <div className="bg-slate-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500">
                -
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Exchange Rate:</label>
              <div className="bg-slate-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500">
                -
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Amount Used:</label>
              <div className="bg-slate-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500">
                -
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] items-center gap-3">
              <label className="text-sm font-medium text-gray-600 text-right">Amount for Default Currency:</label>
              <div className="bg-slate-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500">
                -
              </div>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-8 border border-blue-200 bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            {isLoading && <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />}
            <span className="text-sm text-gray-700">
              {isLoading ? "Please Wait..." : "Ready"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Save className="h-4 w-4" />
          Save
        </button>
        <button 
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <X className="h-4 w-4" />
          Close
        </button>
      </div>
    </div>
  );
}
