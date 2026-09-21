export interface CosmicEngineState {
  cosmicPulseFrequency: number; // Hz
  phiHarmonizationScore: number; // Percentage
  resonanceFactor: number;
}

class CosmicQuantumUnityEngine {
  private state: CosmicEngineState = {
    cosmicPulseFrequency: 64.8,
    phiHarmonizationScore: 98.4,
    resonanceFactor: 1.618,
  };

  private listeners: Set<(state: CosmicEngineState) => void> = new Set();

  public subscribe(listener: (state: CosmicEngineState) => void) {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public getState(): CosmicEngineState {
    return { ...this.state };
  }

  public pulseCosmicField() {
    this.state.cosmicPulseFrequency = 144.0; // Boosted frequency
    this.state.phiHarmonizationScore = 100.0;
    this.state.resonanceFactor = 1.618033;
    this.notify();

    // Gradually calm down after pulse
    setTimeout(() => {
      this.state.cosmicPulseFrequency = 64.8;
      this.state.phiHarmonizationScore = 98.4;
      this.state.resonanceFactor = 1.618;
      this.notify();
    }, 4000);
  }

  public triggerRandomPulse() {
    // Fluctuates slightly
    const deltaFreq = (Math.random() * 4.0) - 2.0;
    const deltaHarm = (Math.random() * 2.0) - 1.0;

    this.state.cosmicPulseFrequency = Math.max(50.0, Math.min(80.0, this.state.cosmicPulseFrequency + deltaFreq));
    this.state.phiHarmonizationScore = Math.max(90.0, Math.min(100.0, this.state.phiHarmonizationScore + deltaHarm));
    this.notify();
  }
}

export const cosmicQuantumUnityEngine = new CosmicQuantumUnityEngine();
