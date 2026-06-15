import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recommendCandidatesForRequest } from "@/features/matching/engine";

export default async function ClientMatchesPage() {
  const recommendations = await recommendCandidatesForRequest("req-001");

  return (
    <>
      <SiteHeader />
      <PageShell title="Profils proposés" description="Recommandations issues du moteur de matching MVP.">
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.slice(0, 4).map((match) => (
            <Card key={match.candidateId}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {match.name}
                  <Badge>{match.score}/100</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{match.city}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {match.skills.slice(0, 3).map((skill) => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {match.reasons.slice(0, 3).map((reason) => <li key={reason}>- {reason}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>
    </>
  );
}
