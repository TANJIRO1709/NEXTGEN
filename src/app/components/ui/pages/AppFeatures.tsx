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
      title: "AI-Powered Personalization",
      description: "Harness the power of advanced AI to recommend financial and insurance schemes that align with your unique demographic, economic, and seasonal needs.",
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "Demographic Analysis",
      description: "Gain access to schemes tailored to your specific profile, based on factors like age, gender, occupation, and geographic location.",
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Headphones,
      title: "Seasonal Insights",
      description: "Identify financial solutions that match seasonal economic patterns, such as farming cycles, business trends, or festival periods.",
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Rocket,
      title: "Custom Recommendations",
      description: "Get curated suggestions that adapt to your evolving financial goals, ensuring maximum relevance and impact.",
      color: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: Star,
      title: "Compare and Choose",
      description: "Effortlessly compare multiple schemes side by side to understand their benefits, features, and suitability for your needs.",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {

      icon: Zap,
      title: "Seamless Integration with India Post",
      description: "Benefit from government-backed schemes and services, optimized through AI driven insights for greater accessibility and impact.",
      color: "bg-indigo-100",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div 
      id="features" 
      className="relative w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-blob animation-delay-2000 bottom-0 right-0"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className={` text-2xl md:text-4xl mb-2 font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>Our Features</span>
          {/* <h2 className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover Our Exclusive Features
          </h2> */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the power of our innovative solutions designed to help you grow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={index}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br from-blue-500 to-blue-600`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppFeatures;