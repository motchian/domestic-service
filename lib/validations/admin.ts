import { z } from "zod";

export const assignmentSchema = z.object({
  requestId: z.string().min(1),
  candidateId: z.string().min(1),
  clientId: z.string().min(1),
  startDate: z.string().optional(),
  endDate: z.string().optional()
});

export const assignmentUpdateSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected", "active", "completed", "cancelled"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional()
});

export const trainingSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  modules: z.array(z.string()).default([])
});

export const socialProgramSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(6).optional(),
  city: z.string().min(2),
  priorityLevel: z.enum(["low", "medium", "high", "critical"]),
  situation: z.string().min(10)
});

export const matchingRecommendSchema = z.object({
  requestId: z.string().min(1)
});

export const matchingProposeSchema = z.object({
  requestId: z.string().min(1),
  candidateId: z.string().min(1),
  message: z.string().optional()
});
