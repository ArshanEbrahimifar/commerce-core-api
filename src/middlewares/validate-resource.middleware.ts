import { type NextFunction, type Request, type Response } from "express";

import { z } from "zod";

export const validateResource =
  (schema: z.ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    if (result.data.body !== undefined) {
      req.body = result.data.body;
    }

    if (result.data.query !== undefined) {
      Object.defineProperty(req, "query", {
        value: result.data.query,
        writable: true,
        configurable: true,
      });
    }

    if (result.data.params !== undefined && result.data.params !== null) {
      (req as any).params = result.data.params;
    }

    return next();
  };
