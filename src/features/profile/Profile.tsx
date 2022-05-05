import * as React from "react";
import { Box, Grid, Tabs, Tab } from "@mui/material";
import { MyMatches } from "@/features/matches";
import MySquads from "@/features/squads/MySquads";

const Profile = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={10} md={12}>
                    <Box
                        sx={{
                            bgcolor: "#dfebda",
                            display: "flex",
                            height: 60,
                            p: 2,
                        }}
                    >
                        <h1>My Profile</h1>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item xs={10} md={12} justifyContent="center">
                    <h2>Matches</h2>

                    <Box sx={{ width: "100%" }}>
                        <Tabs
                            onChange={handleChange}
                            value={value}
                            aria-label="Tabs where each tab needs to be selected manually"
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
                <Grid item xs={4} md={6} justifyContent="flex-end">
                    <Box
                        sx={{
                            bgcolor: "#dfebda",
                            border: 1,
                            borderColor: "divider",
                            height: 275,
                            p: 1,
                        }}
                    >
                        <h2>Profile</h2>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
