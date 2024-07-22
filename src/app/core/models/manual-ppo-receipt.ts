export interface manualPpoReceiptEntryDTO {
    ppoNo: string;
    pensionerName?: string;
    dateOfCommencement: string; 
    mobileNumber?: string;
    receiptDate: string; 
    psaCode: 'A' | 'D' | 'O'; 
    ppoType: 'N' | 'R' | 'P' | 'O';
    
}

  
