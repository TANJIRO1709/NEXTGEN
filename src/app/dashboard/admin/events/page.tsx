'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, TrendingUp, Plus, Eye, Building2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventFormDialog from './EventFormDialog';
import type { EventFormData } from './EventFormDialog'
import DeleteEventDialog from './DeleteEventDialog';
import ViewEventDialog from './ViewEventDialog';
import { DashboardLayout } from '../../user/DashboardLayout';
import { motion } from 'framer-motion';

interface Event {
  id: number;
  heading: string;
  description: string;
  targetFamilies: number;
  schemeDetails: string;
  address: string;
  date: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  type: 'Mela' | 'Campaign' | 'Workshop';
  createdAt: Date;
  selectedTags: string[];
}

const initialEvents: Event[] = [
  {
    id: 1,
    heading: 'SSA & MSSC Mela',
    description: 'A comprehensive mela focusing on SSA and MSSC schemes',
    targetFamilies: 2000,
    schemeDetails: 'SSA & MSSC Schemes',
    address: 'Kolkata North District',
    date: '2024-03-15',
    time: '10:00',
    priority: 'High',
    status: 'Upcoming',
    type: 'Mela',
    createdAt: new Date('2024-02-01'),
    selectedTags: ['Women', 'Student', 'Youth']
  },
  {
    id: 2,
    heading: 'SCSS Awareness Campaign',
    description: 'Awareness campaign for Senior Citizen Savings Scheme',
    targetFamilies: 1000,
    schemeDetails: 'SCSS',
    address: 'Howrah District',
    date: '2024-03-20',
    time: '11:00',
    priority: 'Medium',
    status: 'Ongoing',
    type: 'Campaign',
    createdAt: new Date('2024-01-25'),
    selectedTags: ['Senior Citizen', 'Male', 'Female']
  },
  {
    id: 3,
    heading: 'Digital Banking Workshop',
    description: 'A workshop on digital banking for senior citizens',
    targetFamilies: 500,
    schemeDetails: 'Digital Banking',
    address: 'North 24 Parganas',
    date: '2024-04-01',
    time: '12:00',
    priority: 'Low',
    status: 'Upcoming',
    type: 'Workshop',
    createdAt: new Date('2024-03-01'),
    selectedTags: []
  }
];

