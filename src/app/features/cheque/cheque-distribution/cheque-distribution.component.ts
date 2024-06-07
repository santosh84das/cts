import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ChequeReceive, ChequeReceiveListWithMICR, NewChequeEntry } from 'src/app/core/models/cheque';
import {
  ActionButtonConfig,
  DynamicTable,
  DynamicTableQueryParameters,
} from 'src/app/core/models/dynamic-table';
import { ChequeDistributionService } from 'src/app/core/services/cheque/cheque-distribution.service';


interface Chequetype {
  name: string;
  code: Number;
}
interface micrcode {
  name: string,
  code: string
}

interface users {
  name: string,
  code: string
}
@Component({
  selector: 'app-cheque-distribution',
  templateUrl: './cheque-distribution.component.html',
  styleUrls: ['./cheque-distribution.component.scss']
})
export class ChequeDistributionComponent implements OnInit {
  displayModal: boolean | undefined;
  tableData!: DynamicTable<ChequeReceive>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  tableActionButton: ActionButtonConfig<ChequeReceive>[] = [];

  distributionForm!: FormGroup;
  cheques!: Chequetype[];
  micrCodeList!: micrcode[];
  selectedMicrCode?: string;
  isVisible: boolean = false;
  isVisibleDetails: boolean = false;
  isShowUserList: boolean = false;
  userList: [] = [];
  receivedDetails: ChequeReceiveListWithMICR[] = [];
  selectedUser?: string;
  selectedSeries?: ChequeReceiveListWithMICR;

  constructor(private chequedistributionService: ChequeDistributionService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cheques = [
      { name: 'Treasury Cheque', code: 1 },
      { name: 'Othres', code: 2 }
    ];
    this.tableActionButton = [
      {
        buttonIdentifier: 'cheque_distribute',
        class: '"p-button-raised p-button-rounded',
        icon: 'pi pi-check-circle',
        lable: 'Cheque Distribute',
      },
    ];

    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    this.getTableData();

    this.distributionForm = this.fb.group({
      cheques_type: [''],
      userListDetails: this.fb.array([this.createUserListDetail()]),
    });
    this.getAllUsers();
    this.getAllReceivedList();

  }

  showModal() {
    this.displayModal = true;
  }

  getTableData() {
    this.chequedistributionService.getChqueListForDistribution(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tableData = response.result;
      }
    });
  }

  showUserList() {
    this.isShowUserList = !this.isShowUserList
  }

  getAllUsers() {
    this.chequedistributionService.getUserList().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.userList = response.result;
      }
    })
  }

  getAllReceivedList() {
    this.chequedistributionService.getReceivedList().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.receivedDetails = response.result;
        console.log('---->', this.receivedDetails);

      }
    })
  }

  showDetails() {
    this.isVisibleDetails = true;
  }
 get userListDetailsFormArray(): FormArray{
   return this.distributionForm.get('userListDetails') as FormArray
 }

  createUserListDetail(): FormGroup {
    return this.fb.group({
      user_name: [''],
      start: [''],
      end: [''],
      quantity: ['']
    });
  }

  addUserList() {
    this.userListDetailsFormArray.push(this.createUserListDetail());
  }

  removeUserList(index:number){
    this.userListDetailsFormArray.removeAt(index);
  }
  submitDistributionFrm() {
    console.log(this.distributionForm.value);
  }


}
