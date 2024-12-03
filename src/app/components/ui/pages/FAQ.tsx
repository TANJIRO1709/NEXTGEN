import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Accordian from "../common/Accordian";
import { Nunito_Sans } from "next/font/google";
const inter = Nunito_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

const FAQ = () => {
  return (
    <div id="faq">
      <div className={`${inter.className} pt-20 text-center text-3xl text-[#0D83FD] font-[800] mb-10`}>Frequently Asked Questions</div>
      <Accordian />
      <div className="mb-10"></div>
    </div>
  );
};

export default FAQ;
