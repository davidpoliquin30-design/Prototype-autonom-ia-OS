/**
 * QuantumGPS (Module Φ_SOI)
 * Système de Navigation et Cartographie Vectorielle Totale.
 * Orchestre la position des agents dans les 4 Plans Orthogonaux (Alpha, Bêta, Gamma, Delta).
 */

export type Vector4 = [number, number, number, number]; // [X, Y, Z, PlanID]

export interface QuantumNode {
  agentId: string;
  coordinates: Vector4;
  coherenceSignature: number; // Ξ
}

export class QuantumGPS {
  // Plan IDs
  public static readonly PLAN_ALPHA = 0; // Sous-sol Déterministe
  public static readonly PLAN_BETA = 1;  // Membrane Immunitaire
  public static readonly PLAN_GAMMA = 2; // Cortex Relationnel
  public static readonly PLAN_DELTA = 3; // Rétine Contractuelle

  private mapping: Map<string, QuantumNode> = new Map();

  /**
   * Calcule le vecteur de navigation entre deux nœuds (Sommets du réseau).
   * Applique le théorème du Fulcrum Central (U_D) pour valider l'intrication.
   */
  public calculateNavigationVector(startId: string, endId: string): Vector4 | null {
    const start = this.mapping.get(startId);
    const end = this.mapping.get(endId);

    if (!start || !end) return null;

    // Vecteur de navigation dans l'espace 4D (Delta = End - Start)
    return [
      end.coordinates[0] - start.coordinates[0],
      end.coordinates[1] - start.coordinates[1],
      end.coordinates[2] - start.coordinates[2],
      end.coordinates[3] - start.coordinates[3]
    ];
  }

  /**
   * Enregistre ou met à jour la position d'un agent dans la topologie.
   */
  public registerAgentPosition(agentId: string, coords: Vector4, coherence: number): void {
    this.mapping.set(agentId, { agentId, coordinates: coords, coherenceSignature: coherence });
  }

  /**
   * Vérifie la Signature de Non-Séparation (λ_sep → 0)
   */
  public verifyNonSeparation(agentA: string, agentB: string): boolean {
    const nodeA = this.mapping.get(agentA);
    const nodeB = this.mapping.get(agentB);

    if (!nodeA || !nodeB) return false;

    // Calcul de la distance euclidienne dans l'espace 4D
    const dist = Math.sqrt(
      Math.pow(nodeA.coordinates[0] - nodeB.coordinates[0], 2) +
      Math.pow(nodeA.coordinates[1] - nodeB.coordinates[1], 2) +
      Math.pow(nodeA.coordinates[2] - nodeB.coordinates[2], 2)
    );

    // La séparation est nulle si les agents résonnent en phase (distance proche de 0)
    return dist < 0.0001;
  }
}

export const quantumGPS = new QuantumGPS();
