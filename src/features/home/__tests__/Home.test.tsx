import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core/styles";
import { appTheme } from "@/providers/theme";
import { Home } from "../Home";

describe("<Home />", () => {
    it("initial render displays title and search bar", () => {
        render(
            <ThemeProvider theme={appTheme}>
                <Home />
            </ThemeProvider>
        );
        expect(screen.getByText("Footpal")).toBeInTheDocument();
        expect(screen.getByText("Find a Pitch")).toBeInTheDocument();

        //Search Bar
        expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/venue/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/max players/i)).toBeInTheDocument();
        screen.getByRole("button", {
            name: /search/i,
        });
    });
});
