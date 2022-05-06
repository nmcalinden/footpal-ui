import { axios } from "@/lib/axios";
import { UserSession } from "@/features/auth/types";

export type LoginCredentialsDTO = {
    email: string;
    password: string;
};

export const loginWithEmailAndPassword = async (
    data: LoginCredentialsDTO
): Promise<UserSession> => {
    return await axios.post("/login", data);
};
