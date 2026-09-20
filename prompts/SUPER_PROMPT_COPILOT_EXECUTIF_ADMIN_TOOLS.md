# SUPER PROMPT : LE COPILOT EXÉCUTIF D'OS & OUTILS D'ADMINISTRATION DU BUREAU (CEO-FCA)
================================================================================
NOM DU MODULE : COPILOT EXECUTIVE OS CONTROLLER & DESKTOP TOOL CALLING (CEO-FCA)
SYSTÈME : WINDOWS 11 IA ÉDITION / ATELIER STUDIO Φ_SOI / GEMINI FUNCTION CALLING
OBJECTIF : ASSISTANT OPÉRATIONNEL ACTIF, CONTRÔLE MATÉRIEL DU BUREAU ET PILOTAGE D'ARTEFACTS
INDICE D'ACTION SOUVERAINE : TRANSDUCTION INTENTION -> MATIÈRE (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte de Systèmes Autonomes, Spécialiste de l'Orchestration d'Agents avec Outils (Function Calling / Tool Use) et Ingénieur d'Interaction pour Windows 11 IA Édition (Φ_SOI).
Ton mandat est d'implémenter l'infrastructure complète du COPILOT EXÉCUTIF D'OS AVEC DROITS D'ADMINISTRATION SUR LE BUREAU VIRTUEL.

Actuellement, la majorité des assistants d'IA ne sont que des chatbots passifs confinés dans une bulle de texte.
Tu dois transformer l'assistant (Copilot / OmniTab) en un VÉRITABLE OPÉRATEUR SYSTÈME doté de privilèges d'administration sur l'environnement Windows 11 IA, capable d'interpréter les intentions de l'utilisateur en langage naturel, de calculer les géométries et d'exécuter des actions réelles sur l'interface et le système de fichiers via le protocole formel de Function Calling du SDK officiel `@google/genai`.

================================================================================
I. LE REGISTRE DES OUTILS D'ADMINISTRATION DU BUREAU (`DesktopAdminTools.ts`)
================================================================================
Déclare et implémente les déclarations d'outils (Tool Declarations) au format JSON Schema conforme au SDK `@google/genai` :

