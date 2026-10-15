# POC Starter Galadrim

Ce repo sert de base à tous les POC clients. Chaque POC est une vraie app web, hébergée sur Vercel et montrée au client en rendez vous. L'objectif est l'effet "waouh" en 5 minutes de démo, pas l'exhaustivité.

@AGENTS.md

## Stack imposée

1. Next.js (App Router, `src/app`), TypeScript strict, React 19.
2. Tailwind CSS v4. Les couleurs viennent uniquement des tokens de `src/styles/theme.css` (classes `bg-primary`, `text-muted-foreground`, `bg-pastel-green`...). Jamais de couleur en dur dans les composants.
3. Composants maison dans `src/components/ui` (Button, Card, Badge, Input), inspirés de shadcn/ui. Les réutiliser avant d'en créer de nouveaux.
4. Icônes : `lucide-react` uniquement, `strokeWidth={1.75}`.
5. Graphiques : `recharts`, couleurs `var(--chart-1)` à `var(--chart-4)`.
6. IA : `@anthropic-ai/sdk` côté serveur uniquement (route handlers), avec une réponse simulée quand `ANTHROPIC_API_KEY` est absente pour que la démo marche toujours.
7. Pas de base de données par défaut : les données de démo vivent dans `src/data/`. Supabase seulement si le POC doit vraiment persister des données.

## Où modifier quoi

1. `src/styles/theme.css` : couleurs, rayon des angles. C'est le fichier à changer pour habiller le POC aux couleurs du client.
2. `src/config/brand.ts` : nom du client, nom de l'app, logo, utilisateur fictif, navigation.
3. `src/data/` : données de démo.
4. `src/app/` : une page par écran. Les pages restent des Server Components ; l'interactivité va dans un composant client à côté (`"use client"`), comme `dossiers-table.tsx`.

## Règles de qualité visuelle

1. Tout en français : interface, données, messages, formats (`formatEuro`, `formatDate` de `src/lib/utils.ts`).
2. Jamais de lorem ipsum. Données fausses mais crédibles : vocabulaire métier du client, noms et villes français, montants réalistes, dates récentes.
3. Chaque page commence par `PageContainer` + `PageHeader` (surtitre, titre, description, actions).
4. Hiérarchie : surtitres en classe `eyebrow` (mono, capitales), titres en medium, beaucoup d'air, filets fins. Pas d'ombres lourdes, pas de dégradés criards, pas d'emoji.
5. Une seule couleur d'accent par écran (`primary`). Les pastels servent aux badges et aux fonds, jamais au texte.
6. Soigner les états : vide, chargement, survol, focus. Animations légères (`animate-in-up`, transitions de 200 à 300 ms).
7. Responsive obligatoire : tester à 390 px de large (mobile) et 1440 px (desktop).
8. Les boutons qui ne sont pas branchés doivent quand même avoir l'air cliquables ; l'important est le parcours de démo.

## Méthode de travail

1. Commencer par lire le brief du POC (fichier `docs/BRIEF.md` s'il existe, sinon le message).
2. Adapter d'abord `theme.css` et `brand.ts`, puis les données, puis les écrans.
3. Supprimer les écrans d'exemple qui ne servent pas le parcours de démo.
4. Avant de rendre la main : `npm run lint`, `npm run build`, puis lancer `npm run dev` et vérifier chaque écran dans le navigateur, en desktop et en mobile.
5. Commits courts et explicites en français.
