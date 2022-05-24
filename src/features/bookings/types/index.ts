export type VenueBookingSlots = {
    matchDate: string;
    dayOfWeek: string;
    timeSlots: VenueTimeSlots[];
};

export type VenueTimeSlots = {
    id: number;
    startTime: string;
    endTime: string;
    isBooked: boolean;
};
