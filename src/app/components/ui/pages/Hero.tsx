"use client";
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { motion, useInView } from 'framer-motion';
import { Nunito_Sans } from 'next/font/google';
import Slider from '../common/Slider';

const inter = Nunito_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

const images = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dcnuizxi4/image/upload/v1733043498/hero_ahmjaq.png",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dcnuizxi4/image/upload/v1733043498/hero_ahmjaq.png",
  },
];

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
    <div id='home'
      ref={ref}
      className="w-full h-min lg:px-12 flex flex-col lg:flex-row lg:justify-around justify-center items-center text-[17px] text-black"
    >
      {/* Left Section */}
      <motion.div
        className="flex flex-col items-start w-full lg:w-[40%] text-center lg:text-left lg:mb-0"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className={`${inter.className} text-2xl lg:text-4xl opacity-70 text-gray-700 font-bold mb-4`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          All in one SEO tool you need to grow your business rapidly
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          Tempor rebum no at dolore lorem clita rebum rebum ipsum rebum stet
          dolor sed justo kasd. Ut dolor sed magna dolor sea diam. Sit diam sit
          justo amet ipsum vero ipsum clita lorem.
        </motion.p>
        <div className="flex justify-center w-full gap-4 lg:gap-8 mt-6 lg:mt-8 lg:justify-start">
          <motion.div
            initial={{ x: "-150%", opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          >
            <Button
              className={`bg-[#0D83FD] hover:bg-transparent border-[#0D83FD] border-2 text-white hover:text-[#0D83FD] rounded-full text-[17px] py-4 lg:py-6 px-8 lg:px-10`}
              variant="outline"
            >
              Join Us
            </Button>
          </motion.div>
          <motion.div
            initial={{ x: "150%", opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          >
            <Button
              className={`bg-transparent border-[#0D83FD] border-2 rounded-full text-[#0D83FD] hover:bg-[#0D83FD] hover:text-white text-[17px] py-4 lg:py-6 px-8 lg:px-10`}
              variant="outline"
            >
              Contact
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="w-full lg:w-[45%] flex justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
    <Slider/>
    </>
  );
};

export default Hero;
