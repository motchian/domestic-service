import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, HandHeart, ShieldCheck, Sparkles, UsersRound } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = ["Inscription", "Vérification", "Matching", "Mission suivie"];
const testimonials = [
  "Une réponse claire en moins de 48h pour une aide ménagère vérifiée.",
  "Le suivi admin donne confiance aux familles et aux candidates.",
  "Le programme social rend le service accessible aux foyers vulnérables."
];

export default function HomePage() {
  return (
    <div>
      <SiteHeader />
      <section className="relative isolate flex min-h-[82svh] items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=80"
          alt="Professionnelle préparant un espace domestique propre"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,22,18,0.86),rgba(7,22,18,0.58),rgba(7,22,18,0.18))]" />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 text-white sm:px-6 lg:px-8">
          <Badge className="border-white/20 bg-white/15 text-white">Plateforme de gestion du personnel à domicile</Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-normal sm:text-6xl">
            HomeCare Hub
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/82">
            Un espace interne pour suivre automatiquement les actions et les tâches du personnel à domicile.
            La plateforme planifie, contrôle et reporte les interventions sans mobiliser les parents.
            Inscription avec documents chargés et prise en charge opérationnelle pour tous les profils : ménage, soutien scolaire, aides de vie, etc.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/client/request">
                Recruter une aide ménagère
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/candidate/onboarding">Rejoindre l'équipe</Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { icon: UsersRound, title: "Je cherche du personnel", text: "Collecte des besoins, documents et profils pour organiser missions ménagères, soutien scolaire et services à domicile." },
            { icon: BadgeCheck, title: "Je veux travailler", text: "Inscription avec documents, assurance et formation garanties pour les candidates de tous les profils." },
            { icon: HandHeart, title: "Programme social", text: "Mise en relation solidaire et suivi des bénéficiaires vulnérables." }
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <item.icon className="h-5 w-5 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.text}</CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge variant="secondary">Confiance opérationnelle</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">Un matching humain, vérifiable et pilotable.</h2>
            <p className="mt-4 text-muted-foreground">
              La plateforme combine onboarding, gestion des qualifications, outils de gestion dédiés,
              gestion documentaire, formations et recommandations scorées pour une solution opérationnelle et évolutive.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step} className="rounded-lg border bg-card p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-semibold">{step}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {index === 0 && "Le profil ou la demande est collecté avec un formulaire structuré."}
                  {index === 1 && "Les documents, rôles et statuts sont contrôlés par l'administration."}
                  {index === 2 && "Le moteur calcule des recommandations explicables."}
                  {index === 3 && "Les affectations et missions restent visibles dans les espaces dédiés."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {testimonials.map((text) => (
            <Card key={text}>
              <CardContent className="pt-6">
                <Sparkles className="mb-4 h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">“{text}”</p>
              </CardContent>
            </Card>
          ))}
        </section>

      </main>
    </div>
  );
}
