// Service de l'Agent Expert en Sélection et Routage de Versions IA (@ai_version_selector_expert)
// Rôle : Analyser la demande utilisateur, choisir la version d'IA optimale et transmettre l'arbitrage à la flotte agentique.

export interface ModelSelectionRequest {
  prompt: string;
  targetFiles?: string[];
  contextType?: "ui_modification" | "code_architecture" | "math_physics" | "chat_conversation" | "vision_multimodal" | "refactor";
  userPreferredModel?: string;
  isAutonomousAction?: boolean;
}

export interface ModelSelectionDecision {
  decisionId: string;
  timestamp: string;
  selectedModelId: string;
  modelDisplayName: string;
  taskCategory: "coding_ui" | "coding_complex" | "reasoning_math" | "conversational" | "multimodal" | "local_deterministic";
  reasoning: string;
  confidenceScore: number;
  hyperparameters: {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
  fallbackChain: string[];
  agentBroadcastPayload: {
    targetAgent: string;
    actionDirectives: string;
    modelCapability: string;
    latencyTargetMs: number;
  };
}

export interface AiVersionSelectorState {
  currentDecision: ModelSelectionDecision | null;
  decisionHistory: ModelSelectionDecision[];
  totalArbitrations: number;
  activeStrategy: "adaptive_smart" | "max_quality" | "max_speed" | "zero_cost_local";
  lastAnalyzedPrompt: string;
}

class AiVersionSelectorExpertService {
  private state: AiVersionSelectorState = {
    currentDecision: null,
    decisionHistory: [],
    totalArbitrations: 0,
    activeStrategy: "adaptive_smart",
    lastAnalyzedPrompt: "",
  };

  private listeners: Set<(state: AiVersionSelectorState) => void> = new Set();

  constructor() {
    this.initDefaultDecision();
  }

