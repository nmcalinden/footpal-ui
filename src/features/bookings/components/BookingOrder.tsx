import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { PitchTimeslot, Venue } from "@/features/venues/types";
import { Squad } from "@/features/squads";
import React from "react";
import { useCreateBooking } from "../api/createBooking";
import BookingConfirmationDialog from "./BookingConfirmationDialog";

interface BookingOrderProps {
    venue: Venue;
    squad?: Squad;
    pitchTimeslot?: PitchTimeslot;
    noOfWeeks: string;
    matchType: string;
    matchDate: string;
    paymentType: string;
}

export const BookingOrderModal = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #5F7161",
    boxShadow: 24,
    p: 4,
    display: "flex",
};

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
    const [openModal, setOpenModal] = React.useState(false);
    const [bookingId, setBookingId] = React.useState(0);

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
        setOpenModal(true);
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
        await createBookingMutation
            .mutateAsync({ data: req })
            .then((res) => setBookingId(res.id))
            .catch((err) => console.log("Error: ", err));
    };

    const renderOrderDetailsRow = (
        field1: string,
        value1: string,
        field2: string,
        value2: string
    ) => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "row" },
                    marginBottom: 2,
                }}
            >
                <Grid item xs={6} md={2}>
                    <Typography>{`${field1}:`}</Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                    <Typography>{value1}</Typography>
                </Grid>
                <Grid item xs={0} md={2} />
                <Grid item xs={6} md={2}>
                    <Typography>{`${field2}:`}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
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
            <BookingConfirmationDialog
                bookingId={bookingId}
                open={openModal}
                setOpen={setOpenModal}
                isSubmitLoading={createBookingMutation.isLoading}
            />
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
                <Grid item xs={12} md={12} sx={{ marginTop: 3 }}>
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
                        disabled={createBookingMutation.isSuccess}
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
