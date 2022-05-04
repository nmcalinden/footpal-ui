import { Grid } from "@mui/material";
import * as React from "react";
import Login from "@/features/auth/components/Login/Login";
import { useAuth } from "@/lib/auth";

const Header = () => {
    const { user } = useAuth();

    return (
        <Grid
            container
            spacing={2}
            sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}
        >
            <Grid item xs={8} md={10} justifyContent="flex-start">
                <p>Footpal</p>
            </Grid>
            <Grid item xs={4} md={2} justifyContent="flex-end" display={"flex"}>
                {user ? <p>Logged in: {user.name}</p> : <Login />}
            </Grid>
        </Grid>
    );
};

export default Header;
