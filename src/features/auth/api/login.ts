import { axios } from "@/lib/axios";
import jwt_decode from "jwt-decode";
import { UserSession } from "@/features/auth/types";

export type LoginCredentialsDTO = {
    email: string;
    password: string;
};

export type AuthUser = {
    id: number;
    email: string;
    name: string;
    roles: string[];
};

export const loginWithEmailAndPassword = async (
    data: LoginCredentialsDTO
): Promise<UserSession> => {
    const response = await axios.post("/login", data);
    const usr: UserSession = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
    };

    return usr;
};

export const getUserProfile = (token: string): AuthUser => {
    const t = token.split(" ");
    const dToken: any = jwt_decode(t[1]);

    const userProfile: AuthUser = {
        id: dToken.sub,
        email: dToken.email,
        name: dToken.name,
        roles: dToken.roles,
    };

    return userProfile;
};
