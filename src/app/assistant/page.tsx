import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Chat } from "./chat";

export const metadata = { title: "Assistant IA" };

export default function AssistantPage() {
  return (
    <PageContainer>
      <PageHeader
        overline="Intelligence artificielle"
        title="Assistant IA"
        description="Posez une question sur vos dossiers : priorités, relances, aides, chiffre d'affaires."
      />
      <Chat />
    </PageContainer>
  );
}
