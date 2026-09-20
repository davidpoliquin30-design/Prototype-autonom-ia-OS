# 📖 Documentation Architecture Système : Phœnix Workspace & Engine

Ce fichier `README.md` décrit l'architecture technique, la topologie logicielle et le fonctionnement de l'application.

---

## 🏗️ 1. Vue d'Ensemble de l'Architecture

L'application est construite selon une architecture full-stack modulaire :
* **Client (Front-end)** : React 18, TypeScript, Tailwind CSS, Vite.
* **Serveur (Back-end)** : Express (Node.js) sur le port 3000.
* **Moteur d'Inférence** : Support du SDK officiel `@google/genai` (serveur) combiné à un mode déterministe local en fallback (0 $ jeton).

---

## 🗂️ 2. Structure des Dossiers du Projet

```
/
├── server.ts                       # Serveur principal Express & relais API
├── src/
│   ├── App.tsx                     # Composant racine et gestionnaire de bureau
│   ├── components/                 # Composants d'interface (Bureau, Dock, Fenêtres)
│   │   ├── dock/                   # Barre des tâches, contrôles et panneaux
│   │   ├── modals/                 # Fenêtres modales et réglages
│   │   └── ui/                     # Éléments d'UI réutilisables
│   ├── services/                   # Logiciel métier & intégrations
│   │   ├── agents/                 # Services de routage API
│   │   ├── export/                 # Générateur de bundles autonomes
│   │   ├── agentMeshHub.ts         # Hub de communication inter-modules
│   │   └── aiStudioService.ts      # Service d'intégration IA
│   ├── types.ts                    # Définitions des types TypeScript
│   └── main.tsx                    # Point d'entrée React
├── prompts/                        # Fichiers de règles et instructions système
└── metadata.json                   # Métadonnées de l'application
```

---

## 🔄 3. Fonctionnement des Modules et Flux de Données

1. **Interface Utilisateur (Bureau Virtuel)** :
   * L'utilisateur interagit avec des fenêtres de travail (Terminal, Éditeur, Paramètres) intégrées dans un bureau dynamique.

2. **Relais Serveur Sécurisé (`/server.ts`)** :
   * Les requêtes d'API vers les modèles de langage passent exclusivement par le serveur local `/api/chat` ou `/api/generate`.
   * Les clés d'API sont conservées côté serveur via `process.env.GEMINI_API_KEY` et ne sont jamais exposées directement au navigateur client.

3. **Boucle d'Auto-Correction (`Self-Healing Pipeline`)** :
   * Lorsque des scripts ou des vérifications de code sont lancés, le serveur capture les logs d'erreur.
   * Si une erreur survient, le système tente un ajustement de syntaxe en boucle fermée (limité à 3 essais pour des raisons de sécurité).

4. **Mode Fallback Local** :
   * Si aucune clé d'API n'est renseignée dans l'environnement, le système bascule automatiquement sur un moteur d'exécution local déterministe sans interrompre l'interface.

---

## 🛡️ 4. Sécurité & Bonnes Pratiques

* **Gestion des Secrets** : Déclarés dans `.env.example`, chargés en variables d'environnement.
* **Isolation des Ports** : Le serveur écoute sur `0.0.0.0:3000` conformément à la configuration réseau.
* **Sécurité Côté Client** : Aucune clé sensible n'est enregistrée en clair dans le code source.

---

*Documentation générée pour la maintenance et la compréhension de l'architecture du projet.*
