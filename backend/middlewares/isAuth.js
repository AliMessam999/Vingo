import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message: "Token not found"});
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json({message: "User Not Found"});
        }
        console.log(decodedToken);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}   