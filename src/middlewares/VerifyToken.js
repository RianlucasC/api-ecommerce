const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        const secret = process.env.SECRET;

        jwt.verify(token, secret, (err, user) => {
            
            if (err) {
                throw new AppError("Token is not valid", 403);
            }

            req.user = user;
            next();
        });
    }else {
        throw new AppError("You are not authenticated");
    }
}

module.exports = verifyToken;