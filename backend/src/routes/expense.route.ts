import express from "express";
import {
  addNewExpense,
  getMyExpense,
} from "../controllers/expense.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

export const expenseRouter = express.Router();

// ? create expense
expenseRouter.post("/add-expense", checkAuth, addNewExpense);

//? get expense of perticular user
expenseRouter.get("/my-expense", checkAuth, getMyExpense);
