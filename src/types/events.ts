export type EventType = 'Mela' | 'Campaign' | 'Workshop';
export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type TagType = 'Male' | 'Female' | 'Minor' | 'Youth' | 'Student' | 'Senior Citizen' | 'Women' | 'Farmer' | 'Employed' | 'Unemployed';

export interface Tag {
  label: TagType;
  color?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  location: string;
  date: string;
  target: string;
  scheme: string;
  priority: PriorityLevel;
  eventType: EventType;
}

export interface EventFilters {
  search: string;
  eventType: EventType | null;
  priority: PriorityLevel | null;
  tags: TagType[];
}
