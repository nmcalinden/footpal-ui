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

export const publicRoutes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/book",
                element: <Profile />,
            },
            { path: "/venues", element: <div /> },
            { path: "*", element: <Navigate to="." /> },
        ],
    },
];
