import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route.js";
import { errHandler } from "./utils/errHandler.js";
import cookieParser from "cookie-parser";
import { expenseRouter } from "./routes/expense.route.js";
import { incomeRouter } from "./routes/income.route.js";
import { dashboardRouter } from "./routes/dashboard.route.js";
dotenv.config();

export const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

//? expense base route
app.use("/api/expense", expenseRouter);

// ? income base route
app.use("/api/income", incomeRouter);

//? dashboard router
app.use("/api/dashboard", dashboardRouter);

//? This is a simple route to test if the server is running.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ? error handling middleware
app.use(errHandler);
