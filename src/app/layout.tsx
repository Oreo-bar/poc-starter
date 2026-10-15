import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { brand } from "@/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.appName} | ${brand.clientName}`,
  description: `Démonstrateur ${brand.appName} pour ${brand.clientName}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
