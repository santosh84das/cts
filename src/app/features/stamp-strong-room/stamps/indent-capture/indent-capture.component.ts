import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { AddStampIndent, GetStampIndents } from 'src/app/core/models/stamp';
import { StampIndentService } from 'src/app/core/services/stamp/stamp-indent.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';

enum Status {
  "FORWARDED TO SUPERINTENDENT" = 10,
  "FORWARDED TO TREASURY OFFICER" = 11,
  "REJECTED BY TREASURY OFFICER" = 12,
  "APPROVED BY TREASURY OFFICER" = 13,
  "APPROVED BY SUPERINTENDENT" = 15,
  "REJECTED BY SUPERINTENDENT" = 16
}
@Component({
  selector: 'app-indent-capture',
  templateUrl: './indent-capture.component.html',
  styleUrls: ['./indent-capture.component.scss']
})
export class IndentCaptureComponent implements OnInit {

  CombinationTypeList: any[] = [];
  displayInsertModal?: boolean;
  stampIndentForm!: FormGroup
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetStampIndents>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  stampIndentPayload!: AddStampIndent
  constructor(
    private stampIndentService: StampIndentService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) { }

  @Output() StampCombinationSelected = new EventEmitter<string>();
  
  ngOnInit(): void {
    // this.initializeForm()
    this.tableActionButton = [
      {
        buttonIdentifier: 'dedetails',
        class: 'p-button-info p-button-sm',
        icon: 'pi pi-info-circle',
        lable: 'Details',
      },
    ];

    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };

    this.getAllStampIndents();
  }

  initializeForm(): void {
    this.stampIndentForm = this.fb.group({
      // description: ['', Validators.required],
      // stampCategory1: ['', Validators.required]
    });
  }



  getAllStampIndents() {
    this.stampIndentService
      .getAllStampIndents(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          // console.log(response.result);

          response.result.data.map((item: any) => {
            item.createdAt = convertDate(item.createdAt);
            item.status = Status[item.status]
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

  showInsertDialog() {
    this.displayInsertModal = true;
  }


  addStampIndent() {
    if (this.stampIndentForm.valid) {
      // this.stampIndentPayload = {

      // };
      console.log(this.stampIndentPayload);

      this.stampIndentService.addNewStampIndent(this.stampIndentPayload).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showAlert(response.message, 1);
          this.displayInsertModal = false;
          this.getAllStampIndents();
        } else {
          this.toastService.showAlert(response.message, response.apiResponseStatus);
        }
      });
    } else {
      this.toastService.showAlert('Please fill all the required fields', 0);
    }
  }

  handleButtonClick($event: any) {
    this.stampIndentService.deleteStampIndent($event.rowData.stampCategoryId)
      .subscribe((response) => {
        response.apiResponseStatus == 1 ? this.getAllStampIndents() : this.toastService.showAlert(
          response.message,
          response.apiResponseStatus
        );
      });
  }

  onStampCombinationSelected($event: any) {    
    console.log($event);
    
  }
  
}
