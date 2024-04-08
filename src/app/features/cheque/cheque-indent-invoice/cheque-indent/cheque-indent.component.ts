import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { bankDetails } from 'src/app/core/models/bank';
import { BankService } from 'src/app/core/services/Bank/bank.service';
import { ToastService } from 'src/app/core/services/toast.service';
interface Chequetype {
  name: string;
  code: Number;
}

@Component({
  selector: 'app-cheque-indent',
  templateUrl: './cheque-indent.component.html',
  styleUrls: ['./cheque-indent.component.scss']
})
export class ChequeIndentComponent implements OnInit {
  [x: string]: any;

  cheques!: Chequetype[];
  indentForm!: FormGroup;
  lastindex!: number;
  displayModal: boolean | undefined;
  toastservice: any;
  bankList: [] = [];
  branchlist: any[] = [];
  selectedBank: any;
  selectedBranch: any;
  bankDetails!: bankDetails|undefined;
  selectedIndex!:number;

  constructor(private _fb: FormBuilder, private bankServices: BankService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.cheques = [
      { name: 'Treasury Cheque', code: 1 },
      { name: 'Others', code: 2 },
    ];
    this.indentForm = this._fb.group({
      chequelist: this._fb.array([this.createCheque()])
    });
    this.getBanklist()
  }

  get chequelist(): FormArray {
    return this.indentForm.get('chequelist') as FormArray;
  }

  createCheque(): FormGroup {
    return this._fb.group({
      cheques_type: [''],
      micr_code: [''],
      quantity: ['']
    });
  }


  addCheque() {
    this.chequelist.push(this.createCheque());
    console.log(this.chequelist.value);
  }
  removeCheque(index: number) {
    this.chequelist.removeAt(index);
  }

  showBankDetails(index:number) {
    this.displayModal = true;
    this.selectedIndex=index;
  }

  getBanklist() {
    this.bankServices.getBankList().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.bankList = response.result
      } else {
        this.toastService.showAlert(
          response.message,
          response.apiResponseStatus
        )
      }
    })
  }
  getBranchList() {
    this.bankServices.getBankBranches(this.selectedBank.code).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.branchlist = response.result
      } else {
        this.toastService.showAlert(
          response.message,
          response.apiResponseStatus
        )
      }
    })
  }
  setMicrCodeInputField(micrCode:string|undefined){
    const group = this.chequelist.at(this.selectedIndex) as FormGroup;
    group.patchValue({ micr_code: micrCode });
    this.displayModal = false;
    this.selectedBank = 0;
    this.selectedBranch = 0;
    this.bankDetails = undefined;
  }
  getBranchDeatils() {
    if (this.selectedBank) {
      this.bankServices.getBranchDetail(this.selectedBranch.code).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.bankDetails = response.result
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          )
        }
      })
    }

  }

}
