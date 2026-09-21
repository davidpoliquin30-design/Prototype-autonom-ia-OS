// Service de Flotte Agentique Autonome pour la Passerelle Locale & Matérielle
// Conforme au MASTER PROMPT Φ_SOI / AROA v8.0

export interface BridgeAgent {
  id: string;
  name: string;
  pole: string;
  status: "scanning_autonomous" | "listening" | "enforcing_zero_token" | "routing_ready" | "handshaking";
  directive: string;
  actionsExecuted: number;
  lastSignalTime: string;
}

export interface ConnectedLocalNode {
  nodeId: string;
  hostname: string;
  platform: string;
  ip: string;
  connectedAt: string;
  lastHeartbeat: number;
  status: "active" | "standby" | "disconnected";
  gpu?: {
    name: string;
    vramTotalMb: number;
    vramUsedMb: number;
    temperatureC?: number;
  };
  ollama?: {
    isRunning: boolean;
    models: string[];
    endpoint: string;
  };
  vllm?: {
    isRunning: boolean;
    models: string[];
    endpoint: string;
  };
  hardware?: {
    serialPorts: string[];
    victronConnected: boolean;
    batteryVoltage?: number;
    pvPowerWatts?: number;
  };
}

export interface AgenticBridgeState {
  isAutoPilotActive: boolean;
  lastAutonomousScan: string;
  activeNodesCount: number;
  nodes: ConnectedLocalNode[];
  agents: BridgeAgent[];
  recentAgentLogs: string[];
}

class AutonomousAgenticBridgeFleetService {
  private state: AgenticBridgeState = {
    isAutoPilotActive: true,
    lastAutonomousScan: new Date().toISOString(),
    activeNodesCount: 0,
    nodes: [],
    agents: [
      {
        id: "@local_hardware_scout",
        name: "Local Hardware Scout",
        pole: "Matériel & Découverte",
        status: "scanning_autonomous",
        directive: "Balayage autonome des ports locaux (8000, 11434, 1234, /dev/ttyUSB*)",
        actionsExecuted: 142,
        lastSignalTime: new Date().toLocaleTimeString()
      },
      {
        id: "@tunnel_synapse_agent",
        name: "Tunnel Synapse Agent",
        pole: "Transmission & Tunneling",
        status: "listening",
        directive: "Maintien de la passerelle bi-directionnelle cloud <-> machine locale",
        actionsExecuted: 89,
        lastSignalTime: new Date().toLocaleTimeString()
      },
      {
        id: "@sentinel_guard_agent",
        name: "Sentinel Integrity Guard",
        pole: "Immunité & Sécurité",
        status: "enforcing_zero_token",
        directive: "Contrôle déterministe local sans dépense de jeton & validation SHA-256",
        actionsExecuted: 210,
        lastSignalTime: new Date().toLocaleTimeString()
      },
      {
        id: "@supervisor_autonomous_router",
        name: "Supervisor Autonomous Router",
        pole: "Gouvernance & Routage",
        status: "routing_ready",
        directive: "Arbitrage dynamique entre inférence Cloud Gemini et VRAM GPU locale",
        actionsExecuted: 76,
        lastSignalTime: new Date().toLocaleTimeString()
      }
    ],
    recentAgentLogs: [
      "Initialisation de la flotte agentique autonome...",
      "@local_hardware_scout : Écoute active des pulsations matérielles locales.",
      "@tunnel_synapse_agent : Passerelle de synchronisation opérationnelle.",
      "@sentinel_guard_agent : Verrouillage cryptographique et neutralité de coût (0$).",
      "@supervisor_autonomous_router : Arbitrage dynamique prêt."
    ]
  };

  private listeners: Set<() => void> = new Set();
  private pollInterval: any = null;

  constructor() {
    this.startPolling();
  }

  public getState(): AgenticBridgeState {
    return this.state;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }

  private startPolling(): void {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      this.refreshStatus();
    }, 3000);
    this.refreshStatus();
  }

  public async refreshStatus(): Promise<void> {
    try {
      const res = await fetch("/api/agentic-bridge/status");
      if (res.ok) {
        const data = await res.json();
        if (data.fleet) {
          this.state.isAutoPilotActive = data.fleet.isAutoPilotActive;
          this.state.lastAutonomousScan = data.fleet.lastAutonomousScan;
          this.state.activeNodesCount = data.activeNodesCount || 0;
          this.state.nodes = data.nodes || [];
        }
      }
    } catch (_) {
      // Offline fallback
    }
    this.notify();
  }

  public async triggerAutonomousScan(): Promise<void> {
    this.addLog("⚡ Déclenchement d'un balayage autonome par @local_hardware_scout...");
    try {
      const res = await fetch("/api/agentic-bridge/auto-scan", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        this.state.activeNodesCount = data.activeNodesCount;
        this.addLog(`✅ Balayage terminé : ${data.activeNodesCount} nœud(s) local(aux) détecté(s).`);
      }
    } catch (e: any) {
      this.addLog(`⚠️ Erreur balayage : ${e.message}`);
    }
    this.notify();
  }

  public async toggleAutoPilot(): Promise<boolean> {
    try {
      const res = await fetch("/api/agentic-bridge/toggle-autopilot", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        this.state.isAutoPilotActive = data.isAutoPilotActive;
        this.addLog(
          this.state.isAutoPilotActive
            ? "⚡ Pilote Automatique Activé : La flotte surveille et négocie les ponts locaux sans intervention."
            : "⏸️ Pilote Automatique Mis en Pause."
        );
        this.notify();
        return this.state.isAutoPilotActive;
      }
    } catch (_) {}
    return this.state.isAutoPilotActive;
  }

  public addLog(msg: string): void {
    const time = new Date().toLocaleTimeString();
    this.state.recentAgentLogs.unshift(`[${time}] ${msg}`);
    if (this.state.recentAgentLogs.length > 50) {
      this.state.recentAgentLogs.pop();
    }
    this.notify();
  }
}

export const autonomousAgenticBridgeFleet = new AutonomousAgenticBridgeFleetService();
