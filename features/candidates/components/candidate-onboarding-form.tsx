"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { SelectField } from "@/components/forms/select-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { candidateSkills, cities } from "@/lib/constants/app";
import { apiUrl } from "@/lib/api/url";
import { candidateOnboardingSchema, type CandidateOnboardingInput } from "@/lib/validations/candidate";

const steps = [
  "Informations personnelles",
  "Localisation",
  "Compétences",
  "Expériences",
  "Disponibilités",
  "Documents",
  "Confirmation"
];

const availabilityOptions = ["Lundi matin", "Mardi journée", "Mercredi matin", "Jeudi journée", "Vendredi soir", "Samedi journée"];

export function CandidateOnboardingForm() {
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const form = useForm<CandidateOnboardingInput>({
    resolver: zodResolver(candidateOnboardingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      neighborhood: "",
      skills: [],
      yearsExperience: 0,
      availability: [],
      documents: [],
      expectedSalary: 0,
      bio: ""
    }
  });

  const progress = Math.round(((step + 1) / steps.length) * 100);
  const selectedSkills = useWatch({ control: form.control, name: "skills" }) ?? [];
  const selectedAvailability = useWatch({ control: form.control, name: "availability" }) ?? [];
  const selectedDocuments = useWatch({ control: form.control, name: "documents" }) ?? [];

  function toggleList(field: "skills" | "availability" | "documents", value: string) {
    const current = form.getValues(field) ?? [];
    form.setValue(
      field,
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
      { shouldValidate: true }
    );
  }

  async function onSubmit(values: CandidateOnboardingInput) {
    setSaved(false);
    await fetch(apiUrl("/api/candidates"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    setSaved(true);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{steps[step]}</CardTitle>
            <CardDescription>Étape {step + 1} sur {steps.length}</CardDescription>
          </div>
          <Badge variant="secondary">{progress}% complété</Badge>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {step === 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nom complet" error={form.formState.errors.fullName?.message}>
                <Input {...form.register("fullName")} />
              </Field>
              <Field label="Téléphone" error={form.formState.errors.phone?.message}>
                <Input {...form.register("phone")} />
              </Field>
              <Field label="Salaire souhaité mensuel" error={form.formState.errors.expectedSalary?.message}>
                <Input type="number" {...form.register("expectedSalary", { valueAsNumber: true })} />
              </Field>
              <Field label="Années d'expérience" error={form.formState.errors.yearsExperience?.message}>
                <Input type="number" {...form.register("yearsExperience", { valueAsNumber: true })} />
              </Field>
            </div>
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
            <ChoiceGrid
              values={candidateSkills}
              selected={selectedSkills}
              onToggle={(value) => toggleList("skills", value)}
            />
          ) : null}

          {step === 3 ? (
            <Field label="Parlez de vos expériences" error={form.formState.errors.bio?.message}>
              <Textarea rows={6} {...form.register("bio")} />
            </Field>
          ) : null}

          {step === 4 ? (
            <ChoiceGrid
              values={availabilityOptions}
              selected={selectedAvailability}
              onToggle={(value) => toggleList("availability", value)}
            />
          ) : null}

          {step === 5 ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {["Pièce d'identité", "Certificat médical", "Référence employeur"].map((document) => (
                <Button
                  key={document}
                  type="button"
                  variant={selectedDocuments.includes(document) ? "default" : "outline"}
                  onClick={() => toggleList("documents", document)}
                >
                  <Upload />
                  {document}
                </Button>
              ))}
            </div>
          ) : null}

          {step === 6 ? (
            <div className="rounded-lg border bg-secondary/50 p-5">
              <h3 className="font-semibold">Prêt pour vérification</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Votre profil sera soumis à l&apos;équipe admin. Vous pourrez compléter les documents manquants depuis votre tableau de bord.
              </p>
            </div>
          ) : null}

          {saved ? <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">Profil enregistré en mode MVP.</p> : null}

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
                Soumettre le profil
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
