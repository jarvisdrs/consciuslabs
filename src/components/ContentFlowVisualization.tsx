import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Video, Mail, Twitter, Image, 
  Mic, Smartphone, Briefcase, Newspaper, Target 
} from 'lucide-react';

interface OutputNode {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const outputNodes: OutputNode[] = [
  { id: 'blog', label: 'Blog Post', icon: FileText, color: '#8B5CF6' },
  { id: 'newsletter', label: 'Newsletter', icon: Mail, color: '#A78BFA' },
  { id: 'tweet', label: 'Tweet / X', icon: Twitter, color: '#60A5FA' },
  { id: 'reel', label: 'Reel', icon: Video, color: '#34D399' },
  { id: 'infografica', label: 'Infografica', icon: Image, color: '#10B981' },
  { id: 'podcast', label: 'Podcast Clip', icon: Mic, color: '#F59E0B' },
  { id: 'story', label: 'Story', icon: Smartphone, color: '#EF4444' },
  { id: 'articolo', label: 'Articolo', icon: Newspaper, color: '#EC4899' },
  { id: 'linkedin', label: 'LinkedIn', icon: Briefcase, color: '#3B82F6' },
  { id: 'adcopy', label: 'Ad Copy', icon: Target, color: '#8B5CF6' },
];

export function ContentFlowVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Flow lines configuration
    const lines: Array<{
      targetY: number;
      amplitude: number;
      frequency: number;
      speed: number;
      offset: number;
      color: string;
      width: number;
    }> = outputNodes.map((node, i) => ({
      targetY: isMobile 
        ? (i + 1) * (canvas.getBoundingClientRect().height / (outputNodes.length + 1))
        : canvas.getBoundingClientRect().height / 2 + (i - outputNodes.length / 2) * 35,
      amplitude: isMobile ? 8 : 12 + Math.random() * 8,
      frequency: 0.008 + Math.random() * 0.004,
      speed: 2 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
      color: node.color,
      width: 2 + Math.random() * 2,
    }));

    // Particles for each line
    const particles: Array<Array<{ x: number; progress: number; speed: number; size: number }>> = 
      lines.map(() => []);

    let time = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const startX = isMobile ? width * 0.15 : width * 0.12;
      const endX = isMobile ? width * 0.85 : width * 0.88;

      lines.forEach((line, lineIndex) => {
        // Draw energy flow path
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.globalAlpha = 0.3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const points: Array<{ x: number; y: number }> = [];
        const steps = 100;
        
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = startX + (endX - startX) * t;
          
          // Sine wave flowing
          const wave = Math.sin(t * Math.PI * 3 + time * line.speed + line.offset) * line.amplitude;
          // Additional high frequency vibration for energy effect
          const vibration = Math.sin(t * Math.PI * 12 + time * 8) * (line.amplitude * 0.15);
          // Converge to targetY at the end
          const y = height / 2 + wave + vibration * (1 - t) + (line.targetY - height / 2) * t * 0.3;
          
          points.push({ x, y });
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Draw glowing energy core
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = line.width * 0.5;
        ctx.stroke();

        // Spawn particles
        if (Math.random() < 0.15) {
          particles[lineIndex].push({
            x: startX,
            progress: 0,
            speed: 0.008 + Math.random() * 0.004,
            size: 2 + Math.random() * 2,
          });
        }

        // Update and draw particles
        ctx.globalAlpha = 1;
        particles[lineIndex] = particles[lineIndex].filter(p => {
          p.progress += p.speed;
          
          if (p.progress >= 1) return false;

          const t = p.progress;
          const x = startX + (endX - startX) * t;
          const wave = Math.sin(t * Math.PI * 3 + time * line.speed + line.offset) * line.amplitude;
          const vibration = Math.sin(t * Math.PI * 12 + time * 8) * (line.amplitude * 0.15);
          const y = height / 2 + wave + vibration * (1 - t) + (line.targetY - height / 2) * t * 0.3;

          // Draw particle with glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
          gradient.addColorStop(0, line.color);
          gradient.addColorStop(0.5, line.color + '80');
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();

          // Core particle
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x, y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });
      });

      // Draw VIDEO source node
      ctx.globalAlpha = 1;
      const sourceGradient = ctx.createRadialGradient(startX, height / 2, 0, startX, height / 2, 40);
      sourceGradient.addColorStop(0, '#8B5CF6');
      sourceGradient.addColorStop(0.5, '#8B5CF640');
      sourceGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = sourceGradient;
      ctx.beginPath();
      ctx.arc(startX, height / 2, 40, 0, Math.PI * 2);
      ctx.fill();

      // VIDEO circle
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(startX, height / 2, 25, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(220 20% 8%)';
      ctx.fill();
      ctx.stroke();

      // VIDEO text
      ctx.fillStyle = '#F5F0EB';
      ctx.font = "600 12px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', startX, height / 2);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full"
    >
      {/* Canvas for energy flows */}
      <div className={`relative ${isMobile ? 'h-[500px]' : 'h-[280px]'} w-full`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Output nodes positioned absolutely */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          const top = isMobile 
            ? `${((i + 1) / (outputNodes.length + 1)) * 100}%`
            : `${50 + (i - outputNodes.length / 2) * 12}%`;
          
          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center gap-2"
              style={{ 
                right: isMobile ? '5%' : '3%',
                top,
                transform: 'translateY(-50%)',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
            >
              <div 
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{ 
                  backgroundColor: 'hsl(220 18% 10%)',
                  border: `1px solid ${node.color}`,
                  boxShadow: `0 0 15px ${node.color}40`,
                }}
              >
                <Icon size={14} color={node.color} strokeWidth={1.5} />
              </div>
              <span 
                className="text-xs font-medium hidden sm:block"
                style={{ color: '#F5F0EB' }}
              >
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend for mobile */}
      {isMobile && (
        <div className="mt-4 grid grid-cols-2 gap-2 px-4">
          {outputNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div key={node.id} className="flex items-center gap-2">
                <Icon size={12} color={node.color} />
                <span className="text-xs text-muted-foreground">{node.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
