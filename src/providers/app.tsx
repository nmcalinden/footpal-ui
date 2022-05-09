import * as React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";
import { ThemeProvider } from "@material-ui/core/styles";
import { appTheme } from "./theme";

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
            <AuthProvider>
                <ThemeProvider theme={appTheme}>
                    <Router>{children}</Router>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};
