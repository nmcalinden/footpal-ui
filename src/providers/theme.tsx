import { createTheme } from "@material-ui/core/styles";

export const appTheme = createTheme({
    palette: {
        primary: {
            main: "#5F7161",
            light: "#568E85",
            dark: "#002F27",
        },
        secondary: {
            main: "#6D8B74",
            light: "#E1AC88",
            dark: "#4A1E00",
        },
        error: {
            main: "#7D1109",
        },
        text: {
            primary: "#f8f2ee",
        },
    },
});
