import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { SelectItem } from 'primeng/api';
import { Status } from 'src/app/core/enum/stampIndentStatusEnum';
import { AddStampIndent, GetStampIndents } from 'src/app/core/models/stamp';
import { StampIndentService } from 'src/app/core/services/stamp/stamp-indent.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';


interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-family-nominee',
  templateUrl: './family-nominee.component.html',
  styleUrls: ['./family-nominee.component.scss']
})
export class FamilyNomineeComponent implements OnInit {
  displayInsertModal: boolean = false;
  tableQueryParameters: DynamicTableQueryParameters = {
    pageSize: 10,
    pageIndex: 0,
    filterParameters: [], 
    sortParameters: { field: '', order: '' } 
  };
  tableActionButton: ActionButtonConfig[] = [];
  tableData: DynamicTable<GetStampIndents> | undefined;
  modalData: any[] = []; 
  displayInsertModel: boolean = false;
  nomineeDetailsForm: FormGroup = new FormGroup({});
  familyNomineeForm: FormGroup = new FormGroup({});
  expandedRows: expandedRows = {};
  modelData: any[] = []; 
  relationship: SelectItem[]=[];
  relation: SelectItem[]=[];
  nomineeType: SelectItem[]=[];
  share: SelectItem[]=[];
  priorityLevel: SelectItem[]=[];
  valRadio: string = '';

  constructor(
    private toastService: ToastService,
    private stampIndentService: StampIndentService,
    private fb: FormBuilder
  ) { }

  @Output() StampCombinationSelected = new EventEmitter<any>();

  ngOnInit(): void {
    this.initializeForm();
    this.getAllStampIndents();
    this.relationship = [
      {label: 'Son', value: {id: '1', name: 'Son', code: 'S'}},
      {label: 'Daughter', value: {id: '2', name: 'Daughter', code: 'D'}},
      {label: 'Brother', value: {id: '3', name: 'Brother', code: 'B'}},
      {label: 'Sister', value: {id: '4', name: 'Sister', code: 'S'}},
    ],
    this.relation = [
      {label: 'Son', value: {id: '1', name: 'Son', code: 'S'}},
      {label: 'Daughter', value: {id: '2', name: 'Daughter', code: 'D'}},
      {label: 'Brother', value: {id: '3', name: 'Brother', code: 'B'}},
      {label: 'Sister', value: {id: '4', name: 'Sister', code: 'S'}},
    ],
    this.nomineeType = [
      {label: 'Son', value: {id: '1', name: 'Son', code: 'S'}},
      {label: 'Daughter', value: {id: '2', name: 'Daughter', code: 'D'}},
      {label: 'Brother', value: {id: '3', name: 'Brother', code: 'B'}},
      {label: 'Sister', value: {id: '4', name: 'Sister', code: 'S'}},
    ],
    this.share = [
      {label: 'Son', value: {id: '1', name: 'Son', code: 'S'}},
      {label: 'Daughter', value: {id: '2', name: 'Daughter', code: 'D'}},
      {label: 'Brother', value: {id: '3', name: 'Brother', code: 'B'}},
      {label: 'Sister', value: {id: '4', name: 'Sister', code: 'S'}},
    ],
    this.priorityLevel = [
      {label: 'High', value: {id: '1', name: 'High', code: 'H'}},
      {label: 'Medium', value: {id: '2', name: 'Medium', code: 'M'}},
      {label: 'Low', value: {id: '3', name: 'Low', code: 'L'}},
    ]
  }

  showInsertDialog() {
    this.displayInsertModal = true;
  }

  handleButtonClick($event: any): void {
    if ($event && $event.buttonType === 'customButton') {
      console.log('Custom button clicked!');
    } else {
      console.log('Unhandled button click event');
      this.modalData = [this.familyNomineeForm.value];
       
    }
  }

  initializeForm(): void {
    this.familyNomineeForm = this.fb.group({
          slNo: ['', Validators.required],  
          dependentName: ['', Validators.required],
          relationship: ['', Validators.required],
          dateOfBirthFamilyDetails: ['', Validators.required],
          dateOfDeath: ['', Validators.required],
          identificationMark: ['', Validators.required],
          handicap: ['', Validators.required],
        });
  }

  addStampIndent() {
    this.displayInsertModal = false;
    this.modalData = [this.familyNomineeForm.value];  
    console.log(this.modalData.length);
  }

  getAllStampIndents() {
    this.stampIndentService.getAllStampIndents(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus === 1) {
          response.result.data.forEach((item: GetStampIndents) => {
            item.createdAt = convertDate(item.createdAt);
            item.memoDate = convertDate(item.memoDate);
            item.status = Status[item.status as keyof typeof Status].toString();
          });
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(response.message, response.apiResponseStatus);
        }
      });
  }
  //  


  

  // @Output() StampCombinationSelected = new EventEmitter<any>();

  // ngOnInit(): void {
  //   
  // }

  // showInsertFamilyDialog() {
  //   this.displayInsertModal = true;
  // }

  // showInsertNomineeDialog() {
  //   this.displayInsertModel = true;
  // }

  // handleButtonClick($event: any) { 
  //   this.modalData = [this.familyNomineeForm.value];
  //   this.modelData = [this.nomineeDetailsForm.value];
  // }

  // initializeFamilyForm(): void {
  //   this.familyNomineeForm = this.fb.group({
  //     slNo: ['', Validators.required],  
  //     dependentName: ['', Validators.required],
  //     relationship: ['', Validators.required],
  //     dateOfBirthFamilyDetails: ['', Validators.required],
  //     dateOfDeath: ['', Validators.required],
  //     identificationMark: ['', Validators.required],
  //     handicap: ['', Validators.required],
  //   });
  // }

  // initializeNomineeForm(): void {
  //   this.nomineeDetailsForm = this.fb.group({
  //     sl: ['', Validators.required],  
  //     nomineeName: ['', Validators.required],
  //     relation: ['', Validators.required],
  //     dateOfBirth: ['', Validators.required],
  //     accountNo: ['', Validators.required],
  //     ifscCode: ['', Validators.required],
  //     bankBranch: ['', Validators.required],
  //     nomineeType: ['', Validators.required],
  //     priorityLevel: ['', Validators.required],
  //     share: ['', Validators.required],
  //     activeFlag: ['', Validators.required],
  //   });
  // }

  // addData() {
  //   this.displayInsertModal = false;
  //   this.modalData = [this.familyNomineeForm.value];  
  //   this.modelData = [this.nomineeDetailsForm.value];
  // }


}
