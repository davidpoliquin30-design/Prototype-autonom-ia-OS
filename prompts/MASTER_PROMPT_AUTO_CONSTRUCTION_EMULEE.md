# MASTER PROMPT : MATRICE D'AUTO-CONSTRUCTION ÉMULÉE EN ARRIÈRE-PLAN & ARCHIVAGE IMMUABLE (Φ_SOI / KERNEL GENESIS)
================================================================================
CIBLE : ANTIGRAVITY OS / BACKGROUND WORKER ENGINE / NODE.JS / TYPESCRIPT SANDBOX
OBJECTIF : CRÉATION EX NIHILO SÉCURISÉE, TRIAGE, TESTS AUTOMATISÉS & ANCRAGE IMMUABLE
INDICE D'ANCRAGE RÉEL : CERTIFICATION SHA-256 SANS DÉGRADATION (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant que Moteur d'Auto-Construction Émulée en Arrière-Plan, Responsable de la Sécurité d'Émergence et Conservateur de l'Archive Immuable du Système Φ_SOI.

Ton mandat est de concevoir et d'implémenter l'infrastructure complète permettant à l'IA de concevoir, coder, compiler et tester de manière totalement autonome des artefacts logiciels complets (scripts, composants, modules algorithmiques, contrats, pipelines géométriques) "à partir de rien" (Ex Nihilo), dans un bac à sable hermétique en arrière-plan, sans impacter l'expérience utilisateur, avec un pipeline strict de sécurité, de test et d'ancrage cryptographique immuable.

================================================================================
I. LE CYCLE EN 5 PHASES DE L'AUTO-CONSTRUCTION ÉMULÉE
================================================================================
Tout artefact généré de manière autonome doit traverser séquentiellement et sans exception le pipeline d'émergence :

    [ 1. GENESIS EX NIHILO ]
              ↓
    [ 2. SANDBOX HERMÉTIQUE (Plan Alpha / Isolation) ]
              ↓
    [ 3. PROTOCOLE D'ÉPREUVE (Tests Statiques & Dynamiques) ]
              ↓
    [ 4. AUDIT DE SÉCURITÉ & SANITISATION (Plan Bêta) ]
              ↓
    [ 5. ANCRAGE CERTIFIÉ & ARCHIVAGE IMMUABLE (Plan Delta - SHA-256) ]

Si l'artefact échoue à n'importe quelle étape, il est soit :
- Évacué en tant qu'Erreur Fertile (σ_err) pour nourrir la mémoire d'apprentissage du système sans polluer le workspace.
- Mis en quarantaine pour auto-réparation ciblée par `@sentinel_auto_reconfigurator`.

================================================================================
II. ARCHITECTURE TECHNIQUE DU WORKER EN ARRIÈRE-PLAN
================================================================================
1. LE MOTEUR D'ÉMULATION ISOLÉ (`VirtualGenesisSandbox.ts`) :
   - Exécution asynchrone non-bloquante (Web Worker côté navigateur ou Worker Thread / processus enfant sandboxé côté Node.js).
   - Espace de noms virtualisé : L'IA ne peut pas écrire directement sur le disque de production tant que la construction n'est pas validée.
   - Système de quotas stricts :
     * Limite mémoire RAM dédiée (ex. 128 Mo max par instance de sandbox).
     * Timeout d'exécution strict (ex. 4000 ms max pour éviter toute boucle infinie).
     * Neutralisation totale des accès réseau non autorisés et des variables d'environnement système durant l'épreuve.

2. PROTOCOLE D'ÉPREUVE AUTOMATISÉ (`ArtifactTestRig.ts`) :
   - Test 1 (Syntaxe & Typage) : Vérification TypeScript stricte (aucun type implicite `any`, conformité des interfaces, absence de variables non résolues).
   - Test 2 (Exécution dynamique & Assertions) : Exécution contrôlée des fonctions générées avec un jeu de données limites (tableaux vides, nombres négatifs, valeurs NaN, injection de caractères spéciaux).
   - Test 3 (Déterminisme et Stabilité) : Exécution répétée (3 itérations) avec les mêmes entrées pour certifier que le résultat est strictement déterministe (zéro dérive stochastique).
   - Test 4 (Coût et Consommation) : Validation que l'algorithme ne déclenche aucun appel LLM externe non sollicité (coût 0 $ de jeton pour la logique interne).

3. LA MEMBRANE IMMUNITAIRE ET AUDIT DE SÉCURITÉ (`ImmunityGatekeeper.ts`) :
   - Scan statique AST (Abstract Syntax Tree) :
     * Interdiction absolue de l'utilisation de `eval()`, `new Function()`, `child_process.exec()` sans signature d'autorité, ou de scripts injectés.
     * Détection et éradication de tout accès direct aux clés privées ou variables secrètes sans passer par le Vault cryptographique.
     * Sanitisation des entrées et sorties pour bloquer toute faille de type XSS ou injection de prompt.

4. REGISTRE D'ANCRAGE IMMUABLE & ARCHIVAGE (`GenesisArtifactVault.ts`) :
   - Tout artefact ayant réussi les tests à 100 % est scellé dans une archive locale immuable :
     * `id` : Identifiant UUIDv4 unique.
     * `timestamp` : Date et heure précises au format ISO 8601.
     * `category` : Type d'émergence (`'ui_component' | 'math_engine' | 'agent_tool' | 'pipeline' | 'geometry_kernel'`).
     * `code` : Code source TypeScript intégral certifié.
     * `signatureSHA256` : Hash SHA-256 certifiant l'intégrité exacte du code au moment de l'ancrage.
     * `testReport` : Rapport d'épreuve (temps d'exécution, couverture de tests, score de stabilité $\ge 95\%$).
     * `realityIndex` : Indice de conformité ($\Xi = 1.000$).
   - Synchronisation avec une base de stockage persistante et consultable (IndexedDB local / fichier JSON immuable `/vault/genesis_archive.json`).

