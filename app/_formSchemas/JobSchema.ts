import { z } from "zod";

export const JobSchema = z.object({
  title: z.string().min(2, { message: "Job Title is required" }),
  description: z.string().optional(), // Make optional
  jobLocation: z.string().min(2, { message: "Job location is required" }),
  jobType: z.enum(["Contract", "Permanent"]), // Use `enum` for specific types
  applicationDeadline: z.date().optional(),
  grade: z.string().optional(), // Make optional
});
