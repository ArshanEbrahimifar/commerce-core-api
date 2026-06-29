import express, { type Request, type Response } from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Commerce Core API is running",
  });
});

export default app;
