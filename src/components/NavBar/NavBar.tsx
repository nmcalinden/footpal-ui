import { Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { makeStyles } from "@material-ui/core/styles";

interface NavBarProps {
    setNavBarOpen: (navBarOpen: boolean) => void;
    navBarOpen: boolean;
}
const useStyles = makeStyles((theme) => ({
    tabsIndicator: {
        backgroundColor: theme.palette.secondary.light,
    },
}));

function LinkTab(props: any) {
    return (
        <Tab
            component={Link}
            to={props.pathname}
            {...props}
            sx={{ width: "150px" }}
            onClick={() => props.setNavBarOpen(false)}
        />
    );
}

function tabProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const homeNavBar = ["", "book", "venues"];
const authNavBar = ["", "profile", "book", "venues", "matches", "squads"];

export const NavBar = ({ navBarOpen, setNavBarOpen }: NavBarProps) => {
    const { user } = useAuth();
    const location = useLocation();
    const styles = useStyles();

    const getTabValue = (path: string) => {
        const tabs = user ? authNavBar : homeNavBar;
        const root = path.split("/")[1];
        const isMatch = (element: string) => element === root;
        return tabs.findIndex(isMatch);
    };

    const value = getTabValue(location.pathname);
    const HomeNavBar = () => {
        return (
            <Tabs
                orientation="vertical"
                variant="standard"
                value={value}
                sx={{
                    borderRight: { xs: navBarOpen ? 1 : 0, md: 1 },
                    borderColor: {
                        xs: navBarOpen ? "divider" : "none",
                        md: "divider",
                    },
                    width: {
                        xs: navBarOpen ? "100%" : "0%",
                        md: "10%",
                    },
                    overflow: "visible",
                }}
                classes={{
                    indicator: styles.tabsIndicator,
                }}
            >
                <LinkTab
                    label="Home"
                    pathname="/"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(0)}
                />
                <LinkTab
                    label="Book"
                    pathname="/book"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(1)}
                />
                <LinkTab
                    label="Venues"
                    pathname="/venues"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(2)}
                />
            </Tabs>
        );
    };

    const AuthNavBar = () => {
        return (
            <Tabs
                orientation="vertical"
                variant="standard"
                value={value}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: { xs: navBarOpen ? 1 : 0, md: 1 },
                    borderColor: {
                        xs: navBarOpen ? "divider" : "none",
                        md: "divider",
                    },
                    width: {
                        xs: navBarOpen ? "100%" : "0%",
                        md: "10%",
                    },
                    overflow: "visible",
                }}
                classes={{
                    indicator: styles.tabsIndicator,
                }}
            >
                <LinkTab
                    label="Home"
                    pathname="/"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(0)}
                />
                <LinkTab
                    label="My Profile"
                    pathname="/profile"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(1)}
                />
                <LinkTab
                    label="Book"
                    pathname="/book"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(2)}
                />
                <LinkTab
                    label="Venues"
                    pathname="/venues"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(3)}
                />
                <LinkTab
                    label="Matches"
                    pathname="/matches"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(4)}
                />
                <LinkTab
                    label="Squads"
                    pathname="/squads"
                    setNavBarOpen={setNavBarOpen}
                    {...tabProps(5)}
                />
            </Tabs>
        );
    };

    return user ? AuthNavBar() : HomeNavBar();
};
