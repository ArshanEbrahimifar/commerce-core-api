import express, { type Request, type Response } from "express";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";

const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: "ok",
    message: "Commerce Core API is running",
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
