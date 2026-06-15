import { Settings } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  return (
    <PageShell title="Paramètres" description="Configuration plateforme placeholder.">
      <Card>
        <CardHeader>
          <Settings className="h-5 w-5 text-primary" />
          <CardTitle>Paramètres généraux</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nom plateforme</Label>
            <Input defaultValue="HomeCare Hub" />
          </div>
          <div className="space-y-2">
            <Label>Commission par défaut</Label>
            <Input defaultValue="12%" />
          </div>
          <div className="space-y-2">
            <Label>Email support</Label>
            <Input defaultValue="support@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Pays pilote</Label>
            <Input defaultValue="Côte d'Ivoire" />
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
