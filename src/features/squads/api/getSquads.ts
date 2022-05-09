import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { Squads } from "@/features/squads/types";

export const retrieveSquads = async (): Promise<Squads[]> => {
    return await axios.get("/squads");
};

type QueryFnType = typeof retrieveSquads;

type UseCommentsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useSquads = ({ config }: UseCommentsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["squads"],
        queryFn: () => retrieveSquads(),
    });
};
