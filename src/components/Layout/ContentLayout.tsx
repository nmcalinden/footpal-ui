import * as React from "react";
import { Box } from "@mui/material";

interface TabContentProps {
    children?: React.ReactNode;
    setNavBarOpen: (navBarOpen: boolean) => void;
}

export const TabContent = (props: TabContentProps) => {
    const { children } = props;

    return (
        <Box sx={{ p: 1, width: 1 }} onClick={() => props.setNavBarOpen(false)}>
            {children}
        </Box>
    );
};
