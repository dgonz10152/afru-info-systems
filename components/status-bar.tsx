"use client";

import { useEffect, useState } from "react";
import { Clock, Search } from "lucide-react";
import type { UserInfo, NavigationItem, NavigationModule } from "@/lib/navigation-data";
import { navigationData } from "@/lib/navigation-data";

interface StatusBarProps {
  userInfo: UserInfo;
  onSelectApplet?: (id: string, label: string) => void;
}

export function StatusBar({ userInfo, onSelectApplet }: StatusBarProps) {
  const [serverTime, setServerTime] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; label: string }>>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setServerTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Flatten all applets from navigation data
  const getAllApplets = (): Array<{ id: string; label: string }> => {
    const applets: Array<{ id: string; label: string }> = [];
    
    const extractApplets = (items: NavigationItem[]) => {
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          extractApplets(item.children);
        } else {
          applets.push({ id: item.id, label: item.label });
        }
      });
    };

    navigationData.forEach((module: NavigationModule) => {
      extractApplets(module.items);
    });

    return applets;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const allApplets = getAllApplets();
    const filtered = allApplets.filter((applet) =>
      applet.label.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setShowResults(true);
  };

  const handleSelectResult = (id: string, label: string) => {
    onSelectApplet?.(id, label);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="flex items-center gap-4 px-4 py-2.5 bg-slate-100 border-t border-gray-200 text-xs text-gray-600">
      <div className="flex items-center gap-2">
        <span className="text-gray-500 font-medium">User ID:</span>
        <span className="bg-white px-2 py-1 border border-gray-300 rounded text-gray-700 font-medium">{userInfo.userId}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-500 font-medium">Full Name:</span>
        <span className="text-gray-700 font-semibold">{userInfo.fullName}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-500 font-medium">Level:</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium text-xs">{userInfo.level}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-500 font-medium">Database:</span>
        <span className="text-gray-700 font-medium">{userInfo.database}</span>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 text-blue-600" />
        <span className="text-gray-500 font-medium">Server Time:</span>
        <span className="text-blue-600 font-mono font-semibold">{serverTime}</span>
      </div>
      
      <div className="relative">
        <div className="flex items-center border border-gray-300 px-2 py-1 w-48 bg-white text-gray-700 text-xs rounded focus-within:ring-1 focus-within:ring-blue-500">
          <Search className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
            className="flex-1 bg-transparent placeholder-gray-400 focus:outline-none"
            placeholder="Search applets..."
          />
        </div>
        
        {showResults && searchResults.length > 0 && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelectResult(result.id, result.label)}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="text-sm text-gray-900 font-medium">{result.label}</div>
                <div className="text-xs text-gray-500">{result.id}</div>
              </button>
            ))}
          </div>
        )}
        
        {showResults && searchQuery.trim().length > 0 && searchResults.length === 0 && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3">
            <div className="text-sm text-gray-500">No applets found matching "{searchQuery}"</div>
          </div>
        )}
      </div>
    </div>
  );
}
