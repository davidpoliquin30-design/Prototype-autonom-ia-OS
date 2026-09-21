/**
 * Permanent Evolution Memory Service for Φ_SOI
 * Maintains an immutable, permanent historical record of all application evolutions,
 * autonomous modifications, agentic interventions, and prompt milestones.
 */

export interface EvolutionRecord {
  id: string;
  timestamp: string;
  version: string;
  title: string;
  prompt: string;
  category: "architecture" | "hardware_telemetry" | "autonomy_alignment" | "api_pairing" | "ux_synchronization" | "feature" | "refactor" | "fix";
  agentsInvolved: string[];
  targetFiles: string[];
  realityIndex: number;
  confidenceScore: number;
  summary: string;
  diffSummary?: string;
  linterPassed?: boolean;
}

class PermanentEvolutionMemoryService {
  private memoryCache: EvolutionRecord[] = [];
  private isLoaded: boolean = false;
  private subscribers: Array<(records: EvolutionRecord[]) => void> = [];

  constructor() {
    this.loadInitialMemory();
  }

  /**
   * Loads permanent evolution records from server API and localStorage mirror
   */
  public async loadInitialMemory(): Promise<EvolutionRecord[]> {
    try {
      const res = await fetch("/api/evolution-memory");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          this.memoryCache = data;
          this.isLoaded = true;
          this.syncToLocalStorage();
          this.notify();
          return this.memoryCache;
        }
      }
    } catch (err) {
      console.warn("[EvolutionMemory] Impossible de joindre l'API, chargement du miroir local:", err);
    }

    // Fallback to local storage mirror
    try {
      const saved = localStorage.getItem("phi_soi_evolution_memory");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryCache = parsed;
          this.isLoaded = true;
          this.notify();
          return this.memoryCache;
        }
      }
    } catch (_) {}

    return this.memoryCache;
  }

  /**
   * Records a new permanent evolution milestone
   */
  public async recordEvolution(evolution: Omit<EvolutionRecord, "id" | "timestamp" | "realityIndex"> & { realityIndex?: number }): Promise<EvolutionRecord> {
    const nextIndex = this.memoryCache.length + 1;
    const formattedId = `EVO-${String(nextIndex).padStart(3, "0")}`;
    
    const record: EvolutionRecord = {
      id: formattedId,
      timestamp: new Date().toISOString(),
      realityIndex: evolution.realityIndex ?? 1.0,
      confidenceScore: evolution.confidenceScore ?? 0.98,
      linterPassed: evolution.linterPassed ?? true,
      ...evolution,
    };

    // Prepend or append to local cache
    this.memoryCache.unshift(record);
    this.syncToLocalStorage();
    this.notify();

    // Persist to disk via API
    try {
      await fetch("/api/evolution-memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.warn("[EvolutionMemory] Échec de synchronisation disque immédiate:", err);
    }

    // Emit global event so other components react
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("phi-soi-evolution-recorded", { detail: record }));
    }

    return record;
  }

  /**
   * Retrieves all evolution records
   */
  public getRecords(): EvolutionRecord[] {
    return this.memoryCache;
  }

  /**
   * Subscribes to evolution updates
   */
  public subscribe(callback: (records: EvolutionRecord[]) => void): () => void {
    this.subscribers.push(callback);
    callback(this.memoryCache);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach((cb) => cb(this.memoryCache));
  }

  private syncToLocalStorage() {
    try {
      localStorage.setItem("phi_soi_evolution_memory", JSON.stringify(this.memoryCache));
    } catch (_) {}
  }

  /**
   * Exports full memory as a downloadable JSON snapshot
   */
  public exportMemoryAsJson(): string {
    return JSON.stringify(this.memoryCache, null, 2);
  }
}

export const permanentEvolutionMemory = new PermanentEvolutionMemoryService();
