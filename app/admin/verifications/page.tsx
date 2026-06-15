import { Check, X } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { SimpleTable } from "@/components/tables/simple-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const pendingDocuments = [
  { id: "doc-001", candidate: "Aïcha Koné", type: "Pièce d'identité", status: "pending" },
  { id: "doc-002", candidate: "Mariama Diop", type: "Certificat médical", status: "pending" },
  { id: "doc-003", candidate: "Nadine Teko", type: "Référence employeur", status: "pending" }
];

export default function AdminVerificationsPage() {
  return (
    <PageShell title="Vérifications" description="Documents en attente, validation, rejet et journal de vérification.">
      <Card>
        <CardContent className="pt-6">
          <SimpleTable
            rows={pendingDocuments}
            columns={[
              { key: "candidate", label: "Candidate" },
              { key: "type", label: "Document" },
              { key: "status", label: "Statut", render: () => <Badge variant="warning">En attente</Badge> },
              {
                key: "actions",
                label: "Actions",
                render: () => (
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" aria-label="Valider"><Check /></Button>
                    <Button size="icon" variant="ghost" aria-label="Rejeter"><X /></Button>
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
