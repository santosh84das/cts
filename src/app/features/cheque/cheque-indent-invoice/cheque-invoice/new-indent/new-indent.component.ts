import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormData } from 'src/app/core/models/indentFormData';
import { Serieslist } from 'src/app/core/models/cheque';

@Component({
  selector: 'app-new-indent',
  templateUrl: './new-indent.component.html',
  styleUrls: ['./new-indent.component.scss']
})

export class NewIndentComponent implements OnInit {

  formDatas: FormData[] = [
    { invoiceDate: new Date(), invoiceNumber: '1234-1234-1234-1234', indateId: '12345', indateDate: new Date() },
  ];

  indentFormApproval!: FormGroup;
  series!: Serieslist[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.series = [{ name: 'list1', code: 1, }, { name: 'list2', code: 2, },]
    this.indentFormApproval = this.fb.group({
      invoiceDate: [''],
      invoiceNumber: [''],
      indateId: [''],
      indateDate: [''],
      chequelist: this.fb.array([this.createSeries()])
    });
    // ___________________Patch form data__________________________
    // const sampleData = {
    //   invoiceDate: new Date(), // Sample date
    //   invoiceNumber: '1234-1234-1234-1234',
    //   indateId: '12345',
    //   indateDate: new Date(), // Sample date
    //   chequelist: [
    //     { series: 'list 1', start: 100, end: 200 }
    //     // Add more sample data as needed
    //   ]
    // };
    // this.patchFormData(sampleData)
  }

  get chequelist(): FormArray {
    return this.indentFormApproval.get('chequelist') as FormArray;
  }

  
  createSeries(): FormGroup {
    return this.fb.group({
      series: [''],
      start: [''],
      end: [''],
      quantity: [''],
    });
  }

  addSeries(){
    this.chequelist.push(this.createSeries());
    console.log(this.chequelist.value);

  }

  removeSeries(index : number){
    this.chequelist.removeAt(index);
  }

  // patchFormData(data: any) {
  //   this.indentFormApproval.patchValue({
  //     invoiceDate: data.invoiceDate,
  //     invoiceNumber: data.invoiceNumber,
  //     indateId: data.indateId,
  //     indateDate: data.indateDate
  //   });

  //   // Clear existing chequelist FormArray
  //   while (this.chequelist.length !== 0) {
  //     this.chequelist.removeAt(0);
  //   }

  //   // Patch data into the chequelist FormArray
  //   data.chequelist.forEach((item: any) => {
  //     const group = this.fb.group({
  //       series: [item.series],
  //       start: [item.start],
  //       end: [item.end]
  //     });
  //     this.chequelist.push(group);
  //   });

  // }



}
