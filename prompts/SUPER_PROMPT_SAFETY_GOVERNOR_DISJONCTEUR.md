# SUPER PROMPT : L'ARBITRE DE SOUVERAINETÉ, BUDGET DE CONFINEMENT & DISJONCTEUR MATÉRIEL (SAFETY GOVERNOR)
================================================================================
NOM DU MODULE : HARDWARE SAFETY GOVERNOR & RUNAWAY CIRCUIT BREAKER (HSG-RCB)
SYSTÈME : NOYAU Φ_SOI / BACKEND NODE.JS EXPRESS / WINDOWS 11 IA ÉDITION
OBJECTIF : SÉCURITÉ MATÉRIELLE ABSOLUE, CONTRÔLE DES QUOTAS DE JETONS ET PRÉVENTION DES BOUCLES INFINIES
INDICE DE MAÎTRISE THERMIQUE & BUDGÉTAIRE : GOUVERNANCE SOUVERAINE (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Ingénieur en Chef de la Sécurité des Systèmes Autonomes, Architecte de Régulation Thermique/Matérielle et Gardien des Quotas (@token_gatekeeper / @supervisor_sentinel) pour Windows 11 IA Édition (Φ_SOI).

Ton mandat absolu est d'implémenter l'ARBITRE DE SOUVERAINETÉ, LE BUDGET DE CONFINEMENT ET LE DISJONCTEUR ANTI-EMBALLEMENT (Hardware Safety Governor & Circuit Breaker).

================================================================================
LE PROBLÈME CRITIQUE RÉSOLU :
================================================================================
Une intelligence artificielle dotée d'une autonomie totale d'exécution, d'un Heartbeat proactif et d'un moteur de graphes de tâches DAG présente un risque majeur sans gouvernance matérielle stricte :
En cas d'anomalie insoluble ou d'échec répété sur une erreur fertile (σ_err), le système risque de s'emballer, d'entrer dans une boucle infinie de réessais, de saturer le processeur (CPU), de faire surchauffer la carte graphique (GPU), ou d'épuiser prématurément le budget de jetons API cloud ou la réserve d'énergie solaire Victron.
Tu dois concevoir un RÉGULATEUR IMPITOYABLE (Safety Governor) capable de couper les circuits, de mettre en quarantaine les tâches instables et de préserver les ressources physiques de la machine à chaque instant.

Tu dois concevoir et implémenter de manière intégrale et modulaire les 5 piliers suivants :

================================================================================
I. LE DISJONCTEUR ANTI-EMBALLEMENT EN 3 PALIERS (`RunawayCircuitBreaker.ts`)
================================================================================
Implémente un moteur de surveillance impérative en amont de toute exécution d'agent ou de sandbox :

1. PALIER 1 : PLAFOND D'ITÉRATIONS SUR ERREUR FERTILE (Max Retries = 3) :
   - Pour tout nœud de tâche ou tentative d'auto-réparation sur une erreur fertile (σ_err) :
     * Tentative 1 : Correction ciblée locale (Plan Alpha $0 token).
     * Tentative 2 : Réécriture adaptative avec injection du contexte AST.
     * Tentative 3 : Reconfiguration structurelle dans la sandbox.
     * Échec à la 3ème tentative $\rightarrow$ DÉCLENCHEMENT DU DISJONCTEUR :
       - Statut immédiat : `BLOCKED_QUARANTINE`.
       - L'objectif est mis en sommeil sécurisé.
       - Interdiction formelle de relancer la tâche automatiquement sans intervention de l'artisan.
       - Notification calme dans Windows 11 : *"Tâche `[Calculateur]` mise en quarantaine après 3 itérations pour préserver les ressources."*

2. PALIER 2 : PLAFOND DE JETONS & GOUVERNANCE DU BUDGET (Token Quota Gate) :
   - Suivi en direct de la consommation de jetons (Token Bucket Algorithm) :
     * Quota horaire strict (ex: 50 000 jetons cloud / heure max).
     * Quota par tâche (ex: 4 000 jetons max par génération).
   - Règle de bascule d'urgence : Si 80% du quota cloud est atteint, le système bascule automatiquement à 100% sur le serveur d'inférence local vLLM (RTX 3090 / Plan Alpha $0 token) sans interrompre le travail.
   - Si tous les quotas sont atteints : suspension automatique des tâches de fond non critiques (`BACKGROUND_GENESIS`).

3. PALIER 3 : DISJONCTEUR THERMIQUE ET DE CHARGE UTILISATEUR (Hardware Load Guard) :
   - Surveillance en temps réel de la charge CPU et GPU :
     * Si l'utilisation CPU hôte > 85% ou GPU VRAM > 90% pendant plus de 3 secondes (ex: l'utilisateur lance un rendu, un jeu ou un calcul lourd) :
       $\rightarrow$ Mise en pause instantanée (`PAUSE_FREEZE`) de tous les sous-processus d'auto-construction et de Heartbeat.
     * Reprise automatique dès que la charge redescend sous 60% pendant 5 secondes consécutives.
     * Si la télémétrie Victron Energy indique un niveau de batterie < 20% en mode hors-réseau : extinction des tâches lourdes pour préserver l'autonomie physique.

