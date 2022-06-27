import { Box, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        height: "10%",
        padding: 10,
        borderBottom: 1,
        borderColor: "divider",
        borderRadius: 5,
        color: theme.palette.text.primary,
    },
}));

interface SubHeaderProps {
    title: string;
}

const SubHeader = ({ title }: SubHeaderProps) => {
    const styles = useStyles();

    return (
        <Grid item xs={12} md={12}>
            <Box className={styles.title}>
                <h1>{title}</h1>
            </Box>
        </Grid>
    );
};

export default SubHeader;
