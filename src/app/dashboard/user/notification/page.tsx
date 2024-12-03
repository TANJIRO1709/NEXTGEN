"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import { DashboardLayout } from "../DashboardLayout";

const notifications = [
  {
    user: "John Doe",
    userImage: "/../../../../img/team-1.jpg", // Replace with your image paths
    action: "reacted to your recent post",
    post: "My Vacation Photos",
    group: null,
    message: null,
    picture: "/images/post1.jpg", // Replace with your image paths
    timeAgo: "2 hours ago",
    read: false,
  },
  {
    user: "Jane Smith",
    userImage: "/../../../../img/team-2.jpg",
    action: "has joined your group",
    post: null,
    group: "Travel Enthusiasts",
    message: null,
    picture: null,
    timeAgo: "5 hours ago",
    read: true,
  },
  {
    user: "Mark Lee",
    userImage: "/../../../../img/team-3.jpg",
    action: "sent you a private message",
    post: null,
    group: null,
    message: "Hey! Can we discuss the project details?",
    picture: null,
    timeAgo: "1 day ago",
    read: false,
  },
  {
    user: "John Doe",
    userImage: "/../../../../img/team-1.jpg", // Replace with your image paths
    action: "reacted to your recent post",
    post: "My Vacation Photos",
    group: null,
    message: null,
    picture: "/images/post1.jpg", // Replace with your image paths
    timeAgo: "2 hours ago",
    read: false,
  },
  {
    user: "Jane Smith",
    userImage: "/../../../../img/team-2.jpg",
    action: "has joined your group",
    post: null,
    group: "Travel Enthusiasts",
    message: null,
    picture: null,
    timeAgo: "5 hours ago",
    read: true,
  },
  {
    user: "Mark Lee",
    userImage: "/../../../../img/team-3.jpg",
    action: "sent you a private message",
    post: null,
    group: null,
    message: "Hey! Can we discuss the project details?",
    picture: null,
    timeAgo: "1 day ago",
    read: false,
  },
];

const page = () => {
  return (
    <DashboardLayout>
      
    <div className="flex flex-col items-center justify-center w-full">
      <motion.div
        className="w-[800px] bg-white shadow-lg border border-gray-200 rounded-lg p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaRegBell className="mr-2 text-blue-500" />
          Notifications
        </h2>

        {notifications.map((item, index) => (
          <motion.div
            key={index}
            className={`p-4 mb-4 rounded-md ${
              !item.read ? "bg-blue-50" : "bg-white"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              {/* User Image */}
              <Image
                src={item.userImage}
                alt={`Profile of ${item.user}`}
                width={50}
                height={50}
                className="rounded-full"
              />

              {/* Notification Details */}
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-gray-800 cursor-pointer hover:text-blue-600">
                      {item.user}
                    </span>{" "}
                    <span className="text-gray-600">{item.action}</span>
                    {item.post && (
                      <span className="font-bold text-blue-600 cursor-pointer ml-1">
                        {item.post}
                      </span>
                    )}
                    {item.group && (
                      <span className="font-bold text-blue-600 cursor-pointer ml-1">
                        {item.group}
                      </span>
                    )}
                    {/* Unread Indicator */}
                    {!item.read && (
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                    )}
                  </div>
                  {/* Picture (if any) */}
                  {item.picture && (
                    <Image
                      src={item.picture}
                      alt="Notification related media"
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                  )}
                </div>
                <span className="text-sm text-gray-500">{item.timeAgo}</span>
                {item.message && (
                  <p className="mt-2 p-3 border rounded-lg text-gray-700 bg-gray-50 hover:bg-blue-100 cursor-pointer">
                    {item.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
                </DashboardLayout>
  );
};

export default page;
