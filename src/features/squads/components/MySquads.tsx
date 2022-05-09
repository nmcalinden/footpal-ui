import * as React from "react";
import { Box, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSquads } from "@/features/squads/api/getSquads";
import { Spinner } from "@/components/Elements";

const columns: GridColDef[] = [
    { field: "name", headerName: "Squad", flex: 1, width: 90 },
    {
        field: "city",
        headerName: "Location",
        flex: 1,
    },
    {
        field: "leave",
        headerName: "",
        flex: 1,
        renderCell: () => (
            <Link
                component="button"
                onClick={() => {
                    console.log("Remove Squad");
                }}
            >
                Leave
            </Link>
        ),
    },
];

export const MySquads = () => {
    const squadsQuery = useSquads();

    if (squadsQuery.isLoading) {
        return <Spinner />;
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 224,
            }}
        >
            {!squadsQuery.data ? (
                <Typography textAlign="center">No results found</Typography>
            ) : (
                <DataGrid
                    rows={squadsQuery.data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.squadId}
                    disableSelectionOnClick
                />
            )}
        </Box>
    );
};
