import * as React from "react";
import { Box, Grid, Tabs, Tab } from "@mui/material";
import { MyMatches } from "@/features/matches";
import { MySquads } from "@/features/squads/components/MySquads";
import { makeStyles } from "@material-ui/core/styles";
import SubHeader from "@/components/Header/SubHeader";
import MyProfile from "./MyUser";

const useStyles = makeStyles((theme) => ({
    tabsIndicator: {
        backgroundColor: theme.palette.secondary.light,
    },
}));

export const Profile = () => {
    const styles = useStyles();

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <SubHeader title={"My Profile"} />
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item xs={10} md={12} justifyContent="center">
                    <h2>Matches</h2>

                    <Box sx={{ width: "100%" }}>
                        <Tabs
                            onChange={handleChange}
                            value={value}
                            aria-label="Tabs where each tab needs to be selected manually"
                            classes={{
                                indicator: styles.tabsIndicator,
                            }}
                        >
                            <Tab label="Upcoming" />
                            <Tab label="Available" />
                            <Tab label="Previous" />
                            <Tab label="My Bookings" />
                        </Tabs>
                    </Box>
                    <MyMatches />
                </Grid>
                <Grid item xs={4} md={6} justifyContent="flex-end">
                    <h2>My Squad(s)</h2>
                    <MySquads />
                </Grid>
                <Grid item xs={4} md={6}>
                    <MyProfile />
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
