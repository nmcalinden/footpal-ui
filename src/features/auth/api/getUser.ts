import { AuthUser } from "@/features/auth/types";
import { axios } from "@/lib/axios";

export const getUser = (): Promise<AuthUser> => {
    return axios.get("/me");
};
