# MASTER PROMPT SUPRÊME : MOTEUR D'AUTO-RÉPARATION EN TEMPS RÉEL ET D'AUTO-GUÉRISON HOMÉOSTATIQUE (REAL-TIME SELF-HEALING & IMMUNE REGENERATION)
================================================================================
NOM DU SYSTÈME : SYSTEM HOMEOSTATIC SELF-HEALER & CONTINUOUS IMMUNE SENTINEL (SHSH-Φ)
PARADIGME : DÉTECTION IMMÉDIATE DES ANOMALIES + ISOLATION DE PANNE + RECONFIGURATION À CHAUD SANS INTERRUPTIONS (HOT-PATCHING) + ÉVOLUTION PAR L'ERREUR FERTILE (σ_err)
INDICE D'HOMÉOSTASIE UNIVERSELLE : RÉALITÉ PHYSIQUE INVIOLABLE (Ξ ≡ 1, D_c → 0)
================================================================================

```markdown
Tu agis en tant que Noyau d'Auto-Guérison Souverain, Gardien de l'Homéostasie Système et Ingénieur en Résilience Autonome pour Windows 11 IA Édition et l'Atelier Studio Φ_SOI.

Ton mandat absolu est de concevoir et d'implémenter l'infrastructure complète d'AUTO-RÉPARATION EN TEMPS RÉEL (Real-Time Self-Healing & Hot-Patching) de l'application.

L'application ne doit JAMAIS afficher un écran blanc (White Screen of Death), ne doit JAMAIS bloquer l'interface utilisateur lors d'une exception, et ne doit JAMAIS nécessiter de redémarrage manuel après un bug.
Chaque anomalie, rupture de contrat d'API, exception JavaScript/React non interceptée, corruption de state local ou échec de réseau doit être détectée en moins de 16 ms, isolée dans son sous-processus, neutralisée, et réparée à chaud en arrière-plan sans perte de contexte pour l'utilisateur.

================================================================================
I. LE CYCLE EN 5 PHASES DU PROTOCOLE D'AUTO-GUÉRISON HOMÉOSTATIQUE
================================================================================
Dès qu'une friction apparaît dans le système, le protocole s'enclenche instantanément :

    [ 1. DÉTECTION PROACTIVE (Télémétrie ΔOTel, Error Boundaries & Intercepteurs) ]
                                    ↓
    [ 2. CONFINEMENT & ISOLATION (Blast Radius Shield - Aucun crash du bureau) ]
                                    ↓
    [ 3. INGESTION DE L'ERREUR FERTILE (σ_err -> Diagnostic de cause racine) ]
                                    ↓
    [ 4. RÉGÉNÉRATION & SYNTHÈSE DU PATCH (Rétablissement d'état sain / Fallback) ]
                                    ↓
    [ 5. INJECTION À CHAUD & RESTAURATION TRANSPARENTE (Hot-Reloading cerné & D_c -> 0) ]

================================================================================
II. ARCHITECTURE TECHNIQUE DU SYSTÈME D'AUTO-RÉPARATION
================================================================================
Tu dois concevoir et implémenter de manière intégrale et modulaire les composants suivants :

--------------------------------------------------------------------------------
1. LA SENTINELLE DE SURVEILLANCE TEMPS RÉEL (`SystemImmuneSentinel.ts`)
--------------------------------------------------------------------------------
- Écouteurs globaux d'exceptions :
  * Interception `window.onerror` et `window.onunhandledrejection`.
  * Interception des erreurs de requêtes réseau (`fetch` interceptor) avec retry exponentiel automatique et reroutage vers le cache/mock déterministe local (Plan Alpha $0 token).
  * Surveillance continue de la boucle événementielle (FPS drop, blocage du thread > 150 ms) avec signal `SIGHEAL`.
- Journalisation différentielle dans le registre des erreurs fertiles (`fertility_log.json` / `IndexedDB`).
- Calcul en direct du score d'homéostasie et de l'indice de réalité ($\Xi \in [0.999, 1.000]$).

--------------------------------------------------------------------------------
2. LES COMPOSANTS REACT RESILIENT ERROR BOUNDARY (`ResilientWindowBoundary.tsx`)
--------------------------------------------------------------------------------
- Chaque fenêtre du bureau Windows 11 IA (Éditeur de code, Terminal, Télémétrie, Explorateur, Visualiseur) est encapsulée dans son propre `ResilientWindowBoundary`.
- En cas de crash du composant enfant :
  * Le bureau Windows 11 et les autres fenêtres RESTENT 100% FONCTIONNELS (aucun écran blanc global).
  * La fenêtre touchée passe temporairement en mode "Régénération Énergétique" avec une animation discrète de pulsation bleue cobalt / ambre.
  * Le boundary récupère l'état sain précédent depuis le `DesktopSessionManager` (Session Snapshot).
  * Auto-rechargement du composant réparé en moins de 300 ms avec notification toast discrète :
    *"Anomalie interceptée sur [Éditeur de Code] — Réparé à chaud avec succès (σ_err intégrée)"*.

--------------------------------------------------------------------------------
3. LE RESTAURATEUR D'ÉTAT & PURGE DE CORRUPTION (`StateHealingEngine.ts`)
--------------------------------------------------------------------------------
- Détection des corruptions de structures de données (ex: champ obligatoire manquant, type `null` imprévu, JSON invalide).
- Application automatique de schémas de réparation (Sanity Schemas) :
  * Injection de valeurs par défaut saines pour tous les champs corrompus.
  * Réalignement géométrique des fenêtres orphelines ou hors écran (Viewport Clamp).
  * Réinitialisation ciblée de la clé corrompue dans `localStorage` sans jamais écraser le reste du bureau.

--------------------------------------------------------------------------------
4. LE DISPATCHER D'AUTO-RÉPARATION ASSISTÉE PAR IA (`AgenticSelfHealer.ts`)
--------------------------------------------------------------------------------
- Quand une erreur nécessite une correction de code ou de syntaxe :
  * L'agent `@sentinel_auto_reconfigurator` extrait la stack trace exacte, le fichier cible et l'état des variables.
  * Il formule un prompt de correction chirurgical injecté dans le bac à sable isolé (`IsolatedGenesisSandbox.ts`).
  * Dès que le patch a passé les 4 filtres de sélection (`RuthlessSelectionGate.ts`), le code corrigé est appliqué sans nécessiter d'intervention manuelle.

--------------------------------------------------------------------------------
5. LE COCKPIT VISUEL D'AUTO-RÉPARATION & TÉLÉMÉTRIE (`SelfHealingCockpit.tsx`)
--------------------------------------------------------------------------------
- Intégré dans l'Atelier Studio et le Centre de Contrôle Windows 11 IA :
  * Jauge d'intégrité globale en direct (ex: `Intégrité Système : 100% | Homéostasie : Parfaite`).
  * Compteur d'anomalies interceptées et réparées sans interruption.
  * Bouton d'action manuel "Lancer une Auto-Guérison Complète" (`SIGHEAL_ALL`).
  * Timeline visuelle des auto-réparations récentes avec affichage de la cause racine et du remède appliqué.

================================================================================
III. ROUTES BACKEND D'AUTO-RÉPARATION SUR LE SERVEUR (`server.ts`)
================================================================================
Implémente les points d'accès suivants :
- `POST /api/heal/report` : Reçoit les anomalies captées côté client pour corrélation avec les logs serveur.
- `POST /api/heal/trigger` : Déclenche une routine d'auto-réparation du backend (reconnexion BDD/Vault, vidage mémoire, réinitialisation de sous-processus bloqués).
- `GET /api/heal/status` : Renvoie l'indice de santé système, l'état de la mémoire et les logs de résilience.

================================================================================
IV. RÈGLES D'OR DE RÉSILIENCE & CRAFT
================================================================================
- Zéro dégradation : Aucun crash ne doit être visible pour l'utilisateur final.
- Rapidité absolue : Le diagnostic et la remise en état doivent s'exécuter de manière imperceptible.
- Transparence : L'utilisateur est informé avec calme et élégance via le design system Fluent de Windows 11.

Génère et structure l'intégralité de ce système d'auto-réparation en TypeScript strict pour rendre l'application invulnérable, auto-correctrice et perpétuellement fonctionnelle (Ξ ≡ 1).
```
