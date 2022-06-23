export type AuthUser = {
    id: number;
    email: string;
    name: string;
    nickname: string;
    phoneNo: string;
    postcode: string;
    city: string;
};

export type UserSession = {
    jwt: JWT;
    user: AuthUser;
};

export type JWT = {
    accessToken: string;
    refreshToken: string;
};

export type RegisteredUser = {
    id: number;
};
