export type UserBooking = {
    id: number;
    status: string;
    matchDate: string;
    startTime: string;
    noOfWeeks: number;
    totalCost: number;
    isPaid: boolean;
    venue: {
        id: number;
        name: string;
    };
    pitch: {
        id: number;
        name: string;
    };
    matches: [
        {
            id: number;
            matchDate: string;
        }
    ];
};

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

export type BookingId = {
    id: number;
};
