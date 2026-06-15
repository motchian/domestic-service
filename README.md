# HomeCare Hub

## Deploy

Recommended setup:

- Frontend (Next.js) on Vercel
- Backend (API / admin sensitive services) on Render

Placeholders added: `render.yaml` and `vercel.json` in repository root. Fill secrets in hosting dashboards.
# Domestic Services Platform MVP

MVP Next.js App Router pour une plateforme de services domestiques : onboarding candidates, demandes clients, matching, admin dashboard, formations, documents, programme social et placeholder paiements.

## Installation

```bash
npm install
npm run dev
```

Ouvrez ensuite `http://localhost:3000`.

## Variables d'environnement

Copiez `.env.example` vers `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Sans Supabase configuré, les pages et API renvoient des données mock pour la démonstration.

## Supabase

1. Créez un projet Supabase.
2. Exécutez `database/schema.sql` dans SQL Editor.
3. Exécutez `database/rls-policies.sql`.
4. Exécutez `database/seed.sql` pour charger les données exemples.
5. Créez ou vérifiez le bucket privé `candidate-documents`.

## Structure

- `app/` : pages App Router et route handlers API.
- `components/` : UI shadcn-style, layout, cards, tables, formulaires.
- `features/` : domaines métier isolés, microservice-ready.
- `lib/` : Supabase, validations Zod, helpers API, constantes.
- `types/` : types globaux et types Supabase.
- `database/` : schéma, policies RLS, seed.
- `docs/` : architecture, API et setup.

## Rôles

- `admin` : accès complet aux opérations.
- `candidate` : profil, documents, formations, missions.
- `client` : demandes et profils proposés.
- `trainer` : formations.
- `social_agent` : programme social.

## Pages principales

- `/` landing page.
- `/auth/login`, `/auth/register`.
- `/candidate/onboarding`, `/candidate/dashboard`, `/candidate/profile`, `/candidate/training`, `/candidate/missions`.
- `/client/dashboard`, `/client/request`, `/client/matches`.
- `/admin/dashboard`, `/admin/candidates`, `/admin/clients`, `/admin/requests`, `/admin/matching`, `/admin/assignments`, `/admin/trainings`, `/admin/verifications`, `/admin/social-program`, `/admin/payments`, `/admin/settings`.

## Roadmap MVP

- Brancher les formulaires sur Auth + Storage avec comptes réels.
- Ajouter détails candidates, détails demandes et workflows d'approbation.
- Remplacer les mocks du matching par des requêtes Supabase optimisées.
- Ajouter notifications email/SMS/WhatsApp.
- Intégrer un PSP Mobile Money pour les paiements.
- Industrialiser vers microservices par domaine quand la charge le justifie.
