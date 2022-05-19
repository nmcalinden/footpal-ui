import { Grid, Pagination } from "@mui/material";
import { Venue } from "@/features/venues/types";
import VenueBox from "./VenueBox";

interface VenueListProps {
    page: string;
    data: Venue[] | undefined;
}

const VenueList = ({ page, data }: VenueListProps) => {
    const getVenueView = (data: Venue, index: number) => {
        return (
            <Grid
                item
                xs={2}
                sm={3}
                md={3}
                key={index}
                sx={{
                    paddingTop: 2,
                    paddingBottom: 5,
                }}
            >
                <VenueBox page={page} data={data} />
            </Grid>
        );
    };

    return (
        <Grid container spacing={4} sx={{ paddingTop: 4 }}>
            {data &&
                data.map((venue, index) => {
                    return getVenueView(venue, index);
                })}
            <Grid
                item
                xs={10}
                sm={12}
                md={12}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <Pagination
                    count={1}
                    variant="outlined"
                    color="primary"
                    disabled
                />
            </Grid>
        </Grid>
    );
};

export default VenueList;
