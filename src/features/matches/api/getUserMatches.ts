import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { Match } from "@/features/matches/types";

export const retrieveUserMatches = async (): Promise<Match[]> => {
    return await axios.get("/matches");
};

type QueryFnType = typeof retrieveUserMatches;

type UseMatchesOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useMatches = ({ config }: UseMatchesOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["my-matches"],
        queryFn: () => retrieveUserMatches(),
    });
};
