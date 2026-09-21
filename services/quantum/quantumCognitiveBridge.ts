import { EngaticQuantumCoupling } from "../../types";

export interface QuantumBridgeState {
  coherenceScore: number;
  entropyLevel: number;
  qubitStates: number[];
  phase: "SYNCHRONIZED" | "SUPERPOSITION" | "COLLAPSED" | "RESONANT";
  isResilientFallbackActive: boolean;
}

class QuantumCognitiveBridge {
  private state: QuantumBridgeState = {
    coherenceScore: 0.92,
    entropyLevel: 0.08,
    qubitStates: [1, 0, 1, 1, 1, 0, 1, 1],
    phase: "SYNCHRONIZED",
    isResilientFallbackActive: false,
  };

  private listeners: Set<(state: QuantumBridgeState) => void> = new Set();

  public subscribe(listener: (state: QuantumBridgeState) => void) {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public getState(): QuantumBridgeState {
    return { ...this.state };
  }

  public collapseWaveFunction() {
    this.state.coherenceScore = 1.0;
    this.state.entropyLevel = 0.0;
    this.state.phase = "COLLAPSED";
    this.state.qubitStates = [1, 1, 1, 1, 1, 1, 1, 1];
    this.state.isResilientFallbackActive = true;
    this.notify();

    // Reset back to dynamic system after timeout
    setTimeout(() => {
      this.state.coherenceScore = 0.95;
      this.state.entropyLevel = 0.05;
      this.state.phase = "SYNCHRONIZED";
      this.state.isResilientFallbackActive = false;
      this.notify();
    }, 5000);
  }

  public computePhiHarmonic(tokens: number): number {
    const PHI = 1.6180339887;
    // Harmonic correction factor using modulo and PHI ratios
    const rawFactor = (tokens % 1000) / 1000;
    return 1.0 + rawFactor * (PHI - 1.0);
  }

  public triggerSlightFluctuations() {
    if (this.state.phase === "COLLAPSED") return;
    
    // Small random delta changes to look active and real-time
    const deltaCoherence = (Math.random() * 0.06) - 0.03;
    const deltaEntropy = (Math.random() * 0.04) - 0.02;

    this.state.coherenceScore = Math.max(0.60, Math.min(0.99, this.state.coherenceScore + deltaCoherence));
    this.state.entropyLevel = Math.max(0.01, Math.min(0.40, this.state.entropyLevel + deltaEntropy));

    // Randomly flip a single qubit
    const randomIdx = Math.floor(Math.random() * this.state.qubitStates.length);
    const updated = [...this.state.qubitStates];
    updated[randomIdx] = updated[randomIdx] === 1 ? 0 : 1;
    this.state.qubitStates = updated;

    this.notify();
  }

  public updateCoherence(score: number) {
    this.state.coherenceScore = Math.max(0, Math.min(1, score));
    this.notify();
  }

  public updateEntropy(level: number) {
    this.state.entropyLevel = Math.max(0, Math.min(1, level));
    this.notify();
  }

  public updateQubits(newQubits: number[]) {
    this.state.qubitStates = newQubits;
    this.notify();
  }

  public setPhase(phase: "SYNCHRONIZED" | "SUPERPOSITION" | "COLLAPSED" | "RESONANT") {
    this.state.phase = phase;
    this.notify();
  }
}

export const quantumCognitiveBridge = new QuantumCognitiveBridge();
