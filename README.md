Hey Reddit,

Over the past weeks, I’ve been developing an experimental web-based workspace inspired by the Windows 11 UI, combined with an autonomous AI agent architecture designed to run seamlessly in the browser and on containerized environments (Cloud Run).

Beyond the visual desktop environment, the core objective was to explore how modern AI agents actually operate under the hood and how to design a resilient, self-healing runtime around them.

🔗 Live Demo: https://untitled-app-8689.ai.studio
📁 Repository: https://untitled-app-8689.ai.studio

🖥️ 1. The Frontend: Desktop & Window Management
The interface replicates an interactive OS workspace with high fidelity:

Window Management: Movable, minimizable, and depth-sorted (z-index) windows with smooth transitions.

Integrated Native Tools: Virtual terminal emulator, interactive code editor, system monitor, and settings control center.

Pure Reactive UI: Built on React 18, TypeScript, Tailwind CSS, and Motion layout animations.

🧠 2. The Core Mechanic: Inside the AI Agent Loop (ReAct & Self-Healing)
A common misconception is that AI agents are just text generators. In this architecture, the agent operates as a closed-loop feedback machine following the ReAct (Reason + Act) pattern:

Perception (Context Window): The agent consumes the current system state, telemetry metrics, and user input.

Deterministic Reasoning: The LLM evaluates dependencies and determines which precise tool or function to trigger via structured function calling (JSON schemas).

Action Execution: The runtime executes the tool in the container (file read/write, code linting, health verification).

Observation & Self-Healing Loop: If an execution fails (e.g. build break, invalid module format, or runtime exception), the error output is treated as fertile telemetry. The agent analyzes the stack trace, formulates a corrective patch, recompiles, and hot-reloads without crashing the workspace.

⚙️ 3. Full-Stack & Dual-Engine Architecture
Server-Side Security & Probes: Node.js / Express backend with instant HTTP 200 health-check probes (/healthz, /_health) for zero-downtime container cold starts.

Official Google GenAI SDK (@google/genai): Proxied server-side to keep secrets safe.

Zero-Failure Local Fallback: If no API key is present or network drops, the OS automatically diverts to a local deterministic engine so the desktop remains 100% interactive offline.

Production Pipeline: React bundle compiled with Vite; backend bundled into an optimized standalone CommonJS binary (dist/server.cjs) via esbuild.

🛠️ Tech Stack:
Frontend: React 18, TypeScript, Tailwind CSS, Motion, Lucide Icons

Backend: Node.js, Express, esbuild

AI Orchestration: Google GenAI SDK (@google/genai), ReAct Pattern, Function Calling

Deployment: Google Cloud Run (Containerized SPA + API proxy)

I’d love to hear your thoughts, feedback on window fluidity, or technical questions about the autonomous agent feedback loop!

Davidpoliquin30@gmail.com

Option 2 : En Français (Idéal pour r/developpeurs, r/france ou forums tech)
Titre :

J'ai conçu un Web OS style Windows 11 intégrant la mécanique interne des agents IA autonomes (React, TypeScript & Node.js)

Contenu du post :

Bonjour à tous,

Je vous partage un projet sur lequel j'ai travaillé : une émulation complète d'un environnement de bureau Windows 11 dans le navigateur, couplée à une exploration pratique de la mécanique interne des agents IA et de l'auto-guérison de code (self-healing).

🔗 Démo en ligne : [Lien vers ton application partagée]

💻 1. L'Interface Bureau (Web OS)
Gestionnaire de fenêtres : Déplacement libre, redimensionnement, gestion dynamique de la profondeur () et animations fluides.

Outils embarqués : Émulateur de terminal en ligne de commande, éditeur de code/script intégré, moniteur système et panneau de configuration.

Interface réactive : Développée avec React 18, TypeScript, Tailwind CSS et Motion.

🧠 2. Comment fonctionne la mécanique interne de l'Agent IA ?
Plutôt qu'un simple générateur de texte, le système implémente une boucle de rétroaction fermée (feedback loop) basée sur le patron d'architecture ReAct (Raisonnement + Action) :

Perception : L'agent charge en mémoire la demande utilisateur, les fichiers du projet et l'état des services.

Raisonnement & Appel d'outils (Function Calling) : Le modèle analyse le besoin et émet des instructions structurées en JSON pour exécuter une action précise (lecture chirurgicale de fichier, exécution de commande, compilation).

Action en arrière-plan : Le serveur exécute l'action demandée dans un environnement sécurisé.

Observation & Auto-Correction (Self-Healing) : En cas d'erreur de compilation ou d'incompatibilité de type, l'anomalie n'est pas un point d'arrêt : elle est réinjectée dans le contexte comme une donnée d'observation. L'agent analyse la trace d'erreur, applique un patch correctif et recompile jusqu'à stabilisation.

⚙️ 3. Architecture Full-Stack & Résilience
Backend Node.js / Express : Gestion des routes API sécurisées, isolation des secrets et sondes de santé immédiates (/healthz) pour un déploiement fiable sur Google Cloud Run.

SDK Google GenAI officiel (@google/genai) : Inférence IA sécurisée côté serveur.

Mode Secours Local Déterministe : Si aucune clé d'API n'est configurée, l'application bascule automatiquement sur un moteur local pour que le bureau virtuel reste pleinement interactif sans jamais crasher.

Bundle de production : Compilation Vite pour le front-end et bundle CommonJS optimisé (dist/server.cjs) généré par esbuild.

N'hésitez pas à tester la démo et à me faire vos retours, que ce soit sur l'ergonomie du bureau, la fluidité des fenêtres ou la logique de la boucle agentique !

Davidpoliquin30@gmail.com
