const storagePrefix = "footpal_react_";

const storage = {
    getAccessToken: () => {
        return JSON.parse(
            window.localStorage.getItem(`${storagePrefix}token`) as string
        );
    },
    setAccessToken: (token: string) => {
        window.localStorage.setItem(
            `${storagePrefix}token`,
            JSON.stringify(token)
        );
    },
    clearAccessToken: () => {
        window.localStorage.removeItem(`${storagePrefix}token`);
    },
    getRefreshToken: () => {
        return JSON.parse(
            window.localStorage.getItem(`${storagePrefix}refresh`) as string
        );
    },
    setRefreshToken: (token: string) => {
        window.localStorage.setItem(
            `${storagePrefix}refresh`,
            JSON.stringify(token)
        );
    },
    clearRefreshToken: () => {
        window.localStorage.removeItem(`${storagePrefix}refresh`);
    },
    clearTokens: () => {
        window.localStorage.removeItem(`${storagePrefix}token`);
        window.localStorage.removeItem(`${storagePrefix}refresh`);
    },
};

export default storage;
