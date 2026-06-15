"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="flex">
        <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b bg-background/95 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="p-2 lg:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <p className="text-sm font-medium">Administration</p>
              </div>
              <p className="text-xs text-muted-foreground">Modular monolith prêt microservices</p>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
