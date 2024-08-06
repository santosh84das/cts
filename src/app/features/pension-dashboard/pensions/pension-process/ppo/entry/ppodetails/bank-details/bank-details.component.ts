import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  BankDetailsForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private sd: SharedDataService,
  ) { 
    this.ininalizer();
    
  }
  ininalizer(){
    this.BankDetailsForm= this.fb.group({
      payMode:[''],
      bankBranchName:[''],
      accountNo:[''],
      accountHolder:[''],
      IFSCCode:[''],
    });
  }
  ngOnInit(): void {
    this.BankDetailsForm.statusChanges.subscribe(status => {
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

  saveData():boolean {
    console.log('Data Saved', this.BankDetailsForm.value);
    return false;
  }

}
 