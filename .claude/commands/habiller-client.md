---
description: Applique l'identité visuelle d'un client (site web, logo ou couleurs)
---

Applique l'identité visuelle du client à partir de : $ARGUMENTS

1. Si c'est une URL, récupère la page et repère la couleur principale, les couleurs secondaires et le style général (sobre, premium, coloré...). Si c'est une image ou un logo, extrais en la palette.
2. Mets à jour uniquement `src/styles/theme.css` (et le logo dans `src/config/brand.ts` si un fichier est fourni dans `public/`). Garde des fonds clairs et lisibles ; la couleur du client sert d'accent (`primary`) et éventuellement de barre latérale (`sidebar`).
3. Vérifie le contraste du texte sur `primary` et sur `sidebar`, puis contrôle le rendu de chaque écran dans le navigateur.
4. Résume les couleurs retenues en une ligne chacune.
