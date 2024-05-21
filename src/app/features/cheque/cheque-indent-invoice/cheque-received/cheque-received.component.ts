import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChequeInvoiceSeries, invoiceDetailsList } from 'src/app/core/models/cheque';
import { ChequeInvoiceService } from 'src/app/core/services/cheque/cheque-invoice.service';
import { ChequeReceiveService } from 'src/app/core/services/cheque/cheque-receive.service';
import { ToastService } from 'src/app/core/services/toast.service';

interface chequeDamageType {
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
  isVisible?: boolean;
  invoiceId?: number;
  invoiceDetailsList!: invoiceDetailsList;
  chequesDamageType!: chequeDamageType[];
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private chequeinvoiceservice: ChequeInvoiceService, private toastService: ToastService, private chequeReceiveService: ChequeReceiveService) { }

  ngOnInit(): void {
    this.chequesDamageType = [
      { name: 'Torn', code: 1 },
      { name: 'Printing Missing', code: 2 },
    ];
    this.invoiceId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.getInvoiceDetails(this.invoiceId);
    this.receivedForm = this.fb.group({
      damage_type: [''],
      series_range:['']
    })
    // this.initForm();

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
  // get chequeDamage(): FormArray {
  //   return this.receivedForm.get('chequeDamage') as FormArray;
  // }

  // initForm(): void {
  //   this.invoiceDetailsList.chequeInvoiceSeries.forEach(item => {
  //     this.chequeDamage.push(this.fb.group({
  //       damage_type: new FormControl(''),
  //       series_range: new FormControl('')
  //     }));
  //   });
  // }


  addDamagedChequeEntry(item: any, i: number) {
    item.isVisible = true;
  
  }
  cancelDamagedChequeEntry(item: any, index:number) {
    item.isVisible = false;
    // (this.receivedForm.get('chequeDamage') as FormArray).removeAt(index);
  }

  rcvFormsubmit() {
    if (this.receivedForm.valid) {
      const formData = this.receivedForm.value;
      const payload: {
        invoiceId: number;
        chequeReceivedDamagedDetails: {
          chequeEntryId: any;
          damageIndex: any;
          damageType: any;
        }[];
      } = {
        invoiceId: formData.invoiceId,
        chequeReceivedDamagedDetails: []
      };
      formData.chequeInvoiceSeries.forEach((item: any) => {
        if (item.isVisible) {
          const itemPayload: {
            chequeEntryId: any;
            damageIndex: any;
            damageType: any;
          } = {
            chequeEntryId: item.chequeEntryId,
            damageIndex: item.damageIndex,
            damageType: item.damageType
          };
          payload.chequeReceivedDamagedDetails.push(itemPayload);
        }
      });
      console.log('----->', payload);

      this.chequeReceiveService.saveChequeReceive(payload).subscribe(res => {
        if (res.apiResponseStatus == 1) {
          this.receivedForm.reset();
          this.toastService.showAlert(
            res.message,
            res.apiResponseStatus,
          );
        } else {
          this.toastService.showError(res.message);
        }

      })
    }
  }
}

