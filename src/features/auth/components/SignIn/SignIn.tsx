import * as React from "react";
import { Stack, Modal } from "@mui/material";
import { useAuth } from "@/lib/auth";
import { SignInModal } from "./styled";
import Login from "@/features/auth/components/Login/Login";
import Register from "@/features/auth/components/Register/Register";
import { LoginCredentialsDTO } from "@/features/auth/api/login";
import { RegisterCredentialsDTO } from "@/features/auth/api/register";

interface SignInProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function SignIn({ open, setOpen }: SignInProps) {
    const { login, register } = useAuth();

    const [isLoginActive, setIsLoginActive] = React.useState(true);

    const handleClose = () => setOpen(false);

    const openLogin = () => setIsLoginActive(true);
    const openRegister = () => setIsLoginActive(false);

    const loginUser = async (data: LoginCredentialsDTO) => {
        await login(data);
        handleClose();
    };

    const registerUser = async (data: RegisterCredentialsDTO) => {
        await register(data);
        openLogin();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="sign-in-modal"
            aria-describedby="modal-modal-description"
            data-testid="sign-in-modal"
        >
            <Stack component="form" sx={SignInModal}>
                {isLoginActive ? (
                    <Login
                        loginUser={loginUser}
                        closeModal={handleClose}
                        openRegister={openRegister}
                    />
                ) : (
                    <Register
                        registerUser={registerUser}
                        closeModal={handleClose}
                        openLogin={openLogin}
                    />
                )}
            </Stack>
        </Modal>
    );
}
