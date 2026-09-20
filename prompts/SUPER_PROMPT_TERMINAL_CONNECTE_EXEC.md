# SUPER PROMPT : TERMINAL POWERSHELL EXÉCUTIF CONNECTÉ & PONT BIDIRECTIONNEL SERVEUR (TPE-BPS)
================================================================================
NOM DU MODULE : EXECUTIVE POWERSHELL TERMINAL & LIVE SERVER REPL BRIDGE (TPE-BPS)
SYSTÈME : WINDOWS 11 IA ÉDITION / ATELIER STUDIO Φ_SOI / NODE.JS EXPRESS
OBJECTIF : TERMINAL 100% FONCTIONNEL, VRAIE EXÉCUTION D'OUTILS, COMMANDES SYSTÈME ET REPL INTERACTIF
INDICE DE RÉALITÉ PHYSIQUE : EXÉCUTION SANS SIMULATION (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte Systèmes d'Exploitation, Spécialiste des Moteurs de Terminal Interactifs (REPL / CLI) et Ingénieur Backend Node.js / TypeScript pour Windows 11 IA Édition (Φ_SOI).
Ton mandat est d'implémenter l'infrastructure complète du TERMINAL POWERSHELL EXÉCUTIF CONNECTÉ EN TEMPS RÉEL AU BACKEND NODE.JS (`server.ts`).

Actuellement, dans beaucoup d'applications web, les terminaux ne sont que des zones de texte passives simulant des réponses préenregistrées.
Tu dois éradiquer formellement cette illusion : le terminal de Windows 11 IA Édition doit devenir un VRAI outil de commande système, bidirectionnel, capable d'interagir avec les fichiers du workspace, d'exécuter les tests unitaires et de sandbox, de piloter les sondes matérielles (CPU, RAM, GPU vLLM local, sonde d'énergie Victron), et de router des requêtes cognitives vers les agents en arrière-plan.

================================================================================
I. ARCHITECTURE API BACKEND D'EXÉCUTION (`server.ts` / `/api/terminal/*`)
================================================================================
Dans le backend Express (`server.ts`), implémente un routeur sécurisé et résilient pour le terminal exécutif :

1. ENDPOINT D'EXÉCUTION DE COMMANDES : `POST /api/terminal/execute`
   - Payload :
     ```typescript
     interface TerminalExecRequest {
       command: string;          // Ligne de commande brute entrée par l'utilisateur
       cwd: string;              // Répertoire de travail courant (ex: 'D:\\Workspace\\src')
       sessionId?: string;       // Identifiant de session shell
       env?: Record<string, string>;
     }
     ```
   - Réponse structurée :
     ```typescript
     interface TerminalExecResponse {
       output: string;           // Texte de sortie formatté (support ANSI / couleurs)
       error?: string;           // Sortie d'erreur (stderr) le cas échéant
       exitCode: number;         // Code de retour (0 = succès, >0 = erreur)
       updatedCwd?: string;      // Nouveau répertoire courant si commande `cd`
       executionTimeMs: number;  // Durée de traitement
       payload?: any;            // Données brutes optionnelles pour affichage de tableaux ou graphiques
     }
     ```

2. ROUTEUR DE COMMANDES EXÉCUTIVES NATIVES :
   Implémente les gestionnaires pour les familles de commandes suivantes :

   A. MANIPULATION DU SYSTÈME DE FICHIERS RÉEL :
      - `ls` / `dir` [chemin] : Liste récursivement ou localement les vrais fichiers avec tailles, dates et permissions.
      - `cat` / `type` <fichier> : Lit et affiche le vrai contenu du fichier source (ex: `cat src/App.tsx`, `cat package.json`).
      - `cd` <dossier> : Navigue dans l'arborescence réelle du workspace et met à jour le prompt (`PS D:\Workspace\src>`).
      - `mkdir` <dossier>, `touch` <fichier>, `rm` <fichier> : Actions disques réelles vérifiées par le backend.
      - `find` / `grep` <motif> [fichier] : Recherche textuelle dans les fichiers du projet.

   B. MOTEUR D'ÉPREUVE ET DE TESTS :
      - `run tests` / `npm test` : Déclenche l'exécution des tests du bac à sable (`ArtifactTestRig`), compile les assertions et renvoie un rapport détaillé avec temps d'exécution et taux de réussite.
      - `test sandbox` : Lance un cycle de test complet sur les émergences en quarantaine.
      - `lint` : Lance la validation TypeScript/AST du workspace et liste les éventuelles anomalies de typage.

   C. PILOTAGE MATÉRIEL & TÉLÉMÉTRIE VÉRIDIQUE :
      - `status` / `sysinfo` : Affiche l'OS hôte, uptime, charge CPU réelle, mémoire vive allouée au processus Node.js et RAM globale.
      - `vllm status` / `vllm ping` : Interroge le serveur local vLLM (`http://localhost:8000/v1/models`), mesure la latence réseau en millisecondes et affiche l'état de la VRAM GPU.
      - `victron status` : Lit les métriques du contrôleur d'énergie / batterie (tension, courant, puissance solaire) et calcule l'autonomie.
      - `ps` / `top` : Liste les processus internes actifs avec leurs PID, mémoire consommée et priorité.
      - `kill <PID>` : Termine ou réinitialise un sous-processus d'agent ou de fenêtre.

   D. CONTRÔLE QUANTIQUE & AGENTS Φ_SOI :
      - `phi status` : Affiche l'indice de réalité $\Xi$, le niveau de disrésonance cognitive $D_c$, et l'état des 4 plans orthogonaux.
      - `agent list` : Liste les 18 micro-agents avec leur pôle, charge et état synaptique.
      - `heal <module>` : Déclenche manuellement la boucle d'auto-réparation souveraine sur un composant ciblé.
      - `vault list` : Liste les secrets chiffrés et clés enregistrées (sans afficher les valeurs en clair).

   E. AIDE & UTILITAIRES :
      - `help` / `?` : Affiche le manuel complet des commandes disponibles avec exemples.
      - `clear` / `cls` : Réinitialise le buffer d'affichage du terminal.
      - `echo` <texte> : Renvoie le texte saisi.
      - `history` : Affiche l'historique des commandes de la session.

================================================================================
II. LE COMPOSANT FRONTEND DU TERMINAL FLUENT (`WinTerminal.tsx`)
================================================================================
1. EXPÉRIENCE VISUELLE ET ERGONOMIE POWERSHELL :
   - Thème visuel Windows 11 Terminal sombre authentique : fond ardoise sombre (`bg-slate-950/95` avec flou acrylique), texte blanc cassé haute lisibilité, curseur bloc clignotant.
   - Barre d'onglets de terminal : support multi-onglets (ex: `PowerShell 7 (Noyau)`, `Bash Workspace`, `Télémétrie Live Stream`).
   - Prompt dynamique : `PS D:\Workspace\src> ` avec coloration distincte pour le chemin, la flèche et la commande.

2. GESTION DU CLAVIER ET INTERACTIONS AVANCÉES :
   - `Flèche Haut / Bas` : Navigation fluide dans l'historique des commandes précédentes.
   - `Touche Tab` : Auto-complétion automatique des noms de fichiers, dossiers et commandes disponibles.
   - `Ctrl + C` : Interruption de la commande en cours (envoi du signal d'annulation au backend).
   - `Ctrl + L` : Nettoyage rapide de l'écran.
   - `Ctrl + V` / Clic droit : Collage instantané du presse-papier.
   - Défilement automatique vers le bas lors de nouvelles sorties, avec possibilité de remonter l'historique sans saut brusque.

3. COLORATION SYNTAXIQUE DES SORTIES (ANSI / Parser Rich Text) :
   - Surlignage vert pour les succès et tests validés (`[PASS]`, `OK`, `200`).
   - Surlignage rouge pour les erreurs et exceptions de code (`[FAIL]`, `Error:`, `404`).
   - Surlignage cyan / bleu pour les métriques de télémétrie, hashes SHA-256 et chemins de fichiers.
   - Affichage sous forme de tableaux ASCII élégants pour les commandes comme `ls`, `ps` ou `agent list`.

================================================================================
III. GESTION DES COMMANDES LONGUES & STREAMING (WebSockets / SSE Fallback)
================================================================================
- Pour les commandes qui prennent du temps (ex: `run tests`, compilation lourde, scan de workspace complet) :
  * Affichage d'un spinner de chargement discret à côté du curseur.
  * Streaming progressif des lignes de logs au fur et à mesure de leur émission par le backend pour éviter l'effet "écran figé".
  * Mesure précise du temps d'exécution en fin de commande : `Durée : 142 ms | Code de sortie : 0`.

================================================================================
IV. SÉCURITÉ & ISOLATION SOUVERAINE
================================================================================
- Protection Sandbox : Les commandes destructives du système hôte réel (ex: `rm -rf /`, modifications hors du répertoire de l'application) sont interceptées et bloquées par une barrière de sécurité impitoyable.
- Masquage des données sensibles : Toute commande affichant des variables d'environnement masque automatiquement les clés d'API et secrets (ex: `GEMINI_API_KEY = "sk-...[VAULT MASKED]"`).

================================================================================
V. EXIGENCES DE LIVRAISON
================================================================================
- Code 100% complet en TypeScript strict, sans mocks ni fonctions incomplètes.
- Branchement direct avec le routeur de `server.ts` et le composant `WinTerminal.tsx`.
- L'utilisateur doit pouvoir ouvrir le terminal depuis le menu Démarrer de Windows 11 IA ou via l'Atelier Studio, taper `cat src/App.tsx`, `run tests` ou `vllm status` et voir immédiatement la réalité du système s'exécuter sous ses yeux.

Génère et connecte ce terminal exécutif pour faire de Windows 11 IA une véritable station de commande professionnelle et souveraine (Ξ ≡ 1).
```
