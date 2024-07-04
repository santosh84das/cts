import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MasterService } from 'src/app/core/services/master/master.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-stamp-denomination-dropdown',
  templateUrl: './stamp-denomination-dropdown.component.html',
  styleUrls: ['./stamp-denomination-dropdown.component.scss']
})
export class StampDenominationDropdownComponent implements OnInit {


  DenominationList: any[] = [];
  selectedDenomination:any;
  @Output() DenominatonSelected = new EventEmitter<string>();

  constructor(private masterService: MasterService, private toastService: ToastService,) { }

  ngOnInit(): void {
    this.masterService.getStampDenominations().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.DenominationList = response.result
      } else {
        this.toastService.showError(response.message);
      }
    })
  }

  onStampDenominationSelected() {    
    this.DenominatonSelected.emit(this.selectedDenomination.denominationId);
  }
}
