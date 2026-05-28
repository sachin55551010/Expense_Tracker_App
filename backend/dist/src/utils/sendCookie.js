import jwt from "jsonwebtoken";
export const sendCookie = (user, res, message) => {
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    res
        .status(200)
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
    })
        .json({
        user,
        success: true,
        message,
    });
};
//# sourceMappingURL=sendCookie.js.map