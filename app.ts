import express, { Application, Request, Response, NextFunction } from "express";
import authRouter from "./routes/auth.router";
import mongoose from "./utils/db";
import dotenv from "dotenv";
import morgan from "morgan";

// App, Env
dotenv.config();
const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
// Routes
app.use("/api/user", authRouter);

app.get("/", function (req: Request, res: Response) {
    res.send("Hello TypeScript!");
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
