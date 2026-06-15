import { BadgeCheck, Banknote, ClipboardList, Handshake, TrendingUp, UsersRound } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { PageShell } from "@/components/layout/page-shell";
import { AdminCharts } from "@/features/admin/components/admin-charts";

export default function AdminDashboardPage() {
  return (
    <PageShell title="Dashboard admin" description="Vue opérationnelle des candidates, demandes, missions et revenus placeholder.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <KpiCard label="Total candidates" value="90" change="+14 ce mois" icon={UsersRound} />
        <KpiCard label="Vérifiées" value="48" change="53% du vivier" icon={BadgeCheck} />
        <KpiCard label="Demandes attente" value="17" change="Priorité admin" icon={ClipboardList} />
        <KpiCard label="Missions actives" value="22" change="+5 cette semaine" icon={Handshake} />
        <KpiCard label="Taux matching" value="73%" change="+8 pts vs mai" icon={TrendingUp} />
        <KpiCard label="Revenus" value="2.4M" change="Placeholder FCFA" icon={Banknote} />
      </div>
      <div className="mt-6">
        <AdminCharts />
      </div>
    </PageShell>
  );
}
