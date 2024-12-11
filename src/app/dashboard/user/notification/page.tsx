"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegBell, FaInbox, FaSpinner, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Image from "next/image";
import { DashboardLayout } from "../DashboardLayout";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'inbox' | 'notification';
  title: string;
  sender: string;
  senderImage: string;
  content: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'inbox',
    title: 'Food App IOS & Android - Need confirmation',
    sender: 'Pepper Potts',
    senderImage: '/img/user.png',
    content: 'Hi Team, I hope this email finds you well. We are ready to begin the development of the Food App for both iOS and Android platforms...',
    timestamp: '11:50 AM',
    read: false,
    starred: false,
  },
  {
    id: '2',
    type: 'inbox',
    title: 'Prepare Mockup as per the spec document',
    sender: 'Paul Smith',
    senderImage: '/img/user.png',
    content: 'Hello everyone, Please find attached the specification document...',
    timestamp: '11:50 AM',
    read: true,
    starred: true,
  },
  {
    id: '3',
    type: 'notification',
    title: 'New Comment on your post',
    sender: 'Mark Lee',
    senderImage: '/img/user.png',
    content: 'Mark Lee commented on your recent post about the project updates.',
    timestamp: '11:45 AM',
    read: false,
    starred: false,
  },
];

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'all' | 'inbox' | 'notification'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = notifications.filter(notif => 
    selectedTab === 'all' ? true : notif.type === selectedTab
  );

  const toggleStar = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? {...n, starred: !n.starred} : n)
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? {...n, read: true} : n)
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="flex mx-4 lg:mt-3 flex-col h-[calc(100vh-4rem)] bg-gray-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center justify-between p-4 bg-white border-b"
          variants={itemVariants}
        >
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedTab('all')}
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                selectedTab === 'all' ? "bg-blue-50 text-blue-600" : "text-gray-600"
              )}
            >
              All Mails
            </button>
            <button
              onClick={() => setSelectedTab('inbox')}
              className={cn(
                "px-4 py-2 rounded-md flex items-center transition-colors",
                selectedTab === 'inbox' ? "bg-blue-50 text-blue-600" : "text-gray-600"
              )}
            >
              <IoMail className="mr-2" />
              Inbox
              {notifications.some(n => n.type === 'inbox' && !n.read) && (
                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setSelectedTab('notification')}
              className={cn(
                "px-4 py-2 rounded-md flex items-center transition-colors",
                selectedTab === 'notification' ? "bg-blue-50 text-blue-600" : "text-gray-600"
              )}
            >
              <FaRegBell className="mr-2" />
              Notifications
              {notifications.some(n => n.type === 'notification' && !n.read) && (
                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </motion.div>

        <div className="flex flex-1 overflow-hidden">
          <div className={cn(
            "w-full transition-all duration-300",
            selectedNotification ? "w-1/2" : "w-full"
          )}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  className="flex items-center justify-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <FaSpinner className="w-8 h-8 text-blue-500 animate-spin" />
                    <p className="text-gray-500">Loading notifications...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="h-full overflow-y-auto"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      variants={itemVariants}
                      className={cn(
                        "p-4 border-b transition-colors",
                        notification.read ? "bg-white" : "bg-blue-50",
                        selectedNotification?.id === notification.id && "bg-blue-100"
                      )}
                      onClick={() => {
                        setSelectedNotification(notification);
                        markAsRead(notification.id);
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative w-10 h-10">
                          <Image
                            src={notification.senderImage}
                            alt={notification.sender}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={cn(
                              "font-semibold",
                              !notification.read && "text-blue-600"
                            )}>
                              {notification.sender}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">
                                {notification.timestamp}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStar(notification.id);
                                }}
                                className="text-gray-400 transition-colors"
                              >
                                {notification.starred ? (
                                  <FaStar className="text-yellow-400" />
                                ) : (
                                  <FaRegStar />
                                )}
                              </button>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-800">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {notification.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {selectedNotification && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="w-1/2 border-l bg-white overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{selectedNotification.title}</h2>
                    <button
                      onClick={() => setSelectedNotification(null)}
                      className="text-gray-500 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative w-12 h-12">
                      <Image
                        src={selectedNotification.senderImage}
                        alt={selectedNotification.sender}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedNotification.sender}</h3>
                      <p className="text-sm text-gray-500">{selectedNotification.timestamp}</p>
                    </div>
                  </div>
                  <div className="prose max-w-none">
                    <p>{selectedNotification.content}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Page;
