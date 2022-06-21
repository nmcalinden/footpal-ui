import { Box, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMatches } from "@/features/matches/api/getUserMatches";
import { Spinner } from "@/components/Elements";

const columns: GridColDef[] = [
    { field: "venueName", headerName: "Venue", flex: 1, width: 90 },
    {
        field: "pitchName",
        headerName: "Pitch",
        flex: 1,
        width: 150,
    },
    {
        field: "matchDate",
        headerName: "Date",
        flex: 1,
        width: 150,
        renderCell: (params) => renderMatchDate(params),
    },
    {
        field: "time",
        headerName: "Time",
        flex: 1,
        width: 110,
    },
    {
        field: "maxPlayers",
        headerName: "No of Players",
        flex: 1,
        width: 110,
    },
    {
        field: "squadName",
        headerName: "Squad",
        flex: 1,
        width: 110,
    },
    {
        field: "view",
        headerName: "",
        width: 80,
        renderCell: () => (
            <Link
                component="button"
                onClick={() => {
                    console.log("View Match");
                }}
            >
                View
            </Link>
        ),
    },
    {
        field: "leave",
        headerName: "",
        width: 80,
        renderCell: () => (
            <Link
                component="button"
                onClick={() => {
                    console.log("Leave Match");
                }}
            >
                Leave
            </Link>
        ),
    },
];

export const MyMatches = () => {
    const matchesQuery = useMatches();

    if (matchesQuery.isLoading) {
        return <Spinner />;
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 224,
                marginTop: 2,
                p: 2,
            }}
        >
            {!matchesQuery.data ? (
                <Typography textAlign="center">No results found</Typography>
            ) : (
                <DataGrid
                    rows={matchesQuery.data}
                    columns={columns}
                    pageSize={2}
                    rowsPerPageOptions={[2]}
                />
            )}
        </Box>
    );
};

function renderMatchDate(params: any) {
    if (params.value) {
        return params.value.split("T")[0];
    }
    return null;
}
