# POC Starter

Base de départ pour produire des POC clients beaux et hébergés, avec Claude Code.

Exemple fourni : "Pilotage chantiers" pour un client fictif de rénovation énergétique, avec un tableau de bord, une liste de dossiers filtrable avec panneau de détail, et un assistant IA en streaming.

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

Pour activer la vraie IA, copier `.env.example` en `.env.local` et renseigner `ANTHROPIC_API_KEY`. Sans clé, l'assistant renvoie des réponses simulées réalistes : la démo fonctionne toujours.

## Créer un nouveau POC

1. Sur GitHub, ouvrir ce repo puis "Use this template" pour créer `poc-nom-du-client`.
2. Cloner le nouveau repo et l'ouvrir dans VS Code.
3. Remplir `docs/BRIEF.md` à partir de `docs/PROMPT_POC.md`.
4. Dans Claude Code, taper `/nouveau-poc` : Claude lit le brief, habille l'app aux couleurs du client et construit les écrans.
5. Vérifier sur http://localhost:3000, corriger au fil de l'eau.

## Mettre en ligne sur Vercel

1. Sur vercel.com, "Add New Project" puis importer le repo GitHub. Aucun réglage nécessaire.
2. Si le POC utilise l'IA : ajouter `ANTHROPIC_API_KEY` dans Settings, Environment Variables.
3. Chaque `git push` met le site à jour. Chaque branche a sa propre URL de preview.
4. Astuce : renommer le domaine en `nom-du-client-galadrim.vercel.app` dans Settings, Domains.

## Structure

```
src/
  styles/theme.css     couleurs et formes (habillage client)
  config/brand.ts      nom du client, de l'app, logo, navigation
  data/                données de démo
  components/ui/       Button, Card, Badge, Input
  components/layout/   barre latérale, en têtes de page
  app/                 une page par écran
  app/api/assistant/   route IA (Claude, avec mode simulé)
docs/PROMPT_POC.md     modèle de brief
.claude/commands/      commandes Claude Code (/nouveau-poc, /habiller-client, /verifier)
CLAUDE.md              règles lues automatiquement par Claude Code
```