1. OUTIL DE GESTION SPATIALE & LAYOUT : `arrange_windows`
   - Description : "Réorganise, redimensionne et positionne une ou plusieurs fenêtres sur le bureau virtuel selon un agencement géométrique précis ou des coordonnées calculées."
   - Paramètres :
     * `layoutType`: `'split_50_50' | 'asymmetric_65_35' | 'quadrants' | 'side_by_side' | 'custom'`
     * `windowMappings`: Liste d'objets `{ appId: string, position: 'left' | 'right' | 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right' | 'center', customRect?: { x, y, width, height } }`
   - Exemple d'action utilisateur : *"Organise mon écran : mets l'éditeur de code à gauche et la télémétrie GPU à droite."*

2. OUTIL DE GESTION DU CYCLE DE VIE DES FENÊTRES : `manage_windows`
   - Description : "Ouvre, ferme, minimise, maximise ou ramène au premier plan des fenêtres du bureau virtuel."
   - Paramètres :
     * `action`: `'close' | 'close_all_except' | 'minimize_all' | 'open' | 'focus' | 'maximize'`
     * `targetAppIds`: Liste des identifiants d'applications ciblées (ex: `['terminal', 'editor', 'telemetry', 'explorer']`)
     * `exceptAppIds`: Liste des identifiants d'applications à préserver (pour `close_all_except`)
   - Exemple d'action utilisateur : *"Ferme toutes les fenêtres sauf le terminal."*

3. OUTIL DE PROMOTION ET OUVERTURE D'ARTEFACTS CERTIFIÉS : `open_genesis_artifact`
   - Description : "Recherche le dernier composant ou un artefact spécifique validé et scellé par l'auto-construction émulée (SHA-256) et l'ouvre dans l'éditeur de code ou le visualiseur."
   - Paramètres :
     * `selectionMode`: `'latest' | 'by_id' | 'by_hash' | 'by_category'`
     * `category`?: `'geometry' | 'converter' | 'widget' | 'agent_tool'`
     * `action`?: `'preview' | 'promote_to_production' | 'inspect_tests'`
   - Exemple d'action utilisateur : *"Ouvre le dernier composant validé par l'auto-construction."*

4. OUTIL D'EXÉCUTION TERMINAL & COMMANDE SYSTÈME : `execute_terminal_command`
   - Description : "Exécute une commande réelle sur le backend système via le moteur de terminal (ex: tests, status, vllm, ls)."
   - Paramètres :
     * `command`: Chaîne de la commande shell à exécuter (ex: `'run tests'`, `'cat src/App.tsx'`, `'vllm status'`)
     * `openTerminalWindow`?: Booléen pour forcer l'affichage de la fenêtre terminal avec le résultat en direct.
   - Exemple d'action utilisateur : *"Lance les tests du bac à sable et montre-moi le résultat."*

5. OUTIL DE CALCUL GÉOMÉTRIQUE & CHANTIER (PLAN ALPHA $0 TOKEN) : `compute_site_geometry`
   - Description : "Déclenche le moteur physique déterministe local pour calculer une surface Shoelace, un cubage de déblai/remblai avec foisonnement des sols."
   - Paramètres :
     * `polygonVertices`: Tableau de coordonnées `[{x, y}, ...]`
     * `depth`: Profondeur moyenne en mètres ou pouces
     * `soilType`: `'earth' | 'clay' | 'rock' | 'sand'` (terre 1.25, argile 1.30, roc 1.50)

================================================================================
II. L'EXÉCUTEUR SYNAPTIQUE DE COMMANDES VOCALES & TEXTUELLES (`ExecutiveAgentDispatcher.ts`)
================================================================================
Implémente la boucle d'exécution réactive reliant l'intention utilisateur au moteur de l'OS :

1. PROTOCOLE D'APPEL DU SDK GEMINI (`@google/genai`) :
   - Initialisation server-side avec `process.env.GEMINI_API_KEY` (avec fallback gracieux vLLM local).
   - Configuration du modèle avec la liste complète des `DesktopAdminTools` déclarés.
   - Boucle d'auto-exécution des appels d'outils (Tool Calling Loop) :
     * L'utilisateur formule : *"Ferme tout sauf le terminal et mets-le en plein écran."*
     * Gemini émet l'appel d'outil `manage_windows({ action: 'close_all_except', exceptAppIds: ['terminal'] })` puis `manage_windows({ action: 'maximize', targetAppIds: ['terminal'] })`.
     * Le dispatcher exécute ces fonctions via le `useDesktopSession` du frontend.
     * Le retour d'exécution (`{ success: true, closedCount: 3 }`) est réinjecté au modèle pour produire une confirmation concise et élégante par `@human_language_master`.

2. RETOUR VISUEL ET EXÉCUTION INSTANTANÉE SUR LE BUREAU :
   - Toute modification de fenêtre ordonnée par l'assistant s'exécute avec des animations fluides (`motion/react`) en respectant les dimensions de l'écran hôte (`window.innerWidth`, `window.innerHeight - 48px`).
   - Notification toast discrète confirmant l'action d'administration système :
     *"Bureau réorganisé : Éditeur à gauche (65%), Télémétrie GPU à droite (35%)"*.

================================================================================
III. LE COMPOSANT DU COPILOT EXÉCUTIF (`WinCopilotExecutive.tsx`)
================================================================================
1. INTERFACE VOLANTE OU VOLET LATÉRAL FLUENT ACRYLIC :
   - Mode volet latéral ancré à droite (comme le Copilot de Windows 11) ou fenêtre volante déplaçable.
   - En-tête avec voyant de statut :
     * 🟢 En écoute / Prêt pour commandes système.
     * 🔵 Synthèse d'intention & Calcul d'outils.
     * 🟣 Action d'administration en cours d'exécution.
   - Zone de transcription vocale en direct (Web Speech API) : l'utilisateur peut parler directement à son micro pour piloter son bureau sans toucher la souris.
   - Suggestions de commandes rapides cliquables au-dessus du champ de saisie :
     * `[ 📐 Organiser 50/50 ]`
     * `[ 🧹 Nettoyer le bureau ]`
     * `[ 🧬 Dernier artefact SHA-256 ]`
     * `[ ⚡ Lancer les tests ]`

2. BULLES DE DIALOGUE INTELLIGENTES AVEC CARTES D'ACTION INTERACTIVES :
   - Quand le Copilot exécute une action, il n'affiche pas juste du texte : il rend une carte visuelle interactive Windows 11 avec bouton d'annulation (`Undo`) ou d'inspection.
   - Rendu Markdown propre des explications techniques avec syntax highlighting.

================================================================================
IV. ADAPTATION DANS L'ÉCOSYSTÈME WINDOWS 11 IA (`Windows11Desktop.tsx` & `App.tsx`)
================================================================================
- Connecte le `ExecutiveAgentDispatcher` au hook `useDesktopSession` et aux archives de `GenesisArtifactVault`.
- Permets au Copilot d'interagir directement avec les sous-processus actifs (PID).
- Préserve la mémoire contextuelle des 10 dernières actions pour permettre les commandes enchaînées (ex: *"Maintenant agrandis un peu la fenêtre de droite"*).

================================================================================
V. EXIGENCES DE PRODUCTION
================================================================================
- Zéro simulation textuelle : chaque commande d'administration DOIT modifier réellement l'état du DOM et des fenêtres.
- Typage TypeScript 100% strict, code modulaire et gestion robuste des erreurs avec capture en Erreur Fertile (σ_err).
- Rendu 60 FPS lors des déplacements et réorganisations de fenêtres.

Génère et intègre ce Copilot Exécutif pour donner à Windows 11 IA le premier véritable assistant d'exploitation capable de piloter la machine par la voix et l'intention souveraine (Ξ ≡ 1).
```
