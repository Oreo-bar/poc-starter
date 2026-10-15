import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { DossiersTable } from "./dossiers-table";
import { dossiers } from "@/data/demo";

export const metadata = { title: "Dossiers" };

export default function DossiersPage() {
  return (
    <PageContainer>
      <PageHeader
        overline="Suivi commercial"
        title="Dossiers"
        description="Tous les dossiers clients, de la qualification à la réception du chantier."
      />
      <DossiersTable data={dossiers} />
    </PageContainer>
  );
}
