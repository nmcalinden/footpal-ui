import {
    render as rtlRender,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "@/providers/app";
import storage from "@/utils/storage";
import { FunctionComponent } from "react";
import { JWT_SECRET } from "@/config";
import jwt from "jsonwebtoken";
import { userGenerator } from "./data-generators";

export const createUser = async (userProperties?: any) => {
    const user = userGenerator(userProperties);
    return user;
};

export const loginAsUser = async (user: any) => {
    const encodedToken = jwt.sign(user, JWT_SECRET);

    storage.setToken(encodedToken);
    return { access_token: encodedToken, refresh_token: encodedToken };
};

export const waitForLoadingToFinish = () =>
    waitForElementToBeRemoved(
        () => [
            ...screen.queryAllByTestId(/loading/i),
            ...screen.queryAllByText(/loading/i),
        ],
        { timeout: 4000 }
    );

const initializeUser = async (user: any) => {
    if (typeof user === "undefined") {
        return await loginAsUser(user);
    } else if (user) {
        return await loginAsUser(user);
    } else {
        return null;
    }
};

export const render = async (
    ui: any,
    { route = "/", user, ...renderOptions }: Record<string, any> = {}
) => {
    // Pass null for unauthenticated
    user = await initializeUser(null);

    window.history.pushState({}, "Test page", route);

    const returnValue = {
        ...rtlRender(ui, {
            wrapper: AppProvider as FunctionComponent<unknown>,
            ...renderOptions,
        }),
        user,
    };
    return returnValue;
};

export * from "@testing-library/react";
export { userEvent, rtlRender };
