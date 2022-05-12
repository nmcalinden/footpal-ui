import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/Layout";
import Venues from "@/features/venues/components/Venues";
import Bookings from "@/features/bookings/components/Bookings";

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
