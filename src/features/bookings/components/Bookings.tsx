import SubHeader from "@/components/Header/SubHeader";
import { Tab, Tabs } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import FindABooking from "./FindABooking";
import { MyBookings } from "./MyBookings";

const useStyles = makeStyles((theme) => ({
    tabsIndicator: {
        backgroundColor: theme.palette.secondary.light,
    },
}));

export const Bookings = () => {
    const styles = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <SubHeader title={"Book a Pitch"} />
            <Tabs
                onChange={handleChange}
                value={value}
                classes={{
                    indicator: styles.tabsIndicator,
                }}
                sx={{ p: 2 }}
            >
                <Tab label="Search" />
                <Tab label="My Bookings" />
            </Tabs>
            {
                {
                    0: <FindABooking />,
                    1: <MyBookings />,
                }[value]
            }
        </>
    );
};

export default Bookings;
