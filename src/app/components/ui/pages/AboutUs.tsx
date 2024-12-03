"use client";
import React from "react";
import { Nunito_Sans } from "next/font/google";
import { FaCheckCircle } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { motion } from "framer-motion";

const inter = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const AboutUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
    <div id="about" className={`${inter.className} pt-20 text-center text-3xl font-extrabold text-[#0D83FD]`}>
          About Us
        </div>
        <div className="text-center text-lg font-medium text-gray-600 mt-2">
          Explore your opportunities to success
        </div>
    <div className="w-full my-4 px-10 lg:px-12 flex flex-col lg:flex-row justify-around mx-auto items-center h-max gap-12">
      {/* Text Section */}
      <motion.div
        className="flex-col flex gap-y-4 w-full lg:w-[35%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} 
        variants={fadeIn}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} 
      >
        <h1 className="text-xl font-bold text-[#0D83FD]">MORE ABOUT US</h1>
        <h1 className={`${inter.className} text-3xl font-extrabold opacity-80`}>
          Voluptas enim suscipit temporibus
        </h1>
        <p className="text-[17px]">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
        <div className="flex flex-wrap items-start justify-between gap-6">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="flex justify-start items-center gap-2 w-[45%]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
              transition={{
                duration: 1,
                delay: 0.3 + index * 0.2,
                ease: "easeOut",
              }}
            >
              <FaCheckCircle className="text-[#0D83FD] text-xl" />
              <p className="text-[17px] font-extralight">Lorem ipsum dolor sit.</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Card Section */}
      <motion.div
        className="w-[70%] mx-auto lg:mx-0 lg:w-[50%] flex flex-col gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ delayChildren: 0.5, staggerChildren: 0.4 }} 
      >
        {[...Array(2)].map((_, row) => (
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start" key={row}>
            {[...Array(2)].map((_, col) => (
              <motion.div
                key={`${row}-${col}`}
                className={`bg-white ${col&1?"":"lg:-translate-y-8"} group flex flex-col rounded-xl w-full lg:w-[48%] items-start justify-evenly p-8 hover:shadow-xl hover:transition-all hover:duration-300 gap-4`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 + row * 0.4 + col * 0.2,
                  ease: "easeOut",
                }}
              >
                <div className="h-[80px] w-[80px] bg-[#0D83FD] flex justify-center items-center group-hover:duration-300 bg-opacity-10 group-hover:bg-opacity-100 rounded-full">
                  <CgOrganisation className="text-[45px] text-black opacity-70" />
                </div>
                <h1
                  className={`${inter.className} text-2xl font-extrabold opacity-80`}
                >
                  Voluptas enim suscipit
                </h1>
                <p className="text-[17px]">
                  Magni repellendus vel ullam hic officia accusantium ipsa dolor
                  omnis dolor voluptatem.
                </p>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
    </>
  );
};

export default AboutUs;
