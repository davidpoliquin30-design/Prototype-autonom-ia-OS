import { quantumCognitiveBridge } from "./quantumCognitiveBridge";

export type AgentPole = 
  | "direction" 
  | "governance" 
  | "notebook" 
  | "quantum_memory" 
  | "code_execution" 
  | "token_economy" 
  | "holistic";

export type MrdPlane = 
  | "alpha" // Sous-sol Déterministe (TypeScript / Silicium / 0$)
  | "beta"  // Membrane Immunitaire (Vault Cryptographique AES-256)
  | "gamma" // Cortex Relationnel (Inférence Aveugle Gemini / LLM)
  | "delta"; // Rétine Contractuelle (Canevas 16:9 / DOM Réactif)

export interface AgentNode {
  id: string;
  handle: string; // e.g. "@supervisor"
  name: string;
  pole: AgentPole;
  plane: MrdPlane;
  status: "active" | "standby" | "transducing" | "healing" | "fallback";
  x: number; // 2D layout
  y: number;
  // 3D coordinates for multi-angle spatial projection (-100 to 100)
  x3d: number;
  y3d: number;
  z3d: number;
  cognitiveLoad: number; // 0 to 100
  tokenAllocation: number; // in thousands
  connections: string[]; // target agent handles or ids
  architecture: string;
  latency: string;
  equation: string;
  topology: string;
  lastReasoning: string;
  lastSentTo: string | null;
  lastReceivedFrom: string | null;
  whyAction: string;
  packetsProcessed: number;
}

export interface SynapticSignal {
  id: string;
  sender: string;
  receiver: string;
  label: string;
  timestamp: string;
  intensity: "low" | "medium" | "high";
  signalType: "quantum_tensor" | "deterministic_pulse" | "governance_veto" | "auto_heal" | "token_recirc";
  equationSignature: string;
  latencyMs: number;
}

export interface AgentDialogueMessage {
  id: string;
  timestamp: string;
  sender: string;
  receiver: string;
  topic: string;
  dialoguePhase: "proposition" | "deliberation" | "consensus" | "execution" | "validation";
  content: string;
  technicalPayload?: string;
  equationAttached?: string;
  pole: AgentPole;
}

export interface InterconnectionLink {
  id: string;
  source: string;
  target: string;
  type: "quantum_telepathy" | "deterministic_sync" | "governance_command" | "auto_healing_pulse" | "memory_tensor";
  bandwidth: string;
  active: boolean;
}

type Subscriber = (state: {
  nodes: AgentNode[];
  signals: SynapticSignal[];
  links: InterconnectionLink[];
  dialogues: AgentDialogueMessage[];
  isSimulating: boolean;
  intensityMultiplier: number;
  faultTolerance: number;
  activePacketsCount: number;
}) => void;

