import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { users } from "../config/seed.js";
import { ApiError } from "./errors.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Missing bearer token");
  }
  const payload = jwt.verify(header.slice("Bearer ".length), env.JWT_SECRET) as { sub: string; email: string; role: string };
  req.user = { id: payload.sub, email: payload.email, role: payload.role };
  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, "Insufficient permissions");
    }
    next();
  };
}

export function issueDemoToken() {
  const user = users[0];
  if (!user) {
    throw new ApiError(500, "Demo user seed data is not configured");
  }
  return {
    user,
    accessToken: jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
    })
  };
}
