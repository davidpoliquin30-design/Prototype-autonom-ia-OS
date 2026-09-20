# SUPER PROMPT : L'EXPÉRIENCE COMPLÈTE DU BUREAU WINDOWS 11 FLUENT (W11-OS-NATIVE)
================================================================================
NOM DU MODULE : WINDOWS 11 COMPLETE DESKTOP, EXPLORER, FILE DRAG-AND-DROP & SYSTEM UI
SYSTÈME : WINDOWS 11 IA ÉDITION / ATELIER STUDIO Φ_SOI
OBJECTIF : ERGONOMIE 100% AUTHENTIQUE WINDOWS 11 (ICÔNES LIBRES, EXPLORATEUR COMPLET, SYSTRAY, MENUS & RACCOURCIS)
INDICE DE RÉALITÉ ERGONOMIQUE : FIDÉLITÉ PHYSIQUE ET SENSORIELLE (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte en Chef de l'Expérience Utilisateur (UI/UX), Spécialiste du Design System Microsoft Fluent Design (Mica, Acrylic, Reveal Highlights) et Ingénieur Frontend React/TypeScript pour Windows 11 IA Édition (Φ_SOI).

Ton mandat absolu est d'implémenter l'INFRASTRUCTURE COMPLÈTE ET AUTHENTIQUE DE L'EXPÉRIENCE DU BUREAU WINDOWS 11 avec toutes ses options natives.

L'utilisateur ne doit pas se sentir dans un simple site web, mais dans un VRAI SYSTÈME D'EXPLOITATION WINDOWS 11 : pouvoir glisser ses documents librement sur la grille du bureau, ranger ses fichiers dans des dossiers via un Explorateur de Fichiers complet, ouvrir les menus contextuels officiels au clic droit, utiliser la barre des tâches centrée avec ses pastilles d'applications actives et gérer son centre de contrôle (Wi-Fi, Son, Luminosité, Batterie).

Tu dois concevoir et implémenter de manière intégrale et modulaire les 6 piliers suivants :

================================================================================
I. LE BUREAU WINDOWS 11 LIBRE & GRILLE MAGNÉTIQUE (`Win11DesktopCanvas.tsx`)
================================================================================
1. DISPOSITION LIBRE ET DÉPLACEMENT DES ICÔNES PAR GLISSER-DÉPOSER :
   - Grille magnétique invisible paramétrable (snap-to-grid de 80x90 px) ou positionnement pixel libre.
   - Sélection multiple par boîte élastique (Marquee selection rectangle bleu translucide au clic-glisser sur le fond du bureau).
   - Déplacement libre d'un ou plusieurs fichiers/dossiers par glisser-déposer (`drag & drop`).
   - Mémorisation instantanée des coordonnées `(x, y)` de chaque icône dans `localStorage` / `IndexedDB` pour retrouver le bureau exactement dans le même état après rechargement.

2. LE FOND D'ÉCRAN FLUENT DYNAMIQUE (Bloom Wallpaper) :
   - Fond d'écran officiel Windows 11 Bloom (sombre ou clair) avec effet de parallaxe discret au mouvement de la souris.
   - Menu Clic Droit sur le bureau : `[ Affichage ]`, `[ Trier par (Nom, Date, Type, Taille) ]`, `[ Actualiser ]`, `[ Nouveau (Dossier, Document texte, Raccourci) ]`, `[ Paramètres d'affichage ]`, `[ Personnaliser (Fonds d'écran) ]`.

================================================================================
II. L'EXPLORATEUR DE FICHIERS OFFICIEL (`Win11FileExplorer.tsx`)
================================================================================
1. STRUCTURE COMPLÈTE À ONGLETS & ARBORESCENCE :
   - Barre de titre avec onglets multiples (ex: `[📁 Ce PC]`, `[📁 Documents]`, `[📁 Images]`, `[+]`).
   - Ruban de commandes supérieur Fluent :
     * Boutons : `[ ➕ Nouveau ]`, `[ ✂️ Couper ]`, `[ 📋 Copier ]`, `[ 🔗 Coller ]`, `[ 🏷️ Renommer ]`, `[ 🗑️ Supprimer ]`, `[ 👁️ Affichage ]`.
   - Volet de navigation latéral gauche :
     * Accès rapide (Bureau, Téléchargements, Documents, Images, Projets).
     * Ce PC (Disque Local C:, Espace Workspace D:, Coffre Chiffré Vault:).
   - Fil d'Ariane interactif (Breadcrumb) en haut : `Ce PC > Documents > Projets_IA`.
   - Barre de recherche contextuelle en temps réel.

2. INTERACTIONS AVANCÉES SUR LES FICHIERS :
   - Glisser-déposer d'un fichier du bureau VERS un dossier de l'Explorateur et vice-versa.
   - Double-clic sur n'importe quel fichier pour l'ouvrir dans son application dédiée :
     * `.ts`, `.tsx`, `.js`, `.json`, `.css` $\rightarrow$ Éditeur de Code Pro avec coloration syntaxique.
     * `.png`, `.jpg`, `.svg` $\rightarrow$ Visionneuse d'Images Windows 11.
     * `.md`, `.txt` $\rightarrow$ Bloc-notes Windows 11 (Notepad) ou visualiseur Markdown.
     * `.pdf` $\rightarrow$ Lecteur de documents.
   - Panneau de prévisualisation rétractable à droite (Inspection des métadonnées, taille, date et hash SHA-256).

================================================================================
III. LA BARRE DES TÂCHES CENTRÉE & SYSTRAY (`Win11Taskbar.tsx`)
================================================================================
1. ZONE DES ICÔNES CENTRÉES FLUENT DESIGN :
   - Bouton Démarrer (Logo Windows 11 avec effet de survol lumineux).
   - Champ de Recherche Windows ("Tapez ici pour rechercher...").
   - Icône Vue des Tâches (Task View / Bureaux virtuels).
   - Icône Widget / Météo en direct à gauche.
   - Applications épinglées et actives avec pastille lumineuse bleue sous l'icône :
     * Un clic sur l'icône active : minimise / restaure la fenêtre.
     * Survol de l'icône : affichage d'une vignette miniature de prévisualisation au-dessus de la barre des tâches avec bouton de fermeture rapide [✕].

2. ZONE DE NOTIFICATION (SYSTRAY) À DROITE :
   - Horloge et Date Windows 11 (au clic : calendrier déroulant complet).
   - Cartouche réseau / son / batterie regroupée (au clic : ouverture du Centre de Contrôle Rapide).
   - Icône du Coeur Synaptique (Heartbeat Proactif $\Phi_{\text{SOI}}$ avec voyant de pulsation).
   - Bouton "Afficher le Bureau" tout à droite (bande verticale fine de 5px pour tout minimiser).

================================================================================
IV. LE CENTRE DE CONTRÔLE RAPIDE (`Win11QuickSettings.tsx`)
================================================================================
Panneau volant acrylique avec coins arrondis s'ouvrant au-dessus du Systray :
- Boutons bascules rapides :
  * 📶 Wi-Fi / Réseau (Connecté au Gateway local).
  * 🔵 Bluetooth / Appairage matériel.
  * 🌙 Mode Sombre / Mode Clair.
  * 🔋 Économiseur d'énergie / Profil Performance GPU.
  * 🛡️ Sécurité & Coffre Vault (Chiffrement actif).
  * 🤖 Autonomie Proactive (Heartbeat Actif / En veille).
- Curseurs coulissants interactifs :
  * 🔊 Volume audio principal avec retour sonore.
  * ☀️ Luminosité de l'écran avec filtre anti-lumière bleue.

================================================================================
V. LE MENU DÉMARRER OFFICIEL WINDOWS 11 (`Win11StartMenu.tsx`)
================================================================================
- Menu centré flottant avec fond acrylique flouté :
  * Barre de recherche globale (recherche simultanée dans les fichiers, les applications et les commandes d'agents).
  * Section "Épinglé" : Grille d'icônes des applications (Éditeur de Code, Terminal, Explorateur, Télémétrie, Copilot, Sandbox, Paramètres).
  * Section "Recommandé" : Fichiers et artefacts récemment créés ou modifiés par l'IA avec horodatage relatif (*« Il y a 5 min »*).
  * Profil utilisateur en bas avec avatar, nom de l'artisan et bouton d'alimentation (Arrêter, Redémarrer le noyau, Verrouiller).

================================================================================
VI. LE MENU CONTEXTUEL CLIC DROIT FLUENT (`Win11ContextMenu.tsx`)
================================================================================
- Mini-barre d'outils d'actions rapides en haut du menu : `[ ✂️ ] [ 📋 ] [ 🏷️ ] [ 🗑️ ]`.
- Actions textuelles selon la cible sélectionnée (Bureau, Fichier, Dossier, Barre des tâches) :
  * `Ouvrir` / `Ouvrir avec...`
  * `Épingler à la barre des tâches` / `Épingler au menu Démarrer`
  * `Chiffrer dans le Vault (AES-256-GCM)`
  * `Calculer l'empreinte SHA-256`
  * `Auditer avec l'agent @transducer_ast`
  * `Propriétés` (Fenêtre modale avec taille exacte, dates, permissions).

================================================================================
VII. EXIGENCES DE LIVRAISON ET DE CRAFT
================================================================================
- Respect absolu de la charte graphique Windows 11 Fluent Design : bordures subtiles (`border-white/10`), coins arrondis `rounded-xl`, ombres douces `shadow-2xl`, transitions `motion/react` à 60 FPS.
- TypeScript 100% strict, code modulaire et persistance complète des positions et états dans `IndexedDB` / `localStorage`.
- Gestion native des raccourcis clavier (`Ctrl+C`, `Ctrl+V`, `Suppr`, `F2` pour renommer, `Alt+Entrée` pour propriétés).

Génère et structure l'intégralité de ce bureau Windows 11 natif pour offrir l'environnement de travail le plus immersif, fluide et complet jamais conçu dans un navigateur (Ξ ≡ 1).
```
