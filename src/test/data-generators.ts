import { faker } from "@faker-js/faker";

type Overrides = Record<string, any>;

export const userGenerator = (overrides?: Overrides) => ({
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    roles: ["player", "venueAdmin", "everyone"],
    ...overrides,
});