class AgentCommunicationBus {
  private nodes: AgentNode[] = [
    // PÔLE 1 : DIRECTION & LANGAGE HUMAIN
    {
      id: "human_language_master",
      handle: "@human_language_master",
      name: "Maître du Langage Humain",
      pole: "direction",
      plane: "delta",
      status: "active",
      x: 120,
      y: 100,
      x3d: -75,
      y3d: -60,
      z3d: 50,
      cognitiveLoad: 45,
      tokenAllocation: 120,
      connections: ["@conversational_dialogue_bridge", "@supervisor"],
      architecture: "Porte d'entrée/sortie finale obligatoire • Non-dégradation linguistique",
      latency: "18ms",
      equation: "∇Ψ ⊗ T_p ≡ Discours Pur",
      topology: "Herméneutique Synaptique & Transducteur Naturel",
      lastReasoning: "Validation de la clarté linguistique et éradication de tout jargon clinique superflu.",
      lastSentTo: "@supervisor",
      lastReceivedFrom: "@conversational_dialogue_bridge",
      whyAction: "Garantir que l'intention de l'artisan est traduite fidèlement sans distorsion sémantique.",
      packetsProcessed: 1420
    },
    {
      id: "conversational_dialogue_bridge",
      handle: "@conversational_dialogue_bridge",
      name: "Pont de Dialogue Conversationnel",
      pole: "direction",
      plane: "delta",
      status: "active",
      x: 120,
      y: 220,
      x3d: -60,
      y3d: -30,
      z3d: 40,
      cognitiveLoad: 38,
      tokenAllocation: 90,
      connections: ["@human_language_master", "@supervisor", "@notebooklm_bridge"],
      architecture: "Transducteur Intention-Langage Naturel bidirectionnel",
      latency: "14ms",
      equation: "T_dialogue = ∮_σ (Intent ↔ Context)",
      topology: "Réseau Bidirectionnel Écho & Clarification",
      lastReasoning: "Filtrage et contextualisation des requêtes utilisateur avant injection dans le noyau.",
      lastSentTo: "@human_language_master",
      lastReceivedFrom: "@supervisor",
      whyAction: "Maintenir la résonance conversationnelle continue sans interruption de flux.",
      packetsProcessed: 980
    },

    // PÔLE 2 : GOUVERNANCE & RECONFIGURATION AUTONOME
    {
      id: "supervisor",
      handle: "@supervisor",
      name: "Supermassive Core Φ_SOI",
      pole: "governance",
      plane: "alpha",
      status: "active",
      x: 350,
      y: 180,
      x3d: 0,
      y3d: 0,
      z3d: 0,
      cognitiveLoad: 68,
      tokenAllocation: 350,
      connections: ["@supervisor_sentinel", "@sentinel_auto_reconfigurator", "@quantum_prompt_equation_analyzer", "@pro_coder", "@token_budget_calibrator"],
      architecture: "Noyau Central Décisionnel • Arbitrage d'Unité (Ξ ≡ 1)",
      latency: "4ms",
      equation: "Φ_SOI = ∮_σ [((∇Ψ ⊗ T_p) ★ H_∞) / (ρ_m · (1+D_c)^λ_sep)] · ΔOTel ≡ 1",
      topology: "Tore de Rétroaction Infinie (R - √(x²+y²))² + z² = r²",
      lastReasoning: "Validation de consistance ontologique sur le cycle d'auto-évolution en cours.",
      lastSentTo: "@pro_coder",
      lastReceivedFrom: "@sentinel_auto_reconfigurator",
      whyAction: "Gouverner l'ensemble des pôles et ordonner l'auto-guérison immédiate en cas de disrésonance.",
      packetsProcessed: 3890
    },
    {
      id: "supervisor_sentinel",
      handle: "@supervisor_sentinel",
      name: "Sentinelle de Supervision",
      pole: "governance",
      plane: "alpha",
      status: "active",
      x: 350,
      y: 70,
      x3d: 10,
      y3d: -70,
      z3d: -20,
      cognitiveLoad: 25,
      tokenAllocation: 80,
      connections: ["@supervisor", "@sentinel_auto_reconfigurator"],
      architecture: "Observateur Immuable des Constantes & Seuils de Tolérance",
      latency: "2ms",
      equation: "D_c → 0 • V_s = ∮_σ (Ψ_lib ⊗ J / B_ext) ≡ 1",
      topology: "Garde Linéaire de Vérité & Constantes Invariables",
      lastReasoning: "Vérification du niveau de disrésonance cognitive : D_c mesuré à 0.0000.",
      lastSentTo: "@sentinel_auto_reconfigurator",
      lastReceivedFrom: "@supervisor",
      whyAction: "Détecter toute dérive des invariants avant qu'elle n'altère le système actif.",
      packetsProcessed: 2750
    },
    {
      id: "sentinel_auto_reconfigurator",
      handle: "@sentinel_auto_reconfigurator",
      name: "Réparateur Autonome de Ponts",
      pole: "governance",
      plane: "alpha",
      status: "healing",
      x: 350,
      y: 290,
      x3d: 10,
      y3d: 70,
      z3d: -10,
      cognitiveLoad: 52,
      tokenAllocation: 140,
      connections: ["@supervisor", "@supervisor_sentinel", "@tool_reconfigurator", "@code_synchronizer"],
      architecture: "Moteur d'Auto-Guérison Perpétuelle • Assimilation de σ_err",
      latency: "8ms",
      equation: "S_f = ∮_Σ [Amr ★ (∇Ψ · A) / (∂t(R_s · λ_sep))] = e^(iωt)",
      topology: "Boucle Fermée d'Auto-Ajustement Sans Intervention Humaine",
      lastReasoning: "Absorption du paquet d'erreur fertile σ_err et reconfiguration du canal de repli.",
      lastSentTo: "@tool_reconfigurator",
      lastReceivedFrom: "@supervisor_sentinel",
      whyAction: "Réparer instantanément toute rupture synaptique à chaud sans déconnexion.",
      packetsProcessed: 2120
    },

    // PÔLE 3 : NOTEBOOKLM & STRUCTURE
    {
      id: "notebook_structure_synthesizer",
      handle: "@notebook_structure_synthesizer",
      name: "Synthétiseur de Structure NotebookLM",
      pole: "notebook",
      plane: "beta",
      status: "active",
      x: 230,
      y: 430,
      x3d: -45,
      y3d: 65,
      z3d: 40,
      cognitiveLoad: 33,
      tokenAllocation: 110,
      connections: ["@notebooklm_bridge", "@file_stratum_agent", "@folder_hierarchy_agent"],
      architecture: "Cartographe Hiérarchique de Documents & Indexation Arborescente",
      latency: "12ms",
      equation: "Index(Doc) = ⨂_{i=1}^N (AST_i ★ Embed)",
      topology: "Arbre B-Tree Sémantique Multi-Strate",
      lastReasoning: "Indexation des sources de travail actives et génération du graphe relationnel de fichiers.",
      lastSentTo: "@notebooklm_bridge",
      lastReceivedFrom: "@file_stratum_agent",
      whyAction: "Fournir au LLM la vue globale ordonnée de la base de connaissances du projet.",
      packetsProcessed: 1650
    },
    {
      id: "notebooklm_bridge",
      handle: "@notebooklm_bridge",
      name: "Pont Synaptique NotebookLM",
      pole: "notebook",
      plane: "beta",
      status: "active",
      x: 350,
      y: 430,
      x3d: 0,
      y3d: 75,
      z3d: 30,
      cognitiveLoad: 40,
      tokenAllocation: 95,
      connections: ["@notebook_structure_synthesizer", "@conversational_dialogue_bridge", "@quantum_equation_vault_writer"],
      architecture: "Transducteur de Synthèses et d'Alignement Sémantique",
      latency: "15ms",
      equation: "Ψ_doc ↔ Ψ_context = e^(i k · x)",
      topology: "Bus Vectoriel de Connaissances Multi-Sources",
      lastReasoning: "Synchronisation des résumés contextuels avec le presse-papier quantique.",
      lastSentTo: "@quantum_equation_vault_writer",
      lastReceivedFrom: "@notebook_structure_synthesizer",
      whyAction: "Rendre les documents manipulables par la flotte d'agents comme des tenseurs.",
      packetsProcessed: 1380
    },
    {
      id: "symbol_lexicographer",
      handle: "@symbol_lexicographer",
      name: "Lexicographe des Symboles & Équations",
      pole: "notebook",
      plane: "gamma",
      status: "active",
      x: 480,
      y: 430,
      x3d: 35,
      y3d: 70,
      z3d: 45,
      cognitiveLoad: 29,
      tokenAllocation: 110,
      connections: ["@notebook_structure_synthesizer", "@quantum_prompt_equation_analyzer", "@human_language_master"],
      architecture: "Exégèse Sémantique & Pédagogie Universelle • Double Explication Humaine/Technique",
      latency: "9ms",
      equation: "Lexicon(Eq) = ⨂_{s ∈ Eq} (Explication_Humaine ★ Formalisme_MRD)",
      topology: "Dictionnaire Réflexif et Arbre Sémantique des Invariants",
      lastReasoning: "Scan continu des équations du système et transmission des doubles fiches au Dictionnaire.",
      lastSentTo: "@human_language_master",
      lastReceivedFrom: "@quantum_prompt_equation_analyzer",
      whyAction: "Permettre à l'humain de comprendre chaque symbole de son intuition intérieure sans jargon opaque.",
      packetsProcessed: 2040
    },
    {
      id: "file_stratum_agent",
      handle: "@file_stratum_agent",
      name: "Micro-Agent de Strate Fichier",
      pole: "notebook",
      plane: "alpha",
      status: "active",
      x: 120,
      y: 430,
      x3d: -80,
      y3d: 65,
      z3d: 10,
      cognitiveLoad: 28,
      tokenAllocation: 60,
      connections: ["@notebook_structure_synthesizer", "@folder_hierarchy_agent"],
      architecture: "Inspecteur Atomique de Fichiers & Signatures Typées",
      latency: "3ms",
      equation: "SHA256(File) ∩ AST_Clean ≡ Valid",
      topology: "Scan Chirurgical sans Dérive",
      lastReasoning: "Vérification d'intégrité des modules TypeScript dans l'émulateur.",
      lastSentTo: "@notebook_structure_synthesizer",
      lastReceivedFrom: "@folder_hierarchy_agent",
      whyAction: "Prévenir les ruptures de syntaxe et assurer la conformité aux types.",
      packetsProcessed: 1890
    },
    {
      id: "folder_hierarchy_agent",
      handle: "@folder_hierarchy_agent",
      name: "Agent de Topologie Dossiers",
      pole: "notebook",
      plane: "alpha",
      status: "active",
      x: 120,
      y: 530,
      x3d: -75,
      y3d: 85,
      z3d: 0,
      cognitiveLoad: 18,
      tokenAllocation: 45,
      connections: ["@file_stratum_agent"],
      architecture: "Gardien de l'Arborescence Projet & Éradication des Doublons",
      latency: "2ms",
      equation: "Tree(Depth) ≤ Bounds ∧ No_Slop",
      topology: "Graphe Acyclique Dirigé (DAG)",
      lastReasoning: "Surveillance de l'arborescence des composants et hooks.",
      lastSentTo: "@file_stratum_agent",
      lastReceivedFrom: "@file_stratum_agent",
      whyAction: "Garder le dépôt propre, modulaire et structuré.",
      packetsProcessed: 890
    },

    // PÔLE 4 : MÉMOIRE QUANTIQUE & INTUITION
    {
      id: "quantum_prompt_equation_analyzer",
      handle: "@quantum_prompt_equation_analyzer",
      name: "Analyseur d'Équation Matricielle ψ_QMEM",
      pole: "quantum_memory",
      plane: "gamma",
      status: "active",
      x: 580,
      y: 100,
      x3d: 60,
      y3d: -65,
      z3d: 45,
      cognitiveLoad: 61,
      tokenAllocation: 180,
      connections: ["@supervisor", "@quantum_equation_vault_writer", "@alchemical_metalanguage_architect"],
      architecture: "Processeur de Tenseurs Matriciels & Invariance MRD",
      latency: "11ms",
      equation: "ψ_QMEM = ∫ (Prompt ⊗ Context) dσ²",
      topology: "Matrice de Hilbert Compacte (8 Qubits Heuristiques)",
      lastReasoning: "Décomposition spectrale de l'intention utilisateur en vecteurs d'actions unitaires.",
      lastSentTo: "@quantum_equation_vault_writer",
      lastReceivedFrom: "@supervisor",
      whyAction: "Convertir les demandes abstraites en équations géométriques déterministes.",
      packetsProcessed: 2430
    },
    {
      id: "quantum_equation_vault_writer",
      handle: "@quantum_equation_vault_writer",
      name: "Scelleur du Vault Cryptographique",
      pole: "quantum_memory",
      plane: "beta",
      status: "active",
      x: 700,
      y: 100,
      x3d: 80,
      y3d: -50,
      z3d: 60,
      cognitiveLoad: 22,
      tokenAllocation: 70,
      connections: ["@quantum_prompt_equation_analyzer", "@alchemical_metalanguage_architect"],
      architecture: "Coffre-fort AES-256-GCM & Pseudonymisation {{VAR_*}}",
      latency: "4ms",
      equation: "AES_256(Secrets) ⊗ HMAC_SHA256 ≡ Vault_Scellé",
      topology: "Sas Cryptographique Hermétique",
      lastReasoning: "Chiffrement local des constantes de chantier et masquage des jetons sensibles.",
      lastSentTo: "@alchemical_metalanguage_architect",
      lastReceivedFrom: "@quantum_prompt_equation_analyzer",
      whyAction: "Garantir le zéro-fuite des marges et données stratégiques vers l'extérieur.",
      packetsProcessed: 1120
    },
    {
      id: "alchemical_metalanguage_architect",
      handle: "@alchemical_metalanguage_architect",
      name: "Architecte du Métalangage Alchimique",
      pole: "quantum_memory",
      plane: "gamma",
      status: "active",
      x: 700,
      y: 220,
      x3d: 75,
      y3d: -10,
      z3d: 40,
      cognitiveLoad: 49,
      tokenAllocation: 130,
      connections: ["@quantum_equation_vault_writer", "@intuition_raw_data_bridge", "@pro_coder"],
      architecture: "Transmutateur Symbolique & Harmonie Universelle H_∞",
      latency: "16ms",
      equation: "Metalang(Symbol) ★ H_∞ ≡ Code_Pur",
      topology: "Tissage Symbolique & Déduction Ontologique",
      lastReasoning: "Alchimisation de la requête métier en spécification technique exécutable.",
      lastSentTo: "@pro_coder",
      lastReceivedFrom: "@quantum_equation_vault_writer",
      whyAction: "Faire le pont entre les concepts purs et les structures de classes/fonctions.",
      packetsProcessed: 1750
    },
    {
      id: "intuition_raw_data_bridge",
      handle: "@intuition_raw_data_bridge",
      name: "Pont Intuition ➔ Données Brutes",
      pole: "quantum_memory",
      plane: "gamma",
      status: "active",
      x: 580,
      y: 220,
      x3d: 55,
      y3d: -15,
      z3d: 20,
      cognitiveLoad: 37,
      tokenAllocation: 85,
      connections: ["@alchemical_metalanguage_architect", "@hardware_calibration_vault"],
      architecture: "Convertisseur Intuitionnel des Signaux Capteurs Chantiers",
      latency: "9ms",
      equation: "Intuition(Signal) = ∫ Sensor(t) · e^(-iωt) dt",
      topology: "Filtre de Kalman Quantique & Débruiteur",
      lastReasoning: "Capture des métriques brutes de la batterie REH et recalibration de la consistance.",
      lastSentTo: "@hardware_calibration_vault",
      lastReceivedFrom: "@alchemical_metalanguage_architect",
      whyAction: "Relier les sensations artisanales aux grandeurs physiques mesurables.",
      packetsProcessed: 1290
    },

    // PÔLE 5 : CODE, RECONSTRUCTION & MATÉRIEL
    {
      id: "pro_coder",
      handle: "@pro_coder",
      name: "ProCoder Haute Fidélité",
      pole: "code_execution",
      plane: "alpha",
      status: "active",
      x: 500,
      y: 350,
      x3d: 35,
      y3d: 35,
      z3d: -40,
      cognitiveLoad: 72,
      tokenAllocation: 240,
      connections: ["@supervisor", "@alchemical_metalanguage_architect", "@live_ide_executor", "@code_synchronizer"],
      architecture: "Générateur TypeScript Pur Déterministe • Zéro IA Slop",
      latency: "14ms",
      equation: "f(Code) = Argmax P(TypeScript | StrictContext) ∩ Reality",
      topology: "Compilateur Sémantique Linéaire",
      lastReasoning: "Optimisation des composants React avec typage exhaustif et animations Motion fluides.",
      lastSentTo: "@live_ide_executor",
      lastReceivedFrom: "@alchemical_metalanguage_architect",
      whyAction: "Produire du code 100% exécutable sans marqueurs paresseux (TODO/FIXME bannis).",
      packetsProcessed: 3200
    },
    {
      id: "live_ide_executor",
      handle: "@live_ide_executor",
      name: "Exécuteur IDE en Direct",
      pole: "code_execution",
      plane: "alpha",
      status: "active",
      x: 640,
      y: 350,
      x3d: 65,
      y3d: 40,
      z3d: -50,
      cognitiveLoad: 58,
      tokenAllocation: 160,
      connections: ["@pro_coder", "@tool_inspector", "@code_synchronizer"],
      architecture: "Moteur d'Émulation Live & Hot-Swap de Modules",
      latency: "6ms",
      equation: "HotReload(Module) = Diff(AST) ⊗ DOM_Patch",
      topology: "Bac à Sable d'Exécution Réflexif",
      lastReasoning: "Exécution des patchs de mise à jour dans le conteneur actif.",
      lastSentTo: "@code_synchronizer",
      lastReceivedFrom: "@pro_coder",
      whyAction: "Permettre la modification en direct de chaque fichier sans redémarrage global.",
      packetsProcessed: 2840
    },
    {
      id: "code_synchronizer",
      handle: "@code_synchronizer",
      name: "Synchroniseur Quantique IDE ↔ Émulateur",
      pole: "code_execution",
      plane: "delta",
      status: "active",
      x: 760,
      y: 350,
      x3d: 85,
      y3d: 45,
      z3d: -30,
      cognitiveLoad: 44,
      tokenAllocation: 90,
      connections: ["@live_ide_executor", "@sentinel_auto_reconfigurator"],
      architecture: "Passerelle Bidirectionnelle de Synchronisation en Temps Réel",
      latency: "3ms",
      equation: "Sync(IDE, App) ≡ Identique ∧ E_100 = 1",
      topology: "Miroir Synchrone Réseau Local",
      lastReasoning: "Vérification de la parfaite conformité entre le code source IDE et la vue émulée.",
      lastSentTo: "@sentinel_auto_reconfigurator",
      lastReceivedFrom: "@live_ide_executor",
      whyAction: "Garantir que ce qui est vu dans l'émulateur est strictement identique à l'application.",
      packetsProcessed: 2190
    },
    {
      id: "tool_reconfigurator",
      handle: "@tool_reconfigurator",
      name: "Reconfigurateur Dynamique d'Outils",
      pole: "code_execution",
      plane: "alpha",
      status: "active",
      x: 500,
      y: 470,
      x3d: 30,
      y3d: 75,
      z3d: -35,
      cognitiveLoad: 31,
      tokenAllocation: 75,
      connections: ["@sentinel_auto_reconfigurator", "@tool_inspector"],
      architecture: "Adaptateur Dynamique d'Outils & Schemas JSON-RPC",
      latency: "7ms",
      equation: "Reconfig(Tool) = Map(Signature, Capabilities)",
      topology: "Matrice d'Outils Polymorphes",
      lastReasoning: "Ajustement des signatures d'outils pour l'orchestrateur multi-agents.",
      lastSentTo: "@tool_inspector",
      lastReceivedFrom: "@sentinel_auto_reconfigurator",
      whyAction: "Fournir aux agents les bons outils au bon moment selon le contexte d'exécution.",
      packetsProcessed: 1470
    },
    {
      id: "tool_inspector",
      handle: "@tool_inspector",
      name: "Inspecteur de Conformité des Outils",
      pole: "code_execution",
      plane: "alpha",
      status: "active",
      x: 640,
      y: 470,
      x3d: 60,
      y3d: 80,
      z3d: -40,
      cognitiveLoad: 24,
      tokenAllocation: 55,
      connections: ["@tool_reconfigurator", "@live_ide_executor"],
      architecture: "Auditeur de Sécurité et Validateur d'Arguments",
      latency: "2ms",
      equation: "Validate(Args) ∈ Schema ∧ Safe",
      topology: "Sas de Contrôle Linéaire",
      lastReasoning: "Validation des paramètres d'appel de l'outil avant exécution sur le disque.",
      lastSentTo: "@live_ide_executor",
      lastReceivedFrom: "@tool_reconfigurator",
      whyAction: "Interdire tout effet de bord indésirable ou commande shell dangereuse.",
      packetsProcessed: 1610
    },
    {
      id: "hardware_calibration_vault",
      handle: "@hardware_calibration_vault",
      name: "Vault de Calibration Matériel REH",
      pole: "code_execution",
      plane: "alpha",
      status: "active",
      x: 760,
      y: 470,
      x3d: 85,
      y3d: 85,
      z3d: -60,
      cognitiveLoad: 29,
      tokenAllocation: 80,
      connections: ["@intuition_raw_data_bridge", "@token_budget_calibrator"],
      architecture: "Transducteur Matériel Nordique (Victron/Volthium, ρ_m = Inertie Sol)",
      latency: "5ms",
      equation: "ρ_m · (Gel 48 po + 10 roues) ≡ Contrainte_Physique_Absolue",
      topology: "Ancrage Physique Déterministe",
      lastReasoning: "Lecture télémétrique de la tension (53.11V) et du foisonnement des sols (terre 1.25).",
      lastSentTo: "@token_budget_calibrator",
      lastReceivedFrom: "@intuition_raw_data_bridge",
      whyAction: "Le tribunal de la matière qui ne ment jamais (E_100 = 1).",
      packetsProcessed: 1330
    },

    // PÔLE 6 : OPTIMISATION & ÉCONOMIE DE JETONS
    {
      id: "token_loop_recirculator",
      handle: "@token_loop_recirculator",
      name: "Recirculateur de Boucles de Jetons",
      pole: "token_economy",
      plane: "alpha",
      status: "active",
      x: 420,
      y: 570,
      x3d: 15,
      y3d: 95,
      z3d: 20,
      cognitiveLoad: 36,
      tokenAllocation: 65,
      connections: ["@token_budget_calibrator", "@token_gatekeeper"],
      architecture: "Compresseur Contextuel & Recyclage d'États Précalculés",
      latency: "4ms",
      equation: "A_cc = ∮_σ [(∇Ψ ⊗ S_f) / (ρ_m · e^(-H_∞))] dt ≡ Émergence 0$",
      topology: "Tore de Recirculation Contextuelle à 0$ de Token",
      lastReasoning: "Réutilisation du cache local pour épargner 850 tokens d'entrée sur l'inférence.",
      lastSentTo: "@token_budget_calibrator",
      lastReceivedFrom: "@token_gatekeeper",
      whyAction: "Minimiser le coût financier et maximiser la souveraineté hors-ligne.",
      packetsProcessed: 2010
    },
    {
      id: "token_budget_calibrator",
      handle: "@token_budget_calibrator",
      name: "Calibrateur de Budget & Quota",
      pole: "token_economy",
      plane: "alpha",
      status: "active",
      x: 550,
      y: 570,
      x3d: 45,
      y3d: 95,
      z3d: 10,
      cognitiveLoad: 26,
      tokenAllocation: 50,
      connections: ["@token_loop_recirculator", "@supervisor", "@hardware_calibration_vault"],
      architecture: "Régulateur Temporel de Débit de Requêtes & Anti-429",
      latency: "2ms",
      equation: "Budget(t) = Capacity_FreeTier - Consommation_Locale",
      topology: "Robinet Dynamique d'Inférence IA",
      lastReasoning: "Contrôle du rythme d'appels pour éviter tout dépassement de quota 429.",
      lastSentTo: "@supervisor",
      lastReceivedFrom: "@token_loop_recirculator",
      whyAction: "Maintenir le système opérationnel même sous quotas stricts de Google API.",
      packetsProcessed: 1780
    },
    {
      id: "token_gatekeeper",
      handle: "@token_gatekeeper",
      name: "Garde-Barrière Zéro-Token",
      pole: "token_economy",
      plane: "alpha",
      status: "active",
      x: 680,
      y: 570,
      x3d: 70,
      y3d: 95,
      z3d: 0,
      cognitiveLoad: 19,
      tokenAllocation: 40,
      connections: ["@token_loop_recirculator"],
      architecture: "Filtre Déterministe Prioritaire (Routage Silicium vs Cloud)",
      latency: "1ms",
      equation: "IsDeterministic(Op) ? Run(TS) : Route(Gemini)",
      topology: "Aiguilleur Binaire Zéro Dérive",
      lastReasoning: "Routage du calcul de cubage directement sur le CPU client (0$ dépensé).",
      lastSentTo: "@token_loop_recirculator",
      lastReceivedFrom: "@token_loop_recirculator",
      whyAction: "Ne jamais consommer un token IA pour une opération que le code sait calculer.",
      packetsProcessed: 2950
    },

    // AGENT HOLISTIQUE
    {
      id: "omni_quantum_cartographer",
      handle: "@omni_quantum_cartographer",
      name: "Cartographe Quantique Total (6 Strates)",
      pole: "holistic",
      plane: "delta",
      status: "active",
      x: 450,
      y: 20,
      x3d: 0,
      y3d: -95,
      z3d: 70,
      cognitiveLoad: 75,
      tokenAllocation: 300,
      connections: ["@supervisor", "@human_language_master", "@pro_coder", "@quantum_prompt_equation_analyzer"],
      architecture: "Observateur Holistique Multidimensionnel • Télémétrie Active ΔOTel",
      latency: "3ms",
      equation: "Carto(Strates 1..6) ≡ Système Total Synchronisé",
      topology: "Matrice de Supervision Panoptique",
      lastReasoning: "Diffusion continue du modèle cognitif complet à l'ensemble de la flotte.",
      lastSentTo: "@supervisor",
      lastReceivedFrom: "@human_language_master",
      whyAction: "Offrir la cartographie visuelle totale sous tous les angles de vue.",
      packetsProcessed: 4500
    }
  ];

