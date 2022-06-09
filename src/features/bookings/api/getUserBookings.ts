import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { UserBooking } from "../types";

export const getUserBookings = (): Promise<UserBooking[]> => {
    return axios.get("/bookings");
};

type QueryFnType = typeof getUserBookings;

type UseVenueBookingSlotsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useUserBookings = ({
    config,
}: UseVenueBookingSlotsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["user-bookings"],
        queryFn: () => getUserBookings(),
    });
};
