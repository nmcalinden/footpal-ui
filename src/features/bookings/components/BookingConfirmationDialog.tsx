import { Spinner } from "@/components/Elements";
import { useUser } from "@/features/profile/api/getUser";
import { useTheme } from "@material-ui/core/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BookingConfirmationProps {
    bookingId: number;
    open: boolean;
    isSubmitLoading: boolean;
    setOpen: (open: boolean) => void;
}

export const BookingConfirmationDialog = ({
    bookingId,
    open,
    isSubmitLoading,
    setOpen,
}: BookingConfirmationProps) => {
    const { data, isLoading } = useUser();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setOpen(false);
        navigate("/profile", { replace: true });
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">Booking Confirmation</DialogTitle>
            <DialogContent>
                {isLoading || isSubmitLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <p>Status: Confirmed</p>

                        <p>Booking Ref: #{bookingId}</p>
                        <p>
                            A confirmation email will be sent to: {data?.email}
                        </p>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleCloseModal}
                    sx={{
                        bgcolor: `${theme.palette.primary.main}`,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.light,
                        },
                    }}
                >
                    My Profile
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookingConfirmationDialog;
