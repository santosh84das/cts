import { HttpErrorResponse } from '@angular/common/http';
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    ActionButtonConfig,
    DynamicTable,
    DynamicTableQueryParameters,
    TableHeader,
} from 'mh-prime-dynamic-table';

import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';
import { DatePipe } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { PrimaryCategoryDetails } from 'src/app/core/models/primary-category-details';
import { PrimaryCategoryDetailsService } from 'src/app/core/services/primaryCategoryDetails/primary-category-details.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-primary',
    templateUrl: './primary.component.html',
    styleUrls: ['./primary.component.scss'],
})
export class PrimaryComponent {
    expandedRows: expandedRows = {};
    displayInsertModal: boolean = false;
    primaryForm!: FormGroup;
    tableQueryParameters!: DynamicTableQueryParameters | any;
    tableActionButton: ActionButtonConfig[] = [];
    tableChildActionButton: ActionButtonConfig[] = [];
    tableData: any;
    modalData: PrimaryCategoryDetails[] = [];
    count: number = 0;
    isTableDataLoading: boolean = false;
    treasuryReceiptId!: string;
    manaualPpoPayload!: PrimaryCategoryDetails;
    selectedRowData: PrimaryCategoryDetails | null = null;
    selectedRow: any;
    PrimaryOption: SelectItem[] = [];
    type: SelectItem[] = [];
    selectedDrop: SelectItem = { value: '' };
    rowData: any;

