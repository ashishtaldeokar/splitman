import { Router, Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repository/user.repository';
const router = Router();
const UserService = new UserRepository();
export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginRequest;
    console.log(email, password);
    res.status(200).json({
        token: '1234567890'
    });
});

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
});

console.log("users route");
export default router;