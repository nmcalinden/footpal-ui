import SubHeader from "@/components/Header/SubHeader";
import { Grid } from "@mui/material";
import { MyMatches } from "./MyMatches";

const Matches = () => {
    return (
        <>
            <SubHeader title={"Matches"} />
            <Grid item xs={10} md={12} justifyContent="center" sx={{ p: 3 }}>
                <h2>Upcoming</h2>
                <MyMatches />
            </Grid>
            <Grid item xs={10} md={12} justifyContent="center" sx={{ p: 3 }}>
                <h2>Available</h2>
                <MyMatches />
            </Grid>
            <Grid item xs={10} md={12} justifyContent="center" sx={{ p: 3 }}>
                <h2>Public</h2>
                <MyMatches />
            </Grid>
        </>
    );
};

export default Matches;
