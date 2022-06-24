import { AuthUser } from "@/features/auth/types";
import { axios } from "@/lib/axios";

export const getUser = (): Promise<AuthUser | null> => {
    return axios.get("/me");
};
