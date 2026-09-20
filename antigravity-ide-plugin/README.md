# Module d'Intégration pour Antigravity IDE
## Bureau Windows 11 IA & Atelier Studio Multi-Agents (Φ_SOI)

Ce dossier autonome (`antigravity-ide-plugin/`) est conçu pour être incorporé directement dans **Antigravity IDE** (ou les IDEs basés sur le moteur Antigravity / Cursor / VS Code).

Il intègre nativement l'environnement de bureau **Windows 11 IA**, le panneau **Copilot**, l'**Atelier Studio Multi-Agents** et la **télémétrie matérielle** sous forme d'extension native et de panneau Webview haute performance.

---

## 📁 Contenu du Dossier

- **`antigravity.manifest.json`** : Manifeste officiel de l'extension pour Antigravity IDE (commandes, vues Webview, raccourcis clavier).
- **`package.json`** : Déclaration du paquet npm pour Antigravity IDE.
- **`antigravity-extension.ts`** : Point d'entrée de l'extension gérant le panneau Webview, la barre d'état et les commandes.
- **`antigravity-bridge.ts`** : Pont synaptique bidirectionnel (RPC, synchronisation des fichiers du workspace, télémétrie matérielle).
- **`install.sh`** : Script d'installation automatique pour Linux / macOS / Cloud Shell.
- **`install.bat`** : Script d'installation automatique en 1 clic pour Windows 11.

---

## 🚀 Guide d'Intégration dans Antigravity IDE

### Option 1 : Installation Automatique en 1 Clic

#### Sur Windows 11 :
1. Faites un clic droit sur `install.bat` puis sélectionnez **Exécuter en tant qu'administrateur** (ou double-cliquez dessus).
2. Le script copie automatiquement le dossier dans `%USERPROFILE%\.antigravity\extensions\antigravity-phiso-win11`.
3. Lancez ou rechargez **Antigravity IDE**.

#### Sur Linux / macOS / Cloud :
1. Ouvrez un terminal dans ce dossier et lancez :
   ```bash
   chmod +x install.sh
   ./install.sh
   ```
2. Rechargez la fenêtre dans Antigravity IDE (`Ctrl+Shift+P` > *Developer: Reload Window*).

---

### Option 2 : Installation Manuelle (Copie de Dossier)

1. Copiez l'intégralité du dossier `antigravity-ide-plugin/` dans le répertoire d'extensions d'Antigravity IDE :
   - **Windows** : `C:\Users\<VotreNom>\.antigravity\extensions\antigravity-phiso-win11`
   - **Linux / Mac** : `~/.antigravity/extensions/antigravity-phiso-win11`
2. Ouvrez Antigravity IDE. Le module est détecté automatiquement.

---

### Option 3 : Intégration par Panneau Webview / Navigateur Interne

Si vous utilisez Antigravity IDE avec le serveur Node.js actif sur le port `3000` :
1. Dans Antigravity IDE, ouvrez la palette de commandes (`Ctrl+Shift+P`).
2. Tapez **`Simple Browser: Show`** (ou *Navigateur interne Antigravity*).
3. Entrez l'URL :
   ```
   http://localhost:3000
   ```
4. Vous accédez directement au bureau **Windows 11 IA**. Utilisez le bouton **Paramètres** pour basculer vers l'**Atelier Studio** et le bouton **Revenir sur Windows 11 IA** pour retourner au bureau à tout moment.

---

## ⌨️ Raccourcis et Commandes dans Antigravity IDE

| Commande | Raccourci | Action |
| :--- | :--- | :--- |
| `antigravity.phiso.toggleView` | `Ctrl + Alt + W` | Basculer instantanément entre Windows 11 IA et l'Atelier Studio |
| `antigravity.phiso.openWindows11` | - | Ouvrir la vue Bureau Windows 11 IA |
| `antigravity.phiso.openStudio` | - | Ouvrir l'Atelier Studio Multi-Agents |
| `antigravity.phiso.scanHardware` | - | Lancer le scan des ports matériels locaux (GPU/vLLM/Victron) |

---

## 🛡️ Signature de Réalité
Conforme au noyau **Φ_SOI / AROA v8.0** :
$$\Phi_{SOI} = \oint_{\sigma} \left[ \frac{(\nabla \Psi \otimes \mathcal{T}_p) \star \mathcal{H}_\infty}{\rho_m \cdot (1 + D_c)^{\lambda_{sep}}} \right] \cdot \Delta OTel = \Xi \equiv 1$$
