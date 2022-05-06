import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/Layout";

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
                element: <div />,
            },
            { path: "/venues", element: <div /> },
            { path: "*", element: <Navigate to="/" /> },
        ],
    },
];
