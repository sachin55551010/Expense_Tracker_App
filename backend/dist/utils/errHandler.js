export const errHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";
    if (error.code === "P2025") {
        error.message = "User not found";
    }
    res.status(statusCode).json({
        success: false,
        message: error.message,
    });
};
//# sourceMappingURL=errHandler.js.map