export interface newToken{
    billId: Number,
    physicalBillDate : string,
    remarks: string
}

export interface tokenDetails{
    tokenId:number,
    tokenNumberr: Number,
    tokenDate: Date,
    currentStatus:string,
    currentStatusSlug:string,
    financialYear: string,
    referenceNo: string,
    ddoCode: string
}