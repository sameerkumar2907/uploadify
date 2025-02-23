import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Welcome to Uploadify!" }));

app.use("/api", fileRoutes);

export default app;
