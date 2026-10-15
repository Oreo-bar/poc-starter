"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatEuro } from "@/lib/utils";

type Point = { mois: string; signe: number; pipeline: number };

const axisStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fill: "var(--muted-foreground)",
};

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-sm border border-border bg-surface px-3 py-2 text-sm">
      <p className="eyebrow mb-2 text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          {p.name === "signe" ? "Signé" : "Pipeline"} : <strong className="font-medium">{formatEuro(p.value)}</strong>
        </p>
      ))}
    </div>
  );
}

export function RevenueChart({ data }: { data: Point[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fill-signe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="mois" tickLine={false} axisLine={false} tick={axisStyle} dy={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={axisStyle}
            width={56}
            tickFormatter={(v: number) => `${Math.round(v / 1000)} k€`}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border)" }} />
          <Area
            type="monotone"
            dataKey="pipeline"
            stroke="var(--chart-3)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            fill="none"
          />
          <Area
            type="monotone"
            dataKey="signe"
            stroke="var(--chart-2)"
            strokeWidth={2}
            fill="url(#fill-signe)"
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