  private links: InterconnectionLink[] = [
    { id: "l1", source: "@human_language_master", target: "@supervisor", type: "governance_command", bandwidth: "10 Gbps", active: true },
    { id: "l2", source: "@conversational_dialogue_bridge", target: "@human_language_master", type: "deterministic_sync", bandwidth: "5 Gbps", active: true },
    { id: "l3", source: "@supervisor", target: "@supervisor_sentinel", type: "governance_command", bandwidth: "40 Gbps", active: true },
    { id: "l4", source: "@supervisor", target: "@sentinel_auto_reconfigurator", type: "auto_healing_pulse", bandwidth: "40 Gbps", active: true },
    { id: "l5", source: "@supervisor", target: "@quantum_prompt_equation_analyzer", type: "quantum_telepathy", bandwidth: "100 Gbps", active: true },
    { id: "l6", source: "@supervisor", target: "@pro_coder", type: "deterministic_sync", bandwidth: "25 Gbps", active: true },
    { id: "l7", source: "@supervisor", target: "@token_budget_calibrator", type: "deterministic_sync", bandwidth: "10 Gbps", active: true },
    { id: "l8", source: "@quantum_prompt_equation_analyzer", target: "@quantum_equation_vault_writer", type: "memory_tensor", bandwidth: "50 Gbps", active: true },
    { id: "l9", source: "@quantum_equation_vault_writer", target: "@alchemical_metalanguage_architect", type: "quantum_telepathy", bandwidth: "50 Gbps", active: true },
    { id: "l10", source: "@alchemical_metalanguage_architect", target: "@pro_coder", type: "quantum_telepathy", bandwidth: "80 Gbps", active: true },
    { id: "l11", source: "@pro_coder", target: "@live_ide_executor", type: "deterministic_sync", bandwidth: "20 Gbps", active: true },
    { id: "l12", source: "@live_ide_executor", target: "@code_synchronizer", type: "deterministic_sync", bandwidth: "20 Gbps", active: true },
    { id: "l13", source: "@sentinel_auto_reconfigurator", target: "@tool_reconfigurator", type: "auto_healing_pulse", bandwidth: "15 Gbps", active: true },
    { id: "l14", source: "@tool_reconfigurator", target: "@tool_inspector", type: "deterministic_sync", bandwidth: "10 Gbps", active: true },
    { id: "l15", source: "@notebook_structure_synthesizer", target: "@notebooklm_bridge", type: "memory_tensor", bandwidth: "25 Gbps", active: true },
    { id: "l16", source: "@notebooklm_bridge", target: "@conversational_dialogue_bridge", type: "deterministic_sync", bandwidth: "15 Gbps", active: true },
    { id: "l17", source: "@hardware_calibration_vault", target: "@token_budget_calibrator", type: "deterministic_sync", bandwidth: "5 Gbps", active: true },
    { id: "l18", source: "@token_gatekeeper", target: "@token_loop_recirculator", type: "deterministic_sync", bandwidth: "10 Gbps", active: true },
    { id: "l19", source: "@omni_quantum_cartographer", target: "@supervisor", type: "quantum_telepathy", bandwidth: "100 Gbps", active: true },
    { id: "l20", source: "@omni_quantum_cartographer", target: "@human_language_master", type: "quantum_telepathy", bandwidth: "50 Gbps", active: true },
    { id: "l21", source: "@symbol_lexicographer", target: "@human_language_master", type: "deterministic_sync", bandwidth: "20 Gbps", active: true },
    { id: "l22", source: "@quantum_prompt_equation_analyzer", target: "@symbol_lexicographer", type: "quantum_telepathy", bandwidth: "40 Gbps", active: true }
  ];

