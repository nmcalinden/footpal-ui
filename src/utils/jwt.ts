import jwtDecode from "jwt-decode";

const isTokenExpired = (token: string) => {
    if (!token) return true;

    const accessToken: any = jwtDecode(token);
    const currentTime = new Date().getTime() / 1000;

    if (currentTime < accessToken.exp) return false;
    return true;
};

const TokenUtil = {
    isTokenExpired,
};

export default TokenUtil;
