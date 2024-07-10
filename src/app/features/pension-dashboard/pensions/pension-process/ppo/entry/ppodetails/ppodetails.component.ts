import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-ppodetails',
  templateUrl: './ppodetails.component.html',
  styleUrls: ['./ppodetails.component.scss']
})
export class PpodetailsComponent implements OnInit {

  ppoForm: FormGroup;
  religionOptions: SelectItem[];
  subDivOptions: SelectItem[];

  constructor(private fb: FormBuilder) {
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
    });

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
  }

  ngOnInit(): void {}

  onSearch(): void {
    if (this.ppoForm.valid) {
      console.log(this.ppoForm.value); // Replace with your actual search logic
    }
  }
}