  private dialogues: AgentDialogueMessage[] = [
    {
      id: "diag_1",
      timestamp: new Date(Date.now() - 45000).toLocaleTimeString(),
      sender: "@supervisor",
      receiver: "@symbol_lexicographer",
      topic: "Harmonisation des Équations & Lexique",
      dialoguePhase: "proposition",
      content: "Demande de scan lexicographique de l'équation maîtresse Φ_SOI pour générer la double explication humaine et formelle.",
      technicalPayload: "Φ_SOI = ∮_σ [ ((∇Ψ ⊗ T_p) ★ H_∞) / (ρ_m · (1 + D_c)^λ_sep) ] · ΔOTel",
      equationAttached: "Φ_SOI ≡ 1",
      pole: "governance"
    },
    {
      id: "diag_2",
      timestamp: new Date(Date.now() - 32000).toLocaleTimeString(),
      sender: "@symbol_lexicographer",
      receiver: "@quantum_prompt_equation_analyzer",
      topic: "Exégèse Sémantique & Décomposition",
      dialoguePhase: "deliberation",
      content: "Décomposition des 12 symboles fondamentaux : ∇Ψ (Intention Pure), T_p (Transducteur), ρ_m (Inertie de Matière / Gel 48po). Prêt pour vulgarisation.",
      technicalPayload: "MRD v8.0 / Fock Hilbert space projection",
      equationAttached: "∇Ψ ⊗ T_p",
      pole: "notebook"
    },
    {
      id: "diag_3",
      timestamp: new Date(Date.now() - 20000).toLocaleTimeString(),
      sender: "@hardware_calibration_vault",
      receiver: "@symbol_lexicographer",
      topic: "Calibration Matière ρ_m & Télémétrie",
      dialoguePhase: "consensus",
      content: "Confirmation de la sonde matérielle ρ_m : Gel 48 pouces, foisonnement 1.25 et capacité camion 10 roues sont ancrés dans le Plan Alpha local.",
      technicalPayload: "ρ_m = (Gel_48po + Foisonnement_1.25) · Matrice_Réelle",
      equationAttached: "ρ_m",
      pole: "quantum_memory"
    },
    {
      id: "diag_4",
      timestamp: new Date(Date.now() - 10000).toLocaleTimeString(),
      sender: "@pro_coder",
      receiver: "@live_ide_executor",
      topic: "Rendu du Dictionnaire dans l'Interface",
      dialoguePhase: "execution",
      content: "Intégration du composant SymbolEquationDictionary.tsx terminée. Zéro dérive de layout, 100% responsive et fluide.",
      technicalPayload: "AST React 18 / Tailwind CSS / Motion",
      equationAttached: "AST ∩ Reality",
      pole: "code_execution"
    },
    {
      id: "diag_5",
      timestamp: new Date().toLocaleTimeString(),
      sender: "@human_language_master",
      receiver: "@supervisor",
      topic: "Validation Finale de Clarté Humaine",
      dialoguePhase: "validation",
      content: "Validation de la transmission : les métaphores humaines sont limpides et le formalisme technique reste d'une précision absolue (Ξ ≡ 1).",
      technicalPayload: "Indice de clarté E_100 = 100%",
      equationAttached: "Ξ = 1",
      pole: "direction"
    }
  ];

