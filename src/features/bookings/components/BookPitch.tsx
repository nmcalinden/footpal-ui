import { Box, Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import SubHeader from "@/components/Header/SubHeader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useVenue } from "@/features/venues/api/getVenue";
import { Spinner } from "@/components/Elements";
import VenueBookingGrid from "@/features/venues/components/VenueBookingGrid";
import React from "react";

interface BookPitchProps {
    page: string;
}

export const BookPitch = ({ page }: BookPitchProps) => {
    let { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const matchDateParam = searchParams.get("matchDate");
    const pitches = searchParams.get("pitches");
    console.log("Pitches: ", pitches);
    const venueId: string = id || "";
    const [matchDate, setMatchDate] = React.useState<Date>(new Date());

    React.useEffect(() => {
        if (matchDateParam) {
            const [y, m, d] = matchDateParam.split("-");
            const year = Number(y);
            const month = Number(m);
            const day = Number(d);

            setMatchDate(new Date(year, month - 1, day));
        }
    }, [matchDateParam]);

    const venueQuery = useVenue({ venueId });

    const capitalize = (s: string) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const bookingBreadcrumbs = (
        page: string,
        venue: string,
        venueId: number,
        name: string
    ) => {
        return [
            <Link
                underline="hover"
                key="1"
                color="inherit"
                onClick={() => navigate(`/${page}`)}
            >
                {capitalize(page)}
            </Link>,
            <Link
                underline="hover"
                key="1"
                color="inherit"
                onClick={() => navigate(`/${page}/${venueId}`)}
            >
                {venue}
            </Link>,
            <Typography key="3" color="text.primary">
                {name}
            </Typography>,
        ];
    };

    if (venueQuery.isLoading) {
        return <Spinner />;
    }

    if (!venueQuery.data || !matchDateParam) return null;
    return (
        <>
            <SubHeader title={"Book Pitch"} />
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ p: 2 }}>
                {bookingBreadcrumbs(
                    page,
                    venueQuery.data.name,
                    venueQuery.data.id,
                    "Order"
                )}
            </Breadcrumbs>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={4} md={6} justifyContent="center">
                    <h2>Book Pitch</h2>
                    <Grid container sx={{ paddingBottom: 2 }}>
                        <Grid item xs={2} md={8}></Grid>
                        <Grid
                            item
                            xs={2}
                            md={4}
                            sx={{ display: "flex", justifyContent: "right" }}
                        ></Grid>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={4}
                    md={6}
                    sx={{
                        borderLeft: 1,
                        borderBottom: 1,
                        borderColor: "divider",
                        paddingBottom: 5,
                    }}
                >
                    <h2>Change Slot</h2>
                    <VenueBookingGrid
                        venueId={venueQuery.data.id}
                        isPitchBookView
                        openDate={matchDate}
                    />
                </Grid>
                <Grid item xs={4} md={6} />
                <Grid item xs={4} md={6}>
                    <Box sx={{ height: 300 }}>
                        {/* <h2>Order Details</h2> */}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default BookPitch;
