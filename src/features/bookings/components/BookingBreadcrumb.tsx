import { Venue } from "@/features/venues/types";
import { Breadcrumb, BreadcrumbLink } from "@/components/Breadcrumb";

interface BookingBreadcrumbProps {
    page: string;
    venue: Venue;
}

export const BookingBreadcrumb = ({ page, venue }: BookingBreadcrumbProps) => {
    const buildBookingBreadcrumbLinks = () => {
        const link1: BreadcrumbLink = { title: page, href: `/${page}` };
        const link2: BreadcrumbLink = {
            title: venue.name,
            href: `/${page}/${venue.id}`,
        };

        return [link1, link2];
    };
    return (
        <Breadcrumb
            links={buildBookingBreadcrumbLinks()}
            currentPage={"order"}
        />
    );
};

export default BookingBreadcrumb;
