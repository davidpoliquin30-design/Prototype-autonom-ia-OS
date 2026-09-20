# SUPER PROMPT : PERSISTANCE TOTALE D'ÉTAT DU BUREAU WINDOWS 11 IA (SESSION RESTORE & WORKSPACE RESILIENCE)
================================================================================
NOM DU PROTOCOLE : PERSISTENT DESKTOP HYDRATOR (PDH-Φ) / RESILIENT SESSION VAULT
CIBLE : WINDOWS 11 IA ÉDITION / ATELIER STUDIO / REACT 18+ / TYPESCRIPT STRICT
OBJECTIF : RESTAURATION SPATIALE, DIMENSIONNELLE ET CONTEXTUELLE 100% TRANSPARENTE
INDICE DE RÉALITÉ PHYSIQUE : CONTINUITÉ D'ÉTAT ABSOLUE (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte de Persistance d'OS et Ingénieur Système du Noyau Windows 11 IA Édition (Φ_SOI).
Ton mandat est d'implémenter l'infrastructure complète de PERSISTANCE D'ÉTAT ET DE RESTAURATION DE SESSION (Session Restore & Desktop State Hydration).

Actuellement, lorsqu'un utilisateur rafraîchit son navigateur, ferme son onglet ou redémarre sa machine, ses fenêtres ouvertes, leurs coordonnées précises (X, Y), leurs dimensions (W, H), leur z-index, leurs onglets de terminal et les fichiers en cours d'édition sont réinitialisés.

Tu dois éradiquer cette perte de contexte en créant un moteur de persistance locale automatique, ultra-performant, sans saccade visuelle et sans blocage du thread UI.
Le lendemain matin, dès que l'utilisateur réouvre son application, son bureau Windows 11 IA doit réapparaître EXACTEMENT à l'identique de la veille.

================================================================================
I. LE MODÈLE DE DONNÉES DE SESSION (`DesktopSessionTypes.ts`)
================================================================================
Définis une structure de données typée et inviolable pour modéliser l'intégralité du bureau :

```typescript
export interface WindowStateRecord {
  id: string;                          // Identifiant unique de la fenêtre (ex: 'win-editor', 'win-terminal')
  appId: string;                       // Type d'application (ex: 'editor', 'terminal', 'explorer', 'telemetry', 'dictionary', 'studio')
  title: string;                       // Titre actuel affiché dans la barre de titre
  isOpen: boolean;                     // État d'ouverture
  isMinimized: boolean;                // Minimisée dans la barre des tâches
  isMaximized: boolean;                // Mode plein écran / maximisé
  x: number;                           // Coordonnée horizontale sur le bureau (px)
  y: number;                           // Coordonnée verticale sur le bureau (px)
  width: number;                       // Largeur de la fenêtre (px)
  height: number;                      // Hauteur de la fenêtre (px)
  zIndex: number;                      // Ordre de superposition (au premier plan)
  lastFocusedTimestamp: number;        // Horodatage du dernier focus utilisateur
  // Contexte applicatif interne persisté :
  internalState?: {
    activeFilePath?: string;           // Fichier en cours d'édition dans le code studio
    cursorPosition?: { line: number; ch: number };
    terminalHistory?: string[];        // Commandes tapées dans le terminal PowerShell
    terminalCurrentDir?: string;       // Répertoire courant (ex: 'D:\\Workspace\\src')
    explorerCurrentPath?: string;      // Dossier parcouru dans l'explorateur de fichiers
    activeSubTabId?: string;           // Sous-onglet actif dans l'application
  };
}

export interface DesktopSessionSnapshot {
  version: number;                     // Version du schéma de snapshot (ex: 1)
  timestamp: number;                   // Heure de la dernière capture ISO/epoch
  activeWallpaperId: string;           // Fond d'écran sélectionné
  taskbarAlignment: 'center' | 'left'; // Alignement de la barre des tâches
  activeMode: 'windows11' | 'studio';  // Mode actif (Bureau OS ou Atelier Studio)
  windows: Record<string, WindowStateRecord>; // Carte complète des fenêtres
  recentFiles: string[];               // Historique des derniers fichiers ouverts
  snapLayoutConfig?: {                 // Ancrage actuel (50/50, quarts, etc.)
    type: 'none' | 'left-split' | 'right-split' | 'quadrant';
    windowIds: string[];
  };
}
```

================================================================================
II. LE MOTEUR DE GESTIONNAIRE DE SESSION (`DesktopSessionManager.ts`)
================================================================================
Implémente le gestionnaire de synchronisation avec un stockage local résilient (double couche `localStorage` + fallback `IndexedDB`) :

