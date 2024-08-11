import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../controllers/jwt';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers as any).authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyToken(token);
    if (!decoded || (decoded as any).role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    next();
};
