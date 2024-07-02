import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { GetStampCombinations } from 'src/app/core/models/stamp';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';
import { StampCombinationService } from 'src/app/core/services/stamp/stamp-combination.service';
@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.scss']
})
export class CombinationComponent implements OnInit {

  stampCategory!: string;
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetStampCombinations>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  combinationEntryForm!: FormGroup
  combinationEntryPayload: any
  modal: boolean = false

  constructor(
    private stampCombinationService: StampCombinationService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.tableActionButton = [
      {
        buttonIdentifier: 'delete',
        class: 'p-button-danger p-button-sm',
        icon: 'pi pi-trash',
        lable: 'Delete',
      },
    ];

    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };

    this.getAllStampCombination();
  }


initializeForm() {
  this.combinationEntryForm = this.fb.group({
    category: [null, [Validators.required, this.exactLengthValidator(2)]],
    denomination: [null, [Validators.required, this.greaterThanZeroValidator()]],
    labelPerSheet: [null, [Validators.required, this.greaterThanZeroValidator()]]
  });
}

exactLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value.length !== length) {
      return { exactLength: { requiredLength: length, actualLength: value.length } };
    }
    return null;
  };
}

greaterThanZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && value !== undefined && value <= 0) {
      return { greaterThanZero: true };
    }
    return null;
  };
}
  getAllStampCombination() {
    console.log(this.tableQueryParameters);

    this.stampCombinationService
      .getStampCombinationList(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          response.result.data.map((item: any) => {
            item.isActive = item.isActive ? "Yes" : "No";
            item.createdAt && (item.createdAt = convertDate(item.createdAt));
          });
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }

  handleButtonClick($event: any) {
    this.stampCombinationService.deleteStampCombination($event.rowData.stampCategoryId)
      .subscribe((response) => {
        response.apiResponseStatus == 1 ? this.getAllStampCombination() : this.toastService.showAlert(
          response.message,
          response.apiResponseStatus
        );
      });
  }

  displayInsertModal() {
    this.modal = true
  }

  addcombination() {

  }

  onStampCategorySelected($event: any) {
    this.stampCategory = $event;
  }

}
