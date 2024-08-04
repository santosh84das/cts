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

        this.tableActionButton = [
            {
                buttonIdentifier: 'edit',
                class: 'p-button-rounded p-button-raised',
                icon: 'pi pi-pencil',
                lable: 'Edit',
            },
        ];
        this.tableQueryParameters = {
            pageSize: 10,
            pageIndex: 0,
        };
        const sd = {
            data: [
                {
                    id: 1,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    SubCategoryName: 'College( Government) Pension',
                    dataSource: null,
                },
                {
                    id: 4,
                    hoaId: '2071 - 01 - 109 - 00 - 001 - V - 04 - 00',
                    SubCategoryName: 'Education Pension',
                    dataSource: null,
                },
                {
                    id: 43,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    SubCategoryName: 'State Pension',
                    dataSource: null,
                },
                {
                    id: 2,
                    hoaId: '2071 - 01 - 109 - 00 - 001 - V - 04 - 00',
                    SubCategoryName: 'Defence Pension',
                    dataSource: null,
                },
                {
                    id: 13,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    SubCategoryName: 'sasasasas',
                    dataSource: null,
                },
                {
                    id: 14,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    SubCategoryName: 'afghjkhkljfvc',
                    dataSource: null,
                },
                {
                    id: 15,
                    hoaId: '2071 - 01 - 101 - 00 - 005 - V - 04 - 00',
                    SubCategoryName: 'sumit',
                    dataSource: null,
                },
                {
                    id: 28,
                    hoaId: '2071 - 01 - 109 - 00 - 001 - V - 04 - 12',
                    SubCategoryName: 'shruti',
                    dataSource: null,
                },

                {
                    id: 29,
                    hoaId: '2071 - 01 - 109 - 00 - 001 - V - 04 - 60',
                    SubCategoryName: 'amit',
                    dataSource: null,
                },
            ],
            dataCount: 8,
            headers: [
                {
                    name: 'Sub Category ID',
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
                    name: 'Sub Category Name',
                    dataType: 'text',
                    fieldName: 'SubCategoryName',
                    filterField: 'SubCategoryName',
                    filterEnums: null,
                    isFilterable: true,
                    isSortable: true,

                    objectTypeValueField: null,
                },
            ],
        };

        this.tableData = sd;
        // this.getData();
    }

    showInsertDialog() {
        this.displayInsertModal = true;
        this.SubForm.reset();
    }

    handleButtonClick($event: any) {
        console.log('Button clicked:', $event);

        if ($event.buttonIdentifier === 'edit') {
            this.EditInit($event.rowData);
        }
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

        this.get_all_Sub_details(this.tableQueryParameters);
    }

    handsearchKeyChange(event: string): void {
        console.log('Search key changed:', event);
        this.tableQueryParameters.filterParameters = [
            { field: 'searchKey', value: event },
        ];
        this.get_all_Sub_details(this.tableQueryParameters, event);
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
                        // Assuming 1 means success
                        console.log('Form submitted successfully:', response);
                        this.get_all_Sub_details(
                            this.tableQueryParameters
                        );
                        this.displayInsertModal = false; // Close the dialog
                        this.toastService.showSuccess(
                            'Sub Category Details added successfully'
                        );
                    } else {
                        this.handleErrorResponse(response);
                    }
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

    // Get Manual PPO Receipt By Id
    get_all_Sub_details_by_HoaId(treasuryReceiptNo: string) {
        console.log('Fetching Manual PPO Receipt By Id...');
        this.SubCategoryDetalisService.GetAllSubDetailsByHoaId(
            treasuryReceiptNo
        ).subscribe((response) => {
            console.log('API Response:', response);
            if (response.apiResponseStatus === 1) {
                this.tableData = response.result;
            } else {
                this.toastService.showAlert(
                    response.message,
                    response.apiResponseStatus
                );
            }
        });
    }

    //  w i search
    get_all_Sub_details(
        tableQueryParameters: DynamicTableQueryParameters,
        treasuryReceiptNo?: string
    ) {
        this.isTableDataLoading = true;
        if (treasuryReceiptNo) {
            this.SubCategoryDetalisService.GetAllSubDetailsByHoaId(
                treasuryReceiptNo
            ).subscribe(
                (response: any) => {
                    this.isTableDataLoading = false;
                    if (response && response.apiResponseStatus === 1) {
                        const updatedData = [response.result].map(
                            (item: any) => ({
                                ...item,
                                receiptDate: convertDate(item.receiptDate),
                            })
                        );
                        this.tableData = {
                            headers: this.tableData.headers,
                            data: updatedData,
                            dataCount: updatedData.length,
                        };
                    } else {
                        this.toastService.showAlert(
                            response?.message || 'An error occurred',
                            response?.apiResponseStatus || 0
                        );
                    }
                    this.cd.detectChanges();
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
        } else {
            console.log('tableQueryParameters: ' + tableQueryParameters);
            this.SubCategoryDetalisService.get_all_Sub_details(
                tableQueryParameters
            ).subscribe(
                (response: any) => {
                    this.isTableDataLoading = false;
                    if (
                        response &&
                        response.apiResponseStatus === 1 &&
                        response.result
                    ) {
                        const updatedData = response.result.data.map(
                            (item: any) => ({
                                ...item,
                                receiptDate: convertDate(item.receiptDate),
                            })
                        );
                        this.tableData = {
                            ...response.result,
                            data: updatedData,
                        };
                    } else {
                        this.toastService.showAlert(
                            response?.message || 'An error occurred',
                            response?.apiResponseStatus || 0
                        );
                    }
                    this.cd.detectChanges();
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

    EditInit(rowData: any): void {
        console.log('EditInit called with rowData:', rowData);
        this.selectedRow = rowData;
        var treasuryReceiptId: string = this.selectedRow.treasuryReceiptNo;
        console.log('Treasury Receipt ID:', treasuryReceiptId);

        this.SubCategoryDetalisService.GetAllSubDetailsByHoaId(
            treasuryReceiptId
        ).subscribe({
            next: (response) => {
                console.log('Fetched DTO:', response);
                this.SubForm.patchValue({
                    SubCategoryName: response.result.SubCategoryName,
                });
                console.log('Form Values:', this.SubForm.value);
                this.displayInsertModal = true;
            },
            error: (err) => {
                this.toastService.showError(
                    'Failed to fetch PPO receipt details.'
                );
            },
        });
    }

    // Update Manual PPO Receipt
    update_Sub_category(selectedRow: any) {
        console.log('Selected Row:', this.selectedRow);
        console.log('Form Data:', this.SubForm.value);
        if (this.selectedRow && this.SubForm.valid) {
            const formData = this.SubForm.value;
            const updateDto: SubCategoryDetalis = {
                SubCategoryName: formData.SubCategoryName,
            };
            this.SubCategoryDetalisService.updateSubCategoryDetails(
                this.selectedRow.treasuryReceiptNo,
                updateDto
            ).subscribe(
                (response) => {
                    console.log('Update successful:', response);
                    this.get_all_Sub_details(this.tableQueryParameters); // Refresh table data
                    this.resetForm(); // Reset form fields
                    this.displayInsertModal = false; // Close the dialog
                },
                (error) => {
                    console.log(
                        'Treasury Receipt ID: ' +
                            this.selectedRow.treasuryReceiptNo
                    );
                    if (
                        error instanceof HttpErrorResponse &&
                        error.status === 400
                    ) {
                        console.error('Error updating data:', error);
                        const errorMessage = error.error.message;
                        this.toastService.showError(errorMessage);
                    } else {
                        console.error('Error updating data:', error);
                        this.toastService.showError(
                            'An unexpected error occurred. Please try again.'
                        );
                    }
                }
            );
        } else {
            console.log('Form is not valid. Cannot update.');
        }
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
