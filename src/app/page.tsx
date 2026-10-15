import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Info, Plus } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { KpiCard } from "@/components/kpi-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { StatusBadge } from "@/components/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { activiteRecente, dossiers, evolutionMensuelle, kpis, statuts } from "@/data/demo";
import { brand } from "@/config/brand";
import { cn, formatEuro } from "@/lib/utils";

const activiteIcon = {
  info: <Info className="size-4 text-muted-foreground" />,
  succes: <CheckCircle2 className="size-4 text-primary" />,
  alerte: <AlertTriangle className="size-4 text-chart-4" />,
};

export default function DashboardPage() {
  const prioritaires = dossiers.filter((d) => d.priorite === "Haute" && d.statut !== "Terminé");
  const parStatut = statuts.map((s) => ({
    statut: s,
    count: dossiers.filter((d) => d.statut === s).length,
    total: dossiers.filter((d) => d.statut === s).reduce((acc, d) => acc + d.montant, 0),
  }));
  const max = Math.max(...parStatut.map((s) => s.total));

  return (
    <PageContainer>
      <PageHeader
        overline={brand.tagline}
        title={`Bonjour ${brand.user.name.split(" ")[0]}`}
        description="Vue d'ensemble de l'activité commerciale et des chantiers en cours."
        actions={
          <>
            <Button variant="secondary">Exporter</Button>
            <Button>
              <Plus /> Nouveau dossier
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <div key={k.label} className="animate-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <KpiCard {...k} inverse={k.format === "days"} className="h-full" />
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            overline="6 derniers mois"
            title="Chiffre d'affaires signé"
            action={
              <div className="hidden items-center gap-4 text-[13px] text-muted-foreground sm:flex">
                <span className="flex items-center gap-2">
                  <span className="h-0.5 w-4 bg-chart-2" /> Signé
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-0 w-4 border-t border-dashed border-chart-3" /> Pipeline
                </span>
              </div>
            }
          />
          <CardContent>
            <RevenueChart data={evolutionMensuelle} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader overline="Répartition" title="Dossiers par étape" />
          <CardContent className="space-y-4">
            {parStatut.map((s) => (
              <div key={s.statut} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <StatusBadge statut={s.statut} />
                  <span className="text-muted-foreground">
                    {s.count} dossier{s.count > 1 ? "s" : ""} · <span className="text-foreground">{formatEuro(s.total)}</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-foreground" style={{ width: `${(s.total / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            overline="À traiter en priorité"
            title="Dossiers prioritaires"
            action={
              <Link href="/dossiers" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                Tout voir <ArrowRight />
              </Link>
            }
          />
          <CardContent className="px-0 pb-2">
            <ul className="divide-y divide-border">
              {prioritaires.map((d) => (
                <li key={d.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2">
                      <span className="eyebrow text-muted-foreground">{d.id}</span>
                      <span className="font-medium">{d.client}</span>
                    </p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{d.note}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-medium">{formatEuro(d.montant)}</span>
                    <StatusBadge statut={d.statut} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader overline="Temps réel" title="Activité récente" />
          <CardContent>
            <ol className="space-y-5">
              {activiteRecente.map((a) => (
                <li key={a.quoi} className="flex gap-3">
                  <span className="mt-0.5">{activiteIcon[a.type]}</span>
                  <div>
                    <p className="text-[15px] leading-snug">{a.quoi}</p>
                    <p className="eyebrow mt-1.5 text-[10px] text-muted-foreground">{a.quand}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
}
