"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { StatusBar } from "@/components/status-bar";
import { AppletContent } from "@/components/applet-content";
import { LoginScreen } from "@/components/login-screen";
import { navigationData, defaultUserInfo } from "@/lib/navigation-data";
import type { UserInfo } from "@/lib/navigation-data";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [selectedApplet, setSelectedApplet] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (userId: string, fullName: string) => {
    setUserInfo({
      ...defaultUserInfo,
      userId,
      fullName,
    });
    setIsLoggedIn(true);
  };

  const handleSelectItem = (id: string, label: string) => {
    setSelectedApplet({ id, label });
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          modules={navigationData}
          onSelectItem={handleSelectItem}
          selectedId={selectedApplet?.id ?? null}
          isCollapsed={sidebarCollapsed}
          onCollapseChange={setSidebarCollapsed}
        />
        
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="absolute left-0 top-0 z-50 p-3 m-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        
        <main className="flex-1 overflow-auto bg-background">
          <AppletContent
            appletId={selectedApplet?.id ?? null}
            appletLabel={selectedApplet?.label ?? null}
          />
        </main>
      </div>
      <StatusBar userInfo={userInfo} onSelectApplet={handleSelectItem} />
    </div>
  );
}
