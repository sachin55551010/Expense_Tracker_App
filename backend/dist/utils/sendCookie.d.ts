import { Response } from "express";
interface UserPayload {
    id: number;
    name: string;
    email: string;
}
export declare const sendCookie: (user: UserPayload, res: Response, message: string) => void;
export {};
//# sourceMappingURL=sendCookie.d.ts.map