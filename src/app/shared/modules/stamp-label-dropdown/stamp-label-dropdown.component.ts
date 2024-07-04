import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MasterService } from 'src/app/core/services/master/master.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-stamp-label-dropdown',
  templateUrl: './stamp-label-dropdown.component.html',
  styleUrls: ['./stamp-label-dropdown.component.scss']
})
export class StampLabelDropdownComponent implements OnInit {

  LabelList: any[] = [];
  selectedLabel:any;
  @Output() LabelSelected = new EventEmitter<string>();

  constructor(private masterService: MasterService, private toastService: ToastService,) { }


  ngOnInit(): void {
    this.masterService.getStampLabels().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.LabelList = response.result
      } else {
        this.toastService.showError(response.message);
      }
    })
  }
  onStampLabelSelected() {    
    this.LabelSelected.emit(this.selectedLabel.labelId);
  }
}
