export interface DynamicList<T> {
    listHeaders: ListHeader[];
    data: T[];
    dataCount:number;
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

export interface SortParameter {
    field: string;
    order:string;
}

export interface DynamicListQueryParameters {
    listType: string;
    pageSize: number;
    pageIndex: number;
    filterParameters: FilterParameter[];
    sortParameters: SortParameter;
}
export interface IActionButtonConfig{
    lable:string,
    icon:string,
    class:string,
    buttonIdentifier:string,
}
export interface IactionButtonEvent{
    rowData:any,
    buttonIdentifier:string
}