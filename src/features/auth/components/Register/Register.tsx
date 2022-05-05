import * as React from "react";
import { Stack, Button, Link, TextField } from "@mui/material";
import { RegisterCredentialsDTO } from "../../api/register";

interface RegisterProps {
    registerUser: (data: RegisterCredentialsDTO) => void;
    openLogin: () => void;
    closeModal: () => void;
}

export default function Register({
    registerUser,
    openLogin,
    closeModal,
}: RegisterProps) {
    const [firstName, setFirstName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleFirstnameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFirstName(event.target.value);
    };

    const handleSurnameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSurname(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleRegister = () => {
        const data: RegisterCredentialsDTO = {
            forename: firstName,
            surname,
            email,
            password,
        };
        registerUser(data);
    };

    return (
        <>
            <TextField
                id="standard-first-name"
                label="First Name"
                value={firstName}
                onChange={handleFirstnameChange}
                variant="standard"
            />
            <TextField
                id="standard-surname"
                label="Surname"
                value={surname}
                onChange={handleSurnameChange}
                variant="standard"
            />
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
                    onClick={handleRegister}
                >
                    Register
                </Button>
            </Stack>
            <Link
                component="button"
                variant="body2"
                onClick={openLogin}
                sx={{ marginTop: 5 }}
            >
                SIGN IN
            </Link>
        </>
    );
}
