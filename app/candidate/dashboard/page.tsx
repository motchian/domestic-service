import { CalendarCheck, FileCheck2, GraduationCap, Star } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CandidateDashboardPage() {
  return (
    <>
      <SiteHeader />
      <PageShell title="Dashboard candidate" description="Suivez votre validation, vos formations et les missions proposées.">
        <div className="grid gap-4 md:grid-cols-4">
          <KpiCard label="Statut" value="En attente" change="Dossier soumis" icon={FileCheck2} />
          <KpiCard label="Documents" value="3/4" change="1 pièce à compléter" icon={FileCheck2} />
          <KpiCard label="Formation" value="72%" change="Hygiène professionnelle" icon={GraduationCap} />
          <KpiCard label="Note" value="4.8" change="Avis clients mock" icon={Star} />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Missions proposées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Aide ménagère - Cocody", "Gouvernante - Riviera", "Cuisine familiale - Plateau"].map((mission) => (
                <div key={mission} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">{mission}</span>
                  <Badge variant="info">Recommandée</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Prochaines étapes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><CalendarCheck className="h-4 w-4 text-primary" /> Entretien admin à planifier.</p>
              <p className="flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-primary" /> Certificat médical à déposer.</p>
              <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /> Module sécurité à terminer.</p>
            </CardContent>
          </Card>
        </div>
      </PageShell>
    </>
  );
}
