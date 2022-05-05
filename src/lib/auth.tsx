import { initReactQueryAuth } from "react-query-auth";
import { Spinner } from "@/components/Elements";
import {
    getUserProfile,
    loginWithEmailAndPassword,
    registerUser,
    UserSession,
    LoginCredentialsDTO,
    RegisterCredentialsDTO,
    AuthUser,
} from "@/features/auth";
import storage from "@/utils/storage";

async function handleUserResponse(data: UserSession) {
    const { access_token } = data;
    storage.setToken(access_token);
    return getUserProfile(access_token);
}

async function loadUser() {
    if (storage.getToken()) {
        return getUserProfile(storage.getToken());
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
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
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
