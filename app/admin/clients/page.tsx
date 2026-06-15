import { Clock, Eye } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { SimpleTable } from "@/components/tables/simple-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockClients } from "@/features/clients/mock-data";

export default function AdminClientsPage() {
  return (
    <PageShell title="Clients" description="Familles et entreprises avec demandes associées et historique.">
      <Card>
        <CardContent className="pt-6">
          <SimpleTable
            rows={mockClients}
            columns={[
              { key: "name", label: "Client" },
              { key: "type", label: "Type" },
              { key: "city", label: "Ville" },
              { key: "activeRequests", label: "Demandes" },
              { key: "createdAt", label: "Créé le" },
              {
                key: "actions",
                label: "Actions",
                render: () => (
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" aria-label="Voir"><Eye /></Button>
                    <Button size="icon" variant="ghost" aria-label="Historique"><Clock /></Button>
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
