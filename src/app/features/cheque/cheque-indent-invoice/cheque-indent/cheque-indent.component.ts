import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IapiResponce } from 'src/app/core/models/iapi-responce';

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
  displayModal: boolean | undefined;
  toastservice: any;


  constructor(private _fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.cheques = [
      { name: 'Treasury Cheque', code: 1 },
      { name: 'Others', code: 2 },
    ];
    this.indentForm = this._fb.group({
      chequelist: this._fb.array([this.createCheque()])
    });

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

  showBankDetails() {
    this.displayModal = true;
  }

  // getBankList(): Observable<IapiResponce> {
  //   return this.http.post<IapiResponce>('v1/Bank/get-banks').pipe(

  //   );
  // }


}
