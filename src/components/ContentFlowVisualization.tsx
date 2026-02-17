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
  const nodePositionsRef = useRef<Array<{ x: number; y: number }>>([]);

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
      
      // Update node positions for canvas drawing
      const width = rect.width;
      const height = rect.height;
      const endX = isMobile ? width * 0.82 : width * 0.90;
      
      nodePositionsRef.current = outputNodes.map((_, i) => {
        const y = isMobile 
          ? (i + 1) * (height / (outputNodes.length + 1))
          : height / 2 + (i - outputNodes.length / 2) * 32;
        return { x: endX, y };
      });
    };
    resize();
    window.addEventListener('resize', resize);

    // Straight lines configuration - no wave, fixed paths
    const lines = outputNodes.map((node, i) => ({
      targetIndex: i,
      color: node.color,
      width: 2 + Math.random() * 1.5,
      offset: Math.random() * 100, // For particle spacing
    }));

    // Particles for each line
    const particles: Array<Array<{ progress: number; speed: number; size: number }>> = 
      lines.map(() => []);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      ctx.clearRect(0, 0, width, height);

      const startX = isMobile ? width * 0.12 : width * 0.08;
      const startY = height / 2;
      const nodePositions = nodePositionsRef.current;

      lines.forEach((line, lineIndex) => {
        if (!nodePositions[lineIndex]) return;
        
        const endPos = nodePositions[lineIndex];
        
        // Calculate control point for smooth curve (very subtle)
        const midX = (startX + endPos.x) / 2;
        const controlX = midX;
        const controlY = endPos.y; // Curve ends at target Y

        // Draw the energy line (fixed, no animation on path)
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.globalAlpha = 0.4;
        ctx.lineCap = 'round';
        
        // Quadratic curve from VIDEO to node
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(controlX, controlY, endPos.x - 20, endPos.y);
        ctx.stroke();

        // Draw stronger glow line
        ctx.globalAlpha = 0.15;
        ctx.lineWidth = line.width * 3;
        ctx.stroke();

        // Spawn particles continuously
        if (Math.random() < 0.12) {
          particles[lineIndex].push({
            progress: 0,
            speed: 0.015 + Math.random() * 0.008,
            size: 2 + Math.random() * 1.5,
          });
        }

        // Update and draw particles flowing along the path
        ctx.globalAlpha = 1;
        particles[lineIndex] = particles[lineIndex].filter(p => {
          p.progress += p.speed;
          
          if (p.progress >= 1) return false;

          const t = p.progress;
          // Quadratic Bezier point calculation
          const invT = 1 - t;
          const x = invT * invT * startX + 2 * invT * t * controlX + t * t * (endPos.x - 20);
          const y = invT * invT * startY + 2 * invT * t * controlY + t * t * endPos.y;

          // Draw particle with glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.3, line.color);
          gradient.addColorStop(0.7, line.color + '60');
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x, y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });

        // Draw connection to icon (the final straight line)
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 1;
        ctx.strokeStyle = line.color;
        ctx.beginPath();
        ctx.moveTo(endPos.x - 20, endPos.y);
        ctx.lineTo(endPos.x - 4, endPos.y);
        ctx.stroke();
      });

      // Draw VIDEO source node with pulse
      const time = Date.now() / 1000;
      const pulseRadius = 30 + Math.sin(time * 2) * 3;
      
      ctx.globalAlpha = 0.3;
      const sourceGradient = ctx.createRadialGradient(startX, startY, 0, startX, startY, pulseRadius);
      sourceGradient.addColorStop(0, '#8B5CF6');
      sourceGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = sourceGradient;
      ctx.beginPath();
      ctx.arc(startX, startY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      // VIDEO circle
      ctx.globalAlpha = 1;
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(startX, startY, 22, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.fill();
      ctx.stroke();

      // Inner glow
      ctx.fillStyle = '#8B5CF620';
      ctx.beginPath();
      ctx.arc(startX, startY, 18, 0, Math.PI * 2);
      ctx.fill();

      // VIDEO text
      ctx.fillStyle = '#F5F0EB';
      ctx.font = "600 11px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', startX, startY);

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
      <div className={`relative ${isMobile ? 'h-[520px]' : 'h-[320px]'} w-full`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Output nodes - positioned to align with canvas lines */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          const top = isMobile 
            ? `${((i + 1) / (outputNodes.length + 1)) * 100}%`
            : `${50 + (i - outputNodes.length / 2) * 10}%`;
          
          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center gap-2"
              style={{ 
                right: isMobile ? '4%' : '2%',
                top,
                transform: 'translateY(-50%)',
              }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.04 }}
            >
              <div 
                className="flex items-center justify-center w-7 h-7 rounded-full"
                style={{ 
                  backgroundColor: 'hsl(220 18% 10%)',
                  border: `1.5px solid ${node.color}`,
                  boxShadow: `0 0 12px ${node.color}50`,
                }}
              >
                <Icon size={13} color={node.color} strokeWidth={1.5} />
              </div>
              <span 
                className="text-xs font-medium hidden sm:block whitespace-nowrap"
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
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 px-4">
          {outputNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div key={node.id} className="flex items-center gap-2">
                <Icon size={11} color={node.color} />
                <span className="text-xs text-muted-foreground">{node.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
