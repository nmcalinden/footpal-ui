import * as React from "react";
import { Spinner } from "@/components/Elements";
import SubHeader from "@/components/Header/SubHeader";
import { useVenues } from "@/features/venues/api/getVenues";
import { Autocomplete, Grid, TextField } from "@mui/material";
import VenueList from "./VenueList";

export const Venues = () => {
    const venues = useVenues();

    if (venues.isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <SubHeader title={"Venues"} />
            <Grid container sx={{ paddingTop: 2 }}>
                <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={["Belfast", "Lurgan"].map((option) => option)}
                        sx={{
                            minWidth: { xs: "150px", md: "350px" },
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Search Venue" />
                        )}
                    />
                </Grid>
            </Grid>
            <VenueList page={"venues"} data={venues.data} />
        </>
    );
};

export default Venues;
