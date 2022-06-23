import { UserSession } from "@/features/auth/types";
import { axios } from "@/lib/axios";

export type RefreshDTO = {
    refreshToken: string;
};

export const refreshUser = (data: RefreshDTO): Promise<UserSession> => {
    return axios.post("/refresh", data);
};
