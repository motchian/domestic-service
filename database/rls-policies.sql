create schema if not exists app_private;

create or replace function app_private.has_role(required_role public.user_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users_profiles
    where users_profiles.user_id = auth.uid()
      and users_profiles.role = required_role
  );
$$;

create or replace function app_private.has_any_role(required_roles public.user_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users_profiles
    where users_profiles.user_id = auth.uid()
      and users_profiles.role = any(required_roles)
  );
$$;

revoke all on schema app_private from public;
revoke all on all functions in schema app_private from public;

alter table public.users_profiles enable row level security;
alter table public.candidates enable row level security;
alter table public.candidate_documents enable row level security;
alter table public.candidate_experiences enable row level security;
alter table public.candidate_skills enable row level security;
alter table public.candidate_availability enable row level security;
alter table public.clients enable row level security;
alter table public.service_requests enable row level security;
alter table public.request_requirements enable row level security;
alter table public.matches enable row level security;
alter table public.assignments enable row level security;
alter table public.trainings enable row level security;
alter table public.training_modules enable row level security;
alter table public.candidate_training_progress enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;
alter table public.admin_notes enable row level security;
alter table public.verification_logs enable row level security;
alter table public.social_program_applications enable row level security;
alter table public.payments enable row level security;

create policy "profiles_select_own_or_admin" on public.users_profiles
for select using (user_id = auth.uid() or app_private.has_role('admin'));

create policy "profiles_insert_own" on public.users_profiles
for insert with check (user_id = auth.uid() or app_private.has_role('admin'));

create policy "profiles_update_own_or_admin" on public.users_profiles
for update using (user_id = auth.uid() or app_private.has_role('admin'))
with check (user_id = auth.uid() or app_private.has_role('admin'));

create policy "profiles_admin_delete" on public.users_profiles
for delete using (app_private.has_role('admin'));

create policy "candidates_admin_all" on public.candidates
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "candidates_owner_select_update" on public.candidates
for select using (user_id = auth.uid());

create policy "candidates_owner_insert" on public.candidates
for insert with check (user_id = auth.uid());

create policy "candidates_owner_update" on public.candidates
for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "clients_view_proposed_candidates" on public.candidates
for select using (
  app_private.has_role('client')
  and exists (
    select 1
    from public.matches
    join public.service_requests on service_requests.id = matches.request_id
    join public.clients on clients.id = service_requests.client_id
    where matches.candidate_id = candidates.id
      and clients.user_id = auth.uid()
      and matches.status in ('shortlisted', 'proposed', 'accepted')
  )
);

create policy "candidate_documents_admin_all" on public.candidate_documents
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "candidate_documents_owner_select_update" on public.candidate_documents
for select using (exists (select 1 from public.candidates where candidates.id = candidate_documents.candidate_id and candidates.user_id = auth.uid()));

create policy "candidate_documents_owner_insert" on public.candidate_documents
for insert with check (exists (select 1 from public.candidates where candidates.id = candidate_documents.candidate_id and candidates.user_id = auth.uid()));

create policy "candidate_documents_owner_update" on public.candidate_documents
for update using (exists (select 1 from public.candidates where candidates.id = candidate_documents.candidate_id and candidates.user_id = auth.uid()))
with check (exists (select 1 from public.candidates where candidates.id = candidate_documents.candidate_id and candidates.user_id = auth.uid()));

create policy "candidate_details_admin_all" on public.candidate_experiences
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "candidate_details_owner_all" on public.candidate_experiences
for all using (exists (select 1 from public.candidates where candidates.id = candidate_experiences.candidate_id and candidates.user_id = auth.uid()))
with check (exists (select 1 from public.candidates where candidates.id = candidate_experiences.candidate_id and candidates.user_id = auth.uid()));

create policy "candidate_skills_admin_all" on public.candidate_skills
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "candidate_skills_owner_all" on public.candidate_skills
for all using (exists (select 1 from public.candidates where candidates.id = candidate_skills.candidate_id and candidates.user_id = auth.uid()))
with check (exists (select 1 from public.candidates where candidates.id = candidate_skills.candidate_id and candidates.user_id = auth.uid()));

create policy "candidate_availability_admin_all" on public.candidate_availability
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "candidate_availability_owner_all" on public.candidate_availability
for all using (exists (select 1 from public.candidates where candidates.id = candidate_availability.candidate_id and candidates.user_id = auth.uid()))
with check (exists (select 1 from public.candidates where candidates.id = candidate_availability.candidate_id and candidates.user_id = auth.uid()));

create policy "clients_admin_all" on public.clients
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "clients_owner_all" on public.clients
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "service_requests_admin_all" on public.service_requests
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "service_requests_owner_all" on public.service_requests
for all using (exists (select 1 from public.clients where clients.id = service_requests.client_id and clients.user_id = auth.uid()))
with check (exists (select 1 from public.clients where clients.id = service_requests.client_id and clients.user_id = auth.uid()));

