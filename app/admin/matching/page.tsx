import { Send, UserCheck } from "lucide-react";

import { StatusBadge } from "@/components/cards/status-badge";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockServiceRequests } from "@/features/service-requests/mock-data";
import { recommendCandidatesForRequest } from "@/features/matching/engine";

export default async function AdminMatchingPage() {
  const request = mockServiceRequests[0];
  const recommendations = await recommendCandidatesForRequest(request.id);

  return (
    <PageShell title="Matching center" description="Sélectionnez une demande, comparez les scores et proposez une candidate.">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Demande sélectionnée</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-lg font-semibold">{request.serviceType}</p>
            <p className="text-sm text-muted-foreground">{request.clientName} - {request.city}, {request.neighborhood}</p>
            <StatusBadge status={request.status} />
            <div className="flex flex-wrap gap-2">
              {request.requiredSkills.map((skill) => <Badge key={skill} variant="secondary">{skill}</Badge>)}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-3">
          {recommendations.slice(0, 4).map((match) => (
            <Card key={match.candidateId}>
              <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{match.name}</h3>
                    <Badge>{match.score}/100</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{match.city} - {match.reasons.slice(0, 2).join(" | ")}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Send /> Proposer</Button>
                  <Button size="sm"><UserCheck /> Affecter</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
