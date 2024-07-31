import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ToastService } from 'src/app/core/services/toast.service';
import { SharedDataService  } from '../shared-data.service';
import { Validators } from '@angular/forms';
import { PpoDetailsService } from 'src/app/core/services/ppoDetails/ppo-details.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  religionOptions: SelectItem[];
  subDivOptions: SelectItem[];
  ppoFormDetails: FormGroup = new FormGroup({});


  constructor(
    private fb: FormBuilder, 
    private toastService: ToastService,
    private sd: SharedDataService,
    private service: PpoDetailsService,
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

  ininalizer(): void {
    this.ppoFormDetails = this.fb.group({
      ppoNo: ['', Validators.required],
      pensionerName: ['',Validators.required],
      type: ['',Validators.required],
      subType: ['',Validators.required],
      catDescription: ['',Validators.required],
      catSubCatid: ['',Validators.required],
      retirementDate: ['',Validators.required],
      dateOfDeath: ['',Validators.required],
      commencementDate: ['',Validators.required],
      basic: ['',Validators.required],
      commutedPension: ['',Validators.required],
      effectiveDate: ['',Validators.required],
      reducedPension: ['',Validators.required],
      epf: ['',Validators.required],
      upto: ['',Validators.required],
      familyPension: ['',Validators.required],
      // religionPension: ['',Validators.required],
      religion: ['',Validators.required],
      firstPensionGenerated: ['',Validators.required],
      mobileNo:['',Validators.required],
      aadharNo:['',Validators.required],
      panNo:['',Validators.required],
      healthScheme: ['',Validators.required],
      gpfTpfNo: ['',Validators.required],
      subDiv: ['',Validators.required],
      doublePension: ['',Validators.required],
      employedPensioner:['',Validators.required],
      reEmployed:['',Validators.required],
      address:['',Validators.required],
      remarks:['',Validators.required],
      adhocPension:['',Validators.required],
      provisionalPension:['',Validators.required],
      interimAllowance:['',Validators.required],
      sharedPension:['',Validators.required],


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
        this.sd.setFormValid(false);
      }
    });
  }

  onSearch(){
    console.log(this.ppoFormDetails.value);
  }

  // call this method for save database
  saveData(){
    if (this.ppoFormDetails.valid) {
      this.service.CreatePPODetails(this.ppoFormDetails.value).subscribe(
        (data) => {
          console.log(data);
          this.toastService.showSuccess('Data saved successfully');
        },
        (error) => {
          console.log(error);
          this.toastService.showError('Failed to save data: '+error.message);
        }
      )
    }
    this.sd.object=undefined
  }

  
}
