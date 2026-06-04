import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/checkAuth.js";
import { CustomErrorHandler } from "../middlewares/CustomErrorHandler.js";
import { prisma } from "../utils/prisma.js";

// ? Add Expense
export const addExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { amount, description, category, date } = req.body;
    const userId = req.user?.id;

    if (!amount || !category) {
      return next(
        new CustomErrorHandler(400, "Amount and category are required"),
      );
    }

    if (!userId) {
      return next(new CustomErrorHandler(401, "User not authenticated"));
    }

    const expense = await prisma.expense.create({
      data: {
        amount,
        description,
        category,
        userId,
        date: date && date.trim() !== "" ? new Date(date) : undefined,
      },
    });

    const totalExpense = await prisma.expense.aggregate({
      where: { userId },
      _sum: {
        amount: true,
      },
    });

    res.status(201).json({
      expense,
      totalExpense: totalExpense._sum.amount || 0,
      message: "Expense added successfully",
      success: true,
    });
  } catch (error) {
    console.log("add expense error:", error);
    next(error);
  }
};

// ? Get All Expenses
export const getAllExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new CustomErrorHandler(401, "User not authenticated"));
    }

    const expense = await prisma.expense.findMany({
      where: { userId },
      orderBy: {
        date: "desc",
      },
    });

    const totalExpense = await prisma.expense.aggregate({
      where: { userId },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({
      expense,
      totalExpense: totalExpense._sum.amount || 0,
    });
  } catch (error) {
    console.log("get all expense error:", error);
    next(error);
  }
};

// ? Update Expense
export const updateExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { amount, description, category, date } = req.body;
    const { id } = req.params;
    const userId = req.user?.id;

    if (!amount || !category) {
      return next(
        new CustomErrorHandler(400, "Amount and category are required"),
      );
    }

    if (!id) {
      return next(new CustomErrorHandler(404, "Expense not found"));
    }

    const updatedExpense = await prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        amount,
        description,
        category,
        date: date && date.trim() !== "" ? new Date(date) : undefined,
      },
    });

    const totalExpense = await prisma.expense.aggregate({
      where: { userId },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({
      updatedExpense,
      totalExpense: totalExpense._sum.amount || 0,
      message: "Expense updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("update expense error:", error);
    next(error);
  }
};

// ? Delete Expense
export const deleteExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!id) {
      return next(new CustomErrorHandler(404, "Expense not found"));
    }

    const deletedExpense = await prisma.expense.delete({
      where: {
        id: Number(id),
      },
    });

    const totalExpense = await prisma.expense.aggregate({
      where: { userId },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({
      deletedExpense,
      totalExpense: totalExpense._sum.amount || 0,
      message: "Expense deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("delete expense error:", error);
    next(error);
  }
};

// ? get monthly expense
export const getMonthlyExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const month = Number(req.query.month);
    const userId = req.user.id;
    const newMonth = month + 1;

    const currentYear = new Date().getFullYear();

    const startOfMonth = new Date(currentYear, newMonth - 1, 1);

    const endOfMonth = new Date(currentYear, newMonth, 1);

    const monthlyExpense = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gt: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
    const calculateMonthlyExpense = await prisma.expense.aggregate({
      where: {
        userId,
        date: {
          gt: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const monthlyExpenseTotal = calculateMonthlyExpense._sum.amount || 0;

    res.status(200).json({ monthlyExpense, monthlyExpenseTotal });
  } catch (error) {
    console.log("get monthly expense error:", error);
    next(error);
  }
};

export const getYearlyExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const yearlyExpense = await prisma.$queryRaw<
      {
        month: string;
        expense: number;
      }[]
    >`
WITH months AS (
  SELECT generate_series(1, 12) AS month_num
)
SELECT
  TO_CHAR(TO_DATE(month_num::text, 'MM'), 'Mon') AS month,
  COALESCE(SUM(e.amount), 0) AS expense
FROM months m
LEFT JOIN "Expense" e
  ON EXTRACT(MONTH FROM e.date) = m.month_num
  AND EXTRACT(YEAR FROM e.date) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND e."userId" = ${req.user?.id}
GROUP BY m.month_num
ORDER BY m.month_num;
`;

    res.status(200).json(yearlyExpense);
  } catch (error) {
    console.log("get yearly expense error : ", error);
    next(error);
  }
};
