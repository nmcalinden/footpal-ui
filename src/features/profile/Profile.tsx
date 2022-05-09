import * as React from "react";
import { Box, Grid, Tabs, Tab } from "@mui/material";
import { MyMatches } from "@/features/matches";
import { MySquads } from "@/features/squads/components/MySquads";
import { makeStyles } from "@material-ui/core/styles";
import SubHeader from "@/components/Header/SubHeader";

const useStyles = makeStyles((theme) => ({
    profile: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.primary,
        border: 1,
        borderColor: "divider",
        borderRadius: "16px",
        height: 300,
        padding: 5,
        paddingLeft: 10,
    },
    tabsIndicator: {
        backgroundColor: theme.palette.secondary.light,
    },
}));

const Profile = () => {
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
                <Grid item xs={4} md={6} justifyContent="flex-end">
                    <Box className={styles.profile}>
                        <h2>Profile</h2>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
