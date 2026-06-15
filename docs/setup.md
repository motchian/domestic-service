# Setup

## Local

```bash
npm install
npm run dev
```

Le projet utilise Next.js App Router, TypeScript, Tailwind CSS, React Hook Form, Zod, Supabase, lucide-react et Recharts.

## Supabase

Dans Supabase SQL Editor, exécutez dans cet ordre :

1. `database/schema.sql`
2. `database/rls-policies.sql`
3. `database/seed.sql`

Ajoutez les variables de `.env.example` dans `.env.local`.

## Auth

Les policies RLS s'appuient sur `auth.uid()` et `users_profiles.role`. En production, créez un trigger Supabase Auth qui insère une ligne `users_profiles` après inscription, ou faites-le depuis une route serveur admin.

## Storage

Le bucket privé `candidate-documents` est créé dans `schema.sql`. Les policies Storage autorisent :

- l'admin à lire et modifier tous les documents ;
- la candidate propriétaire à lire, insérer et mettre à jour ses fichiers.
