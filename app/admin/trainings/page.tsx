import { BookOpen, UsersRound } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTrainings } from "@/features/trainings/mock-data";

export default function AdminTrainingsPage() {
  return (
    <PageShell title="Formations" description="Gestion des parcours, modules et progression candidate.">
      <div className="grid gap-4 md:grid-cols-3">
        {mockTrainings.map((training) => (
          <Card key={training.id}>
            <CardHeader>
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>{training.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <UsersRound className="h-4 w-4" />
                {training.enrolled} candidates inscrites
              </p>
              <Progress className="mt-4" value={training.completionRate} />
              <p className="mt-2 text-xs text-muted-foreground">{training.modules} modules - {training.completionRate}% progression</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
