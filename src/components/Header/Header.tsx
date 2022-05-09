import * as React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import SignIn from "@/features/auth/components/SignIn/SignIn";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const Header = () => {
    const styles = useStyles();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const [openSignInModal, setOpenSignInModal] = React.useState(false);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenProfile = () => {
        handleCloseUserMenu();
        navigate("/profile", { replace: true });
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenSignIn = () => setOpenSignInModal(true);
    const handleLogout = () => logout();

    const getSignIn = () => {
        return (
            <Tooltip title="Sign In or Sign Up">
                <Button
                    key={"sign-in"}
                    onClick={handleOpenSignIn}
                    sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                    }}
                >
                    Sign In
                </Button>
            </Tooltip>
        );
    };

    const getLoggedIn = () => {
        return (
            <>
                <Tooltip title="Click for more options">
                    <Button
                        key={"sign-in"}
                        onClick={handleOpenUserMenu}
                        sx={{
                            my: 2,
                            color: "white",
                            display: "block",
                        }}
                    >
                        Logged In: {user?.name}
                    </Button>
                </Tooltip>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem key={"profile"} onClick={handleOpenProfile}>
                        <Typography textAlign="center">My Profile</Typography>
                    </MenuItem>
                    <MenuItem key={"logout"} onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </>
        );
    };

    return (
        <AppBar position="static" className={styles.appBar}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                        Footpal
                    </Typography>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        Footpal
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        {user ? getLoggedIn() : getSignIn()}
                        {openSignInModal && (
                            <SignIn
                                open={openSignInModal}
                                setOpen={setOpenSignInModal}
                            />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
