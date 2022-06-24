import { Box, Button, Checkbox, Grid, Link, Typography } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRowParams,
    MuiEvent,
} from "@mui/x-data-grid";
import { Spinner } from "@/components/Elements";
import { useUserBookings } from "../api/getUserBookings";
import React from "react";
import { capitalizeFirstLetter } from "@/utils/format";
import { UserBooking } from "../types";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 75,
    },
    {
        flex: 1,
        field: "matchDate",
        headerName: "Date",
        renderCell: (params) => renderMatchDate(params.row.matchDate),
    },
    {
        flex: 1,
        field: "startTime",
        headerName: "Time",
    },
    {
        flex: 1,
        field: "recurring",
        headerName: "Type",
        valueGetter: (params) => {
            if (params.row.noOfWeeks) {
                return params.row.noOfWeeks > 1 ? "Recurring" : "Single";
            }
        },
    },
    {
        flex: 2,
        field: "venueName",
        headerName: "Venue",
        valueGetter: (params) => {
            if (params.row.venue.name) {
                return params.row.venue.name;
            }
        },
    },
    {
        flex: 1,
        field: "pitchName",
        headerName: "Pitch",
        valueGetter: (params) => {
            if (params.row.pitch.name) {
                return params.row.pitch.name;
            }
        },
    },
    {
        flex: 1,
        field: "status",
        headerName: "Status",
        valueGetter: (params) => {
            if (params.row.status) {
                return capitalizeFirstLetter(params.row.status);
            }
        },
    },
    {
        field: "paid",
        headerName: "Is Paid",
        width: 75,
        renderCell: (params) => {
            return <Checkbox disabled checked={params.row.isPaid} />;
        },
    },
    {
        field: "view",
        headerName: "",
        width: 50,
        renderCell: () => <Link component="button">View</Link>,
    },
];

const matchColumns: GridColDef[] = [
    {
        flex: 1,
        field: "matchDate",
        headerName: "Date",
        renderCell: (params) => renderMatchDate(params.row.matchDate),
    },
    {
        field: "view",
        headerName: "",
        width: 50,
        renderCell: () => <Link component="button">View</Link>,
    },
];

export const MyBookings = () => {
    const [page, setPage] = React.useState<number>(0);
    const [selectedRow, setSelectedRow] = React.useState<
        UserBooking | undefined
    >();

    const bookingsQuery = useUserBookings();

    const handleRowSelect = (
        params: GridRowParams,
        e: MuiEvent<React.MouseEvent>
    ) => {
        setSelectedRow(params.row);
    };

    if (bookingsQuery.isLoading) {
        return <Spinner />;
    }

    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                marginTop: 2,
                paddingRight: 5,
                paddingLeft: 5,
            }}
        >
            {!bookingsQuery.data ? (
                <Typography textAlign="center">No results found</Typography>
            ) : (
                <Box sx={{ height: 375, marginBottom: 5 }}>
                    <DataGrid
                        rows={bookingsQuery.data}
                        columns={columns}
                        page={page}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rowCount={bookingsQuery.data.length}
                        onPageChange={(newPage) => {
                            setPage(newPage);
                        }}
                        onRowClick={handleRowSelect}
                    />
                </Box>
            )}
            {selectedRow && (
                <>
                    <Typography
                        variant="h5"
                        textAlign="left"
                        sx={{ paddingBottom: 2 }}
                    >
                        Selected Booking:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={1} md={2}>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                Booking Id:
                            </Typography>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                Status:
                            </Typography>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                No Of Weeks:
                            </Typography>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                Date:
                            </Typography>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                Venue:
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={3}>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                #{selectedRow.id}
                            </Typography>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                {capitalizeFirstLetter(selectedRow.status)}
                            </Typography>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                {selectedRow.noOfWeeks}
                            </Typography>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                {`${renderMatchDate(selectedRow.matchDate)} - ${
                                    selectedRow.startTime
                                }`}
                            </Typography>
                            <Typography
                                textAlign="left"
                                sx={{ marginBottom: 2 }}
                            >
                                {selectedRow.venue.name}
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {}}
                            >
                                Cancel Booking
                            </Button>
                        </Grid>
                        <Grid item xs={4} md={6}>
                            <Typography textAlign="left">Matches:</Typography>
                            <DataGrid
                                rows={selectedRow.matches}
                                columns={matchColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                rowCount={selectedRow.matches.length}
                                sx={{
                                    height: 275,
                                    width: 250,
                                }}
                            />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

function renderMatchDate(matchDate: string) {
    if (matchDate) {
        return matchDate.split("T")[0];
    }
    return null;
}
