import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Spinner = () => {
    return (
        <Box sx={{ display: "flex", z: 5 }}>
            <CircularProgress />
        </Box>
    );
};
