# Φ_SOI Desktop Companion (.exe Generator)

Ce dossier contient le code nécessaire pour créer votre propre exécutable (`.exe`) sous Windows 11, agissant exactement comme un serveur local de type Ollama pour votre application **Φ_SOI**.

## 🛠️ Comment générer l'exécutable (`.exe`) sur votre PC Windows :

1. Assurez-vous d'avoir installé **Node.js** sur votre ordinateur Windows.
2. Ouvrez un terminal (CMD ou PowerShell) dans ce dossier.
3. Installez l'outil de compilation `pkg` globalement :
   ```bash
   npm install -g pkg
   ```
4. Compilez le script en exécutable Windows `.exe` :
   ```bash
   pkg companion.js --targets node18-win-x64 --output phisoi-companion.exe
   ```
5. Vous obtiendrez un fichier `phisoi-companion.exe`. 
   - Double-cliquez dessus pour lancer le serveur local sur le port `11434`.
   - Votre application web **Φ_SOI** se connectera automatiquement à ce compagnon via le pont quantique (`QuantumGeometricInterface`).
