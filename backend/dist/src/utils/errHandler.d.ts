import { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
    statusCode?: number;
    code?: string;
}
export declare const errHandler: (error: CustomError, req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=errHandler.d.ts.map