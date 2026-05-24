import { Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
}
export const sendCookie = (
  user: UserPayload,
  res: Response,
  message: string,
) => {
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string);

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
