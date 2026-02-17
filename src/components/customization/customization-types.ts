// Shared TypeScript types for customization components

export type UserData = {
    id: string | number;
    email: string;
    first_name: string;
    last_name: string;
};

export type CustomizationDataItem = {
    title: string;
    value: string;
};

export type Measurements = {
    roomName: string;
    width: number;
    height: number;
};

export type ColorOption = {
    id: string;
    name: string;
    color: string;
};

export type ProductOption = {
    id: number;
    title: string;
    description: string;
    values: { label: string; image: string }[];
};

export type FabricColorMapping = {
    [key: string]: { id: string; value: string }[];
};
