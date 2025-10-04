import type { Request, Response, NextFunction } from "express";
declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}
export declare function userMiddleware(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=middleware.d.ts.map