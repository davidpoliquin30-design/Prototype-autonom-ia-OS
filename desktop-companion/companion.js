/**
 * Φ_SOI Desktop Companion Gateway (Companion Node.js Server)
 * Agit en tant que passerelle locale (similaire à Ollama) pour l'application Φ_SOI sur Windows.
 */

import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
const PORT = 11434; // Même port qu'Ollama pour compatibilité native avec le pont quantique

app.use(cors());
app.use(express.json());

// Endpoint de compatibilité /api/tags (simule Ollama)
app.get("/api/tags", (req, res) => {
  res.json({
    models: [
      { name: "phi-soi-local:7b", size: 4710000000, digest: "phi-soi-local-hash" },
      { name: "qwen2.5-coder:7b", size: 4700000000, digest: "qwen-coder-hash" }
    ]
  });
});

// Endpoint d'inférence locale simulée ou routée
app.post("/api/generate", (req, res) => {
  const { model, prompt } = req.body;
  console.log(`[Φ_SOI Companion] Inférence reçue pour le modèle ${model} : "${prompt}"`);
  
  // Réponse synthétique locale déterministe
  res.json({
    model: model || "phi-soi-local:7b",
    response: `[Passerelle Locale Φ_SOI] Traitement quantique validé (Ξ = 1.0) pour la requête : "${prompt}". Le Plan Alpha a exécuté le calcul déterministe avec succès.`,
    done: true
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "online", kernel: "Φ_SOI_COMPANION" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`==================================================`);
  console.log(`🚀 Φ_SOI COMPANION GATEWAY ACTIF SUR LE PORT ${PORT}`);
  console.log(`Prêt à recevoir les pulses du canevas quantique.`);
  console.log(`==================================================`);
});
