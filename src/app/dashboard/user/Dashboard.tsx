'use client';

import { useEffect, useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowRight, GraduationCap, MapPin, Calendar, Users, Briefcase, Star, Globe, Navigation, ChevronDown, Building2, Tags, Clock, Filter } from 'lucide-react';
import { Event, DUMMY_EVENTS, searchEvents } from '../../../lib/eventSearch'
import { Scheme, DUMMY_LIKED_SCHEMES, searchSchemes } from '../../../lib/schemeSearch';
import { DashboardLayout } from './DashboardLayout';
import { motion } from 'framer-motion';

interface PostOffice {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  type: string;
  address: string;
  status: string;
  opensAt: string;
  phone?: string;
}

const DUMMY_POST_OFFICES: PostOffice[] = [
  {
    id: 1,
    name: 'Post Office 1',
    rating: 4.5,
    reviews: 100,
    type: 'Head Post Office',
    address: 'Connaught Place, New Delhi',
    status: 'Open',
    opensAt: '10:00 AM'
  },
  {
    id: 2,
    name: 'Post Office 2',
    rating: 4.2,
    reviews: 50,
    type: 'Sub Post Office',
    address: 'Rajouri Garden, New Delhi',
    status: 'Open',
    opensAt: '11:00 AM',
    phone: '011-25463210'
  },
  {
    id: 3,
    name: 'Post Office 3',
    rating: 4.8,
    reviews: 200,
    type: 'Head Post Office',
    address: 'Pitampura, New Delhi',
    status: 'Closed',
    opensAt: '10:00 AM'
  }
];

