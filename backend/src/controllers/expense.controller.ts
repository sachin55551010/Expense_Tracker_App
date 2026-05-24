import { NextFunction, Request, Response } from "express";

import { AuthRequest } from "../middlewares/checkAuth.js";
import prisma from "../utils/prisma.js";
import { CustomErrorHandler } from "../middlewares/CustomErrorHandler.js";
export const addNewExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { category, amount, description } = req.body;

    if (!category || !amount || !description) {
      return next(new CustomErrorHandler(400, "All fields are required"));
    }

    const expense = await prisma.expense.create({
      data: {
        category,
        amount,
        description,
        userId: req.user.id,
      },
    });
    res.status(201).json({ expense, message: "Expense added successfully" });
  } catch (error) {
    console.log("add expense Error : ", error);
    next(error);
  }
};

// ? get expense
export const getMyExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return next(new CustomErrorHandler(401, "Unauthorized"));
    }
    const expense = await prisma.expense.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json(expense);
  } catch (error) {
    console.log("add expense Error : ", error);
    next(error);
  }
};
