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