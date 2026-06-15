create extension if not exists pgcrypto;

do $$
begin
  create type public.user_role as enum ('admin', 'candidate', 'client', 'trainer', 'social_agent');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.candidate_status as enum ('draft', 'pending_review', 'verified', 'rejected', 'suspended');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.request_status as enum ('draft', 'submitted', 'under_review', 'matched', 'assigned', 'completed', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.assignment_status as enum ('pending', 'accepted', 'rejected', 'active', 'completed', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.document_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.training_status as enum ('not_started', 'in_progress', 'completed');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.match_status as enum ('recommended', 'shortlisted', 'proposed', 'accepted', 'rejected');
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.users_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid not null unique,
  role public.user_role not null,
  full_name text not null,
  phone text,
  city text,
  avatar_url text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid not null,
  status public.candidate_status not null default 'draft',
  city text not null,
  neighborhood text,
  years_experience integer not null default 0,
  expected_salary numeric(12, 2),
  bio text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.candidate_documents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  document_type text not null,
  file_path text not null,
  status public.document_status not null default 'pending',
  reviewed_by uuid,
  reviewed_at timestamptz,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.candidate_experiences (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  title text not null,
  employer text,
  start_date date,
  end_date date,
  description text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.candidate_skills (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  skill text not null,
  level text,
  metadata jsonb default '{}'::jsonb,
  unique (candidate_id, skill)
);

create table if not exists public.candidate_availability (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  day_of_week text not null,
  time_window text not null,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid not null,
  client_type text not null default 'family',
  city text not null,
  organization_name text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_id uuid not null references public.clients(id) on delete cascade,
  service_type text not null,
  city text not null,
  neighborhood text,
  budget_min numeric(12, 2),
  budget_max numeric(12, 2),
  urgency text not null default 'medium',
  housing_possible boolean not null default false,
  schedule jsonb not null default '[]'::jsonb,
  status public.request_status not null default 'draft',
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.request_requirements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  requirement text not null,
  is_required boolean not null default true,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  status public.match_status not null default 'recommended',
  reasons jsonb not null default '[]'::jsonb,
  metadata jsonb default '{}'::jsonb,
  unique (request_id, candidate_id)
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete restrict,
  client_id uuid not null references public.clients(id) on delete cascade,
  status public.assignment_status not null default 'pending',
  start_date date,
  end_date date,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.trainings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  description text,
  status text not null default 'active',
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.training_modules (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  training_id uuid not null references public.trainings(id) on delete cascade,
  title text not null,
  position integer not null default 1,
  duration_minutes integer not null default 30,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.candidate_training_progress (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  training_id uuid not null references public.trainings(id) on delete cascade,
  status public.training_status not null default 'not_started',
  progress integer not null default 0 check (progress between 0 and 100),
  completed_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  unique (candidate_id, training_id)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid not null,
  title text not null,
  body text not null,
  read_at timestamptz,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author_id uuid not null,
  subject_type text not null,
  subject_id uuid not null,
  note text not null,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.verification_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  admin_id uuid,
  action text not null,
  notes text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.social_program_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  applicant_user_id uuid,
  full_name text not null,
  city text not null,
  priority_level text not null default 'medium',
  status text not null default 'submitted',
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  assignment_id uuid references public.assignments(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  amount numeric(12, 2) not null,
  status text not null default 'pending',
  provider_reference text,
  metadata jsonb default '{}'::jsonb
);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'users_profiles', 'candidates', 'candidate_documents', 'candidate_experiences',
    'candidate_skills', 'candidate_availability', 'clients', 'service_requests',
    'request_requirements', 'matches', 'assignments', 'trainings', 'training_modules',
    'candidate_training_progress', 'reviews', 'notifications', 'admin_notes',
    'verification_logs', 'social_program_applications', 'payments'
  ]
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name,
      table_name
    );
  end loop;
end $$;

create index if not exists idx_users_profiles_user_id on public.users_profiles(user_id);
create index if not exists idx_users_profiles_role on public.users_profiles(role);
create index if not exists idx_candidates_user_id on public.candidates(user_id);
create index if not exists idx_candidates_status on public.candidates(status);
create index if not exists idx_candidates_city on public.candidates(city);
create index if not exists idx_candidate_documents_candidate_id on public.candidate_documents(candidate_id);
create index if not exists idx_candidate_documents_status on public.candidate_documents(status);
create index if not exists idx_candidate_experiences_candidate_id on public.candidate_experiences(candidate_id);
create index if not exists idx_candidate_skills_candidate_id on public.candidate_skills(candidate_id);
create index if not exists idx_candidate_skills_skill on public.candidate_skills(skill);
create index if not exists idx_candidate_availability_candidate_id on public.candidate_availability(candidate_id);
create index if not exists idx_clients_user_id on public.clients(user_id);
create index if not exists idx_clients_city on public.clients(city);
create index if not exists idx_service_requests_client_id on public.service_requests(client_id);
create index if not exists idx_service_requests_status on public.service_requests(status);
create index if not exists idx_service_requests_city on public.service_requests(city);
create index if not exists idx_service_requests_service_type on public.service_requests(service_type);
create index if not exists idx_service_requests_created_at on public.service_requests(created_at);
create index if not exists idx_request_requirements_request_id on public.request_requirements(request_id);
create index if not exists idx_matches_request_id on public.matches(request_id);
create index if not exists idx_matches_candidate_id on public.matches(candidate_id);
create index if not exists idx_matches_status on public.matches(status);
create index if not exists idx_assignments_request_id on public.assignments(request_id);
create index if not exists idx_assignments_candidate_id on public.assignments(candidate_id);
create index if not exists idx_assignments_client_id on public.assignments(client_id);
create index if not exists idx_assignments_status on public.assignments(status);
create index if not exists idx_training_modules_training_id on public.training_modules(training_id);
create index if not exists idx_candidate_training_progress_candidate_id on public.candidate_training_progress(candidate_id);
create index if not exists idx_candidate_training_progress_training_id on public.candidate_training_progress(training_id);
create index if not exists idx_reviews_candidate_id on public.reviews(candidate_id);
create index if not exists idx_reviews_client_id on public.reviews(client_id);
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_social_program_applications_status on public.social_program_applications(status);
create index if not exists idx_social_program_applications_city on public.social_program_applications(city);
create index if not exists idx_payments_client_id on public.payments(client_id);
create index if not exists idx_payments_status on public.payments(status);

insert into storage.buckets (id, name, public)
values ('candidate-documents', 'candidate-documents', false)
on conflict (id) do nothing;
