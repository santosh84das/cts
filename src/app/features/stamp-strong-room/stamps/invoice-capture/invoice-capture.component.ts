import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { GetStampInvoices } from 'src/app/core/models/stamp';
import { StampIndentService } from 'src/app/core/services/stamp/stamp-indent.service';
import { StampInvoiceService } from 'src/app/core/services/stamp/stamp-invoice.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Status } from 'src/constants/stampIndentStatusEnum';
import { convertDate } from 'src/utils/dateConversion';

@Component({
  selector: 'app-invoice-capture',
  templateUrl: './invoice-capture.component.html',
  styleUrls: ['./invoice-capture.component.scss']
})
export class InvoiceCaptureComponent implements OnInit {
  listType: string = 'indent';
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetStampInvoices>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(private stampInvoiceService: StampInvoiceService,
    private toastService: ToastService,
    private stampIndentService: StampIndentService,
  ) { }

  ngOnInit(): void {
    
    this.tableActionButton = [
      {
        buttonIdentifier: 'details',
        class: 'p-button-info p-button-sm',
        icon: 'pi pi-info-circle',
        lable: 'Details',
      },
    ];

    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };

    this.getAllStampIndents();
    this.changeDynamicTable(this.listType)
  }



  changeDynamicTable(type: string) {
    this.listType = type;
    if (type == 'indent') {
      this.tableActionButton = [
        {
          buttonIdentifier: 'indent-forward',
          class: ' p-button-sm',
          icon: 'pi pi-check',
          lable: 'Froward TO',
        },
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
          buttonIdentifier: 'indent-invoice',
          class: 'p-button-sm',
          icon: 'pi pi-plus',
          lable: 'Invoice',
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
      this.getAllStampIndents();
    }
    if (type == 'invoice') {
      this.tableActionButton = [

        {
          buttonIdentifier: 'invoice-received',
          class: ' p-button-sm',
          icon: 'pi pi-users',
          lable: 'Received',
        },
        {
          buttonIdentifier: 'invoice-forward',
          class: ' p-button-sm',
          icon: 'pi pi-check',
          lable: 'Froward TO',
        },
        {
          buttonIdentifier: 'invoice-edit',
          class: 'p-button-warning p-button-sm',
          icon: 'pi pi-file-edit',
          lable: 'Edit',
        },
        {
          buttonIdentifier: 'invoice-details',
          class: 'p-button-info p-button-sm',
          icon: 'pi pi-info-circle',
          lable: 'Details',
        },
      ];
      this.tableQueryParameters = {
        pageSize: 10,
        pageIndex: 0,
      };
      this.getAllStampInvoices();
    }

  }

  getAllStampInvoices() {
    this.stampInvoiceService
      .getAllStampInvoice(this.tableQueryParameters)
      .subscribe((response) => {
        console.log(response);
        if (response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {

          response.result.data.map((item: any) => {
            // item.createdAt = convertDate(item.createdAt);
            // item.memoDate = convertDate(item.memoDate);
          });
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }

  getAllStampIndents() {
    this.stampIndentService
      .getAllStampIndents(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
          response.result.data.map((item: any) => {
            item.createdAt = convertDate(item.createdAt);
            item.memoDate = convertDate(item.memoDate);
            item.status = Status[item.status]
          });
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }

  handleButtonClick($event: any) {

  }
}
