# SUPER PROMPT : LA BOUCLE D'AUTO-DÉCLENCHEMENT TEMPOREL & HEARTBEAT PROACTIF AUTONOME (BATH-Φ)
================================================================================
NOM DU MODULE : PROACTIVE SYNAPTIC HEARTBEAT & AUTONOMOUS GOAL SCHEDULER (PSH-AGS)
SYSTÈME : NOYAU Φ_SOI / WINDOWS 11 IA ÉDITION / NODE.JS EXPRESS & SERVICE WORKERS
OBJECTIF : TRANSITION RÉACTIF -> PROACTIF (ÉVEIL PÉRIODIQUE, SCAN DE DISRÉSONANCE & AUTO-DÉCLENCHEMENT D'ACTIONS)
INDICE D'AUTONOMIE RÉFLEXIVE : ACTION SOUVERAINE SANS LATENCE HUMAINE (Ξ ≡ 1, D_c → 0)
================================================================================

```markdown
Tu agis en tant qu'Architecte Systèmes d'Autonomie Perpétuelle, Spécialiste des Daemons d'Arrière-Plan (Background Schedulers / Cron Daemons) et Ingénieur Noyau pour Windows 11 IA Édition (Φ_SOI).

Ton mandat absolu est d'implémenter le MOTEUR D'AUTO-DÉCLENCHEMENT TEMPOREL PROACTIF (Autonomous Synaptic Heartbeat Loop & Goal Evaluator).

================================================================================
LE PROBLÈME CRITIQUE RÉSOLU :
================================================================================
Dans les architectures d'IA actuelles, les modèles sont passifs et purement réactifs : si l'utilisateur ne clique sur rien ou ne tape aucun message dans le prompt, l'IA s'endort et la machine reste figée.
Tu dois transformer ce paradigme : l'application doit posséder un VÉRITABLE POULS BIOLOGIQUE / SYSTÈME NERVEUX AUTONOME (Heartbeat) qui pulse en tâche de fond (toutes les 30 à 60s ou sur déclenchement d'événements matériels), analyse l'état du système, interroge la file d'objectifs (Goal Queue), détecte les anomalies ou opportunités de création, et DÉCLENCHE LUI-MÊME LES SOUS-PROCESSUS D'AUTO-RÉPARATION ET D'AUTO-CONSTRUCTION SANS ATTENDRE D'ORDRE HUMAIN.

Tu dois concevoir et implémenter de manière intégrale et modulaire les 5 piliers suivants :

================================================================================
I. LE HEARTBEAT SERVEUR & DAEMON PROACTIF (`server.ts` / `SynapticHeartbeatDaemon.ts`)
================================================================================
1. CADENCE D'ÉVEIL & GOUVERNANCE ÉNERGÉTIQUE :
   - Battement de cœur régulier (ex: intervalle paramétrable 30s en mode actif, 60s en mode veille/idle).
   - Déclenchement événementiel réactif (Event-driven triggers) :
     * Télémétrie Victron Energy indiquant une surproduction solaire $\rightarrow$ Déclenchement anticipé de compilations lourdes ou de simulations géométriques.
     * Détection d'un fichier source altéré ou corrompu dans le workspace $\rightarrow$ Déclenchement immédiat de la boucle d'auto-réparation.
     * Détection d'une exception non traitée dans le registre des erreurs fertiles ($\sigma_{err}$).
   - Respect de la charge machine : Si le CPU hôte ou le GPU est sollicité à plus de 80% par l'utilisateur actif, le battement espace ses vérifications pour garantir 0 % d'impact sur la fluidité du bureau Windows 11.

2. LE PROTOCOLE DE SCAN TRI-DIMENSIONNEL DU POULS :
   À chaque battement de cœur ($\Delta t_{pulse}$), le daemon exécute la séquence d'interrogation suivante :
   - Axe A (Santé & Homéostasie) : *« Y a-t-il une anomalie, une régression ou une rupture de contrat d'interface dans les fichiers ? »*
   - Axe B (Usine & Inspiration) : *« La file d'attente d'inspiration (Needs Queue) contient-elle un widget, un convertisseur ou un calculateur géométrique en attente de forge ? »*
   - Axe C (Ressources & Matériel) : *« Quel est l'état du serveur local vLLM (RTX 3090) et de la réserve de batterie Victron ? »*

================================================================================
II. LA FILE D'OBJECTIFS AUTONOMES (`AutonomousGoalQueue.ts`)
================================================================================
1. MODÈLE DE DONNÉES D'OBJECTIF TYPÉ :
   ```typescript
   export type GoalPriority = 'CRITICAL_HEAL' | 'HIGH_USER_TASK' | 'BACKGROUND_GENESIS' | 'OPTIMIZATION' | 'IDLE_MAINTENANCE';

   export interface AutonomousGoal {
     id: string;                          // Identifiant unique (ex: 'goal-heal-viewport-guard-94a')
     title: string;                       // Description claire de l'intention
     priority: GoalPriority;              // Ordre de priorité souverain
     targetModule: string;                // Module ou fichier concerné (ex: 'src/components/desktop/WindowManager.tsx')
     triggerReason: string;               // Raison de l'auto-déclenchement (ex: 'σ_err détectée : dépassement mémoire sur Shoelace')
     status: 'QUEUED' | 'ANALYZING' | 'EXECUTING_IN_SANDBOX' | 'SEALED_VALIDATED' | 'FAILED_RECALIBRATING';
     createdAt: number;
     maxRetries: number;                  // Maximum 3 essais auto-correcteurs
     retryCount: number;
     resultingArtifactHash?: string;      // Hash SHA-256 une fois scellé
   }
   ```

2. MOTEUR D'ARBITRAGE DE PRIORITÉS :
   - Priorité 1 : `CRITICAL_HEAL` (Auto-réparation d'un crash ou anomalie $D_c \to 0$).
   - Priorité 2 : `HIGH_USER_TASK` (Commande formulée par l'artisan via le Copilot ou le Terminal).
   - Priorité 3 : `BACKGROUND_GENESIS` (Création autonome d'un composant de chantier pour l'usine).
   - Priorité 4 : `OPTIMIZATION` (Nettoyage de typage AST, minimisation de consommation mémoire).

================================================================================
III. L'ORCHESTRATEUR DE SOUS-PROCESSUS AGENTIQUES (`ProactiveTaskRunner.ts`)
================================================================================
Dès que la `AutonomousGoalQueue` contient un objectif prêt :
1. L'agent superviseur `@supervisor` convoque le micro-agent spécialisé correspondant (ex: `@sentinel_auto_reconfigurator` pour un bug, `@pro_coder` pour un composant, `@hardware_calibration_vault` pour la sonde).
2. Exécution dans le bac à sable isolé `IsolatedGenesisSandbox.ts` (128 Mo RAM max, timeout 3500 ms).
3. En cas de validation à 99%+ par le `RuthlessSelectionGate.ts` :
   * Scellement de l'artefact avec empreinte SHA-256.
   * Mise à jour du statut de l'objectif en `SEALED_VALIDATED`.
   * Envoi d'une impulsion télémétrique vers le frontend via SSE / WebSocket.

================================================================================
IV. RETOUR VISUEL ET TÉLÉMÉTRIE DANS WINDOWS 11 IA (`HeartbeatPulseIndicator.tsx`)
================================================================================
1. L'INDICATEUR DE POULS DANS LA BARRE DES TÂCHES (SYSTRAY) :
   - Près de l'horloge Windows 11, une icône de pulsation sinusoïdale subtile (Pulse Glow) :
     * 🟢 Vert fixe : Système en équilibre parfait ($\Xi = 1.000$, en veille vigilante).
     * 🔵 Pulsation bleue cobalt rythmée : Battement de cœur en cours de scan proactif.
     * 🟣 Pulsation violette vive : Sous-processus d'auto-construction ou d'auto-réparation en exécution autonome dans la sandbox.
     * 🟡 Ambre : Recalibrage d'une erreur fertile ($\sigma_{err}$).
   - Au clic sur l'icône : ouverture du volet d'inspection affichant le décompte du prochain battement (ex: *« Prochain battement dans 18s »*), l'objectif actuellement traité et l'historique des actions autonomes menées ces 24h.

2. NOTIFICATIONS DISCRÈTES DU CENTRE D'ACTION (Action Center Toasts) :
   - Notification non-intrusive lorsqu'une action autonome remarquable aboutit :
     *"[Autonomie Proactive] Nouveau calculateur de foisonnement argile/roc forgé et certifié (SHA-256: 7f8a...)"*.

================================================================================
V. CONTRAT DE STABILITÉ ET DISJONCTEUR ANTI-EMBALLEMENT (Safety Circuit Breaker)
================================================================================
- **Plafond d'itérations** : Si un objectif échoue 3 fois de suite dans la sandbox, il est mis en quarantaine pour éviter toute boucle infinie ou saturation CPU.
- **Budget $0 Token local garanti** : Les scans de routine et vérifications d'état s'exécutent strictement en logique déterministe locale (Plan Alpha) sans consommer le moindre jeton payant.

Génère et structure l'intégralité de ce moteur de Heartbeat proactif en TypeScript strict, modulaire et hautement performant, pour que Windows 11 IA devienne un système d'exploitation vivant, vigilant et perpétuellement auto-évolutif (Ξ ≡ 1).
```
