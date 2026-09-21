import JSZip from "jszip";

export interface SovereignDeploymentFile {
  name: string;
  path: string;
  description: string;
  content: string;
  language: string;
}

export interface SovereignDeploymentPackage {
  files: SovereignDeploymentFile[];
  summary: {
    totalFiles: number;
    recommendedGpuVram: string;
    defaultPort: number;
    supportedLocalEngines: string[];
  };
}

class SovereignBundleGenerator {
  public generateDeploymentFiles(): SovereignDeploymentPackage {
    const dockerComposeContent = `version: '3.8'

services:
  # 1. APPLICATION PRINCIPALE Φ_SOI (NODE.JS & REACT)
  phi_soi_app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: phi_soi_sovereign_core
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - SOVEREIGN_OFFLINE_MODE=true
      - OLLAMA_LOCAL_ENDPOINT=http://ollama_engine:11434
      - VLLM_LOCAL_ENDPOINT=http://vllm_engine:8000/v1
      # Optionnel : Ajoutez votre clé Google Gemini pour le mode hybride cloud
      - GEMINI_API_KEY=\${GEMINI_API_KEY:-}
    volumes:
      - ./data/workspace:/app/workspace
      - ./data/memory:/app/data
    depends_on:
      - ollama_engine
    networks:
      - phi_soi_network

  # 2. MOTEUR D'INFÉRENCE LOCAL OLLAMA (0$ TOKEN / AIR-GAPPED)
  ollama_engine:
    image: ollama/ollama:latest
    container_name: phi_soi_ollama_local
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_models:/root/.ollama
    # Décommentez pour activer l'accélération matérielle NVIDIA GPU
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: all
    #           capabilities: [gpu]
    networks:
      - phi_soi_network

networks:
  phi_soi_network:
    driver: bridge

volumes:
  ollama_models:
    driver: local
`;

    const dockerfileContent = `# ÉTAPE 1 : BUILDER TYPESCRIPT & VITE
FROM node:20-alpine AS builder
WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm ci

# Copie des fichiers sources et build complet
COPY . .
RUN npm run build

# ÉTAPE 2 : RUNTIME SOUVERAIN MINIMALISTE
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production

# Copie des artefacts compilés
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts

# Création des dossiers persistants
RUN mkdir -p /app/workspace /app/data

EXPOSE 3000

CMD ["npm", "start"]
`;

    const envLocalContent = `# CONFIGURATION DÉPLOIEMENT LOCAL SOUVERAIN (Φ_SOI)
PORT=3000
NODE_ENV=production
SOVEREIGN_OFFLINE_MODE=true

# Endpoints Moteurs Locaux (0$ de Token)
OLLAMA_LOCAL_ENDPOINT=http://localhost:11434
VLLM_LOCAL_ENDPOINT=http://localhost:8000/v1

# Modèle d'inférence local par défaut
DEFAULT_LOCAL_MODEL=qwen2.5-coder:7b

# Clé API Google Gemini (Optionnelle - Fallback Cloud Hybride)
GEMINI_API_KEY=
`;

    const deployScriptContent = `#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DE DÉPLOIEMENT AUTOMATIQUE LOCAL SOUVERAIN (Φ_SOI v8.0)
# ==============================================================================
set -e

echo -e "\\033[1;36m========================================================\\033[0m"
echo -e "\\033[1;36m 🚀 DÉPLOIEMENT DU SYSTÈME D'AUTO-ÉVOLUTION RÉFLEXIVE Φ_SOI\\033[0m"
echo -e "\\033[1;36m========================================================\\033[0m"

# 1. Vérification des prérequis
echo -e "\\n\\033[1;33m[1/4] Vérification de l'environnement matériel...\\033[0m"
if command -v docker &> /dev/null; then
    echo -e "  ✅ Docker détecté : $(docker --version)"
else
    echo -e "  ❌ Docker n'est pas installé. Veuillez installer Docker Desktop ou Docker Engine."
    exit 1
fi

if command -v nvidia-smi &> /dev/null; then
    echo -e "  ⚡ Accélération GPU NVIDIA détectée :"
    nvidia-smi --query-gpu=name,memory.total --format=csv,noheader
else
    echo -e "  ℹ️ Aucun GPU NVIDIA détecté. Le système utilisera le CPU pour l'inférence locale."
fi

# 2. Création des répertoires de stockage persistant
echo -e "\\n\\033[1;33m[2/4] Initialisation des volumes persistants...\\033[0m"
mkdir -p data/workspace data/memory

# 3. Lancement des conteneurs Docker
echo -e "\\n\\033[1;33m[3/4] Démarrage de la stack conteneurisée (App + Ollama)...\\033[0m"
docker compose up -d --build

# 4. Téléchargement automatique du modèle de code local
echo -e "\\n\\033[1;33m[4/4] Préchargement du modèle de code local (Qwen 2.5 Coder 7B)...\\033[0m"
sleep 5
docker exec -it phi_soi_ollama_local ollama pull qwen2.5-coder:7b || true

echo -e "\\n\\033[1;32m========================================================\\033[0m"
echo -e "\\033[1;32m 🎉 DÉPLOIEMENT RÉUSSI !\\033[0m"
echo -e "\\033[1;32m 👉 Accédez à l'Atelier Studio : http://localhost:3000\\033[0m"
echo -e "\\033[1;32m 👉 Moteur d'Inférence Local : http://localhost:11434\\033[0m"
echo -e "\\033[1;32m========================================================\\033[0m"
`;

    const readmeContent = `# 🛡️ Guide de Déploiement Local Souverain Φ_SOI

Ce pack permet d'exécuter l'application **Google AI Studio Φ_SOI** en totale indépendance cloud (Air-Gapped, 0$ de token).

---

## 📋 Prérequis

- **Docker & Docker Compose** (Docker Desktop pour Windows/macOS ou Docker Engine sous Linux).
- **RAM recommandée** : 16 Go minimum (32 Go idéal pour les modèles 14B).
- **GPU (Optionnel mais recommandé)** : NVIDIA RTX 3060/4060 ou supérieur (VRAM ≥ 8 Go) avec le package \`nvidia-container-toolkit\`.

---

## 🚀 Démarrage en 1 Clic

1. Décompressez l'archive dans un dossier de votre choix :
   \`\`\`bash
   unzip phi-soi-sovereign-deploy.zip -d phi-soi-local
   cd phi-soi-local
   \`\`\`

2. Rendez le script exécutable et lancez le déploiement :
   \`\`\`bash
   chmod +x deploy.sh
   ./deploy.sh
   \`\`\`

3. Ouvrez votre navigateur sur **[http://localhost:3000](http://localhost:3000)**.

---

## ⚙️ Configuration du Mode Hybride (Optionnel)

Si vous souhaitez utiliser à la fois l'inférence locale (Ollama/vLLM) et les modèles cloud Google Gemini (Gemini 3.8 Flash & Gemini 3.1 Pro), renseignez votre clé dans le fichier \`.env.local\` :
\`\`\`env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
\`\`\`
Puis redémarrez la stack :
\`\`\`bash
docker compose restart phi_soi_app
\`\`\`

---

## 🏛️ Architecture Déployée

- **Port 3000** : Atelier Studio Φ_SOI (TypeScript / React / Express).
- **Port 11434** : Serveur Ollama d'inférence locale (Qwen 2.5 Coder, Llama 3.3, DeepSeek-R1).
- **Plan Alpha Déterministe** : Exécution immédiate des calculs physiques dans le navigateur sans latence.
`;

    const configContent = `{
  "system": "Φ_SOI",
  "version": "8.0.0-sovereign",
  "runtime": "local_airgapped",
  "deterministicEngine": {
    "planAlpha": true,
    "soilSwelling": {
      "standard": 1.25,
      "clay": 1.30,
      "rock": 1.50
    },
    "defaultTruckCapacityM3": 12
  },
  "localInference": {
    "primaryProvider": "ollama",
    "primaryEndpoint": "http://localhost:11434",
    "secondaryEndpoint": "http://localhost:8000/v1",
    "recommendedModels": [
      "qwen2.5-coder:7b",
      "llama3.3:8b",
      "deepseek-r1:8b"
    ]
  }
}`;

    const files: SovereignDeploymentFile[] = [
      {
        name: "docker-compose.yml",
        path: "docker-compose.yml",
        description: "Orchestration multi-conteneurs (App Studio + Moteur Local Ollama GPU)",
        content: dockerComposeContent,
        language: "yaml",
      },
      {
        name: "Dockerfile",
        path: "Dockerfile",
        description: "Image de production Node 20 multi-stage allégée",
        content: dockerfileContent,
        language: "dockerfile",
      },
      {
        name: "deploy.sh",
        path: "deploy.sh",
        description: "Script d'initialisation et de déploiement en 1 clic (Linux/Mac/WSL)",
        content: deployScriptContent,
        language: "bash",
      },
      {
        name: ".env.local",
        path: ".env.local",
        description: "Variables d'environnement préconfigurées pour l'inférence locale",
        content: envLocalContent,
        language: "env",
      },
      {
        name: "phi_soi_offline_config.json",
        path: "phi_soi_offline_config.json",
        description: "Paramètres déterministes du Plan Alpha et de la matrice MRD",
        content: configContent,
        language: "json",
      },
      {
        name: "README_DEPLOIEMENT_LOCAL.md",
        path: "README_DEPLOIEMENT_LOCAL.md",
        description: "Documentation complète d'installation et d'exploitation souveraine",
        content: readmeContent,
        language: "markdown",
      },
    ];

    return {
      files,
      summary: {
        totalFiles: files.length,
        recommendedGpuVram: "8 Go (RTX 3060/4060 ou +)",
        defaultPort: 3000,
        supportedLocalEngines: ["Ollama (Port 11434)", "vLLM (Port 8000)", "Moteur Déterministe Navigateur"],
      },
    };
  }

  public async downloadZipBundle(): Promise<void> {
    const pkg = this.generateDeploymentFiles();
    const zip = new JSZip();

    for (const file of pkg.files) {
      zip.file(file.path, file.content);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `phi-soi-sovereign-deployment-${new Date().toISOString().slice(0, 10)}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const sovereignBundleGenerator = new SovereignBundleGenerator();
