'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '../DashboardLayout';
import { 
  Book, HelpCircle, Mail, Phone, Search, ChevronDown, ChevronUp, 
  ExternalLink, MessageSquare, BookOpen, Bookmark, ArrowRight,
  Send, Loader2, CheckCircle, XCircle, Info as InfoIcon 
} from 'lucide-react';

// Types
interface DocumentationItem {
  title: string;
  description: string;
  content: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ContactForm {
  name: string;
  contact: string;
  email: string;
  issue: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  email?: string;
  issue?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const HelpCenter = () => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocs, setFilteredDocs] = useState<DocumentationItem[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>([]);
  const [expandedDoc, setExpandedDoc] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // State for contact form
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    contact: '',
    email: '',
    issue: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  // State for FAQ accordion
  // const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // State for documentation expandable content
  // const [expandedDoc, setExpandedDoc] = useState<number | null>(null);

  const documentationItems: DocumentationItem[] = [
    {
      title: 'Getting Started Guide',
      description: 'Learn how to navigate and use the dashboard effectively.',
      content: `
        1. Dashboard Overview
        - Navigation basics
        - Key features and functions
        - Quick start tips
        
        2. Account Setup
        - Profile completion
        - Preferences configuration
        - Basic settings
      `
    },
    {
      title: 'Account Management',
      description: 'Guide for managing your profile and account settings.',
      content: `
        1. Profile Settings
        - Update personal information
        - Change password
        - Security settings
        
        2. Notification Preferences
        - Email notifications
        - System alerts
        - Custom preferences
      `
    },
    {
      title: 'Security Best Practices',
      description: 'Learn about securing your account and data.',
      content: `
        1. Password Security
        - Strong password guidelines
        - Regular password updates
        - Two-factor authentication
        
        2. Account Protection
        - Security measures
        - Suspicious activity monitoring
        - Recovery options
      `
    }
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your email.'
    },
    {
      question: 'How can I update my profile information?',
      answer: 'Go to Settings > Profile in your dashboard. Click on the Edit button to update your information.'
    },
    {
      question: 'What should I do if I can\'t access my account?',
      answer: 'First, ensure you\'re using the correct credentials. If issues persist, contact our support team through the Contact Us form.'
    },
    {
      question: 'How do I enable two-factor authentication?',
      answer: 'Navigate to Settings > Security and find the Two-Factor Authentication section. Follow the setup wizard.'
    },
    {
      question: 'How can I manage my notifications?',
      answer: 'Visit Settings > Notifications to customize your notification preferences for different types of alerts and updates.'
    },
    {
      question: 'What browsers are supported?',
      answer: 'Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge browsers for optimal performance.'
    }
  ];

  // Search functionality with debounce
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      if (query) {
        const docs = documentationItems.filter(
          item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );
        const faqs = faqItems.filter(
          item => 
            item.question.toLowerCase().includes(query) || 
            item.answer.toLowerCase().includes(query)
        );
        setFilteredDocs(docs);
        setFilteredFaqs(faqs);
      } else {
        setFilteredDocs(documentationItems);
        setFilteredFaqs(faqItems);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Initialize filtered items
  useEffect(() => {
    setFilteredDocs(documentationItems);
    setFilteredFaqs(faqItems);
  }, []);

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!contactForm.name.trim()) {
      errors.name = 'Full Name is required';
      isValid = false;
    }

    // Contact validation
    if (!contactForm.contact.trim()) {
      errors.contact = 'Contact Number is required';
      isValid = false;
    } else if (!/^\+?[\d\s-]{8,}$/.test(contactForm.contact.trim())) {
      errors.contact = 'Please enter a valid contact number';
      isValid = false;
    }

