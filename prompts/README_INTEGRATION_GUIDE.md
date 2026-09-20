# MASTER INTEGRATION GUIDE : COMMENT INTÉGRER CHAQUE SUPER PROMPT DANS VOS AUTRES APPLICATIONS
================================================================================
OBJECTIF : ARCHITECTURE MODULAIRE DES PROMPTS D'INTÉGRATION INDIVIDUELS
SYSTÈME : NOYAU Φ_SOI / RUNTIME LLM & AGENTIC WORKSPACE
================================================================================

Chacun des **Super Prompts** générés dans ce projet a été conçu pour être **totalement modulaire et autonome**. Cela signifie que tu peux prendre un prompt spécifique (par exemple, pour ajouter la mémoire évolutive, le heartbeat ou la synchro matérielle) et l'injecter directement dans le système de prompt système (`System Prompt`) de n'importe quelle autre application LLM ou agentique que tu développes.

Voici la cartographie de tes prompts d'intégration prêts à l'emploi dans `/prompts/` :

---

### 📂 1. Table des Prompts d'Intégration Disponibles

| Fichier Markdown dans `/prompts/` | Ce qu'il permet d'intégrer dans une autre app | Quand l'utiliser dans l'autre app |
| :--- | :--- | :--- |
| **`SUPER_PROMPT_HEARTBEAT_PROACTIF_AUTONOME.md`** | Le pouls proactif et les daemons d'arrière-plan (Cron server.ts). | Pour rendre l'IA active même sans message de l'utilisateur. |
| **`SUPER_PROMPT_PLANIFICATEUR_OBJECTIFS_DAG.md`** | Le graphe de tâches DAG et l'auto-coche étape par étape. | Pour gérer des tâches de développement complexes sur plusieurs étapes. |
| **`SUPER_PROMPT_ECRITURE_DISQUE_EXEC_REELLE.md`** | Les routes d'écriture atomique (`.bak`), les backups et `esbuild`. | Pour que l'IA écrive directement sur le disque dur sans copier-coller. |
| **`SUPER_PROMPT_BUS_EVENEMENTS_WEBSOCKETS_SSE.md`** | Le flux SSE / WebSockets temps réel en < 5 ms. | Pour éliminer le polling HTTP et synchroniser le UI instantanément. |
| **`SUPER_PROMPT_SAFETY_GOVERNOR_DISJONCTEUR.md`** | Le disjoncteur anti-emballement (Max 3 retries) et le CPU/GPU load guard. | Pour protéger la machine et le budget de jetons contre les boucles infinies. |
| **`SUPER_PROMPT_INTERFACE_WINDOWS11_NATIVE.md`** | L'ergonomie Fluent Design, le bureau libre et l'explorateur de fichiers. | Pour doter l'autre app d'une interface OS de bureau complète. |
| **`SUPER_PROMPT_EQUIPE_AGENTS_SYNC_MATERIELLE.md`** | L'escouade HSC (CPU, RAM, GPU, Disque, Victron Energy). | Pour connecter l'application à la réalité physique du PC hôte. |
| **`SUPER_PROMPT_CERVEAU_NEXUS_MEMOIRE_EVOLUTIVE.md`** | Le cerveau conversationnel à mémoire évolutive et adaptative. | Pour donner à l'agent une mémoire à long terme sémantique et AST. |
| **`SUPER_PROMPT_PIPELINE_SYNC_MATERIELLE_6_ETAPES.md`** | Le pipeline technique complet de synchronisation matérielle. | Pour déployer la télémétrie et l'auto-throttling en 6 étapes. |
| **`SUPER_PROMPT_4_PILIERS_MEMOIRE_EVOLUTIVE.md`** | Les 4 piliers de la mémoire cognitive (Vector store, State, Tools, Self-reflection). | Pour structurer l'architecture cognitive interne du LLM. |
| **`GRAND_MASTER_PROMPT_TOTAL.md`** | Le système complet unifié (tous les modules réunis en un seul prompt). | Pour une fusion totale et instantanée de l'écosystème Φ_SOI. |

---

### 🔌 Comment utiliser ces prompts dans une autre application :

1. Ouvre le fichier du prompt de ton choix dans le dossier `/prompts/` de ton projet.
2. Copie le bloc Markdown délimité sous le titre principal.
3. Colle-le directement dans :
   - Le **System Prompt** de ton modèle LLM (dans ton code d'appel API, ex: `systemInstruction` dans `@google/genai`).
   - Ou dans le fichier d'instructions système de ton agent (ex: `AGENTS.md`, `GEMINI.md`, ou le prompt de configuration de ton IDE/plateforme d'agent).
4. Le modèle adoptera instantanément les règles, les schémas de données TypeScript stricts et les comportements autonomes définis dans le module.
