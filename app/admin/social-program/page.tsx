import { Handshake } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { SimpleTable } from "@/components/tables/simple-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockSocialApplications } from "@/features/social-program/mock-data";

export default function AdminSocialProgramPage() {
  return (
    <PageShell title="Programme social" description="Demandes vulnérables, priorité et mise en relation solidaire.">
      <Card>
        <CardContent className="pt-6">
          <SimpleTable
            rows={mockSocialApplications}
            columns={[
              { key: "fullName", label: "Bénéficiaire" },
              { key: "city", label: "Ville" },
              { key: "requestedSupport", label: "Besoin" },
              { key: "priorityLevel", label: "Priorité", render: (row) => <Badge variant={row.priorityLevel === "critical" ? "danger" : "warning"}>{row.priorityLevel}</Badge> },
              { key: "status", label: "Statut" },
              {
                key: "actions",
                label: "Actions",
                render: () => <Button size="sm"><Handshake /> Affecter</Button>
              }
            ]}
          />
        </CardContent>
      </Card>
    </PageShell>
  );
}
