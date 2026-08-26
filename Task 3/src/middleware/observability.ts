import type { Request, Response, NextFunction } from "express";

export function observability(req: Request, res: Response, next: NextFunction) {
  const start: number = Date.now();
  const timestamp: string = new Date().toISOString();
  const HttpMethod: string = req.method;
  const url: string = req.url;
  res.on("finish", () => {
    const executionTime = start - Date.now();

    console.log(`timestamp = ${timestamp}
        HttpMethod = ${HttpMethod}
        url = ${url}
        executionTime = ${executionTime}ms
    `);
  });
  next();
}