    constructor(
        private datePipe: DatePipe,
        private toastService: ToastService,
        private PrimaryCategoryDetailsService: PrimaryCategoryDetailsService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {}

    @Output() Primary_Category_Details = new EventEmitter<any>();

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit(): void {
        this.initializeForm();


        this.tableQueryParameters = {
            pageSize: 10,
            pageIndex: 0,
        };
        const sd = {
            data: [
                {
                    id: 1,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    primaryCategoryName: 'College( Government) Pension',
                    dataSource: null,
                },
                {
                    id: 4,
                    hoaId: '2071 - 01 - 109 - 00 - 001 - V - 04 - 00',
                    primaryCategoryName: 'Education Pension',
                    dataSource: null,
                },
                {
                    id: 43,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    primaryCategoryName: 'State Pension',
                    dataSource: null,
                },
                {
                    id: 2,
                    hoaId: '2071 - 01 - 109 - 00 - 001 - V - 04 - 00',
                    primaryCategoryName: 'Defence Pension',
                    dataSource: null,
                },
                {
                    id: 13,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    primaryCategoryName: 'sasasasas',
                    dataSource: null,
                },
                {
                    id: 14,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    primaryCategoryName: 'afghjkhkljfvc',
                    dataSource: null,
                },
                {
                    id: 15,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    primaryCategoryName: 'sumit',
                    dataSource: null,
                },
                {
                    id: 28,
                    hoaId: '2071 - 01 - 109 - 00 - 001 - V - 04 - 12',
                    primaryCategoryName: 'shruti',
                    dataSource: null,
                },

                {
                    id: 29,
                    hoaId: '2071 - 01 - 109 - 00 - 001 - V - 04 - 60',
                    primaryCategoryName: 'amit',
                    dataSource: null,
                },
            ],
            dataCount: 8,
            headers: [
                {
                    name: 'Primary Category ID',
                    dataType: 'text',
                    fieldName: 'id',
                    filterField: 'id',
                    filterEnums: null,
                    isFilterable: true,
                    isSortable: true,
                    objectTypeValueField: null,
                },
                {
                    name: 'Head of Account',
                    dataType: 'text',
                    fieldName: 'hoaId',
                    filterField: 'hoaId',
                    filterEnums: null,
                    isFilterable: true,
                    isSortable: true,
                    objectTypeValueField: null,
                },
                {
                    name: 'Primary Category Name',
                    dataType: 'text',
                    fieldName: 'primaryCategoryName',
                    filterField: 'primaryCategoryName',
                    filterEnums: null,
                    isFilterable: true,
                    isSortable: true,

                    objectTypeValueField: null,
                },
            ],
        };

        // this.tableData = sd;
        this.getData();
    }

    showInsertDialog() {
        this.displayInsertModal = true;
        this.primaryForm.reset();
    }


    handleRowSelection($event: any) {
        console.log('Row selected:', $event);
    }

    handQueryParameterChange(event: any) {
        console.log('Query parameter changed:', event);
        this.tableQueryParameters = {
            pageSize: event.pageSize,
            pageIndex: event.pageIndex,
            filterParameters: event.filterParameters || [],
            sortParameters: event.sortParameters,
        };
        console.log(this.tableQueryParameters.pageSize);

    }

    handsearchKeyChange(event: string): void {
        console.log('Search key changed:', event);
        this.tableQueryParameters.filterParameters = [
            { field: 'searchKey', value: event },
        ];
    }

    initializeForm(): void {
        this.primaryForm = this.fb.group({
            HoaId: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        /^\d{4} - \d{2} - \d{3} - \d{2} - \d{3} - [A-Z] - \d{2} - \d{2}$/
                    ),
                ],
            ],
            PrimaryCategoryName: ['', Validators.required],
        });
    }

    clear(table: any) {
        table.clear();
    }

    onGlobalFilter(dt: any, event: any): void {
        if (event && event.target) {
            const input = event.target as HTMLInputElement;
            dt.filterGlobal(input.value, 'contains');
        }
    }

    // Add Manual PPO Receipt
    add_primary_category() {
        if (this.primaryForm.valid) {
            const formData = this.primaryForm.value;
            this.PrimaryCategoryDetailsService.add_new_primary_details(
                formData
            ).subscribe(
                (response) => {
                    if (response.apiResponseStatus === 1) {
                        // Assuming 1 means success
                        console.log('Form submitted successfully:', response);

                        this.displayInsertModal = false; // Close the dialog
                        this.toastService.showSuccess(
                            'Primary Category Details added successfully'
                        );
                    } else {
                        this.handleErrorResponse(response);
                    }
                    this.getData();
                },
                (error) => {
                    console.error('Error submitting form:', error);
                    this.handleErrorResponse(error.error);
                }
            );
        } else {
            console.log('Form is not valid. Cannot submit.');
            this.toastService.showError(
                'Please fill all required fields correctly.'
            );
        }
    }

    private handleErrorResponse(response: any) {
        if (
            response.message &&
            response.message.includes(
                'duplicate key value violates unique constraint'
            )
        ) {
            this.toastService.showError(
                'This PPO number already exists. Please use a different PPO number.'
            );
            this.primaryForm.get('PCID')?.setErrors({ duplicate: true });
        } else {
            this.toastService.showError(
                response.message ||
                    'An unexpected error occurred. Please try again.'
            );
        }
    }

    resetForm() {
        this.primaryForm.reset();
    }


    getData() {
        const data = this.tableQueryParameters;
        this.isTableDataLoading = true;
        this.PrimaryCategoryDetailsService.get_all_primary_details(
            data
        ).subscribe(
            (response: any) => {

                this.tableData = response.result;
                // this.tableData = sd;

                this.isTableDataLoading = false;
                console.log(this.tableData);
            },
            (error) => {
                this.isTableDataLoading = false;
                console.error('API Error:', error);
                this.toastService.showAlert(
                    'An error occurred while fetching data',
                    0
                );
            }
        );
    }


    onRowEditCancel() {
        this.selectedRowData = null;
        this.resetForm();
    }

    emitPrimaryCategory(): void {
        this.Primary_Category_Details.emit(this.primaryForm.value);
    }

    cancelPrimaryCategory() {
        this.primaryForm.reset();
        this.displayInsertModal = false;
    }
}
