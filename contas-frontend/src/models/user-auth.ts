import { User } from "./user";

export interface UserAuth {
    token: string;
    refreshToken: string;
    user: User;
}