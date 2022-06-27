/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import SignIn from "@/features/auth/components/SignIn/SignIn";
import storage from "@/utils/storage";
import TokenUtil from "@/utils/jwt";
import { refreshUser } from "@/features/auth/api/refresh";

interface HeaderProps {
    navBarOpen: boolean;
    setNavBarOpen: (navBarOpen: boolean) => void;
    isLargeScreen: boolean;
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const Header = ({
    navBarOpen,
    setNavBarOpen,
    isLargeScreen,
}: HeaderProps) => {
    const styles = useStyles();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const [openSignInModal, setOpenSignInModal] = React.useState(false);

    React.useEffect(() => {
        const refresh = async () => {
            const refreshToken = storage.getRefreshToken();
            await refreshUser({ refreshToken });
        };
        const aT = storage.getAccessToken();
        if (aT && TokenUtil.isTokenExpired(aT)) {
            refresh().catch(() => logout());
        }
    }, []);

    const handleNavBarView = () => {
        setNavBarOpen(!navBarOpen);
    };

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

    const handleOpenSignIn = () => {
        setOpenSignInModal(true);
        if (!isLargeScreen) {
            setNavBarOpen(false);
        }
    };
    const handleCloseSignIn = () => setOpenSignInModal(false);

    const handleLogout = () => logout();

    const getSignIn = () => {
        return (
            <Tooltip data-testid="sign-in-tooltip" title="Sign In or Sign Up">
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
                    <MenuItem
                        key={"logout"}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    >
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
                        alignItems: "center",
                    }}
                >
                    {!isLargeScreen && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleNavBarView}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
                        aria-label="footpal-title"
                        data-testid="footpal-title"
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
                            <SignIn handleCloseSignIn={handleCloseSignIn} />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
