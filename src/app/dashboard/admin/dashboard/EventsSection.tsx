'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Plus, 
  ChevronDown,
  Calendar,
  MapPin,
  Users,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Event, EventType, PriorityLevel, TagType, EventFilters } from '@/types/events';

const EVENT_TYPES: EventType[] = ['Mela', 'Campaign', 'Workshop'];
const PRIORITY_LEVELS: PriorityLevel[] = ['High', 'Medium', 'Low'];
const TAGS: TagType[] = [
  'Male', 'Female', 'Minor', 'Youth', 'Student', 
  'Senior Citizen', 'Women', 'Farmer', 'Employed', 'Unemployed'
];

export default function EventsSection() {
  const router = useRouter();
  const [filters, setFilters] = useState<EventFilters>({
    search: '',
    eventType: null,
    priority: null,
    tags: []
  });

  const events: Event[] = [
    {
      id: '1',
      title: 'SSA & MSSC Mela',
      description: 'A comprehensive mela focusing on SSA and MSSC schemes',
      tags: [
        { label: 'Women' },
        { label: 'Student' },
        { label: 'Youth' }
      ],
      location: 'Kolkata North District',
      date: '2024-03-15 at 10:00',
      target: 'Target: 2000 families',
      scheme: 'SSA & MSSC Schemes',
      priority: 'High',
      eventType: 'Mela'
    },
    {
      id: '2',
      title: 'SCSS Awareness Campaign',
      description: 'Awareness campaign for Senior Citizen Savings Scheme',
      tags: [
        { label: 'Senior Citizen' },
        { label: 'Male' },
        { label: 'Female' }
      ],
      location: 'Howrah District',
      date: '2024-03-20 at 11:00',
      target: 'Target: 1000 families',
      scheme: 'SCSS',
      priority: 'Medium',
      eventType: 'Campaign'
    }
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = !filters.search || 
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.search.toLowerCase());

      const matchesEventType = !filters.eventType || event.eventType === filters.eventType;
      const matchesPriority = !filters.priority || event.priority === filters.priority;
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.some(tag => event.tags.some(eventTag => eventTag.label === tag));

      return matchesSearch && matchesEventType && matchesPriority && matchesTags;
    });
  }, [events, filters]);

  const handleCreateEvent = () => {
    router.push('/events');
  };

  const handleSchemeClick = (scheme: string) => {
    router.push('dashboard/admin/events');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Header Section */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Events</h2>
            <p className="text-gray-600 mt-1">Manage and track all your events in one place</p>
          </div>
          <button
            onClick={handleCreateEvent}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            <Plus size={20} />
            Create New Event
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events by title, description, or location..."
              className="w-full pl-12 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-white/80 transition-colors bg-white shadow-sm">
                <Filter size={18} />
                Filters
                <ChevronDown size={14} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                className="bg-white rounded-lg shadow-lg border w-[280px] z-[9999] overflow-hidden"
                sideOffset={4}
                align="end"
                side="bottom"
                avoidCollisions={true}
                sticky="always"
                style={{
                  position: 'relative',
                  transform: 'none'
                }}
              >
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="sticky top-0 bg-white px-4 py-3 border-b">
                    <h3 className="font-medium text-sm text-gray-600">Filters</h3>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm text-gray-600 mb-2">Event Type</h3>
                    <div className="space-y-1">
                      {EVENT_TYPES.map(type => (
                        <label key={type} className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                          <input
                            type="radio"
                            checked={filters.eventType === type}
                            onChange={() => setFilters(prev => ({ ...prev, eventType: type }))}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{type}</span>
                        </label>
                      ))}
                      <label className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                        <input
                          type="radio"
                          checked={filters.eventType === null}
                          onChange={() => setFilters(prev => ({ ...prev, eventType: null }))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">All Types</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t px-4 py-3">
                    <h3 className="font-medium text-sm text-gray-600 mb-2">Priority</h3>
                    <div className="space-y-1">
                      {PRIORITY_LEVELS.map(priority => (
                        <label key={priority} className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                          <input
                            type="radio"
                            checked={filters.priority === priority}
                            onChange={() => setFilters(prev => ({ ...prev, priority: priority }))}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{priority}</span>
                        </label>
                      ))}
                      <label className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                        <input
                          type="radio"
                          checked={filters.priority === null}
                          onChange={() => setFilters(prev => ({ ...prev, priority: null }))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">All Priorities</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t px-4 py-3">
                    <h3 className="font-medium text-sm text-gray-600 mb-2">Tags</h3>
                    <div className="grid grid-cols-1 gap-1">
                      {TAGS.map(tag => (
                        <label key={tag} className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={filters.tags.includes(tag)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters(prev => ({ ...prev, tags: [...prev.tags, tag] }));
                              } else {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  tags: prev.tags.filter(t => t !== tag)
                                }));
                              }
                            }}
                            className="text-blue-600 focus:ring-blue-500 rounded"
                          />
                          <span className="text-gray-700">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Events List */}
      <div className="p-6 space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                event.priority === 'High' ? 'bg-red-100 text-red-800' :
                event.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {event.priority} Priority
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  <Tag size={14} />
                  {tag.label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                {event.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                {event.target}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <button 
                onClick={() => handleSchemeClick(event.scheme)}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group"
              >
                View Details
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Edit size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                  <Trash size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
