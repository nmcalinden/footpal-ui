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
