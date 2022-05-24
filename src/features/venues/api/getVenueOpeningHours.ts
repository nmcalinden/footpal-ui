import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { VenueOpeningHour } from "../types";

export const getVenueOpeningHours = ({
    venueId,
}: {
    venueId: string;
}): Promise<VenueOpeningHour[]> => {
    return axios.get(`/venues/${venueId}/hours`);
};

type QueryFnType = typeof getVenueOpeningHours;

type UseVenueOpeningHourOptions = {
    venueId: string;
    config?: QueryConfig<QueryFnType>;
};

export const useVenueOpeningHours = ({ venueId, config }: UseVenueOpeningHourOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["venue-hours", venueId],
        queryFn: () => getVenueOpeningHours({ venueId }),
    });
};
