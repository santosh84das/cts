export interface DynamicList<T> {
    listHeaders: ListHeader[];
    data: T[];
}

export interface ListHeader {
    name: string;
    dataType: string;
    fieldName: string;
    isSortable: boolean;
    isFilterable: boolean;
}

export interface FilterParameter {
    field: string;
    value: string;
    operator: string;
}

export interface DynamicListQueryParameters {
    listType: string;
    pageSize: number;
    pageIndex: number;
    filterParameters: FilterParameter[];
}