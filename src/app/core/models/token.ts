import { HoaChain } from "./hoa-chain";

export interface newToken{
    billId: Number,
    physicalBillDate : string,
    remarks: string
}

export interface tokenDetails{
    tokenId:number,
    tokenNumber: Number,
    tokenDate: Date,
    currentStatus:string,
    currentStatusSlug:string,
    financialYear: string,
    referenceNo: string,
    ddoCode: string
}
export interface tokenPrint{
    tokenNumber: Number,
    tokenDate: Date,
    billNo:number,
    billDate:Date,
    ddoCode:string,
    payeeDept:string,
    hoaChain: HoaChain,
    grossAmount: number;
    netAmount: number;
}