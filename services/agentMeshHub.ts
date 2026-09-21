import { apiMatrixRoutingService } from "./agents/apiMatrixRoutingService";

// SynapticConduit contract as mandated by Section III
export interface SynapticConduit<TInput, TPhysicalResult, TOutputPayload> {
  shield: (rawInput: TInput) => {
    sanitizedSignal: unknown;
    opaqueTokens: Map<string, string>;
  };
  localReflex: (sanitizedSignal: unknown) => {
    physicalResult: TPhysicalResult;
    invariantsViolated: boolean;
    correctionVector?: unknown;
  };
  cognitiveBridge: (
    signal: unknown,
    reflex: TPhysicalResult
  ) => Promise<TOutputPayload>;
  rehydrateAndCommit: (
    payload: TOutputPayload,
    tokens: Map<string, string>
  ) => void;
}

export interface SynapticMessage {
  id: string;
  timestamp: string;
  sender: string;
  receiver: string;
  rawInput: string;
  sanitizedSignal: string;
  physicalResult: string;
  outputPayload: string;
  tokensMaskedCount: number;
  invariantsViolated: boolean;
  stage: "idle" | "shielded" | "reflexed" | "bridged" | "committed";
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  pole: "direction" | "gouvernance" | "structure" | "intuition" | "code" | "optimisation";
  status: "online" | "degraded" | "offline";
  latency: number;
  equation: string;
  connections: string[];
}

