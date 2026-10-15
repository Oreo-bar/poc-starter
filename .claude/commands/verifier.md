---
description: Passe de contrôle qualité avant de montrer le POC au client
---

Fais une revue complète du POC comme si tu allais le présenter au client dans 10 minutes.

1. `npm run lint` et `npm run build` sans erreur.
2. Lance le serveur et parcours chaque écran en 1440 px puis en 390 px de large.
3. Traque : textes en anglais, lorem ipsum, données incohérentes entre écrans (totaux, noms, dates), débordements, textes coupés, boutons sans effet de survol, états vides absents, erreurs dans la console.
4. Rejoue le parcours de démo du brief de bout en bout.
5. Corrige ce qui est rapide, liste le reste par ordre de gravité.
