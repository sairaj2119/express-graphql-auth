import { Response, Request } from 'express';

export default async (_: Request, res: Response) => {
  return res.send('login route');
};
