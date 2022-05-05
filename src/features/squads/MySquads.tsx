import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "squad", headerName: "Squad", flex: 1, width: 90 },
    {
        field: "location",
        headerName: "Location",
        flex: 1,
    },
    {
        field: "leave",
        headerName: "",
        flex: 1,
    },
];

const rows = [
    { id: 1, squad: "Dream Team", location: "Belfast", leave: "Leave" },
    { id: 2, squad: "Uno Team", location: "Belfast", leave: "Leave" },
];

const MySquads = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 224,
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </Box>
    );
};

export default MySquads;
