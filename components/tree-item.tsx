"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpen, FileText, User } from "lucide-react";
import type { NavigationItem } from "@/lib/navigation-data";

interface TreeItemProps {
  item: NavigationItem;
  level: number;
  onSelect: (id: string, label: string) => void;
  selectedId: string | null;
}

export function TreeItem({ item, level, onSelect, selectedId }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;

  const getIcon = () => {
    if (item.icon === "folder") {
      return isExpanded ? (
        <FolderOpen className="h-4 w-4 text-amber-500" />
      ) : (
        <Folder className="h-4 w-4 text-amber-500" />
      );
    }
    if (item.icon === "user") {
      return <User className="h-4 w-4 text-red-500" />;
    }
    return <FileText className="h-4 w-4 text-red-500" />;
  };

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onSelect(item.id, item.label);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer select-none transition-all duration-150 ${
          isSelected
            ? "bg-blue-600 text-white font-medium rounded"
            : "text-gray-700 hover:bg-slate-100 rounded"
        }`}
        style={{ paddingLeft: `${level * 14 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren ? (
          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            )}
          </span>
        ) : (
          <span className="w-4 flex-shrink-0" />
        )}
        <span className="flex-shrink-0">{getIcon()}</span>
        <span className="text-sm truncate">{item.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child) => (
            <TreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
