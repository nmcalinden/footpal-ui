import { useQuery } from "react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { AuthUser } from "@/features/profile/types";

export const getUser = async (): Promise<AuthUser> => {
    return await axios.get("/me");
};

type QueryFnType = typeof getUser;

export const useUser = () => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ["authUser"],
        queryFn: () => getUser(),
    });
};
