import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";

const { Home } = lazyImport(() => import("@/features/home"), "Home");
const { Profile } = lazyImport(() => import("@/features/profile"), "Profile");
const { Matches } = lazyImport(
    () => import("@/features/matches/components"),
    "Matches"
);
const { Squads } = lazyImport(() => import("@/features/squads"), "Squads");

const App = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
};

export const protectedRoutes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/profile", element: <Profile /> },
            { path: "/matches", element: <Matches /> },
            { path: "/squads", element: <Squads /> },
            { path: "*", element: <Navigate to="/" /> },
        ],
    },
];
