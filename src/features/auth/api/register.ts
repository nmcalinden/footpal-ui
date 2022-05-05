import { axios } from "@/lib/axios";

import { RegisteredUser } from "@/features/auth/types";

export type RegisterCredentialsDTO = {
    email: string;
    password: string;
    forename: string;
    surname: string;
};

export const registerUser = (
    data: RegisterCredentialsDTO
): Promise<RegisteredUser> => {
    return axios.post("/register", data);
};
