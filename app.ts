import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "./utils/db.util";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
import authRouter from "./routes/auth.router";
import protect from "./utils/auth.util";

// App, Env
dotenv.config();
const app: Application = express();

app.use(cors())
// Middleware
app.use(express.json());
app.use(morgan("dev"));
// Routes
app.use("/api/user", authRouter);

app.use("/safe", protect);

app.get("/", function (req: Request, res: Response) {
    res.send({ message: "Hello TypeScript!" });
});

app.get("/safe", function (req: Request, res: Response) {
    console.log(req.body.user);
    res.send({ message: "Hello TypeScript!", user: req.body.user });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(
    MONGO_URI as string,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
);

// Server Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
