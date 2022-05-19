import { Button, Grid } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import { Search } from "@/components/Search";
import { useVenues } from "@/features/venues/api/getVenues";
import { Spinner } from "@/components/Elements";
import VenueList from "@/features/venues/components/VenueList";

const FindABooking = () => {
    const venues = useVenues();
    const theme = useTheme();

    if (venues.isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Grid container sx={{ p: 2 }}>
                <Search />
                <Button
                    variant="contained"
                    sx={{
                        marginLeft: 2,
                        marginTop: 1,
                        marginBottom: 1,
                        marginRight: 2,
                        bgcolor: `${theme.palette.primary.main}`,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.light,
                        },
                    }}
                >
                    Search
                </Button>
                <VenueList page={"book"} data={venues.data} />
            </Grid>
        </>
    );
};

export default FindABooking;
