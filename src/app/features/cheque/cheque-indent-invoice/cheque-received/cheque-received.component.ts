import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cheque-received',
  templateUrl: './cheque-received.component.html',
  styleUrls: ['./cheque-received.component.scss']
})
export class ChequeReceivedComponent implements OnInit {

  receivedForm!: FormGroup;
  isVisible = false;
  invoiceId?: number;
  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.invoiceId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.getInvoiceDetails(this.invoiceId)
  }

  getInvoiceDetails(id:number){
    console.log(id);
  }

  addDamagedChequeEntry(){
    this.isVisible = true;
  }
  cancelDamagedChequeEntry(){
    this.isVisible = false;
  }
}
