export interface ChequeList {
  series: string,
  start: number,
  end: number,
  quantity: number
}
export interface ChequeIndentList {
  id: number,
  indentId: number,
  indentDate: string,
  memoNo: string,
  memoDate: string,
  remarks: string,
  currentStatus: string,
  currentStatusId: number
}
export interface NewChequeEntry {
  series: string,
  start: number,
  end: number,
  treasurieCode: string,
  micrCode: string
}

export interface chequeIndent {
  indentId?: number;
  indentDate: string
  memoNumber: string
  memoDate: string
  remarks: string
  treasurieCode?: string
  chequeIndentDeatils: ChequeIndentDeatil[]
}


export interface ChequeIndentDeatil {
  indentDeatilsId?: number;
  chequeType: number
  micrCode: string
  quantity: number
}

export interface Serieslist {
  name: string;
  code: Number;
}
export interface IndentInvoiceDetails {
  chequeIndentId: number,
  invoiceDate: string,
  invoiceNumber: string,
  chequeInvoiceDeatils: InvoiceDetails[]

}
export interface InvoiceDetails {
  micrCode: string,
  quantity: number
}



export interface micrDetails {
  treasurieCode: string;
  micrCode: string;
  series: string;
  quantity: number;
  availableQuantity: number;
}

export interface invoiceDetailsList{
  id: number,
  quantity: number;
  chequeInvoiceSeries: ChequeInvoiceSeries[];
}

export interface ChequeInvoiceSeries{
  
invoiceDeatilsId : number,
quantity : number ,
series: string,
treasuryCode: string,
micrCode: string
}