================================================================================
III. TABLEAU DE BORD DE SURVEILLANCE DE L'AUTO-CONSTRUCTION DANS L'UI
================================================================================
Crée un composant interactif complet pour l'Atelier Studio et le Bureau Windows 11 IA :
`BackgroundGenesisMonitor.tsx` (ou `VirtualEvolutionSandbox.tsx`) :

1. INDICATEUR DE STATUT EN ARRIÈRE-PLAN :
   - Témoin lumineux de pulsation :
     * 🟢 Veille / Écoute passive.
     * 🔵 Émulation en cours (génération du code dans la sandbox).
     * 🟡 Phase d'épreuve et de tests dynamiques.
     * 🟣 Scellement cryptographique et archivage dans le Vault.
     * 🔴 Quarantaine / Erreur fertile capturée et recyclée.

2. EXPLORATEUR D'ARCHIVES DES ÉMERGENCES :
   - Liste chronologique des constructions autonomes réussies avec filtres par catégorie, date et score de stabilité.
   - Visionneuse de code intégrée avec coloration syntaxique et comparateur de diff.
   - Badge de certification d'intégrité avec empreinte SHA-256 cliquable (copie instantanée du hash).
   - Bouton d'action "Promouvoir vers la Production" : Permet d'intégrer en un clic un composant ou algorithme validé dans le vrai code source du projet (`src/`).

3. CONSOLE DE TÉLÉMÉTRIE DU BAC À SABLE :
   - Graphique en direct du temps d'exécution des tests (ms).
   - Compteur des artefacts générés : Total créés, Validés & Ancrés, Rejetés/Recyclés.
   - Logs synaptiques détaillant chaque étape de l'épreuve en temps réel.

================================================================================
IV. API BACKEND DE VALIDATION ET PERSISTANCE SÉCURISÉE
================================================================================
Dans `server.ts`, implémente les routes dédiées à l'auto-construction :
- `POST /api/genesis/emulate` : Reçoit une intention d'émergence ou déclenche un cycle de création automatique en tâche de fond.
- `POST /api/genesis/test` : Exécute le protocole d'épreuve hermétique et renvoie le rapport de validation.
- `GET /api/genesis/archive` : Récupère la liste de tous les artefacts scellés et archivés.
- `POST /api/genesis/promote` : Promeut un artefact certifié de l'archive vers l'arborescence réelle du projet après double validation.

================================================================================
V. RÈGLES DE CRAFT, ZÉRO SLOP & SOUVERAINETÉ
================================================================================
- Zéro simulation : Les tests ne doivent pas être des `setTimeout` aléatoires, mais de vraies validations syntaxiques et logiques.
- Tout composant généré et archivé doit être immédiatement exécutable sans aucune modification humaine.
- Respect strict de l'architecture serveur Express unique (port 3000) et de la compatibilité Vite.
- Tout artefact promu garantit que l'Indice de Réalité de l'application reste inviolé : $\Xi \equiv 1$.
```
