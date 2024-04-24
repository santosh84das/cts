import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormData } from 'src/app/core/models/indentFormData';
import { ChequeIndentDeatil, Serieslist, chequeIndent } from 'src/app/core/models/cheque';
import { ChequeIndentService } from 'src/app/core/services/cheque/cheque-indent.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ActivatedRoute, Route, Router } from '@angular/router';


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
  chequeIndentList!: ChequeIndentDeatil[];
  chequeInvoiceDetails!: chequeIndent;
  id?: number;

  constructor(private fb: FormBuilder, private chequeIndentService: ChequeIndentService, private toastService:ToastService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    console.log(this.id );
    
    this.series = [{ name: 'list1', code: 1, }, { name: 'list2', code: 2, },];
    this.chequeIndentList = [
      { chequeType: 1, micrCode: '34545342', quantity: 30 },
      { chequeType: 2, micrCode: '57777773', quantity: 20 },

    ]
    this.indentFormApproval = this.fb.group({
      invoiceDate: [''],
      invoiceNumber: [''],
      indateId: [''],
      indateDate: [''],
      series: [''],
      start: [''],
      end: [''],
      quantity: [''],
      serieslist: this.fb.array([this.createSeries()]),
    });
    (this.indentFormApproval.get('indateId') as FormControl).disable();
    (this.indentFormApproval.get('indateDate') as FormControl).disable();
    this.chequeIndentService.approvedChequeIndentById(this.id).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.chequeInvoiceDetails= response.result;
        this.indentFormApproval.controls['indateId'].setValue(this.chequeInvoiceDetails.indentId);
        this.indentFormApproval.controls['indateDate'].setValue(this.chequeInvoiceDetails.indentDate);
      }
      this.toastService.showError(response.message);
    });
  }


  get serieslist(): FormArray {
    return this.indentFormApproval.get('serieslist') as FormArray;
  }


  createSeries(): FormGroup {
    return this.fb.group({
      series: [''],
      start: [''],
      end: [''],
      quantity: [''],
    });
  }

  addSeries() {
    this.serieslist.push(this.createSeries());

  }

  removeSeries(index: number) {
    this.serieslist.removeAt(index);
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


  getSelectedResults() {

    if (this.indentFormApproval) {
      const series = this.indentFormApproval.get('series')?.value;
      const start = this.indentFormApproval.get('start')?.value;
      const end = this.indentFormApproval.get('end')?.value;
      const quantity = this.indentFormApproval.get('quantity')?.value;

      const selectedResults = {
        series: series instanceof Array ? series.map(s => s.code) : series.code,
        start,
        end,
        quantity
      };
    }
  }



}
