import Link from "next/link";
import {
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  HandHeart,
  Handshake,
  Landmark,
  Settings,
  ShieldCheck,
  Users,
  X
} from "lucide-react";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/candidates", label: "Candidates", icon: BadgeCheck },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/requests", label: "Demandes", icon: Bell },
  { href: "/admin/matching", label: "Matching", icon: Handshake },
  { href: "/admin/assignments", label: "Missions", icon: Briefcase },
  { href: "/admin/trainings", label: "Formations", icon: BookOpen },
  { href: "/admin/verifications", label: "Vérifications", icon: ShieldCheck },
  { href: "/admin/social-program", label: "Social", icon: HandHeart },
  { href: "/admin/payments", label: "Paiements", icon: Landmark },
  { href: "/admin/settings", label: "Réglages", icon: Settings }
];

type AdminSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      <aside className="hidden min-h-screen w-64 border-r bg-card lg:block">
        <div className="border-b p-5">
          <Link href="/admin/dashboard" className="font-semibold">
            Domestic Admin
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">Operations cockpit</p>
        </div>
        <nav className="grid gap-1 p-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={onClose} />
          <div className="relative z-50 w-64 border-r bg-card">
            <div className="flex items-center justify-between border-b p-4">
              <Link href="/admin/dashboard" className="font-semibold">
                Domestic Admin
              </Link>
              <button onClick={onClose} aria-label="Close sidebar" className="p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="grid gap-1 p-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