create policy "requirements_admin_all" on public.request_requirements
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "requirements_client_owner_all" on public.request_requirements
for all using (
  exists (
    select 1 from public.service_requests
    join public.clients on clients.id = service_requests.client_id
    where service_requests.id = request_requirements.request_id
      and clients.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from public.service_requests
    join public.clients on clients.id = service_requests.client_id
    where service_requests.id = request_requirements.request_id
      and clients.user_id = auth.uid()
  )
);

create policy "matches_admin_all" on public.matches
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "matches_candidate_select" on public.matches
for select using (exists (select 1 from public.candidates where candidates.id = matches.candidate_id and candidates.user_id = auth.uid()));

create policy "matches_client_select" on public.matches
for select using (
  exists (
    select 1 from public.service_requests
    join public.clients on clients.id = service_requests.client_id
    where service_requests.id = matches.request_id
      and clients.user_id = auth.uid()
      and matches.status in ('shortlisted', 'proposed', 'accepted')
  )
);

create policy "assignments_admin_all" on public.assignments
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "assignments_participant_select" on public.assignments
for select using (
  exists (select 1 from public.candidates where candidates.id = assignments.candidate_id and candidates.user_id = auth.uid())
  or exists (select 1 from public.clients where clients.id = assignments.client_id and clients.user_id = auth.uid())
);

create policy "trainings_read_authenticated" on public.trainings
for select using (auth.uid() is not null);

create policy "trainings_admin_trainer_all" on public.trainings
for all using (app_private.has_any_role(array['admin', 'trainer']::public.user_role[]))
with check (app_private.has_any_role(array['admin', 'trainer']::public.user_role[]));

create policy "training_modules_read_authenticated" on public.training_modules
for select using (auth.uid() is not null);

create policy "training_modules_admin_trainer_all" on public.training_modules
for all using (app_private.has_any_role(array['admin', 'trainer']::public.user_role[]))
with check (app_private.has_any_role(array['admin', 'trainer']::public.user_role[]));

create policy "training_progress_admin_trainer_all" on public.candidate_training_progress
for all using (app_private.has_any_role(array['admin', 'trainer']::public.user_role[]))
with check (app_private.has_any_role(array['admin', 'trainer']::public.user_role[]));

create policy "training_progress_candidate_select" on public.candidate_training_progress
for select using (exists (select 1 from public.candidates where candidates.id = candidate_training_progress.candidate_id and candidates.user_id = auth.uid()));

create policy "reviews_admin_all" on public.reviews
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "reviews_participants_select" on public.reviews
for select using (
  exists (select 1 from public.candidates where candidates.id = reviews.candidate_id and candidates.user_id = auth.uid())
  or exists (select 1 from public.clients where clients.id = reviews.client_id and clients.user_id = auth.uid())
);

create policy "notifications_admin_all" on public.notifications
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "notifications_owner_select_update" on public.notifications
for select using (user_id = auth.uid());

create policy "notifications_owner_update" on public.notifications
for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "admin_notes_admin_all" on public.admin_notes
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "verification_logs_admin_all" on public.verification_logs
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "verification_logs_candidate_select" on public.verification_logs
for select using (exists (select 1 from public.candidates where candidates.id = verification_logs.candidate_id and candidates.user_id = auth.uid()));

create policy "social_applications_admin_social_all" on public.social_program_applications
for all using (app_private.has_any_role(array['admin', 'social_agent']::public.user_role[]))
with check (app_private.has_any_role(array['admin', 'social_agent']::public.user_role[]));

create policy "social_applications_owner_select_update" on public.social_program_applications
for select using (applicant_user_id = auth.uid());

create policy "social_applications_owner_insert" on public.social_program_applications
for insert with check (applicant_user_id = auth.uid());

create policy "payments_admin_all" on public.payments
for all using (app_private.has_role('admin')) with check (app_private.has_role('admin'));

create policy "payments_client_select" on public.payments
for select using (exists (select 1 from public.clients where clients.id = payments.client_id and clients.user_id = auth.uid()));

create policy "storage_candidate_documents_admin_all" on storage.objects
for all using (bucket_id = 'candidate-documents' and app_private.has_role('admin'))
with check (bucket_id = 'candidate-documents' and app_private.has_role('admin'));

create policy "storage_candidate_documents_owner_read" on storage.objects
for select using (
  bucket_id = 'candidate-documents'
  and owner = auth.uid()
);

create policy "storage_candidate_documents_owner_insert" on storage.objects
for insert with check (
  bucket_id = 'candidate-documents'
  and owner = auth.uid()
);

create policy "storage_candidate_documents_owner_update" on storage.objects
for update using (
  bucket_id = 'candidate-documents'
  and owner = auth.uid()
) with check (
  bucket_id = 'candidate-documents'
  and owner = auth.uid()
);
