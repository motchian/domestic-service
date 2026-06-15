import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { CandidateOnboardingForm } from "@/features/candidates/components/candidate-onboarding-form";

export default function CandidateOnboardingPage() {
  return (
    <>
      <SiteHeader />
      <PageShell
        title="Onboarding candidate"
        description="Complétez votre profil, vos compétences, vos disponibilités et vos documents avant vérification."
      >
        <CandidateOnboardingForm />
      </PageShell>
    </>
  );
}
