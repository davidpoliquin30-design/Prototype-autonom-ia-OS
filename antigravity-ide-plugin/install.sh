#!/usr/bin/env bash
# ==============================================================================
# Script d'installation du module Windows 11 IA & Atelier Studio dans Antigravity IDE
# ==============================================================================

set -e

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ANTIGRAVITY_EXT_DIR="$HOME/.antigravity/extensions/antigravity-phiso-win11"

echo "============================================================"
echo " Intégration Windows 11 IA & Atelier Studio dans Antigravity IDE"
echo "============================================================"

# Créer le répertoire des extensions Antigravity s'il n'existe pas
mkdir -p "$HOME/.antigravity/extensions"

# Créer un lien symbolique ou copier les fichiers
if [ -d "$ANTIGRAVITY_EXT_DIR" ]; then
  echo "[1/3] Suppression de l'ancienne version..."
  rm -rf "$ANTIGRAVITY_EXT_DIR"
fi

echo "[2/3] Liaison du plugin vers $ANTIGRAVITY_EXT_DIR..."
ln -s "$PLUGIN_DIR" "$ANTIGRAVITY_EXT_DIR" || cp -r "$PLUGIN_DIR" "$ANTIGRAVITY_EXT_DIR"

echo "[3/3] Plugin installé avec succès !"
echo ""
echo "Pour activer dans Antigravity IDE :"
echo " 1. Redémarrez ou rechargez Antigravity IDE (Ctrl+Shift+P > Reload Window)"
echo " 2. Cliquez sur l'icône Windows 11 dans la barre latérale gauche"
echo " 3. Utilisez le raccourci Ctrl+Alt+W pour basculer entre Windows 11 et l'Atelier Studio"
echo "============================================================"
