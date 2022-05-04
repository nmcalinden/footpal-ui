import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "venue", headerName: "Venue", flex: 1, width: 90 },
    {
        field: "pitch",
        headerName: "Pitch",
        flex: 1,
        width: 150,
    },
    {
        field: "date",
        headerName: "Date",
        flex: 1,
        width: 150,
    },
    {
        field: "time",
        headerName: "Time",
        flex: 1,
        width: 110,
    },
    {
        field: "noOfPlayers",
        headerName: "No of Players",
        flex: 1,
        width: 110,
    },
    {
        field: "squad",
        headerName: "Squad",
        flex: 1,
        width: 110,
    },
    {
        field: "view",
        headerName: "",
        width: 80,
    },
    {
        field: "leave",
        headerName: "",
        width: 80,
    },
];

const rows = [
    {
        id: 1,
        venue: "Venue A",
        pitch: "Pitch 1",
        date: "20/03/2022",
        time: "18:00",
        noOfPlayers: "10/10",
        squad: "Dream Team",
        view: "View",
        leave: "Leave",
    },
    {
        id: 2,
        venue: "Venue B",
        pitch: "Pitch 3",
        date: "27/03/2022",
        time: "20:00",
        noOfPlayers: "6/10",
        squad: "N/A",
        view: "View",
        leave: "Leave",
    },
];

const MyGames = () => {
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

export default MyGames;
