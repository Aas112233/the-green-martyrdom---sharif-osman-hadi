import React from 'react';

const Particles: React.FC = () => {
  // Generate random positions for particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2 + 'px', // 2px to 6px
    delay: Math.random() * 5 + 's',
    duration: Math.random() * 10 + 15 + 's', // 15s to 25s
    color: Math.random() > 0.6 ? 'bg-crimson' : 'bg-green-500', // Mostly green/forest, some red
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.color} animate-float blur-[1px]`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
      
      {/* Larger, fainter orbs for atmosphere */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-900/20 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-crimson/5 rounded-full blur-[120px] animate-float-delayed"></div>
    </div>
  );
};

export default Particles;