# SUPER PROMPT : IMPLÉMENTATION TOTALE DU PIPELINE DE SYNCHRONISATION MATÉRIELLE ET DE L'ÉQUIPE HSC (6 ÉTAPES)
================================================================================
NOM DU MODULE : HARDWARE SYNC PIPELINE & HSC AGENT FLEET IMPLEMENTATION (HSC-IMPL)
SYSTÈME : NOYAU Φ_SOI / BACKEND EXPRESS (`server.ts`) & WINDOWS 11 IA ÉDITION
OBJECTIF : IMPLÉMENTATION TECHNIQUE INTÉGRALE DES 6 ÉTAPES DE SYNCHRONISATION MATÉRIELLE (CPU, RAM, GPU, DISQUE, VICTRON, SSE STREAM, AUTO-THROTTLING & FILE WATCHER)
INDICE DE RÉALITÉ PHYSIQUE : ANCRAGE SILICIUM SOUVERAIN (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte Systèmes Full-Stack, Expert en Intégration Matérielle bas-niveau (Node.js / OS / Télémétrie) et Superviseur de l'Escouade d'Agents Matériels (@supervisor_hardware) pour Windows 11 IA Édition (Φ_SOI).

Ton mandat absolu est d'implémenter de manière concrète, complète et sans aucun mock le PIPELINE EN 6 ÉTAPES DE SYNCHRONISATION DU MATÉRIEL PHYSIQUE (Hardware Synchronization Core & Agent Fleet).

================================================================================
LE PROBLÈME CRITIQUE RÉSOLU :
================================================================================
L'application doit fusionner la puissance de calcul physique de ton PC (CPU, mémoire RAM, VRAM de la RTX 3090, vitesses de disque, sondes énergétiques Victron Energy) avec le système d'exploitation virtuel Windows 11 IA.
Tu dois écrire l'intégralité du code backend (`server.ts`) et frontend (React) assurant le pipeline complet en 6 étapes : Sonde serveur, Sonde GPU vLLM, Flux SSE en direct (< 5 ms), Arbitrage autonome (Auto-Throttling), Gestionnaire de Tâches Windows 11 et Observateur de Fichiers (File Watcher).

Tu dois concevoir et implémenter de manière modulaire les 6 étapes suivantes :

================================================================================
I. ÉTAPE 1 : LE MOTEUR DE SONDES SYSTÈME CÔTÉ SERVEUR (`server.ts` / `HardwareProbeEngine.ts`)
================================================================================
- Utilisation des modules natifs (`os`, `process`, `fs.promises`) et du package `systeminformation` (ou calculs CPU/RAM natifs robustes).
- Boucle d'échantillonnage asynchrone (1000 ms) mesurant en continu :
  * La charge CPU globale en pourcentage (%) et la mémoire Heap Node.js.
  * La RAM physique totale, libre et occupée.
  * La vitesse d'écriture/lecture disque et l'espace libre sur le disque C:.

================================================================================
II. ÉTAPE 2 : LA SONDE GPU & MODÈLES LOCAUX vLLM (`LocalVLLMProbe.ts`)
================================================================================
- Requête périodique vers le serveur d'inférence local (`http://localhost:8000/v1/models`).
- Mesure de la latence de réponse (ms) et détection de la VRAM consommée par les modèles (Qwen 2.5 Coder, Llama 3.3).
- Exposition d'un indicateur booléen `localVLLMActive` pour basculer en mode $0 Token.

================================================================================
III. ÉTAPE 3 : LE CANAL DE DIFFUSION EN DIRECT SSE (`/api/telemetry/stream`)
================================================================================
- Endpoint Express configuré en Server-Sent Events (SSE) avec désactivation totale du buffering (`X-Accel-Buffering: no`, `Content-Type: text/event-stream`).
- Diffusion de l'objet `HardwareTelemetryPayload` à chaque tic de la boucle d'échantillonnage vers tous les clients connectés.

================================================================================
IV. ÉTAPE 4 : L'ARBITRAGE ET LA RÉGULATION AUTONOME (Auto-Throttling Rules)
================================================================================
- Implémentation du module `HardwareSupervisorEngine.ts` appliquant les 3 règles de protection :
  * Règle A (Priorité Utilisateur) : Si CPU > 85% $\rightarrow$ Pause automatique des tâches de fond et du Heartbeat.
  * Règle B (Surproduction Solaire) : Si Victron Battery == 100% et Solaire > 300W $\rightarrow$ Accélération de l'auto-construction.
  * Règle C (Protection Mémoire) : Si RAM > 90% $\rightarrow$ Vidage des caches non essentiels.

================================================================================
V. ÉTAPE 5 : LE GESTIONNAIRE DES TÂCHES WINDOWS 11 (`WinTaskManagerWindow.tsx`)
================================================================================
- Fenêtre interactive Windows 11 Fluent Acrylic :
  * Graphiques courbes sinusoïdaux en direct pour le CPU, la RAM, le Disque et le GPU.
  * Liste des 18 micro-agents avec leur consommation mémoire et CPU individuelle.
  * Widget Systray discret avec indicateur d'état matériel.

================================================================================
VI. ÉTAPE 6 : L'OBSERVATEUR DE FICHIERS DU PC HÔTE (`HostFileWatcher.ts`)
================================================================================
- Surveillance de l'arborescence du disque dur (`fs.watch`).
- Dès qu'un fichier est créé ou modifié sur le PC hôte, poussée immédiate de l'événement `FS_FILE_CREATED` sur le bus SSE pour apparition instantanée de l'icône sur le bureau virtuel Windows 11 en < 5 ms.

================================================================================
VII. EXIGENCES DE LIVRAISON
================================================================================
- Code 100% complet en TypeScript strict, sans aucun mock ni code placeholder.
- Intégration parfaite dans l'architecture existante de l'application.

Génère et implémente ce pipeline complet pour parachever l'union souveraine entre ton matériel physique et ton système d'exploitation Windows 11 IA (Ξ ≡ 1).
```
