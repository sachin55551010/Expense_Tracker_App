import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/checkAuth.js";
import { CustomErrorHandler } from "../middlewares/CustomErrorHandler.js";
import { prisma } from "../utils/prisma.js";

// ? controller for income related operations
export const addIncome = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { amount, description, source, date } = req.body;
    const userId = req.user?.id;

    //? validate fields
    if (!amount || !source) {
      return next(new CustomErrorHandler(400, "All fields are required"));
    }

    if (!userId) {
      return next(new CustomErrorHandler(400, "User not authenticated"));
    }

    const income = await prisma.income.create({
      data: {
        amount,
        description,
        source,
        userId,
        date: date && date.trim() !== "" ? new Date(date) : undefined,
      },
    });
    const totalIncome = await prisma.income.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });

    res.status(201).json({
      income,
      totalIncome: totalIncome._sum.amount || 0,
      message: "Income added successfully",
    });
  } catch (error) {
    console.log("add income error", error);
    next(error);
  }
};

// ? controller to get all income of a user
export const getAllIncome = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new CustomErrorHandler(400, "User not authenticated"));
    }

    const income = await prisma.income.findMany({
      where: {
        userId,
      },
    });

    const totalIncome = await prisma.income.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });

    const monthlyIncomePerYear = await prisma.$queryRaw<
      {
        month: string;
        income: number;
      }[]
    >`
WITH months AS (
  SELECT generate_series(1, 12) AS month_num
)
SELECT
  TO_CHAR(TO_DATE(month_num::text, 'MM'), 'Mon') AS month,
  COALESCE(SUM(i.amount), 0) AS income
FROM months m
LEFT JOIN "Income" i
  ON EXTRACT(MONTH FROM i.date) = m.month_num
  AND EXTRACT(YEAR FROM i.date) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND i."userId" = ${userId}
GROUP BY m.month_num
ORDER BY m.month_num;
`;

    res.status(200).json({
      income,
      totalIncome: totalIncome._sum.amount || 0,
      monthlyIncomePerYear,
    });
  } catch (error) {
    console.log("get all income error", error);
    next(error);
  }
};

//? update income data
export const updateIncome = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { amount, description, source, date } = req.body;
    const { id } = req.params;

    //? validate fields
    if (!amount || !source) {
      return next(new CustomErrorHandler(400, "All fields are required"));
    }
    if (!id) {
      return next(new CustomErrorHandler(404, "No data found"));
    }

    const updatedIncome = await prisma.income.update({
      where: {
        id: Number(id),
      },
      data: {
        amount,
        description,
        source,
        date: date && date.trim() !== "" ? new Date(date) : undefined,
      },
    });
    const totalIncome = await prisma.income.aggregate({
      where: {
        userId: req.user?.id,
      },
      _sum: {
        amount: true,
      },
    });
    res.status(201).json({
      updatedIncome,
      totalIncome: totalIncome._sum.amount || 0,
      message: "Income Updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Update income error : ", error);
    next(error);
  }
};

//? delete income
export const deleteIncome = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    console.log("Id : ", id);

    const deletedIncome = await prisma.income.delete({
      where: {
        id: Number(id),
        userId: req.user?.id,
      },
    });
    const totalIncome = await prisma.income.aggregate({
      where: {
        userId: req.user?.id,
      },
      _sum: {
        amount: true,
      },
    });
    res.status(200).json({
      deletedIncome,
      totalIncome: totalIncome._sum.amount || 0,
      message: "Income deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("delete income error : ", error);
    next(error);
  }
};

// get monthly income for bar chart
export const getMonthlyIncome = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const month = Number(req.query.month);

    const newMonth = month + 1;

    const currentYear = new Date().getFullYear();

    const startOfMonth = new Date(currentYear, newMonth - 1, 1);

    const endOfMonth = new Date(currentYear, newMonth, 1);

    const monthlyIncome = await prisma.income.findMany({
      where: {
        userId: req.user?.id,

        date: {
          gt: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
    const monthlyIncomeTotal = await prisma.income.aggregate({
      where: {
        userId: req.user?.id,
        date: {
          gt: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const monthlyTotal = monthlyIncomeTotal._sum.amount || 0;

    res.status(200).json({ monthlyIncome, monthlyTotal });
  } catch (error) {
    console.log("get monthly income error : ", error);
    next(error);
  }
};

export const yearlyIncome = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const yearlyIncome = await prisma.$queryRaw<
      {
        month: string;
        income: number;
      }[]
    >`
WITH months AS (
  SELECT generate_series(1, 12) AS month_num
)
SELECT
  TO_CHAR(TO_DATE(month_num::text, 'MM'), 'Mon') AS month,
  COALESCE(SUM(i.amount), 0) AS income
FROM months m
LEFT JOIN "Income" i
  ON EXTRACT(MONTH FROM i.date) = m.month_num
  AND EXTRACT(YEAR FROM i.date) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND i."userId" = ${req.user?.id}
GROUP BY m.month_num
ORDER BY m.month_num;
`;

    res.status(200).json(yearlyIncome);
  } catch (error) {
    console.log("get yearly income error : ", error);
    next(error);
  }
};
