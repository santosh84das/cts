import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  cheques!: Chequetype[];
  indentForm!: FormGroup;
  lastindex!: number;
  plusButtonIndex: number = 0;
  

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.cheques = [
      { name: 'Treasury Cheque', code: 1 },
      { name: 'Others', code: 2 },
    ];
    this.indentForm = this._fb.group({
      chequelist: this._fb.array([this.createCheque()])
    });

    this.minusbutton();
  }

  get chequelist(): FormArray  {
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

  minusbutton(){
    const index = this.chequelist.length 
    console.log(index);
  }


}
