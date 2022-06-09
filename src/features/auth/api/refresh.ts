import { UserSession } from "@/features/auth/types";
import { axios } from "@/lib/axios";

export type RefreshDTO = {
    refresh_token: string;
};

export const refreshUser = (data: RefreshDTO): Promise<UserSession> => {
    return axios.post("/refresh", data);
};
