# Architecture

Le MVP est un modular monolith prêt à évoluer vers des microservices.

## Domaines

- `features/auth` : formulaires de connexion et inscription.
- `features/users` : normalisation profil utilisateur.
- `features/candidates` : onboarding, profils, données candidate.
- `features/clients` : comptes clients et données mock.
- `features/service-requests` : formulaire de demande et demandes.
- `features/matching` : moteur de scoring et recommandations.
- `features/assignments` : missions.
- `features/trainings` : formations et progression.
- `features/documents` : documents candidate.
- `features/notifications` : notifications.
- `features/admin` : graphiques et données dashboard.
- `features/social-program` : bénéficiaires vulnérables.
- `features/payments` : placeholder paiement.

## Séparation

Chaque domaine expose ses types, données mock ou fonctions métier depuis `features/`. Les pages `app/` composent les domaines. Les API routes valident avec Zod, contrôlent le rôle, puis appellent Supabase.

## Évolution microservices

Les frontières futures sont déjà visibles :

- Auth & Users
- Candidate Onboarding
- Client Requests
- Matching Engine
- Training Management
- Documents & Verification
- Assignments / Missions
- Notifications
- Social Program
- Payments

Quand l'activité augmente, chaque domaine peut extraire ses tables, jobs et endpoints vers un service dédié sans réécrire l'interface.

## Sécurité

- RLS activé sur les tables sensibles.
- Policies par rôle dans `database/rls-policies.sql`.
- Le `service_role` n'est jamais exposé côté client.
- Les clients ne voient les candidates que via des matches proposés ou acceptés.
- Les documents sont privés entre candidate concernée et admins.
