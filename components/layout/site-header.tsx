import Link from "next/link";
import { Home, LogIn, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { appName } from "@/lib/constants/app";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </span>
          <span>{appName}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <Link href="/client/request">Demande client</Link>
          <Link href="/candidate/onboarding">Inscription candidate</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/login">
              <LogIn />
              Login
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/register">
              <UserPlus />
            S&apos;inscrire
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
