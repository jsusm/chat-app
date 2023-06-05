import { Response, Request, NextFunction } from "express";
import { User } from "../types.js";
import { verifyJWT } from "../lib/jwt.js";

declare global {
  namespace Express {
    export interface Request {
      user: User
    }
  }
}

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401);
    res.json({
      message: "Invalid token.",
    });
    return;
  }
  if (!authHeader.startsWith("Bearer ")) {
    res.status(401);
    res.json({
      message: "Invalid token.",
    });
    return;
  }

  const [, token] = authHeader.split(" ");
  if (!token) {
    return;
  }
  let user: User;
  try {
    const { user: _u } = await verifyJWT(token);
    user = _u;
  } catch (error) {
    res.status(401);
    res.json({
      message: "Invalid token.",
    });
    return;
  }
  req.user = user;
  next();
}