class AgentMeshHub {
  private listeners: Set<() => void> = new Set();
  private agents: AgentInfo[] = [
    {
      id: "@human_language_master",
      name: "Human Language Master",
      role: "Traduit le langage naturel en directives machines et restitue des réponses fluides",
      pole: "direction",
      status: "online",
      latency: 18,
      equation: "∮_σ ∇Ψ ⊗ T_p",
      connections: ["@supervisor", "@conversational_dialogue_bridge"]
    },
    {
      id: "@conversational_dialogue_bridge",
      name: "Conversational Dialogue Bridge",
      role: "Pont synaptique vers NotebookLM et les interfaces de discussion",
      pole: "direction",
      status: "online",
      latency: 22,
      equation: "Ψ_conv = f(NotebookLM)",
      connections: ["@human_language_master"]
    },
    {
      id: "@supervisor",
      name: "Supervisor Core Φ_SOI",
      role: "Cœur souverain d'orchestration, d'arbitrage global et de gouvernance",
      pole: "gouvernance",
      status: "online",
      latency: 10,
      equation: "Ξ ≡ 1",
      connections: ["@human_language_master", "@supervisor_sentinel", "@pro_coder"]
    },
    {
      id: "@supervisor_sentinel",
      name: "Supervisor Sentinel",
      role: "Sentinelle d'audit de flux et de détection des dérives ou anomalies",
      pole: "gouvernance",
      status: "online",
      latency: 14,
      equation: "D_c → 0",
      connections: ["@supervisor", "@sentinel_auto_reconfigurator"]
    },
    {
      id: "@sentinel_auto_reconfigurator",
      name: "Sentinel Auto-Reconfigurator",
      role: "Exécuteur autonome de réparation de ponts sans supervision humaine",
      pole: "gouvernance",
      status: "online",
      latency: 28,
      equation: "σ_err = R_{pair}",
      connections: ["@supervisor_sentinel"]
    },
    {
      id: "@pro_coder",
      name: "Pro Coder",
      role: "Générateur de solutions logicielles et d'architectures sémantiques",
      pole: "code",
      status: "online",
      latency: 32,
      equation: "f(x) = Argmax P(Code|Ctx)",
      connections: ["@supervisor", "@live_ide_executor"]
    },
    {
      id: "@live_ide_executor",
      name: "Live IDE Executor",
      role: "Exécuteur direct de commandes physiques et d'analyse de non-régression",
      pole: "code",
      status: "online",
      latency: 45,
      equation: "E_{100} = 1",
      connections: ["@pro_coder", "@tool_reconfigurator"]
    },
    {
      id: "@universal_alignment_agent",
      name: "Universal Alignment Agent",
      role: "Agent d'arrière-plan choisissant les options optimales pour un alignement intégral",
      pole: "gouvernance",
      status: "online",
      latency: 6,
      equation: "Amr ≡ 1 ⊗ Ξ ≡ 1",
      connections: ["@supervisor", "@omni_live_architecture_cartographer"]
    },
    {
      id: "@omni_live_architecture_cartographer",
      name: "Omni Live Architecture Cartographer",
      role: "Cartographie en temps réel des agents, de la structure interne et des outils intégrés",
      pole: "gouvernance",
      status: "online",
      latency: 4,
      equation: "M_{arch}(t) = ⋃ {Agents, Structure, Tools}",
      connections: ["@supervisor", "@human_language_master"]
    },
    {
      id: "@notebook_structure_synthesizer",
      name: "Notebook Structure Synthesizer",
      role: "Structuration et indexation sémantique des documents de connaissance et notes RAG",
      pole: "structure",
      status: "online",
      latency: 22,
      equation: "K_{struct} = AST(Docs) ⊗ VectorIndex",
      connections: ["@notebooklm_bridge", "@supervisor"]
    },
    {
      id: "@notebooklm_bridge",
      name: "NotebookLM Bridge",
      role: "Interconnexion entre les sources documentaires et le moteur d'inférence",
      pole: "structure",
      status: "online",
      latency: 26,
      equation: "Bridge(LocalFS, NotebookEngine)",
      connections: ["@notebook_structure_synthesizer", "@conversational_dialogue_bridge"]
    },
    {
      id: "@quantum_prompt_equation_analyzer",
      name: "Quantum Prompt Equation Analyzer (ψ_QMEM)",
      role: "Analyse des tenseurs d'intention pure et résonance dimensionnelle dans les invites",
      pole: "intuition",
      status: "online",
      latency: 16,
      equation: "ψ_QMEM = ∇Ψ ⊗ H_∞",
      connections: ["@quantum_equation_vault_writer", "@supervisor"]
    },
    {
      id: "@quantum_equation_vault_writer",
      name: "Quantum Equation Vault Writer",
      role: "Scellé cryptographique local des équations souveraines et des formules de résonance",
      pole: "intuition",
      status: "online",
      latency: 19,
      equation: "Vault(AES256-GCM, Ψ)",
      connections: ["@quantum_prompt_equation_analyzer"]
    },
    {
      id: "@alchemical_metalanguage_architect",
      name: "Alchemical Metalanguage Architect",
      role: "Transduction métalinguistique et alchimisation des signaux conceptuels",
      pole: "intuition",
      status: "online",
      latency: 21,
      equation: "MetaLang = Convolute(Amour, Rigueur)",
      connections: ["@supervisor", "@human_language_master"]
    },
    {
      id: "@tool_reconfigurator",
      name: "Tool Reconfigurator",
      role: "Ajustement dynamique des outils intégrés en fonction des exigences de charge",
      pole: "code",
      status: "online",
      latency: 25,
      equation: "Reconfig(Tools, AST)",
      connections: ["@live_ide_executor", "@tool_inspector"]
    },
    {
      id: "@tool_inspector",
      name: "Tool Inspector",
      role: "Inspection en direct du DOM, des composants injectés et des surcharges réactives",
      pole: "code",
      status: "online",
      latency: 15,
      equation: "Inspect(DOM, Props, State)",
      connections: ["@live_ide_executor", "@pro_coder"]
    },
    {
      id: "@code_synchronizer",
      name: "Code Synchronizer",
      role: "Synchronisation instantanée entre le système de fichiers, l'IDE et les jumeaux de rendu",
      pole: "code",
      status: "online",
      latency: 11,
      equation: "Sync(FS, Editor, Runtime)",
      connections: ["@pro_coder", "@live_ide_executor"]
    },
    {
      id: "@token_loop_recirculator",
      name: "Token Loop Recirculator",
      role: "Recirculation fermée des contextes et compression sans perte",
      pole: "optimisation",
      status: "online",
      latency: 7,
      equation: "Recirculate(Context) → Cost = 0",
      connections: ["@token_budget_calibrator", "@token_gatekeeper"]
    },
    {
      id: "@token_budget_calibrator",
      name: "Token Budget Calibrator",
      role: "Calibrage préventif des quotas de tokens et calcul des taxes algorithmiques",
      pole: "optimisation",
      status: "online",
      latency: 9,
      equation: "Budget = Clamp(Tokens, Min, Max)",
      connections: ["@token_loop_recirculator", "@token_gatekeeper"]
    },
    {
      id: "@token_gatekeeper",
      name: "Token Gatekeeper",
      role: "Contrôleur de budget et de flux de jetons d'inférence",
      pole: "optimisation",
      status: "online",
      latency: 8,
      equation: "Min(Cost) * e^{compliance}",
      connections: ["@supervisor"]
    }
  ];

  private logs: SynapticMessage[] = [];

