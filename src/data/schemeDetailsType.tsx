export interface SchemeDetails {
    id: string;
    name: string;
    icon: string;
    description: string;
    tags: string[];
    parameters: {
      interestRate: string;
      minimumDeposit: string;
      maximumDeposit: string;
      tenure: string;
      eligibility: string;
      taxBenefits: string;
      prematureWithdrawal: string;
      accountType: string;
    };
  }
  
  export interface SchemeComparison {
    scheme1: SchemeDetails;
    scheme2: SchemeDetails;
  }
  
  export interface KeyDifference {
    parameter: string;
    description: string;
    icon: string;
  }
  