import type {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = "a5sasery";


declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}


export function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    const verifyToken = token?.split(' ')[1];
    const decodedUser = jwt.verify(token as string, JWT_SECRET);
    if(decodedUser) {
        if(typeof decodedUser === "string") {
             res.status(403).json({
                msg : "user not logged in"
            })
            return;
        }
    
        req.userId  = (decodedUser as JwtPayload).id;
        next();
        
    } else {
        res.status(403).json({
            msg : "you have not logged in"
        })
    }

}