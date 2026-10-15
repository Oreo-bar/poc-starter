import { Badge } from "@/components/ui/badge";
import type { Statut } from "@/data/demo";

const tones = {
  "À qualifier": "yellow",
  "Devis envoyé": "blue",
  Signé: "violet",
  "En chantier": "orange",
  Terminé: "green",
} as const;

export function StatusBadge({ statut }: { statut: Statut }) {
  return <Badge tone={tones[statut]}>{statut}</Badge>;
}
