import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/checkAuth.js";
import { prisma } from "../utils/prisma.js";

export const getDashBoardSummary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
    );

    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
    );

    const [
      totalIncomeResult,
      totalExpenseResult,
      totalMonthIncomeResult,
      totalMonthExpenseResult,
    ] = await Promise.all([
      prisma.income.aggregate({
        where: {
          userId: req.user.id,
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.expense.aggregate({
        where: {
          userId: req.user.id,
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.income.aggregate({
        where: {
          userId: req.user.id,
          date: {
            gt: startOfMonth,
            lte: endOfMonth,
          },
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.expense.aggregate({
        where: {
          userId: req.user.id,
          date: {
            gt: startOfMonth,
            lte: endOfMonth,
          },
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    const totalIncome = totalIncomeResult._sum.amount || 0;
    const totalExpense = totalExpenseResult._sum.amount || 0;
    const totalMonthIncome = totalMonthIncomeResult._sum.amount || 0;
    const totalMonthExpense = totalMonthExpenseResult._sum.amount || 0;

    const totalMonthSaving = totalMonthIncome - totalMonthExpense;

    const totalMonthSavingPercent =
      totalMonthIncome > 0
        ? Number(((totalMonthSaving / totalMonthIncome) * 100).toFixed(2))
        : 0;

    res.status(200).json({
      totalIncome,
      totalExpense,
      totalMonthIncome,
      totalMonthExpense,
      totalMonthSaving,
      totalMonthSavingPercent,
    });
  } catch (error) {
    console.log("Get summary error : ", error);
    next(error);
  }
};
