"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TreeItem } from "./tree-item";
import type { NavigationModule } from "@/lib/navigation-data";

interface ModuleSectionProps {
  module: NavigationModule;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectItem: (id: string, label: string) => void;
  selectedId: string | null;
}

export function ModuleSection({
  module,
  isExpanded,
  onToggle,
  onSelectItem,
  selectedId,
}: ModuleSectionProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-gray-700 text-sm font-semibold hover:bg-slate-200 transition-all duration-150"
        onClick={onToggle}
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-500" />
        )}
        <span className="truncate">{module.title}</span>
      </button>
      {isExpanded && (
        <div className="bg-white py-1">
          {module.items.map((item) => (
            <TreeItem
              key={item.id}
              item={item}
              level={0}
              onSelect={onSelectItem}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
