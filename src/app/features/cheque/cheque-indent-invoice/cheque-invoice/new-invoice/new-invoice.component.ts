import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormData } from 'src/app/core/models/indentFormData';
import { ChequeIndentDeatil, IndentInvoiceDetails, InvoiceDetails, Serieslist, chequeIndent } from 'src/app/core/models/cheque';
import { ChequeIndentService } from 'src/app/core/services/cheque/cheque-indent.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { log } from 'console';


@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})

export class NewInvoiceComponent implements OnInit {
  indentFormApproval!: FormGroup;
  series!: Serieslist[];
  chequeIndentList!: ChequeIndentDeatil[];
  chequeIndentDetails!: chequeIndent;
  id?: number;
  selectedSeries: any;
  seriesDeatils: any;
  selectedIndex?: number;
  indentInvoiceDetails?: IndentInvoiceDetails;
  chequeIndentDetailId?:number;
  chequeType?:number;
  micrCode?:string;
  quantity?:number;

  constructor(private fb: FormBuilder, private chequeIndentService: ChequeIndentService, private toastService: ToastService, private route: ActivatedRoute, private date: DatePipe) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    console.log(this.id);

    // this.series = [{ name: 'list1', code: 1, }, { name: 'list2', code: 2, },];
    // this.chequeIndentList = [
    //   { chequeType: 1, micrCode: '34545342', quantity: 30 },
    //   { chequeType: 2, micrCode: '57777773', quantity: 20 },

    // ]
    this.indentFormApproval = this.fb.group({
      invoiceDate: [''],
      invoiceNumber: [''],
      indentId: [''],
      indentDate: [''],
      series: [''],
      start: [''],
      end: [''],
      quantity: [''],
      serieslist: this.fb.array([this.createSeries()]),
    });
    (this.indentFormApproval.get('indentId') as FormControl).disable();
    (this.indentFormApproval.get('indentDate') as FormControl).disable();
    (this.indentFormApproval.get('start') as FormControl).disable();
    (this.indentFormApproval.get('quantity') as FormControl).disable();
    this.chequeIndentService.indentDetailsById(this.id).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.chequeIndentDetails = response.result; 
        console.log('rrrr' , this.chequeIndentDetails);
        this.chequeType = this.chequeIndentDetails.chequeIndentDeatils[0].chequeType;
        this.micrCode = this.chequeIndentDetails.chequeIndentDeatils[0].micrCode;
        this.quantity = this.chequeIndentDetails.chequeIndentDeatils[0].quantity;
        this.indentFormApproval.controls['indentId'].patchValue(this.chequeIndentDetails.indentId);
        this.indentFormApproval.controls['indentDate'].patchValue(this.chequeIndentDetails.indentDate);
         this.chequeIndentDetailId = this.chequeIndentDetails?.chequeIndentDeatils[0]?.indentDeatilsId;
      }
      this.toastService.showError(response.message);
    });
    this.allSerieslist();
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

  allSerieslist() {
    this.chequeIndentService.getSeriesList().subscribe((res) => {
      if (res.apiResponseStatus == 1) {
        this.series = res.result;
      } else {
        this.toastService.showError(res.message);
      }

    })
  }

  seriesInfo(seriesIndex: number) {

  }

  getseriesDeatils() {
    if (this.selectedSeries) {
      this.chequeIndentService.getSeriesDetails(this.selectedSeries).subscribe((res) => {
        if (res.apiResponseStatus == 1) {
          this.seriesDeatils = res.result;
          console.log(this.seriesDeatils);
          this.indentFormApproval.controls['start'].patchValue(this.seriesDeatils.start);
        } else {
          this.toastService.showError(res.message);
        }
      })
    }
  }

  confirmInvoiceApproval() {
    if (this.indentFormApproval) {
      this.indentInvoiceDetails = {
        chequeIndentId:this.indentFormApproval.get('indentId')?.value,
        invoiceDate: this.indentFormApproval.get('invoiceDate')?.value,
        invoiceNumber: this.indentFormApproval.get('invoiceNumber')?.value,
        chequeInvoiceDeatils:this.serieslist.controls.map<InvoiceDetails>((fa) => {
          const formGroup = fa as FormGroup;
          return {
            chequeIndentDetailId:this.chequeIndentDetailId,
            chequeEntryId: formGroup.get("series")?.value.code,
            start: formGroup.get("start")?.value,
            end: formGroup.get("end")?.value,
            quantity: formGroup.get("quantity")?.value,
          }
        })
      }
      console.log( this.indentInvoiceDetails );
      
      this.chequeIndentService.saveChequeIndentInvoice(this.indentInvoiceDetails).subscribe((res)=>{
        if(res.apiResponseStatus==1){
          this.toastService.showAlert(
            res.message,
            res.apiResponseStatus
          );
        }else{
          this.toastService.showError(res.message);
        }
      })

    }
  }
}
