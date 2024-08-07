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
import { SubCategoryDetalis } from 'src/app/core/models/sub-category-detalis';
import { SubCategoryDetailsService } from 'src/app/core/services/subCategoryDetails/sub-category-details.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

    expandedRows: expandedRows = {};
    displayInsertModal: boolean = false;
    SubForm!: FormGroup;
    tableQueryParameters!: DynamicTableQueryParameters | any;
    tableActionButton: ActionButtonConfig[] = [];
    tableChildActionButton: ActionButtonConfig[] = [];
    tableData: any;
    modalData: SubCategoryDetalis[] = [];
    count: number = 0;
    isTableDataLoading: boolean = false;
    treasuryReceiptId!: string;
    manaualPpoPayload!: SubCategoryDetalis;
    selectedRowData: SubCategoryDetalis | null = null;
    selectedRow: any;
    SubOption: SelectItem[] = [];
    type: SelectItem[] = [];
    selectedDrop: SelectItem = { value: '' };
    rowData: any;

    constructor(
        private datePipe: DatePipe,
        private toastService: ToastService,
        private SubCategoryDetalisService: SubCategoryDetailsService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {}

    @Output() Sub_Category_Details = new EventEmitter<any>();

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit(): void {
        this.initializeForm();


        this.tableQueryParameters = {
            pageSize: 10000,
            pageIndex: 0,
        };

        this.getData();
    }

    showInsertDialog() {
        this.displayInsertModal = true;
        this.SubForm.reset();
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
        this.SubForm = this.fb.group({
            SubCategoryName: ['', Validators.required],
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
    add_Sub_category() {
        if (this.SubForm.valid) {
            const formData = this.SubForm.value;
            this.SubCategoryDetalisService.add_new_Sub_details(
                formData
            ).subscribe(
                (response) => {
                    if (response.apiResponseStatus === 1) {
                        console.log('Form submitted successfully:', response);
                        this.displayInsertModal = false; // Close the dialog
                        this.toastService.showSuccess(
                            'Sub Category Details added successfully'
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
                'This already exsists.'
            );
            this.SubForm.get('PCID')?.setErrors({ duplicate: true });
        } else {
            this.toastService.showError(
                response.message ||
                    'An unexpected error occurred. Please try again.'
            );
        }
    }

    resetForm() {
        this.SubForm.reset();
    }

    getData() {
        const data = this.tableQueryParameters;
        this.isTableDataLoading = true;
        this.SubCategoryDetalisService.get_all_Sub_details(
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

    onRowEditInit(data: SubCategoryDetalis) {
        this.selectedRowData = { ...data };
        this.SubForm.patchValue(this.selectedRowData);
        this.displayInsertModal = true;
    }

    onRowEditCancel() {
        this.selectedRowData = null;
        this.resetForm();
    }

    emitSubCategory(): void {
        this.Sub_Category_Details.emit(this.SubForm.value);
    }

    cancelSubCategory() {
        this.SubForm.reset();
        this.displayInsertModal = false;
    }
}