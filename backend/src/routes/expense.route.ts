import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import {
  addExpense,
  deleteExpense,
  getAllExpense,
  updateExpense,
} from "../controllers/expense.controller.js";

export const expenseRouter = express.Router();

// ? add expense route
expenseRouter.post("/add", checkAuth, addExpense);

// ? get all expense route
expenseRouter.get("/all", checkAuth, getAllExpense);

// ? update expense route
expenseRouter.put("/update/:id", checkAuth, updateExpense);

// ? delete expense route
expenseRouter.delete("/delete/:id", checkAuth, deleteExpense);
