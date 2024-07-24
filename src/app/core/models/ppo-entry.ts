export interface ppoEntry{
    ppoNo: String;
    pensionerName: String;
    type: String;
    subType: String;
    catDescription: String;
    catSubCatid: String;
    retirementDate: String;
    dateOfDeath: String;
    commencementDate: String;
    basic: String;
    commutedPension: String;
    effectiveDate: String;
    reducedPension: String;
    epf: String;
    upto:string;
    familyPension: String;
    religionPension: String;
    firstPensionGenerated: 'Y' | 'N';
    mobileNo:String;
    aadharNo:String;
    panNo:String;
    healthScheme: 'Y' | 'N';
    gpfTpfNo:String;
    subDiv:String;
    doublePension:string;
    employedPensioner: 'Y' | 'N';
    reEmployed: 'Y' | 'N';
    address:String;
    remarks:String;
    adhocPension: 'T' | 'F';
    provisionalPension: 'T' | 'F';
    interimAllowance: 'T' | 'F';
    sharedPension: 'T' | 'F';

    //BankDetails 
  
    payMode: 'treasury' | 'bank';
    bankBranchName: string;
    accountNo: string;
    accountHolder: string;
    ifscCode: string;

    //from for sanction
    nameOfServiceHolder: string;
    sanctionAuthority:string;
    sanctionNo:string;
    sanctionDate:string;
    dateOfBirth:string;
    gender: string;
    dateOfAppointment:string;
    officeName:string;
    postHeld:string;
    officeName1:string;
    lastPay:string;
    averageAmolument:string;
    hrmsUniqueIdOfServiceHolder:string;
    issuingAuthority:string;
    letterNo:string;
    letterDate:string;

    grossYear:string;
    grossMonth:string;
    grossDay:string;
    netYear:string;
    netMonth:string;
    netDay:string;

    //Family Nominee Form
    slNo:string;
    dependentName:string;
    relationship:string;
    dateOfBirthFamilyDetails:string;
    dateOfDeath1:string;
    identificationMark:string;
    handicap: 'True' | 'False';

    //showNomineeDetailsFrom
    slNo1:string;
    dependentName1:string;
  



}