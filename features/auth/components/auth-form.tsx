"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Loader2, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/lib/validations/auth";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"candidate" | "client">("candidate");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const schema = mode === "login" ? loginSchema : registerSchema;

  const form = useForm<LoginInput | RegisterInput>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "login"
        ? { email: "", password: "" }
        : { email: "", password: "", fullName: "", role: "candidate" }
  });

  async function onSubmit(values: LoginInput | RegisterInput) {
    setSubmitting(true);
    setMessage(null);

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Mode démo : ajoutez vos variables Supabase pour activer l'authentification.");
      setSubmitting(false);
      router.push(accountType === "candidate" ? "/candidate/dashboard" : "/client/dashboard");
      return;
    }

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) {
        setMessage(error.message);
      } else {
        router.push("/candidate/dashboard");
      }
    } else {
      const payload = values as RegisterInput;
      const { error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            full_name: payload.fullName,
            requested_role: accountType
          }
        }
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Compte créé. Vérifiez votre email si la confirmation est activée.");
      }
    }

    setSubmitting(false);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Connexion" : "Créer un compte"}</CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Accédez à votre espace candidate, client ou admin."
            : "Choisissez le type de compte adapté à votre parcours."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mode === "register" ? (
          <div className="mb-5 grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={accountType === "candidate" ? "default" : "outline"}
              onClick={() => {
                setAccountType("candidate");
                form.setValue("role" as never, "candidate" as never);
              }}
            >
              <UserRound />
              Candidate
            </Button>
            <Button
              type="button"
              variant={accountType === "client" ? "default" : "outline"}
              onClick={() => {
                setAccountType("client");
                form.setValue("role" as never, "client" as never);
              }}
            >
              <BriefcaseBusiness />
              Client
            </Button>
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {mode === "register" ? (
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input id="fullName" {...form.register("fullName" as never)} />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" autoComplete="current-password" {...form.register("password")} />
          </div>
          {message ? <p className="rounded-md bg-secondary p-3 text-sm text-muted-foreground">{message}</p> : null}
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : null}
            {mode === "login" ? "Se connecter" : "Créer le compte"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
