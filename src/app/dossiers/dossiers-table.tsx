"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  X,
  MapPin,
  User,
  Calendar,
  Euro,
  HandCoins,
  Flag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { statuts, type Dossier, type Statut } from "@/data/demo";
import { cn, formatDate, formatEuro } from "@/lib/utils";

export function DossiersTable({ data }: { data: Dossier[] }) {
  const [query, setQuery] = useState("");
  const [filtre, setFiltre] = useState<Statut | "Tous">("Tous");
  const [selected, setSelected] = useState<Dossier | null>(null);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter(
      (d) =>
        (filtre === "Tous" || d.statut === filtre) &&
        (!q ||
          [d.id, d.client, d.ville, d.type, d.responsable].some((v) =>
            v.toLowerCase().includes(q),
          )),
    );
  }, [data, query, filtre]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un client, une ville..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["Tous", ...statuts] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFiltre(s)}
              className={cn(
                "rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors cursor-pointer",
                filtre === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-border bg-surface-muted/60">
                {[
                  "Réf.",
                  "Client",
                  "Prestation",
                  "Responsable",
                  "Montant",
                  "Statut",
                ].map((h) => (
                  <th
                    key={h}
                    className="eyebrow px-5 py-3 font-medium text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className="cursor-pointer transition-colors hover:bg-surface-muted/60"
                >
                  <td className="eyebrow px-5 py-4 text-muted-foreground">
                    {d.id}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{d.client}</p>
                    <p className="text-sm text-muted-foreground">{d.ville}</p>
                  </td>
                  <td className="px-5 py-4">{d.type}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {d.responsable}
                  </td>
                  <td className="px-5 py-4 font-medium">
                    {formatEuro(d.montant)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge statut={d.statut} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="px-5 py-16 text-center">
              <p className="text-lg">Aucun dossier ne correspond</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Essayez un autre terme ou retirez le filtre.
              </p>
            </div>
          )}
        </div>
        <div className="eyebrow border-t border-border px-5 py-3 text-muted-foreground">
          {rows.length} dossier{rows.length > 1 ? "s" : ""} ·{" "}
          {formatEuro(rows.reduce((a, d) => a + d.montant, 0))}
        </div>
      </Card>

      {/* Panneau latéral de détail, rendu à la racine du document */}
      {mounted &&
        createPortal(
          <>
            <div
              className={cn(
                "fixed inset-0 z-40 bg-foreground/30 transition-opacity",
                selected ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              onClick={() => setSelected(null)}
            />
            <aside
              className={cn(
                "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-xl transition-transform duration-300",
                selected ? "translate-x-0" : "translate-x-full",
              )}
              aria-hidden={!selected}
            >
              {selected && (
                <>
                  <div className="flex items-start justify-between border-b border-border px-6 py-5">
                    <div className="space-y-2">
                      <p className="eyebrow text-muted-foreground">
                        {selected.id}
                      </p>
                      <h2 className="text-2xl">{selected.client}</h2>
                      <StatusBadge statut={selected.statut} />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Fermer"
                      onClick={() => setSelected(null)}
                    >
                      <X />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                    <dl className="grid grid-cols-2 gap-4">
                      {[
                        {
                          icon: Euro,
                          label: "Montant",
                          value: formatEuro(selected.montant),
                        },
                        {
                          icon: HandCoins,
                          label: "Aides estimées",
                          value: formatEuro(selected.aidesEstimees),
                        },
                        { icon: MapPin, label: "Ville", value: selected.ville },
                        {
                          icon: User,
                          label: "Responsable",
                          value: selected.responsable,
                        },
                        {
                          icon: Calendar,
                          label: "Créé le",
                          value: formatDate(selected.creeLe),
                        },
                        {
                          icon: Flag,
                          label: "Priorité",
                          value: selected.priorite,
                        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div
                          key={label}
                          className="rounded-md border border-border bg-surface p-3"
                        >
                          <dt className="eyebrow flex items-center gap-1.5 text-muted-foreground">
                            <Icon className="size-3.5" /> {label}
                          </dt>
                          <dd className="mt-2 font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="space-y-2">
                      <p className="eyebrow text-muted-foreground">
                        Prestation
                      </p>
                      <p>{selected.type}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="eyebrow text-muted-foreground">
                        Dernière note
                      </p>
                      <p className="rounded-md bg-pastel-yellow p-4 leading-relaxed">
                        {selected.note}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="eyebrow text-muted-foreground">
                        Reste à charge client
                      </p>
                      <p className="text-3xl font-medium">
                        {formatEuro(selected.montant - selected.aidesEstimees)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 border-t border-border px-6 py-4">
                    <Button variant="secondary" className="flex-1">
                      Ajouter une note
                    </Button>
                    <Button className="flex-1">Relancer le client</Button>
                  </div>
                </>
              )}
            </aside>
          </>,
          document.body,
        )}
    </>
  );
}
