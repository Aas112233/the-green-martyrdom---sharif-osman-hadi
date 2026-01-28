import React, { useEffect, useRef } from 'react';

// --- HERO: The Eternal Flame ---
export const HeroEmbers: React.FC = () => {
  const embers = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute bottom-[-10px] rounded-full bg-gradient-to-t from-crimson to-yellow-500 blur-[1px]"
          style={{
            left: ember.left,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            opacity: ember.opacity,
            animation: `rise ${ember.duration}s infinite linear`,
            animationDelay: `${ember.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- BIOGRAPHY: Ink in Water ---
export const BioSmoke: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-soft-light">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-gradient-to-r from-gray-900 to-[#002B1E] rounded-full blur-[100px] animate-smoke-1"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-gradient-to-l from-gray-800 to-deep-900 rounded-full blur-[80px] animate-smoke-2"></div>
      </div>
      <style>{`
        @keyframes smoke-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10%, 10%) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes smoke-2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10%, -5%) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-smoke-1 { animation: smoke-1 20s infinite ease-in-out; }
        .animate-smoke-2 { animation: smoke-2 25s infinite ease-in-out reverse; }
      `}</style>
    </div>
  );
};

// --- TIMELINE: Constellations ---
export const TimelineConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    interface Point { x: number; y: number; vx: number; vy: number; }
    const points: Point[] = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      
      points.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />;
};

// --- WORKS: The Red Horizon ---
export const WorksLava: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-900 via-crimson/20 to-deep-800 animate-lava-gradient bg-[length:400%_400%] opacity-60 mix-blend-screen"></div>
      <style>{`
        @keyframes lava {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-lava-gradient { animation: lava 15s ease infinite; }
      `}</style>
    </div>
  );
};

// --- TRIBUTES: Peaceful Ripples ---
export const FooterRipples: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    interface Ripple { x: number; y: number; r: number; alpha: number; }
    let ripples: Ripple[] = [];

    const addRipple = (x: number, y: number) => {
      ripples.push({ x, y, r: 0, alpha: 0.6 });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.r += 1;
        ripple.alpha -= 0.005;

        if (ripple.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(224, 60, 49, ${ripple.alpha * 0.5})`; // Crimson tint
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      // Add ripple occasionally or on movement distance to avoid too many
      const rect = canvas.getBoundingClientRect();
      if (Math.random() > 0.8) {
         addRipple(e.clientX - rect.left, e.clientY - rect.top);
      }
    };
    
    // Auto ripples for atmosphere
    const interval = setInterval(() => {
        if(Math.random() > 0.5) {
            addRipple(Math.random() * width, Math.random() * height);
        }
    }, 2000);

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    const handleResize = () => {
       width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
       height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};