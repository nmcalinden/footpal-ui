import * as React from "react";
import { Box, Grid, Tabs, Tab } from "@mui/material";
import { MyMatches } from "@/features/matches/components";
import { MySquads } from "@/features/squads/components/MySquads";
import { makeStyles } from "@material-ui/core/styles";
import SubHeader from "@/components/Header/SubHeader";
import MyProfile from "./MyUser";
import { MyBookings } from "@/features/bookings/components/MyBookings";

const useStyles = makeStyles((theme) => ({
    tabsIndicator: {
        backgroundColor: theme.palette.secondary.light,
    },
}));

export const Profile = () => {
    const styles = useStyles();

    const [mainTab, setMainTab] = React.useState(0);
    const [matchesTab, setMatchesTab] = React.useState(0);

    const handleMainTabChange = (
        event: React.SyntheticEvent,
        newValue: number
    ) => {
        setMainTab(newValue);
    };

    const handleMatchesTabChange = (
        event: React.SyntheticEvent,
        newValue: number
    ) => {
        setMatchesTab(newValue);
    };

    const renderMyProfile = () => {
        return (
            <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                <Grid item xs={12} md={7}>
                    <MyProfile />
                </Grid>
                <Grid item xs={12} md={5} justifyContent="flex-end">
                    <h2>My Squad(s)</h2>
                    <MySquads />
                </Grid>
            </Grid>
        );
    };

    const renderMyMatches = () => {
        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <h2>My Matches</h2>
                <Box sx={{ width: "100%" }}>
                    <Tabs
                        onChange={handleMatchesTabChange}
                        value={matchesTab}
                        aria-label="Tabs where each tab needs to be selected manually"
                        classes={{
                            indicator: styles.tabsIndicator,
                        }}
                    >
                        <Tab label="Upcoming" />
                        <Tab label="Available" />
                        <Tab label="Previous" />
                    </Tabs>
                </Box>
                {
                    {
                        0: <MyMatches />,
                        1: <MyMatches />,
                        2: <MyMatches />,
                    }[matchesTab]
                }
            </Box>
        );
    };

    const renderMyBookings = () => {
        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <h2>My Bookings</h2>
                <MyBookings />
            </Box>
        );
    };

    return (
        <>
            <SubHeader title={"My Profile"} />
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} md={12} justifyContent="center">
                    <Box sx={{ width: "100%" }}>
                        <Tabs
                            onChange={handleMainTabChange}
                            value={mainTab}
                            aria-label="Tabs where each tab needs to be selected manually"
                            classes={{
                                indicator: styles.tabsIndicator,
                            }}
                        >
                            <Tab label="Profile" />
                            <Tab label="Matches" />
                            <Tab label="My Bookings" />
                        </Tabs>
                    </Box>
                    {
                        {
                            0: renderMyProfile(),
                            1: renderMyMatches(),
                            2: renderMyBookings(),
                        }[mainTab]
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
