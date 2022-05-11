import { useMutation } from "react-query";
import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { AuthUser } from "@/features/profile/types";

export type UpdatePlayerDTO = {
    data: {
        nickname: string;
        phoneNo: string;
        city: string;
        postcode: string;
    };
    id: number;
};

export const updatePlayer = ({ data }: UpdatePlayerDTO): Promise<AuthUser> => {
    return axios.put("/players", data);
};

type UseUpdatePlayerOptions = {
    config?: MutationConfig<typeof updatePlayer>;
};

export const useUpdatePlayer = ({ config }: UseUpdatePlayerOptions = {}) => {
    return useMutation({
        onSuccess: (data) => {
            queryClient.refetchQueries(["authUser", data.name]);
        },
        ...config,
        mutationFn: updatePlayer,
    });
};
