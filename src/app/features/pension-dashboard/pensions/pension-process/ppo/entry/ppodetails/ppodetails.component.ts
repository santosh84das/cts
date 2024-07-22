import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ppoSanctionForm!: FormGroup;
  genders: SelectItem[]=[];
  

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
      { label: 'Sanction Details' }
    ];

    this.genders = [
      { label: 'Male', value: { id: 1, name: 'Male', code: 'M' } },
      { label: 'Female', value: { id: 2, name: 'Female', code: 'F' } },
      { label: 'Transgender', value: { id: 3, name: 'Transgender', code: 'T' } },
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
      epf: [''],
      PpoId: ['', Validators.required],
      nameOfServiceHolder: ['', Validators.required],
      sanctionAuthority: ['', Validators.required],
      sanctionNo: ['', Validators.required],
      sanctionDate: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['',Validators.required],
      dateOfAppointment: ['', Validators.required],
      officeName: ['', Validators.required],
      postHeld: ['',Validators.required],
      lastPay: ['',Validators.required],
      averageAmolument:['',Validators.required],
      hrmsUniqueIdOfServiceHolder: ['',Validators.required],
      issuingAuthority: ['',Validators.required],
      letterNo: ['',Validators.required],
      letterDate: ['',Validators.required],
      grossYear: ['',Validators.required],
      grossMonth: ['',Validators.required],
      grossDay: ['',Validators.required],
      netYear: ['',Validators.required],
      netMonth: ['',Validators.required],
      netDay: ['',Validators.required],
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
