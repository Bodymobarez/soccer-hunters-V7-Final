import express, { type Express } from "express";
import { storage } from "./storage";

export function registerDashboardRoutes(app: Express) {
  // Doctor dashboard endpoints
  app.get("/api/doctor", async (req, res) => {
    try {
      const userId = req.query.userId
        ? parseInt(req.query.userId as string)
        : null;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // For now, return a mock doctor profile or null if not found
      const doctors = await storage.getDoctors();
      const doctor = doctors.find((d) => d.id === userId) || null;

      if (!doctor) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }

      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctor profile" });
    }
  });

  app.get("/api/doctor/patients", async (req, res) => {
    try {
      const doctorId = req.query.doctorId
        ? parseInt(req.query.doctorId as string)
        : null;
      if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required" });
      }

      // Return mock patients data
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch patients" });
    }
  });

  app.get("/api/doctor/appointments", async (req, res) => {
    try {
      const doctorId = req.query.doctorId
        ? parseInt(req.query.doctorId as string)
        : null;
      if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required" });
      }

      // Return mock appointments data
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  // Club dashboard endpoints
  app.get("/api/club", async (req, res) => {
    try {
      const userId = req.query.userId
        ? parseInt(req.query.userId as string)
        : null;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // For now, return a mock club profile or null if not found
      const clubs = await storage.getClubs();
      const club = clubs.find((c) => c.id === userId) || null;

      if (!club) {
        return res.status(404).json({ message: "Club profile not found" });
      }

      res.json(club);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch club profile" });
    }
  });

  app.get("/api/club/interests", async (req, res) => {
    try {
      const clubId = req.query.clubId
        ? parseInt(req.query.clubId as string)
        : null;
      if (!clubId) {
        return res.status(400).json({ message: "Club ID is required" });
      }

      // Return mock interests data
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch interests" });
    }
  });

  app.get("/api/club/media", async (req, res) => {
    try {
      const clubId = req.query.clubId
        ? parseInt(req.query.clubId as string)
        : null;
      if (!clubId) {
        return res.status(400).json({ message: "Club ID is required" });
      }

      // Return mock media data
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });

  // Agent dashboard endpoints
  app.get("/api/agent", async (req, res) => {
    try {
      const userId = req.query.userId
        ? parseInt(req.query.userId as string)
        : null;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // For now, return a mock agent profile or null if not found
      const agents = await storage.getAgents();
      const agent = agents.find((a) => a.id === userId) || null;

      if (!agent) {
        return res.status(404).json({ message: "Agent profile not found" });
      }

      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent profile" });
    }
  });

  app.get("/api/agent/talents", async (req, res) => {
    try {
      const agentId = req.query.agentId
        ? parseInt(req.query.agentId as string)
        : null;
      if (!agentId) {
        return res.status(400).json({ message: "Agent ID is required" });
      }

      // Return mock talents data
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch talents" });
    }
  });

  app.get("/api/agent/negotiations", async (req, res) => {
    try {
      const agentId = req.query.agentId
        ? parseInt(req.query.agentId as string)
        : null;
      if (!agentId) {
        return res.status(400).json({ message: "Agent ID is required" });
      }

      // Return mock negotiations data
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch negotiations" });
    }
  });

  // Coach dashboard endpoints
  app.get("/api/coach", async (req, res) => {
    try {
      const userId = req.query.userId
        ? parseInt(req.query.userId as string)
        : null;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // For now, return a mock coach profile or null if not found
      const talents = await storage.getTalents();
      const coach =
        talents.find(
          (t) => t.id === userId && t.categoryId >= 2 && t.categoryId <= 5,
        ) || null;

      if (!coach) {
        return res.status(404).json({ message: "Coach profile not found" });
      }

      res.json(coach);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch coach profile" });
    }
  });

  app.get("/api/coach/media", async (req, res) => {
    try {
      const coachId = req.query.coachId
        ? parseInt(req.query.coachId as string)
        : null;
      if (!coachId) {
        return res.status(400).json({ message: "Coach ID is required" });
      }

      // Return mock media data
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });

  // POST endpoints for mutations
  app.post("/api/doctor", async (req, res) => {
    try {
      // Handle doctor profile creation/update
      res.json({ message: "Doctor profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update doctor profile" });
    }
  });

  app.post("/api/club", async (req, res) => {
    try {
      // Handle club profile creation/update
      res.json({ message: "Club profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update club profile" });
    }
  });

  app.post("/api/agent", async (req, res) => {
    try {
      // Handle agent profile creation/update
      res.json({ message: "Agent profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update agent profile" });
    }
  });

  app.post("/api/coach", async (req, res) => {
    try {
      // Handle coach profile creation/update
      res.json({ message: "Coach profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update coach profile" });
    }
  });

  app.post("/api/agent/talents", async (req, res) => {
    try {
      // Handle adding talent to agent
      res.json({ message: "Talent added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add talent" });
    }
  });

  app.post("/api/club/interests", async (req, res) => {
    try {
      // Handle adding interest to club
      res.json({ message: "Interest added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add interest" });
    }
  });

  app.post("/api/doctor/patients", async (req, res) => {
    try {
      // Handle adding patient to doctor
      res.json({ message: "Patient added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add patient" });
    }
  });
}
