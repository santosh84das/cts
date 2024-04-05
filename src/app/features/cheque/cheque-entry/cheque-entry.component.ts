import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicTable } from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';

@Component({
  selector: 'app-cheque-entry',
  templateUrl: './cheque-entry.component.html',
  styleUrls: ['./cheque-entry.component.scss']
})
export class ChequeEntryComponent implements OnInit {


  displayModal: boolean | undefined;
  tableData!:DynamicTable<tokenDetails>;
  chequeEntryFrm! : FormGroup;

  constructor(private fb: FormBuilder) {
   
  }

  ngOnInit(): void {
    this.chequeEntryFrm = this.fb.group({
      start: ['', Validators.required],
      end: ['', [Validators.required, this.validateEnd]],
    });
  }

  addCheque(){
    console.log('hello');
    
  }

  showDialog(){
    this.displayModal=true;
  }
  validateEnd(control:any) {
    const startValue = control.parent ? control.parent.get('start').value : null;
    const endValue = control.value;
    return startValue && endValue && endValue <= startValue ? { 'invalidEnd': true } : null;
  }

}
