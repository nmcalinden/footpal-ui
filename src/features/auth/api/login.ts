import { axios } from "@/lib/axios";
import { UserSession } from "@/features/auth/types";

export type LoginCredentialsDTO = {
    email: string;
    password: string;
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
