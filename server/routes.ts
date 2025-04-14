import express from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeUrl } from "./services/analyzer";
import { z } from "zod";
import { ZodError } from "zod";
import { urlRequestSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();
  
  // Analyze URL endpoint
  apiRouter.post("/analyze", async (req, res) => {
    try {
      // Validate request
      const validatedData = urlRequestSchema.parse(req.body);
      
      // Analyze the URL
      const analysis = await analyzeUrl(validatedData.url);
      
      // Store the analysis
      const savedAnalysis = await storage.createSeoAnalysis(analysis);
      
      res.status(200).json({ id: savedAnalysis.id });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          details: fromZodError(error).message 
        });
      } else if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });
  
  // Get analysis report by ID
  apiRouter.get("/analysis/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid analysis ID" });
      }
      
      const analysis = await storage.getSeoAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      res.status(200).json(analysis);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "An unknown error occurred" 
      });
    }
  });
  
  // Get recent analyses
  apiRouter.get("/analyses/recent", async (req, res) => {
    try {
      const analyses = await storage.getRecentSeoAnalyses();
      res.status(200).json(analyses);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "An unknown error occurred" 
      });
    }
  });
  
  // Register the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
