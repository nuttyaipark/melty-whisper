import React from 'react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#FDFBF7] pointer-events-none">
      {/* SVG Filter for Gooey Effect */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Gooey Container */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ filter: "url(#goo)" }}
      >
        {/* Pastel Blobs */}
        {/* Blob 1: Pink */}
        <div
          className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-[#FFB7B2] rounded-full mix-blend-multiply opacity-80 blur-xl animate-blob"
        ></div>

        {/* Blob 2: Blue */}
        <div
          className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-[#AEC6CF] rounded-full mix-blend-multiply opacity-80 blur-xl animate-blob animation-delay-2000"
        ></div>

        {/* Blob 3: Yellow */}
        <div
          className="absolute bottom-[20%] left-[20%] w-[40vw] h-[40vw] bg-[#FDFD96] rounded-full mix-blend-multiply opacity-80 blur-xl animate-blob animation-delay-4000"
        ></div>

        {/* Blob 4: Green (Additional for more coverage) */}
        <div
          className="absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] bg-[#B0E57C] rounded-full mix-blend-multiply opacity-80 blur-xl animate-blob animation-delay-6000"
        ></div>

        {/* Blob 5: Purple (Center/Floating) */}
        <div
          className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] bg-[#C3B1E1] rounded-full mix-blend-multiply opacity-80 blur-xl animate-blob animation-delay-3000"
        ></div>
      </div>

      {/* Glass overlay to soften everything further */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[80px]"></div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
            animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
            animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default BackgroundAnimation;