---
description: Construit un nouveau POC client à partir de docs/BRIEF.md
---

Construis le POC décrit dans `docs/BRIEF.md` (et dans ces précisions éventuelles : $ARGUMENTS), en respectant strictement `CLAUDE.md`.

Étapes :

1. Lis le brief en entier. S'il manque une information indispensable au parcours de démo, pose moi au maximum 3 questions avant de coder. Sinon, fais des hypothèses raisonnables et liste les.
2. Habille l'application : couleurs dans `src/styles/theme.css` (contraste suffisant pour le texte sur `primary`), puis `src/config/brand.ts` (nom du client, de l'app, logo si présent dans `public/`, utilisateur fictif crédible, navigation).
3. Remplace `src/data/demo.ts` par des données du métier du client : réalistes, en français, en volume crédible.
4. Construis les écrans du parcours de démo, en réutilisant les composants existants. Supprime les écrans d'exemple inutiles. Si le brief prévoit de l'IA, adapte `src/app/api/assistant/route.ts` (prompt système et réponses simulées) au métier du client.
5. Soigne le moment "waouh" du parcours : c'est l'écran qui doit être le plus abouti.
6. Vérifie : `npm run lint`, `npm run build`, puis lance le serveur et contrôle chaque écran en 1440 px et 390 px de large. Corrige tout débordement, texte coupé ou incohérence.
7. Fais un commit, puis résume en quelques lignes : les écrans livrés, le parcours de démo conseillé et les hypothèses prises.
