import { 
    LucideIcon, 
    Wallet, 
    Landmark, 
    Clock, 
    CalendarClock, 
    Users, 
    PiggyBank,
    GraduationCap,
    ScrollText,
    Sprout,
    UserCircle,
    Heart,
    IndianRupee,
    Umbrella,
    Leaf,
    CreditCard
  } from 'lucide-react';
  
  export interface Scheme {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    category: string;
    tags: string[];
  }
  
  export const schemes: Scheme[] = [
    {
      id: 'sb',
      name: 'Post Office Savings Account (SB)',
      description: 'A basic savings account offered by the post office with attractive interest rates and low minimum balance requirements.',
      icon: Wallet,
      category: 'Savings',
      tags: ['Basic Account', 'Low Balance', 'Interest']
    },
    {
      id: 'rd',
      name: 'National Savings Recurring Deposit Account (RD)',
      description: 'A recurring deposit scheme with a tenure of 5 years, offering guaranteed returns and interest compounded quarterly.',
      icon: Landmark,
      category: 'Savings',
      tags: ['5 Years', 'Recurring', 'Guaranteed Returns']
    },
    {
      id: 'td',
      name: 'National Savings Time Deposit Account (TD)',
      description: 'Fixed deposit scheme with tenures of 1, 2, 3, or 5 years, offering higher interest rates for longer terms.',
      icon: Clock,
      category: 'Savings',
      tags: ['Fixed Deposit', 'Flexible Terms', 'High Interest']
    },
    {
      id: 'mis',
      name: 'National Savings Monthly Income Scheme Account (MIS)',
      description: 'Designed for regular monthly income, suitable for retirees and those seeking stable income.',
      icon: CalendarClock,
      category: 'Savings',
      tags: ['Monthly Income', 'Retirement', 'Stable Returns']
    },
    {
      id: 'scss',
      name: 'Senior Citizen Savings Scheme (SCSS)',
      description: 'Exclusively for individuals aged 60 and above, offering attractive interest rates and tax benefits.',
      icon: Users,
      category: 'Senior Citizens',
      tags: ['60+ Age', 'Tax Benefits', 'High Interest']
    },
    {
      id: 'ppf',
      name: 'Public Provident Fund (PPF) Account',
      description: 'A long-term savings scheme with a tenure of 15 years, offering tax-exempt returns and a high degree of safety.',
      icon: PiggyBank,
      category: 'Savings',
      tags: ['15 Years', 'Tax Exempt', 'Safe Investment']
    },
    {
      id: 'ssa',
      name: 'Sukanya Samriddhi Account (SSA)',
      description: 'A savings scheme for the girl child, offering high interest rates and tax benefits, with funds accessible after maturity or for educational purposes.',
      icon: GraduationCap,
      category: 'Children',
      tags: ['Girl Child', 'Education', 'Tax Benefits']
    },
    {
      id: 'nsc',
      name: 'National Savings Certificates (NSC)',
      description: 'A secure investment option with fixed returns and tax savings, typically suited for long-term wealth building.',
      icon: ScrollText,
      category: 'Savings',
      tags: ['Fixed Returns', 'Tax Savings', 'Long Term']
    },
    {
      id: 'kvp',
      name: 'Kisan Vikas Patra (KVP)',
      description: 'A savings instrument that doubles your investment in a fixed period, based on the applicable interest rate.',
      icon: Sprout,
      category: 'Agriculture',
      tags: ['Farmers', 'Double Investment', 'Fixed Period']
    },
    {
      id: 'msc',
      name: 'Mahila Samman Savings Certificate, 2023',
      description: 'A special savings scheme for women, offering fixed deposits with attractive returns.',
      icon: UserCircle,
      category: 'Savings',
      tags: ['Women', 'Fixed Deposit', 'Special Returns']
    },
    {
      id: 'pmcares',
      name: 'PM CARES for Children Scheme, 2021',
      description: 'Provides financial assistance, scholarships, and healthcare for children orphaned due to COVID-19.',
      icon: Heart,
      category: 'Children',
      tags: ['COVID-19', 'Healthcare', 'Education']
    },
    {
      id: 'pmkisan',
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      description: 'Offers direct financial support of ₹6,000 per year to small and marginal farmers in three instalments.',
      icon: IndianRupee,
      category: 'Agriculture',
      tags: ['Farmers', 'Direct Support', 'Instalments']
    },
    {
      id: 'pmfby',
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'A crop insurance scheme offering protection against crop loss due to natural disasters, pests, and diseases.',
      icon: Umbrella,
      category: 'Insurance',
      tags: ['Crop Insurance', 'Natural Disasters', 'Protection']
    },
    {
      id: 'shc',
      name: 'Soil Health Card Scheme (SHC)',
      description: 'Promotes sustainable agriculture by providing farmers with soil health reports and recommendations for crop nutrients.',
      icon: Leaf,
      category: 'Agriculture',
      tags: ['Soil Health', 'Sustainable', 'Recommendations']
    },
    {
      id: 'kcc',
      name: 'Kisan Credit Card (KCC)',
      description: 'Provides short-term credit to farmers for agricultural needs at low-interest rates with flexible repayment options.',
      icon: CreditCard,
      category: 'Agriculture',
      tags: ['Credit Card', 'Low Interest', 'Flexible Repayment']
    }
  ];