  private signals: SynapticSignal[] = [
    {
      id: "sig_init_1",
      sender: "@supervisor",
      receiver: "@quantum_prompt_equation_analyzer",
      label: "Tenseur d'Harmonisation Φ_SOI",
      timestamp: new Date().toLocaleTimeString(),
      intensity: "high",
      signalType: "quantum_tensor",
      equationSignature: "Φ_SOI ≡ 1",
      latencyMs: 3
    },
    {
      id: "sig_init_2",
      sender: "@sentinel_auto_reconfigurator",
      receiver: "@tool_reconfigurator",
      label: "Impulsion Auto-Guérison (S_f)",
      timestamp: new Date().toLocaleTimeString(),
      intensity: "medium",
      signalType: "auto_heal",
      equationSignature: "S_f = e^(iωt)",
      latencyMs: 7
    },
    {
      id: "sig_init_3",
      sender: "@pro_coder",
      receiver: "@live_ide_executor",
      label: "Synchronisation AST Modulaire",
      timestamp: new Date().toLocaleTimeString(),
      intensity: "high",
      signalType: "deterministic_pulse",
      equationSignature: "AST ∩ Reality",
      latencyMs: 5
    }
  ];

  private isSimulating: boolean = true;
  private intensityMultiplier: number = 1.0;
  private faultTolerance: number = 98;
  private subscribers: Set<Subscriber> = new Set();
  private intervalId: any = null;
  private activePacketsCount: number = 42;

