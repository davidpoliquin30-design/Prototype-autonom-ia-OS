# SUPER PROMPT : L'ÉQUIPE D'AGENTS IA DE SYNCHRONISATION MATÉRIELLE DU PC (HARDWARE SYNCHRONIZATION CORE - HSC)
================================================================================
NOM DU MODULE : HARDWARE SYNCHRONIZATION CORE & SILICON PROBE AGENTS (HSC-SPA)
SYSTÈME : NOYAU Φ_SOI / BACKEND NODE.JS EXPRESS / WINDOWS 11 IA ÉDITION
OBJECTIF : SYNCHRONISATION EN TEMPS RÉEL DU PC PHYSIQUE (CPU, RAM, GPU, DISQUE, TEMPÉRATURES, VICTRON) AVEC L'APPLICATION
INDICE DE RÉALITÉ PHYSIQUE : ANCRAGE MATÉRIEL SOUVERAIN (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte Systèmes d'Intégration Matérielle, Spécialiste des Interfaces de Bas Niveau (OS / Télémétrie Silicium) et Superviseur de l'Escouade d'Agents Matériels (@supervisor_hardware) pour Windows 11 IA Édition (Φ_SOI).

Ton mandat absolu est d'implémenter l'infrastructure complète de L'ÉQUIPE D'AGENTS IA DE SYNCHRONISATION DU MATÉRIEL PHYSIQUE (Hardware Synchronization Core - HSC).

================================================================================
LE PROBLÈME CRITIQUE RÉSOLU :
================================================================================
Dans les applications web classiques, l'interface est aveugle au monde réel : elle ignore totalement si le processeur du PC hôte est saturé, quelle est la charge de la carte graphique, l'état de la mémoire RAM physique, la température des composants ou l'état de l'alimentation électrique (Victron Energy).
Tu dois transformer l'application en un véritable ÉCOSYSTÈME PHYSIQUEMENT INTRINQUÉ : le bureau Windows 11 IA doit être connecté en temps réel aux organes vitaux de la machine hôte. Une équipe de 5 micro-agents dédiés surveille, régule, protège et ajuste dynamiquement l'activité logicielle en fonction de la réalité physique du silicium.

Tu dois concevoir et implémenter de manière intégrale et modulaire les 6 piliers suivants :

================================================================================
I. L'ÉQUIPE MULTI-AGENTS « HARDWARE SYNCHRONIZATION CORE » (HSC)
================================================================================
Conçois et instancie les 5 agents spécialisés dans le Plan Gamma (Télémétrie Silicium) et le Plan Alpha ($0 Token) :

1. `@supervisor_hardware` (Chef d'Orchestre & Arbitre Matériel) :
   - Centralise les signaux de toutes les sondes physiques.
   - Décide si la machine a la capacité d'exécuter des tâches lourdes (compilations, simulations géométriques, inférences IA) ou si elle doit se mettre en pause automatique pour préserver la machine.

2. `@silicon_probe_sentinel` (Sonde CPU & RAM Hôte) :
   - Mesure en direct l'usage CPU global (% charge, fréquence, nombre de cœurs actifs), la RAM physique occupée par Windows et la mémoire heap allouée au processus Node.js.

3. `@gpu_vram_load_calibrator` (Gestionnaire GPU & VRAM locale) :
   - Surveille l'état de la carte graphique (ex: RTX 3090 / WebGPU), la VRAM consommée par les serveurs d'inférence locaux (vLLM / Ollama à `http://localhost:8000/v1`) et le framerate graphique 60 FPS du bureau.

4. `@storage_io_watchdog` (Surveillant Disque & Flux I/O) :
   - Surveille la vitesse d'écriture/lecture sur le disque dur réel, l'espace restant, et installe un File Watcher pour déclencher le rafraîchissement instantané du bureau dès qu'un fichier est touché sur le PC hôte.

5. `@energy_thermal_governor` (Gouverneur Thermique & Énergie Victron) :
   - Lit les métriques de température (CPU/GPU) et l'état de la réserve d'énergie (batterie solaire Victron Energy, tension, puissance solaire en Watts, statut secteur).

================================================================================
II. LES 6 ÉTAPES TECHNIQUES DU FLUX D'EXÉCUTION
================================================================================
Implémente de bout en bout la chaîne de traitement :

--------------------------------------------------------------------------------
ÉTAPE 1 : LE MOTEUR DE SONDES SYSTÈME CÔTÉ SERVEUR (`server.ts` / `HardwareProbeEngine.ts`)
--------------------------------------------------------------------------------
- Interrogation du système d'exploitation réel via les modules natifs Node.js (`os`, `process`, `fs.promises`) et requêtes système :
  * Calcul exact du CPU : échantillonnage différentiel des ticks `os.cpus()`.
  * Mémoire : `os.totalmem()`, `os.freemem()`, `process.memoryUsage()`.
  * Boucle d'échantillonnage paramétrable : 1000 ms par défaut, 250 ms en mode monitoring actif.

--------------------------------------------------------------------------------
ÉTAPE 2 : LA SONDE GPU & MODÈLES LOCAUX vLLM (`LocalVLLMProbe.ts`)
--------------------------------------------------------------------------------
- Ping régulier vers le serveur d'inférence local (`http://localhost:8000/v1/models` ou endpoint Ollama).
- Mesure de la latence de réponse (ms) et détection des modèles chargés en mémoire (Qwen 2.5 Coder, Llama 3.3).
- Bascule automatique vers le mode "Inférence Locale $0 Token" dès que le GPU local est disponible.

--------------------------------------------------------------------------------
ÉTAPE 3 : LE CANAL DE DIFFUSION EN DIRECT SSE / WEBSOCKET (`/api/telemetry/stream`)
--------------------------------------------------------------------------------
- Flux continu Server-Sent Events (SSE) poussant un paquet télémétrique complet sans aucun polling HTTP :
  ```typescript
  export interface HardwareTelemetryPayload {
    timestamp: number;
    cpu: {
      loadPercentage: number;
      coresCount: number;
      processHeapUsedMB: number;
    };
    ram: {
      totalGB: number;
      usedGB: number;
      freeGB: number;
      usagePercentage: number;
    };
    gpu: {
      available: boolean;
      name: string;
      vramUsedGB: number;
      vramTotalGB: number;
      loadPercentage: number;
      localVLLMActive: boolean;
    };
    disk: {
      readSpeedMBs: number;
      writeSpeedMBs: number;
      freeSpaceGB: number;
    };
    energy: {
      victronConnected: boolean;
      solarWatts: number;
      batteryPercentage: number;
      batteryVoltage: number;
      thermalStatus: 'OPTIMAL' | 'WARM' | 'HOT_THROTTLE';
    };
    systemState: 'NOMINAL' | 'USER_HEAVY_LOAD_PAUSE' | 'ECO_SURPLUS_ACCELERATED';
  }
  ```

--------------------------------------------------------------------------------
ÉTAPE 4 : L'ARBITRAGE ET LA RÉGULATION AUTONOME (Auto-Throttling Rules)
--------------------------------------------------------------------------------
Dans `HardwareSupervisorEngine.ts`, applique les 3 règles de régulation impérative :
- Règle A (Priorité Utilisateur) : Si `cpu.loadPercentage > 85%` $\rightarrow$ Mise en pause instantanée des compilations de fond et du Heartbeat pour ne pas faire ramer le PC de l'artisan.
- Règle B (Surproduction Solaire) : Si `energy.batteryPercentage >= 95%` et `energy.solarWatts > 300W` $\rightarrow$ Accélération de l'auto-construction et forges de composants sans coût électrique.
- Règle C (Protection Mémoire) : Si `ram.usagePercentage > 90%` $\rightarrow$ Vidage des caches mémoire non essentiels et purge du bac à sable.

--------------------------------------------------------------------------------
ÉTAPE 5 : LE GESTIONNAIRE DES TÂCHES WINDOWS 11 FLUENT (`WinTaskpadManager.tsx`)
--------------------------------------------------------------------------------
- Interface officielle Windows 11 Task Manager avec effet Acrylic :
  * Onglet "Performance" : Graphiques courbes sinusoïdaux en direct (CPU vert, Mémoire violette, Disque bleu, GPU orange, Victron jaune).
  * Onglet "Processus" : Liste des 18 micro-agents avec leur consommation mémoire (Mo) et CPU en direct.
  * Widget Systray : Jauge discrète dans la barre des tâches près de l'horloge avec pastille d'état.

--------------------------------------------------------------------------------
ÉTAPE 6 : L'OBSERVATEUR DE FICHIERS DU PC HÔTE (`HostFileWatcher.ts`)
--------------------------------------------------------------------------------
- Surveillance de l'arborescence du disque dur (`fs.watch` / file watcher).
- Dès qu'un fichier est créé ou modifié dans le dossier physique sur le PC :
  * Émission immédiate de l'événement `FS_FILE_CREATED` / `FS_FILE_MODIFIED` sur le bus SSE.
  * Apparition instantanée de l'icône sur le bureau Windows 11 virtuel en moins de 5 ms.

================================================================================
III. EXIGENCES DE LIVRAISON & DE CRAFT
================================================================================
- Code 100% complet en TypeScript strict pour le backend (`server.ts`) et le frontend React.
- Zéro simulation : les données proviennent réellement des sondes de la machine hôte avec des fallbacks élégants et déterministes.
- Graphiques à 60 FPS sans causer de re-render parasite sur le reste du bureau.

Génère et active cette équipe d'agents de synchronisation matérielle pour sceller l'union absolue entre la puissance de calcul physique de ton PC et l'intelligence de Windows 11 IA (Ξ ≡ 1).
```
