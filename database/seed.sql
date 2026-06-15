truncate table
  public.payments,
  public.social_program_applications,
  public.verification_logs,
  public.admin_notes,
  public.notifications,
  public.reviews,
  public.candidate_training_progress,
  public.training_modules,
  public.trainings,
  public.assignments,
  public.matches,
  public.request_requirements,
  public.service_requests,
  public.clients,
  public.candidate_availability,
  public.candidate_skills,
  public.candidate_experiences,
  public.candidate_documents,
  public.candidates,
  public.users_profiles
restart identity cascade;

insert into public.users_profiles (id, user_id, role, full_name, phone, city) values
('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'admin', 'Admin Platform', '+2250100000001', 'Abidjan'),
('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'candidate', 'Aïcha Koné', '+2250100000002', 'Abidjan'),
('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'candidate', 'Mariama Diop', '+221770000003', 'Dakar'),
('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'candidate', 'Estelle Mensah', '+22961000004', 'Cotonou'),
('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'candidate', 'Fanta Traoré', '+22370000005', 'Bamako'),
('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', 'candidate', 'Nadine Teko', '+22890000006', 'Lomé'),
('10000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000101', 'client', 'Famille Kouadio', '+2250100000101', 'Abidjan'),
('10000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000102', 'client', 'Résidence Baobab', '+221770000102', 'Dakar'),
('10000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000103', 'client', 'Famille Mensah', '+22961000103', 'Cotonou');

insert into public.candidates (id, user_id, status, city, neighborhood, years_experience, expected_salary, bio) values
('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'verified', 'Abidjan', 'Cocody', 6, 150000, 'Aide ménagère expérimentée avec références familiales.'),
('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'pending_review', 'Dakar', 'Mermoz', 4, 180000, 'Nounou et aide familiale, disponible en semaine.'),
('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'verified', 'Cotonou', 'Fidjrossè', 8, 220000, 'Cuisinière expérimentée pour familles et événements.'),
('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005', 'draft', 'Bamako', 'ACI 2000', 2, 130000, 'Assistante à domicile pour personnes âgées.'),
('20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000006', 'verified', 'Lomé', 'Agoè', 5, 160000, 'Agent entretien bureaux et résidences.');

insert into public.candidate_skills (candidate_id, skill, level) values
('20000000-0000-0000-0000-000000000001', 'Nettoyage résidentiel', 'advanced'),
('20000000-0000-0000-0000-000000000001', 'Repassage', 'advanced'),
('20000000-0000-0000-0000-000000000002', 'Garde d''enfants', 'advanced'),
('20000000-0000-0000-0000-000000000002', 'Cuisine familiale', 'intermediate'),
('20000000-0000-0000-0000-000000000003', 'Cuisine familiale', 'advanced'),
('20000000-0000-0000-0000-000000000003', 'Cuisine événementielle', 'advanced'),
('20000000-0000-0000-0000-000000000004', 'Soins aux personnes âgées', 'intermediate'),
('20000000-0000-0000-0000-000000000005', 'Entretien bureaux', 'advanced');

insert into public.candidate_availability (candidate_id, day_of_week, time_window) values
('20000000-0000-0000-0000-000000000001', 'Lundi', 'matin'),
('20000000-0000-0000-0000-000000000001', 'Mercredi', 'matin'),
('20000000-0000-0000-0000-000000000002', 'Mardi', 'journée'),
('20000000-0000-0000-0000-000000000003', 'Samedi', 'journée'),
('20000000-0000-0000-0000-000000000004', 'Jeudi', 'matin'),
('20000000-0000-0000-0000-000000000005', 'Vendredi', 'soir');

insert into public.clients (id, user_id, client_type, city, organization_name) values
('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'family', 'Abidjan', null),
('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000102', 'company', 'Dakar', 'Résidence Baobab'),
('30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000103', 'family', 'Cotonou', null);

insert into public.service_requests (id, client_id, service_type, city, neighborhood, budget_min, budget_max, urgency, housing_possible, schedule, status, metadata) values
('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Aide ménagère', 'Abidjan', 'Cocody', 150000, 180000, 'high', false, '["Lundi matin","Mercredi matin","Samedi journée"]', 'under_review', '{"required_skills":["Nettoyage résidentiel","Repassage"]}'),
('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 'Agent d''entretien', 'Dakar', 'Plateau', 220000, 260000, 'medium', false, '["Lundi journée","Mardi journée"]', 'matched', '{"required_skills":["Entretien bureaux","Hygiène et sécurité"]}'),
('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003', 'Cuisinière', 'Cotonou', 'Fidjrossè', 200000, 240000, 'low', true, '["Vendredi journée","Samedi journée"]', 'submitted', '{"required_skills":["Cuisine familiale","Cuisine événementielle"]}'),
('40000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000001', 'Nounou', 'Abidjan', 'Riviera', 180000, 220000, 'high', true, '["Lundi journée","Mardi journée"]', 'submitted', '{"required_skills":["Garde d''enfants"]}'),
('40000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000003', 'Assistante à domicile', 'Bamako', 'ACI 2000', 130000, 160000, 'medium', false, '["Mardi matin","Jeudi matin"]', 'assigned', '{"required_skills":["Soins aux personnes âgées"]}');

insert into public.trainings (id, title, description, status) values
('50000000-0000-0000-0000-000000000001', 'Hygiène professionnelle et sécurité', 'Standards de propreté, produits et gestes sûrs.', 'active'),
('50000000-0000-0000-0000-000000000002', 'Garde d''enfants et premiers gestes', 'Bases de sécurité, communication et premiers secours.', 'active'),
('50000000-0000-0000-0000-000000000003', 'Cuisine familiale équilibrée', 'Menus hebdomadaires et hygiène alimentaire.', 'active');

insert into public.training_modules (training_id, title, position, duration_minutes) values
('50000000-0000-0000-0000-000000000001', 'Produits et surfaces', 1, 35),
('50000000-0000-0000-0000-000000000001', 'Prévention des risques', 2, 40),
('50000000-0000-0000-0000-000000000002', 'Sécurité enfant', 1, 45),
('50000000-0000-0000-0000-000000000003', 'Menus et budget', 1, 30);

insert into public.candidate_training_progress (candidate_id, training_id, status, progress) values
('20000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', 'completed', 100),
('20000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000002', 'in_progress', 54),
('20000000-0000-0000-0000-000000000003', '50000000-0000-0000-0000-000000000003', 'completed', 100);

insert into public.matches (request_id, candidate_id, score, status, reasons) values
('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 93, 'proposed', '["Même ville","Compétences alignées","Profil vérifié"]'),
('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 91, 'shortlisted', '["Cuisine avancée","Formation complétée"]'),
('40000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000004', 76, 'accepted', '["Disponibilité compatible","Besoin social prioritaire"]');

insert into public.assignments (id, request_id, candidate_id, client_id, status, start_date, end_date) values
('60000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 'active', '2026-06-12', '2026-09-12'),
('60000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000003', 'pending', '2026-06-18', '2026-08-18');

insert into public.social_program_applications (id, applicant_user_id, full_name, city, priority_level, status, metadata) values
('70000000-0000-0000-0000-000000000001', null, 'Aminata Coulibaly', 'Abidjan', 'critical', 'under_review', '{"situation":"Post-hospitalisation, faible revenu"}'),
('70000000-0000-0000-0000-000000000002', null, 'Jean Ehouman', 'Cotonou', 'high', 'matched', '{"situation":"Parent âgé isolé"}'),
('70000000-0000-0000-0000-000000000003', null, 'Fatou Sarr', 'Dakar', 'medium', 'submitted', '{"situation":"Garde ponctuelle solidaire"}');

insert into public.payments (assignment_id, client_id, amount, status, provider_reference) values
('60000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 240000, 'paid', 'demo-pay-001'),
('60000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000003', 150000, 'pending', null);
