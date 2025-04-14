import { SeoAnalysis, InsertSeoAnalysis, User, InsertUser } from "@shared/schema";

export interface IStorage {
  // User methods (kept from template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // SEO Analysis methods
  createSeoAnalysis(analysis: InsertSeoAnalysis): Promise<SeoAnalysis>;
  getSeoAnalysis(id: number): Promise<SeoAnalysis | undefined>;
  getRecentSeoAnalyses(limit?: number): Promise<SeoAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private seoAnalyses: Map<number, SeoAnalysis>;
  private userCurrentId: number;
  private analysisCurrentId: number;

  constructor() {
    this.users = new Map();
    this.seoAnalyses = new Map();
    this.userCurrentId = 1;
    this.analysisCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // SEO Analysis methods
  async createSeoAnalysis(insertAnalysis: InsertSeoAnalysis): Promise<SeoAnalysis> {
    const id = this.analysisCurrentId++;
    const analysis: SeoAnalysis = { 
      ...insertAnalysis, 
      id,
      // Ensure timestamp is a Date object if it's not already
      timestamp: insertAnalysis.timestamp instanceof Date 
        ? insertAnalysis.timestamp 
        : new Date()
    };
    
    this.seoAnalyses.set(id, analysis);
    return analysis;
  }
  
  async getSeoAnalysis(id: number): Promise<SeoAnalysis | undefined> {
    return this.seoAnalyses.get(id);
  }
  
  async getRecentSeoAnalyses(limit: number = 10): Promise<SeoAnalysis[]> {
    return Array.from(this.seoAnalyses.values())
      .sort((a, b) => {
        const aTime = a.timestamp instanceof Date ? a.timestamp.getTime() : Number(a.timestamp);
        const bTime = b.timestamp instanceof Date ? b.timestamp.getTime() : Number(b.timestamp);
        return bTime - aTime; // Sort descending (most recent first)
      })
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
