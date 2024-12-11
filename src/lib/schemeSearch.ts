export interface Scheme {
    id: string;
    name: string;
    details: string;
    tags: string[];
    likes?: number;
  }
  
  export const DUMMY_LIKED_SCHEMES: Scheme[] = [
    {
      id: '1',
      name: 'Sukanya Samriddhi Account (SSA)',
      details: 'A savings scheme for the girl child, offering high interest rates and tax benefits, with funds accessible after maturity or for educational purposes.',
      tags: ['Girl Child', 'Education', 'Tax Benefits'],
      likes: 92
    },
    {
      id: '2',
      name: 'PM CARES for Children Scheme, 2021',
      details: 'Provides financial assistance, scholarships, and healthcare for children orphaned due to COVID-19.',
      tags: ['COVID-19', 'Healthcare', 'Education'],
      likes: 67
    },
    {
      id: '3',
      name: 'Post Office Savings Account (SB)',
      details: 'A basic savings account offered by the post office with attractive interest rates and low minimum balance requirements.',
      tags: ['Basic Account', 'Low Balance', 'Interest']
    }
  ];
  
  interface SchemeSearchFilters {
    searchTerm: string;
    tags?: string[];
    minLikes?: number;
  }
  
  export const searchSchemes = ({
    searchTerm,
    tags = [],
    minLikes = 0
  }: SchemeSearchFilters): Scheme[] => {
    return DUMMY_LIKED_SCHEMES.filter(scheme => {
      const matchesSearch = 
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.details.toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchesTags = tags.length === 0 || tags.some(tag => scheme.tags.includes(tag));
      const matchesLikes = !scheme.likes || scheme.likes >= minLikes;
  
      return matchesSearch && matchesTags && matchesLikes;
    });
  };
  