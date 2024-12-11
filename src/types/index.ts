export interface Scheme {
    name: string;
    description: string;
    interestRate: string;
    minDeposit: string;
    maxDeposit: string;
    maturityPeriod: string;
  }
  
  export interface DemographicStats {
    total: number;
    change: number;
    label: string;
  }
  
  export interface RegionData {
    name: string;
    female: number;
    senior: number;
    children: number;
  }
  
  export interface Product {
    name: string;
    match: number;
    description: string;
    targetAudience: string[];
    features: string[];
  }
  
  export interface Event {
    name: string;
    priority: 'High' | 'Medium' | 'Low';
    location: string;
    timing: string;
    target: string;
    expectedSuccess: string;
  }