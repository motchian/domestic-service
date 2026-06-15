"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { candidateStatusData, monthlyRequestsData } from "@/features/admin/mock-data";

const colors = ["#2f855a", "#d97706", "#2563eb", "#dc2626"];

export function AdminCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Recharts needs browser layout before rendering ResponsiveContainer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Demandes par mois</CardTitle>
            <CardDescription>Volume entrant et recommandations générées.</CardDescription>
          </CardHeader>
          <CardContent className="h-80" />
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Statut candidates</CardTitle>
            <CardDescription>Répartition actuelle du vivier.</CardDescription>
          </CardHeader>
          <CardContent className="h-80" />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Demandes par mois</CardTitle>
          <CardDescription>Volume entrant et recommandations générées.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={monthlyRequestsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demandes" fill="#2f855a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="matches" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Statut candidates</CardTitle>
          <CardDescription>Répartition actuelle du vivier.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie data={candidateStatusData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={3}>
                {candidateStatusData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
