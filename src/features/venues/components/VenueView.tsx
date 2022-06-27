import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import { useVenue } from "../api/getVenue";
import { Spinner } from "@/components/Elements";
import SubHeader from "@/components/Header/SubHeader";
import { VenueOpeningHour } from "../types";
import { useVenueOpeningHours } from "../api/getVenueOpeningHours";
import VenueBookingGrid from "./VenueBookingGrid";
import { Breadcrumb, BreadcrumbLink } from "@/components/Breadcrumb";

interface VenueViewProps {
    page: string;
}

export const VenueView = ({ page }: VenueViewProps) => {
    let { id } = useParams();
    const theme = useTheme();

    const venueId: string = id || "";
    const venueQuery = useVenue({ venueId });
    const venueOpeningHoursQuery = useVenueOpeningHours({ venueId });

    if (venueQuery.isLoading && venueOpeningHoursQuery.isLoading) {
        return <Spinner />;
    }

    if (!venueQuery.data) return null;

    const renderContactDetailsRow = (field: string, value: string) => {
        return (
            <Box
                sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}
            >
                <Grid item xs={6} md={4}>
                    <Typography>{`${field}:`}</Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Typography>{value}</Typography>
                </Grid>
            </Box>
        );
    };

    const renderOpeningHoursRow = (openingHour: VenueOpeningHour) => {
        const dayOfWeek = openingHour.dayOfWeek.substring(0, 3);
        const time =
            openingHour.open !== ""
                ? `${openingHour.open} - ${openingHour.close}`
                : "CLOSED";
        const field = dayOfWeek === "Mon" ? "Opening Hours: " : "";
        return (
            <Box
                key={dayOfWeek}
                sx={{ display: "flex", flexDirection: "row", marginBottom: 1 }}
            >
                <Grid item xs={8} md={4}>
                    <Typography>{field}</Typography>
                </Grid>
                <Grid item xs={2} md={3}>
                    <Typography>{dayOfWeek}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography>{time}</Typography>
                </Grid>
            </Box>
        );
    };

    const venueBreadcrumbLink = (page: string) => {
        const link: BreadcrumbLink = { title: page, href: `/${page}` };
        return [link];
    };

    const openingHours = venueOpeningHoursQuery.data || [];

    const maxDate = new Date();
    maxDate.setMonth(new Date().getMonth() + 1);
    return (
        <>
            <SubHeader title={venueQuery.data.name} />
            <Breadcrumb
                links={venueBreadcrumbLink(page)}
                currentPage={venueQuery.data.name}
            />
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} md={7} justifyContent="center">
                    <h2>Available Bookings</h2>
                    <VenueBookingGrid venueId={venueQuery.data.id} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <h2>Contact Us</h2>
                    <Box
                        sx={{
                            border: 2,
                            borderColor: theme.palette.secondary.light,
                            borderRadius: 5,
                            p: 2,
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {renderContactDetailsRow(
                            "Address",
                            venueQuery.data.address
                        )}
                        {renderContactDetailsRow("City", venueQuery.data.city)}
                        {renderContactDetailsRow(
                            "Postcode",
                            venueQuery.data.postcode
                        )}
                        {renderContactDetailsRow(
                            "Phone No",
                            venueQuery.data.phoneNo
                        )}
                        {renderContactDetailsRow(
                            "Email",
                            venueQuery.data.email
                        )}
                        {openingHours.map((o) => {
                            return renderOpeningHoursRow(o);
                        })}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default VenueView;