  private initDefaultDecision() {
    this.state.currentDecision = {
      decisionId: `arb-init-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      selectedModelId: "gemini-3.8-flash",
      modelDisplayName: "Gemini 3.8 Flash (Vérifié & Rapide)",
      taskCategory: "coding_ui",
      reasoning: "Sélection initiale par défaut calibrée pour une réactivité optimale et une génération TSX de haute fidélité.",
      confidenceScore: 0.98,
      hyperparameters: {
        temperature: 0.2,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      },
      fallbackChain: ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-flash-latest", "local-alchemical"],
      agentBroadcastPayload: {
        targetAgent: "all_agents",
        actionDirectives: "Utiliser l'inférence rapide Gemini 3.8 Flash pour le code et l'analyse.",
        modelCapability: "Génération TSX + Multimodalité + Faible latence",
        latencyTargetMs: 800,
      },
    };
  }

  public getState(): AiVersionSelectorState {
    return { ...this.state };
  }

  public subscribe(fn: (state: AiVersionSelectorState) => void): () => void {
    this.listeners.add(fn);
    fn(this.getState());
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    const snap = this.getState();
    this.listeners.forEach((fn) => fn(snap));
  }

  public setStrategy(strategy: "adaptive_smart" | "max_quality" | "max_speed" | "zero_cost_local") {
    this.state.activeStrategy = strategy;
    this.notify();
  }

  /**
   * Analyse chirurgicale du prompt et arbitrage de la meilleure version IA
   */
  public evaluateAndSelectModel(request: ModelSelectionRequest): ModelSelectionDecision {
    const promptLower = (request.prompt || "").toLowerCase();
    const decisionId = `arb-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString();

    let selectedModelId = "gemini-3.8-flash";
    let modelDisplayName = "Gemini 3.8 Flash";
    let taskCategory: ModelSelectionDecision["taskCategory"] = "coding_ui";
    let reasoning = "";
    let confidenceScore = 0.95;
    let hyperparameters = {
      temperature: 0.2,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 4096,
    };
    let fallbackChain = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-flash-latest", "local-alchemical"];
    let targetDirectives = "";

    // 1. Force local / zero cost if strategy asks or prompt requests local
    if (
      this.state.activeStrategy === "zero_cost_local" ||
      promptLower.includes("local") ||
      promptLower.includes("vllm") ||
      promptLower.includes("sans cloud") ||
      promptLower.includes("air-gapped")
    ) {
      selectedModelId = "local-vllm";
      modelDisplayName = "vLLM GPU Local (Qwen 2.5 Coder 7B)";
      taskCategory = "local_deterministic";
      reasoning = "Requête orientée exécution souveraine en local sur GPU/CPU (zéro coût de token et confidentialité totale).";
      confidenceScore = 1.0;
      hyperparameters = { temperature: 0.1, topP: 0.9, topK: 20, maxOutputTokens: 2048 };
      fallbackChain = ["local-vllm", "local-deterministic", "gemini-3.8-flash"];
      targetDirectives = "Transmettre le flux à @pro_coder en mode GPU VRAM local / Déterministe Alpha.";
    }
    // 2. High reasoning & complex architecture tasks
    else if (
      this.state.activeStrategy === "max_quality" ||
      promptLower.includes("architecture") ||
      promptLower.includes("refactor") ||
      promptLower.includes("algorithme") ||
      promptLower.includes("complexe") ||
      promptLower.includes("équation") ||
      promptLower.includes("mrd") ||
      promptLower.includes("shoelace") ||
      promptLower.includes("math") ||
      promptLower.includes("spanner") ||
      promptLower.includes("full-stack")
    ) {
      selectedModelId = "gemini-3.1-pro-preview";
      modelDisplayName = "Gemini 3.1 Pro (Preview - Raisonnement Profond)";
      taskCategory = "coding_complex";
      reasoning = "Tâche d'architecture logicielle ou calculs multidimensionnels nécessitant la capacité de raisonnement avancée de Gemini 3.1 Pro.";
      confidenceScore = 0.97;
      hyperparameters = { temperature: 0.1, topP: 0.95, topK: 40, maxOutputTokens: 8192 };
      fallbackChain = ["gemini-3.1-pro-preview", "gemini-3.8-flash", "gemini-3.6-flash", "local-alchemical"];
      targetDirectives = "Allouer le maximum de tokens à @pro_coder pour une reconstruction rigoureuse avec typage TypeScript strict.";
    }
    // 3. UI Modifications, Emulator Live Changes & Styling
    else if (
      promptLower.includes("émulateur") ||
      promptLower.includes("emulator") ||
      promptLower.includes("bouton") ||
      promptLower.includes("couleur") ||
      promptLower.includes("thème") ||
      promptLower.includes("widget") ||
      promptLower.includes("composant") ||
      promptLower.includes("calculatrice") ||
      promptLower.includes("tâche") ||
      promptLower.includes("todo") ||
      promptLower.includes("modifie") ||
      promptLower.includes("ajoute") ||
      promptLower.includes("change")
    ) {
      selectedModelId = "gemini-3.8-flash";
      modelDisplayName = "Gemini 3.8 Flash (Ultra-Rapide & Précis)";
      taskCategory = "coding_ui";
      reasoning = "Modification interactive du Jumeau Twin / Émulateur. Gemini 3.8 Flash offre la latence la plus basse et une fidélité maximale aux classes Tailwind.";
      confidenceScore = 0.99;
      hyperparameters = { temperature: 0.2, topP: 0.95, topK: 40, maxOutputTokens: 4096 };
      fallbackChain = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-flash-latest", "local-alchemical"];
      targetDirectives = "Informer @pro_coder, @sentinel et @live_ide_executor pour injection synchrone et hot-reload immédiat de l'émulateur.";
    }
    // 4. Conversational, explanations & advisory
    else {
      selectedModelId = "gemini-3.8-flash";
      modelDisplayName = "Gemini 3.8 Flash (Conversation & Conseil)";
      taskCategory = "conversational";
      reasoning = "Requête conversationnelle générale et conseils d'alignement. Gemini 3.8 Flash synthétise des réponses denses et naturelles.";
      confidenceScore = 0.96;
      hyperparameters = { temperature: 0.4, topP: 0.95, topK: 40, maxOutputTokens: 2048 };
      fallbackChain = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.6-flash", "local-alchemical"];
      targetDirectives = "Orienter la réponse vers @human_language_master pour une restitution pédagogique et inspirante.";
    }

    // If user explicitly chose a valid model from dropdown and didn't leave it default
    if (request.userPreferredModel && request.userPreferredModel !== "auto") {
      selectedModelId = request.userPreferredModel;
      modelDisplayName = `${request.userPreferredModel} (Sélection Manuelle Humaine)`;
      reasoning = `Respect strict du choix utilisateur manuel : modèle "${request.userPreferredModel}".`;
    }

    const decision: ModelSelectionDecision = {
      decisionId,
      timestamp,
      selectedModelId,
      modelDisplayName,
      taskCategory,
      reasoning,
      confidenceScore,
      hyperparameters,
      fallbackChain,
      agentBroadcastPayload: {
        targetAgent: "all_quantum_fleet",
        actionDirectives: targetDirectives,
        modelCapability: `${modelDisplayName} • Temp: ${hyperparameters.temperature} • Tokens: ${hyperparameters.maxOutputTokens}`,
        latencyTargetMs: selectedModelId.includes("pro") ? 1800 : 700,
      },
    };

    this.state.currentDecision = decision;
    this.state.decisionHistory.unshift(decision);
    if (this.state.decisionHistory.length > 50) {
      this.state.decisionHistory = this.state.decisionHistory.slice(0, 50);
    }
    this.state.totalArbitrations += 1;
    this.state.lastAnalyzedPrompt = request.prompt;
    this.notify();

    // Broadcast globally
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("quantum-model-selected", {
          detail: decision,
        })
      );
    }

    return decision;
  }
}

export const aiVersionSelectorExpert = new AiVersionSelectorExpertService();
