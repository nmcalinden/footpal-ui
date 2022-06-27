import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import { Venue } from "../types";
import { useNavigate } from "react-router-dom";

type VenueBoxProps = {
    page: string;
    data: Venue;
};
const VenueBox = ({ page, data }: VenueBoxProps) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const openVenue = () => {
        navigate(`/${page}/${data.id}`);
    };

    return (
        <Box
            sx={{
                border: 2,
                borderColor: theme.palette.secondary.light,
                borderRadius: 5,
                p: 2,
                textAlign: "center",
                minHeight: 100,
                maxHeight: 120,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography>{data.name}</Typography>
            <Typography>{data.city}</Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    marginTop: 2,
                    "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                    },
                }}
                onClick={openVenue}
            >
                View
            </Button>
        </Box>
    );
};

export default VenueBox;
