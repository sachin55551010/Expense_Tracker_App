import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../middlewares/CustomErrorHandler.js";
import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
import { sendCookie } from "../utils/sendCookie.js";
import { AuthRequest } from "../middlewares/checkAuth.js";

// ? function to create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new CustomErrorHandler(400, "All fields are required"));
    }
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return next(
        new CustomErrorHandler(400, "User already exists with this email"),
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    sendCookie(user, res, "User created successfully");
  } catch (error) {
    console.log("create user error : ", error);
  }
};

// ? function to login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return next(
        new CustomErrorHandler(400, "Email and password are required"),
      );
    }

    // check user exists or not
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new CustomErrorHandler(404, "Please signup first"));
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new CustomErrorHandler(401, "Invalid email or password"));
    }

    // send cookie
    sendCookie(user, res, "Login successful");
  } catch (error) {
    console.log("login user error : ", error);
    next(error);
  }
};

// ? function to get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("get all users function run");

    const users = await prisma.user.findMany();
    console.log("Users", users);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("get all user error : ", error);
  }
};

// ? checking login user profile
export const myProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log("my profile error : ", error);
    next(error);
  }
};

// ? logout user
export const logoutUser = async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({ message: "Logout successfully", success: true });
};
