import * as React from "react";
import { Stack, Button, Link, TextField, Alert } from "@mui/material";
import { useAuth } from "@/lib/auth";
import { RegisterCredentialsDTO } from "@/features/auth/api/register";
import { Controller, useForm } from "react-hook-form";

interface RegisterProps {
    openLogin: () => void;
    closeModal: () => void;
}

export default function Register({ openLogin, closeModal }: RegisterProps) {
    const { register } = useAuth();
    const { handleSubmit, control, watch } = useForm();
    const [registerError, setRegisterError] = React.useState("");

    const password = React.useRef({});
    password.current = watch("password", "");

    const handleRegister = (data: any) => {
        const register: RegisterCredentialsDTO = {
            forename: data.forename,
            surname: data.surname,
            email: data.email,
            password: data.password,
        };
        registerUser(register);
    };

    const registerUser = async (data: RegisterCredentialsDTO) => {
        await register(data)
            .then(() => openLogin())
            .catch(function (error) {
                setRegisterError(error.response.data);
            });
    };

    return (
        <>
            <Controller
                name="forename"
                control={control}
                defaultValue=""
                rules={{ required: "First name required" }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        id="standard-first-name"
                        label="First Name"
                        value={value}
                        onChange={onChange}
                        variant="standard"
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
            />
            <Controller
                name="surname"
                control={control}
                defaultValue=""
                rules={{ required: "Surname required" }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        id="standard-surname"
                        label="Surname"
                        value={value}
                        onChange={onChange}
                        variant="standard"
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                    required: "E-mail required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                    },
                    minLength: {
                        value: 5,
                        message: "min length is 5",
                    },
                }}
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
                rules={{
                    required: "Password required",
                    minLength: {
                        value: 5,
                        message: "min length is 5",
                    },
                }}
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
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                    required: "Confirm password required",
                    minLength: {
                        value: 5,
                        message: "min length is 5",
                    },
                    validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        id="outlined-name"
                        label="Confirm Password"
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
            {registerError && <Alert severity="error">{registerError}</Alert>}
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
                    onClick={handleSubmit(handleRegister)}
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
