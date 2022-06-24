import * as React from "react";
import { Stack, Modal } from "@mui/material";
import { SignInModal } from "./styled";
import Login from "@/features/auth/components/Login/Login";
import Register from "@/features/auth/components/Register/Register";

interface SignInProps {
    handleCloseSignIn: () => void;
}

export default function SignIn({ handleCloseSignIn }: SignInProps) {
    const [open, setOpen] = React.useState(true);
    const [isLoginActive, setIsLoginActive] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        handleCloseSignIn();
    };

    const openLogin = () => {
        setIsLoginActive(true);
    };
    const openRegister = () => {
        setIsLoginActive(false);
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
                        closeModal={handleClose}
                        openRegister={openRegister}
                    />
                ) : (
                    <Register closeModal={handleClose} openLogin={openLogin} />
                )}
            </Stack>
        </Modal>
    );
}
