import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { PitchTimeslot, Venue } from "@/features/venues/types";
import { Squad } from "@/features/squads";
import React from "react";
import { useCreateBooking } from "../api/createBooking";

interface BookingOrderProps {
    venue: Venue;
    squad?: Squad;
    pitchTimeslot?: PitchTimeslot;
    noOfWeeks: string;
    matchType: string;
    matchDate: string;
    paymentType: string;
}

export const BookingOrder = ({
    venue,
    noOfWeeks,
    matchType,
    paymentType,
    matchDate,
    squad,
    pitchTimeslot,
}: BookingOrderProps) => {
    const createBookingMutation = useCreateBooking();

    const [slot, setSlot] = React.useState("");

    React.useEffect(() => {
        if (
            pitchTimeslot &&
            pitchTimeslot.timeSlot &&
            pitchTimeslot.timeSlot.dayOfWeek
        ) {
            const s = `${pitchTimeslot.timeSlot.dayOfWeek.substring(0, 3)} ${
                pitchTimeslot.timeSlot.startTime
            }`;
            setSlot(s);
        }
    }, [pitchTimeslot]);

    const submitBooking = async () => {
        if (!pitchTimeslot) {
            return;
        }
        const req = {
            venueId: venue.id,
            pitchTimeSlotId: pitchTimeslot.timeSlot.id,
            matchDate: matchDate,
            matchType: matchType,
            payment: paymentType,
            noOfWeeks: parseInt(noOfWeeks),
            squadId: squad?.squadId,
        };
        await createBookingMutation.mutateAsync({ data: req });
    };

    const renderOrderDetailsRow = (
        field1: string,
        value1: string,
        field2: string,
        value2: string
    ) => {
        return (
            <Box
                sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}
            >
                <Grid item xs={2} md={2}>
                    <Typography>{`${field1}:`}</Typography>
                </Grid>
                <Grid item xs={3} md={7}>
                    <Typography>{value1}</Typography>
                </Grid>
                <Grid item xs={1} md={2} />
                <Grid item xs={2} md={2}>
                    <Typography>{`${field2}:`}</Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Typography>{value2}</Typography>
                </Grid>
            </Box>
        );
    };

    const renderSectionTitle = (title: string) => {
        return (
            <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ paddingTop: 2 }}
            >
                {title}
            </Typography>
        );
    };

    const selectedSquad = squad ? squad.name : "N/A";

    const getFormattedMatchDate = () => {
        const matchDateArray = matchDate.split("-");
        return [matchDateArray[2], matchDateArray[1], matchDateArray[0]].join(
            "-"
        );
    };

    if (!pitchTimeslot) {
        return null;
    }

    return (
        <>
            {renderSectionTitle("Order Details")}
            <Box
                sx={{
                    borderColor: "#DCDCDC !important",
                    border: 2,
                    backgroundColor: "#F5F5F5",
                    padding: 2,
                }}
            >
                {renderOrderDetailsRow(
                    "Venue",
                    venue.name,
                    "Date",
                    getFormattedMatchDate()
                )}
                {renderOrderDetailsRow(
                    "Pitch",
                    pitchTimeslot.pitch?.name || "",
                    "Slot",
                    slot
                )}
                {renderOrderDetailsRow(
                    "Address",
                    `${venue.address}, ${venue.city}, ${venue.postcode}`,
                    "Payment",
                    paymentType
                )}
                {renderOrderDetailsRow(
                    "Weeks",
                    noOfWeeks,
                    "Cost",
                    `£${pitchTimeslot.pitch?.cost}`
                )}
                {renderOrderDetailsRow(
                    "Match",
                    matchType,
                    "Squad",
                    selectedSquad
                )}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        paddingRight: 2,
                        paddingTop: 2,
                        marginBottom: 2,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                    >{`Total Cost: £${pitchTimeslot.pitch?.cost}`}</Typography>
                </Box>
                <Grid item xs={6} md={12} sx={{ marginTop: 3 }}>
                    <Typography>
                        {
                            "Please review order details before booking. Once reviewed, click 'Book' to process order."
                        }
                    </Typography>
                </Grid>
                <Stack
                    direction="row"
                    spacing={4}
                    justifyContent="center"
                    sx={{
                        marginTop: 2,
                        paddingBottom: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={submitBooking}
                        sx={{
                            width: "50ch",
                        }}
                    >
                        Book
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default BookingOrder;
