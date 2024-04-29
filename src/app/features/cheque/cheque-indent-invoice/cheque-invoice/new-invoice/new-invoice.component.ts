import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormData } from 'src/app/core/models/indentFormData';
import { ChequeIndentDeatil, IndentInvoiceDetails, InvoiceDetails, Serieslist, chequeIndent } from 'src/app/core/models/cheque';
import { ChequeIndentService } from 'src/app/core/services/cheque/cheque-indent.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { log } from 'console';
import { promises } from 'dns';


@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})

export class NewInvoiceComponent implements OnInit {
  allSeries!: Serieslist[];
  chequeIndentDetails!: chequeIndent;
  id?: number;
  indentInvoiceDetails?: IndentInvoiceDetails;
  invoiceForm: FormGroup = this.createInvoiceForm();

  constructor(private fb: FormBuilder, private chequeIndentService: ChequeIndentService, private toastService: ToastService, private route: ActivatedRoute, private date: DatePipe) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.getIndentDetails(this.id);
    this.allSerieslist();
  }
  /* ------------------------------- FormGroup [START] ------------------------------ */
  private createInvoiceForm(): FormGroup {
    return this.fb.group({
      invoiceDate: [''],
      invoiceNumber: [''],
      indentId: [''],
      indentDate: [''],
      // series: [''],
      // availability: [''],
      // quantity: [''],
      seriesGroupArray: this.fb.array([this.newSeriesFormGroup()]),
    })
  }
  /* ---------------------------- FormGroup [END] --------------------------- */
  /* --------------------------- Form array [START] --------------------------- */
  get seriesGroupArray(): FormArray {
    return this.invoiceForm.get('seriesGroupArray') as FormArray
  }

  newSeriesFormGroup(): FormGroup {
    return this.fb.group({
      series: new FormControl('', Validators.required),
      availability: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
  }
  addNewSeries() {
    this.seriesGroupArray.push(this.newSeriesFormGroup());
  }

  removeSeries(index: number) {
    this.seriesGroupArray.removeAt(index);
  }
  /* --------------------------- Form array [END] --------------------------- */
  allSerieslist() {
    this.chequeIndentService.getSeriesList().subscribe((res) => {
      if (res.apiResponseStatus == 1) {
        this.allSeries = res.result;
      } else {
        this.toastService.showError(res.message);
      }

    })
  }
  getIndentDetails(id: number) {
    this.chequeIndentService.indentDetailsById(id)
      .subscribe(response => {
        if (response.apiResponseStatus == 1) {
          this.chequeIndentDetails = response.result;
          this.invoiceForm.patchValue({
            indentId: this.chequeIndentDetails.indentId,
            indentDate: this.chequeIndentDetails.indentDate,
          });
        }
      });
  }
  getSeriesDeatils(seriesIndex: number) {
    const selectedSeriesControl = this.seriesGroupArray.at(seriesIndex);
    const selectedSeries = selectedSeriesControl.get('series')?.value;
    this.chequeIndentService.getSeriesDetails(selectedSeries).subscribe((res) => {
      if (res.apiResponseStatus == 1) {
        selectedSeriesControl.patchValue({
          availability: res.result.availableQuantity
        })
      } else {
        this.toastService.showError(res.message);
      }
    })
  }

  confirmInvoiceApproval() {
    if (this.invoiceForm) {
      const chequeIndentId = this.invoiceForm.get('indentId')!.value;
      const invoiceDate = this.invoiceForm.get('invoiceDate')!.value;
      const invoiceNumber = this.invoiceForm.get('invoiceNumber')!.value;
      const chequeInvoiceDeatils: InvoiceDetails[] = this.seriesGroupArray.controls.map(
        (fa) => {
          const formGroup = fa as FormGroup;
          return {
            chequeIndentDetailId: this.chequeIndentDetails.chequeIndentDeatils[0].indentDeatilsId,
            chequeEntryId: formGroup.get("series")!.value,
            availableQuantity: formGroup.get("availability")!.value,
            quantity: formGroup.get("quantity")!.value,
          }
        });
      this.indentInvoiceDetails = { chequeIndentId, invoiceDate, invoiceNumber, chequeInvoiceDeatils }
      console.log(this.indentInvoiceDetails);

      this.chequeIndentService.saveChequeIndentInvoice(this.indentInvoiceDetails).subscribe(res => {
        this.toastService.showAlert(res.message, res.apiResponseStatus);
      })

    }
  }
}
