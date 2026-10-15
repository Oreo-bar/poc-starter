import * as React from "react";

export function PageHeader({
  overline,
  title,
  description,
  actions,
}: {
  overline?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-dashed border-foreground/20 pb-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-3">
        {overline && <p className="eyebrow text-muted-foreground">[{overline}]</p>}
        <h1 className="text-[32px] md:text-[40px]">{title}</h1>
        {description && (
          <p className="max-w-2xl text-[16px] text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1280px] space-y-8 px-4 py-8 md:px-8 md:py-10">{children}</div>;
}
