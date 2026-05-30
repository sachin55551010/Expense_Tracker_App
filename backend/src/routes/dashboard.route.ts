import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { getDashBoardSummary } from "../controllers/dashboard.controller.js";

export const dashboardRouter = express.Router();

dashboardRouter.get("/summary", checkAuth, getDashBoardSummary);
