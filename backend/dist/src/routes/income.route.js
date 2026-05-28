import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { addIncome, deleteIncome, getAllIncome, updateIncome, } from "../controllers/income.controller.js";
export const incomeRouter = express.Router();
//? add income route
incomeRouter.post("/add", checkAuth, addIncome);
//? get all income route
incomeRouter.get("/all", checkAuth, getAllIncome);
//? update income route
incomeRouter.put("/update/:id", checkAuth, updateIncome);
//? delete income route
incomeRouter.delete("/delete/:id", checkAuth, deleteIncome);
//# sourceMappingURL=income.route.js.map