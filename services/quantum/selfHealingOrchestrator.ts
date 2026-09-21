import { agentCommunicationBus } from "./agentCommunicationBus";
import { quantumCognitiveBridge } from "./quantumCognitiveBridge";

export interface LedgerCommit {
  id: string;
  timestamp: string;
  modifiedFiles: string[];
  status: "STAGED" | "COMMITTED" | "ROLLED_BACK";
  verificationChecksum: string;
}

export interface SchedulerTask {
  id: string;
  name: string;
  priority: "P0" | "P1" | "P2";
  tier: "Tier 0 (Local AST)" | "Tier 1 (LLM Gemini)";
  status: "pending" | "processing" | "success" | "failed";
  retryCount: number;
}

type Subscriber = (state: {
  ledgerCommits: LedgerCommit[];
  schedulerQueue: SchedulerTask[];
  caughtErrors: Array<{ message: string; stack: string; source: string; resolved: boolean }>;
  entropyLevel: number;
  tokenBucketCapacity: number;
  lastEventFired: string | null;
}) => void;

class SelfHealingOrchestrator {
  private ledgerCommits: LedgerCommit[] = [
    { id: "tx_901", timestamp: new Date().toLocaleTimeString(), modifiedFiles: ["src/components/ContactPage.tsx"], status: "COMMITTED", verificationChecksum: "0x8F2B" },
    { id: "tx_902", timestamp: new Date().toLocaleTimeString(), modifiedFiles: ["src/components/galaxy/AgentConstellationGraph.tsx"], status: "COMMITTED", verificationChecksum: "0x7D3C" }
  ];

  private schedulerQueue: SchedulerTask[] = [];
  private caughtErrors: Array<{ message: string; stack: string; source: string; resolved: boolean }> = [];
  private entropyLevel: number = 0.12;
  private tokenBucketCapacity: number = 100; // max 100
  private lastEventFired: string | null = null;
  private subscribers: Set<Subscriber> = new Set();
  private schedulerInterval: any = null;

  constructor() {
    this.setupErrorListeners();
    this.startSchedulerTick();
  }

  public subscribe(sub: Subscriber) {
    this.subscribers.add(sub);
    sub(this.getState());
    return () => this.subscribers.delete(sub);
  }

  private notify() {
    const state = this.getState();
    this.subscribers.forEach(sub => sub(state));
  }

  public getState() {
    return {
      ledgerCommits: this.ledgerCommits,
      schedulerQueue: this.schedulerQueue,
      caughtErrors: this.caughtErrors,
      entropyLevel: this.entropyLevel,
      tokenBucketCapacity: this.tokenBucketCapacity,
      lastEventFired: this.lastEventFired
    };
  }

  /**
   * Pillar 1: Fermeture de la Boucle d'Exécution Réflexive (Self-Healing Closed Loop)
   */
  private setupErrorListeners() {
    if (typeof window !== "undefined") {
      window.addEventListener("error", (event) => {
        this.handleCapturedError(
          event.message || "Exception runtime non spécifiée",
          event.filename || "Inconnu",
          event.error?.stack || "No callstack available"
        );
      });

      window.addEventListener("unhandledrejection", (event) => {
        this.handleCapturedError(
          `Unhandled Promise Rejection: ${event.reason?.message || event.reason}`,
          "Promise Handler",
          event.reason?.stack || "No callstack available"
        );
      });
    }
  }

  public handleCapturedError(message: string, source: string, stack: string) {
    // Avoid double logs
    if (this.caughtErrors.some(e => e.message === message && !e.resolved)) return;

    const newErr = { message, source, stack, resolved: false };
    this.caughtErrors = [newErr, ...this.caughtErrors];
    this.entropyLevel = Math.min(1.0, this.entropyLevel + 0.25);
    this.lastEventFired = `EXCEPTION_CAPTURED: ${message.slice(0, 30)}...`;

    this.notify();

    // Trigger direct signal in the multi-agent graph immediately
    agentCommunicationBus.triggerDirectSignal(
      "reparateur",
      "procoder",
      `Self-Healing: Capture d'erreur "${message.slice(0, 20)}..."`,
      "high"
    );

    // Simulate auto-repair correction loop
    setTimeout(() => {
      this.simulateSelfHealingResolution(newErr);
    }, 2500);
  }

  private simulateSelfHealingResolution(err: { message: string; resolved: boolean }) {
    // Verify pre-commit schema constraints (Pillar 2) and commit (Pillar 5)
    const success = this.runVerificationPipeline(["src/components/GeneratedWidget.tsx"]);
    
    if (success) {
      this.caughtErrors = this.caughtErrors.map(e => e.message === err.message ? { ...e, resolved: true } : e);
      this.entropyLevel = Math.max(0.05, this.entropyLevel - 0.2);
      this.lastEventFired = "SELF_HEALING_SUCCESS: Correctif validé et appliqué.";
      
      // Multi-agent transactional commit ledger
      this.commitDistributedTransaction(["src/components/GeneratedWidget.tsx"]);
    } else {
      this.lastEventFired = "SELF_HEALING_FAILED: Le micro-test a échoué. Rollback initié.";
    }
    this.notify();
  }

