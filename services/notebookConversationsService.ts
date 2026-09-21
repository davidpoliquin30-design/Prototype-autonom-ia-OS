import { NotebookConversation, ChatMessage } from "../types";

type ConversationListener = (conversations: NotebookConversation[], activeId: string | null) => void;

class NotebookConversationsService {
  private conversations: NotebookConversation[] = [];
  private activeConversationId: string | null = null;
  private listeners: Set<ConversationListener> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem("phi_soi_conversations");
      if (saved) {
        this.conversations = JSON.parse(saved);
        if (this.conversations.length > 0) {
          this.activeConversationId = this.conversations[0].id;
        }
      } else {
        // Create a default initial conversation
        this.createConversation("Session d'Évolution Initiale");
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem("phi_soi_conversations", JSON.stringify(this.conversations));
    } catch (err) {
      console.error("Failed to save conversations:", err);
    }
  }

  public getConversations(): NotebookConversation[] {
    return this.conversations;
  }

  public getActiveConversationId(): string | null {
    return this.activeConversationId;
  }

  public getActiveConversation(): NotebookConversation | null {
    return this.conversations.find(c => c.id === this.activeConversationId) || null;
  }

  public selectConversation(id: string) {
    this.activeConversationId = id;
    this.notify();
  }

  public createConversation(title: string): NotebookConversation {
    const newConv: NotebookConversation = {
      id: Math.random().toString(36).substring(7),
      title: title || `Fil d'Auto-Évolution #${this.conversations.length + 1}`,
      messages: [
        {
          id: "sys-init",
          role: "system",
          content: "Initialisation du bus synaptique Φ_SOI... Modélisation multi-agents active. Prêt pour l'ingestion de connaissances.",
          timestamp: new Date().toLocaleTimeString(),
          agentName: "🧬 @orchestrateur_central"
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.conversations.unshift(newConv);
    this.activeConversationId = newConv.id;
    this.saveToStorage();
    this.notify();
    return newConv;
  }

  public deleteConversation(id: string) {
    this.conversations = this.conversations.filter(c => c.id !== id);
    if (this.activeConversationId === id) {
      this.activeConversationId = this.conversations.length > 0 ? this.conversations[0].id : null;
    }
    this.saveToStorage();
    this.notify();
  }

  public addMessageToActive(role: 'user' | 'assistant' | 'system', content: string, agentName?: string): ChatMessage {
    const active = this.getActiveConversation();
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: new Date().toLocaleTimeString(),
      agentName,
    };

    if (active) {
      active.messages.push(newMsg);
      active.updatedAt = new Date().toISOString();
      this.saveToStorage();
      this.notify();
    }
    return newMsg;
  }

  /**
   * Safe real-time stream update method to bypass React closure issues.
   */
  public updateLastMessageInActive(content: string, agentName?: string) {
    const active = this.getActiveConversation();
    if (active && active.messages.length > 0) {
      const last = active.messages[active.messages.length - 1];
      if (last.role === "assistant") {
        last.content = content;
        if (agentName) last.agentName = agentName;
        active.updatedAt = new Date().toISOString();
        this.saveToStorage();
        this.notify();
      }
    }
  }

  public subscribe(listener: ConversationListener): () => void {
    this.listeners.add(listener);
    // Initial emission
    listener(this.conversations, this.activeConversationId);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.conversations], this.activeConversationId));
  }
}

export const notebookConversationsService = new NotebookConversationsService();
export default notebookConversationsService;
