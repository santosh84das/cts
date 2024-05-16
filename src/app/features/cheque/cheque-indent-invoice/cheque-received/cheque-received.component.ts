import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { invoiceDetailsList } from 'src/app/core/models/cheque';
import { ChequeInvoiceService } from 'src/app/core/services/cheque/cheque-invoice.service';
import { ToastService } from 'src/app/core/services/toast.service';

interface chequeDamageType{
  name: string;
  code: Number;
}

@Component({
  selector: 'app-cheque-received',
  templateUrl: './cheque-received.component.html',
  styleUrls: ['./cheque-received.component.scss']
})
export class ChequeReceivedComponent implements OnInit {

  receivedForm!: FormGroup;
  isVisible = false;
  invoiceId?: number;
  invoiceDetailsList!: invoiceDetailsList;
  chequesDamageType!: chequeDamageType[];
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private chequeinvoiceservice: ChequeInvoiceService, private toastService: ToastService,) { }

  ngOnInit(): void {
    this.chequesDamageType = [
      { name: 'Tron', code: 1 },
      { name: 'Printing Missing', code: 2 },
    ];
    this.invoiceId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.getInvoiceDetails(this.invoiceId);
    this.receivedForm = this.fb.group({
      damage_type:[''],
      series_range:[''],
    })
  }

  getInvoiceDetails(id: number) {
    this.chequeinvoiceservice.getInvoiceDetails(id).subscribe((res) => {
      if (res.apiResponseStatus == 1) {
        this.invoiceDetailsList = res.result;
        console.log('ff', this.invoiceDetailsList);
      } else {
        this.toastService.showError(res.message);
      }
    });
  }

  addDamagedChequeEntry() {
    this.isVisible = true;
  }
  cancelDamagedChequeEntry() {
    this.isVisible = false;
  }
}
