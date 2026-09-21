/**
 * ActiveSecuritySentinel (Module Φ_SOI, Plan GAMMA)
 * Équipe A : Inspection interne et interception d'intrusions.
 */

export interface IntrusionAlert {
  component: string;
  vector: string;
  timestamp: number;
}

export class ActiveSecuritySentinel {
  // Détection des vecteurs d'attaque (Injection, fuite PII, accès non autorisé)
  public inspectFlux(data: string, context: string): { compromised: boolean; alert?: IntrusionAlert } {
    const attackVectors = [
      /eval\s*\(/i,
      /document\.cookie/i,
      /window\.localStorage/i,
      /DROP TABLE/i,
      /SELECT .* FROM/i
    ];

    for (const vector of attackVectors) {
      if (vector.test(data)) {
        return {
          compromised: true,
          alert: {
            component: context,
            vector: vector.source,
            timestamp: Date.now()
          }
        };
      }
    }

    return { compromised: false };
  }
}

export const activeSecuritySentinel = new ActiveSecuritySentinel();
