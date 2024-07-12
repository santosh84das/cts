import { Component, OnInit } from '@angular/core';
import { ECS_NEFT } from 'src/app/core/models/bill';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { TokenService } from 'src/app/core/services/Token/token.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-ecs-neft',
  templateUrl: './ecs-neft.component.html',
  styleUrls: ['./ecs-neft.component.scss']
})
export class EcsNeftComponent implements OnInit {
  escneftData!:ECS_NEFT;
  constructor(private tokenServce: TokenService,public billservice: BillService,private toastservice: ToastService) {}

  ngOnInit(): void {
    this.getECSNEFTData();
  }
  getECSNEFTData(){
    this.billservice.getECSNEFTDetils(this.tokenServce.selectedId).subscribe((responese)=>{
      if(responese.apiResponseStatus==1){
        this.escneftData=responese.result;
        return;
      }
      this.toastservice.showAlert(responese.message,responese.apiResponseStatus);
    })
  }
}
