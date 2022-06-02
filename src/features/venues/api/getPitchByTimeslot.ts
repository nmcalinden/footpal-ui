import { useQueries } from "react-query";
import { axios } from "@/lib/axios";
import { PitchTimeslot } from "../types";

export const getPitchByTimeSlot = ({
    venueId,
    pitchTimeslotId,
}: {
    venueId: string;
    pitchTimeslotId: string;
}): Promise<PitchTimeslot> => {
    return axios.get(`/venues/${venueId}/timeslots/${pitchTimeslotId}/pitch`);
};

type UseVenueBookingSlotsOptions = {
    venueId: string;
    pitchTimeslotIds: string[];
};

export const usePitchesByTimeslots = ({
    venueId,
    pitchTimeslotIds,
}: UseVenueBookingSlotsOptions) => {
    return useQueries(
        pitchTimeslotIds.map((p) => {
            return {
                queryKey: ["pitch", p],
                queryFn: () =>
                    getPitchByTimeSlot({ venueId, pitchTimeslotId: p }),
            };
        })
    );
};
