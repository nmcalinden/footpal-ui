import { initReactQueryAuth } from "react-query-auth";
import { Spinner } from "@/components/Elements";
import {
    loginWithEmailAndPassword,
    registerUser,
    UserSession,
    LoginCredentialsDTO,
    RegisterCredentialsDTO,
    AuthUser,
    getUser,
} from "@/features/auth";
import storage from "@/utils/storage";
import TokenUtil from "@/utils/jwt";

async function handleUserResponse(data: UserSession) {
    const { jwt, user } = data;
    storage.setAccessToken(jwt.accessToken);
    storage.setRefreshToken(jwt.refreshToken);
    return user;
}

async function loadUser() {
    if (
        storage.getAccessToken() ||
        !TokenUtil.isTokenExpired(storage.getRefreshToken())
    ) {
        const data = await getUser()
            .then((res) => res)
            .catch(() => null);
        return data;
    }
    return null;
}

async function loginFn(data: LoginCredentialsDTO) {
    const response = await loginWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
    await registerUser(data);
    return null;
}

async function logoutFn() {
    storage.clearAccessToken();
    loadUser();
}

const authConfig = {
    loadUser,
    loginFn,
    registerFn,
    logoutFn,
    LoaderComponent() {
        return <Spinner />;
    },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
    AuthUser | null,
    unknown,
    LoginCredentialsDTO,
    RegisterCredentialsDTO
>(authConfig);
