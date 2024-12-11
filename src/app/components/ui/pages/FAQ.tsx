import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Accordian from "../common/Accordian";



const FAQ = () => {
  return (
    <div id="faq">
      <div className={`text-center text-2xl md:text-4xl mb-2 font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>Frequently Asked Questions</div>
      <Accordian />
      <div className="mb-10"></div>
    </div>
  );
};

export default FAQ;
