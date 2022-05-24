import {
    Box,
    Breadcrumbs,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useParams } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import { useVenue } from "../api/getVenue";
import { useVenueSlots } from "@/features/bookings/api/getAvailableBookings";
import { Spinner } from "@/components/Elements";
import SubHeader from "@/components/Header/SubHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { VenueBookingSlots, VenueTimeSlots } from "@/features/bookings/types";
import _ from "lodash";
import { VenueOpeningHour } from "../types";
import { useVenueOpeningHours } from "../api/getVenueOpeningHours";
import React from "react";

interface VenueViewProps {
    page: string;
}

interface VenueBookingColumns {
    day: string;
    date: string;
}

interface VenueBookingTimeSlot {
    startTime: string;
    endTime: string;
    days: DaySlot[];
}

interface DaySlot {
    pitchTimeSlotId: number;
    dayOfWeek: string;
    isBooked: boolean;
}

interface DateRange {
    open: Date;
    close: Date;
}

const getTimeSlots = (vBookingSlots: VenueBookingSlots[]) => {
    const times: VenueBookingTimeSlot[] = [];

    vBookingSlots &&
        vBookingSlots.forEach((v: VenueBookingSlots) => {
            v.timeSlots.forEach((ts: VenueTimeSlots) => {
                const slot = _.find(times, {
                    startTime: ts.startTime,
                });

                const dayTest: DaySlot = {
                    pitchTimeSlotId: ts.id,
                    dayOfWeek: v.dayOfWeek,
                    isBooked: ts.isBooked,
                };

                if (_.isUndefined(slot)) {
                    const time: VenueBookingTimeSlot = {
                        startTime: ts.startTime,
                        endTime: ts.endTime,
                        days: [],
                    };
                    time.days.push(dayTest);
                    times.push(time);
                } else {
                    slot.days.push(dayTest);
                }
            });
        });

    const sortedTimes = _.orderBy(times, ["startTime"], ["asc"]);
    return sortedTimes;
};

