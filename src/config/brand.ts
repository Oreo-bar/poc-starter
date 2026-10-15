import { LayoutDashboard, FolderKanban, Sparkles, type LucideIcon } from "lucide-react";

/*
  IDENTITÉ DU POC
  Nom du client, nom de l'application et navigation.
  À adapter en premier pour chaque nouveau POC (avec src/styles/theme.css).
*/
export const brand = {
  clientName: "Maison Verdier",
  appName: "Pilotage chantiers",
  tagline: "Rénovation énergétique",
  /* Initiales affichées dans le carré de logo si aucun logo image n'est fourni */
  monogram: "MV",
  /* Mettre un chemin dans /public (ex. "/logo-client.svg") pour afficher le vrai logo */
  logoSrc: null as string | null,
  /* Utilisateur fictif affiché dans la barre latérale */
  user: { name: "Claire Moreau", role: "Directrice des opérations" },
};

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const navigation: NavItem[] = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dossiers", label: "Dossiers", icon: FolderKanban },
  { href: "/assistant", label: "Assistant IA", icon: Sparkles },
];
