export type AuthUser = {
    id: number;
    email: string;
    name: string;
    roles: string[];
};

export type UserSession = {
    access_token: string;
    refresh_token: string;
};

export type RegisteredUser = {
    id: number;
};
