import { Banknote, CreditCard, Receipt } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPaymentsPage() {
  return (
    <PageShell title="Paiements" description="Placeholder MVP pour commissions, paiements clients et règlements candidates.">
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Volume brut" value="2.4M FCFA" change="Placeholder juin" icon={Banknote} />
        <KpiCard label="Commissions" value="320k FCFA" change="À connecter PSP" icon={CreditCard} />
        <KpiCard label="Factures" value="18" change="12 payées" icon={Receipt} />
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Roadmap paiement</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="secondary">Mobile Money</Badge>
          <Badge variant="secondary">Facturation entreprise</Badge>
          <Badge variant="secondary">Commissions plateforme</Badge>
          <Badge variant="secondary">Versements candidates</Badge>
        </CardContent>
      </Card>
    </PageShell>
  );
}
