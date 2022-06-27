import { Grid, Link, Pagination } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Venue } from "@/features/venues/types";

interface VenueListProps {
    page: string;
    data: Venue[] | undefined;
}

const columns: GridColDef[] = [
    {
        flex: 1,
        field: "name",
        headerName: "Venue",
    },
    {
        flex: 1,
        field: "city",
        headerName: "City",
    },
    {
        field: "view",
        headerName: "",
        flex: 1,
        renderCell: () => <Link component="button">View</Link>,
    },
];

const VenueList = ({ page, data }: VenueListProps) => {
    return (
        <Grid container spacing={4} sx={{ paddingTop: 4 }}>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{
                    paddingTop: 2,
                    paddingBottom: 5,
                    height: "400px",
                }}
            >
                {data && (
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={(row) => row.id}
                        disableSelectionOnClick
                    />
                )}
            </Grid>
            <Grid
                item
                xs={12}
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
