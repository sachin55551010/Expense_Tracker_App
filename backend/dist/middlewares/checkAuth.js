import { CustomErrorHandler } from "./CustomErrorHandler.js";
import jwt from "jsonwebtoken";
export const checkAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new CustomErrorHandler(401, "Unauthorized"));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
};
//# sourceMappingURL=checkAuth.js.map