export const VenueView = ({ page }: VenueViewProps) => {
    let { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    let nextWeek = new Date();
    nextWeek.setDate(new Date().getDate() + 7);

    const d: DateRange = {
        open: new Date(),
        close: nextWeek,
    };
    const [dateRange, setDateRange] = React.useState<DateRange>(d);

    const openingDate = dateRange.open.toISOString().slice(0, 10);
    const closingDate = dateRange.close.toISOString().slice(0, 10);

    const venueId: string = id || "";
    const venueQuery = useVenue({ venueId });
    const venueOpeningHoursQuery = useVenueOpeningHours({ venueId });
    const venueSlotsQuery = useVenueSlots({
        venueId: venueId,
        dateFrom: openingDate,
        dateTo: closingDate,
    });

    if (
        venueQuery.isLoading &&
        venueOpeningHoursQuery.isLoading &&
        venueSlotsQuery.isLoading
    ) {
        return <Spinner />;
    }

    if (!venueQuery.data) return null;

    const handleDateChange = (value: Date | null) => {
        if (value !== null) {
            let nd = new Date(value.valueOf());
            nd.setDate(value.getDate() + 7);
            setDateRange({ open: value, close: nd });
        }
    };

    const handleDateBackClick = () => {
        let d = new Date(dateRange.open.valueOf());
        d.setDate(dateRange.open.getDate() - 7);

        let n = new Date(d.valueOf());
        n.setDate(d.getDate() + 7);
        setDateRange({ open: d, close: n });
    };

    const handleDateNextClick = () => {
        let d = new Date(dateRange.open.valueOf());
        d.setDate(dateRange.open.getDate() + 7);

        let n = new Date(d.valueOf());
        n.setDate(d.getDate() + 7);
        setDateRange({ open: d, close: n });
    };

    const renderContactDetailsRow = (field: string, value: string) => {
        return (
            <Box
                sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}
            >
                <Grid item xs={3} md={4}>
                    <Typography>{`${field}:`}</Typography>
                </Grid>
                <Grid item xs={3} md={4}>
                    <Typography>{value}</Typography>
                </Grid>
            </Box>
        );
    };

    const renderOpeningHoursRow = (openingHour: VenueOpeningHour) => {
        const dayOfWeek = openingHour.dayOfWeek.substring(0, 3);
        const time =
            openingHour.open !== ""
                ? `${openingHour.open} - ${openingHour.close}`
                : "CLOSED";
        const field = dayOfWeek === "Mon" ? "Opening Hours: " : "";
        return (
            <Box
                key={dayOfWeek}
                sx={{ display: "flex", flexDirection: "row", marginBottom: 1 }}
            >
                <Grid item xs={3} md={4}>
                    <Typography>{field}</Typography>
                </Grid>
                <Grid item xs={2} md={3}>
                    <Typography>{dayOfWeek}</Typography>
                </Grid>
                <Grid item xs={2} md={3}>
                    <Typography>{time}</Typography>
                </Grid>
            </Box>
        );
    };

    const capitalize = (s: string) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const venueBreadcrumbs = (name: string, page: string) => {
        return [
            <Link
                underline="hover"
                key="1"
                color="inherit"
                onClick={() => navigate(`/${page}`)}
            >
                {capitalize(page)}
            </Link>,
            <Typography key="3" color="text.primary">
                {name}
            </Typography>,
        ];
    };

    const data = venueSlotsQuery.data || [];
    const cols: VenueBookingColumns[] =
        data &&
        data.map((v: VenueBookingSlots) => {
            const day = v.dayOfWeek;
            const date = `${v.matchDate.substring(8)}/${v.matchDate.substring(
                5,
                7
            )}`;
            return {
                day,
                date,
            };
        });

    const test = getTimeSlots(data);
    const openingHours = venueOpeningHoursQuery.data || [];

    const maxDate = new Date();
    maxDate.setMonth(new Date().getMonth() + 1);
    return (
        <>
            <SubHeader title={venueQuery.data.name} />
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ p: 2 }}>
                {venueBreadcrumbs(venueQuery.data.name, page)}
            </Breadcrumbs>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={4} md={7} justifyContent="center">
                    <h2>Available Bookings</h2>
                    <Grid container sx={{ paddingBottom: 2 }}>
                        <Grid item xs={2} md={8}>
                            <Button
                                variant="text"
                                onClick={handleDateBackClick}
                                disabled={dateRange.open <= new Date()}
                            >
                                <ArrowBackIcon />
                            </Button>
                            <Button
                                variant="text"
                                onClick={handleDateNextClick}
                                disabled={dateRange.open >= maxDate}
                            >
                                <ArrowForwardIcon />
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={2}
                            md={4}
                            sx={{ display: "flex", justifyContent: "right" }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Select Date"
                                    disablePast
                                    maxDate={maxDate}
                                    value={dateRange.open}
                                    onChange={(newValue) =>
                                        handleDateChange(newValue)
                                    }
                                    shouldDisableYear={() => true}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    {cols &&
                                        cols.map((c) => {
                                            return (
                                                <TableCell
                                                    key={c.day}
                                                    align="center"
                                                >
                                                    {`${c.day.substring(
                                                        0,
                                                        3
                                                    )} ${c.date}`}
                                                </TableCell>
                                            );
                                        })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {test.map((t: VenueBookingTimeSlot) => (
                                    <TableRow
                                        key={`${t.startTime} - ${t.endTime}`}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            sx={{
                                                minWidth: "100px",
                                            }}
                                        >
                                            {`${t.startTime} - ${t.endTime}`}
                                        </TableCell>
                                        {cols.map((d) => {
                                            const day = _.find(t.days, {
                                                dayOfWeek: d.day,
                                            });

                                            return (
                                                <TableCell
                                                    key={d.day}
                                                    align="center"
                                                >
                                                    {!_.isUndefined(day) &&
                                                        !day.isBooked && (
                                                            <Link>Book</Link>
                                                        )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={4} md={5}>
                    <h2>Contact Us</h2>
                    <Box
                        sx={{
                            border: 2,
                            borderColor: theme.palette.secondary.light,
                            borderRadius: 5,
                            p: 2,
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {renderContactDetailsRow(
                            "Address",
                            venueQuery.data.address
                        )}
                        {renderContactDetailsRow("City", venueQuery.data.city)}
                        {renderContactDetailsRow(
                            "Postcode",
                            venueQuery.data.postcode
                        )}
                        {renderContactDetailsRow(
                            "Phone No",
                            venueQuery.data.phoneNo
                        )}
                        {renderContactDetailsRow(
                            "Email",
                            venueQuery.data.email
                        )}
                        {openingHours.map((o) => {
                            return renderOpeningHoursRow(o);
                        })}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default VenueView;
