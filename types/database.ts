import type {
  AssignmentStatus,
  CandidateStatus,
  DocumentStatus,
  MatchStatus,
  RequestStatus,
  TrainingStatus,
  UserRole
} from "@/types/app";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type RowBase = {
  id: string;
  created_at: string;
  updated_at: string;
  metadata: Json | null;
};

export type Database = {
  public: {
    Enums: {
      user_role: UserRole;
      candidate_status: CandidateStatus;
      request_status: RequestStatus;
      assignment_status: AssignmentStatus;
      document_status: DocumentStatus;
      training_status: TrainingStatus;
      match_status: MatchStatus;
    };
    Tables: {
      users_profiles: {
        Row: RowBase & {
          user_id: string;
          role: UserRole;
          full_name: string;
          phone: string | null;
          city: string | null;
          avatar_url: string | null;
        };
        Insert: Partial<RowBase> & {
          user_id: string;
          role: UserRole;
          full_name: string;
          phone?: string | null;
          city?: string | null;
          avatar_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["users_profiles"]["Insert"]>;
      };
      candidates: {
        Row: RowBase & {
          user_id: string;
          status: CandidateStatus;
          city: string;
          neighborhood: string | null;
          years_experience: number;
          expected_salary: number | null;
          bio: string | null;
        };
        Insert: Partial<RowBase> & {
          user_id: string;
          status?: CandidateStatus;
          city: string;
          neighborhood?: string | null;
          years_experience?: number;
          expected_salary?: number | null;
          bio?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["candidates"]["Insert"]>;
      };
      candidate_documents: {
        Row: RowBase & {
          candidate_id: string;
          document_type: string;
          file_path: string;
          status: DocumentStatus;
        };
        Insert: Partial<RowBase> & {
          candidate_id: string;
          document_type: string;
          file_path: string;
          status?: DocumentStatus;
        };
        Update: Partial<Database["public"]["Tables"]["candidate_documents"]["Insert"]>;
      };
      candidate_experiences: {
        Row: RowBase & {
          candidate_id: string;
          title: string;
          employer: string | null;
          start_date: string | null;
          end_date: string | null;
          description: string | null;
        };
        Insert: Partial<RowBase> & {
          candidate_id: string;
          title: string;
          employer?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          description?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["candidate_experiences"]["Insert"]>;
      };
      candidate_skills: {
        Row: RowBase & { candidate_id: string; skill: string; level: string | null };
        Insert: Partial<RowBase> & { candidate_id: string; skill: string; level?: string | null };
        Update: Partial<Database["public"]["Tables"]["candidate_skills"]["Insert"]>;
      };
      candidate_availability: {
        Row: RowBase & { candidate_id: string; day_of_week: string; time_window: string };
        Insert: Partial<RowBase> & { candidate_id: string; day_of_week: string; time_window: string };
        Update: Partial<Database["public"]["Tables"]["candidate_availability"]["Insert"]>;
      };
      clients: {
        Row: RowBase & {
          user_id: string;
          client_type: string;
          city: string;
          organization_name: string | null;
        };
        Insert: Partial<RowBase> & {
          user_id: string;
          client_type: string;
          city: string;
          organization_name?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
      };
      service_requests: {
        Row: RowBase & {
          client_id: string;
          service_type: string;
          city: string;
          neighborhood: string | null;
          budget_min: number | null;
          budget_max: number | null;
          status: RequestStatus;
          urgency: string;
          housing_possible: boolean;
          schedule: Json;
        };
        Insert: Partial<RowBase> & {
          client_id: string;
          service_type: string;
          city: string;
          neighborhood?: string | null;
          budget_min?: number | null;
          budget_max?: number | null;
          status?: RequestStatus;
          urgency?: string;
          housing_possible?: boolean;
          schedule?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["service_requests"]["Insert"]>;
      };
      request_requirements: {
        Row: RowBase & { request_id: string; requirement: string; is_required: boolean };
        Insert: Partial<RowBase> & { request_id: string; requirement: string; is_required?: boolean };
        Update: Partial<Database["public"]["Tables"]["request_requirements"]["Insert"]>;
      };
      matches: {
        Row: RowBase & {
          request_id: string;
          candidate_id: string;
          score: number;
          status: MatchStatus;
          reasons: Json;
        };
        Insert: Partial<RowBase> & {
          request_id: string;
          candidate_id: string;
          score: number;
          status?: MatchStatus;
          reasons?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["matches"]["Insert"]>;
      };
      assignments: {
        Row: RowBase & {
          request_id: string;
          candidate_id: string;
          client_id: string;
          status: AssignmentStatus;
          start_date: string | null;
          end_date: string | null;
        };
        Insert: Partial<RowBase> & {
          request_id: string;
          candidate_id: string;
          client_id: string;
          status?: AssignmentStatus;
          start_date?: string | null;
          end_date?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["assignments"]["Insert"]>;
      };
      trainings: {
        Row: RowBase & { title: string; description: string | null; status: string };
        Insert: Partial<RowBase> & { title: string; description?: string | null; status?: string };
        Update: Partial<Database["public"]["Tables"]["trainings"]["Insert"]>;
      };
      training_modules: {
        Row: RowBase & { training_id: string; title: string; position: number; duration_minutes: number };
        Insert: Partial<RowBase> & {
          training_id: string;
          title: string;
          position: number;
          duration_minutes?: number;
        };
        Update: Partial<Database["public"]["Tables"]["training_modules"]["Insert"]>;
      };
      candidate_training_progress: {
        Row: RowBase & { candidate_id: string; training_id: string; status: TrainingStatus; progress: number };
        Insert: Partial<RowBase> & {
          candidate_id: string;
          training_id: string;
          status?: TrainingStatus;
          progress?: number;
        };
        Update: Partial<Database["public"]["Tables"]["candidate_training_progress"]["Insert"]>;
      };
      reviews: {
        Row: RowBase & { assignment_id: string; candidate_id: string; client_id: string; rating: number; comment: string | null };
        Insert: Partial<RowBase> & { assignment_id: string; candidate_id: string; client_id: string; rating: number; comment?: string | null };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
      notifications: {
        Row: RowBase & { user_id: string; title: string; body: string; read_at: string | null };
        Insert: Partial<RowBase> & { user_id: string; title: string; body: string; read_at?: string | null };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
      admin_notes: {
        Row: RowBase & { author_id: string; subject_type: string; subject_id: string; note: string };
        Insert: Partial<RowBase> & { author_id: string; subject_type: string; subject_id: string; note: string };
        Update: Partial<Database["public"]["Tables"]["admin_notes"]["Insert"]>;
      };
      verification_logs: {
        Row: RowBase & { candidate_id: string; admin_id: string | null; action: string; notes: string | null };
        Insert: Partial<RowBase> & { candidate_id: string; admin_id?: string | null; action: string; notes?: string | null };
        Update: Partial<Database["public"]["Tables"]["verification_logs"]["Insert"]>;
      };
      social_program_applications: {
        Row: RowBase & { applicant_user_id: string | null; full_name: string; city: string; priority_level: string; status: string };
        Insert: Partial<RowBase> & { applicant_user_id?: string | null; full_name: string; city: string; priority_level: string; status?: string };
        Update: Partial<Database["public"]["Tables"]["social_program_applications"]["Insert"]>;
      };
      payments: {
        Row: RowBase & { assignment_id: string | null; client_id: string | null; amount: number; status: string; provider_reference: string | null };
        Insert: Partial<RowBase> & { assignment_id?: string | null; client_id?: string | null; amount: number; status?: string; provider_reference?: string | null };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };
    };
  };
};
