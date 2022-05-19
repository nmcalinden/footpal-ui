import { Box, Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import { useVenue } from "../api/getVenue";
import { Spinner } from "@/components/Elements";
import SubHeader from "@/components/Header/SubHeader";
import { useNavigate } from "react-router-dom";

interface VenueViewProps {
    page: string;
}

export const VenueView = ({ page }: VenueViewProps) => {
    let { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const venueId: string = id || "";
    const venueQuery = useVenue({ venueId });

    if (venueQuery.isLoading) {
        return <Spinner />;
    }

    if (!venueQuery.data) return null;

    const renderContactDetailsRow = (field: string, value: string) => {
        return (
            <Box
                sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}
            >
                <Grid item xs={3} md={4}>
                    <Typography>{`${field}:`}</Typography>
                </Grid>
                <Grid item xs={3} md={4}>
                    <Typography>{`${value}`}</Typography>
                </Grid>
            </Box>
        );
    };

    const capitalize = (s: string) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const venueBreadcrumbs = (name: string, page: string) => {
        return [
            <Link
                underline="hover"
                key="1"
                color="inherit"
                onClick={() => navigate(`/${page}`)}
            >
                {capitalize(page)}
            </Link>,
            <Typography key="3" color="text.primary">
                {name}
            </Typography>,
        ];
    };

    return (
        <>
            <SubHeader title={venueQuery.data.name} />
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ p: 2 }}>
                {venueBreadcrumbs(venueQuery.data.name, page)}
            </Breadcrumbs>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={4} md={7} justifyContent="center"></Grid>
                <Grid item xs={4} md={5}>
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
                        {renderContactDetailsRow("Opening Hours", "")}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default VenueView;
