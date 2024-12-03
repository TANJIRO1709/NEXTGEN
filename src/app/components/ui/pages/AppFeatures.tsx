"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  ShieldCheck, 
  Headphones, 
  Rocket, 
  Star, 
  Zap 
} from "lucide-react";

const featureVariants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: (delay) => ({
    opacity: 1, 
    y: 0,
    transition: {
      delay: delay * 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 100
    }
  })
};

const AppFeatures = () => {
  const features = [
    {
      icon: Settings,
      title: "Customization",
      description: "Tailor our product to suit your unique needs and expand your reach.",
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "Security",
      description: "Your data is protected by the latest cutting-edge security measures.",
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Headphones,
      title: "Support",
      description: "24/7 dedicated customer support for all your inquiries and needs.",
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Experience blazing-fast performance with our optimized solution.",
      color: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: Star,
      title: "Innovation",
      description: "Stay ahead with our cutting-edge features and continuous updates.",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      icon: Zap,
      title: "Efficiency",
      description: "Streamline your workflow with our powerful and intuitive tools.",
      color: "bg-indigo-100",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div 
      id="features" 
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          type: "spring",
          stiffness: 100 
        }}
        viewport={{ once: true }}
        className="text-center text-3xl pt-8 sm:text-4xl font-bold text-[#0D83FD] mb-12"
      >
        Discover Our Exclusive Features
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={featureVariants}
              viewport={{ once: true }}
              className={`
                group relative overflow-hidden rounded-xl 
                ${feature.color} p-6 
                hover:shadow-2xl hover:scale-105 
                transition-all duration-300 
                flex items-center space-x-6
              `}
            >
              <div className={`
                ${feature.color} ${feature.iconColor}
                rounded-full p-3 
                group-hover:rotate-12 
                transition-transform duration-300
              `}>
                <Icon size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AppFeatures;