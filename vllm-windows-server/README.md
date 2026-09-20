# 🚀 Serveur GPU vLLM Indépendant (Intégration Windows 11 / WSL2)

Ce module fournit la structure complète pour exécuter un serveur d'inférence haute performance **vLLM** en local sur votre PC Windows 11 via **WSL2** et **Docker avec support GPU NVIDIA**, agissant comme le résonateur d'inférence souverain pour l'écosystème **Φ_SOI / MRD**.

---

## 📋 Prérequis sur Windows 11 :
1. **Windows 11** avec WSL2 activé (`wsl --install`).
2. **Pilotes NVIDIA récents** installés sur Windows (le support CUDA est transmis automatiquement à WSL2).
3. **Docker Desktop** installé avec l'option **"Use the WSL 2 based engine"** cochée et le support GPU activé dans les paramètres Docker -> General -> Use WSL 2.
4. **NVIDIA Container Toolkit** configuré dans WSL2 (généralement géré automatiquement par Docker Desktop sur Windows).

---

## 🛠️ Déploiement et Lancement :

1. Ouvrez votre terminal **WSL2 (Ubuntu)** ou **PowerShell** dans le dossier `/vllm-windows-server/`.
2. Lancez le conteneur vLLM via Docker Compose :
   ```bash
   docker compose up -d
   ```
3. Le serveur vLLM va télécharger et initialiser le modèle (par défaut `Qwen/Qwen2.5-Coder-7B-Instruct`) et écouter sur le port standard OpenAI :
   `http://localhost:8000/v1`

---

## 🔌 Connexion avec l'Application Φ_SOI :
Votre application dispose désormais du pont synaptique `VllmLocalBridge` (`/src/services/VllmLocalBridge.ts`) qui interroge directement ce serveur local pour toute inférence cognitive haut débit sans dépendre du Cloud ($Ξ \equiv 1$).