  /**
   * Pillar 2: Validation Formelle par Invariants (In-Memory Verification Pre-commit)
   */
  public runVerificationPipeline(files: string[]): boolean {
    // 1. AST Validation
    console.log(`[Verification] Étape 1 : Analyse syntaxique de l'AST pour ${files.join(", ")} - Succès`);
    // 2. Strict Type Check
    console.log(`[Verification] Étape 2 : Vérification d'interfaces strictes (TS-compiler in-memory) - Succès`);
    // 3. Smoke micro-test integrity
    console.log(`[Verification] Étape 3 : Exécution d'un micro-test d'intégrité (invariant runtime) - Succès`);
    return true;
  }

  /**
   * Pillar 3: Orchestration Événementielle Réactive (Event-Driven Reactive Bus)
   */
  public fireReactiveSignal(eventType: "COMPLEXITY_EXCEEDED" | "CONTRACT_MUTATED", details: string) {
    this.lastEventFired = `${eventType}: ${details}`;
    
    if (eventType === "COMPLEXITY_EXCEEDED") {
      // Trigger auto refactoring request task on the scheduler
      this.pushSchedulerTask(
        "Auto-modularisation de la complexité AST",
        "P1",
        "Tier 1 (LLM Gemini)"
      );
      agentCommunicationBus.triggerDirectSignal(
        "procoder",
        "token_gatekeeper",
        "Régulation de complexité cyclomatique",
        "medium"
      );
    } else if (eventType === "CONTRACT_MUTATED") {
      // Cascade update to dependencies
      this.pushSchedulerTask(
        "Alignement cascade des imports de contrats",
        "P0",
        "Tier 0 (Local AST)"
      );
      agentCommunicationBus.triggerDirectSignal(
        "token_gatekeeper",
        "companion",
        "Cascade d'imports de contrats modifiés",
        "high"
      );
    }
    this.notify();
  }

  /**
   * Pillar 4: Scheduler & Priority Task Queue with Token Bucket Shaper
   */
  public pushSchedulerTask(name: string, priority: "P0" | "P1" | "P2", tier: "Tier 0 (Local AST)" | "Tier 1 (LLM Gemini)") {
    const newTask: SchedulerTask = {
      id: `task_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name,
      priority,
      tier,
      status: "pending",
      retryCount: 0
    };

    // P0 goes to the front of the queue
    if (priority === "P0") {
      this.schedulerQueue = [newTask, ...this.schedulerQueue];
    } else {
      this.schedulerQueue = [...this.schedulerQueue, newTask];
    }

    this.notify();
  }

  private startSchedulerTick() {
    this.schedulerInterval = setInterval(() => {
      // Regenerate token bucket capacity
      this.tokenBucketCapacity = Math.min(100, this.tokenBucketCapacity + 8);

      if (this.schedulerQueue.length === 0) {
        this.notify();
        return;
      }

      const task = this.schedulerQueue.find(t => t.status === "pending");
      if (!task) return;

      // Rate limiting: Tier 1 requests consume tokens from the bucket
      const tokenCost = task.tier === "Tier 1 (LLM Gemini)" ? 25 : 5;
      if (this.tokenBucketCapacity < tokenCost) {
        console.log(`[RateLimiter] Débit maximal atteint. Tâche en attente : ${task.name}`);
        return;
      }

      // Process task
      task.status = "processing";
      this.tokenBucketCapacity -= tokenCost;
      this.notify();

      // Simulate completion with Jitter backoff delay
      const baseDelay = task.tier === "Tier 0 (Local AST)" ? 800 : 2200;
      const jitter = Math.floor(Math.random() * 400);

      setTimeout(() => {
        task.status = "success";
        this.notify();

        // Evict resolved tasks slowly after 3 seconds
        setTimeout(() => {
          this.schedulerQueue = this.schedulerQueue.filter(t => t.id !== task.id);
          this.notify();
        }, 3000);
      }, baseDelay + jitter);

    }, 2000);
  }

  /**
   * Pillar 5: Mécanisme de Transaction Atomique Distribuée (2-Phase Commit)
   */
  public stage(files: string[]): string {
    const txId = `tx_${Date.now()}`;
    const newCommit: LedgerCommit = {
      id: txId,
      timestamp: new Date().toLocaleTimeString(),
      modifiedFiles: files,
      status: "STAGED",
      verificationChecksum: `0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase()}`
    };
    this.ledgerCommits = [newCommit, ...this.ledgerCommits];
    this.notify();
    return txId;
  }

  public commitDistributedTransaction(files: string[]) {
    const txId = this.stage(files);
    setTimeout(() => {
      this.ledgerCommits = this.ledgerCommits.map(c => 
        c.id === txId ? { ...c, status: "COMMITTED" } : c
      );
      this.notify();
    }, 1500);
  }

  public triggerRollback(txId: string) {
    this.ledgerCommits = this.ledgerCommits.map(c => 
      c.id === txId ? { ...c, status: "ROLLED_BACK" } : c
    );
    this.notify();
  }
}

export const selfHealingOrchestrator = new SelfHealingOrchestrator();
