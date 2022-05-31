import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";

const { Bookings } = lazyImport(
    () => import("@/features/bookings"),
    "Bookings"
);
const { BookPitch } = lazyImport(
    () => import("@/features/bookings"),
    "BookPitch"
);
const { Home } = lazyImport(() => import("@/features/home"), "Home");
const { Venues } = lazyImport(() => import("@/features/venues"), "Venues");
const { VenueView } = lazyImport(
    () => import("@/features/venues"),
    "VenueView"
);

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
            { path: "/", element: <Home /> },
            {
                path: "/book",
                element: <Bookings />,
            },
            { path: "/book/:id", element: <VenueView page={"book"} /> },
            { path: "/book/:id/pitch", element: <BookPitch page={"book"} /> },
            { path: "/venues", element: <Venues /> },
            { path: "/venues/:id", element: <VenueView page={"venues"} /> },
            { path: "/venues/:id/pitch", element: <BookPitch page={"venues"} /> },
            { path: "*", element: <Navigate to="/" /> },
        ],
    },
];
