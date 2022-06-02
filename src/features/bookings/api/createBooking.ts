import { useMutation } from "react-query";
import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { BookingId } from "../types";

export type CreateBookingDTO = {
    data: {
        venueId: number;
        pitchTimeSlotId: number;
        matchDate: string;
        matchType: string;
        payment: string;
        noOfWeeks: number;
        squadId?: number;
    };
};

export const createBooking = ({
    data,
}: CreateBookingDTO): Promise<BookingId> => {
    return axios.post("/bookings", data);
};

type UseCreateBookingOptions = {
    config?: MutationConfig<typeof createBooking>;
};

export const useCreateBooking = ({ config }: UseCreateBookingOptions = {}) => {
    return useMutation({
        onMutate: async (newBooking) => {
            await queryClient.cancelQueries("bookings");

            const previousBookings =
                queryClient.getQueryData<BookingId[]>("bookings");

            queryClient.setQueryData("bookings", [
                ...(previousBookings || []),
                newBooking.data,
            ]);

            return { previousBookings };
        },
        onError: (_, __, context: any) => {
            if (context?.previousBookings) {
                queryClient.setQueryData("bookings", context.previousBookings);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries("bookings");
        },
        ...config,
        mutationFn: createBooking,
    });
};
