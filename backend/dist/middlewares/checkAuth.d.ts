import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: any;
}
export declare const checkAuth: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=checkAuth.d.ts.map