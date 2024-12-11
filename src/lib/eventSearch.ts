export interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    datetime: string;
    target: string;
    scheme: string;
    status: 'ongoing' | 'completed' | 'upcoming';
    type: 'mela' | 'campaign' | 'workshop';
    tags: string[];
  }
  
  export const DUMMY_EVENTS: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      description: 'This is the first event.',
      location: 'New Delhi',
      datetime: '2024-03-16 10:00:00',
      target: 'Youth',
      scheme: 'Skill Development',
      status: 'upcoming',
      type: 'workshop',
      tags: ['Youth', 'Skill Development', 'Workshop']
    },
    {
      id: '2',
      title: 'Event 2',
      description: 'This is the second event.',
      location: 'Mumbai',
      datetime: '2024-03-17 11:00:00',
      target: 'Women',
      scheme: 'Empowerment',
      status: 'ongoing',
      type: 'campaign',
      tags: ['Women', 'Empowerment', 'Campaign']
    },
    {
      id: '3',
      title: 'Event 3',
      description: 'This is the third event.',
      location: 'Bangalore',
      datetime: '2024-03-18 12:00:00',
      target: 'Senior Citizen',
      scheme: 'Healthcare',
      status: 'completed',
      type: 'mela',
      tags: ['Senior Citizen', 'Healthcare', 'Mela']
    }
  ];
  
  interface EventSearchFilters {
    searchTerm: string;
    type?: 'all' | 'mela' | 'campaign' | 'workshop';
    status?: 'all' | 'ongoing' | 'completed' | 'upcoming';
    tags?: string[];
  }
  
  export const searchEvents = ({
    searchTerm,
    type = 'all',
    status = 'all',
    tags = []
  }: EventSearchFilters): Event[] => {
    return DUMMY_EVENTS.filter(event => {
      // Search term matching
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
  
      // Type matching - return true if type is 'all' or matches event type
      const matchesType = type === 'all' || event.type === type;
  
      // Status matching - return true if status is 'all' or matches event status
      const matchesStatus = status === 'all' || event.status === status;
  
      // Tags matching - return true if no tags selected or any selected tag matches
      const matchesTags = tags.length === 0 || tags[0] === '' || tags.some(tag => event.tags.includes(tag));
  
      return matchesSearch && matchesType && matchesStatus && matchesTags;
    });
  };
  