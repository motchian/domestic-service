import Link from "next/link";

import { AuthForm } from "@/features/auth/components/auth-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary/50 px-4 py-10">
      <div className="w-full max-w-md">
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Pas encore de compte ? <Link className="font-medium text-primary" href="/auth/register">Créer un compte</Link>
        </p>
      </div>
    </main>
  );
}