    // Email validation
    if (!contactForm.email.trim()) {
      errors.email = 'Email ID is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Issue validation
    if (!contactForm.issue.trim()) {
      errors.issue = 'Please describe your issue';
      isValid = false;
    } else if (contactForm.issue.trim().length < 10) {
      errors.issue = 'Please provide more details about your issue (minimum 10 characters)';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitStatus('loading');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form on success
      setSubmitStatus('success');
      setContactForm({
        name: '',
        contact: '',
        email: '',
        issue: ''
      });
      setFormErrors({});
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the support you need with our comprehensive help resources
          </p>
          <div className="mt-6 max-w-xl mx-auto px-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 group-hover:border-blue-200"
                aria-label="Search documentation and FAQs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (filteredDocs.length === 0 && filteredFaqs.length === 0) && (
              <p className="mt-4 text-sm text-gray-500">
                No results found for "{searchQuery}". Try using different keywords or browse our documentation below.
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Top Section: Documentation and FAQ side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Enhanced Documentation Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Documentation</h2>
                  <p className="text-sm text-gray-500 mt-1">Explore our comprehensive guides</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((item, index) => (
                    <div 
                      key={index} 
                      className={`group relative p-6 rounded-xl transition-all duration-300 ${
                        expandedDoc === index 
                          ? 'bg-white shadow-lg border border-blue-100' 
                          : 'bg-gray-50 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-300"
                          aria-label="Bookmark this article"
                        >
                          <Bookmark className="h-5 w-5 text-blue-400 hover:text-blue-600" />
                        </button>
                      </div>
                      
                      <div className="pr-12">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        
                        <p className={`mt-2 text-gray-600 ${expandedDoc === index ? '' : 'line-clamp-2'} transition-all duration-300`}>
                          {item.description}
                        </p>
                        
                        <button 
                          onClick={() => setExpandedDoc(expandedDoc === index ? null : index)}
                          className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                            expandedDoc === index
                              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                              : 'text-blue-500 hover:bg-gray-100'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                          aria-expanded={expandedDoc === index}
                        >
                          <span className="text-sm font-medium">
                            {expandedDoc === index ? 'Hide content' : 'Show content'}
                          </span>
                          {expandedDoc === index ? (
                            <ChevronUp className="h-4 w-4 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
                          ) : (
                            <ChevronDown className="h-4 w-4 transform group-hover:translate-y-0.5 transition-transform duration-300" />
                          )}
                        </button>
                      </div>
                      {expandedDoc === index && (
                        <div className="mt-6 overflow-hidden">
                          <div className="animate-slideDown">
                            <div className="p-6 bg-white rounded-xl border border-blue-100 shadow-sm space-y-6">
                              <div className="space-y-4">
                                {item.content.split('\n').filter(line => line.trim()).map((line, idx) => {
                                  if (line.trim().match(/^\d+\./)) {
                                    // Main section header
                                    return (
                                      <div key={idx} className="pt-2">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                          {line.trim()}
                                        </h4>
                                      </div>
                                    );
                                  } else if (line.trim().startsWith('-')) {
                                    // Sub-items
                                    return (
                                      <div key={idx} className="flex items-start pl-6">
                                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-3"></div>
                                        <p className="text-gray-600">
                                          {line.trim().substring(1).trim()}
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                              
                              <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-end text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <Book className="h-4 w-4" />
                                  <span>5 min read</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No documentation found matching your search.</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                    >
                      View all documentation
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <HelpCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
                  <p className="text-sm text-gray-500 mt-1">Find quick answers to common questions</p>
                </div>
              </div>

              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  <>
                    <div className="divide-y divide-gray-100">
                      {filteredFaqs.map((faq, index) => (
                        <div 
                          key={index} 
                          className={`group transition-all duration-300 ${
                            index === 0 ? '' : 'pt-4'
                          }`}
                        >
                          <button 
                            className="w-full"
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            aria-expanded={expandedFaq === index}
                          >
                            <div className={`flex justify-between items-start group-hover:bg-gray-50 rounded-lg p-3 -mx-3 transition-all duration-300 ${
                              expandedFaq === index ? 'bg-blue-50 group-hover:bg-blue-50' : ''
                            }`}>
                              <h3 className={`text-lg font-medium pr-8 text-left transition-colors duration-300 ${
                                expandedFaq === index ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'
                              }`}>
                                {faq.question}
                              </h3>
                              <div className={`flex-shrink-0 ml-2 transition-transform duration-300 ${
                                expandedFaq === index ? 'transform rotate-180' : ''
                              }`}>
                                <ChevronDown className={`w-5 h-5 ${
                                  expandedFaq === index ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                                }`} />
                              </div>
                            </div>
                          </button>
                          
                          {expandedFaq === index && (
                            <div className="animate-slideDown overflow-hidden">
                              <div className="pt-4 pb-2 px-3">
                                <p className="text-gray-600 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                      <p className="text-gray-600 mb-4">Got any more questions?</p>
                      <button
                        onClick={() => {
                          const contactForm = document.getElementById('contact-section');
                          contactForm?.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <MessageSquare className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium">Contact Us</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No FAQs found matching your search.</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                    >
                      View all FAQs
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section: Contact Form */}
          <div id="contact-section" className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto scroll-mt-8 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
                <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-200">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className={`
                      block w-full px-4 py-3 rounded-lg
                      border ${formErrors.name ? 'border-red-300' : 'border-gray-200 group-hover:border-gray-300'}
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      transition-all duration-200
                      placeholder-gray-400
                      bg-white
                    `}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500 animate-slideDown">{formErrors.name}</p>
                  )}
                </div>
              </div>

              {/* Contact and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-200">
                    Contact Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={contactForm.contact}
                      onChange={(e) => setContactForm({ ...contactForm, contact: e.target.value })}
                      className={`
                        block w-full px-4 py-3 rounded-lg
                        border ${formErrors.contact ? 'border-red-300' : 'border-gray-200 group-hover:border-gray-300'}
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                        transition-all duration-200
                        placeholder-gray-400
                        bg-white
                      `}
                      placeholder="Enter your contact number"
                    />
                    {formErrors.contact && (
                      <p className="mt-1 text-sm text-red-500 animate-slideDown">{formErrors.contact}</p>
                    )}
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-200">
                    Email ID
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`
                        block w-full px-4 py-3 rounded-lg
                        border ${formErrors.email ? 'border-red-300' : 'border-gray-200 group-hover:border-gray-300'}
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                        transition-all duration-200
                        placeholder-gray-400
                        bg-white
                      `}
                      placeholder="Enter your email ID"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500 animate-slideDown">{formErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div className="group">
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-200">
                  Issue
                </label>
                <div className="relative">
                  <textarea
                    id="issue"
                    name="issue"
                    rows={5}
                    value={contactForm.issue}
                    onChange={(e) => setContactForm({ ...contactForm, issue: e.target.value })}
                    className={`
                      block w-full px-4 py-3 rounded-lg
                      border ${formErrors.issue ? 'border-red-300' : 'border-gray-200 group-hover:border-gray-300'}
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      transition-all duration-200
                      placeholder-gray-400
                      bg-white resize-none
                    `}
                    placeholder="Please describe your issue in detail..."
                  />
                  {formErrors.issue && (
                    <p className="mt-1 text-sm text-red-500 animate-slideDown">{formErrors.issue}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-500">
                  <InfoIcon className="inline-block w-4 h-4 mr-1 -mt-0.5" />
                  All fields are required
                </p>
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className={`
                    inline-flex items-center gap-2 px-6 py-3 rounded-lg
                    font-medium text-white
                    transform transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${submitStatus === 'loading' 
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                    }
                  `}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                      Submit
                    </>
                  )}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg animate-slideDown flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <p>Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg animate-slideDown flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  <p>Sorry, there was an error sending your message. Please try again.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpCenter;
