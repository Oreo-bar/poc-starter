import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatEuro, formatNumber } from "@/lib/utils";

type Format = "euro" | "number" | "percent" | "days";

function display(value: number, format: Format) {
  switch (format) {
    case "euro":
      return formatEuro(value);
    case "percent":
      return `${formatNumber(value)} %`;
    case "days":
      return `${formatNumber(value)} j`;
    default:
      return formatNumber(value);
  }
}

export function KpiCard({
  label,
  value,
  format,
  delta,
  hint,
  inverse = false,
  className,
}: {
  label: string;
  value: number;
  format: Format;
  delta?: number;
  hint?: string;
  /** true si une baisse est une bonne nouvelle (délais, coûts...) */
  inverse?: boolean;
  className?: string;
}) {
  const positive = delta !== undefined && (inverse ? delta < 0 : delta > 0);
  const Arrow = delta !== undefined && delta < 0 ? ArrowDownRight : ArrowUpRight;

  return (
    <Card className={cn("flex flex-col justify-between gap-6 p-5", className)}>
      <p className="eyebrow text-muted-foreground">{label}</p>
      <div className="space-y-2">
        <p className="text-[34px] font-medium leading-none tracking-tight">{display(value, format)}</p>
        {delta !== undefined && (
          <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-sm px-1.5 py-0.5 font-medium text-foreground",
                positive ? "bg-pastel-green" : "bg-pastel-red",
              )}
            >
              <Arrow className="size-3.5" />
              {Math.abs(delta).toLocaleString("fr-FR")} %
            </span>
            {hint}
          </p>
        )}
      </div>
    </Card>
  );
}
