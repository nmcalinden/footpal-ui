import * as React from "react";
import { Stack, Box, Button, Grid, Link, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from "@/features/profile/api/getUser";
import { useUpdatePlayer } from "@/features/profile/api/updatePlayer";

import { useForm, Controller } from "react-hook-form";
import { Spinner } from "@/components/Elements";

const useStyles = makeStyles((theme) => ({
    profile: {
        backgroundColor: theme.palette.secondary.light,
        border: 1,
        borderColor: "divider",
        borderRadius: "16px",
        padding: 5,
        paddingLeft: 10,
    },
    profileHeader: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 2,
        alignItems: "baseline",
    },
}));

export default function MyUser() {
    const { data, isLoading } = useUser();
    const updatePlayerMutation = useUpdatePlayer();

    const { handleSubmit, control, reset } = useForm({
        defaultValues: React.useMemo(() => {
            return data;
        }, [data]),
    });

    React.useEffect(() => {
        reset(data);
    }, [data, reset]);

    const styles = useStyles();

    const [isFormDisabled, setIsFormDisabled] = React.useState(true);

    const handleForm = () => {
        setIsFormDisabled(!isFormDisabled);
    };

    const onSubmit = async (data: any) => {
        const testId: number = 3;
        await updatePlayerMutation.mutateAsync({
            data: {
                nickname: data.nickname,
                city: data.city,
                postcode: data.postcode,
                phoneNo: data.phoneNo,
            },
            id: testId,
        });
        handleForm();
    };

    return (
        <Box className={styles.profile}>
            <div className={styles.profileHeader}>
                <h2>Profile</h2>
                <Link
                    hidden={!isFormDisabled}
                    component="button"
                    variant="body2"
                    onClick={handleForm}
                    sx={{ marginLeft: 2 }}
                >
                    Edit
                </Link>
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Grid
                        container
                        spacing={5}
                        sx={{ paddingLeft: 4, paddingRight: 4 }}
                    >
                        <Grid item xs={8} md={12}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Name required" }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        disabled
                                        id="standard-name"
                                        label="Name"
                                        variant="standard"
                                        value={value}
                                        onChange={onChange}
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={8} md={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ required: "E-mail required" }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        disabled
                                        id="standard-email"
                                        label="E-mail"
                                        value={value}
                                        onChange={onChange}
                                        variant="standard"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2} md={5}>
                            <Controller
                                name="nickname"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Nickname required" }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        disabled={isFormDisabled}
                                        id="standard-nickname"
                                        label="Nickname"
                                        value={value}
                                        onChange={onChange}
                                        variant="standard"
                                        sx={{ width: 1 }}
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={1} md={1} />
                        <Grid item xs={2} md={6}>
                            <Controller
                                name="phoneNo"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Phone no required" }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        disabled={isFormDisabled}
                                        id="standard-phone"
                                        label="Phone No"
                                        value={value}
                                        onChange={onChange}
                                        variant="standard"
                                        sx={{ width: 1 }}
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2} md={5}>
                            <Controller
                                name="city"
                                control={control}
                                defaultValue=""
                                rules={{ required: "City required" }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        disabled={isFormDisabled}
                                        id="standard-city"
                                        label="City"
                                        value={value}
                                        onChange={onChange}
                                        variant="standard"
                                        sx={{ width: 1 }}
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={1} md={1} />
                        <Grid item xs={2} md={6}>
                            <Controller
                                name="postcode"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Postcode required" }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        disabled={isFormDisabled}
                                        id="standard-postcode"
                                        label="Postcode"
                                        value={value}
                                        onChange={onChange}
                                        variant="standard"
                                        sx={{ width: 1 }}
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="flex-end"
                        sx={{ marginTop: 5, paddingBottom: 2, paddingRight: 4 }}
                    >
                        <Button
                            disabled={isFormDisabled}
                            variant="contained"
                            color="error"
                            onClick={handleForm}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isFormDisabled}
                            variant="contained"
                            color="success"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save
                        </Button>
                    </Stack>
                </>
            )}
        </Box>
    );
}
