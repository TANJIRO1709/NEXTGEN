"use client";
import React from "react";
import { FaCheckCircle, FaLightbulb, FaUsers, FaChartLine, FaCog, FaHistory, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const AboutUs = () => {

  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/login');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    { icon: <FaLightbulb />, title: "Know the right scheme for you", description: "Not sure where to start? Let our intelligent system analyze your profile and recommend the most suitable financial and insurance schemes." },
    { icon: <FaUsers />, title: "Discover related schemes", description: "Discover schemes tailored to your demographic location, ensuring they’re relevant and impactful for your community." },
    { icon: <FaChartLine />, title: "Compare alternatives", description: "Easily compare multiple schemes side by side to understand their benefits, features, and suitability for your needs." },
    { icon: <FaCog />, title: "Help us by updating your profile", description: "Receive curated suggestions based on gender, occupation, and economic trends to match your unique financial needs." },
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      socials: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      socials: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Mike Wilson",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      socials: { linkedin: "#", github: "#", twitter: "#" }
    }
  ];

  const timelineEvents = [
    {
      title: "Demographic Analysis",
      description: "Using AI to assess demographics, identify financial needs, and customize solutions effectively."
    },
    {
      title: "Customized Solutions",
      description: "Developing tailored financial products informed by local demographic and economic insights."
    },
    {
      title: "Robust AI Integration",
      description: "Applying AI for efficiency, optimized resources, proactive service delivery, and improved outcomes."
    },
    {
      title: "Financial Inclusion",
      description: "Providing equitable financial services for all, bridging rural-urban gaps, fostering empowerment."
    }
  ];

  return (
    <div id="about" className="relative w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 md:py-24 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-blob animation-delay-4000 top-0 -right-48"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-blob bottom-0 -left-48"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-4 block">About Us</span>
          <h2 className={` text-2xl md:text-4xl mb-2 font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>Empowering Communities Through AI</h2>
          <p className="text-gray-600 text-lg">We help Indian communities access tailored financial and insurance services through AI and India Post.</p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-blue-500 text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Commitment to Excellence</h3>
              <p className="text-gray-600 text-lg mb-8">
              We believe in driving financial inclusion through precision and relevance. By integrating AI 
              into our approach, we help communities access schemes that improve their quality of life 
              and financial stability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-500 text-xl flex-shrink-0" />
                    <span className="text-gray-700">Accurate identification of demographic needs.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-500 text-xl flex-shrink-0" />
                    <span className="text-gray-700">Tailored campaigns based on seasonal economic cycles.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-500 text-xl flex-shrink-0" />
                    <span className="text-gray-700">Maximized outreach impact with data-driven planning.</span>
                  </div>
                  
              </div>
            </motion.div>


            {/* Call to Action Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-xl shadow-lg text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="mb-6 opacity-90">Join us in creating innovative schemes for your future.</p>
              <button onClick={handleButtonClick} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
                Get Started
              </button>
            </motion.div>
          </div>

          {/* Right Content - Timeline Section */}
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative pl-12 pb-8 last:pb-0"
                >
                  <div className="absolute left-0 top-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaHistory className="text-white text-sm" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl text-blue-600  font-semibold mt-1 mb-2">{event.title}</h4>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
