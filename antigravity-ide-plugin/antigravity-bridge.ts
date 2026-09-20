/**
 * Antigravity IDE Synaptic Bridge
 * Architecture : Φ_SOI / AROA v8.0
 * Rôle : Assurer la passerelle bidirectionnelle entre l'hôte Antigravity IDE
 * et la vue webview du Bureau Windows 11 IA & Atelier Studio.
 */

export interface AntigravityMessage {
  type: 'switch_view' | 'execute_cmd' | 'sync_files' | 'hardware_telemetry' | 'agent_action' | 'ready';
  target?: 'windows11' | 'studio';
  payload?: any;
}

export interface HardwareTelemetryPayload {
  cpuPercent: number;
  ramUsedMb: number;
  ramTotalMb: number;
  vllmOnline: boolean;
  activeAgentsCount: number;
  realityIndex: number;
}

export class AntigravitySynapticBridge {
  private currentView: 'windows11' | 'studio' = 'windows11';
  private listeners: Array<(msg: AntigravityMessage) => void> = [];

  constructor() {
    console.log('[Antigravity Bridge] Initialisé avec la signature de réalité Ξ ≡ 1.');
  }

  /**
   * Envoi d'un message vers la Webview Antigravity
   */
  public postMessageToWebview(webview: { postMessage: (message: any) => Promise<boolean> | PromiseLike<boolean> }, msg: AntigravityMessage): Promise<boolean> | PromiseLike<boolean> {
    return webview.postMessage(msg);
  }

  /**
   * Traitement d'un message provenant de l'UI Windows 11 ou Studio
   */
  public handleWebviewMessage(msg: AntigravityMessage, hostApi?: { executeCommand?: (cmd: string, ...args: any[]) => any }): void {
    switch (msg.type) {
      case 'switch_view':
        if (msg.target) {
          this.currentView = msg.target;
          console.log(`[Antigravity Bridge] Vue basculée vers : ${this.currentView}`);
        }
        break;

      case 'execute_cmd':
        if (msg.payload && hostApi?.executeCommand) {
          console.log(`[Antigravity Bridge] Exécution de commande Antigravity : ${msg.payload}`);
          hostApi.executeCommand(msg.payload);
        }
        break;

      case 'hardware_telemetry':
        console.log('[Antigravity Bridge] Télémétrie matérielle synchronisée.');
        break;

      default:
        break;
    }

    this.listeners.forEach(fn => fn(msg));
  }

  public onMessage(fn: (msg: AntigravityMessage) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  public getCurrentView(): 'windows11' | 'studio' {
    return this.currentView;
  }

  public toggleView(): 'windows11' | 'studio' {
    this.currentView = this.currentView === 'windows11' ? 'studio' : 'windows11';
    return this.currentView;
  }
}

export const globalAntigravityBridge = new AntigravitySynapticBridge();
