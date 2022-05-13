import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";

const { Bookings } = lazyImport(
    () => import("@/features/bookings"),
    "Bookings"
);
const { Profile } = lazyImport(() => import("@/features/profile"), "Profile");
const { Matches } = lazyImport(() => import("@/features/matches"), "Matches");
const { Squads } = lazyImport(() => import("@/features/squads"), "Squads");
const { Venues } = lazyImport(() => import("@/features/venues"), "Venues");

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
            { path: "/profile", element: <Profile /> },
            { path: "/book", element: <Bookings /> },
            { path: "/venues", element: <Venues /> },
            { path: "/matches", element: <Matches /> },
            { path: "/squads", element: <Squads /> },
            { path: "*", element: <Navigate to="/" /> },
        ],
    },
];
