import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/cards/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAssignments } from "@/features/assignments/mock-data";

export default function CandidateMissionsPage() {
  return (
    <>
      <SiteHeader />
      <PageShell title="Missions" description="Missions proposées, en cours et historiques.">
        <Card>
          <CardHeader>
            <CardTitle>Suivi des missions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAssignments.map((assignment) => (
              <div key={assignment.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{assignment.clientName}</p>
                  <p className="text-sm text-muted-foreground">{assignment.startDate} - {assignment.endDate}</p>
                </div>
                <StatusBadge status={assignment.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </PageShell>
    </>
  );
}
