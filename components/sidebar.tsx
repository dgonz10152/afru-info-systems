"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ModuleSection } from "./module-section";
import type { NavigationModule } from "@/lib/navigation-data";

interface SidebarProps {
  modules: NavigationModule[];
  onSelectItem: (id: string, label: string) => void;
  selectedId: string | null;
  isCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function Sidebar({ modules, onSelectItem, selectedId, isCollapsed: controlledCollapsed, onCollapseChange }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  
  const handleToggleCollapse = (collapsed: boolean) => {
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(collapsed);
    }
    onCollapseChange?.(collapsed);
  };
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const setIsCollapsed = (collapsed: boolean) => {
    handleToggleCollapse(collapsed);
  };

  return (
    <div
      className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        isCollapsed ? "w-0 overflow-hidden" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between bg-blue-600 border-b border-blue-700 px-4 py-3">
        <h2 className="text-sm font-semibold text-white truncate">
          Navigation
        </h2>
        <button
          onClick={() => handleToggleCollapse(!isCollapsed)}
          className="p-1 hover:bg-blue-500 rounded transition-colors text-white"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {modules.map((module) => (
          <ModuleSection
            key={module.id}
            module={module}
            isExpanded={expandedModules.has(module.id)}
            onToggle={() => toggleModule(module.id)}
            onSelectItem={onSelectItem}
            selectedId={selectedId}
          />
        ))}
      </div>
    </div>
  );
}