const allTags = [
  { id: 'women', label: 'Women', icon: 'user' },
  { id: 'student', label: 'Student', icon: 'graduation-cap' },
  { id: 'youth', label: 'Youth', icon: 'users' },
  { id: 'senior', label: 'Senior Citizen', icon: 'heart-handshake' },
  { id: 'male', label: 'Male', icon: 'user' },
  { id: 'female', label: 'Female', icon: 'user' },
  { id: 'rural', label: 'Rural', icon: 'home' },
  { id: 'urban', label: 'Urban', icon: 'building-2' },
  { id: 'business', label: 'Business', icon: 'briefcase' },
  { id: 'farmer', label: 'Farmer', icon: 'wheat' }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = events
    .filter(event => {
      if (selectedTags.length === 0) return true;
      return selectedTags.some(tag => event.selectedTags.includes(tag));
    })
    .filter(event => {
      const matchesStatus = selectedStatus === 'all' || event.status.toLowerCase() === selectedStatus;
      const matchesType = selectedType === 'all' || event.type.toLowerCase() === selectedType;
      const matchesPriority = selectedPriority === 'all' || event.priority.toLowerCase() === selectedPriority;
      return matchesStatus && matchesType && matchesPriority;
    });

  const handleCreateEvent = (eventData: EventFormData) => {
    const newEvent: Event = {
      id: events.length + 1,
      heading: eventData.heading,
      description: eventData.description,
      targetFamilies: parseInt(eventData.targetFamilies),
      schemeDetails: eventData.schemeDetails,
      address: eventData.address,
      date: eventData.date,
      time: eventData.time,
      priority: eventData.priority as 'High' | 'Medium' | 'Low',
      status: 'Upcoming',
      type: eventData.type as 'Mela' | 'Campaign' | 'Workshop',
      createdAt: new Date(),
      selectedTags: eventData.selectedTags
    };
    
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setIsFormOpen(false);
    alert('Event created successfully! Notification sent to all users.');
  };

  const handleEditEvent = (eventData: EventFormData) => {
    if (!selectedEvent) return;
    
    const updatedEvent: Event = {
      ...selectedEvent,
      heading: eventData.heading,
      description: eventData.description,
      targetFamilies: parseInt(eventData.targetFamilies),
      schemeDetails: eventData.schemeDetails,
      address: eventData.address,
      date: eventData.date,
      time: eventData.time,
      priority: eventData.priority as 'High' | 'Medium' | 'Low',
      type: eventData.type as 'Mela' | 'Campaign' | 'Workshop',
      selectedTags: eventData.selectedTags
    };

    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === selectedEvent.id ? updatedEvent : event
      )
    );
    setIsFormOpen(false);
    setSelectedEvent(null);
    alert('Event updated successfully! Notification sent to all users.');
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
    setEvents(updatedEvents);
    setIsDeleteOpen(false);
    setSelectedEvent(null);
    // Show notification
    alert('Event deleted successfully!');
  };

  const toggleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
    } else {
      setSelectedTags(prevTags => [...prevTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedPriority('all');
    setSelectedTags([]);
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="mx-4 space-y-6"
      >
        <motion.div variants={fadeInUp} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track all your events</p>
          </div>
          <Button
            onClick={() => {
              setSelectedEvent(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Event Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="mela">Mela</option>
                <option value="campaign">Campaign</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <select
                value={selectedTags.length === 0 ? 'all' : selectedTags[0]}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'all') {
                    setSelectedTags([]);
                  } else {
                    setSelectedTags([value]);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Tags</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Minor">Minor</option>
                <option value="Youth">Youth</option>
                <option value="Student">Student</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Women">Women</option>
                <option value="Farmer">Farmer</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                Type: {selectedType}
                <button
                  onClick={() => setSelectedType('all')}
                  className="ml-1"
                >
                  ×
                </button>
              </span>
            )}
            {selectedPriority !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                Priority: {selectedPriority}
                <button
                  onClick={() => setSelectedPriority('all')}
                  className="ml-1"
                >
                  ×
                </button>
              </span>
            )}
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm"
              >
                {tag}
                <button
                  onClick={() => setSelectedTags([])}
                  className="ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            {(selectedType !== 'all' || selectedPriority !== 'all' || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600"
              >
                Clear all filters
              </button>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid gap-4">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">{event.heading}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">
                      <Building2 className="w-4 h-4" /> {event.type}
                    </span>
                    {event.selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm"
                      >
                        <Tag className="w-4 h-4" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsViewOpen(true);
                    }}
                    className="p-2 text-gray-400 rounded-full"
                    title="View Event"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsFormOpen(true);
                    }}
                    className="p-2 text-gray-400 rounded-full"
                    title="Edit Event"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsDeleteOpen(true);
                    }}
                    className="p-2 text-gray-400 rounded-full"
                    title="Delete Event"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.priority === 'High'
                      ? 'bg-red-100 text-red-800'
                      : event.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {event.priority} Priority
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{event.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Target: {event.targetFamilies} families</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{event.schemeDetails}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dialogs */}
        <EventFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedEvent(null);
          }}
          onSubmit={(formData) => {
            if (selectedEvent) {
              handleEditEvent({
                ...formData,
                priority: formData.priority as 'High' | 'Medium' | 'Low',
                type: formData.type as 'Mela' | 'Campaign' | 'Workshop',
                status: formData.status as 'Upcoming' | 'Ongoing' | 'Completed'
              });
            } else {
              handleCreateEvent({
                ...formData,
                priority: formData.priority as 'High' | 'Medium' | 'Low',
                type: formData.type as 'Mela' | 'Campaign' | 'Workshop',
                status: 'Upcoming'
              });
            }
          }}
          initialData={selectedEvent ? {
            heading: selectedEvent.heading,
            description: selectedEvent.description,
            targetFamilies: selectedEvent.targetFamilies.toString(),
            schemeDetails: selectedEvent.schemeDetails,
            address: selectedEvent.address,
            date: selectedEvent.date,
            time: selectedEvent.time,
            priority: selectedEvent.priority,
            selectedTags: selectedEvent.selectedTags,
            type: selectedEvent.type,
            status: selectedEvent.status
          } : undefined}
          isEdit={!!selectedEvent}
        />

        <DeleteEventDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteEvent}
        />

        <ViewEventDialog
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          event={selectedEvent}
        />
      </motion.div>
    </DashboardLayout>
  );
}
