import { SchemeDetails } from "./schemeDetailsType"

export const schemeDetails: Record<string, SchemeDetails> = {
  'savings': {
    id: 'savings',
    name: 'Post Office Savings Account (SB)',
    icon: 'piggy-bank',
    description: 'A basic savings account offering 4.0% per annum interest with minimal deposit requirements and various banking facilities.',
    tags: ['Basic Savings', 'Banking', 'ATM'],
    parameters: {
      interestRate: '4.0% per annum',
      minimumDeposit: '₹500 (subsequent deposits min ₹10)',
      maximumDeposit: 'No limit',
      tenure: 'No fixed tenure',
      eligibility: 'Single adult, Joint (2 adults), Minor through guardian',
      taxBenefits: 'Interest up to ₹10,000 exempt u/s 80TTA',
      prematureWithdrawal: 'Allowed, min ₹50',
      accountType: 'Single/Joint'
    }
  },
  'nsc': {
    id: 'nsc',
    name: 'National Savings Certificates (NSC)',
    icon: 'certificate',
    description: '5-year investment scheme offering compound interest with tax benefits under Section 80C.',
    tags: ['Tax Saving', 'Fixed Return', 'Government Backed'],
    parameters: {
      interestRate: '7.7% compounded annually',
      minimumDeposit: '₹1,000 (multiples of ₹100)',
      maximumDeposit: 'No Maximum Limit',
      tenure: '5 years',
      eligibility: 'Single adult, Joint (up to 3 adults), Minor above 10 years',
      taxBenefits: 'Eligible for Section 80C deduction',
      prematureWithdrawal: 'Only on death/court order/forfeiture',
      accountType: 'Certificate Investment'
    }
  },
  'kvp': {
    id: 'kvp',
    name: 'Kisan Vikas Patra (KVP)',
    icon: 'sprout',
    description: 'Investment doubles in 115 months with 7.5% compound interest rate.',
    tags: ['Investment', 'Doubling Scheme', 'Rural Focus'],
    parameters: {
      interestRate: '7.5% compounded annually',
      minimumDeposit: '₹1,000 (multiples of ₹100)',
      maximumDeposit: 'No Maximum Limit',
      tenure: '115 months (9 years 7 months)',
      eligibility: 'Single adult, Joint (up to 3 adults), Minor above 10 years',
      taxBenefits: 'No specific tax benefits',
      prematureWithdrawal: 'After 2.5 years',
      accountType: 'Investment Certificate'
    }
  },
  'mssc': {
    id: 'mssc',
    name: 'Mahila Samman Savings Certificate',
    icon: 'user-heart',
    description: 'Special savings scheme for women with quarterly compound interest.',
    tags: ['Women Focused', 'Short Term', 'High Interest'],
    parameters: {
      interestRate: '7.5% per annum (quarterly compound)',
      minimumDeposit: '₹1,000 (multiples of ₹100)',
      maximumDeposit: '₹2 lakh across all accounts',
      tenure: '2 years',
      eligibility: 'Women and minor girls only',
      taxBenefits: 'Interest taxable',
      prematureWithdrawal: 'After 6 months (reduced interest)',
      accountType: 'Women Savings'
    }
  },
  'ppf': {
    id: 'ppf',
    name: 'Public Provident Fund (PPF)',
    icon: 'shield',
    description: 'Long-term savings scheme with tax benefits and compound interest.',
    tags: ['Tax Saving', 'Long Term', 'Government Backed'],
    parameters: {
      interestRate: '7.1% per annum (compounded yearly)',
      minimumDeposit: '₹500 per year',
      maximumDeposit: '₹1,50,000 per financial year',
      tenure: '15 years',
      eligibility: 'Resident Indians only, one account per person',
      taxBenefits: 'EEE status, Section 80C benefits',
      prematureWithdrawal: 'Partial withdrawal after 7 years',
      accountType: 'Long Term Savings'
    }
  },
  'rd': {
    id: 'rd',
    name: 'National Savings Recurring Deposit (RD)',
    icon: 'refresh-cw',
    description: 'A 5-year recurring deposit scheme with 6.7% interest rate, ideal for regular monthly savings.',
    tags: ['Monthly Deposits', 'Long Term', 'Compounding'],
    parameters: {
      interestRate: '6.7% per annum (quarterly compounded)',
      minimumDeposit: '₹100 per month',
      maximumDeposit: 'No limit',
      tenure: '5 years',
      eligibility: 'Single adult, Joint (up to 3 adults), Minor',
      taxBenefits: 'No specific tax benefits',
      prematureWithdrawal: 'After 3 years',
      accountType: 'Recurring Deposit'
    }
  },
  'td': {
    id: 'td',
    name: 'Post Office Time Deposit (TD)',
    icon: 'clock',
    description: 'Fixed deposit scheme with multiple tenure options and competitive interest rates up to 7.5%.',
    tags: ['Fixed Deposit', 'Flexible Tenure', 'Tax Saving'],
    parameters: {
      interestRate: '6.9% to 7.5% based on tenure',
      minimumDeposit: '₹1,000',
      maximumDeposit: 'No limit',
      tenure: '1/2/3/5 years',
      eligibility: 'Single adult, Joint (up to 3 adults), Minor',
      taxBenefits: '5-year TD qualifies for 80C',
      prematureWithdrawal: 'After 6 months',
      accountType: 'Fixed Deposit'
    }
  },
  'mis': {
    id: 'mis',
    name: 'Monthly Income Scheme (MIS)',
    icon: 'calendar',
    description: 'Regular monthly income scheme with 7.4% annual interest, ideal for steady income needs.',
    tags: ['Monthly Income', 'Regular Returns', 'Senior Friendly'],
    parameters: {
      interestRate: '7.4% per annum (monthly payout)',
      minimumDeposit: '₹1,000',
      maximumDeposit: '₹9 lakh (single) / ₹15 lakh (joint)',
      tenure: '5 years',
      eligibility: 'Single adult, Joint (up to 3 adults), Minor',
      taxBenefits: 'Interest is taxable',
      prematureWithdrawal: 'After 1 year with penalty',
      accountType: 'Income Scheme'
    }
  },
  'scss': {
    id: 'scss',
    name: 'Senior Citizens Savings Scheme (SCSS)',
    icon: 'user',
    description: 'High-yield savings scheme for senior citizens with 8.2% annual interest and quarterly payouts.',
    tags: ['Senior Citizens', 'High Interest', 'Quarterly Payout'],
    parameters: {
      interestRate: '8.2% per annum (quarterly payout)',
      minimumDeposit: '₹1,000',
      maximumDeposit: '₹30 lakh',
      tenure: '5 years',
      eligibility: 'Age 60+ or 55+ (retired)',
      taxBenefits: 'Qualifies for 80C, TDS applicable',
      prematureWithdrawal: 'Allowed with penalty',
      accountType: 'Senior Citizens Special'
    }
  },
  'ssa': {
    id: 'ssa',
    name: 'Sukanya Samriddhi Account (SSA)',
    icon: 'graduation-cap',
    description: 'Special savings scheme for girl child with high interest rate of 8.2% and tax benefits.',
    tags: ['Girl Child', 'Education', 'Tax Benefits'],
    parameters: {
      interestRate: '8.2% per annum (yearly compound)',
      minimumDeposit: '₹250',
      maximumDeposit: '₹1.5 lakh per year',
      tenure: '21 years or marriage after 18',
      eligibility: 'Girl child below 10 years',
      taxBenefits: 'Tax free interest, 80C benefit',
      prematureWithdrawal: 'After 5 years in special cases',
      accountType: 'Girl Child Savings'
    }
  },
  'pmcares': {
    id: 'pmcares',
    name: 'PM CARES for Children Scheme',
    icon: 'heart-handshake',
    description: 'Special scheme for children who lost their parents/guardians to COVID-19 pandemic, providing financial support and education assistance.',
    tags: ['COVID Relief', 'Child Welfare', 'Government Support'],
    parameters: {
      interestRate: 'As per Monthly Income Scheme on ₹10 lakh',
      minimumDeposit: 'Lump-sum contribution from PM CARES Fund',
      maximumDeposit: '₹10 lakh at age 18',
      tenure: 'Until age 23',
      eligibility: 'Children who lost parents/guardians to COVID-19 between 11.03.2020 to 28.02.2022',
      taxBenefits: 'Not Applicable',
      prematureWithdrawal: 'Not Applicable',
      accountType: 'Joint with District Magistrate until age 18'
    }
  }
};

