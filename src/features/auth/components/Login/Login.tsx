import * as React from "react";
import { Stack, Button, Link, TextField } from "@mui/material";
import { LoginCredentialsDTO } from "../../api/login";

interface LoginProps {
    loginUser: (data: LoginCredentialsDTO) => void;
    openRegister: () => void;
    closeModal: () => void;
}

export default function Login({
    loginUser,
    openRegister,
    closeModal,
}: LoginProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    return (
        <>
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
                <Button variant="contained" color="error" onClick={closeModal}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={() => loginUser({ email, password })}
                >
                    Login
                </Button>
            </Stack>
            <Link
                component="button"
                variant="body2"
                onClick={openRegister}
                sx={{ marginTop: 5 }}
            >
                REGISTER HERE
            </Link>
        </>
    );
}
