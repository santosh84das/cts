import { HttpClient } from '@angular/common/http';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Type,
} from '@angular/core';
import { log } from 'console';
import {
    DynamicList,
    DynamicListQueryParameters,
    FilterEnum,
    FilterParameter,
    IActionButtonConfig,
    IactionButtonEvent,
    ListHeader,
    SortParameter,
} from 'src/app/core/models/dynamic-table';
import { IapiResponce } from 'src/app/core/models/iapi-responce';
import { tokenDetails } from 'src/app/core/models/token';
import { ToastService } from 'src/app/core/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent<T> implements OnInit {
    @Input()
    dataURL: string = '';
    @Input()
    listType: string = '';
    @Input()
    actionButtons: IActionButtonConfig[] = [];
    /**
     * none
     * single 
     * multiple
     */
    @Input()
    rowSelectionMode:string='none';

    @Output()
    rowSelect = new EventEmitter<any>();
    @Output()
    actionButtonClicked = new EventEmitter<any>();

    tableData: DynamicList<T> | any;
    filterParams: FilterParameter[] = [];
    selectedRows: any;
    sortParams: SortParameter | any;
    sortOrder: number | any;
    pageSize: number = 10;
    pageIndex: number = 0;
    sortField: string | any;
    headerLength: number = 0;
    constructor(private http: HttpClient, private toastservice: ToastService) {}

    ngOnInit(): void {
        this.getData();
    }
    //[Event]==================================================================
    emitButtonClickEvent(data: any, buttonType: string) {
        const data1: IactionButtonEvent = {
            buttonIdentifier: buttonType,
            rowData: data,
        };
        this.actionButtonClicked.emit(data1);
    }
    emitRowSelectEvent() {
        if(this.rowSelectionMode==='single'){
            const parentIdToLastIndex = new Map<number, number>();
            for (let i = this.selectedRows.length - 1; i >= 0; i--) {
                const item = this.selectedRows[i];
                if (!parentIdToLastIndex.has(item.parentId)) {
                    parentIdToLastIndex.set(item.parentId, i);
                }
            }
            
            for (let i = this.selectedRows.length - 1; i >= 0; i--) {
                const item = this.selectedRows[i];
                const lastIndex = parentIdToLastIndex.get(item.parentId);
                if (i !== lastIndex) {
                    this.selectedRows.splice(i, 1);
                }
            }
        }
        this.rowSelect.emit(this.selectedRows);
    }
    //[Event END]==============================================================

    //[Filter]=================================================================
    onFilter(event: any) {
        const originalObject = event.filters;
        const convertedFilters: FilterParameter[] = [];
        // Store previously processed filters to avoid duplicates
        const processedFilters = new Set<string>();
        for (const key in originalObject) {
            const filterObject = originalObject[key][0];

            // Check if value has changed and filter hasn't been processed
            const filterKey = `${key}-${filterObject.value}`;
            if (
                filterObject.value !== null &&
                !processedFilters.has(filterKey)
            ) {
                processedFilters.add(filterKey);
                convertedFilters.push({
                    field: this.getFilterField(key,this.tableData.listHeaders),
                    value: filterObject.value.toString(),
                    operator: filterObject.matchMode,
                });
            }
        }

        // Update filterParams only if there are changes
        if (
            JSON.stringify(this.filterParams) !==
            JSON.stringify(convertedFilters)
        ) {
            this.filterParams = convertedFilters;
            this.getData();
        }
    }
    //[Filter END]=============================================================

    //[Sorting]================================================================
    onSortChange(event: any) {
        const incomingShortParameter: SortParameter = {
            field: event.field,
            order: event.order === 1 ? 'ASC' : 'DESC',
        };
        if (
            JSON.stringify(this.sortParams) !=
            JSON.stringify(incomingShortParameter)
        ) {
            this.sortParams = incomingShortParameter;
            this.getData();
        }
    }
    //[Sorting END]============================================================
    //[Pagination]=============================================================
    onPageChange($event: any) {
        if (this.pageSize != $event.rows || this.pageIndex != $event.page) {
            this.pageIndex = $event.page;
            this.pageSize = $event.rows;
            this.getData();
        }
    }
    //[Pagination END]=========================================================

    //[API Call]===============================================================
    getData() {
        const queryParameters: DynamicListQueryParameters = {
            listType: this.listType,
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
            filterParameters: this.filterParams,
            sortParameters: this.sortParams,
        };
        this.http
            .post<IapiResponce<DynamicList<T>>>(this.dataURL, queryParameters)
            .subscribe((response) => {
                if (response.apiResponseStatus == 1) {
                    this.tableData = response.result;
                    console.log(this.tableData);
                    return;
                }
                this.toastservice.showError(response.message);
            });
    }
    //[API Call END]===========================================================

    //[Helper functions]=======================================================
    lowercaseFirstLetter(input: string): string {
        const [firstLetter, ...rest] = input;
        return `${firstLetter.toLowerCase()}${rest.join('')}`;
    }
    uppercaseFirstLetter(input: string): string {
        const [firstLetter, ...rest] = input;
        return `${firstLetter.toLocaleUpperCase()}${rest.join('')}`;
    }
    getFilterField(fieldName: string, objects: ListHeader[]): string{
        const foundObject = objects.find(obj => obj.fieldName === fieldName);
        return foundObject ? foundObject.filterField : "";
    }
    getEnumStyle(enumValue: number, objects: FilterEnum[]): string{
        const foundObject = objects.find(obj => obj.value === enumValue);
        return foundObject ? foundObject.styleClass : "";
    }
    //[Helper functions END]===================================================
}
