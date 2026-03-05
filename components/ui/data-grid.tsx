"use client";

import { useState } from "react";

export interface GridColumn {
  label: string;
  className?: string;
}

interface DataGridProps<T> {
  columns: GridColumn[];
  /** CSS grid-template-columns value, e.g. "60px 1fr 1fr 120px 80px" */
  colTemplate: string;
  data: T[];
  getKey: (item: T) => string | number;
  renderRow: (item: T, index: number) => React.ReactNode;
  onRowClick?: (item: T) => void;
  getRowClass?: (item: T) => string;
  pageSize?: number;
  totalLabel?: string;
  emptyMessage?: string;
}

export function DataGrid<T>({
  columns,
  colTemplate,
  data,
  getKey,
  renderRow,
  onRowClick,
  getRowClass,
  pageSize = 10,
  totalLabel = "records",
  emptyMessage = "No records found.",
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginated = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const gridStyle = { gridTemplateColumns: colTemplate };

  return (
    <div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div style={gridStyle} className="grid bg-slate-100 border-b border-gray-200">
          {columns.map((col, i) => (
            <div key={i} className={`px-3 py-2.5 text-xs font-semibold text-gray-600 ${col.className ?? ""}`}>
              {col.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <div className="px-3 py-8 text-sm text-gray-400 text-center">{emptyMessage}</div>
        ) : (
          paginated.map((item, i) => (
            <div
              key={getKey(item)}
              style={gridStyle}
              className={`grid border-b border-gray-100 hover:bg-blue-50 transition-colors ${onRowClick ? "cursor-pointer" : ""} ${getRowClass?.(item) ?? ""}`}
              onClick={() => onRowClick?.(item)}
            >
              {renderRow(item, i)}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, data.length)} of {data.length} {totalLabel}
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
