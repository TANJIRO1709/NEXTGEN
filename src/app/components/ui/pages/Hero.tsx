"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { motion, useInView } from 'framer-motion';

import Slider from '../common/Slider';

const images = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1733946080/mkkaeatajq45updovou0.png",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1733946114/csd3ozweimdkbwudwej7.png",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1733946121/intxg8lx8yzaflcbjb9c.png",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1733946158/khzbydja4g5khwjisggl.png",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1733946161/qqaxqrn3rwawj2jqcnhe.png",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1733946202/tursu9hagd6tv99szbsb.png",
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1733946202/tursu9hagd6tv99szbsb.png",
  },
];

const Hero: React.FC = () => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleButtonClick = () => {
    router.push('/login');
  };

  return (
    <>
      <Slider />
      <div id='home'
        ref={ref}
        className="w-full max-h-screen relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden lg:px-12 flex flex-col lg:flex-row lg:justify-around justify-center items-center text-[17px] text-black py-20 lg:py-0"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-blob top-0 left-0"></div>
          <div className="absolute w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-blob animation-delay-2000 bottom-0 right-0"></div>
          <div className="absolute w-96 h-96 bg-pink-400 rounded-full filter blur-3xl animate-blob animation-delay-4000 bottom-0 left-0"></div>
        </div>

        {/* Left Section */}
        <motion.div
          className="flex flex-col items-start w-full lg:w-[40%] text-center lg:text-left lg:mb-0 z-10 px-6 lg:px-0"
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
            Empowering India one scheme at a time, fostering financial inclusion and security.
          </h1>
          <p className="text-gray-600 mb-8">
            At NEXTGEN, we aim to bridge the gap between financial services and the people who 
            need them most. By analyzing key demographic, occupational, and gender-based data, 
            we provide accurate and actionable scheme suggestions tailored to your needs. Our 
            tailored solutions aim to maximize outreach effectiveness and enhance service delivery.
          </p>
          <div className="flex justify-center w-full gap-4 lg:gap-6 mt-6 lg:mt-8 lg:justify-start">
            <motion.div
              initial={{ x: "-150%", opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleButtonClick}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full text-[17px] py-6 px-10 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                variant="default"
              >
                Explore Solution
              </Button>
            </motion.div>
            <motion.div
              initial={{ x: "150%", opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleButtonClick}
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-full text-[17px] py-6 px-10 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border-2 border-blue-100"
                variant="outline"
              >
                Contact
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full lg:w-[45%] flex justify-center mt-12 lg:mt-0 z-10"
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-2xl">
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full"
            >
              <Carousel
                className="w-full"
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 3000 })]}
              >
                <CarouselContent>
                  {images.map((item) => (
                    <CarouselItem key={item.id}>
                      <div className="p-1">
                        <Card className="bg-transparent border-none w-full h-auto">
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <img src={item.url} alt={`Image ${item.id}`} />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
