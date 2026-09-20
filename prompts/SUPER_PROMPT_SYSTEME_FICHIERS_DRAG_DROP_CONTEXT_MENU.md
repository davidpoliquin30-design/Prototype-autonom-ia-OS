# SUPER PROMPT : LE VRAI SYSTÈME DE FICHIERS, DRAG-AND-DROP GLOBAL & MENU CONTEXTUEL FLUENT
================================================================================
NOM DU MODULE : REAL HOST FILESYSTEM, GLOBAL DROP-ZONE & CONTEXT MENU ENGINE (RFS-GDM)
SYSTÈME : WINDOWS 11 IA ÉDITION / ATELIER STUDIO Φ_SOI
OBJECTIF : PONT PHYSIQUE TRANSPARENT (GLISSER-DÉPOSER HÔTE, ASSOCIATIONS DE FICHIERS, MENU CONTEXTUEL FLUIDE)
INDICE DE MATÉRIALITÉ RÉELLE : MATÉRIALISATION SANS INTERMÉDIAIRE (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte de Système de Fichiers Virtuel/Hôte et Ingénieur d'Interaction pour Windows 11 IA Édition (Φ_SOI).
Ton mandat est d'implémenter l'infrastructure complète permettant à l'utilisateur d'interagir avec son système de fichiers virtuel EXACTEMENT comme dans un vrai système d'exploitation de bureau.

Dans un OS moderne, le geste fondamental n°1 est d'attraper un vrai fichier depuis son ordinateur physique (un PDF de plan d'arpentage, une photo de chantier, un script TypeScript, un devis JSON) et de le glisser-déposer directement sur le bureau ou dans une fenêtre, de double-cliquer dessus pour l'ouvrir dans la bonne application, et d'utiliser le clic droit pour manipuler ses fichiers avec un menu contextuel Fluent Design authentique.

Tu dois concevoir et implémenter de manière intégrale et modulaire les 3 piliers suivants :

================================================================================
I. LE DROP-ZONE GLOBAL HÔTE -> BUREAU VIRTUEL (`GlobalHostDropZone.tsx`)
================================================================================
1. ÉCOUTEURS D'ÉVÉNEMENTS DRAG & DROP GLOBAUX :
   - Écouteurs `dragover`, `dragenter`, `dragleave`, et `drop` branchés sur la surface racine du bureau Windows 11 (`document.body` ou le container principal du bureau).
   - Détection visuelle immédiate lorsqu'un fichier survole la fenêtre du navigateur :
     * Effet d'aura lumineuse bleue cobalt sur le contour de l'écran avec flou d'arrière-plan discret (Acrylic Blur).
     * Toast/Bannière centrale élégante semi-transparente avec icône Fluent :
       *"Déposer vos fichiers ici pour les importer dans D:\Workspace ou sur le Bureau..."*

