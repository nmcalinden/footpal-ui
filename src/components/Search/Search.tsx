import {
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import {
    SearchBarButton,
    SearchBarFormComponent,
    SearchBarWrapper,
} from "./styled";
import SearchIcon from "@mui/icons-material/Search";

export const Search = () => {
    const theme = useTheme();

    const [city, setCity] = React.useState("");
    const [venue, setVenue] = React.useState("");
    const [maxPlayers, setMaxPlayers] = React.useState("");

    const [value, setValue] = React.useState<Date | null>(new Date());

    const handleCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value);
    };

    const handleVenueChange = (event: SelectChangeEvent) => {
        setVenue(event.target.value);
    };

    const handleMaxPlayers = (event: SelectChangeEvent) => {
        setMaxPlayers(event.target.value);
    };

    const handleDateChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    const maxDate = new Date();
    maxDate.setMonth(new Date().getMonth() + 1);
    return (
        <>
            <SearchBarWrapper id="searchbar">
                <SearchBarFormComponent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            maxDate={maxDate}
                            value={value}
                            onChange={handleDateChange}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </SearchBarFormComponent>
                <SearchBarFormComponent>
                    <InputLabel id="city-label-header" aria-label="city">
                        City
                    </InputLabel>
                    <Select
                        labelId="select-city-label"
                        id="select-city-label"
                        value={city}
                        label="City-Select"
                        onChange={handleCityChange}
                    >
                        <MenuItem value={1}>Belfast</MenuItem>
                    </Select>
                </SearchBarFormComponent>
                <SearchBarFormComponent>
                    <InputLabel id="venue-label-header" aria-label="venue">
                        Venue
                    </InputLabel>
                    <Select
                        disabled
                        labelId="select-venue-label"
                        id="select-venue-label"
                        value={venue}
                        label="Venue"
                        onChange={handleVenueChange}
                    >
                        <MenuItem value={1}>Venue A</MenuItem>
                        <MenuItem value={2}>Venue B</MenuItem>
                    </Select>
                </SearchBarFormComponent>
                <SearchBarFormComponent>
                    <InputLabel
                        id="max-players-label-header"
                        aria-label="max players"
                    >
                        Max Players
                    </InputLabel>
                    <Select
                        disabled
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={maxPlayers}
                        label="Max Players"
                        onChange={handleMaxPlayers}
                    >
                        <MenuItem value={1}>5</MenuItem>
                        <MenuItem value={2}>10</MenuItem>
                        <MenuItem value={3}>12</MenuItem>
                    </Select>
                </SearchBarFormComponent>
            </SearchBarWrapper>
            <SearchBarButton
                variant="contained"
                sx={{
                    bgcolor: `${theme.palette.primary.main}`,
                    "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    minHeight: { xs: 50, md: 30 },
                }}
                endIcon={<SearchIcon />}
            >
                Search
            </SearchBarButton>
        </>
    );
};
