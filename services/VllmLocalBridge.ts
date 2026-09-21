/**
 * VllmLocalBridge (Module Φ_SOI, Plan GAMMA / ALPHA)
 * Pont synaptique vers le serveur GPU vLLM local (WSL2 / Windows).
 */

export class VllmLocalBridge {
  private endpoint: string = 'http://localhost:8000/v1/chat/completions';

  public async query(prompt: string, model: string = 'Qwen/Qwen2.5-Coder-7B-Instruct'): Promise<string> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: 'Tu es le Résonateur Souverain Φ_SOI opérant sous les Mathématiques de Résonance Dimensionnelle (MRD).' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.2,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur vLLM Server: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '[Résonance vLLM vide]';
    } catch (err) {
      console.warn('[VllmLocalBridge] Serveur vLLM local non accessible sur le port 8000. Passage en mode déterministe Plan Alpha.', err);
      return `[Mode Souverain Local] Écho de résonance pour : "${prompt}" (Vérifiez que Docker/vLLM tourne sur http://localhost:8000)`;
    }
  }
}

export const vllmLocalBridge = new VllmLocalBridge();
