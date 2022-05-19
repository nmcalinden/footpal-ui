import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { Venue } from "../types";

export const getVenue = ({ venueId }: { venueId: string }): Promise<Venue> => {
    return axios.get(`/venues/${venueId}`);
};

type QueryFnType = typeof getVenue;

type UseVenueOptions = {
    venueId: string;
    config?: QueryConfig<QueryFnType>;
};

export const useVenue = ({ venueId, config }: UseVenueOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["venue", venueId],
        queryFn: () => getVenue({ venueId }),
    });
};
