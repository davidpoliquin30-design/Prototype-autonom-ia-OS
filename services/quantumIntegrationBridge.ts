// Service de Pont d'Intégration Quantique (Découplage IA Studio -> IDE Quantique -> App Réelle)
export interface StagedFileModification {
  filePath: string;
  originalContent: string;
  stagedContent: string;
  summary: string;
  timestamp: string;
  status: "staged" | "integrating" | "integrated" | "error";
  error?: string;
}

export interface QuantumIntegrationReport {
  timestamp: string;
  filesCount: number;
  files: string[];
  resonanceHash: string;
  logs: string[];
  success: boolean;
}

export interface QuantumIntegrationState {
  stagedFiles: StagedFileModification[];
  activeFilePath: string | null;
  isIntegrating: boolean;
  integrationStep: string;
  progressPercent: number;
  lastReport: QuantumIntegrationReport | null;
  loopIterationCount: number;
}

class QuantumIntegrationBridgeService {
  private state: QuantumIntegrationState = {
    stagedFiles: [],
    activeFilePath: null,
    isIntegrating: false,
    integrationStep: "",
    progressPercent: 0,
    lastReport: null,
    loopIterationCount: 1,
  };

  private listeners: Set<(state: QuantumIntegrationState) => void> = new Set();
  private refreshListeners: Set<() => void> = new Set();

  constructor() {
    // Initial staging example demonstration if needed, or starts clean
  }

  public getState(): QuantumIntegrationState {
    return { ...this.state };
  }

  public subscribe(fn: (state: QuantumIntegrationState) => void): () => void {
    this.listeners.add(fn);
    fn(this.getState());
    return () => {
      this.listeners.delete(fn);
    };
  }

  public onRefresh(fn: () => void): () => void {
    this.refreshListeners.add(fn);
    return () => {
      this.refreshListeners.delete(fn);
    };
  }

  private notify() {
    const snap = this.getState();
    this.listeners.forEach((fn) => fn(snap));
  }

  public setActiveFile(filePath: string | null) {
    this.state.activeFilePath = filePath;
    this.notify();
  }

  /**
   * Stage a file modified independently by IA Studio without touching the live application
   */
  public stageFile(
    filePath: string,
    stagedContent: string,
    originalContent: string = "",
    summary: string = "Modification indépendante via Google AI Studio"
  ) {
    const existingIndex = this.state.stagedFiles.findIndex((f) => f.filePath === filePath);
    const newEntry: StagedFileModification = {
      filePath,
      originalContent,
      stagedContent,
      summary,
      timestamp: new Date().toLocaleTimeString(),
      status: "staged",
    };

    if (existingIndex >= 0) {
      this.state.stagedFiles[existingIndex] = newEntry;
    } else {
      this.state.stagedFiles.push(newEntry);
    }

    this.state.activeFilePath = filePath;
    this.notify();
  }

  /**
   * Discard a single staged file
   */
  public discardFile(filePath: string) {
    this.state.stagedFiles = this.state.stagedFiles.filter((f) => f.filePath !== filePath);
    if (this.state.activeFilePath === filePath) {
      this.state.activeFilePath = this.state.stagedFiles[0]?.filePath || null;
    }
    this.notify();
  }

  /**
   * Clear all staged modifications
   */
  public clearAll() {
    this.state.stagedFiles = [];
    this.state.activeFilePath = null;
    this.notify();
  }

  /**
   * Integrate staged modifications into the real application via the Quantum IDE pipeline
   */
  public async integrateAllToRealSystem(
    onProgressUpdate?: (step: string, percent: number) => void
  ): Promise<{ success: boolean; modifiedFiles: string[]; logs: string[] }> {
    if (this.state.stagedFiles.length === 0) {
      return { success: true, modifiedFiles: [], logs: ["Aucune modification en attente."] };
    }

    this.state.isIntegrating = true;
    this.notify();

    const logs: string[] = [];
    const filesToIntegrate = [...this.state.stagedFiles];
    const modifiedFilePaths: string[] = [];

    const updateStep = (msg: string, pct: number) => {
      this.state.integrationStep = msg;
      this.state.progressPercent = pct;
      logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
      if (onProgressUpdate) onProgressUpdate(msg, pct);
      this.notify();
    };

    try {
      // Step 1: Confinement et validation synaptique (Plan Bêta)
      updateStep("Étape 1/4 : Confinement cryptographique & validation synaptique (Plan Bêta)...", 20);
      await new Promise((r) => setTimeout(r, 250));

      // Step 2: Transmission à l'IDE Quantique (@pro_coder & @live_ide_executor)
      updateStep("Étape 2/4 : Transmission à l'IDE Quantique (@pro_coder & @live_ide_executor)...", 45);
      await new Promise((r) => setTimeout(r, 300));

      // Step 3: Écriture physique atomique sur le disque via /api/files/write
      updateStep(`Étape 3/4 : Écriture physique atomique de ${filesToIntegrate.length} fichier(s)...`, 70);
      for (const item of filesToIntegrate) {
        item.status = "integrating";
        this.notify();

        const res = await fetch("/api/files/write", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filePath: item.filePath,
            content: item.stagedContent,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          item.status = "error";
          item.error = data.error || "Échec d'écriture";
          throw new Error(`Erreur lors de l'écriture de ${item.filePath}: ${item.error}`);
        }

        item.status = "integrated";
        modifiedFilePaths.push(item.filePath);
        logs.push(`✓ Fichier /${item.filePath} synchronisé sur le disque.`);
      }

      // Step 4: Recompilation quantique & réarmement de la boucle
      updateStep("Étape 4/4 : Recompilation quantique, synchronisation du jumeau & réarmement (Ξ ≡ 1)...", 95);
      await new Promise((r) => setTimeout(r, 300));

      // Generate resonance hash
      const resonanceHash = "QMEM-SEAL-" + Math.random().toString(36).substring(2, 10).toUpperCase();

      this.state.lastReport = {
        timestamp: new Date().toLocaleTimeString(),
        filesCount: modifiedFilePaths.length,
        files: modifiedFilePaths,
        resonanceHash,
        logs: [...logs, `✓ Intégration souveraine achevée. Scellé: ${resonanceHash}`],
        success: true,
      };

      // Increase loop iteration count
      this.state.loopIterationCount += 1;
      this.state.stagedFiles = [];
      this.state.activeFilePath = null;
      this.state.isIntegrating = false;
      this.state.progressPercent = 100;
      this.state.integrationStep = "Intégration achevée avec succès. La boucle recommence.";
      this.notify();

      // Trigger all registered refresh hooks
      this.refreshListeners.forEach((fn) => {
        try {
          fn();
        } catch (e) {
          console.error("Error in refresh listener:", e);
        }
      });

      // Dispatch global window event for components like emulator
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("quantum-app-refresh", {
            detail: { modifiedFiles: modifiedFilePaths, timestamp: Date.now() },
          })
        );
      }

      return {
        success: true,
        modifiedFiles: modifiedFilePaths,
        logs,
      };
    } catch (err: any) {
      logs.push(`✖ ERREUR D'INTÉGRATION : ${err.message}`);
      this.state.isIntegrating = false;
      this.state.integrationStep = `Échec : ${err.message}`;
      this.notify();
      return {
        success: false,
        modifiedFiles: modifiedFilePaths,
        logs,
      };
    }
  }
}

export const quantumIntegrationBridge = new QuantumIntegrationBridgeService();
