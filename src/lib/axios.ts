import Axios, { AxiosRequestConfig } from "axios";
import { getApiUrl } from "@/config";
import storage from "@/utils/storage";

function authRequestInterceptor(config: AxiosRequestConfig) {
    const token = storage.getToken();
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
    (response) => {
        return response.data;
    },
    (error) => {
        throw error;
    }
);
