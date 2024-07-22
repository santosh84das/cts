import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewChequeEntry } from 'src/app/core/models/cheque';
import {
    ActionButtonConfig,
    DynamicTable,
    DynamicTableQueryParameters,
} from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { ChequeEntryService } from 'src/app/core/services/cheque/cheque-entry.service';
import { MasterService } from 'src/app/core/services/master/master.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-cheque-entry',
    templateUrl: './cheque-entry.component.html',
    styleUrls: ['./cheque-entry.component.scss'],
})
export class ChequeEntryComponent implements OnInit {

    displayModal: boolean | undefined;
    chequeEntryFrm!: FormGroup;
    tableData!: DynamicTable<tokenDetails>;
    tableQueryParameters!: DynamicTableQueryParameters | any;
    newChequeEntryModel!: NewChequeEntry;
    tableActionButton: ActionButtonConfig[] = [];
    treasuryList: any[] = [];
    selectedMicrCodeValue!: number
    selectedmicrCode!: string;
    selectedTreasury!: string;
    constructor(
        private fb: FormBuilder,
        private chequeEntryService: ChequeEntryService,
        private toastService: ToastService,
        private masterService: MasterService
    ) { }

    ngOnInit(): void {
        this.tableActionButton = [
            {
                buttonIdentifier: 'edit',
                class: 'p-button-warning p-button-sm',
                icon: 'pi pi-file-edit',
                lable: 'Edit',
            },
        ];
        this.tableQueryParameters = {
            pageSize: 10,
            pageIndex: 0,
        };
        this.allCheques();
        this.chequeEntryFrm = this.fb.group({
            series: ['', Validators.required],
            start: ['', Validators.required],
            end: ['', [Validators.required, this.validateEnd]],
        });
        this.allTreasuryList();
    }
    allCheques() {
        this.chequeEntryService
            .getCheques(this.tableQueryParameters)
            .subscribe((response) => {
                if (response.apiResponseStatus == 1) {
                    this.tableData = response.result;
                } else {
                    this.toastService.showAlert(
                        response.message,
                        response.apiResponseStatus
                    );
                }
            });
    }
    addCheque() {

        if (this.chequeEntryFrm.valid) {
            this.newChequeEntryModel = {
                series: this.chequeEntryFrm.get('series')?.value,
                start: this.chequeEntryFrm.get('start')?.value,
                end: this.chequeEntryFrm.get('end')?.value,
                treasurieCode: this.selectedTreasury,
                micrCode: this.selectedmicrCode
            };
            console.log(this.newChequeEntryModel);

            this.chequeEntryService
                .insertNewChequeEntry(this.newChequeEntryModel)
                .subscribe((response) => {
                    if (response.apiResponseStatus == 1) {
                        this.toastService.showAlert(
                            response.message,
                            response.apiResponseStatus
                        );
                        this.chequeEntryFrm.reset();
                        this.displayModal = false;
                        this.allCheques();
                    } else {
                        this.toastService.showError(response.message);
                    }
                });
        }
        console.log(this.chequeEntryFrm.valid);

    }

    showDialog() {
        this.displayModal = true;
    }
    validateEnd(control: any) {
        const startValue = control.parent
            ? control.parent.get('start').value
            : null;
        const endValue = control.value;
        return startValue && endValue && endValue <= startValue
            ? { invalidEnd: true }
            : null;
    }

    allTreasuryList() {
        this.masterService.getTreasuries().subscribe((response) => {
            if (response.apiResponseStatus == 1) {
                this.treasuryList = response.result
                console.log(this.treasuryList);

            } else {
                this.toastService.showError(response.message);
            }
        })
    }

    handelInputValueChange($event: string) {
        this.selectedmicrCode = $event;
        console.log('Selected :', this.selectedmicrCode);

    }

    onTreasurySelected($event: string) {
        console.log($event);

        this.selectedTreasury = $event;
        console.log('Selected treasury:', this.selectedTreasury);
    }
}