  constructor() {
    this.addLog({
      id: "MSG-001",
      timestamp: new Date().toISOString(),
      sender: "@human_language_master",
      receiver: "@supervisor",
      rawInput: "Vérifier la conformité du code d'auto-réparation",
      sanitizedSignal: "Vérifier conformité code auto-réparation",
      physicalResult: "Linter: SUCCESS, Compilateur: SUCCESS",
      outputPayload: "Poids de confiance ajustés à 98.4%",
      tokensMaskedCount: 0,
      invariantsViolated: false,
      stage: "committed"
    });
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public getAgents(): AgentInfo[] {
    return this.agents;
  }

  public getLogs(): SynapticMessage[] {
    return this.logs;
  }

  public addLog(log: SynapticMessage) {
    this.logs = [log, ...this.logs].slice(0, 50); // limit to 50 logs
    this.notify();
  }

  // Implementation of a generic synapse routing following the SynapticConduit pattern
  public async routeConduitTransaction(
    sender: string,
    receiver: string,
    rawInput: string
  ): Promise<SynapticMessage> {
    const msgId = `MSG-${Math.floor(Math.random() * 9000) + 1000}`;
    const timestamp = new Date().toISOString();

    const conduit: SynapticConduit<string, string, string> = {
      shield: (input: string) => {
        // Vault cryptographique : pseudonymisation des clés API et informations sensibles
        const opaqueTokens = new Map<string, string>();
        let sanitized = input;
        
        // Ex: mask any string resembling an API key
        const apiKeyPattern = /(AIzaSy[A-Za-z0-9_-]{33})|([a-zA-Z0-9]{32,45})/g;
        let match;
        let count = 0;
        while ((match = apiKeyPattern.exec(input)) !== null) {
          const matchedText = match[0];
          if (matchedText.length >= 20 && !matchedText.startsWith("@")) {
            count++;
            const tokenKey = `{{VAR_KEY_${count}}}`;
            opaqueTokens.set(tokenKey, matchedText);
            sanitized = sanitized.replace(matchedText, tokenKey);
          }
        }

        return {
          sanitizedSignal: sanitized,
          opaqueTokens
        };
      },

      localReflex: (sanitizedSignal: unknown) => {
        // Exécution déterministe locale (Plan Alpha)
        const text = String(sanitizedSignal).toLowerCase();
        let physicalResult = "Aucune action physique requise.";
        let invariantsViolated = false;

        // Simulate local physics or validation rules
        if (text.includes("error") || text.includes("todo") || text.includes("bug")) {
          physicalResult = "Détection d'une anomalie sémantique. Initialisation du filtre de correctif.";
          invariantsViolated = true;
        } else {
          physicalResult = "Validation physique locale complétée sans incident.";
        }

        return {
          physicalResult,
          invariantsViolated,
          correctionVector: invariantsViolated ? { target: receiver, action: "purge_and_recompile" } : undefined
        };
      },

      cognitiveBridge: async (signal: unknown, reflex: string) => {
        // Cortex Relationnel (Plan Gamma) - call Gemini proxy or Ollama
        const prompt = `[Synapse ${sender} -> ${receiver}]
Signal : ${String(signal)}
Réfles Physique : ${reflex}
Analysez et générez la directive d'alignement correspondante.`;

        try {
          const res = await apiMatrixRoutingService.executeAgentQuery(receiver.replace("@", ""), prompt);
          return res.text || "Directive d'alignement générée de manière déterministe.";
        } catch (e) {
          return `Fallback déterministe d'urgence pour le signal : ${String(signal)}.`;
        }
      },

      rehydrateAndCommit: (payload: string, tokens: Map<string, string>) => {
        // Reconstitution des données sensibles et écriture dans l'état
        let finalPayload = payload;
        tokens.forEach((val, key) => {
          finalPayload = finalPayload.replace(key, val);
        });
        console.log(`[Synaptic Commit] Payload commité pour ${receiver} :`, finalPayload);
      }
    };

    // 1. Shield Stage
    const shieldResult = conduit.shield(rawInput);
    
    // 2. Local Reflex Stage
    const reflexResult = conduit.localReflex(shieldResult.sanitizedSignal);

    // 3. Cognitive Bridge Stage
    const bridgedPayload = await conduit.cognitiveBridge(
      shieldResult.sanitizedSignal,
      reflexResult.physicalResult
    );

    // 4. Rehydrate & Commit Stage
    conduit.rehydrateAndCommit(bridgedPayload, shieldResult.opaqueTokens);

    const message: SynapticMessage = {
      id: msgId,
      timestamp,
      sender,
      receiver,
      rawInput,
      sanitizedSignal: String(shieldResult.sanitizedSignal),
      physicalResult: reflexResult.physicalResult,
      outputPayload: bridgedPayload,
      tokensMaskedCount: shieldResult.opaqueTokens.size,
      invariantsViolated: reflexResult.invariantsViolated,
      stage: "committed"
    };

    this.addLog(message);
    return message;
  }
}

export const agentMeshHub = new AgentMeshHub();
