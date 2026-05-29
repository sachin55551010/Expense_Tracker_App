import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middlewares/checkAuth.js";
export declare const createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const myProfile: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const logoutUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map