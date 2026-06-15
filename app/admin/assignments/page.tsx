import { Calendar, MoreHorizontal } from "lucide-react";

import { StatusBadge } from "@/components/cards/status-badge";
import { PageShell } from "@/components/layout/page-shell";
import { SimpleTable } from "@/components/tables/simple-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockAssignments } from "@/features/assignments/mock-data";

export default function AdminAssignmentsPage() {
  return (
    <PageShell title="Missions" description="Affectations en cours, dates, statuts et actions opérationnelles.">
      <Card>
        <CardContent className="pt-6">
          <SimpleTable
            rows={mockAssignments}
            columns={[
              { key: "candidateName", label: "Candidate" },
              { key: "clientName", label: "Client" },
              { key: "startDate", label: "Début" },
              { key: "endDate", label: "Fin" },
              { key: "status", label: "Statut", render: (row) => <StatusBadge status={row.status} /> },
              {
                key: "actions",
                label: "Actions",
                render: () => (
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" aria-label="Planifier"><Calendar /></Button>
                    <Button size="icon" variant="ghost" aria-label="Plus"><MoreHorizontal /></Button>
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
