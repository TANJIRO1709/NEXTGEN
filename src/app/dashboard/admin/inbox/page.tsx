'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Inbox, 
  FileText, 
  Send, 
  AlertCircle, 
  Trash2, 
  Star,
  Plus,
  Mail,
  Search,
  X,
  Reply,
  Forward,
  Archive,
  Users,
  Phone,
  Building,
  MapPin,
  Clock,
  Mail as MailIcon,
  ExternalLink,
  HelpCircle,
  UserCheck,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import ComposeDialog from './ComposeDialog';
import { DashboardLayout } from '../../user/DashboardLayout';

interface Contact {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  content?: string;
  date: string;
  unread: boolean;
  starred?: boolean;
  folder: 'inbox' | 'drafts' | 'sent' | 'spam' | 'trash' | 'starred';
}

const contacts: Contact[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@example.com'
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Operations Director',
    phone: '+1 (555) 234-5678',
    email: 'james.wilson@example.com'
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Head of Research',
    phone: '+1 (555) 345-6789',
    email: 'emily.chen@example.com'
  }
];

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'Pepper Potts',
    subject: 'Food App IOS & Android - Need confirmation to start project execution',
    preview: 'Hi Team, I hope this email finds you well. We are ready to begin...',
    content: `Hi Team,

I hope this email finds you well. We are ready to begin the development of the Food App for both iOS and Android platforms. Before we proceed, we need your confirmation on the following points:

1. Technical Requirements
2. Timeline and Milestones
3. Resource Allocation
4. Budget Approval

Please review the attached documents and provide your feedback at your earliest convenience.

Best regards,
Pepper Potts`,
    date: '11:50 AM',
    unread: true,
    folder: 'inbox'
  },
  {
    id: 2,
    sender: 'Paul Smith',
    subject: 'Prepare Mockup as per the spec document and Submit by Monday!!!',
    preview: 'Hello everyone, Please find attached the specification document...',
    content: `Hello everyone,

Please find attached the specification document for the upcoming project. We need the mockups to be prepared and submitted by Monday. This is a high-priority task.

Key points to consider:
- Follow the design guidelines
- Include all specified features
- Ensure responsive design
- Prepare both light and dark themes

Let me know if you have any questions.

Regards,
Paul Smith`,
    date: '11:50 AM',
    unread: true,
    starred: true,
    folder: 'inbox'
  },
  {
    id: 3,
    sender: 'Edwin Jarvis',
    subject: 'FixBazzar - Assign developer to the project',
    preview: 'We need to allocate resources for the upcoming project...',
    content: `Hello,

We need to allocate resources for the upcoming FixBazzar project. Please review the requirements and assign appropriate developers.

Project Requirements:
1. Frontend Development
2. Backend API Integration
3. Database Design
4. Testing and QA

Timeline: 3 months
Start Date: Next Monday

Best regards,
Edwin Jarvis`,
    date: '11:45 AM',
    unread: false,
    folder: 'inbox'
  }
];

