import type { Request, Response, NextFunction } from "express";
export const asyncWrapper = (
  asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
