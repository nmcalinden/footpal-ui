import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "@/utils/format";

interface BreadcrumbProps {
    links: BreadcrumbLink[];
    currentPage: string;
}

export interface BreadcrumbLink {
    title: string;
    href: string;
}

export const Breadcrumb = ({ links, currentPage }: BreadcrumbProps) => {
    const navigate = useNavigate();
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ p: 2 }}>
            [
            {links &&
                links.map((l) => {
                    return (
                        <Link
                            underline="hover"
                            key={l.href}
                            color="inherit"
                            onClick={() => navigate(`${l.href}`)}
                        >
                            {capitalizeFirstLetter(l.title)}
                        </Link>
                    );
                })}
            ,
            <Typography key="3" color="text.primary">
                {capitalizeFirstLetter(currentPage)}
            </Typography>
            , ];
        </Breadcrumbs>
    );
};
