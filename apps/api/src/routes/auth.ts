import { Router } from "express";
import { z } from "zod";
import { issueDemoToken } from "../middleware/auth.js";
import { ApiError } from "../middleware/errors.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const credentials = loginSchema.parse(req.body);
  if (credentials.email !== "alex@recruitops.ai" || credentials.password !== "Password123!") {
    throw new ApiError(401, "Invalid credentials");
  }
  res.json(issueDemoToken());
});
