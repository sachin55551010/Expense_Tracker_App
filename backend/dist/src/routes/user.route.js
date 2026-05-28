import express from "express";
import { createUser, getAllUsers, loginUser, logoutUser, myProfile, } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";
export const userRouter = express.Router();
//? get all users route
userRouter.get("/all-users", getAllUsers);
// ? create user route
userRouter.post("/signup", createUser);
// ? login route
userRouter.post("/login", loginUser);
// ? checking profile
userRouter.get("/profile", checkAuth, myProfile);
// ? logout route
userRouter.post("/logout", logoutUser);
//# sourceMappingURL=user.route.js.map