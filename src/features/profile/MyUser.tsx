import * as React from "react";
import { Stack, Box, Button, Grid, Link, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

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
    const styles = useStyles();

    const [email, setEmail] = React.useState("Test");
    const [isFormDisabled, setIsFormDisabled] = React.useState(true);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleForm = () => {
        setIsFormDisabled(!isFormDisabled);
    };

    return (
        <Box className={styles.profile}>
            <div className={styles.profileHeader}>
                <h2>Profile</h2>
                <Link
                    disabled={!isFormDisabled}
                    component="button"
                    variant="body2"
                    onClick={handleForm}
                    sx={{ marginLeft: 2 }}
                >
                    Edit
                </Link>
            </div>
            <Grid
                container
                spacing={5}
                sx={{ paddingLeft: 4, paddingRight: 4 }}
            >
                <Grid item xs={4} md={6}>
                    <TextField
                        disabled={isFormDisabled}
                        id="standard-name"
                        label="Name"
                        value={email}
                        onChange={handleEmailChange}
                        variant="standard"
                        sx={{ width: 1 }}
                    />
                </Grid>
                <Grid item xs={2} md={4}>
                    <TextField
                        disabled={isFormDisabled}
                        id="standard-nickname"
                        label="Nickname"
                        value={email}
                        onChange={handleEmailChange}
                        variant="standard"
                        sx={{ width: 1 }}
                    />
                </Grid>
                <Grid item xs={8} md={10}>
                    <TextField
                        disabled={isFormDisabled}
                        id="standard-email"
                        label="E-mail"
                        value={email}
                        onChange={handleEmailChange}
                        variant="standard"
                        sx={{ width: 1 }}
                    />
                </Grid>
                <Grid item xs={8} md={10}>
                    <TextField
                        disabled={isFormDisabled}
                        id="standard-phone"
                        label="Phone No"
                        value={email}
                        onChange={handleEmailChange}
                        variant="standard"
                        sx={{ width: 1 }}
                    />
                </Grid>
                <Grid item xs={4} md={6}>
                    <TextField
                        disabled={isFormDisabled}
                        id="standard-city"
                        label="City"
                        value={email}
                        onChange={handleEmailChange}
                        variant="standard"
                        sx={{ width: 1 }}
                    />
                </Grid>
                <Grid item xs={2} md={4}>
                    <TextField
                        disabled={isFormDisabled}
                        id="standard-postcode"
                        label="Postcode"
                        value={email}
                        onChange={handleEmailChange}
                        variant="standard"
                        sx={{ width: 1 }}
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
                    onClick={handleForm}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );
}
