import { Brain, Search } from "lucide-react";

import { StatusBadge } from "@/components/cards/status-badge";
import { PageShell } from "@/components/layout/page-shell";
import { SimpleTable } from "@/components/tables/simple-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { mockServiceRequests } from "@/features/service-requests/mock-data";

export default function AdminRequestsPage() {
  return (
    <PageShell title="Demandes clients" description="Analyse des besoins, urgence, budget et lancement du matching.">
      <Card>
        <CardContent className="pt-6">
          <SimpleTable
            rows={mockServiceRequests}
            columns={[
              { key: "clientName", label: "Client" },
              { key: "serviceType", label: "Service" },
              { key: "city", label: "Localisation", render: (row) => `${row.city}, ${row.neighborhood}` },
              { key: "budget", label: "Budget", render: (row) => formatCurrency(row.budget) },
              { key: "urgency", label: "Urgence", render: (row) => <Badge variant={row.urgency === "high" ? "danger" : "secondary"}>{row.urgency}</Badge> },
              { key: "status", label: "Statut", render: (row) => <StatusBadge status={row.status} /> },
              {
                key: "actions",
                label: "Actions",
                render: () => (
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" aria-label="Analyser"><Search /></Button>
                    <Button size="icon" variant="ghost" aria-label="Créer matching"><Brain /></Button>
                  </div>
                )
              }
            ]}
          />
        </CardContent>
      </Card>
    </PageShell>
  );
}