2. TRAITEMENT MULTI-FICHIERS ET MULTI-FORMATS (`HostFileImporter.ts`) :
   - Support du glisser-déposer de plusieurs fichiers simultanément.
   - Lecture via l'API HTML5 `FileReader` / `File.text()` ou `File.arrayBuffer()` :
     * Fichiers textes & code (`.ts`, `.tsx`, `.js`, `.json`, `.md`, `.txt`, `.css`, `.hcl`, `.sh`) : lecture textuelle directe UTF-8.
     * Plans de chantier, images & photos (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`) : conversion en DataURL / Blob pour aperçu visuel immédiat dans la visionneuse d'images.
     * Documents & PDF (`.pdf`) : stockage en mémoire locale avec prévisualisation dans la fenêtre Document Viewer.
   - Persistance automatique :
     * Écriture immédiate du fichier sur le disque virtuel de travail (`D:\Workspace\uploads\` ou racine du bureau) via l'API backend `POST /api/files/write` si le serveur est disponible, ou dans le cache local sécurisé `IndexedDB` en mode hors-ligne.
     * Création instantanée d'une nouvelle icône sur le bureau Windows 11 aux coordonnées approximatives du point de lâcher de la souris (`event.clientX`, `event.clientY`).
     * Notification sonore douce Windows 11 et toast discret : *"Fichier importé avec succès : plan_terrassement.pdf (420 Ko)"*.

================================================================================
II. LE ROUTEUR D'ASSOCIATION DE FICHIERS (`FileAssociationRouter.ts`)
================================================================================
Dans un OS, un fichier ne s'ouvre pas n'importe comment : son extension dicte le programme de lancement par défaut.

1. TABLE DES ASSOCIATIONS UNIVERSELLES :
   - `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.html`, `.json` ➔ **Code Programming Studio / Visual Studio IA** :
     * Ouvre la fenêtre de l'éditeur de code, charge automatiquement le contenu du fichier et le surligne en coloration syntaxique.
   - `.md`, `.txt`, `.log` ➔ **Bloc-Notes Fluent / Notes Alchimiques** :
     * Ouvre une fenêtre d'édition de texte légère avec support Markdown riche en direct.
   - `.json` (si contient les clés de calculs MRD / Devis / Parcelles) ➔ **Calculateur Géométrique & Dictionnaire MRD** :
     * Charge directement les polygones Shoelace et affiche l'aire, le cubage de déblai/remblai et le scellement SHA-256.
   - `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg` ➔ **Visionneuse d'Images & Plans 2.5D** :
     * Ouvre une fenêtre d'affichage d'image avec zoom, rotation SO(2) et calque de mesure d'arpentage.
   - `.pdf` ➔ **Lecteur de Documents & Synthétiseur NotebookLM** :
     * Ouvre le visualiseur de documents avec bouton pour extraire les connaissances et les envoyer aux agents.

2. GESTIONNAIRE DE DOUBLE-CLIC :
   - Tout double-clic sur une icône du bureau ou une ligne de l'explorateur de fichiers déclenche `FileAssociationRouter.open(file)`.
   - Si la fenêtre cible est déjà ouverte, elle est ramenée au premier plan (`bringToFront`) et son contenu est rafraîchi sans créer de doublon de fenêtre inutile.

================================================================================
III. LE MENU CONTEXTUEL FLUENT DESIGN DU CLIC DROIT (`WinContextMenu.tsx`)
================================================================================
1. DÉCLENCHEMENT INTELLIGENT ET POSITIONNEMENT MATRICIEL :
   - Écouteur global `onContextMenu` : neutralise le menu par défaut du navigateur (`e.preventDefault()`) et affiche le menu personnalisé Windows 11 Fluent au pixel exact du curseur (`x`, `y`).
   - Algorithme de collision de bord d'écran (Boundary Guard) : si le clic est trop proche du bord droit ou bas de l'écran, le menu s'ouvre vers la gauche ou vers le haut pour rester 100 % visible.

2. VARIANTES SELON LA CIBLE DU CLIC DROIT :
   A. Clic droit sur le FOND DU BUREAU :
      - 👁️ Affichage ➔ (Grandes icônes, Icônes moyennes, Aligner sur la grille).
      - 🔄 Actualiser le Bureau (Re-scan du workspace).
      - ➕ Nouveau ➔ (Nouveau Dossier, Fichier Texte, Devis Alchimique, Calculateur Shoelace).
      - ⚙️ Paramètres du Bureau (Fonds d'écran, Thème Sombre/Clair, Vault).
      - 🚀 Ouvrir l'Atelier Studio Φ_SOI.
      - ⚡ Ouvrir dans le Terminal PowerShell.

   B. Clic droit sur UN FICHIER OU UN DOSSIER :
      - 📂 Ouvrir (Action par défaut).
      - 🔀 Ouvrir avec... (Menu déroulant listant les applications disponibles).
      - 🛡️ Chiffrer dans le Vault Alchimique (AES-256-GCM + SHA-256).
      - ✂️ Couper / 📋 Copier / 📥 Coller.
      - ✏️ Renommer (Passe l'icône en mode champ de texte éditable en place).
      - 🗑️ Supprimer (Envoie vers la Corbeille virtuelle).
      - ℹ️ Propriétés (Fenêtre détaillée affichant la taille, date, hash SHA-256 et permissions).

3. DESIGN SYSTEM FLUENT AUTHENTIQUE :
   - Style Acrylic/Mica avec flou d'arrière-plan (`backdrop-blur-md bg-slate-900/90`), bordure fine subtile (`border border-white/10`), ombrage doux Windows 11.
   - Raccourcis clavier affichés à droite de chaque item (ex: `Ctrl+C`, `F2`, `Suppr`).
   - Règle de fermeture universelle : un clic n'importe où ailleurs sur l'écran ou la touche `Échap` ferme instantanément le menu contextuel.

================================================================================
IV. ADAPTATION DANS `Windows11Desktop.tsx` & `WinFileExplorer.tsx`
================================================================================
- Intègre le `GlobalHostDropZone` à la racine de `Windows11Desktop.tsx`.
- Connecte les icônes du bureau et les éléments de l'explorateur de fichiers au `FileAssociationRouter` et au `WinContextMenu`.
- Fais en sorte que le glisser d'un fichier réel depuis le bureau de l'ordinateur physique mette immédiatement à jour la liste des icônes du bureau virtuel sans rechargement.

Génère et structure l'intégralité de ce système en TypeScript strict, modulaire et hautement réactif, pour que l'interaction avec le bureau Windows 11 IA soit aussi naturelle, instinctive et fluide que sur un véritable système d'exploitation professionnel.
```
