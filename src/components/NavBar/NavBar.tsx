import { Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { makeStyles } from "@material-ui/core/styles";

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

export const NavBar = () => {
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
            <>
                <Tabs
                    orientation="vertical"
                    variant="standard"
                    value={value}
                    sx={{ borderRight: 1, borderColor: "divider" }}
                    classes={{
                        indicator: styles.tabsIndicator,
                    }}
                >
                    <LinkTab label="Home" pathname="/" {...tabProps(0)} />
                    <LinkTab label="Book" pathname="/book" {...tabProps(1)} />
                    <LinkTab
                        label="Venues"
                        pathname="/venues"
                        {...tabProps(2)}
                    />
                </Tabs>
            </>
        );
    };

    const AuthNavBar = () => {
        return (
            <>
                <Tabs
                    orientation="vertical"
                    variant="standard"
                    value={value}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: "divider" }}
                    classes={{
                        indicator: styles.tabsIndicator,
                    }}
                >
                    <LinkTab label="Home" pathname="/" {...tabProps(0)} />
                    <LinkTab
                        label="My Profile"
                        pathname="/profile"
                        {...tabProps(1)}
                    />
                    <LinkTab label="Book" pathname="/book" {...tabProps(2)} />
                    <LinkTab
                        label="Venues"
                        pathname="/venues"
                        {...tabProps(3)}
                    />
                    <LinkTab
                        label="Matches"
                        pathname="/matches"
                        {...tabProps(4)}
                    />
                    <LinkTab
                        label="Squads"
                        pathname="/squads"
                        {...tabProps(5)}
                    />
                </Tabs>
            </>
        );
    };

    return user ? AuthNavBar() : HomeNavBar();
};
