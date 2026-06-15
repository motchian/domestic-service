import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { ServiceRequestForm } from "@/features/service-requests/components/service-request-form";

export default function ClientRequestPage() {
  return (
    <>
      <SiteHeader />
      <PageShell
        title="Nouvelle demande"
        description="Précisez le service, la localisation, le budget, les horaires et les exigences."
      >
        <ServiceRequestForm />
      </PageShell>
    </>
  );
}