export default function InboxPage() {
  const [activeFolder, setActiveFolder] = useState<string>('inbox');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContacts, setShowContacts] = useState(false);
  const [showAllMails, setShowAllMails] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const contactSectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const setContactSectionRef = useCallback((element: HTMLDivElement | null, id: string) => {
    if (contactSectionsRef.current) {
      contactSectionsRef.current[id] = element;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement && entry.target.id) {
            setVisibleSections((prev) => new Set([...Array.from(prev), entry.target.id]));
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    Object.values(contactSectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [showContacts]);

  const handleFolderClick = (folderId: string) => {
    setActiveFolder(folderId);
    setShowContacts(false);
    setSelectedMessage(null);
  };

  const toggleContacts = () => {
    setShowContacts(!showContacts);
    if (!showContacts) {
      setSelectedMessage(null);
    }
  };

  const handleDeleteEmail = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, folder: 'trash' } : msg
    ));
    setSelectedMessage(null);
  };

  const handleMoveToSpam = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, folder: 'spam' } : msg
    ));
    setSelectedMessage(null);
  };

  const handleSaveDraft = (data: { to: string; subject: string; content: string }) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      subject: data.subject,
      preview: data.content.slice(0, 100),
      content: data.content,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: false,
      folder: 'drafts'
    };
    setMessages([...messages, newMessage]);
    setIsComposeOpen(false);
    alert('Draft saved successfully!');
  };

  const folders = [
    { id: 'all', label: 'All Mails', icon: Mail, count: messages.length },
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: messages.filter(m => m.folder === 'inbox').length },
    { id: 'drafts', label: 'Drafts', icon: FileText, count: messages.filter(m => m.folder === 'drafts').length },
    { id: 'sent', label: 'Sent', icon: Send, count: messages.filter(m => m.folder === 'sent').length },
    { id: 'spam', label: 'Spam', icon: AlertCircle, count: messages.filter(m => m.folder === 'spam').length },
    { id: 'trash', label: 'Trash', icon: Trash2, count: messages.filter(m => m.folder === 'trash').length },
    { id: 'starred', label: 'Starred', icon: Star, count: messages.filter(m => m.starred).length },
  ];

  const filteredMessages = messages
    .filter(message => {
      if (activeFolder === 'all') return true;
      if (activeFolder === 'starred') return message.starred;
      return message.folder === activeFolder;
    })
    .filter(message => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        message.subject.toLowerCase().includes(searchLower) ||
        message.sender.toLowerCase().includes(searchLower) ||
        message.preview.toLowerCase().includes(searchLower)
      );
    });

  const markAsRead = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, unread: false } : msg
    ));
  };

  const toggleStar = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const handleSendEmail = (data: { to: string; subject: string; content: string }) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      subject: data.subject,
      preview: data.content.slice(0, 100),
      content: data.content,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: false,
      folder: 'sent'
    };
    setMessages([...messages, newMessage]);
    setIsComposeOpen(false);
    alert('Email sent successfully!');
  };

  return (
    <DashboardLayout>
        {isLoading ? (
        <motion.div
          className="flex items-center justify-center h-screen bg-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </motion.div>
      ) : (
        <motion.div
        className="h-screen mx-4 flex flex-col bg-gray-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Compose, Contacts and Search Row */}
          <div className="flex items-center px-4 py-2 border-b border-gray-200">
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setIsComposeOpen(true)}
              >
              <Plus className="w-5 h-5" />
              <span>Compose</span>
            </button>
            <button
              className="flex items-center gap-2 ml-2 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              onClick={toggleContacts}
            >
              <Users className="w-5 h-5" />
              <span>Contacts</span>
            </button>
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          {/* Folders Navigation */}
          <nav className="flex">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 ${
                  activeFolder === folder.id && !showContacts
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <folder.icon className="w-5 h-5" />
                <span>{folder.label}</span>
                {folder.count > 0 && (
                    <span className="ml-1.5 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {showContacts ? (
          <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-auto p-8">
            <div className="max-w-4xl mx-auto space-y-16">
              {/* Customer Care Section */}
              <div 
                ref={(el) => setContactSectionRef(el, 'customer-care')}
                id="customer-care"
                className={`transform transition-all duration-500 ${
                    visibleSections.has('customer-care') 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                >
                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-900">
                    <Phone className="w-6 h-6 text-blue-600" />
                    Contact Us
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-xl font-semibold text-gray-900 mb-2">
                        Toll Free Number
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        1800 266 6868
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>Call centre agent: <span className="font-medium">09:00 AM to 06:00 PM</span></span>
                      </div>
                      <p className="text-gray-500 ml-7">(except Sunday and gazetted holidays)</p>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>IVR facility: <span className="font-medium">24 x 7</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Monitors Section */}
              <motion.div 
                ref={(el) => setContactSectionRef(el, 'external-monitors')}
                id="external-monitors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: visibleSections.has('external-monitors') ? 1 : 0,
                  y: visibleSections.has('external-monitors') ? 0 : 20
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-16"
              >
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900"
                  >
                    <UserCheck className="w-8 h-8 text-blue-500" />
                    Independent External Monitors
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 mb-8 ml-8 text-lg"
                    >
                    For the purpose of Tender related grievances only
                  </motion.p>
                  
                  <div className="space-y-8 ml-8">
                    {/* First Monitor */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                      >
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Shri Raj Kumar Singh, IRS (Retd.)</h3>
                      <div className="space-y-3">
                        <p className="text-gray-600">Ex-Member, Customs Excise and Service Tax Appellate Tribunal, New Delhi</p>
                        <p className="text-gray-600">26 Cassia Marg, DLF-2, Gurgaon - 122008</p>
                        <div className="pt-3 space-y-2">
                          <motion.p 
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2"
                          >
                            <Phone className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold text-lg text-gray-900">
                              0124 - 4241100
                            </span>
                          </motion.p>
                          <motion.p 
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2"
                            >
                            <Mail className="w-5 h-5 text-blue-500" />
                            <a 
                              href="mailto:mrrajksingh@gmail.com" 
                              className="font-semibold text-lg text-blue-600 hover:text-blue-700"
                            >
                              mrrajksingh@gmail.com
                            </a>
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Second Monitor */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Shri Animesh Chauhan</h3>
                      <div className="space-y-3">
                        <p className="text-gray-600">Former MD & CEO of oriental Bank of Commerce</p>
                        <p className="text-gray-600">Flat no 948, G Block, 6th Avenue, Gaur City 1, Sector 4</p>
                        <p className="text-gray-600">Greater Noida (West), Uttar Pradesh - 201009</p>
                        <div className="pt-3">
                          <motion.p 
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2"
                            >
                            <Mail className="w-5 h-5 text-blue-500" />
                            <a 
                              href="mailto:animeshchau@gmail.com" 
                              className="font-semibold text-lg text-blue-600 hover:text-blue-700"
                              >
                              animeshchau@gmail.com
                            </a>
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Web Information Manager Section */}
              <motion.div 
                ref={(el) => setContactSectionRef(el, 'web-manager')}
                id="web-manager"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: visibleSections.has('web-manager') ? 1 : 0,
                  y: visibleSections.has('web-manager') ? 0 : 20
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-16"
                >
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900"
                    >
                    <Globe className="w-8 h-8 text-purple-500" />
                    Web Information Manager
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-lg p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <p className="text-xl font-bold text-gray-800">Dr.P.M.Saravanan</p>
                      <p className="text-gray-600">General Manager</p>
                      <p className="text-gray-600">Centre For Excellence in Postal Technology</p>
                      <p className="text-gray-600">Bengaluru, Karnataka, 560001</p>
                      <div className="pt-3">
                        <motion.p 
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2"
                        >
                          <Mail className="w-5 h-5 text-purple-500" />
                          <a 
                            href="mailto:webinformationmanager@indiapost.gov.in" 
                            className="font-semibold text-lg text-purple-600 hover:text-purple-700"
                            >
                            webinformationmanager@indiapost.gov.in
                          </a>
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <>
            {/* Messages List */}
            <div className={`${selectedMessage ? 'w-2/5' : 'w-full'} border-r border-gray-200 bg-white overflow-auto`}>
              {filteredMessages.map((message) => (
                <div
                key={message.id}
                onClick={() => {
                    setSelectedMessage(message);
                    if (message.unread) markAsRead(message.id);
                }}
                  className={`flex items-center gap-4 px-6 py-4 border-b border-gray-200 cursor-pointer ${
                    message.unread ? 'bg-blue-50' : 'bg-white'
                  } hover:bg-gray-50 ${selectedMessage?.id === message.id ? 'border-l-4 border-l-blue-600' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-medium ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {message.sender}
                      </h3>
                      <span className="text-sm text-gray-500">{message.date}</span>
                    </div>
                    <h4 className={`text-sm ${message.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                      {message.subject}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                  </div>
                  <button
                    onClick={(e) => {
                        e.stopPropagation();
                      toggleStar(message.id);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Star className={`w-5 h-5 ${message.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Email Content */}
            {selectedMessage && (
                <div className="flex-1 bg-white overflow-auto">
                <div className="p-6">
                  {/* Email Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>From: <span className="font-medium">{selectedMessage.sender}</span></span>
                        <span>{selectedMessage.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <Reply className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <Forward className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEmail(selectedMessage.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleMoveToSpam(selectedMessage.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setSelectedMessage(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Email Content */}
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700">
                      {selectedMessage.content}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Compose Dialog */}
      <ComposeDialog
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendEmail}
        onSaveDraft={handleSaveDraft}
        />
    </motion.div>
      )}
    </DashboardLayout>
  );
}