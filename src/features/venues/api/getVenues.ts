import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { Venue } from "../types";

export const getVenues = (): Promise<Venue[]> => {
    return axios.get("/venues");
};

type QueryFnType = typeof getVenues;

type UseVenuesOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useVenues = ({ config }: UseVenuesOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["venues"],
        queryFn: () => getVenues(),
    });
};