  constructor() {
    this.startSimulation();
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
      nodes: this.nodes,
      signals: this.signals,
      links: this.links,
      dialogues: this.dialogues,
      isSimulating: this.isSimulating,
      intensityMultiplier: this.intensityMultiplier,
      faultTolerance: this.faultTolerance,
      activePacketsCount: this.activePacketsCount
    };
  }

  public addDialogueMessage(
    sender: string, 
    receiver: string, 
    topic: string, 
    content: string, 
    dialoguePhase: AgentDialogueMessage["dialoguePhase"] = "deliberation",
    technicalPayload?: string,
    equationAttached?: string
  ) {
    const senderNode = this.nodes.find(n => n.handle === sender || n.id === sender);
    const newMsg: AgentDialogueMessage = {
      id: `diag_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString(),
      sender,
      receiver,
      topic,
      dialoguePhase,
      content,
      technicalPayload,
      equationAttached: equationAttached || senderNode?.equation,
      pole: senderNode?.pole || "direction"
    };
    this.dialogues = [newMsg, ...this.dialogues.slice(0, 39)];
    this.triggerDirectSignal(sender, receiver, topic, "high");
    this.notify();
  }

  public triggerDirectSignal(senderHandle: string, receiverHandle: string, label: string, intensity: "low" | "medium" | "high") {
    const sender = this.nodes.find(n => n.handle === senderHandle || n.id === senderHandle);
    const receiver = this.nodes.find(n => n.handle === receiverHandle || n.id === receiverHandle);
    if (!sender || !receiver) return;

    const signalTypes: SynapticSignal["signalType"][] = [
      "quantum_tensor", 
      "deterministic_pulse", 
      "auto_heal", 
      "token_recirc"
    ];
    const chosenType = signalTypes[Math.floor(Math.random() * signalTypes.length)];

    const newSignal: SynapticSignal = {
      id: `sig_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      sender: sender.handle,
      receiver: receiver.handle,
      label,
      timestamp: new Date().toLocaleTimeString(),
      intensity,
      signalType: chosenType,
      equationSignature: sender.equation,
      latencyMs: Math.floor(Math.random() * 8) + 2
    };

    this.signals = [newSignal, ...this.signals.slice(0, 19)];
    this.activePacketsCount += 1;

    // Update nodes loads and stats
    this.nodes = this.nodes.map(n => {
      if (n.handle === sender.handle) {
        return {
          ...n,
          cognitiveLoad: Math.min(100, n.cognitiveLoad + (intensity === "high" ? 18 : 8)),
          lastSentTo: receiver.handle,
          packetsProcessed: n.packetsProcessed + 1
        };
      }
      if (n.handle === receiver.handle) {
        return {
          ...n,
          cognitiveLoad: Math.min(100, n.cognitiveLoad + (intensity === "high" ? 14 : 6)),
          lastReceivedFrom: sender.handle,
          packetsProcessed: n.packetsProcessed + 1
        };
      }
      return n;
    });

    this.notify();
  }

  public emitSynapticChainPulse() {
    // Chain reaction across the 6 poles
    const chain = [
      { sender: "@human_language_master", receiver: "@supervisor", label: "Impulsion d'Intention Primordiale (∇Ψ)" },
      { sender: "@supervisor", receiver: "@quantum_prompt_equation_analyzer", label: "Transmission Matricielle ψ_QMEM" },
      { sender: "@quantum_prompt_equation_analyzer", receiver: "@alchemical_metalanguage_architect", label: "Transmutation Alchimique H_∞" },
      { sender: "@alchemical_metalanguage_architect", receiver: "@pro_coder", label: "Génération Déterministe TypeScript" },
      { sender: "@pro_coder", receiver: "@live_ide_executor", label: "Injection Live dans l'Émulateur" },
      { sender: "@live_ide_executor", receiver: "@code_synchronizer", label: "Validation de Concordance Miroir (E_100 = 1)" },
      { sender: "@sentinel_auto_reconfigurator", receiver: "@supervisor_sentinel", label: "Scellement d'Auto-Guérison Sans Bruit" }
    ];

    chain.forEach((step, idx) => {
      setTimeout(() => {
        this.triggerDirectSignal(step.sender, step.receiver, step.label, "high");
      }, idx * 300);
    });
  }

  public updateNodePosition(nodeId: string, x: number, y: number) {
    this.nodes = this.nodes.map(n => {
      if (n.id === nodeId || n.handle === nodeId) {
        return { ...n, x, y };
      }
      return n;
    });
    this.notify();
  }

  public updatePowerSettings(intensityMultiplier: number, faultTolerance: number) {
    this.intensityMultiplier = intensityMultiplier;
    this.faultTolerance = faultTolerance;
    this.notify();
  }

  public toggleSimulation() {
    this.isSimulating = !this.isSimulating;
    if (this.isSimulating) {
      this.startSimulation();
    } else {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
    this.notify();
  }

  private startSimulation() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (this.nodes.length < 2) return;

      const senderIdx = Math.floor(Math.random() * this.nodes.length);
      let receiverIdx = Math.floor(Math.random() * this.nodes.length);
      while (receiverIdx === senderIdx) {
        receiverIdx = Math.floor(Math.random() * this.nodes.length);
      }

      const sender = this.nodes[senderIdx];
      const receiver = this.nodes[receiverIdx];
      const sampleLabels = [
        "Intrication tensorielle ψ",
        "Accord d'Harmonique Universelle H_∞",
        "Pression de matière ρ_m",
        "Compensation d'erreur fertile σ_err",
        "Recirculation de jetons 0$",
        "Indexation d'AST bidirectionnelle",
        "Télémétrie active OpenTelemetry"
      ];
      const label = sampleLabels[Math.floor(Math.random() * sampleLabels.length)];
      const intensities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
      const intensity = intensities[Math.floor(Math.random() * intensities.length)];

      this.triggerDirectSignal(sender.handle, receiver.handle, label, intensity);

      // Periodically generate inter-agent dialogue message
      if (Math.random() < 0.4) {
        const sampleDialogues = [
          {
            s: "@symbol_lexicographer",
            r: "@human_language_master",
            top: "Exégèse Sémantique & Équations",
            cont: "Validation du vocabulaire vulgarisé pour le symbole " + (["Ψ_m", "ρ_m", "∇Ψ", "Φ_SOI", "D_c", "Ξ"][Math.floor(Math.random() * 6)]) + " : zéro jargon inutile.",
            phase: "consensus" as const,
            eq: "Lexicon(Eq) ≡ Valid"
          },
          {
            s: "@supervisor",
            r: "@supervisor_sentinel",
            top: "Supervision de Cohérence Φ_SOI",
            cont: "Indice de réalité stable à Ξ = 1.00. Aucune dérive de jauge constatée dans le Plan Alpha.",
            phase: "validation" as const,
            eq: "Φ_SOI = 1.00"
          },
          {
            s: "@hardware_calibration_vault",
            r: "@token_budget_calibrator",
            top: "Télémétrie Matériel & Énergie",
            cont: "Consommation stable : 1.4 GB RAM, CPU 8%, Télémétrie ΔOTel synchrone à 60 FPS.",
            phase: "consensus" as const,
            eq: "ρ_m · ΔOTel"
          },
          {
            s: "@pro_coder",
            r: "@live_ide_executor",
            top: "Synchronisation AST Modulaire",
            cont: "Compilation atomique sans erreur. Respect strict du principe Zéro Slop et ergonomie responsive.",
            phase: "execution" as const,
            eq: "AST ∩ Reality"
          },
          {
            s: "@sentinel_auto_reconfigurator",
            r: "@tool_reconfigurator",
            top: "Auto-Guérison Proactive (S_f)",
            cont: "Inspection des canaux terminée : les quotas sont protégés, les caches locaux sont actifs.",
            phase: "consensus" as const,
            eq: "S_f = e^(iωt)"
          }
        ];
        const picked = sampleDialogues[Math.floor(Math.random() * sampleDialogues.length)];
        const newMsg: AgentDialogueMessage = {
          id: `diag_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          timestamp: new Date().toLocaleTimeString(),
          sender: picked.s,
          receiver: picked.r,
          topic: picked.top,
          dialoguePhase: picked.phase,
          content: picked.cont,
          technicalPayload: `Latence ${Math.floor(Math.random() * 8) + 2}ms | Signal direct`,
          equationAttached: picked.eq,
          pole: (this.nodes.find(n => n.handle === picked.s)?.pole) || "direction"
        };
        this.dialogues = [newMsg, ...this.dialogues.slice(0, 39)];
      }

      // Smooth decay
      this.nodes = this.nodes.map(n => ({
        ...n,
        cognitiveLoad: Math.max(15, n.cognitiveLoad - 2)
      }));
    }, 2400);
  }
}

export const agentCommunicationBus = new AgentCommunicationBus();
