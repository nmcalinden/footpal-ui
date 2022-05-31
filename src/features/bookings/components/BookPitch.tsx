import {
    Box,
    Breadcrumbs,
    FormControl,
    FormControlLabel,
    Grid,
    Link,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import SubHeader from "@/components/Header/SubHeader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useVenue } from "@/features/venues/api/getVenue";
import { Spinner } from "@/components/Elements";
import VenueBookingGrid from "@/features/venues/components/VenueBookingGrid";
import React from "react";
import { usePitchesByTimeslots } from "@/features/venues/api/getPitchByTimeslot";
import _ from "lodash";

interface BookPitchProps {
    page: string;
}

export const BookPitch = ({ page }: BookPitchProps) => {
    let { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const matchDateParam = searchParams.get("matchDate");
    const slots = searchParams.get("slots");
    const pitchTimeslotIds = slots?.split(",") || [];
    const venueId: string = id || "";

    const [matchDate, setMatchDate] = React.useState<Date>(new Date());
    const [noOfWeeks, setNoOfWeeks] = React.useState("1");
    const [selectedSquad, setSelectedSquad] = React.useState("");

    React.useEffect(() => {
        if (matchDateParam) {
            const [y, m, d] = matchDateParam.split("-");
            const year = Number(y);
            const month = Number(m);
            const day = Number(d);

            setMatchDate(new Date(year, month - 1, day));
        }
    }, [matchDateParam]);

    const venueQuery = useVenue({ venueId });
    const pitchesQuery = usePitchesByTimeslots({ venueId, pitchTimeslotIds });

    const capitalize = (s: string) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const getPitchRadioDefault = () => {
        if (pitchesQuery && pitchesQuery[0].data) {
            return pitchesQuery[0].data.id;
        }
        return null;
    };

    const handleNoOfWeeksChange = (event: SelectChangeEvent) => {
        setNoOfWeeks(event.target.value);
    };

    const handleSelectedSquadChange = (event: SelectChangeEvent) => {
        setSelectedSquad(event.target.value);
    };

    const bookingBreadcrumbs = (
        page: string,
        venue: string,
        venueId: number,
        name: string
    ) => {
        return [
            <Link
                underline="hover"
                key="1"
                color="inherit"
                onClick={() => navigate(`/${page}`)}
            >
                {capitalize(page)}
            </Link>,
            <Link
                underline="hover"
                key="1"
                color="inherit"
                onClick={() => navigate(`/${page}/${venueId}`)}
            >
                {venue}
            </Link>,
            <Typography key="3" color="text.primary">
                {name}
            </Typography>,
        ];
    };

    if (venueQuery.isLoading) {
        return <Spinner />;
    }

    if (!venueQuery.data || !matchDateParam) return null;
    return (
        <>
            <SubHeader title={"Book Pitch"} />
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ p: 2 }}>
                {bookingBreadcrumbs(
                    page,
                    venueQuery.data.name,
                    venueQuery.data.id,
                    "Order"
                )}
            </Breadcrumbs>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={4} md={6} justifyContent="center">
                    <Grid container sx={{ paddingBottom: 2 }}>
                        <Grid item xs={2} md={8}>
                            <FormControl>
                                <h2> Select Pitch</h2>
                                <RadioGroup
                                    aria-labelledby="pitch-radio-buttons-group"
                                    defaultValue={getPitchRadioDefault()}
                                    name="radio-buttons-group"
                                >
                                    {pitchesQuery &&
                                        pitchesQuery.map((p) => {
                                            if (_.isUndefined(p.data)) {
                                                return null;
                                            }

                                            const label = `${p.data.name} (Max ${p.data.maxPlayers} players) - £${p.data.cost}`;
                                            return (
                                                <FormControlLabel
                                                    value={p.data.id}
                                                    control={<Radio />}
                                                    label={label}
                                                />
                                            );
                                        })}
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ marginTop: 5 }}>
                                <h2>Complete Booking</h2>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingBottom: 2,
                                    }}
                                >
                                    <Typography sx={{ paddingRight: 5 }}>
                                        {"Booking Type: "}
                                    </Typography>
                                    <RadioGroup
                                        row
                                        aria-labelledby="pitch-radio-buttons-group"
                                        defaultValue="single"
                                        name="radio-buttons-group"
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
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingBottom: 2,
                                    }}
                                >
                                    <Typography sx={{ paddingRight: 5 }}>
                                        {"No of Weeks: "}
                                    </Typography>

                                    <FormControl>
                                        <Select
                                            labelId="select-venue-label"
                                            id="select-venue-label"
                                            value={noOfWeeks}
                                            onChange={handleNoOfWeeksChange}
                                            sx={{ minWidth: "250px" }}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingBottom: 2,
                                    }}
                                >
                                    <Typography sx={{ paddingRight: 5 }}>
                                        {"Payment Type: "}
                                    </Typography>
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
                                            value={"card"}
                                            control={<Radio />}
                                            label={"Card"}
                                        />
                                    </RadioGroup>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingBottom: 2,
                                    }}
                                >
                                    <Typography sx={{ paddingRight: 5 }}>
                                        {"Match Type: "}
                                    </Typography>
                                    <RadioGroup
                                        row
                                        aria-labelledby="pitch-radio-buttons-group"
                                        defaultValue="public"
                                        name="radio-buttons-group"
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
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingBottom: 2,
                                    }}
                                >
                                    <Typography sx={{ paddingRight: 5 }}>
                                        {"Squad: "}
                                    </Typography>

                                    <FormControl>
                                        <Select
                                            disabled
                                            labelId="select-venue-label"
                                            id="select-venue-label"
                                            value={selectedSquad}
                                            onChange={handleSelectedSquadChange}
                                            sx={{ minWidth: "250px" }}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={4}
                    md={6}
                    sx={{
                        borderLeft: 1,
                        borderBottom: 1,
                        borderColor: "divider",
                        paddingBottom: 5,
                    }}
                >
                    <h2>Change Slot</h2>
                    <VenueBookingGrid
                        venueId={venueQuery.data.id}
                        isPitchBookView
                        openDate={matchDate}
                    />
                </Grid>
                <Grid item xs={4} md={6} />
                <Grid item xs={4} md={6}>
                    <Box sx={{ height: 300 }}>
                        {/* <h2>Order Details</h2> */}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default BookPitch;
