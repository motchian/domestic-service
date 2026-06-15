import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTrainings } from "@/features/trainings/mock-data";

export default function CandidateTrainingPage() {
  return (
    <>
      <SiteHeader />
      <PageShell title="Formations" description="Modules internes pour renforcer la qualité et la sécurité des missions.">
        <div className="grid gap-4 md:grid-cols-3">
          {mockTrainings.map((training) => (
            <Card key={training.id}>
              <CardHeader>
                <CardTitle>{training.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{training.modules} modules</p>
                <Progress className="mt-4" value={training.completionRate} />
                <p className="mt-2 text-xs text-muted-foreground">{training.completionRate}% complété</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>
    </>
  );
}
