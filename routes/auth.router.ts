import joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express, { Router } from "express";
import User from "../models/User";
import UserSchemaValidation from "../models/User.validation";
const authRouter: Router = express.Router();

authRouter.post("/register", async (req, res) => {
    try {
        await UserSchemaValidation.validateAsync(req.body);
    } catch (error) {
        res.status(400).send({ message: error.details[0].message });
        return;
    }

    try {
        const { name, email, password } = req.body;
        // hash password
        const passwordHash = await bcrypt.hash(password, 8);

        // save to db
        const user = await User.create({
            name: name,
            email: email,
            password: passwordHash,
        });
        res.send({ data: user });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw "User not found";
        }
        // check password
        const passwordCheck = await bcrypt.compare(
            password,
            user.toJSON().password
        );
        if (!passwordCheck) {
            throw "Incorrect password";
        }

        const token = jwt.sign(
            { _id: user.toJSON()._id },
            process.env.TOKEN_SECRET as string,
            { expiresIn: 600 }
        );
        res.send({ token });
    } catch (error) {
        res.status(401).send({ message: error });
    }
});

export default authRouter;
