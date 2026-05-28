import express from "express";
import {
  addNewExpense,
  getMyExpense,
  updateExpense,
} from "../controllers/expense.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

export const expenseRouter = express.Router();

// ? create expense
expenseRouter.post("/add-expense", checkAuth, addNewExpense);

//? get expense of perticular user
expenseRouter.get("/my-expense", checkAuth, getMyExpense);

// ? update expense route
expenseRouter.put("/update-expense/:id", checkAuth, updateExpense);

// ? delete expense route
// expenseRouter.delete("/delete-expense/:id", checkAuth, deleteExpense);
