export type Venue = {
    id: number;
    name: string;
    address: string;
    postcode: string;
    city: string;
    phoneNo: string;
    email: string;
    pitches: VenuePitch[];
};

export type VenuePitch = {
    id: number;
    name: string;
    href: string;
};

export type VenueOpeningHour = {
    dayOfWeek: string;
    open: string;
    close: string;
};

export type Pitch = {
    id: number;
    venueId: number;
    name: string;
    maxPlayers: number;
    cost: number;
};

export type Timeslot = {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
};

export type PitchTimeslot = {
    pitch: Pitch;
    timeSlot: Timeslot;
};
