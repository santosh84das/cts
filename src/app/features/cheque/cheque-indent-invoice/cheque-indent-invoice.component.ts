import { Component, OnInit, ViewChild } from '@angular/core';
import { ChequeIndentComponent } from './cheque-indent/cheque-indent.component';
import { ChequeIndentService } from 'src/app/core/services/cheque/cheque-indent.service';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { ToastService } from 'src/app/core/services/toast.service';
import { tokenDetails } from 'src/app/core/models/token';
import { ChequeIndentList } from 'src/app/core/models/cheque';

@Component({
  selector: 'app-cheque-indent-invoice',
  templateUrl: './cheque-indent-invoice.component.html',
  styleUrls: ['./cheque-indent-invoice.component.scss']
})
export class ChequeIndentInvoiceComponent implements OnInit {

  @ViewChild(ChequeIndentComponent) addIndent!: ChequeIndentComponent;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  tableData!: DynamicTable<ChequeIndentList>;
  tableActionButton: ActionButtonConfig[] = [];
  constructor(private chequeIndentService: ChequeIndentService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.tableActionButton = [
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-sm',
        icon: 'pi pi-file-edit',
        lable: 'Edit',
      },
    ];
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    this.chequeIndentList();
  }

  callChequeIndent() {

    this.addIndent;
    console.log('hi');

  }
  chequeIndentList() {
    this.chequeIndentService.getChqueIndentList(this.tableQueryParameters).subscribe((responce) => {
      if (responce.apiResponseStatus == 1) {
        this.tableData = responce.result;
        return;
      }
      this.toastService.showError(responce.message);
    });
  }


}
