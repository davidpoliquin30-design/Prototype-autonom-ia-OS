/**
 * CryptoVault (Module Φ_SOI, Plan BÊTA)
 * Membrane Immunitaire Cryptographique : Chiffrement AES-256-GCM et SAS d'anonymisation.
 */

export class CryptoVault {
  private static readonly ALGO = "AES-GCM";
  
  // Génération d'une clé dérivée sécurisée (PBKDF2 simplifiée pour l'exemple)
  private async deriveKey(secret: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("phi-soi-salt"),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: CryptoVault.ALGO, length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  public async encrypt(data: string, secret: string): Promise<string> {
    const key = await this.deriveKey(secret);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(data);
    const ciphertext = await crypto.subtle.encrypt(
      { name: CryptoVault.ALGO, iv },
      key,
      encoded
    );
    
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(ciphertext), iv.length);
    return btoa(String.fromCharCode(...combined));
  }

  public async decrypt(encrypted: string, secret: string): Promise<string> {
    const key = await this.deriveKey(secret);
    const combined = new Uint8Array(atob(encrypted).split("").map(c => c.charCodeAt(0)));
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: CryptoVault.ALGO, iv },
      key,
      ciphertext
    );
    return new TextDecoder().decode(decrypted);
  }

  /**
   * SAS d'Anonymisation (shield) : Remplace PII par des tokens opaques {{VAR_*}}
   */
  public shield(data: string): { sanitized: string; tokens: Map<string, string> } {
    const tokens = new Map<string, string>();
    let sanitized = data;
    
    // Pattern de détection PII simplifié (Email, Monnaie, Noms)
    const piiRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\d+(?:\.\d{2})?\s?(?:USD|EUR))|([A-Z][a-z]+ [A-Z][a-z]+)/g;
    
    let match: RegExpExecArray | null;
    let i = 0;
    while ((match = piiRegex.exec(data)) !== null) {
      const token = `{{VAR_${i++}}}`;
      tokens.set(token, match[0]);
      sanitized = sanitized.replace(match[0], token);
    }
    
    return { sanitized, tokens };
  }

  /**
   * Réhydratation inverse
   */
  public rehydrate(sanitized: string, tokens: Map<string, string>): string {
    let rehydrated = sanitized;
    for (const [token, original] of tokens) {
      rehydrated = rehydrated.replace(token, original);
    }
    return rehydrated;
  }
}

export const cryptoVault = new CryptoVault();
