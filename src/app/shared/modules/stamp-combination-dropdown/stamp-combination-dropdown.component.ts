import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { StampCombinationService } from 'src/app/core/services/stamp/stamp-combination.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';

@Component({
  selector: 'app-stamp-combination-dropdown',
  templateUrl: './stamp-combination-dropdown.component.html',
  styleUrls: ['./stamp-combination-dropdown.component.scss']
})
export class StampCombinationDropdownComponent implements OnInit {

  CombinationTypeList: any[] = [];
  selectedCombinationType:any;
  tableQueryParameters : any = {};
  @Output() StampCombinationSelected = new EventEmitter<string>();

  constructor(private toastService: ToastService, private stampCombinationService: StampCombinationService) { }
  ngOnInit(): void {
    this.getAllStampCombination()
  }

  getAllStampCombination() {
    
    console.log(this.tableQueryParameters);
    this.stampCombinationService
    .getStampCombinationList(this.tableQueryParameters)
    .subscribe((response) => {
        console.log(response)
        if (response.apiResponseStatus == 1) {
          response.result.data.map((item: any) => {
            item.isActive = item.isActive ? "Yes" : "No";
            item.createdAt && (item.createdAt = convertDate(item.createdAt));
          });
          this.CombinationTypeList = response.result.data;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }
  
  onStampCombinationSelected() {    
    this.StampCombinationSelected.emit(this.selectedCombinationType.stampCombinationId);
  }

}
