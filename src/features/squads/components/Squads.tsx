import SubHeader from "@/components/Header/SubHeader";
import { Grid } from "@mui/material";
import { MySquads } from "@/features/squads/components/MySquads";

const Squads = () => {
    return (
        <>
            <SubHeader title={"Squads"} />
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid
                    item
                    xs={6}
                    md={8}
                    justifyContent="flex-end"
                    sx={{ padding: 3 }}
                >
                    <h2>My Squad(s)</h2>
                    <MySquads />
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={8}
                    justifyContent="flex-end"
                    sx={{ padding: 3 }}
                >
                    <h2>Join Squad</h2>
                    <MySquads />
                </Grid>
            </Grid>
        </>
    );
};

export default Squads;
