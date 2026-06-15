"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { SelectField } from "@/components/forms/select-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { candidateSkills, cities, serviceTypes } from "@/lib/constants/app";
import { serviceRequestSchema, type ServiceRequestInput } from "@/lib/validations/service-request";

const steps = ["Type de service", "Localisation", "Horaires", "Budget", "Exigences", "Urgence", "Confirmation"];
const scheduleOptions = ["Lundi matin", "Mardi journée", "Mercredi matin", "Jeudi journée", "Vendredi soir", "Samedi journée"];

export function ServiceRequestForm() {
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const form = useForm<ServiceRequestInput>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      serviceType: "",
      city: "",
      neighborhood: "",
      schedule: [],
      budgetMin: 0,
      budgetMax: 0,
      urgency: "medium",
      housingPossible: false,
      requiredSkills: [],
      requirements: ""
    }
  });

  const progress = Math.round(((step + 1) / steps.length) * 100);
  const selectedSchedule = useWatch({ control: form.control, name: "schedule" }) ?? [];
  const selectedRequiredSkills = useWatch({ control: form.control, name: "requiredSkills" }) ?? [];
  const urgency = useWatch({ control: form.control, name: "urgency" });

  function toggleList(field: "schedule" | "requiredSkills", value: string) {
    const current = form.getValues(field) ?? [];
    form.setValue(
      field,
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
      { shouldValidate: true }
    );
  }

  async function onSubmit(values: ServiceRequestInput) {
    setSaved(false);
    await fetch("/api/service-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    setSaved(true);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{steps[step]}</CardTitle>
            <CardDescription>Décrivez le besoin pour recevoir des profils adaptés.</CardDescription>
          </div>
          <Badge variant="secondary">{progress}% complété</Badge>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {step === 0 ? (
            <Field label="Service recherché" error={form.formState.errors.serviceType?.message}>
              <SelectField options={serviceTypes} {...form.register("serviceType")} />
            </Field>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Ville" error={form.formState.errors.city?.message}>
                <SelectField options={cities} {...form.register("city")} />
              </Field>
              <Field label="Quartier" error={form.formState.errors.neighborhood?.message}>
                <Input {...form.register("neighborhood")} />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <ChoiceGrid values={scheduleOptions} selected={selectedSchedule} onToggle={(value) => toggleList("schedule", value)} />
          ) : null}

          {step === 3 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Budget minimum" error={form.formState.errors.budgetMin?.message}>
                <Input type="number" {...form.register("budgetMin", { valueAsNumber: true })} />
              </Field>
              <Field label="Budget maximum" error={form.formState.errors.budgetMax?.message}>
                <Input type="number" {...form.register("budgetMax", { valueAsNumber: true })} />
              </Field>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-5">
              <ChoiceGrid
                values={candidateSkills}
                selected={selectedRequiredSkills}
                onToggle={(value) => toggleList("requiredSkills", value)}
              />
              <Field label="Exigences particulières" error={form.formState.errors.requirements?.message}>
                <Textarea {...form.register("requirements")} />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...form.register("housingPossible")} />
                Logement possible
              </label>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["low", "Flexible"],
                ["medium", "Sous 2 semaines"],
                ["high", "Urgent"]
              ].map(([value, label]) => (
                <Button
                  key={value}
                  type="button"
                  variant={urgency === value ? "default" : "outline"}
                  onClick={() => form.setValue("urgency", value as ServiceRequestInput["urgency"])}
                >
                  {label}
                </Button>
              ))}
            </div>
          ) : null}

          {step === 6 ? (
            <div className="rounded-lg border bg-secondary/50 p-5">
              <h3 className="font-semibold">Demande prête à être analysée</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Le centre de matching proposera des profils selon la localisation, les compétences, les disponibilités et la validation admin.
              </p>
            </div>
          ) : null}

          {saved ? <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">Demande enregistrée en mode MVP.</p> : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>
              <ArrowLeft />
              Retour
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" onClick={() => setStep((current) => current + 1)}>
                Continuer
                <ArrowRight />
              </Button>
            ) : (
              <Button type="submit">
                <Check />
                Soumettre la demande
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function ChoiceGrid({
  values,
  selected,
  onToggle
}: {
  values: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((value) => (
        <Button
          key={value}
          type="button"
          variant={selected.includes(value) ? "default" : "outline"}
          className="justify-start"
          onClick={() => onToggle(value)}
        >
          {selected.includes(value) ? <Check /> : null}
          {value}
        </Button>
      ))}
    </div>
  );
}
