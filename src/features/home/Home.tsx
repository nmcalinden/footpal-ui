import { Box, Grid, Typography } from "@mui/material";
import { Search } from "@/components/Search";

export const Home = () => {
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
                <Typography
                    variant="h4"
                    textAlign="center"
                    sx={{
                        bgcolor: "default",
                        display: "flex",
                        height: 60,
                        justifyContent: "center",
                        width: "100%",
                    }}
                    data-testid={"home-title"}
                >
                    Footpal
                </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Box
                    sx={{
                        bgcolor: "default",
                        display: "flex",
                        flexDirection: { xs: "column", md: "column" },
                        marginTop: { xs: 2, md: 5 },
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
                        sx={{ paddingTop: 2 }}
                    >
                        Find a Pitch
                    </Typography>
                    <Search />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Home;