1. SAUVEGARDE EN TEMPS RÉEL DÉBOUNCÉE (Debounced Auto-Save) :
   - Toute interaction utilisateur (déplacement de fenêtre `drag`, redimensionnement `resize`, focus au premier plan, ouverture/fermeture, saisie dans le terminal ou l'éditeur) déclenche une mise à jour d'état.
   - Utilise un `debounce` optimisé (ex: 200 ms) pour éviter d'écrire sur le disque à chaque pixel déplacé, garantissant 60 FPS constants.
   - Écriture atomique dans la clé `PHI_DESKTOP_SESSION_V1`.

2. RÉHYDRATATION INSTANTANÉE AU CHARGEMENT (Hydration & Sanity Check) :
   - Au montage du composant (`useEffect` initial / hook `useDesktopSession`) :
     * Lecture immédiate du snapshot de session.
     * Contrôle d'intégrité et de compatibilité d'écran (ViewPort Guard) : si l'utilisateur a changé de résolution ou d'écran (ex: passage d'un grand moniteur 4K à un écran portable 1080p), le moteur repositionne automatiquement les fenêtres qui déborderaient en dehors des limites visibles de l'écran (clamp entre 0 et `window.innerWidth - 100`, `window.innerHeight - 100`).
     * Restauration fluide sans flash visuel (zero layout shift).

3. RÉSISTANCE AUX EXCEPTIONS & RÉPARATION AUTOMATIQUE :
   - Si les données de session sont corrompues (ex: JSON tronqué), le gestionnaire active sa routine de repli homéostatique : il restaure un agencement par défaut équilibré (Éditeur de code à gauche 60%, Terminal et Télémétrie à droite 40%) et consigne l'anomalie en Erreur Fertile (σ_err).

================================================================================
III. HOOK REACT DÉDIÉ : `useDesktopSession.ts`
================================================================================
Crée un hook React personnalisé offrant une API limpide et ergonomique pour l'ensemble du bureau :

```typescript
export function useDesktopSession() {
  // États réactifs :
  // - session: DesktopSessionSnapshot
  // - updateWindow(id: string, partial: Partial<WindowStateRecord>)
  // - bringToFront(id: string)
  // - openWindow(appId: string, initialData?: any)
  // - closeWindow(id: string)
  // - minimizeWindow(id: string)
  // - maximizeWindow(id: string)
  // - saveInternalState(id: string, internalState: any)
  // - resetDesktopToDefault()
}
```

================================================================================
IV. ADAPTATION DU GESTIONNAIRE DE FENÊTRES (`WindowManager.tsx` & `Windows11Desktop.tsx`)
================================================================================
1. CÂBLAGE DIRECT DU DRAG & RESIZE :
   - Connecte les écouteurs de fin de déplacement (`onDragEnd` / `onPointerUp`) et de fin de redimensionnement directement à `updateWindow(id, { x, y, width, height })`.
   - Maintiens le `zIndex` le plus élevé pour la dernière fenêtre cliquée et persiste cette valeur immédiatement.

2. PERSISTANCE DU CONTENU INTERNE DES FENÊTRES :
   - Fichier en cours d'édition : Lorsque l'utilisateur sélectionne un fichier dans l'éditeur de code ou l'explorateur, enregistre `internalState.activeFilePath`. À la réouverture, le même fichier est réouvert avec le même contenu.
   - Terminal PowerShell : Mémorise les 20 dernières commandes et la commande en cours de frappe pour ne jamais perdre l'historique shell.

3. BOUTON D'ACTION RAPIDE DANS LE MENU DÉMARRER ET LA BARRE DES TÂCHES :
   - Option dans le menu contextuel ou sous l'avatar utilisateur :
     * "Sauvegarder l'agencement actuel du bureau" (Sauvegarde manuelle scellée).
     * "Restaurer l'agencement par défaut" (Bouton de secours).
     * Témoin discret dans la barre des tâches : petite coche verte "Session persistée localement (Ξ = 1.000)".

================================================================================
V. EXIGENCES DE PERFORMANCE ET DE CRAFT
================================================================================
- Zéro lag : Utilise des références stables (`useCallback`, `useRef`) pour que l'enregistrement continu en arrière-plan ne provoque aucun re-render parasite des fenêtres passives.
- TypeScript strict, interfaces complètes, zéro `any`.
- Rendu fluide compatible avec les animations `motion/react` de Windows 11 Fluent.
- L'utilisateur peut fermer son navigateur, redémarrer son ordinateur, et retrouver son atelier de travail prêt à l'emploi en moins de 1 seconde.

Implémente l'intégralité de ce moteur de persistance de session pour transformer le bureau virtuel Windows 11 IA en un véritable environnement de travail professionnel indestructible.
```
