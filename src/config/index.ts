export const JWT_SECRET = "123456" as string;

export const getApiUrl = () => {
    return (
        process.env.REACT_APP_API_URL || ("http://127.0.0.1:8081/" as string)
    );
};
