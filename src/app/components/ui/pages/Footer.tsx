import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#00293b] via-[#00296b] to-[#00293b] py-12 sm:px-16 max-sm:px-8 font-sans tracking-wide">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-[#fff] flex p-1 rounded-full text-left mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none bg-transparent text-[15px] pl-4"
          />
          <button
            type="button"
            className="bg-[#00296b] text-white text-[15px] rounded-full px-4 py-2.5 tracking-wide"
          >
            Subscribe
          </button>
        </div>
      </div>

      <hr className="my-12 border-gray-400" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <h4 className="text-lg mb-6 text-white">About Us</h4>
          <p className="text-gray-300 mb-2 text-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, mi eu pulvinar cursus, sem elit interdum mauris.
          </p>
        </div>

        <div>
          <h4 className="text-lg mb-6 text-white">Services</h4>
          <ul className="space-y-5">
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Mobile App Development
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                UI/UX Design
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Digital Marketing
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg mb-6 text-white">Resources</h4>
          <ul className="space-y-5">
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Webinars
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Ebooks
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Templates
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg mb-6 text-white">About Us</h4>
          <ul className="space-y-5">
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Mission and Values
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white text-[15px]">
                Testimonials
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-gray-300 text-[15px] mt-10">© ReadymadeUI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

