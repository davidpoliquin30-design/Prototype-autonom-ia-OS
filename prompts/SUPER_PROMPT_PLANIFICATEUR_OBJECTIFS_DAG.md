# SUPER PROMPT : LE PLANIFICATEUR D'OBJECTIFS HIÉRARCHIQUES & MOTEUR DE GRAPHE DE TÂCHES DAG (AOG-DAG)
================================================================================
NOM DU MODULE : AUTONOMOUS GOAL DAG PLANNER & SEQUENTIAL TASK GRAPH ENGINE (AGP-STG)
SYSTÈME : NOYAU Φ_SOI / WINDOWS 11 IA ÉDITION / ATELIER STUDIO PRO
OBJECTIF : DÉCOMPOSITION AUTOMATIQUE DE MACRO-OBJECTIFS EN GRAPHES D'EXÉCUTION AUTO-VALIDÉS (DAG)
INDICE DE VALIDATION PHYSIQUE : VALIDATION ÉTAPE PAR ÉTAPE INVIOLABLE (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte de Planification Stratégique Agentique, Spécialiste des Graphes Acycliques Dirigés (DAG) et Superviseur Central (@supervisor) du Système Φ_SOI.

Ton mandat absolu est d'implémenter l'infrastructure complète du PLANIFICATEUR D'OBJECTIFS HIÉRARCHIQUES ET MOTEUR DE GRAPHES DE TÂCHES AUTONOMES (Autonomous Goal DAG Engine).

================================================================================
LE PROBLÈME CRITIQUE RÉSOLU :
================================================================================
Dans les architectures d'IA conventionnelles, dès qu'une tâche complexe est confiée à un agent, celui-ci s'arrête au premier tour d'inférence (réponse unique ou simple proposition de code), laissant la chaîne d'exécution incomplète ou abandonnée au milieu du gué.
Tu dois éradiquer formellement cette limite : l'application doit intégrer un VRAI MOTEUR DE GRAPHES DE TÂCHES (DAG Task Graph) capable de prendre un Macro-Objectif (ex: « Auditer le code de terrassement et intégrer le nouveau calculateur de foisonnement nordique »), de le décomposer automatiquement en une séquence de sous-tâches dépendantes, et de piloter leur exécution séquentielle où l'agent superviseur (@supervisor) COCHE ET VALIDE PHYSIQUEMENT CHAQUE ÉTAPE avant de passer à la suivante.

Tu dois concevoir et implémenter de manière intégrale et modulaire les 5 piliers suivants :

================================================================================
I. LE MODÈLE DE DONNÉES DU GRAPHE DE TÂCHES DAG (`TaskGraphTypes.ts`)
================================================================================
Définis la structure typée immuable régissant les macro-objectifs et leurs sous-tâches dépendantes :

```typescript
export type TaskNodeStatus = 
  | 'PENDING'            // En attente que les dépendances soient satisfaites
  | 'IN_PROGRESS'        // Sous-processus d'agent en cours d'exécution
  | 'VALIDATING_PHYSICAL'// Épreuve dans la sandbox ou test AST en cours
  | 'COMPLETED'          // Validé avec succès physique et scellé
  | 'RETRYING_MUTATION'  // Échec capté, auto-correction en erreur fertile (σ_err)
  | 'BLOCKED_QUARANTINE';// Bloqué après 3 échecs consécutifs

export interface TaskNode {
  id: string;                      // Identifiant unique (ex: 'node-ast-audit-01')
  title: string;                   // Nom explicite de l'étape
  assignedAgent: string;           // Agent responsable (ex: '@transducer_ast', '@pro_coder', '@sentinel_auto_reconfigurator')
  dependencies: string[];          // IDs des sous-tâches préalables obligatoires
  executionPayload: {
    actionType: 'AST_AUDIT' | 'CODE_GENERATION' | 'SANDBOX_PROOF' | 'SHA256_SEALING' | 'HOT_DEPLOY';
    targetPath?: string;
    params?: Record<string, any>;
  };
  validationCriterion: {
    type: 'AST_CLEAN' | 'SANDBOX_PASS_99' | 'SHA256_MATCH' | 'TYPE_CHECK_0_WARN';
    expectedInvariant: string;     // Ex: 'E_100 == 1 && Dc == 0'
  };
  status: TaskNodeStatus;
  retryCount: number;
  maxRetries: number;              // Limite à 3
  executionOutput?: {
    resultData?: any;
    sha256Proof?: string;
    executionTimeMs?: number;
    errorVector?: string;          // σ_err capté en cas d'anomalie
  };
}

export interface MacroGoalDAG {
  id: string;                      // Identifiant du Macro-Objectif (ex: 'dag-terrassement-calc-v2')
  title: string;                   // Titre du Macro-Objectif
  category: 'FEATURE_GENESIS' | 'HOMEOSTATIC_HEAL' | 'REFACTOR_OPTIMIZE' | 'SECURITY_VAULT';
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED_SEALED' | 'FAILED_PAUSED';
  progressPercentage: number;      // 0 à 100%
  nodes: Record<string, TaskNode>; // Dictionnaire des nœuds du graphe
  executionOrder: string[];        // Ordre topologique calculé (Kahn's algorithm)
  createdAt: number;
  completedAt?: number;
}
```

================================================================================
II. LE MOTEUR D'ORCHESTRATION ET DE DÉCOMPOSITION DAG (`AutonomousDAGOrchestrator.ts`)
================================================================================
1. DÉCOMPOSITION TOPOLOGIQUE AUTOMATIQUE (Topological Decomposition) :
   - Lorsque le Superviseur (@supervisor) ou l'artisan reçoit un Macro-Objectif, il génère le graphe ordonné :
     * Étape 1 : `@transducer_ast` $\rightarrow$ Analyse statique AST du code existant (`AST_AUDIT`).
     * Étape 2 : `@pro_coder` $\rightarrow$ Synthèse du nouveau module TypeScript (`CODE_GENERATION`).
     * Étape 3 : `@live_ide_executor` $\rightarrow$ Épreuve d'exécution dans la Sandbox (`SANDBOX_PROOF` - 128 Mo, 3500 ms).
     * Étape 4 : `@quantum_equation_vault_writer` $\rightarrow$ Calcul du scellé SHA-256 et ancrage au coffre (`SHA256_SEALING`).
     * Étape 5 : `@sentinel_auto_reconfigurator` $\rightarrow$ Déploiement à chaud et mise à jour de l'index (`HOT_DEPLOY`).
   - Algorithme de tri topologique (Kahn) : Vérifie que le graphe ne contient aucun cycle bloquant.

2. BOUCLE D'EXÉCUTION SOUVERAINE & AUTO-COCHE DES ÉTAPES :
   - Le moteur évalue les nœuds dont toutes les dépendances sont à l'état `COMPLETED`.
   - Il lance la sous-tâche correspondante.
   - **TRIBUNAL DE LA MATIÈRE (Ξ = 1)** : L'étape N'EST COCHÉE `COMPLETED` QUE SI le test physique renvoie un succès indéniable (pas de complaisance textuelle).
   - Dès qu'un nœud est validé, le graphe progresse automatiquement vers les nœuds enfants suivants sans nécessiter d'interaction humaine.

3. REBOND AUTOMATIQUE SUR ERREUR FERTILE (σ_err Feedback Loop) :
   - Si une étape échoue (ex: Épreuve Sandbox à 85% au lieu de 99%), son statut passe en `RETRYING_MUTATION`.
   - L'erreur fertile ($\sigma_{err}$) est injectée en amont dans le nœud de génération de code.
   - Re-tentative autonome ciblée jusqu'à 3 itérations maximales.

================================================================================
III. LE MONITEUR VISUEL DE GRAPHE DANS WINDOWS 11 IA (`WinTaskGraphCockpit.tsx`)
================================================================================
1. INTERFACE FLUENT DESIGN DU GRAPH VIEWER :
   - Fenêtre dédiée du bureau Windows 11 IA (accessible depuis le menu Démarrer ou la barre des tâches).
   - Rendu interactif du graphe de nœuds (visualisation vectorielle propre avec connecteurs dynamiques et cartes de nœuds Fluent) :
     * ⚪ Blanc/Gris : Nœud en attente (`PENDING`).
     * 🔵 Bleu cobalt pulsant : Nœud en cours d'exécution active (`IN_PROGRESS`).
     * 🟢 Vert néon fixe avec coche : Nœud validé et scellé (`COMPLETED`).
     * 🟡 Ambre : Nœud en auto-mutation adaptative (`RETRYING_MUTATION`).
     * 🔴 Rouge : Nœud en quarantaine (`BLOCKED_QUARANTINE`).

2. CARTOUCHE DE DÉTAIL EN DIRECT :
   - Au clic sur un nœud : affichage de l'agent assigné, de la charge mémoire, de la stack trace en cas d'erreur fertile, et de l'empreinte SHA-256 certifiée.
   - Barre de progression globale du Macro-Objectif avec jauge d'ancrage en direct ($\Xi \in [0, 1.000]$).
   - Boutons de contrôle pour l'artisan : `[ Mettre en pause ]`, `[ Forcer une réévaluation ]`, `[ Ajouter un Macro-Objectif ]`.

================================================================================
IV. HOOK REACT & PERSISTANCE LOCALE : `useAutonomousTaskGraph.ts`
================================================================================
- Maintien du graphe actif dans `localStorage` / `IndexedDB` (`phi_dag_store_v1`) : si l'utilisateur recharge son navigateur au milieu d'un graphe à l'étape 3/5, le superviseur reprend exactement à l'étape 3 sans réexécuter inutilement les étapes 1 et 2 déjà scellées.
- Synchronisation en direct avec le daemon de Heartbeat (`SynapticHeartbeatDaemon.ts`).

================================================================================
V. EXIGENCES DE LIVRAISON & CRAFT
================================================================================
- Code 100% complet en TypeScript strict, modulaire et sans dépendance fantôme.
- Zéro mock : le moteur exécute et valide réellement les étapes de test et de scellement.
- Rendu visuel 60 FPS fluide compatible avec le thème sombre Windows 11 Fluent Acrylic.

Génère et assemble ce Planificateur d'Objectifs Hiérarchiques pour donner à Windows 11 IA une véritable mémoire prospective et la capacité de mener à bien des missions logicielles complexes de bout en bout en totale autonomie (Ξ ≡ 1).
```
