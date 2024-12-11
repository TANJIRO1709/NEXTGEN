import React from 'react';
import Image from "next/image";
const AnimatedLoader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader flex justify-center font-bold text-4xl">
        <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh1oA-flhwDRlLaJljNc6ZfNymmkylsngJNQ&s"
        alt="entrepreneurship"
        width={220}
        height={220}
        className=""
      />
        <div className="pulse-ring"></div>
      </div>
      <style jsx>{`
        /* Center the loader on the entire screen */
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: white;
          z-index: 9999;
        }

        /* Loader styles */
        .loader {
          width: fit-content;
          font-size: 100px;
          line-height: 1.5;
          font-family: system-ui, sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          color: #0000;
          -webkit-text-stroke: 1px #000;
          background:
            radial-gradient(1.13em at 50% 1.6em, #000 99%, #0000 101%)
              calc(50% - 1.6em) 0/3.2em 100% text,
            radial-gradient(1.13em at 50% -0.8em, #0000 99%, #000 101%) 50% 0.8em/3.2em 100%
              repeat-x text;
          animation: l9 2s linear infinite;
        }

        .loader:before {
          content: 'INDIAN POST';
        }

        @keyframes l9 {
          to {
            background-position: calc(50% + 1.6em) 0, calc(50% + 3.2em) 0.8em;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLoader;