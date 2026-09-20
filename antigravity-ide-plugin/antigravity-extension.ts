/**
 * Extension Entry Point pour Antigravity IDE
 * Cible : Antigravity IDE / Cursor / VS Code compatible engine
 */

import { AntigravitySynapticBridge, globalAntigravityBridge, AntigravityMessage } from './antigravity-bridge';

export interface ExtensionContextLike {
  subscriptions: Array<{ dispose: () => any }>;
  extensionUri: { fsPath: string; toString: () => string };
  globalState: { get: (key: string) => any; update: (key: string, value: any) => Promise<void> };
}

export interface WebviewViewLike {
  webview: {
    options: any;
    html: string;
    postMessage: (message: any) => Promise<boolean> | PromiseLike<boolean>;
    onDidReceiveMessage: (listener: (e: any) => any) => { dispose: () => any };
  };
}

/**
 * Fournisseur de Webview pour Antigravity IDE
 */
export class AntigravityWindows11ViewProvider {
  public static readonly viewType = 'antigravity.view.windows11';
  private _view?: WebviewViewLike;

  constructor(
    private readonly _extensionUri: { fsPath: string; toString: () => string },
    private readonly _bridge: AntigravitySynapticBridge = globalAntigravityBridge
  ) {}

  public resolveWebviewView(webviewView: WebviewViewLike): void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview();

    webviewView.webview.onDidReceiveMessage((data: AntigravityMessage) => {
      this._bridge.handleWebviewMessage(data);
    });
  }

  public switchView(target: 'windows11' | 'studio'): void {
    if (this._view) {
      this._view.webview.postMessage({ type: 'switch_view', target });
    }
  }

  private _getHtmlForWebview(): string {
    const serverUrl = process.env.AIS_DEV_URL || 'http://localhost:3000';

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Windows 11 IA & Atelier Studio Φ_SOI</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #0b0d14;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>
<body>
  <iframe id="phiso-frame" src="${serverUrl}" allow="camera; microphone; clipboard-read; clipboard-write;"></iframe>
  <script>
    const vscode = (typeof acquireVsCodeApi === 'function') ? acquireVsCodeApi() : null;
    const iframe = document.getElementById('phiso-frame');

    window.addEventListener('message', event => {
      const msg = event.data;
      if (vscode && msg) {
        vscode.postMessage(msg);
      }
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(msg, '*');
      }
    });
  </script>
</body>
</html>`;
  }
}

/**
 * Fonction d'activation appelée lors du démarrage dans Antigravity IDE
 */
export function activate(context: ExtensionContextLike, hostApi?: any): void {
  console.log('[Antigravity IDE Plugin] Activation du module Windows 11 IA & Atelier Studio Φ_SOI.');

  const provider = new AntigravityWindows11ViewProvider(context.extensionUri, globalAntigravityBridge);

  if (hostApi?.window?.registerWebviewViewProvider) {
    context.subscriptions.push(
      hostApi.window.registerWebviewViewProvider(AntigravityWindows11ViewProvider.viewType, provider)
    );
  }

  // Enregistrement des commandes pour la palette de commandes (Ctrl+Shift+P)
  if (hostApi?.commands?.registerCommand) {
    context.subscriptions.push(
      hostApi.commands.registerCommand('antigravity.phiso.openWindows11', () => {
        provider.switchView('windows11');
        hostApi?.window?.showInformationMessage?.('Basculement vers le Bureau Windows 11 IA');
      })
    );

    context.subscriptions.push(
      hostApi.commands.registerCommand('antigravity.phiso.openStudio', () => {
        provider.switchView('studio');
        hostApi?.window?.showInformationMessage?.("Basculement vers l'Atelier Studio Multi-Agents");
      })
    );

    context.subscriptions.push(
      hostApi.commands.registerCommand('antigravity.phiso.toggleView', () => {
        const next = globalAntigravityBridge.toggleView();
        provider.switchView(next);
      })
    );
  }

  // Barre d'état Antigravity (Status Bar Item)
  if (hostApi?.window?.createStatusBarItem) {
    const statusBar = hostApi.window.createStatusBarItem(1, 100);
    statusBar.text = '$(window) Windows 11 IA [Φ_SOI]';
    statusBar.tooltip = 'Basculer entre Windows 11 IA et Atelier Studio (Ctrl+Alt+W)';
    statusBar.command = 'antigravity.phiso.toggleView';
    statusBar.show();
    context.subscriptions.push(statusBar);
  }
}

export function deactivate(): void {
  console.log('[Antigravity IDE Plugin] Désactivation.');
}
