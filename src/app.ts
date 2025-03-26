import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
const app: Express = express();
import authRoutes from './api/endpoints/auth.routes';
// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;
