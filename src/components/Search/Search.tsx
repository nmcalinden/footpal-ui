import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { SearchBarWrapper } from "./styled";

export const Search = () => {
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
    return (
        <SearchBarWrapper id="searchbar">
            <FormControl
                sx={{
                    m: 1,
                    minWidth: 180,
                }}
            >
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
                    <MenuItem value={2}>Lurgan</MenuItem>
                    <MenuItem value={3}>Newry</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                sx={{
                    m: 1,
                    minWidth: 180,
                }}
            >
                <InputLabel id="venue-label-header" aria-label="venue">
                    Venue
                </InputLabel>
                <Select
                    labelId="select-venue-label"
                    id="select-venue-label"
                    value={venue}
                    label="Venue"
                    onChange={handleVenueChange}
                >
                    <MenuItem value={1}>Venue A</MenuItem>
                    <MenuItem value={2}>Venue B</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                sx={{
                    marginLeft: 1,
                    marginRight: 2,
                    minWidth: 180,
                }}
            >
                <InputLabel
                    id="max-players-label-header"
                    aria-label="max players"
                >
                    Max Players
                </InputLabel>
                <Select
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
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </SearchBarWrapper>
    );
};
