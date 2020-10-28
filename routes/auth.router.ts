import joi from 'joi';
import express, { Router } from "express";
import User from '../models/User'
import UserSchemaValidation from '../models/User.validation'
const authRouter: Router = express.Router();

authRouter.post("/register", async (req, res) => {
    try {
        await UserSchemaValidation.validateAsync(req.body)
    } catch (error) {
        res.status(400).send({ message: error.details[0].message })
        return;
    }

    try {
        const user = await User.create(req.body)
        res.send({ data : user })
    } catch (error) {
        console.error(error)
        res.status(400).send({ message: error })
    }
});

authRouter.post("/login", (req, res) => {
    res.send("Login");
});

export default authRouter;
