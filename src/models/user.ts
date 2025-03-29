export interface User {
    id: Number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserService {
    getUserByEmail(email: string): Promise<User | null>;
    findUserById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getAllUsers(): Promise<User[]>;
    getUserByEmailAndPassword(email: string, password: string): Promise<User | null>;   
}