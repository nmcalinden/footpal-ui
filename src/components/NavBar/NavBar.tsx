import * as React from "react";
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

function LinkTab(props: any) {
    return <Tab component={Link} to={props.pathname} {...props} />;
}

function tabProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

export const NavBar = () => {
    const { user } = useAuth();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const HomeNavBar = () => {
        return (
            <>
                <Tabs
                    orientation="vertical"
                    variant="standard"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: "divider" }}
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
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: "divider" }}
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
