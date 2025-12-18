import { Response } from 'express';

export function success(res: Response, data: unknown, status = 200): Response {
  return res.status(status).json(data);
}

export function error(res: Response, message: string, status = 400): Response {
  return res.status(status).json({ error: message });
}