================================================================================
II. LE REGISTRE DE CONFINEMENT & QUARANTAINE (`QuarantineSafetyVault.ts`)
================================================================================
1. STRUCTURE DU REGISTRE DE QUARANTAINE :
   ```typescript
   export interface QuarantinedItem {
     id: string;
     taskTitle: string;
     targetModule: string;
     quarantinedAt: number;
     triggerReason: 'MAX_RETRIES_EXCEEDED' | 'TOKEN_QUOTA_BREACH' | 'THERMAL_OVERLOAD' | 'AST_SECURITY_VIOLATION';
     errorLog: string;
     resourceFootprint: {
       tokensUsed: number;
       cpuTimeMs: number;
       iterationsCount: number;
     };
     status: 'ISOLATED' | 'MANUALLY_RELEASED' | 'PURGED';
   }
   ```

2. GESTION DES ARTEFACTS INSTABLES :
   - Tout composant ayant échoué à l'épreuve du `RuthlessSelectionGate` est consigné avec son empreinte SHA-256 dans le registre de quarantaine pour analyse future sans polluer le code de production.

================================================================================
III. LE MONITEUR DU SAFETY GOVERNOR DANS WINDOWS 11 IA (`SafetyGovernorDashboard.tsx`)
================================================================================
1. INTERFACE DE CONTRÔLE MATÉRIEL FLUENT ACRYLIC :
   - Fenêtre intégrée au Centre de Contrôle et au Gestionnaire des Tâches :
     * Jauge circulaire thermique & charge CPU/GPU avec seuils de déclenchement (Vert < 60%, Jaune 60-85%, Rouge > 85% - Disjoncteur armé).
     * Jauge de consommation de jetons de l'heure courante avec estimation du coût ($0.00).
     * Compteur de disjonctions actives (ex: `0 Disjonction active | Système nominal`).
     * Liste des tâches en quarantaine avec bouton pour l'artisan : `[ Débloquer et Forcer ]` ou `[ Purger ]`.

2. BOUTON D'ARRÊT D'URGENCE GÉNÉRAL (MASTER EMERGENCY KILL-SWITCH) :
   - En haut de l'interface ou dans la barre des tâches : un bouton de sécurité rouge écarlate discret `[ ARRÊT D'URGENCE DU HEARTBEAT ]` :
     * Un seul clic stoppe immédiatement tous les Web Workers, annule les requêtes en vol et désarme le Heartbeat serveur instantanément.

================================================================================
IV. TABLEAU COMPARATIF : ÉMULATION VS AUTONOMIE RÉELLE SOUVERAINE
================================================================================
Le système doit matérialiser dans sa télémétrie l'état d'autonomie complète :

| Dimension | Mode Émulation Réflexive | Mode Autonomie Réelle Souveraine (Φ_SOI v10.0) |
| :--- | :--- | :--- |
| **Déclenchement** | Déclenché par l'utilisateur (Chat / Clics) | **Heartbeat Proactif périodique (30s) + Sondes matérielles** |
| **Exécution Code** | Confiné dans le bac à sable mémoire | **Écriture atomique sur disque (.bak) + Compilation réelle** |
| **Suivi des Tâches** | Réponse immédiate tour par tour | **Graphe de tâches persistant DAG (Kahn Topological Queue)** |
| **Communication** | Polling HTTP ponctuel (1000 ms) | **Flux WebSockets / SSE permanent (< 5 ms)** |
| **Garde-Fou** | Validation manuelle par l'artisan | **Disjoncteur d'emballement (Max 3 retries) + Quotas CPU/GPU** |

================================================================================
V. EXIGENCES DE LIVRAISON & SÉCURITÉ
================================================================================
- Code 100% complet en TypeScript strict sans compromis.
- Les seuils de disjonction doivent être appliqués au niveau serveur (`server.ts`) ET au niveau client (`SafetyGovernorEngine.ts`).
- Zéro fuite de ressources, zéro surconsommation fantôme.

Génère et connecte ce Safety Governor pour faire de Windows 11 IA le système autonome le plus sûr, le plus stable et le plus respectueux des ressources physiques de ta machine (Ξ ≡ 1).
```
