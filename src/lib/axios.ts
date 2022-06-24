import Axios, { AxiosRequestConfig } from "axios";
import { getApiUrl } from "@/config";
import storage from "@/utils/storage";
import { refreshUser } from "@/features/auth/api/refresh";

function authRequestInterceptor(config: AxiosRequestConfig) {
    const token = storage.getAccessToken();
    if (!config?.headers) {
        throw new Error(
            `Expected 'config' and 'config.headers' not to be undefined`
        );
    }
    if (token) {
        config.headers.authorization = `${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
}

export const axios = Axios.create({
    baseURL: getApiUrl(),
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
    (response) => response.data,
    async (err) => {
        const originalConfig = err.config;
        if (err.response && err.response.status === 401) {
            const refreshUrl = "/refresh";
            const refreshToken = storage.getRefreshToken();

            if (originalConfig.url !== refreshUrl && refreshToken) {
                try {
                    const rs = await refreshUser({ refreshToken });
                    const { accessToken } = rs.jwt;

                    storage.setAccessToken(accessToken);
                    return axios(originalConfig);
                } catch (_error) {
                    storage.clearTokens();
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);
