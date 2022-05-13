import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";
import { ThemeProvider } from "@material-ui/core/styles";
import { appTheme } from "./theme";
import { Button, Container } from "@mui/material";
import { LoadingBackdrop } from "@/components/Elements";

type AppProviderProps = {
    children: React.ReactNode;
};

export const ErrorFallBackStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #5F7161",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
};

const ErrorFallback = () => {
    return (
        <Container sx={ErrorFallBackStyle} role="alert">
            <h2 className="text-lg font-semibold">
                Oops, something went wrong!
            </h2>
            <br />
            <Button
                className="mt-4"
                onClick={() => window.location.assign(window.location.origin)}
            >
                Refresh
            </Button>
        </Container>
    );
};

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense fallback={<LoadingBackdrop />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={queryClient}>
                    {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
                    <AuthProvider>
                        <ThemeProvider theme={appTheme}>
                            <Router>{children}</Router>
                        </ThemeProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </React.Suspense>
    );
};
