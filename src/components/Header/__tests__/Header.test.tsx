import {
    render,
    waitFor,
    screen,
    fireEvent,
    userEvent,
} from "@/test/test-utils";
import { ThemeProvider } from "@material-ui/core/styles";
import { appTheme } from "@/providers/theme";
import { Header } from "../Header";

describe("<Header />", () => {
    it("initial render header bar", async () => {
        render(
            <ThemeProvider theme={appTheme}>
                <Header />
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("footpal-title")).toBeInTheDocument();
        });

        await waitFor(() => {
            screen.getByRole("button", {
                name: /sign in/i,
            });
        });

        await waitFor(() => {
            expect(
                screen.queryByTestId(/sign-in-modal/i)
            ).not.toBeInTheDocument();
        });
    });

    it("hover over sign in", async () => {
        render(
            <ThemeProvider theme={appTheme}>
                <Header />
            </ThemeProvider>
        );

        const signInButton = await waitFor(() =>
            screen.findByRole("button", {
                name: /sign in/i,
            })
        );

        fireEvent.mouseOver(signInButton);
        expect(
            await screen.findByText("Sign In or Sign Up")
        ).toBeInTheDocument();
        expect(screen.queryByTestId(/sign-in-modal/i)).not.toBeInTheDocument();
    });

    it("click sign in button to open modal", async () => {
        render(
            <ThemeProvider theme={appTheme}>
                <Header />
            </ThemeProvider>
        );

        const signInButton = await waitFor(() =>
            screen.findByRole("button", {
                name: /sign in/i,
            })
        );

        userEvent.click(signInButton);
        expect(screen.getByTestId(/sign-in-modal/i)).toBeInTheDocument();
    });
});
