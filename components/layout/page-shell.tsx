import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{description}</p>
      </div>
      {children}
    </main>
  );
}
