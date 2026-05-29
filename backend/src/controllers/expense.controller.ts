import { NextFunction, Request, Response } from "express";

import { AuthRequest } from "../middlewares/checkAuth.js";
import { prisma } from "../utils/prisma.js";
import { CustomErrorHandler } from "../middlewares/CustomErrorHandler.js";

// ? add new expense
export const addNewExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { category, amount, description, date } = req.body;

    if (!category || !amount || !description) {
      return next(new CustomErrorHandler(400, "All fields are required"));
    }

    const expense = await prisma.expense.create({
      data: {
        category,
        amount,
        description,
        date: date && date.trim() !== "" ? new Date(date) : undefined,
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

// ? update expense
export const updateExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { category, amount, description } = req.body;

    console.log("id", id);
    console.log(category, amount, description);

    if (!category || !amount) {
      return next(new CustomErrorHandler(400, "All fields are required"));
    }

    const expense = await prisma.expense.update({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
      data: {
        category,
        amount,
        description,
      },
    });

    console.log("Data", expense);

    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    console.log("update expense Error : ", error);
    next(error);
  }
};
