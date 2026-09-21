import { quantumCognitiveBridge } from "../quantum/quantumCognitiveBridge";
import { autoRepairSystemEngine } from "./autoRepairSystemEngine";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  isFallback?: boolean;
  appliedPatch?: boolean;
  proposedPatch?: string;
  proposedFilePath?: string;
}

type Subscriber = (state: {
  messages: ChatMessage[];
  isGenerating: boolean;
  intricacyTarget: string | null;
  coherenceScore: number;
}) => void;

class QuantumIdeCompanionService {
  private messages: ChatMessage[] = [
    {
      id: "welcome_msg",
      role: "assistant",
      content: "🔮 **Salutations, Ingénieur.** Je suis votre **Copilote IA Conversationnel Quantique**. Intriqué avec votre espace de travail, je peux générer des codes raffinés, corriger des anomalies via notre protocole d'auto-réparation, ou déployer des mutations de fichiers par Hot-Swap.",
      timestamp: new Date().toLocaleTimeString()
    }
  ];
  private isGenerating: boolean = false;
  private intricacyTarget: string | null = null;
  private subscribers: Set<Subscriber> = new Set();

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
    const bridgeState = quantumCognitiveBridge.getState();
    return {
      messages: this.messages,
      isGenerating: this.isGenerating,
      intricacyTarget: this.intricacyTarget,
      coherenceScore: bridgeState.coherenceScore
    };
  }

  public clearHistory() {
    this.messages = [
      {
        id: "welcome_msg",
        role: "assistant",
        content: "🔮 Historique de résonance cognitive réinitialisé. Comment puis-je orienter votre code aujourd'hui ?",
        timestamp: new Date().toLocaleTimeString()
      }
    ];
    this.notify();
  }

  public setIntricacyTarget(filePath: string | null) {
    this.intricacyTarget = filePath;
    this.notify();
  }

  /**
   * Core NLU intent and streaming response generation
   */
  public async sendUserMessage(text: string, activeFile: string | null) {
    if (!text.trim() || this.isGenerating) return;

    // Aligne l'harmonisation cognitive
    const qState = quantumCognitiveBridge.getState();
    const compressionFactor = qState.coherenceScore * 1.618; // Liaison de la constante dorée Phi
    console.log(`[QuantumIdeCompanion] Alignement de la résonance cognitive établie (Coherence: ${qState.coherenceScore}, Phi-factor: ${compressionFactor.toFixed(3)})`);

    // Add user message
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString()
    };
    this.messages.push(userMsg);
    this.isGenerating = true;
    this.notify();

    // Trigger subtle fluctuation in quantum cognitive state
    quantumCognitiveBridge.triggerSlightFluctuations();

    // Intent recognition (NLU)
    const lowerText = text.toLowerCase();
    
    // Command 1: Create a page of contact (or other components)
    if (lowerText.includes("crée") || lowerText.includes("create")) {
      await this.handleCreateFileCommand(text);
      return;
    }

    // Command 2: Correct / Repair rendering error
    if (lowerText.includes("corrige") || lowerText.includes("repair") || lowerText.includes("fix") || lowerText.includes("erreur")) {
      await this.handleRepairCommand(text);
      return;
    }

    // Regular conversation or fallback simulation
    await this.generateAiResponse(text, activeFile);
  }

  /**
   * Action: Create file automatically
   */
  private async handleCreateFileCommand(prompt: string) {
    // Generate assistant response proposing a file creation
    const targetPath = prompt.toLowerCase().includes("contact") 
      ? "src/components/ContactPage.tsx" 
      : "src/components/GeneratedWidget.tsx";

    const defaultCode = prompt.toLowerCase().includes("contact") 
      ? `import React, { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="p-6 bg-[#0c0d12] border border-[#1f2029] rounded-xl text-gray-200 max-w-md mx-auto">
      <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-3">📡 Canal de Contact Quantique</h3>
      {!sent ? (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
          <input placeholder="Saisir votre clé d'intrication..." className="w-full bg-[#121319] border border-[#1f2029] p-2 rounded text-xs text-white" required />
          <textarea placeholder="Message holographique..." className="w-full bg-[#121319] border border-[#1f2029] p-2 rounded text-xs text-white h-24" required></textarea>
          <button type="submit" className="w-full py-2 bg-orange-500 text-black font-bold uppercase rounded text-xs hover:bg-orange-400">Émettre le signal</button>
        </form>
      ) : (
        <div className="text-center py-4 text-emerald-400 text-xs">✔ Message téléporté avec un taux de fidélité de 100%.</div>
      )}
    </div>
  );
}`
      : `import React from 'react';

export default function GeneratedWidget() {
  return (
    <div className="p-4 bg-[#0a0c10] border border-[#14151c] rounded-xl text-center text-xs">
      <span className="text-orange-400 font-bold">✨ COMPOSANT AUTONOME GÉNÉRÉ</span>
      <p className="text-gray-500 mt-2">Généré à chaud par le Copilote IA Quantique.</p>
    </div>
  );
}`;

    // Add immediate feedback
    const assistantMsgId = `asst_${Date.now()}`;
    const initialText = `⚙️ **[Intention de création détectée]** : J'ai identifié votre demande de création pour le module de code. Je prépare le patch pour le fichier \`/${targetPath}\`.`;
    
    this.messages.push({
      id: assistantMsgId,
      role: "assistant",
      content: initialText,
      timestamp: new Date().toLocaleTimeString(),
      proposedPatch: defaultCode,
      proposedFilePath: targetPath
    });
    
    this.isGenerating = false;
    this.notify();
  }

  /**
   * Action: Mobilize autoRepairSystemEngine
   */
  private async handleRepairCommand(prompt: string) {
    const assistantMsgId = `asst_${Date.now()}`;
    const initialText = `🛠️ **[Signal d'auto-réparation capté]** : Je décèle une anomalie dans le rendu de l'interface ou une exception active. Je mobilise immédiatement le **Coordinateur SRE d'auto-guérison** (\`autoRepairSystemEngine\`) pour lancer le cycle en 12 étapes.`;

    this.messages.push({
      id: assistantMsgId,
      role: "assistant",
      content: initialText,
      timestamp: new Date().toLocaleTimeString()
    });

    this.notify();

    // Trigger the automated repair bug demonstration
    setTimeout(() => {
      autoRepairSystemEngine.triggerIntentionalTestBug();
    }, 1500);

    this.isGenerating = false;
    this.notify();
  }

  /**
   * Regular Gemini integration + resilient local backup on 429
   */
  private async generateAiResponse(prompt: string, activeFile: string | null) {
    const assistantMsgId = `asst_${Date.now()}`;
    
    // Add placeholder message for streaming
    this.messages.push({
      id: assistantMsgId,
      role: "assistant",
      content: "💭 *Calcul de l'intrication sémantique...*",
      timestamp: new Date().toLocaleTimeString(),
      isStreaming: true
    });
    this.notify();

    try {
      // Make call to our Express back-end /api/gemini/chat
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          activeFiles: activeFile ? [activeFile] : [],
          history: this.messages.slice(-5, -1).map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await res.json();
      
      // Update with final content and simulation of word streaming
      await this.streamMessageContent(assistantMsgId, data.text, data.fallback || false);

    } catch (err: any) {
      // Direct catch for fallback
      const localResponse = `⚡ **[Copilote Quantum Local] : Exécution de secours locale active...**

Une fluctuation d'API ou un quota épuisé a été détecté. J'ai activé la synthèse déterministe locale de la suite **Φ_SOI**.

Concernant votre requête sur **"${prompt}"** :
J'ai stabilisé la cohérence de l'IDE à **${(quantumCognitiveBridge.getState().coherenceScore * 100).toFixed(0)}%**. Si vous souhaitez modifier le composant actif, essayez de taper des commandes d'intention claires comme :
- **"Crée la page de contact"**
- **"Corrige l'erreur de rendu"**

*Toutes les structures quantiques restent opérationnelles sous blindage d'urgence.*`;

      await this.streamMessageContent(assistantMsgId, localResponse, true);
    }
  }

  private async streamMessageContent(id: string, fullText: string, isFallback: boolean) {
    const idx = this.messages.findIndex(m => m.id === id);
    if (idx === -1) return;

    this.messages[idx].isStreaming = false;
    this.messages[idx].isFallback = isFallback;
    this.messages[idx].content = "";

    const words = fullText.split(" ");
    let temp = "";
    
    for (let i = 0; i < words.length; i++) {
      temp += words[i] + " ";
      this.messages[idx].content = temp;
      this.notify();
      
      // Fast non-blocking stream interval
      if (i % 3 === 0) {
        await new Promise(resolve => setTimeout(resolve, 30));
      }
    }

    this.isGenerating = false;
    this.notify();
  }

  /**
   * Applies the proposed hot-swap patch directly to the workspace via filesystem write
   */
  public async applyPatchToWorkspace(filePath: string, patchCode: string): Promise<boolean> {
    try {
      const res = await fetch("/api/files/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath, content: patchCode }),
      });
      const data = await res.json();
      return data.success;
    } catch (err) {
      console.error("Error writing patch to workspace:", err);
      return false;
    }
  }
}

export const quantumIdeCompanionService = new QuantumIdeCompanionService();
