import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const protect = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.header("auth-token") as string;
    if (!token) {
        res.status(401).send({ message: "Unauthorized!" });
        // return;
    }

    try {
        const user_id = jwt.verify(token, process.env.TOKEN_SECRET as string);
        const user = User.findById(user_id);
        if (!user) {
            res.status(401).send({ message: "User not found!" });
        }
        req.body.user = user_id;
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid Token!" });
    }
};

export default protect;
