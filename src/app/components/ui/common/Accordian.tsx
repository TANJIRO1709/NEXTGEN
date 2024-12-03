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
      className="border-b border-gray-200 last:border-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className={cn(
          "flex w-full items-center justify-between py-4 px-6 text-left",
          "text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <motion.div
        className="overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 text-gray-600">{children}</div>
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
    <motion.div
      className="w-full my-16 h-min px-6 sm:px-12 lg:my-0 flex flex-col lg:flex-row lg:justify-around justify-center items-start text-[17px] text-black"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
       <motion.div
      className="bg-gradient-to-r from-[#00293b] via-[#00296b] to-[#00293b] w-full lg:w-[35%] flex flex-col rounded-xl p-6 lg:p-8 gap-y-6 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Chat with Us */}
      <motion.div
        className="flex flex-col gap-y-2"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-x-3 mb-1">
          <HiChatBubbleLeftRight className="text-[28px] text-white" />
          <h1 className="text-[22px] font-bold text-white">Chat with us</h1>
        </div>
        <p className="text-white/80">Our friendly team is here to help.</p>
        <p className="text-white/80 font-medium">info@studynotion.com</p>
      </motion.div>

      {/* Visit Us */}
      <motion.div
        className="flex flex-col gap-y-2"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-x-3 mb-1">
          <FaEarthAmericas className="text-[26px] text-white" />
          <h1 className="text-[22px] font-bold text-white">Visit us</h1>
        </div>
        <p className="text-white/80">Come and say hello at our office HQ.</p>
        <p className="text-white/80 font-medium">
          Akshya Nagar 1st Block 1st Cross, Rammurthy Nagar, Bangalore-560016
        </p>
      </motion.div>

      {/* Call Us */}
      <motion.div
        className="flex flex-col gap-y-2"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-x-3 mb-1">
          <IoCall className="text-[27px] text-white" />
          <h1 className="text-[22px] font-bold text-white">Call us</h1>
        </div>
        <p className="text-white/80">Mon - Fri From 8am to 5pm</p>
        <p className="text-white/80 font-medium">+123 456 7869</p>
      </motion.div>
    </motion.div>
      <div className="flex w-full lg:w-[60%] items-center justify-center mt-8 lg:mt-0">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
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
      </div>
    </motion.div>
  );
}

export default Accordian;
