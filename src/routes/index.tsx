import { useRoutes } from "react-router-dom";
import { useAuth } from "@/lib/auth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import Home from "@/features/home/Home";
import { AppLayout } from "@/components/Layout";

const Landing = () => {
    return (
        <AppLayout>
            <Home />
        </AppLayout>
    );
};

export const AppRoutes = () => {
    const { user } = useAuth();

    const commonRoutes = [{ path: "/", element: <Landing /> }];

    const routes = user ? protectedRoutes : publicRoutes;

    const element = useRoutes([...commonRoutes, ...routes]);

    return <>{element}</>;
};
