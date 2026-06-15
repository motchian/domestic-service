# API

Toutes les routes retournent :

```json
{
  "data": {},
  "error": null
}
```

En erreur :

```json
{
  "data": null,
  "error": {
    "message": "Validation failed"
  }
}
```

## Candidates

- `GET /api/candidates` : liste admin.
- `POST /api/candidates` : crée un profil candidate.
- `GET /api/candidates/[id]` : détail candidate.
- `PATCH /api/candidates/[id]` : mise à jour profil/statut.

## Clients

- `GET /api/clients` : clients admin ou profil client courant.
- `POST /api/clients` : crée un profil client.

## Service Requests

- `GET /api/service-requests` : demandes.
- `POST /api/service-requests` : crée une demande.
- `GET /api/service-requests/[id]` : détail.
- `PATCH /api/service-requests/[id]` : mise à jour statut ou contenu.

## Matching

- `POST /api/matching/recommend` avec `{ "requestId": "req-001" }`.
- `POST /api/matching/propose` avec `{ "requestId": "...", "candidateId": "...", "message": "..." }`.

## Assignments

- `GET /api/assignments`.
- `POST /api/assignments`.
- `PATCH /api/assignments/[id]`.

## Admin

- `GET /api/admin/stats`.

## Trainings

- `GET /api/trainings`.
- `POST /api/trainings`.

## Social Program

- `GET /api/social-program`.
- `POST /api/social-program`.

## Notifications

- `GET /api/notifications`.
- `POST /api/notifications`.
