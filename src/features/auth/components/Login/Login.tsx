import * as React from "react";
import { Stack, Button, Link, TextField, Alert } from "@mui/material";
import { LoginCredentialsDTO } from "../../api/login";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/lib/auth";

interface LoginProps {
    openRegister: () => void;
    closeModal: () => void;
}

export default function Login({ openRegister, closeModal }: LoginProps) {
    const { login } = useAuth();
    const { handleSubmit, control } = useForm();
    const [loginError, setLoginError] = React.useState("");

    const handleLogin = (data: any) => {
        loginUser(data);
    };

    const loginUser = async (data: LoginCredentialsDTO) => {
        await login(data)
            .then(() => closeModal())
            .catch(function (error) {
                setLoginError(error.response.data);
            });
    };

    return (
        <>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "E-mail required" }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        id="standard-email"
                        label="E-mail"
                        value={value}
                        onChange={onChange}
                        variant="standard"
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password required" }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        id="outlined-name"
                        label="Password"
                        type="password"
                        value={value}
                        onChange={onChange}
                        variant="standard"
                        margin="dense"
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
            />
            {loginError && <Alert severity="error">{loginError}</Alert>}
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
                    onClick={handleSubmit(handleLogin)}
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
