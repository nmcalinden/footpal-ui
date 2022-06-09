import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubHeader from "@/components/Header/SubHeader";
import { useParams, useSearchParams } from "react-router-dom";
import { useVenue } from "@/features/venues/api/getVenue";
import { useSquads } from "@/features/squads/api/getSquads";
import { Spinner } from "@/components/Elements";
import VenueBookingGrid from "@/features/venues/components/VenueBookingGrid";
import React from "react";
import { usePitchesByTimeslots } from "@/features/venues/api/getPitchByTimeslot";
import _ from "lodash";
import BookingOrder from "./BookingOrder";
import BookingBreadcrumb from "./BookingBreadcrumb";
import { capitalizeFirstLetter } from "@/utils/format";

interface BookPitchProps {
    page: string;
}

export const BookPitch = ({ page }: BookPitchProps) => {
    let { id } = useParams();
    const [searchParams] = useSearchParams();

    const matchDateParam = searchParams.get("matchDate");
    const slots = searchParams.get("slots");
    const pitchTimeslotIds = slots?.split(",") || [];
    const venueId: string = id || "";

    const [matchDate, setMatchDate] = React.useState<Date>(new Date());
    const [selectedSquad, setSelectedSquad] = React.useState("");
    const [selectedPitch, setSelectedPitch] = React.useState(0);
    const [selectedBooking, setSelectedBooking] = React.useState("single");
    const [selectedNoOfWeeks, setSelectedNoOfWeeks] = React.useState("1");
    const [selectedMatchType, setSelectedMatchType] = React.useState("public");

    const venueQuery = useVenue({ venueId });
    const squadsQuery = useSquads();
    const pitchesQuery = usePitchesByTimeslots({ venueId, pitchTimeslotIds });

    React.useEffect(() => {
        if (matchDateParam) {
            const [y, m, d] = matchDateParam.split("-");
            const year = Number(y);
            const month = Number(m);
            const day = Number(d);

            setMatchDate(new Date(year, month - 1, day));
        }
    }, [matchDateParam]);

    React.useEffect(() => {
        if (pitchesQuery && pitchesQuery[0].data && selectedPitch === 0) {
            setSelectedPitch(pitchesQuery[0].data.pitch.id);
        }
    }, [pitchesQuery, selectedPitch]);

    const handlePitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const typeValue = (event.target as HTMLInputElement).value;
        setSelectedPitch(parseInt(typeValue));
    };

    const handleNoOfWeeksChange = (event: SelectChangeEvent) => {
        setSelectedNoOfWeeks(event.target.value);
    };

    const handleSelectedSquadChange = (event: SelectChangeEvent) => {
        setSelectedSquad(event.target.value);
    };

    const handleBookingTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const typeValue = (event.target as HTMLInputElement).value;
        if (typeValue === "single") {
            setSelectedNoOfWeeks("1");
        }
        setSelectedBooking(typeValue);
    };

    const handleMatchTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const typeValue = (event.target as HTMLInputElement).value;
        if (typeValue === "public") {
            setSelectedSquad("");
        }
        setSelectedMatchType(typeValue);
    };

    const getSelectedPitch = () => {
        const pitch =
            pitchesQuery &&
            pitchesQuery.find((p) => p.data?.pitch.id === selectedPitch);

        return pitch?.data;
    };

    const getSelectedSquad = () => {
        const sq =
            squadsQuery.data &&
            squadsQuery.data.find((s) => s.squadId === parseInt(selectedSquad));

        return sq;
    };

    const renderFormTitle = (title: string) => {
        return (
            <Grid item xs={2} md={4}>
                <Typography>{`${title}: `}</Typography>
            </Grid>
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

    if (venueQuery.isLoading) {
        return <Spinner />;
    }

    if (!venueQuery.data || pitchesQuery.length === 0 || !matchDateParam)
        return null;

    return (
        <>
            <SubHeader title={"Book Pitch"} />
            <BookingBreadcrumb page={page} venue={venueQuery.data} />
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid
                    item
                    xs={4}
                    md={6}
                    justifyContent="center"
                    sx={{ borderRight: 1, borderColor: "divider", p: 2 }}
                >
                    <Grid container sx={{ paddingBottom: 2 }}>
                        <Grid item xs={6} md={12}>
                            <Grid item xs={6} md={12}>
                                {renderSectionTitle("Select Pitch")}
                                {pitchesQuery && (
                                    <RadioGroup
                                        aria-labelledby="pitch-radio-buttons-group"
                                        value={selectedPitch}
                                        name="radio-buttons-group"
                                        onChange={handlePitchChange}
                                    >
                                        {pitchesQuery.map((p) => {
                                            if (_.isUndefined(p.data)) {
                                                return null;
                                            }

                                            const label = `${p.data.pitch.name} (Max ${p.data.pitch.maxPlayers} players) - £${p.data.pitch.cost}`;
                                            return (
                                                <FormControlLabel
                                                    key={p.data.pitch.id}
                                                    value={p.data.pitch.id}
                                                    control={<Radio />}
                                                    label={label}
                                                />
                                            );
                                        })}
                                    </RadioGroup>
                                )}
                            </Grid>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingBottom: 2,
                                    marginTop: 2,
                                }}
                            >
                                {renderFormTitle("Booking")}
                                <Grid item xs={4} md={8}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="pitch-radio-buttons-group"
                                        value={selectedBooking}
                                        name="radio-buttons-group"
                                        onChange={handleBookingTypeChange}
                                    >
                                        <FormControlLabel
                                            value={"single"}
                                            control={<Radio />}
                                            label={"Single"}
                                        />
                                        <FormControlLabel
                                            value={"recurring"}
                                            control={<Radio />}
                                            label={"Recurring"}
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Box>
                            <Box
                                component="form"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingBottom: 2,
                                }}
                            >
                                {renderFormTitle("No of Weeks")}
                                <Grid item xs={4} md={8}>
                                    <Select
                                        disabled={selectedBooking === "single"}
                                        labelId="select-venue-label"
                                        id="select-venue-label"
                                        value={selectedNoOfWeeks}
                                        onChange={handleNoOfWeeksChange}
                                        sx={{ minWidth: "250px" }}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                    </Select>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingBottom: 2,
                                }}
                            >
                                {renderFormTitle("Payment")}
                                <Grid item xs={4} md={8}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="pitch-radio-buttons-group"
                                        defaultValue="cash"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value={"cash"}
                                            control={<Radio />}
                                            label={"Cash"}
                                        />
                                        <FormControlLabel
                                            disabled
                                            value={"card"}
                                            control={<Radio />}
                                            label={"Card"}
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingBottom: 2,
                                }}
                            >
                                {renderFormTitle("Match")}
                                <Grid item xs={4} md={8}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="pitch-radio-buttons-group"
                                        value={selectedMatchType}
                                        name="radio-buttons-group"
                                        onChange={handleMatchTypeChange}
                                    >
                                        <FormControlLabel
                                            value={"public"}
                                            control={<Radio />}
                                            label={"Public"}
                                        />
                                        <FormControlLabel
                                            value={"private"}
                                            control={<Radio />}
                                            label={"Private"}
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Box>
                            <Box
                                component="form"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                {renderFormTitle("Squad")}
                                <Grid item xs={4} md={8}>
                                    <Select
                                        disabled={
                                            selectedMatchType === "public"
                                        }
                                        labelId="select-venue-label"
                                        id="select-venue-label"
                                        value={selectedSquad}
                                        onChange={handleSelectedSquadChange}
                                        sx={{ minWidth: "250px" }}
                                    >
                                        {squadsQuery.data &&
                                            squadsQuery.data.map((s) => {
                                                return (
                                                    <MenuItem
                                                        key={s.squadId}
                                                        value={s.squadId}
                                                    >
                                                        {s.name}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4} md={6}>
                    <Grid container sx={{ paddingBottom: 2 }}>
                        <Grid
                            item
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                paddingBottom: 2,
                            }}
                        >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    {renderSectionTitle("Amend Slot")}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <VenueBookingGrid
                                        venueId={venueQuery.data.id}
                                        isPitchBookView
                                        openDate={matchDate}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={6} md={12}>
                            <BookingOrder
                                venue={venueQuery.data}
                                noOfWeeks={selectedNoOfWeeks}
                                matchType={capitalizeFirstLetter(
                                    selectedMatchType
                                )}
                                matchDate={matchDateParam}
                                paymentType={"Cash"}
                                squad={getSelectedSquad()}
                                pitchTimeslot={getSelectedPitch()}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default BookPitch;
