import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Venue } from "@/features/venues/types";
import { useNavigate } from "react-router-dom";

interface BookingBreadcrumbProps {
    page: string;
    venue: Venue;
}

export const BookingBreadcrumb = ({ page, venue }: BookingBreadcrumbProps) => {
    const navigate = useNavigate();

    const capitalize = (s: string) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ p: 2 }}>
            [
            <Link
                underline="hover"
                key="1"
                color="inherit"
                onClick={() => navigate(`/${page}`)}
            >
                {capitalize(page)}
            </Link>
            ,
            <Link
                underline="hover"
                key="1"
                color="inherit"
                onClick={() => navigate(`/${page}/${venue.id}`)}
            >
                {venue.name}
            </Link>
            ,
            <Typography key="3" color="text.primary">
                Order
            </Typography>
            , ];
        </Breadcrumbs>
    );
};

export default BookingBreadcrumb;
