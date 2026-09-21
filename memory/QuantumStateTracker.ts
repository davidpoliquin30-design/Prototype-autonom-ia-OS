import { cryptoVault } from "../vault/cryptoVault";

/**
 * QuantumStateTracker (Module Φ_SOI, Plan ALPHA/BÊTA)
 * Observateur réactif et persistance en temps réel pour l'état du système.
 */

export interface StateFrame {
  id: string;
  module: string;
  data: Record<string, any>;
  timestamp: number;
}

export class QuantumStateTracker {
  private dbName = "PhiSOI_QuantumState";
  private storeName = "snapshots";
  private db: IDBDatabase | null = null;
  private secret = "phi-soi-master-key";

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 2);
      request.onupgradeneeded = () => {
        request.result.createObjectStore(this.storeName, { keyPath: "id" });
      };
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Enregistre un StateFrame avec chiffrement automatique
   */
  public async capture(module: string, data: Record<string, any>): Promise<string> {
    if (!this.db) await this.init();
    
    const frame: StateFrame = {
      id: `frame-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      module,
      data,
      timestamp: Date.now()
    };

    const encryptedData = await cryptoVault.encrypt(JSON.stringify(frame.data), this.secret);
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readwrite");
      transaction.objectStore(this.storeName).put({
        id: frame.id,
        module,
        data: encryptedData,
        timestamp: frame.timestamp
      });
      transaction.oncomplete = () => resolve(frame.id);
      transaction.onerror = () => reject(transaction.error);
    });
  }

  /**
   * Réhydrate le dernier état scellé
   */
  public async getLatestState(): Promise<StateFrame | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const store = this.db!.transaction(this.storeName, "readonly").objectStore(this.storeName);
      const request = store.openCursor(null, "prev");
      
      request.onsuccess = async (e) => {
        const cursor = (e.target as IDBRequest).result;
        if (cursor) {
          const decryptedData = await cryptoVault.decrypt(cursor.value.data, this.secret);
          resolve({
            id: cursor.value.id,
            module: cursor.value.module,
            data: JSON.parse(decryptedData),
            timestamp: cursor.value.timestamp
          });
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const quantumStateTracker = new QuantumStateTracker();
