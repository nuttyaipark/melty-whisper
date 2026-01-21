import React from 'react';

interface VisualizerProps {
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying }) => {
  return (
    <div className="flex items-end justify-center h-16 space-x-1.5 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`w-2 bg-gradient-to-t from-indigo-500 to-cyan-300 rounded-full transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : 'h-1 opacity-30'
          }`}
          style={{
            height: isPlaying ? `${Math.random() * 80 + 20}%` : '4px',
            animationDuration: `${Math.random() * 0.5 + 0.5}s`,
            animationDelay: `${Math.random() * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

export default Visualizer;