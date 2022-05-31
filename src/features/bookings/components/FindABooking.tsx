import { Grid } from "@mui/material";
import { Search } from "@/components/Search";
import { useVenues } from "@/features/venues/api/getVenues";
import { Spinner } from "@/components/Elements";
import VenueList from "@/features/venues/components/VenueList";

const FindABooking = () => {
    const venues = useVenues();

    if (venues.isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Grid container sx={{ p: 2 }}>
                <Search />
                <VenueList page={"book"} data={venues.data} />
            </Grid>
        </>
    );
};

export default FindABooking;
