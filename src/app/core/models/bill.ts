import { BeneficiaryDetails } from "./beneficiary";

export interface IBills {
  billId: number;
  referenceNo?: string | null;
  ddoCode?: string | null;
  ddoDesignation?: string | null;
  billNo?: string | null;
  billDate?: Date | null;
  grossAmount: number,
  netAmount: number,
  hoaChain: HoaChain
}
export interface BillInfo {
  target: string;
}
export interface IOnlineBillDetailsRefNo {
  billDetailsDetails: any;
  ddoCode: string;
  referenceNo: string;
  billNo: string;
  billdate: Date;
  billType: number;
  billSubType: string;
  physicalBillDate: string;
  ddoCodeNo: string; //REMOVE THIS
  ddoDesignation: string;
  payeeDepartment: string;
  hoa: string;
  transferAmount: number;
  grossAmount: number;
  netAmount: number;
}

export interface HoaChain {
  demand: string;
  majorHead: string;
  subMajorHead: string;
  minorHead: string;
  schemeHead: string;
  votedCharged: string;
  detailHead: string;
  subDetailHead: string;
}
export interface subDeatilsHead {
  subDeatils: string;
  description: string;
  amount: number;
  // allotment: IAllotment;
}
export interface subDeatilsHeadWithTotal {
  subDeatils: subDeatilsHead[];
  Total: number;
}
interface IAllotment {
  hoaChain: {
    demand: string;
    majorHead: string;
    subMajorHead: string;
    minorHead: string;
    schemeHead: string;
    votedCharged: string;
    detailHead: string;
    subDetailHead: string;
  };
  allotmentAmount: number;
  previousBalance: number;
  adjustedAmount: number;
  balanceAmount: number;
  subDetailHead: string;
  overDrawalAmount: number;
  finalProjectDetails: string;
}
interface TokenDetails {
  tokenNumber: number;
  tokenDate: string;
  referenceNo: string;
  status: string;
}

interface BillDetails {
  ddoCode: string;
  referenceNo: string;
  billNo: string;
  billDate: string;
  billType: number;
  billSubType: string;
  ddoDesignation: string;
  payeeDepartment: string;
  hoaChain: HoaChain;
  subDeatilsHead: subDeatilsHead[];
  subDeatilsTotalAmount: number;
  transferAmount: number;
  grossAmount: number;
  netAmount: number;
  agBTAmount: number;
  treasuryBTAmount: number;
  totalBTAmount: number;
  sanctionNo: string;
  sanctionDate: string
}
export interface IBillDetails {
  tokenDetails: TokenDetails;
  billDetailsDetails: BillDetails;
}
export interface AllotmentDetails {
  allotmentId: number,
  hoa: HoaChain,
  ceilingAmount: number,
  actualBalanceAmount: number,
  bookedAmount: number
}
export interface ECS_NEFT {
  billNo: string;
  billDate: string;
  grossAmount: number;
  netAmount: number;
  chequeAmount: number;
  payMode: string;
  noOfBeneficiarys: number;
  beneficiarys: BeneficiaryDetails[];
}
export interface ByTransfer {
  btSerial: number;
  hoa: string;
  desc: string;
  type: string;
  amount: number;
}

export interface ByTransferDetails {
  billBtAmount: number;
  availableBtAmount: number;
  billNetAmount: number;
  totalByTransfersAmount:number;
  byTransfers: ByTransfer[];
}
export interface IChequeDetails {
    billNo?: string;
    billDate?: string;
    grossAmount?: number;
    netAmount?: number;
    chequeAmount?: number;
    payMode?: string;
    totalBeneficiaryAmount?: number;
    chequeDetails: IChequeList[];
}

export interface IChequeList {
    payeeName: string;
    amount: number;
    chequeType: string;
}

export interface IBillCheck {
  tokenId: number;
  referenceNo: string;
  billObjections?: {
    globalObjections?: ISelectedObjection[];
    localObjections?: ISelectedObjection[];
  };
  overruledObjections?: ISelectedObjectionsForOverrule[];
}
export interface ISelectedObjectionsForOverrule {
  tokenObjectionId?: number;
  remark?: string;
}
export interface ISelectedObjection {
  id?: number,
  description: string,
  remark?: string
  exiestObjectionId?: number,
  isOverruled?: boolean,
  OverruledBy?: string,
  overruledRemark?: string,
  objectionType?: string,
  objectionBy?: string,
}

export interface IRetunMemoBillDetils {
  tokenId: number,
  tokenNumber: number,
  tokenDate: string,
  billNo: string,
  billDate: string,
  ddoCode: string,
  hoaChain: HoaChain,
  grossAmount: number,
  netAmount: number
}
export interface IReturnMemoCount {
  generatedReturnMemo: number,
  awatingReturnMemo: number
}
