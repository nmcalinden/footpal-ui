import { Box, Grid, Typography } from "@mui/material";
import { Search } from "@/components/Search";

export const Home = () => {
    
    return (
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
                    <h1 data-testid={"home-title"}>Footpal</h1>
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
                    <Typography textAlign="center" variant="h6" sx={{ m: 2 }}>
                        Find a Pitch
                    </Typography>
                    <Search />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Home;
