/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Link, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useVenueSlots } from "@/features/bookings/api/getAvailableBookings";
import { Spinner } from "@/components/Elements";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { VenueBookingSlots, VenueTimeSlots } from "@/features/bookings/types";
import _ from "lodash";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface VenueBookingGridProps {
    venueId: number;
    isPitchBookView?: boolean;
    openDate?: Date;
}

interface VenueBookingTimeSlot {
    startTime: string;
    endTime: string;
    days: DaySlot[];
}

interface DaySlot {
    pitchTimeSlotId: number[];
    dayOfWeek: string;
    isBooked: boolean;
}

type DateRange = {
    open: Date;
    close: Date;
};

const getTimeSlots = (vBookingSlots: VenueBookingSlots[]) => {
    const times: VenueBookingTimeSlot[] = [];
    vBookingSlots &&
        vBookingSlots.forEach((v: VenueBookingSlots) => {
            v.timeSlots.forEach((ts: VenueTimeSlots) => {
                const slot = _.find(times, {
                    startTime: ts.startTime,
                });

                const dayTest: DaySlot = {
                    pitchTimeSlotId: [ts.id],
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
                    const timeSlot = _.find(slot.days, {
                        dayOfWeek: v.dayOfWeek,
                    });

                    if (_.isUndefined(timeSlot)) {
                        slot.days.push(dayTest);
                    } else if (!ts.isBooked) {
                        timeSlot.pitchTimeSlotId.push(ts.id);
                    }
                }
            });
        });

    const sortedTimes = _.orderBy(times, ["startTime"], ["asc"]);
    return sortedTimes;
};

function isoDateWithoutTimeZone(date: Date) {
    var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
    var correctDate = new Date(timestamp);
    return correctDate.toISOString();
}

export const VenueBookingGrid = ({
    venueId,
    isPitchBookView,
    openDate,
}: VenueBookingGridProps) => {
    const navigate = useNavigate();

    const [dateRange, setDateRange] = React.useState<DateRange>({
        open: new Date(),
        close: new Date(),
    });

    React.useEffect(() => {
        const openD = _.isUndefined(openDate) ? new Date() : openDate;
        let nextWeek = new Date(openD.valueOf());
        nextWeek.setDate(openD.getDate() + 6);
        setDateRange({
            open: openD,
            close: nextWeek,
        });
    }, [openDate]);

    const openingDate = isoDateWithoutTimeZone(dateRange.open).slice(0, 10);
    const closingDate = isoDateWithoutTimeZone(dateRange.close).slice(0, 10);
    const maxDate = new Date();
    maxDate.setMonth(new Date().getMonth() + 1);
    maxDate.setUTCHours(0, 0, 0, 0);

    const venueSlotsQuery = useVenueSlots({
        venueId: venueId,
        dateFrom: openingDate,
        dateTo: closingDate,
    });

    if (venueSlotsQuery.isLoading) {
        return <Spinner />;
    }

    const handleDateChange = (value: Date | null) => {
        if (value !== null) {
            let nd = new Date(value.valueOf());
            nd.setDate(value.getDate() + 6);
            if (nd >= maxDate) {
                nd = new Date(maxDate.valueOf());
            }
            setDateRange({ open: value, close: nd });
        }
    };

    const handleDateBackClick = () => {
        let d = new Date(dateRange.open.valueOf());
        d.setDate(dateRange.open.getDate() - 7);

        if (d < new Date()) {
            d = new Date();
        }

        let n = new Date(d.valueOf());
        n.setDate(d.getDate() + 6);
        setDateRange({ open: d, close: n });
    };

    const handleDateNextClick = () => {
        let d = new Date(dateRange.open.valueOf());
        d.setDate(dateRange.open.getDate() + 6);

        if (d >= maxDate) {
            d = new Date(maxDate.valueOf());
        }
        let n = new Date(d.valueOf());
        n.setDate(d.getDate() + 6);

        if (n >= maxDate) {
            n = new Date(maxDate.valueOf());
        }
        setDateRange({ open: d, close: n });
    };

    const handleBookPitchNav = (pitchSlotIds: number[], matchDate: string) => {
        navigate(
            `/book/${venueId}/pitch?slots=${pitchSlotIds.toString()}&matchDate=${matchDate}`
        );
    };

    const venueSlots = venueSlotsQuery.data || [];
    const timeSlots = getTimeSlots(venueSlots);

    const tableMaxHeight = isPitchBookView ? 250 : 450;

    const dOpen = new Date(dateRange.open.valueOf());
    dOpen.setUTCHours(0, 0, 0, 0);
    const dClose = new Date(dateRange.close.valueOf());
    dClose.setUTCHours(0, 0, 0, 0);
    const isBackDisabled: boolean = dOpen <= new Date();
    const isNextDisabled: boolean = dOpen >= maxDate || dClose >= maxDate;
    return (
        <>
            <Grid container sx={{ paddingBottom: 2 }}>
                <Grid item xs={2} md={8}>
                    <Button
                        variant="text"
                        onClick={handleDateBackClick}
                        disabled={isBackDisabled}
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Button
                        variant="text"
                        onClick={handleDateNextClick}
                        disabled={isNextDisabled}
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
                            onChange={(newValue) => handleDateChange(newValue)}
                            shouldDisableYear={() => true}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <TableContainer
                component={Paper}
                sx={{ maxHeight: tableMaxHeight }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {venueSlots &&
                                venueSlots.map((vs) => {
                                    return (
                                        <TableCell
                                            key={vs.matchDate}
                                            align="center"
                                        >
                                            {`${vs.dayOfWeek.substring(
                                                0,
                                                3
                                            )} ${vs.matchDate.substring(
                                                8
                                            )}/${vs.matchDate.substring(5, 7)}`}
                                        </TableCell>
                                    );
                                })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeSlots.map((t: VenueBookingTimeSlot) => (
                            <TableRow
                                key={`${t.startTime} - ${t.endTime}`}
                                sx={{
                                    "&:last-child td, &:last-child th": {
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
                                {venueSlots.map((vs) => {
                                    const day = _.find(t.days, {
                                        dayOfWeek: vs.dayOfWeek,
                                    });

                                    return (
                                        <TableCell
                                            key={vs.matchDate}
                                            align="center"
                                        >
                                            {!_.isUndefined(day) &&
                                                !day.isBooked && (
                                                    <Link
                                                        component="button"
                                                        onClick={() =>
                                                            handleBookPitchNav(
                                                                day.pitchTimeSlotId,
                                                                vs.matchDate
                                                            )
                                                        }
                                                    >
                                                        Book
                                                    </Link>
                                                )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default VenueBookingGrid;
