interface FilterProto {
    [key: string]: string | string[];
}

export interface Filter extends FilterProto {
    name: string;
    value: string[];
}
