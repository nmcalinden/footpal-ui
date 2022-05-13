import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { Squad } from "@/features/squads/types";

export const retrieveSquads = async (): Promise<Squad[]> => {
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
