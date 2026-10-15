import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-[10.5px] font-medium uppercase leading-none tracking-wide text-foreground",
  {
    variants: {
      tone: {
        neutral: "bg-surface-muted",
        green: "bg-pastel-green",
        blue: "bg-pastel-blue",
        violet: "bg-pastel-violet",
        orange: "bg-pastel-orange",
        red: "bg-pastel-red",
        yellow: "bg-pastel-yellow",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
