import { CustomErrorHandler } from "../middlewares/CustomErrorHandler.js";
import prisma from "../utils/prisma.js";
// ? controller for income related operations
export const addIncome = async (req, res, next) => {
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
    }
    catch (error) {
        console.log("add income error", error);
        next(error);
    }
};
// ? controller to get all income of a user
export const getAllIncome = async (req, res, next) => {
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
        res.status(200).json({ income, totalIncome: totalIncome._sum.amount || 0 });
    }
    catch (error) {
        console.log("get all income error", error);
        next(error);
    }
};
//? update income data
export const updateIncome = async (req, res, next) => {
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
    }
    catch (error) {
        console.log("Update income error : ", error);
        next(error);
    }
};
//? delete income
export const deleteIncome = async (req, res, next) => {
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
    }
    catch (error) {
        console.log("delete income error : ", error);
        next(error);
    }
};
//# sourceMappingURL=income.controller.js.map