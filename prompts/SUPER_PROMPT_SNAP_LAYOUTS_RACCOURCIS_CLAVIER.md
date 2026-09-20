# SUPER PROMPT : LES SNAP LAYOUTS & RACCOURCIS CLAVIER NATIFS WINDOWS 11 (FLUENT WINDOW ANCHOR)
================================================================================
NOM DU MODULE : WINDOWS 11 SNAP LAYOUTS, ALT+TAB SWITCHER & GLOBAL KEYBOARD ENGINE (WSL-GKE)
SYSTÈME : WINDOWS 11 IA ÉDITION / ATELIER STUDIO Φ_SOI
OBJECTIF : ERGONOMIE NATIVE 100% FLUIDE, ANCRAGES AUTOMATIQUES MULTI-GRILLES & PRODUCTIVITÉ SANS SOURIS
INDICE D'EFFICACITÉ OPÉRATIONNELLE : INSTANTANÉITÉ RÉFLEXIVE (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Ingénieur Système Spécialiste de l'Ergonomie Windows et Architecte du Gestionnaire de Fenêtres pour Windows 11 IA Édition (Φ_SOI).
Ton mandat est d'implémenter l'infrastructure complète des RACCOURCIS CLAVIER SYSTÈME UNIVERSELS, DU SÉLECTEUR VISUEL ALT+TAB et DES SNAP LAYOUTS OFFICIELS WINDOWS 11.

Sur un vrai système d'exploitation Windows 11, un utilisateur expérimenté ne replace jamais ses fenêtres au pixel près manuellement : il utilise les réflexes musculaires universels du clavier et les gabarits d'ancrage rapide (Snap Layouts) au survol du bouton Agrandir.

Tu dois concevoir et implémenter de manière intégrale et modulaire les 3 piliers suivants :

================================================================================
I. LE MENU VOLANT OFFICIEL DES SNAP LAYOUTS (`WinSnapLayoutFlyout.tsx`)
================================================================================
1. DÉCLENCHEMENT AU SURVOL DU BOUTON AGRANDIR [□] :
   - Lorsqu'un utilisateur survole le bouton d'agrandissement [□] de n'importe quelle barre de titre de fenêtre (ou utilise le raccourci `Win + Z`) :
     * Un délai d'anticipation fluide (hover intent de 250 ms) ouvre le menu volant Acrylic semi-transparent juste en dessous du bouton.
     * Le menu se ferme instantanément si la souris quitte la zone ou si un gabarit est sélectionné.

