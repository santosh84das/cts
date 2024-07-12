export interface basicDynamicTable{
    header: column[];
    data: any[];
}

export interface column{
    name: string;
    key: string;
}

export interface tfoot{
    total: number;
}