import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  BankDetailsForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { 
    this.initializer();
  }
  initializer(){
    this.BankDetailsForm= this.fb.group({
      payMode:[''],
      bankBranchName:[''],
      accountNo:[''],
      accountHolder:[''],
      IFSCCode:[''],
    });
  }
  ngOnInit(): void {
  }

}
