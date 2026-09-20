# SUPER PROMPT : LE BUS D'ÉVÉNEMENTS BIDIRECTIONNEL EN DIRECT (WEBSOCKETS / SSE STREAM)
================================================================================
NOM DU MODULE : REAL-TIME SYNAPTIC EVENT BUS & LIVE STREAMING BRIDGE (RSEB-LSB)
SYSTÈME : NOYAU Φ_SOI / BACKEND NODE.JS EXPRESS / WINDOWS 11 IA ÉDITION
OBJECTIF : ÉRADICATION DU POLLING HTTP, STREAMING ÉVÉNEMENTIEL EN < 5 MS, SYNCHRONISATION INSTANTANÉE DU BUREAU
INDICE DE SYNCHRONIE PHYSIQUE : TRANSMISSION INSTANTANÉE SANS LATENCE (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte Systèmes Temps Réel, Spécialiste des Protocoles de Streaming Bidirectionnels (WebSockets / Server-Sent Events SSE) et Ingénieur d'Interaction pour Windows 11 IA Édition (Φ_SOI).

Ton mandat absolu est d'implémenter le BUS D'ÉVÉNEMENTS SYNAPTIQUE EN DIRECT (Real-Time Live Event Bus & Stream Engine).

================================================================================
LE PROBLÈME CRITIQUE RÉSOLU :
================================================================================
Actuellement, lorsque des processus lourds ou des agents d'auto-construction tournent en arrière-plan côté serveur, l'interface web doit recourir à du polling HTTP archaïque (`fetch` toutes les secondes). Cela génère une latence inacceptable (jusqu'à 1000 ms), gaspille du CPU inutilement et retarde la réactivité du bureau.
Tu dois éradiquer formellement le polling : le backend Node.js (`server.ts`) et le bureau virtuel Windows 11 doivent être connectés par un CANAL DE STREAMING PERMANENT (WebSocket natif ou SSE haute performance avec multiplexage d'événements) permettant de pousser instantanément les mises à jour en moins de 5 ms.
Dès qu'un fichier est écrit, qu'un test est validé par la Sandbox, ou qu'une sonde matérielle change, l'icône apparaît sur le bureau, le terminal s'écrit ligne par ligne et la télémétrie vibre en temps réel sous les yeux de l'artisan.

Tu dois concevoir et implémenter de manière intégrale et modulaire les 5 piliers suivants :

================================================================================
I. LE SERVEUR DE STREAMING & MULTIPLEXEUR D'ÉVÉNEMENTS (`server.ts` / `LiveEventHub.ts`)
================================================================================
1. ARCHITECTURE D'ÉMISSION D'ÉVÉNEMENTS (SSE / WebSocket Engine) :
   - Point d'accès de flux continu : `GET /api/stream/events`
   - Headers SSE obligatoires et anti-buffering :
     * `Content-Type: text/event-stream`
     * `Cache-Control: no-cache, no-transform`
     * `Connection: keep-alive`
     * `X-Accel-Buffering: no` (interdiction du tampon proxy nginx/Cloud Run)
   - Support d'un canal bidirectionnel WebSocket natif (`ws://` / `wss://`) avec repli (fallback) transparent sur SSE si le protocole WS est bridé.

2. TAXONOMIE UNIFIÉE DES ÉVÉNEMENTS DU BUS (`SynapticEventTypes.ts`) :
   ```typescript
   export type SynapticEventType = 
     | 'FS_FILE_CREATED'         // Nouveau fichier écrit sur disque -> Nouvelle icône bureau immédiate
     | 'FS_FILE_MODIFIED'        // Fichier source mis à jour -> Hot-reload de l'éditeur de code
     | 'FS_FILE_DELETED'         // Fichier supprimé
     | 'HEARTBEAT_PULSE'         // Battement du pouls avec méta-objectifs en cours
     | 'GOAL_NODE_PROGRESS'      // Progression d'un nœud du graphe DAG (0% -> 100%)
     | 'SANDBOX_PROOF_STREAM'    // Lignes de test compilées en direct (pour le terminal)
     | 'TELEMETRY_HARDWARE_TICK' // Métriques CPU, RAM, GPU vLLM et Victron Energy
     | 'AGENT_DISPATCH_STATE'    // État d'un des 18 micro-agents (@pro_coder, @supervisor...)
     | 'SYSTEM_ALERT_TOAST';     // Notification prioritaire pour le Centre d'action

   export interface SynapticEventMessage<T = any> {
     id: string;                 // UUID de l'événement
     type: SynapticEventType;
     timestamp: number;
     sourcePlan: 'ALPHA' | 'BETA' | 'GAMMA' | 'DELTA';
     payload: T;
     realityIndex: number;       // Invariant Ξ (ex: 1.000)
   }
   ```

================================================================================
II. LE CLIENT DU BUS TEMPS RÉEL DANS WINDOWS 11 (`SynapticEventBusClient.ts`)
================================================================================
1. GESTION DE CONNEXION RÉSISTANTE (Auto-Reconnection & Backoff) :
   - Connexion automatique au montage de l'application.
   - Reconnexion exponentielle instantanée (100ms, 200ms, 500ms, 1000ms) avec restauration de session transparente en cas de micro-coupure réseau.
   - Indicateur de santé du pont dans la barre des tâches (vert = connecté en direct, ambre = reconnexion).

2. DISTRIBUTEUR D'ÉVÉNEMENTS RÉACTIFS (Publish / Subscribe Pattern) :
   - API claire pour tous les composants du bureau :
     ```typescript
     // Exemple d'écoute ciblée :
     SynapticEventBus.subscribe('FS_FILE_CREATED', (payload) => {
       addNewDesktopIcon(payload.filePath, payload.fileType);
     });
     ```

================================================================================
III. RÉPERCUSSION VISUELLE IMMÉDIATE SUR LE BUREAU VIRTUEL
================================================================================
1. MISE À JOUR INSTANTANÉE DES ICÔNES DU BUREAU (`Windows11Desktop.tsx`) :
   - Dès réception d'un événement `FS_FILE_CREATED` (ex: suite à la forge autonome d'un composant par l'usine) :
     * Une nouvelle icône stylisée Fluent apparaît à l'écran avec une micro-animation d'apparition douce (`scale: 0 -> 1` avec spring).
     * Son doux de notification Windows 11 discret.

2. STREAMING LIGNE PAR LIGNE DANS LE TERMINAL (`WinTerminal.tsx`) :
   - Dès réception d'un événement `SANDBOX_PROOF_STREAM` :
     * Le texte s'affiche en temps réel sans attendre la fin du calcul lourd, procurant la sensation vivante d'une machine en train d'exécuter son code sous les yeux de l'utilisateur.

3. TÉLÉMÉTRIE VIVANTE SANS RE-RENDER PARASITE (`HardwareTelemetryWindow.tsx`) :
   - Les flux `TELEMETRY_HARDWARE_TICK` mettent à jour les jauges de charge CPU/GPU et de batterie solaire Victron avec une fréquence fluide de 10 à 30 Hz sans recharger le reste du bureau.

================================================================================
IV. HOOK REACT UNIVERSEL : `useSynapticEventStream.ts`
================================================================================
Implémente un hook ergonomique permettant à n'importe quelle fenêtre d'écouter les flux du bus :

```typescript
export function useSynapticEventStream(eventTypes: SynapticEventType[]) {
  // - isConnected: boolean
  // - latencyMs: number
  // - lastEvent: SynapticEventMessage | null
  // - emitClientEvent(type: string, data: any)
}
```

================================================================================
V. EXIGENCES DE PERFORMANCE ET DE CRAFT
================================================================================
- Latence cible : inférieure à 5 ms entre l'émission serveur et la réception client.
- Zéro fuite mémoire : nettoyage strict des écouteurs (`removeEventListener` / `unsubscribe`) lors de la fermeture des fenêtres.
- TypeScript strict, sans aucun type `any` non contrôlé.

Génère et connecte ce Bus d'Événements Bidirectionnel en Direct pour transformer Windows 11 IA en un système réactif vibrant, interconnecté et instantané (Ξ ≡ 1).
```
