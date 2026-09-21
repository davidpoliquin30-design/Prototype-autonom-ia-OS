// Topology definitions based on Φ_SOI Equation
import { AgentInfo } from "../services/agentMeshHub";

export interface AgentTopology {
  id: string;
  pole: string;
  connections: string[];
}

export const AGENT_MESH_TOPOLOGY: AgentTopology[] = [
  { id: "@human_language_master", pole: "direction", connections: ["@supervisor", "@conversational_dialogue_bridge"] },
  { id: "@supervisor", pole: "gouvernance", connections: ["@human_language_master", "@supervisor_sentinel", "@pro_coder"] },
  { id: "@pro_coder", pole: "code", connections: ["@supervisor", "@live_ide_executor"] },
  { id: "@quantum_prompt_equation_analyzer", pole: "intuition", connections: ["@supervisor", "@quantum_equation_vault_writer"] },
  { id: "@token_gatekeeper", pole: "optimisation", connections: ["@supervisor", "@token_loop_recirculator"] }
];
