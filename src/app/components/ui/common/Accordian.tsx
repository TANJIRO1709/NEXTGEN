"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion
import { cn } from "@/lib/utils";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <motion.div
      className="border-b border-gray-200/50 last:border-0 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className={cn(
          "flex w-full items-center justify-between py-5 px-6 text-left",
          "text-lg font-medium text-gray-800 hover:bg-blue-50/50 transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
          isOpen && "bg-blue-50/30"
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="flex-1 pr-4">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-blue-600" />
        </motion.div>
      </button>
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 },
        }}
      >
        <div className="p-6 text-gray-600 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Accordian() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  const accordionData = [
    {
      title: "Are the recommendations accurate?",
      content:
        "Yes, our platform relies on verified data and our algorithms are trained to provide and reliable suggestions.",
    },
    {
      title: "Can I apply for schemes directly through FinScope AI?",
      content:
        "While FinScope AI helps you discover and compare schemes, we guide you to the official India Post channels for the final application process.",
    },
    {
      title: "What is the benefit of using FinScope AI over visiting a post office directly?",
      content:
        'FinScope AI saves time by providing personalized recommendations and detailed insights online, eliminating the need to manually research schemes.',
    },
    {
      title: "Can I access FinScope AI on my mobile?",
      content:
        'Yes, FinScope AI is mobile-friendly, so you can access our services on your phone or tablet anywhere, anytime.',
    },
    {
      title: "Does FinScope AI offer customer support?",
      content:
        'Yes, we have a dedicated support team available to assist you via email, chat, or our contact form.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Contact Information Section */}
        <motion.div
          className="lg:w-[35%] space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 shadow-xl">
            {/* Chat with Us */}
            <motion.div
              className="mb-8 hover:translate-x-2 transition-transform duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-white/10 rounded-lg">
                  <HiChatBubbleLeftRight className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Chat with us</h2>
              </div>
              <div className="ml-14 space-y-1">
                <p className="text-white/80">Our friendly team is here to help.</p>
                <p className="text-white font-medium">info@finscope.ai</p>
              </div>
            </motion.div>

            {/* Visit Us */}
            <motion.div
              className="mb-8 hover:translate-x-2 transition-transform duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-white/10 rounded-lg">
                  <FaEarthAmericas className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Visit us</h2>
              </div>
              <div className="ml-14 space-y-1">
                <p className="text-white/80">Come and say hello at our office HQ.</p>
                <p className="text-white font-medium">
                  Akshya Nagar 1st Block 1st Cross,<br />
                  Rammurthy Nagar, Bangalore-560016
                </p>
              </div>
            </motion.div>

            {/* Call Us */}
            <motion.div
              className="hover:translate-x-2 transition-transform duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-white/10 rounded-lg">
                  <IoCall className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Call us</h2>
              </div>
              <div className="ml-14 space-y-1">
                <p className="text-white/80">Mon - Fri From 8am to 5pm</p>
                <p className="text-white font-medium">+123 456 7869</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="lg:w-[60%]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 border-b border-gray-200/50">
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="mt-2 text-gray-600">Find answers to common questions about our services.</p>
            </div>
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                isOpen={openItems.includes(index)}
                onToggle={() => toggleItem(index)}
              >
                {item.content}
              </AccordionItem>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Accordian;
