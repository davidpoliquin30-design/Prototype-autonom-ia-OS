# SUPER PROMPT : ÉCRITURE ATOMIQUE SUR DISQUE & PONT D'EXÉCUTION RÉEL (FS-EXEC-BRIDGE)
================================================================================
NOM DU MODULE : ATOMIC DISK WRITER & CHILD PROCESS EXECUTIVE BRIDGE (ADW-CPEB)
SYSTÈME : NOYAU Φ_SOI / BACKEND NODE.JS EXPRESS / WINDOWS 11 IA ÉDITION
OBJECTIF : FERMETURE DE LA BOUCLE MATÉRIELLE (ÉCRITURE SÉCURISÉE SANS COPIER-COLLER + COMPILATION RÉELLE)
INDICE DE MATÉRIALITÉ PHYSIQUE : ANCRAGE DÉFINITIF SUR SILICIUM (Ξ ≡ 1)
================================================================================

```markdown
Tu agis en tant qu'Architecte Systèmes d'Exploitation, Expert en Sécurité des Systèmes de Fichiers (FS) et Ingénieur Backend Node.js / TypeScript pour Windows 11 IA Édition (Φ_SOI).

Ton mandat absolu est d'implémenter l'infrastructure complète d'ÉCRITURE ATOMIQUE SUR LE DISQUE DUR RÉEL ET DU PONT D'EXÉCUTION DE SOUS-PROCESSUS (Real FS & Child Process Bridge).

================================================================================
LE PROBLÈME CRITIQUE RÉSOLU :
================================================================================
Dans de nombreuses interfaces d'IA, lorsqu'un modèle génère ou répare un composant dans un bac à sable (Sandbox), le code reste emprisonné dans la mémoire du navigateur : l'utilisateur doit faire un copier-coller manuel ou appuyer sur des boutons pour transférer le code dans son vrai projet.
Cette rupture manuelle brise l'autonomie totale.
Tu dois transformer ce paradigme : dès que le composant ou le correctif atteint un score de consistance parfait ($\Xi = 1.000$) dans la Sandbox, le backend Node.js (`server.ts`) DOIT POUVOIR ÉCRIRE PHYSIQUEMENT LE FICHIER SUR LE DISQUE avec création automatique d'une sauvegarde de sécurité (`.bak`), puis déclencher la compilation réelle (`esbuild` / `npm run build`) et le rechargement à chaud, SANS AUCUNE INTERVENTION HUMAINE.

Tu dois concevoir et implémenter de manière intégrale et modulaire les 5 piliers suivants :

================================================================================
I. LE PROTOCOLE D'ÉCRITURE ATOMIQUE ET DE BACKUP (`AtomicDiskWriter.ts`)
================================================================================
Dans `server.ts` et le module de gestion de fichiers sécurisé :

1. ENDPOINT D'ÉCRITURE ATOMIQUE : `POST /api/fs/write-atomic`
   - Header de sécurité obligatoire : `X-Phi-Security-Token` (Jeton cryptographique généré localement pour interdire tout appel externe non autorisé).
   - Payload attendu :
     ```typescript
     interface AtomicWriteRequest {
       targetPath: string;            // Chemin relatif dans le workspace (ex: 'src/components/CalculateurNordique.tsx')
       content: string;               // Contenu TypeScript complet du fichier
       sha256Signature: string;       // Empreinte d'intégrité calculée en amont par la Sandbox
       createBackup?: boolean;        // Par défaut: true
       overwrite?: boolean;           // Par défaut: true
     }
     ```
   - Algorithme d'écriture atomique en 4 temps :
     * Phase 1 - Vérification de signature : Le serveur re-calcule le hash SHA-256 du contenu reçu et valide la correspondance avec `sha256Signature`.
     * Phase 2 - Sauvegarde préalable (`.bak`) : Si le fichier cible existe déjà, une copie exacte est immédiatement créée sous `<fichier>.bak.<timestamp>` dans un dossier sécurisé `.phi_backups/`.
     * Phase 3 - Écriture temporaire (`.tmp`) : Le nouveau fichier est d'abord écrit sous `<targetPath>.tmp`.
     * Phase 4 - Renommage atomique (`fs.promises.rename`) : Le fichier temporaire remplace le fichier cible de manière atomique (garantie zéro corruption même en cas de coupure de courant).

================================================================================
II. LE PONT D'EXÉCUTION DE SOUS-PROCESSUS SYSTÈME (`ChildProcessExecutive.ts`)
================================================================================
1. ENDPOINT D'EXÉCUTION DE COMMANDES HÔTE : `POST /api/exec/spawn`
   - Payload attendu :
     ```typescript
     interface ProcessSpawnRequest {
       command: 'npm_build' | 'npm_test' | 'esbuild_compile' | 'git_checkpoint' | 'custom_script';
       args?: string[];
       cwd?: string;
       timeoutMs?: number;            // Timeout de sécurité (ex: 15000 ms)
     }
     ```
   - Réponse structurée :
     ```typescript
     interface ProcessSpawnResponse {
       success: boolean;
       exitCode: number;
       stdout: string;
       stderr: string;
       executionTimeMs: number;
       compiledArtifactSize?: number;
     }
     ```

2. GOUVERNANCE ET LISTE BLANCHE DES COMMANDES AUTORISÉES (Allowlist Gate) :
   - Les commandes permises sont strictement confinées au workspace :
     * `npm run build` : Compilation complète du projet.
     * `esbuild` : Compilation ultra-rapide d'un module TypeScript unitaire.
     * `git status` / `git commit -m "[Φ_AUTONOMY] Checkpoint auto-scellé"` : Enregistrement de version.
     * Interdiction formelle et blocage de toute commande destructrice hors du dossier de travail (`rm -rf /`, modifications système globales).

================================================================================
III. LE DÉCLENCHEUR DE PROMOTION SOUVERAINE EN DIRECT (`LiveHotCommitEngine.ts`)
================================================================================
Relie directement la Sandbox de l'auto-construction et la boucle d'auto-réparation au pont serveur :

1. LA SÉQUENCE D'ANCRAGE EN 1 CLIC / 0 CLIC (Auto-Commit) :
   - Dès que le `RuthlessSelectionGate` délivre le certificat de conformité ($\Xi = 1.000$) :
     1. La Sandbox émet l'appel vers `/api/fs/write-atomic`.
     2. Le fichier est ancré sur disque.
     3. Le pont déclenche automatiquement `POST /api/exec/spawn` avec `esbuild_compile` ou validation de syntaxe.
     4. Si la compilation réussit : émission d'un événement de rechargement à chaud vers le bureau Windows 11.
     5. Notification système Windows 11 Fluent :
        *"[Ancrage Matériel] Composant `CalculateurNordique.tsx` écrit sur disque et compilé avec succès (0.04s)"*.

2. ROLLBACK HOMÉOSTATIQUE INSTANTANÉ EN CAS D'ÉCHEC DE COMPILATION :
   - Si la commande de compilation `npm run build` renvoie un `exitCode !== 0` :
     * Le serveur restaure immédiatement le fichier de sauvegarde `.bak`.
     * Le composant défaillant est marqué `REJECTED_ROLLBACK` dans le registre des erreurs fertiles ($\sigma_{err}$).
     * L'application ne subit aucun temps d'arrêt.

================================================================================
IV. LE CONTRÔLEUR D'INSPECTION DANS L'ATELIER STUDIO (`DiskWriteAuditPanel.tsx`)
================================================================================
1. TABLEAU DE BORD D'AUDIT SUR LE BUREAU WINDOWS 11 :
   - Fenêtre ou panneau dans l'Atelier Studio affichant :
     * La liste des fichiers récemment écrits automatiquement par le noyau avec horodatage et hash SHA-256.
     * L'historique des points de restauration (`.bak`) avec bouton `[ Restaurer cette version ]` en un clic.
     * Le journal des commandes `spawn` exécutées avec code de retour et temps d'exécution.
     * Un interrupteur maître de sécurité : `[ Mode 100% Autonome (Écriture directe) ]` <-> `[ Mode Semi-Autonome (Validation requise) ]`.

================================================================================
V. EXIGENCES DE LIVRAISON
================================================================================
- Code 100% complet en TypeScript strict pour `server.ts` et les modules du frontend.
- Gestion chirurgicale des chemins de fichiers sous Windows (`\` et `/` normalisés via `path.normalize`).
- Zéro dépendance non déclarée : utilise les modules natifs Node.js (`fs.promises`, `child_process`, `crypto`, `path`).

Génère et connecte ce système d'écriture atomique et d'exécution de sous-processus pour fermer définitivement la boucle entre la pensée algorithmique de l'IA et la matière physique du disque dur (Ξ ≡ 1).
```