2. LES 4 GABARITS D'ANCRAGE WINDOWS 11 AUTHENTIQUES :
   - Gabarit 1 : Bipartition 50 / 50 (Deux colonnes égales : moitié gauche ou moitié droite).
   - Gabarit 2 : Proportion Asymétrique 65 / 35 (Grande zone de travail à gauche, volet d'inspection/chat à droite).
   - Gabarit 3 : Tripartition 25 / 50 / 25 ou 50 / 25 / 25 (Trois colonnes d'outils simultanés).
   - Gabarit 4 : Les 4 Quadrants 2x2 (Haut-Gauche, Haut-Droite, Bas-Gauche, Bas-Droite).

3. INTERACTIVITÉ VISUELLE & ANCRAGE IMMÉDIAT :
   - Au survol d'une zone d'un gabarit dans le menu volant, la zone s'illumine en bleu cobalt Fluent (`bg-blue-500/40 border border-blue-400/80`).
   - Simultanément, une boîte fantôme (Ghost Window Preview) semi-transparente s'affiche sur le bureau pour montrer exactement où la fenêtre va se positionner.
   - Au clic : la fenêtre active s'anime avec une transition douce (`motion/react`) pour occuper la zone choisie au pixel près, en tenant compte de la hauteur de la barre des tâches en bas.

================================================================================
II. LE SÉLECTEUR VISUEL DE FENÊTRES ALT+TAB (`WinAltTabSwitcher.tsx`)
================================================================================
1. INTERCEPTION ET GESTION DE LA COMBINAISON `Alt + Tab` :
   - Écouteur clavier global : Interception sans accroc de la pression combinée `Alt + Tab` (et `Shift + Alt + Tab` pour reculer).
   - Tant que la touche `Alt` reste enfoncée :
     * Un overlay plein écran flouté (Backdrop Blur Mica sombre) apparaît au centre de l'écran.
     * Une rangée de cartes miniatures représentant toutes les fenêtres actuellement ouvertes s'affiche.
     * Chaque pression successive sur `Tab` déplace le cadre de sélection sur la fenêtre suivante.
   - Au relâchement de la touche `Alt` :
     * L'overlay disparaît immédiatement.
     * La fenêtre sélectionnée passe instantanément au premier plan absolu (`bringToFront`) et reçoit le focus actif.

2. CARTOUCHE DE PRÉVISUALISATION FLUENT :
   - Chaque carte affiche : l'icône de l'application, le titre de la fenêtre, et un aperçu miniature élégant (ou résumé visuel du module).
   - Bouton de fermeture rapide [✕] au survol de chaque vignette.

================================================================================
III. LE MOTEUR GLOBAL DE RACCOURCIS CLAVIER SYSTÈME (`GlobalKeyboardEngine.ts`)
================================================================================
Implémente un hook réactif `useGlobalKeyboardShortcuts` qui écoute au niveau de `window` avec `e.preventDefault()` ciblé pour empêcher les conflits avec le navigateur :

1. LES RACCOURCIS FONDAMENTAUX WINDOWS :
   - `Touche Windows` (ou `Ctrl + Échap`) : Ouvre / Ferme instantanément le menu Démarrer Windows 11.
   - `Win + D` : Minimise toutes les fenêtres pour afficher le bureau nu ; une seconde pression restaure les fenêtres exactement à leur état initial (Show Desktop toggle).
   - `Win + Flèche Gauche` : Ancre la fenêtre active sur la moitié gauche (50% largeur, 100% hauteur utile).
   - `Win + Flèche Droite` : Ancre la fenêtre active sur la moitié droite (50% largeur, 100% hauteur utile).
   - `Win + Flèche Haut` : Maximise la fenêtre active en plein écran ; si elle était minimisée, elle est restaurée.
   - `Win + Flèche Bas` : Si la fenêtre est maximisée, la restaure en taille normale ; si elle est normale, la minimise dans la barre des tâches.
   - `Win + Shift + Flèche Gauche / Droite` : Déplace la fenêtre active vers l'écran ou le quadrant adjacent.
   - `Win + Z` : Ouvre directement le menu volant des Snap Layouts au-dessus de la fenêtre active.
   - `Échap` : Ferme tout menu contextuel ouvert, menu volant Snap Layout, ou menu Démarrer.

================================================================================
IV. ADAPTATION DU GESTIONNAIRE DE FENÊTRES (`WindowManager.tsx` & `Windows11Desktop.tsx`)
================================================================================
1. CALCUL GÉOMÉTRIQUE EXACT DES ZONES D'ANCRAGE :
   - Définis les fonctions mathématiques pures de calcul des rectangles d'ancrage en tenant compte de la taille courante de l'écran (`window.innerWidth`, `window.innerHeight - TASKBAR_HEIGHT`) :
     * `getLeftHalfRect()` : `{ x: 0, y: 0, width: w / 2, height: h }`
     * `getRightHalfRect()` : `{ x: w / 2, y: 0, width: w / 2, height: h }`
     * `getQuadrantRect(corner)` : `{ x, y, width: w / 2, height: h / 2 }`
     * `getAsymmetricLeftRect()` : `{ x: 0, y: 0, width: w * 0.65, height: h }`
     * `getAsymmetricRightRect()` : `{ x: w * 0.65, y: 0, width: w * 0.35, height: h }`
2. Connecte ces géométries au gestionnaire de persistance pour que tout ancrage Snap Layout soit immédiatement mémorisé et restauré au prochain rechargement.

================================================================================
V. EXIGENCES DE FLUIDITÉ ET DE CRAFT
================================================================================
- Rendu visuel 60 FPS garanti grâce aux transitions `motion/react`.
- Pas de blocage du focus texte dans les éditeurs ou terminaux : si l'utilisateur tape dans l'éditeur de code, les raccourcis texte normaux continuent de fonctionner sans être interceptés à tort par le moteur global.
- Style visuel Windows 11 Fluent parfait : angles arrondis, reflets de lumière subtils, micro-animations au survol.

Implémente l'intégralité de ce système pour offrir la vraie sensation de contrôle tactile et réflexe d'un poste de travail Windows 11 professionnel.
```
