import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(403).json({});
    }
    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decoded.userID;
        next();
    } catch(e) {
        console.log(e)
        return res.status(403).json({});
    }
}

export {
    authMiddleware
}