import {
    createUser,
    render,
    screen,
    waitFor,
    userEvent,
} from "@/test/test-utils";
import Login from "../Login";

describe("<Login />", () => {
    const openRegister = jest.fn();
    const closeModal = jest.fn();

    it("initial render login", async () => {
        render(<Login openRegister={openRegister} closeModal={closeModal} />);

        await waitFor(() => {
            expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
        });
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("login new user", async () => {
        const newUser = await createUser();

        render(<Login openRegister={openRegister} closeModal={closeModal} />);

        const emailInput = await waitFor(() =>
            screen.findByLabelText("E-mail")
        );
        const passwordInput = screen.getByLabelText("Password");

        await waitFor(() => {
            expect(emailInput).toBeInTheDocument();
        });

        userEvent.type(emailInput, newUser.email);
        userEvent.type(passwordInput, newUser.password);

        userEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    it("cancel login", async () => {
        render(<Login openRegister={openRegister} closeModal={closeModal} />);

        const emailInput = await waitFor(() =>
            screen.findByLabelText("E-mail")
        );

        await waitFor(() => {
            expect(emailInput).toBeInTheDocument();
        });

        userEvent.click(screen.getByRole("button", { name: /cancel/i }));

        await waitFor(() => expect(closeModal).toHaveBeenCalledTimes(1));
    });

    it("open register", async () => {
        render(<Login openRegister={openRegister} closeModal={closeModal} />);

        const emailInput = await waitFor(() =>
            screen.findByLabelText("E-mail")
        );

        await waitFor(() => {
            expect(emailInput).toBeInTheDocument();
        });

        userEvent.click(screen.getByRole("button", { name: /register here/i }));

        await waitFor(() => expect(openRegister).toHaveBeenCalledTimes(1));
    });
});
