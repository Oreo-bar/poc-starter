"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navigation } from "@/config/brand";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      {brand.logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={brand.logoSrc} alt={brand.clientName} className="h-8 w-auto" />
      ) : (
        <span className="grid size-9 place-items-center rounded-sm bg-primary font-mono text-[13px] font-medium text-primary-foreground">
          {brand.monogram}
        </span>
      )}
      <div className="leading-tight">
        <p className="text-[15px] font-medium text-sidebar-foreground">{brand.appName}</p>
        <p className="eyebrow mt-1 text-[10px] text-sidebar-muted">{brand.clientName}</p>
      </div>
    </div>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {navigation.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-sm px-3 py-2.5 text-[15px] transition-colors",
              active
                ? "bg-sidebar-active text-sidebar-foreground"
                : "text-sidebar-muted hover:bg-sidebar-active hover:text-sidebar-foreground",
            )}
          >
            <Icon className={cn("size-[18px]", active && "text-primary")} strokeWidth={1.75} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserBlock() {
  const initials = brand.user.name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <div className="flex items-center gap-3 border-t border-white/10 pt-4">
      <span className="grid size-9 place-items-center rounded-full bg-pastel-orange text-sm font-medium text-foreground">
        {initials}
      </span>
      <div className="leading-tight">
        <p className="text-sm text-sidebar-foreground">{brand.user.name}</p>
        <p className="mt-0.5 text-xs text-sidebar-muted">{brand.user.role}</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[260px_1fr]">
      {/* Barre latérale desktop */}
      <aside className="sticky top-0 hidden h-dvh flex-col justify-between bg-sidebar px-4 py-6 lg:flex">
        <div className="space-y-10">
          <div className="px-2">
            <Logo />
          </div>
          <NavLinks />
        </div>
        <UserBlock />
      </aside>

      {/* Barre supérieure mobile */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-sidebar px-4 py-3 lg:hidden">
        <Logo />
        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center text-sidebar-foreground"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>
      {open && (
        <div className="fixed inset-x-0 top-[64px] bottom-0 z-20 flex flex-col justify-between bg-sidebar px-4 pb-6 pt-2 lg:hidden">
          <NavLinks onNavigate={() => setOpen(false)} />
          <UserBlock />
        </div>
      )}

      <main className="min-w-0">{children}</main>
    </div>
  );
}
