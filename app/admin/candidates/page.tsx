import { Eye, ShieldCheck, ShieldX } from "lucide-react";

import { StatusBadge } from "@/components/cards/status-badge";
import { PageShell } from "@/components/layout/page-shell";
import { SimpleTable } from "@/components/tables/simple-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockCandidates } from "@/features/candidates/mock-data";

export default function AdminCandidatesPage() {
  return (
    <PageShell title="Candidates" description="Validation, suspension et filtrage du vivier de personnel domestique.">
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Statut" />
          <Input placeholder="Ville" />
          <Input placeholder="Compétence" />
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent className="pt-6">
          <SimpleTable
            rows={mockCandidates}
            columns={[
              { key: "name", label: "Candidate" },
              { key: "city", label: "Ville" },
              { key: "skills", label: "Compétences", render: (row) => row.skills.slice(0, 2).join(", ") },
              { key: "status", label: "Statut", render: (row) => <StatusBadge status={row.status} /> },
              {
                key: "actions",
                label: "Actions",
                render: () => (
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" aria-label="Voir"><Eye /></Button>
                    <Button size="icon" variant="ghost" aria-label="Valider"><ShieldCheck /></Button>
                    <Button size="icon" variant="ghost" aria-label="Rejeter"><ShieldX /></Button>
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
