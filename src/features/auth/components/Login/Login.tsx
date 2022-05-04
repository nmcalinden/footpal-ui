import * as React from "react";
import { Stack, Button, TextField, Modal } from "@mui/material";
import { useAuth } from "@/lib/auth";
import { LoginCredentialsDTO } from "@/features/auth/api/login";
import { LoginForm } from "./styled";

interface LoginProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Login({ open, setOpen }: LoginProps) {
    const { login } = useAuth();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleClose = () => setOpen(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const loginUser = async () => {
        let request: LoginCredentialsDTO = {
            email: email,
            password: password,
        };
        await login(request);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack component="form" sx={LoginForm}>
                <TextField
                    id="standard-email"
                    label="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    variant="standard"
                />
                <TextField
                    id="outlined-name"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    variant="standard"
                    margin="dense"
                />
                <Stack
                    direction="row"
                    spacing={4}
                    justifyContent="flex-end"
                    sx={{ marginTop: 2 }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={loginUser}
                    >
                        Login
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
}
