import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ToastService } from 'src/app/core/services/toast.service';
import { SharedDataService  } from '../shared-data.service';
import { Validators } from '@angular/forms';
import { PpoDetailsService } from 'src/app/core/services/ppoDetails/ppo-details.service';
import { PPOEntryINF } from 'src/app/core/models/ppoentry-inf';
import { SearchPopupComponent, SearchPopupConfig } from 'src/app/core/search-popup/search-popup.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})

export class DetailsComponent implements OnInit {
  religionOptions: SelectItem[];
  subDivOptions: SelectItem[];
  ppoFormDetails: FormGroup = new FormGroup({});
  ref: DynamicDialogRef | undefined;

  ManualEntrySearchForm: FormGroup = new FormGroup({});


  constructor(
    private fb: FormBuilder, 
    private toastService: ToastService,
    private sd: SharedDataService,
    private service: PpoDetailsService,
    private dialogService: DialogService,
  ) { 
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
  }

  ininalizer(): void {;
    // ManualEntrySearchForm Form builder
    this.ManualEntrySearchForm = this.fb.group({
      eppoid: ['', Validators.required],
    });


    this.ppoFormDetails = this.fb.group({
      receiptId: [null, [Validators.required, Validators.pattern(/^\d+$/)]], // -->> api
      ppoNo: [null, [Validators.maxLength(100), Validators.minLength(0)]], // -->> api
      pensionerName: [null, [Validators.maxLength(100), Validators.minLength(0)]], // --> api
      ppoType: [null, [Validators.required, Validators.pattern('^[PFC]$')]], // -->> api
      ppoSubType: [null, [Validators.required, Validators.pattern('^[ELUVNRPGJKHW]$')]],
      categoryDescription: [''], /// not in schema
      categoryId: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      dateOfRetirement: [null],
      dateOfCommencement: [null], // -->> api
      basicPensionAmount: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      commutedPensionAmount: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      effectiveDate:[''], // not in schema
      reducedPensionAmount: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      religion:[''], // not in schema
      mobileNumber: [null, [Validators.pattern(/^[6-9]\d{9}$/)]], // -->> api
      aadhaarNo: [null],
      panNo: [null],
      pensionerAddress: [null], // not in schema

      remarks: [''], // not in schema
      doublePension: [''], // not in schema
      employedPensioner: [''], // not in schema
      reEmployed: [''], // not in schema
      adhocPension: [''], // not in schema
      provisionalPension: [''], // not in schema
      interimAllowance:[''], // not in schema
      sharedPension:[''], // not in schema

      gender: [null, [Validators.pattern('^[MF]$')]], // not in html

      dateOfBirth: [null],
      emailId: [null, [Validators.email]], // not in html add it

      identificationMark: [null], // not in html add it

      enhancePensionAmount: [null, [Validators.required, Validators.pattern(/^\d+$/)]],


      // additional
      retirementDate: [''],
    });
  }

  ngOnInit(): void {
    console.log("Details PAGE")

    // enable next
    this.ppoFormDetails.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.sd.setFormValid(true);
        this.sd.setObject(this);
      }
      else {
        // this.sd.setFormValid(false);
        this.sd.setFormValid(true);
        this.sd.setObject(this);
      }
    });
  }


  // call this method for save database
  saveData(){

    if (this.ppoFormDetails.valid || true) {
      console.log(this.ppoFormDetails.valid);
      console.log(this.ppoFormDetails.value);
      const value:PPOEntryINF = this.ppoFormDetails.value;

    //   this.service.CreatePPODetails(this.ppoFormDetails.value).subscribe(
    //     (data) => {
    //       console.log(data);
    //       this.toastService.showSuccess('Data saved successfully');
    //     },
    //     (error) => {
    //       console.log(error);
    //       this.toastService.showError('Failed to save data: '+error.message);
    //     }
    //   )
    // }
    }
    this.sd.object=undefined
  }

  // manual PPO entry search
  
  MEDetailsSearch(){
    let payload = {
      "pageSize":10,
      "pageIndex":0,
      "filterParameters": [],
      "sortParameters":{
        "field":"",
        "order":""
      }
    };

    const config: SearchPopupConfig = {
      payload: payload,
      apiUrl: 'v1/manual-ppo/receipts' // mark popup api url
    };
    
    if (this.ManualEntrySearchForm.valid) {
      const id = this.ManualEntrySearchForm.value
      const keys = Object.keys(this.ManualEntrySearchForm.value);
      let payload = {
        "pageSize":10,
        "pageIndex":0,
        "filterParameters": [{
          "field": "TreasuryReceiptNo",
          "value": id[keys[0]],
          "operator": "contains"
        }],
        "sortParameters":{
          "field":"",
          "order":""
        }
      };
  
      const config: SearchPopupConfig = {
        payload: payload,
        apiUrl: 'v1/manual-ppo/receipts' // mark popup api url
      };

    }

    this.ref = this.dialogService.open(SearchPopupComponent, {
      data: config,
      header: 'Search record',
      width: '60%'
    });

    this.ref.onClose.subscribe((record: any) => {
      if (record) {
        console.log(record);
      }
    });
  }
}
