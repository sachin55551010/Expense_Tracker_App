import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/checkAuth.js";
export declare const addIncome: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllIncome: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateIncome: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteIncome: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=income.controller.d.ts.map