import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-md border border-border bg-surface", className)}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  overline,
  action,
  className,
}: {
  title: React.ReactNode;
  overline?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pt-5", className)}>
      <div className="space-y-2">
        {overline && <p className="eyebrow text-muted-foreground">{overline}</p>}
        <h3 className="text-lg">{title}</h3>
      </div>
      {action}
    </div>
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
