import * as React from "react";
import {
    Box,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography,
    SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SearchBarWrapper } from "./styled";

const Home = () => {
    const [age, setAge] = React.useState("");
    const [value, setValue] = React.useState<Date | null>(new Date());

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const handleDateChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={10} md={12}>
                    <Box
                        sx={{
                            bgcolor: "default",
                            display: "flex",
                            height: 60,
                            p: 2,
                            justifyContent: "center",
                        }}
                    >
                        <h1>Footpal</h1>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "default",
                            display: "flex",
                            flexDirection: "column",
                            p: 2,
                            marginTop: 5,
                            marginLeft: 10,
                            marginRight: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 8,
                        }}
                    >
                        <Typography
                            textAlign="center"
                            variant="h6"
                            sx={{ m: 2 }}
                        >
                            Find a Pitch
                        </Typography>
                        <SearchBarWrapper id="searchbar">
                            <FormControl
                                sx={{
                                    m: 1,
                                    minWidth: 180,
                                }}
                            >
                                <InputLabel id="demo-simple-select-helper-label">
                                    City
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
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
                                <InputLabel id="demo-simple-select-helper-label">
                                    Venue
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
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
                                <InputLabel id="demo-simple-select-helper-label">
                                    Max Players
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
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
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </SearchBarWrapper>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ marginTop: 1 }}
                            endIcon={<SearchIcon />}
                        >
                            Search
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
