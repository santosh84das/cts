import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Status } from 'src/app/core/enum/stampIndentStatusEnum';
import { GetStampIndents } from 'src/app/core/models/stamp';
import { StampIndentService } from 'src/app/core/services/stamp/stamp-indent.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';

@Component({
  selector: 'app-invoice-receive',
  templateUrl: './invoice-receive.component.html',
  styleUrls: ['./invoice-receive.component.scss']
})
export class InvoiceReceiveComponent implements OnInit {

  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetStampIndents>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(
    private stampIndentService: StampIndentService,
    private toastService: ToastService,) { }

  ngOnInit(): void {
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };

    this.tableActionButton = [
      {
        buttonIdentifier: 'receive',
        class: 'p-button-info p-button-sm',
        icon: 'pi pi-inbox',
        lable: 'Receive',
      },
    ];
    this.getAllStampIndents()
  }

  getAllStampIndents() {
    this.stampIndentService
      .getAllStampIndentsProcessed(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
          console.log(response);
          
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
