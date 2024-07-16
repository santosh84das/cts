import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ppodetails',
  templateUrl: './ppodetails.component.html',
  styleUrls: ['./ppodetails.component.scss']
})
export class PpodetailsComponent implements OnInit {

  ppoForm: FormGroup = new FormGroup({});
  religionOptions: SelectItem[];
  subDivOptions: SelectItem[];
  isNextButtonDisabled: boolean = true;
  currentStepIndex: number = 0;
  steps: any[];

  constructor(private fb: FormBuilder, private router: Router) {
    this.ininalizer();

    this.religionOptions = [
      { label: 'Hindu', value: 'hindu' },
      { label: 'Muslim', value: 'muslim' },
      { label: 'Christian', value: 'christian' },
      { label: 'Other', value: 'other' }
    ];

    this.subDivOptions = [
      { label: 'Sub Div 1', value: 'subDiv1' },
      { label: 'Sub Div 2', value: 'subDiv2' },
      { label: 'Sub Div 3', value: 'subDiv3' }
    ];

    this.steps = [
      { label: 'PPO Details' },
      { label: 'Bank Details' },
      { label: 'Other Details' }
    ];
  }

  ngOnInit(): void {}
  
  ininalizer(): void {
    this.ppoForm = this.fb.group({
      transferredPpoNo: [''],
      ePpoSearchDetails: [''],
      pensionerStatus: [''],
      ppoApprovalFlag: [''],
      ppoApproveDate: [''],
      ppoId: [''],
      ppoNo: [''],
      pensionerName: [''],
      subType: [''],
      catDescription: [''],
      commencementDate: [''],
      notionalBasicPension: [''],
      withEffectiveDate: [''],
      reducedPension: [''],
      effectiveDate: [''],
      commutedPension: [''],
      upto: [''],
      familyPension: [''],
      payMode: [''],
      bankBranchName: [''],
      accountNo: [''],
      accountHolder: [''],
      ifscCode: [''],
      religion: [''], 
      firstPensionGenerated: [''],
      panNo: [''],
      mobileNo: [''],
      aadharNo: [''],
      healthScheme: [''],
      gpfTpfNo: [''],
      subDiv: [''], 
      doublePension: [false],
      employedPensioner: [''],
      reEmployed: [''],
      address: [''],
      remarks: [''],
      adhocPension: [false],
      provisionalPension: [false],
      interimAllowance: [false],
      sharedPension: [false],
      valRadio: [''],
      type: [''],
      catSubCatid: [''],
      retirementDate: [''],
      basic: [''],
      dateOfDeath: [''],
      epf: ['']
    });
  }

  

  

  handlePrintData() {
    console.log(this.ppoForm.value);
  }

  
  

  onSearch() {
    if (this.ppoForm.valid) {
      //logic
      console.log('Form Submitted', this.ppoForm.value);
    }
  }

  saveData() {
    console.log('Data Saved', this.ppoForm.value);
  }

  next() {
    this.currentStepIndex++;
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }
}
