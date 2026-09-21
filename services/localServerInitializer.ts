/**
 * LocalServerInitializer (Module Φ_SOI, Plan GAMMA)
 * Orchestrateur de serveur GPU local (Ollama, LM Studio, vLLM).
 */

export interface ServerStatus {
  online: boolean;
  model: string;
  latencyMs: number;
  endpoints: string[];
}

class LocalServerInitializer {
  private readonly ports = [11434, 1234, 8000]; // Ollama, LM Studio, vLLM

  public async scan(): Promise<string | null> {
    for (const port of this.ports) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1000);
        const response = await fetch(`http://localhost:${port}/api/tags`, {
          method: 'GET',
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (response.ok) return `http://localhost:${port}`;
      } catch (e) {
        continue;
      }
    }
    return null;
  }

  public async getModels(endpoint: string): Promise<string[]> {
    try {
      const response = await fetch(`${endpoint}/api/tags`);
      const data = await response.json();
      return data.models.map((m: any) => m.name);
    } catch {
      return [];
    }
  }

  public async ping(endpoint: string): Promise<number> {
    const start = Date.now();
    try {
      await fetch(`${endpoint}/api/tags`, { method: 'GET' });
      return Date.now() - start;
    } catch {
      return -1;
    }
  }
}

export const localServerInitializer = new LocalServerInitializer();
