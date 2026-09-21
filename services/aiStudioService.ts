// Service de gestion du Google AI Studio in-app pour Φ_SOI
import { vllmLocalBridge } from "./VllmLocalBridge";

export interface StudioModelOption {
  id: string;
  name: string;
  provider: "google" | "vllm" | "ollama" | "deterministic";
  description: string;
  contextWindow: number;
  recommendedFor: string;
}

export const AVAILABLE_STUDIO_MODELS: StudioModelOption[] = [
  {
    id: "gemini-3.8-flash",
    name: "Gemini 3.8 Flash (Actif & Vérifié)",
    provider: "google",
    description: "Modèle standard officiel @google/genai, ultra-rapide et multimodal.",
    contextWindow: 1048576,
    recommendedFor: "Modèle par défaut recommandé : chat, agents, code et vision"
  },
  {
    id: "gemini-3.6-flash",
    name: "Gemini 3.6 Flash",
    provider: "google",
    description: "Modèle d'inférence rapide avec excellente fidélité au prompt.",
    contextWindow: 1048576,
    recommendedFor: "Développement général, agents rapides"
  },
  {
    id: "gemini-flash-latest",
    name: "Gemini Flash Latest",
    provider: "google",
    description: "Alias dynamique pointant sur la dernière version Flash stable de Google.",
    contextWindow: 1048576,
    recommendedFor: "Routage automatique vers la version la plus récente"
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro (Preview)",
    provider: "google",
    description: "Raisonnement avancé pour architecture profonde et calculs complexes.",
    contextWindow: 2097152,
    recommendedFor: "Raisonnement de pointe, mathématiques symboliques"
  },
  {
    id: "local-vllm",
    name: "vLLM GPU Local (Qwen 2.5 Coder 7B)",
    provider: "vllm",
    description: "Inférence souveraine sur GPU local (Docker/Windows). Zéro coût de token.",
    contextWindow: 32768,
    recommendedFor: "Exécution locale Air-Gapped, confidentialité totale"
  },
  {
    id: "ollama-local",
    name: "Ollama Local (Port 11434)",
    provider: "ollama",
    description: "Serveur Ollama local pour modèles GGUF / Llama 3 / DeepSeek-R1.",
    contextWindow: 16384,
    recommendedFor: "Inférence CPU/GPU légère sans cloud"
  },
  {
    id: "local-deterministic",
    name: "Moteur Déterministe Alpha (MRD)",
    provider: "deterministic",
    description: "Algorithme pur à 0$ de token avec validation mathématique immédiate.",
    contextWindow: 8192,
    recommendedFor: "Invariance absolue, résolution physique garantie"
  }
];

export interface StudioExecutionParams {
  prompt: string;
  systemInstruction?: string;
  model: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
  tools?: {
    googleSearch?: boolean;
    codeExecution?: boolean;
  };
  history?: Array<{
    role: "user" | "model";
    parts: Array<{ text: string }>;
  }>;
}

export interface StudioExecutionResponse {
  text: string;
  modelUsed: string;
  latencyMs: number;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  groundingMetadata?: any;
  executableCode?: string;
  codeExecutionResult?: string;
  source: string;
}

class GoogleAiStudioService {
  public async executePrompt(params: StudioExecutionParams): Promise<StudioExecutionResponse> {
    const startTime = Date.now();

    // 1. If user selected local vLLM, route to local vLLM bridge directly
    if (params.model === "local-vllm") {
      try {
        const vllmText = await vllmLocalBridge.query(params.prompt);

        const duration = Date.now() - startTime;
        return {
          text: vllmText,
          modelUsed: "vLLM GPU (Qwen2.5-Coder-7B)",
          latencyMs: duration,
          usageMetadata: {
            promptTokenCount: Math.ceil(params.prompt.length / 4),
            candidatesTokenCount: Math.ceil(vllmText.length / 4),
            totalTokenCount: Math.ceil((params.prompt.length + vllmText.length) / 4)
          },
          source: "local-vllm-gpu"
        };
      } catch (err: any) {
        console.warn("[AiStudioService] Échec vLLM local, repli sur le serveur hôte:", err.message);
      }
    }

    // 2. Call server-side /api/ai-studio/execute
    try {
      const response = await fetch("/api/ai-studio/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });

      if (response.ok) {
        return await response.json();
      }

      throw new Error(`Erreur serveur ${response.status}: ${response.statusText}`);
    } catch (err: any) {
      const duration = Date.now() - startTime;
      return {
        text: `### ⚠️ Secours Déterministe Activé
Impossible de contacter le point de terminaison cloud : ${err.message}.
Le système Φ_SOI a préservé l'intégrité de la session.`,
        modelUsed: "local-fallback",
        latencyMs: duration,
        usageMetadata: {
          promptTokenCount: Math.ceil(params.prompt.length / 4),
          candidatesTokenCount: 50,
          totalTokenCount: Math.ceil(params.prompt.length / 4) + 50
        },
        source: "local-fallback"
      };
    }
  }

  // Export prompt to various code formats
  public generateExportCode(
    format: "python" | "typescript" | "curl" | "hcl",
    params: StudioExecutionParams
  ): string {
    const escapedSystem = (params.systemInstruction || "").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    const escapedPrompt = (params.prompt || "").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    const model = params.model === "local-vllm" ? "gemini-2.5-flash" : params.model;

    switch (format) {
      case "python":
        return `# Google GenAI Python SDK
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="${model}",
    contents="${escapedPrompt}",
    config=types.GenerateContentConfig(
        system_instruction="${escapedSystem}",
        temperature=${params.temperature ?? 1.0},
        top_p=${params.topP ?? 0.95},
        max_output_tokens=${params.maxOutputTokens ?? 2048},
    ),
)
print(response.text)
`;

      case "typescript":
        return `// Google GenAI TypeScript SDK
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();

async function main() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "${escapedPrompt}",
    config: {
      systemInstruction: "${escapedSystem}",
      temperature: ${params.temperature ?? 1.0},
      topP: ${params.topP ?? 0.95},
      maxOutputTokens: ${params.maxOutputTokens ?? 2048},
    }
  });

  console.log(response.text);
}

main();
`;

      case "curl":
        return `# cURL REST API Call
curl "https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=$GEMINI_API_KEY" \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "contents": [{
      "parts": [{"text": "${escapedPrompt}"}]
    }],
    "systemInstruction": {
      "parts": [{"text": "${escapedSystem}"}]
    },
    "generationConfig": {
      "temperature": ${params.temperature ?? 1.0},
      "topP": ${params.topP ?? 0.95},
      "maxOutputTokens": ${params.maxOutputTokens ?? 2048}
    }
  }'
`;

      case "hcl":
        return `// Master Manifest HCL (MRD / AROA Protocol)
module "phi_soi_invocation" {
  source           = "resonance.sovereign/quantum_ai"
  target_model     = "${params.model}"
  reality_index    = "1.0000"
  dc_attenuation   = "0.0000"
  
  hyperparameters = {
    temperature   = ${params.temperature ?? 1.0}
    top_p         = ${params.topP ?? 0.95}
    max_tokens    = ${params.maxOutputTokens ?? 2048}
  }

  system_intent = <<EOT
${params.systemInstruction || "Sovereign Master Prompt Active"}
EOT

  prompt_vector = <<EOT
${params.prompt}
EOT
}
`;
    }
  }
}

export const aiStudioService = new GoogleAiStudioService();