const DashboardContent = () => {
  // Event search state
  const [eventSearchTerm, setEventSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'mela' | 'campaign' | 'workshop'>('all');
  const [selectedEventStatus, setSelectedEventStatus] = useState<'all' | 'ongoing' | 'completed' | 'upcoming'>('all');
  const [selectedEventTags, setSelectedEventTags] = useState<string[]>([]);

  // Scheme search state
  const [schemeSearchTerm, setSchemeSearchTerm] = useState('');
  const [selectedSchemeTags, setSelectedSchemeTags] = useState<string[]>([]);
  const [minLikes, setMinLikes] = useState(0);

  // Handle event type change
  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventType(e.target.value as 'all' | 'mela' | 'campaign' | 'workshop');
  };

  // Handle event status change
  const handleEventStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventStatus(e.target.value as 'all' | 'ongoing' | 'completed' | 'upcoming');
  };

  // Handle event tags change
  const handleEventTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedEventTags(value === '' ? [] : [value]);
  };

  // Reset all event filters
  const resetEventFilters = () => {
    setEventSearchTerm('');
    setSelectedEventType('all');
    setSelectedEventStatus('all');
    setSelectedEventTags([]);
  };

  // Filter events using the search utility
  const filteredEvents = searchEvents({
    searchTerm: eventSearchTerm,
    type: selectedEventType,
    status: selectedEventStatus,
    tags: selectedEventTags
  });

  // Filter schemes using the search utility
  const filteredSchemes = searchSchemes({
    searchTerm: schemeSearchTerm,
    tags: selectedSchemeTags,
    minLikes: minLikes
  });

  const [greeting, setGreeting] = useState('');
  const [currentScheme, setCurrentScheme] = useState(0);
  const [isEventsExpanded, setIsEventsExpanded] = useState(false);
  const [pincode, setPincode] = useState("769008");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const updateGreeting = () => {
  //     const istTime = new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000));
  //     const hour = istTime.getHours();
      
  //     if (hour >= 5 && hour < 12) {
  //       setGreeting('Good Morning');
  //     } else if (hour >= 12 && hour < 17) {
  //       setGreeting('Good Afternoon');
  //     } else if (hour >= 17 && hour < 22) {
  //       setGreeting('Good Evening');
  //     } else {
  //       setGreeting('Good Night');
  //     }
  //   };
  
  //   updateGreeting();
  //   const interval = setInterval(updateGreeting, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScheme((prev) => (prev + 1) % filteredSchemes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [filteredSchemes]);

  const nextScheme = () => {
    setCurrentScheme((prev) => (prev + 1) % filteredSchemes.length);
  };

  const prevScheme = () => {
    setCurrentScheme((prev) => 
      prev === 0 ? filteredSchemes.length - 1 : prev - 1
    );
  };

  return (
    <DashboardLayout>
    <motion.div 
      className="min-h-screen bg-gray-50  lg:-ml-56 space-y-6 lg:-mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Greeting Section */}
      <h1 className="text-4xl font-bold text-gray-800">
        Hi User, {greeting}
      </h1>

      {/* First Row: Liked Schemes and Featured Schemes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Liked Schemes */}
        <div className="bg-white rounded-xl lg:h-[450px] shadow-lg p-6">
          <div className="h-full flex flex-col space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Favorite Schemes</h2>
              <p className="text-gray-600 mt-1">Your most liked schemes</p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search your favorite schemes..."
                value={schemeSearchTerm}
                onChange={(e) => setSchemeSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="space-y-4 pr-2">
                {filteredSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 space-y-3 bg-white"
                  >
                    <h3 className="font-semibold text-lg text-gray-900">{scheme.name}</h3>
                    <p className="text-gray-600 line-clamp-2">{scheme.details}</p>
                    <div className="flex flex-wrap gap-2">
                      {scheme.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Featured Schemes Carousel */}
        <div className="bg-white rounded-xl lg:h-[450px] shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Schemes</h2>
          <div className="relative h-[calc(100%-4rem)]">
            <button
              onClick={prevScheme}
              className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-lg hover:bg-gray-50 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <div className="overflow-hidden h-full">
              <div 
                className="transition-transform duration-500 ease-in-out h-full flex"
                style={{ transform: `translateX(-${currentScheme * 100}%)` }}
              >
                {filteredSchemes.map((scheme, index) => (
                  <div 
                    key={scheme.id} 
                    className="bg-blue-50 rounded-xl p-8 h-full flex-shrink-0 w-full flex flex-col"
                  >
                    <div className="absolute top-4 right-4">
                      <div className="bg-blue-500 rounded-xl p-3">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col h-full">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {scheme.name}
                      </h3>
                      <p className="text-gray-600 flex-grow">
                        {scheme.details}
                      </p>
                      <div className="space-y-4 mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {scheme.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextScheme}
              className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-lg hover:bg-gray-50 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex justify-center space-x-2 mt-4">
              {filteredSchemes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScheme(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentScheme === index ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Events and Post Offices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Events */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">Events</h2>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-50 border-2 border-transparent group-hover:border-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                value={eventSearchTerm}
                onChange={(e) => setEventSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300">Filters</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-300">Timing</label>
                <select 
                  className="w-full rounded-lg bg-gray-50 border-2 border-transparent hover:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={selectedEventStatus}
                  onChange={handleEventStatusChange}
                >
                  <option value="all">All</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-300">Event Type</label>
                <select 
                  className="w-full rounded-lg bg-gray-50 border-2 border-transparent hover:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={selectedEventType}
                  onChange={handleEventTypeChange}
                >
                  <option value="all">All Types</option>
                  <option value="mela">Mela</option>
                  <option value="campaign">Campaign</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-300">Tags</label>
                <select 
                  className="w-full rounded-lg bg-gray-50 border-2 border-transparent hover:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  multiple={false}
                  onChange={handleEventTagsChange}
                >
                  <option value="">All Tags</option>
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
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={resetEventFilters}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-300"
          >
            Reset Filters
          </button>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.slice(0, isEventsExpanded ? undefined : 3).map((event) => (
              <div
                key={event.id}
                className="group p-6 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
                      event.status === 'upcoming' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' :
                      event.status === 'ongoing' ? 'bg-green-50 text-green-600 hover:bg-green-100' :
                      'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{event.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-gray-100 transition-colors duration-300">
                      <Building2 className="h-4 w-4 group-hover:text-blue-500 transition-colors duration-300" />
                      {event.type}
                    </span>
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-300 cursor-pointer transform hover:scale-105"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
                    <div className="flex items-center space-x-2 group/item hover:text-blue-600 transition-colors duration-300">
                      <MapPin className="h-4 w-4 group-hover/item:text-blue-500 transition-colors duration-300" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 group/item hover:text-blue-600 transition-colors duration-300">
                      <Calendar className="h-4 w-4 group-hover/item:text-blue-500 transition-colors duration-300" />
                      <span>{event.datetime}</span>
                    </div>
                    <div className="flex items-center space-x-2 group/item hover:text-blue-600 transition-colors duration-300">
                      <Users className="h-4 w-4 group-hover/item:text-blue-500 transition-colors duration-300" />
                      <span>{event.target}</span>
                    </div>
                    <div className="flex items-center space-x-2 group/item hover:text-blue-600 transition-colors duration-300">
                      <Briefcase className="h-4 w-4 group-hover/item:text-blue-500 transition-colors duration-300" />
                      <span>{event.scheme}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {DUMMY_EVENTS.length > 3 && (
              <button
                onClick={() => setIsEventsExpanded(!isEventsExpanded)}
                className="w-full py-2.5 text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-1 group hover:bg-blue-50 rounded-xl transition-all duration-300"
              >
                <span>{isEventsExpanded ? 'Show Less' : 'Show More'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${isEventsExpanded ? 'rotate-180' : ''} group-hover:translate-y-0.5`} />
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Post Offices */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-x-16 -translate-y-16 opacity-30" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full translate-x-8 translate-y-8 opacity-30" />
          
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">Post Offices Near Me</h2>
            
            {/* Map */}
            <div className="relative h-64 bg-gray-100 rounded-xl overflow-hidden mt-6 group">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80"
                alt="Map"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Pincode Input */}
            <div className="flex space-x-4 mt-6">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  placeholder="Enter pincode..."
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-gray-50 border-2 border-transparent group-hover:border-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                />
                <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
              <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md hover:shadow-lg">
                Search
              </button>
            </div>

            {/* Post Offices List */}
            <div className="space-y-4 mt-6">
              {DUMMY_POST_OFFICES.map((office) => (
                <div
                  key={office.id}
                  className="group p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{office.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 transform hover:scale-110 transition-transform duration-300 ${i < Math.floor(office.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{office.rating}</span>
                          <span className="text-sm text-gray-400">({office.reviews})</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110">
                          <Globe className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110">
                          <Navigation className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2 text-sm">
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{office.address}</p>
                      <p className={`${office.status === 'Open' ? 'text-green-500' : 'text-red-500'} transition-colors duration-300`}>
                        {office.status} · {office.opensAt}
                      </p>
                      {office.phone && (
                        <p className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300">{office.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </DashboardLayout>
  );
}

export default DashboardContent;
