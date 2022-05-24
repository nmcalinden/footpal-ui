import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { VenueBookingSlots } from "../types";

export const getVenueBookingSlots = ({
    venueId,
    dateFrom,
    dateTo,
}: {
    venueId: string;
    dateFrom: string;
    dateTo: string;
}): Promise<VenueBookingSlots[]> => {
    return axios.get(
        `/venues/${venueId}/timeslots?from=${dateFrom}&to=${dateTo}`
    );
};

type QueryFnType = typeof getVenueBookingSlots;

type UseVenueBookingSlotsOptions = {
    venueId: string;
    dateFrom: string;
    dateTo: string;
    config?: QueryConfig<QueryFnType>;
};

export const useVenueSlots = ({
    venueId,
    dateFrom,
    dateTo,
    config,
}: UseVenueBookingSlotsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["venue-slots", venueId, dateFrom, dateTo],
        queryFn: () => getVenueBookingSlots({ venueId, dateFrom, dateTo }),
    });
};
