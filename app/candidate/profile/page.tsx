import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/cards/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCandidates } from "@/features/candidates/mock-data";

export default function CandidateProfilePage() {
  const candidate = mockCandidates[0];

  return (
    <>
      <SiteHeader />
      <PageShell title="Profil candidate" description="Aperçu du profil transmis aux admins et aux clients proposés.">
        <Card>
          <CardHeader>
            <CardTitle>{candidate.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Localisation</p>
              <p className="font-medium">{candidate.city}, {candidate.neighborhood}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Statut</p>
              <StatusBadge status={candidate.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Salaire souhaité</p>
              <p className="font-medium">{candidate.expectedSalary.toLocaleString("fr-FR")} FCFA</p>
            </div>
            <div className="md:col-span-3">
              <p className="mb-2 text-sm text-muted-foreground">Compétences</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => <span key={skill} className="rounded-md bg-secondary px-2.5 py-1 text-xs">{skill}</span>)}
              </div>
            </div>
          </CardContent>
        </Card>
      </PageShell>
    </>
  );
}
