import * as React from "react";
import { Spinner } from "@/components/Elements";
import SubHeader from "@/components/Header/SubHeader";
import { useVenues } from "@/features/venues/api/getVenues";
import { Autocomplete, Grid, TablePagination, TextField } from "@mui/material";
import VenueList from "./VenueList";

export const Venues = () => {
    const venues = useVenues();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 8));
        setPage(0);
    };

    if (venues.isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <SubHeader title={"Venues"} />
            <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                <Grid
                    item
                    xs={4}
                    sm={6}
                    md={6}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={["Belfast", "Lurgan"].map((option) => option)}
                        sx={{ minWidth: "350px" }}
                        renderInput={(params) => (
                            <TextField {...params} label="Search Venue" />
                        )}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                    sm={6}
                    md={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <TablePagination
                        rowsPerPageOptions={[8, 16, 24]}
                        component="div"
                        count={venues && venues.data ? venues.data.length : 0}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
            <VenueList page={"venues"} data={venues.data} />
        </>
    );
};

export default Venues;
