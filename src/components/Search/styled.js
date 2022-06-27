import styled from "@emotion/styled";
import { Button, FormControl } from "@mui/material";

export const SearchBarWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "10px",
    "@media (max-width: 600px)": {
        flexDirection: "column",
        justifyContent: "center",
    },
});

export const SearchBarFormComponent = styled(FormControl)({
    width: "200px",
    margin: "10px",
    "@media (max-width: 600px)": {
        minWidth: "250px",
    },
});

export const SearchBarButton = styled(Button)({
    margin: "10px",
    "@media (max-width: 600px)": {
        minWidth: "250px",
    },
});
