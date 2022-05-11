import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/Layout";
import Profile from "@/features/profile/components/Profile";
import Squads from "@/features/squads/components/Squads";
import Matches from "@/features/matches/Matches";
import Venues from "@/features/venues/Venues";
import Bookings from "@/features/bookings/Bookings";

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
