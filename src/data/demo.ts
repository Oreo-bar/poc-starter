/*
  DONNÉES DE DÉMO
  Fausses mais réalistes : vocabulaire métier du client, noms et villes français, montants crédibles.
  Pour un nouveau POC, remplacer ce fichier par des données du secteur du client.
*/

export type Statut = "À qualifier" | "Devis envoyé" | "Signé" | "En chantier" | "Terminé";

export type Dossier = {
  id: string;
  client: string;
  ville: string;
  type: string;
  montant: number;
  statut: Statut;
  responsable: string;
  creeLe: string;
  aidesEstimees: number;
  priorite: "Haute" | "Normale" | "Basse";
  note: string;
};

export const dossiers: Dossier[] = [
  { id: "DV-2481", client: "Famille Lefèvre", ville: "Versailles", type: "Pompe à chaleur air/eau", montant: 14800, statut: "Devis envoyé", responsable: "Julien Roche", creeLe: "2026-10-09", aidesEstimees: 5200, priorite: "Haute", note: "Relance prévue jeudi, client sensible au calendrier des aides." },
  { id: "DV-2479", client: "SCI Les Tilleuls", ville: "Saint-Germain-en-Laye", type: "Isolation des combles", montant: 9600, statut: "Signé", responsable: "Inès Garnier", creeLe: "2026-10-07", aidesEstimees: 3100, priorite: "Normale", note: "Acompte reçu, planification équipe à confirmer." },
  { id: "DV-2477", client: "M. et Mme Bertin", ville: "Rueil-Malmaison", type: "Rénovation globale", montant: 48500, statut: "En chantier", responsable: "Julien Roche", creeLe: "2026-09-30", aidesEstimees: 19800, priorite: "Haute", note: "Phase 2 sur 3 : menuiseries posées, VMC la semaine prochaine." },
  { id: "DV-2474", client: "Copropriété Le Parc", ville: "Boulogne-Billancourt", type: "Isolation par l'extérieur", montant: 126000, statut: "Devis envoyé", responsable: "Thomas Faure", creeLe: "2026-09-28", aidesEstimees: 41000, priorite: "Haute", note: "Vote en AG le 4 novembre, présentation au conseil syndical à préparer." },
  { id: "DV-2470", client: "Mme Dubois", ville: "Chatou", type: "Chaudière biomasse", montant: 17200, statut: "À qualifier", responsable: "Inès Garnier", creeLe: "2026-09-26", aidesEstimees: 6800, priorite: "Normale", note: "Visite technique à programmer, accès chaufferie à vérifier." },
  { id: "DV-2468", client: "Boulangerie Martin", ville: "Le Vésinet", type: "Remplacement menuiseries", montant: 11400, statut: "Terminé", responsable: "Thomas Faure", creeLe: "2026-09-21", aidesEstimees: 2400, priorite: "Basse", note: "Réception sans réserve, avis client demandé." },
  { id: "DV-2465", client: "Famille Nguyen", ville: "Nanterre", type: "Pompe à chaleur air/eau", montant: 13900, statut: "Signé", responsable: "Julien Roche", creeLe: "2026-09-18", aidesEstimees: 5000, priorite: "Normale", note: "Dossier MaPrimeRénov' déposé, en attente d'accord." },
  { id: "DV-2462", client: "M. Petit", ville: "Marly-le-Roi", type: "Isolation des combles", montant: 7300, statut: "Terminé", responsable: "Inès Garnier", creeLe: "2026-09-15", aidesEstimees: 2600, priorite: "Basse", note: "Facture soldée." },
  { id: "DV-2460", client: "SCI Horizon", ville: "Puteaux", type: "Rénovation globale", montant: 62000, statut: "À qualifier", responsable: "Thomas Faure", creeLe: "2026-09-12", aidesEstimees: 24500, priorite: "Haute", note: "Audit énergétique à commander avant chiffrage définitif." },
  { id: "DV-2457", client: "Mme Rousseau", ville: "Croissy-sur-Seine", type: "Ballon thermodynamique", montant: 3900, statut: "En chantier", responsable: "Julien Roche", creeLe: "2026-09-09", aidesEstimees: 1200, priorite: "Basse", note: "Pose demain matin." },
  { id: "DV-2455", client: "Famille Girard", ville: "Sartrouville", type: "Pompe à chaleur air/eau", montant: 15600, statut: "Devis envoyé", responsable: "Inès Garnier", creeLe: "2026-09-05", aidesEstimees: 5600, priorite: "Normale", note: "Comparaison avec un concurrent en cours." },
  { id: "DV-2451", client: "Cabinet Delmas", ville: "Neuilly-sur-Seine", type: "Isolation par l'extérieur", montant: 38900, statut: "Signé", responsable: "Thomas Faure", creeLe: "2026-09-01", aidesEstimees: 9800, priorite: "Normale", note: "Démarrage prévu début novembre." },
];

export const statuts: Statut[] = ["À qualifier", "Devis envoyé", "Signé", "En chantier", "Terminé"];

/* Chiffre d'affaires signé et pipeline par mois, en euros */
export const evolutionMensuelle = [
  { mois: "Mai", signe: 182000, pipeline: 240000 },
  { mois: "Juin", signe: 205000, pipeline: 262000 },
  { mois: "Juil.", signe: 168000, pipeline: 251000 },
  { mois: "Août", signe: 121000, pipeline: 228000 },
  { mois: "Sept.", signe: 236000, pipeline: 305000 },
  { mois: "Oct.", signe: 254000, pipeline: 338000 },
];

export const kpis = [
  { label: "CA signé ce mois", value: 254000, format: "euro" as const, delta: 7.6, hint: "vs septembre" },
  { label: "Dossiers actifs", value: 47, format: "number" as const, delta: 12.0, hint: "vs septembre" },
  { label: "Taux de signature", value: 38, format: "percent" as const, delta: 3.1, hint: "points sur 90 jours" },
  { label: "Délai moyen devis", value: 4.2, format: "days" as const, delta: -18.0, hint: "plus rapide" },
];

export const activiteRecente = [
  { quand: "Il y a 12 min", quoi: "Devis DV-2481 ouvert par la Famille Lefèvre", type: "info" as const },
  { quand: "Il y a 1 h", quoi: "Acompte reçu sur DV-2479 (SCI Les Tilleuls)", type: "succes" as const },
  { quand: "Il y a 3 h", quoi: "Accord MaPrimeRénov' en attente depuis 21 jours sur DV-2465", type: "alerte" as const },
  { quand: "Hier", quoi: "Réception sans réserve sur DV-2468 (Boulangerie Martin)", type: "succes" as const },
];
