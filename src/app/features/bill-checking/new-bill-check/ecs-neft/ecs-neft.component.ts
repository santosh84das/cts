import { Component, OnInit } from '@angular/core';
import { basicDynamicTable } from 'src/app/core/models/basic-dynamic-table';
import { BeneficiaryDetails } from 'src/app/core/models/beneficiary';
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
  escneftData!: ECS_NEFT;
  escneftTable: basicDynamicTable = {
    header: [],
    data: [],
  }
  constructor(private tokenServce: TokenService, public billservice: BillService, private toastservice: ToastService) { }

  ngOnInit(): void {
    this.getECSNEFTData();
    this.escneftTable.header = [
      { name: '#', key: '#' },
      { name: 'Beneficiary Name', key: 'beneficiaryName' },
      { name: 'Beneficiary Code', key: 'beneficiaryCode' },
      { name: 'Bank\'s IFSC Code', key: 'ifscCode' },
      { name: 'Bank Name', key: 'bankName' },
      { name: 'Account Number', key: 'accountNumber' },
      { name: 'E-Mail', key: 'eMail' },
      { name: 'Contact No.', key: 'contactNo' },
      { name: 'Amount(in Rs)', key: 'amount' },
      { name: 'Payee Type', key: 'payeeType' },
    ]
  }
  getECSNEFTData() {
    this.billservice.getECSNEFTDetils(this.tokenServce.selectedId).subscribe((responese) => {
      if (responese.apiResponseStatus == 1) {
        this.escneftData = responese.result;
        this.escneftTable.data = this.escneftData.beneficiarys.map((beneficiary: BeneficiaryDetails) => {
          return {
            beneficiaryName: beneficiary.beneficiaryName,
            beneficiaryCode: beneficiary.beneficiaryCode,
            ifscCode: beneficiary.ifscCode,
            bankName: beneficiary.bankName,
            accountNumber: beneficiary.accountNumber,
            eMail: beneficiary.eMail,
            contactNo: beneficiary.contactNo,
            amount: beneficiary.amount,
            payeeType: beneficiary.payeeType,
          }
        });
        return;
      }
      this.toastservice.showAlert(responese.message, responese.apiResponseStatus);
    })
  }
}
