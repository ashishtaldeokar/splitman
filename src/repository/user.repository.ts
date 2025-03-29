import { User, UserService } from "../models/user";
import { prismaOrm } from "./db";

export class UserRepository implements UserService {
    private users: User[] = [];

    constructor() {
        this.users = [];
    }
    getUserByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    updateUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllUsers(): Promise<User[]> {
        return await prismaOrm.user.findMany();
    }
    getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async findUserById(id: string): Promise<User | null> {
        return await prismaOrm.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    async createUser(user: User): Promise<User> {
        return await prismaOrm.user.create({
            data: {
                email: user.email,
                password: user.password
            }
        });
    }
}