import jwt_decode from "jwt-decode";
import { AuthUser } from "@/features/auth/types";

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
