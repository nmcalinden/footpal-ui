import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/Layout";
import Profile from "@/features/profile/Profile";

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
            { path: "/book", element: <div /> },
            { path: "/venues", element: <div /> },
            { path: "/matches", element: <div /> },
            { path: "/squads", element: <div /> },
            { path: "*", element: <Navigate to="." /> },
        ],
    },
];
