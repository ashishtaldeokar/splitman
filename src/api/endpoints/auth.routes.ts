import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.status(200).json({
        token: '1234567890'
    });
});

export default router;