export const keyDifferences = [
  {
    parameter: 'Interest Rate Range',
    description: 'Varies from 4.0% (Savings) to 8.2% (SSA/SCSS)',
    icon: 'percent'
  },
  {
    parameter: 'Investment Term',
    description: 'From no fixed term (Savings) to 21 years (SSA)',
    icon: 'clock'
  },
  {
    parameter: 'Deposit Flexibility',
    description: 'From regular deposits to special lump-sum contributions',
    icon: 'wallet'
  },
  {
    parameter: 'Target Audience',
    description: 'General public, Women (MSSC), Children (SSA), Seniors (SCSS)',
    icon: 'users'
  },
  {
    parameter: 'Account Operation',
    description: 'Single, Joint, or Special Guardian',
    icon: 'users-2'
  },
  {
    parameter: 'Tax Benefits',
    description: 'From basic exemption to complete EEE status (PPF)',
    icon: 'landmark'
  },
  {
    parameter: 'Withdrawal Rules',
    description: 'Flexible (Savings) to Age-restricted (SSA)',
    icon: 'lock'
  },
  {
    parameter: 'Interest Compounding',
    description: 'Annual, Quarterly, or Special Terms',
    icon: 'refresh-cw'
  },
  {
    parameter: 'Special Features',
    description: 'From basic savings to specialized welfare schemes',
    icon: 'star'
  }
];
