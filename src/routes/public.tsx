import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";

const { Bookings } = lazyImport(
    () => import("@/features/bookings"),
    "Bookings"
);
const { Venues } = lazyImport(() => import("@/features/venues"), "Venues");

const App = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
};

export const publicRoutes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/book",
                element: <Bookings />,
            },
            { path: "/venues", element: <Venues /> },
            { path: "*", element: <Navigate to="/" /> },
        ],
    },
];
