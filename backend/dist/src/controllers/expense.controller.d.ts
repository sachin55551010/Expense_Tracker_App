import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/checkAuth.js";
export declare const addNewExpense: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getMyExpense: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateExpense: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=expense.controller.d.ts.map