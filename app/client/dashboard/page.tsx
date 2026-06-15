import { ClipboardList, Handshake, UsersRound } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/cards/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockServiceRequests } from "@/features/service-requests/mock-data";

export default function ClientDashboardPage() {
  return (
    <>
      <SiteHeader />
      <PageShell title="Dashboard client" description="Suivi de vos demandes et profils proposés.">
        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard label="Demandes" value="5" change="2 en analyse" icon={ClipboardList} />
          <KpiCard label="Profils proposés" value="8" change="3 nouvelles recommandations" icon={UsersRound} />
          <KpiCard label="Missions actives" value="1" change="Suivi en cours" icon={Handshake} />
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Demandes récentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockServiceRequests.slice(0, 3).map((request) => (
              <div key={request.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{request.serviceType}</p>
                  <p className="text-sm text-muted-foreground">{request.city} - {request.frequency}</p>
                </div>
                <StatusBadge status={request.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </PageShell>
    </>
  );
}
