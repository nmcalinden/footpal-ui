import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import { Venue } from "../types";

type VenueBoxProps = {
    data: Venue;
};
const VenueBox = ({ data }: VenueBoxProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                border: 2,
                borderColor: theme.palette.secondary.light,
                borderRadius: 5,
                p: 2,
                textAlign: "center",
                minHeight: 100,
                maxHeight: 100,
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
            >
                View
            </Button>
        </Box>
    );
};

export default VenueBox;
