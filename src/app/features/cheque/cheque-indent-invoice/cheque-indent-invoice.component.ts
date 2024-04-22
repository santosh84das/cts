import { Component, OnInit, ViewChild } from '@angular/core';
import { ChequeIndentComponent } from './cheque-indent/cheque-indent.component';
import { ChequeIndentService } from 'src/app/core/services/cheque/cheque-indent.service';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { ToastService } from 'src/app/core/services/toast.service';
import { tokenDetails } from 'src/app/core/models/token';
import { ChequeIndentList } from 'src/app/core/models/cheque';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheque-indent-invoice',
  templateUrl: './cheque-indent-invoice.component.html',
  styleUrls: ['./cheque-indent-invoice.component.scss'],
  providers: [ConfirmationService]
})
export class ChequeIndentInvoiceComponent implements OnInit {

  @ViewChild(ChequeIndentComponent) addIndent!: ChequeIndentComponent;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  tableData!: DynamicTable<ChequeIndentList>;
  tableActionButton: ActionButtonConfig[] = [];
  listType: string = 'indent';
  constructor(private chequeIndentService: ChequeIndentService, private toastService: ToastService, private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit(): void {
    this.changeListType('indent');
  }

  callChequeIndent() {
    this.addIndent
  }
  /**
   * Handles the button click event and performs the appropriate action based on the button identifier.
   *
   * @param {any} event - The event object containing information about the button click.
   */
  buttonHandler(event: any) {
    switch (event.buttonIdentifier) {
      case 'indent-approve':
        this.approveIndent(event.rowData.id);
        break;
      case 'indent-reject':
        this.rejectIndent(event.rowData.id);
        break;
      case 'indent-edit':
        this.toastService.showSuccess('Edit');
        break;
      case 'invoice-approve':
        this.approvedChequeIndent(event.rowData.id)
        break;
    }
  }
  approveIndent(indentId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.chequeIndentService.approveChequeIndent(indentId).subscribe((response) => {
          if (response.apiResponseStatus == 1) {
            this.chequeIndentList();
          }
          this.toastService.showAlert(response.message, response.apiResponseStatus);
        })
      },
    });
  }
  rejectIndent(indentId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.chequeIndentService.rejectChequeIndent(indentId).subscribe((response) => {
          if (response.apiResponseStatus == 1) {
            this.chequeIndentList();
          }
          this.toastService.showAlert(response.message, response.apiResponseStatus);
        })
      },
    });
  }
  /**
   * Change the list type and update the table action buttons and query parameters accordingly.
   *
   * @param {string} type - The new list type.
   */
  changeListType(type: string) {
    this.listType = type;
    if (type == 'indent') {
      this.tableActionButton = [
        {
          buttonIdentifier: 'indent-approve',
          class: 'p-button-success p-button-sm',
          icon: 'pi pi-check',
          lable: 'Approve',
        },
        {
          buttonIdentifier: 'indent-reject',
          class: 'p-button-danger p-button-sm',
          icon: 'pi pi-times',
          lable: 'Reject',
        },
        {
          buttonIdentifier: 'indent-edit',
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
    if (type == 'invoice') {
      this.tableActionButton = [
        {
          buttonIdentifier: 'invoice-approve',
          class: 'p-button-success p-button-sm',
          icon: 'pi pi-check',
          lable: 'Approve',
        },
        {
          buttonIdentifier: 'invoice-reject',
          class: 'p-button-danger p-button-sm',
          icon: 'pi pi-times',
          lable: 'Reject',
        },
        {
          buttonIdentifier: 'invoice-edit',
          class: 'p-button-warning p-button-sm',
          icon: 'pi pi-file-edit',
          lable: 'Edit',
        },
      ];
      this.tableQueryParameters = {
        pageSize: 10,
        pageIndex: 0,
      };
      this.chequeIndentInvoiceList();
    }

  }
  chequeIndentInvoiceList() {
    this.chequeIndentService.getChqueInvoiceList(this.tableQueryParameters).subscribe((responce) => {
      if (responce.apiResponseStatus == 1) {
        this.tableData = responce.result;
        return;
      }
      this.toastService.showError(responce.message);
    });
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
  approvedChequeIndent(id:number){
    this.router.navigate(['/cheque/approved-cheque-indent', id]);
  }
}
