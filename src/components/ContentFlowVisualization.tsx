import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Mail, Image, 
  Mic, Smartphone, Briefcase, Newspaper, Target, Video
} from 'lucide-react';

function XIcon({ size, color, strokeWidth }: { size: number; color: string; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

interface OutputNode {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const outputNodes: OutputNode[] = [
  { id: 'blog', label: 'Blog Post', icon: FileText, color: '#8B5CF6' },
  { id: 'newsletter', label: 'Newsletter', icon: Mail, color: '#A78BFA' },
  { id: 'x', label: 'X', icon: XIcon, color: '#E5E5E5' },
  { id: 'reel', label: 'Reel', icon: Video, color: '#34D399' },
  { id: 'infografica', label: 'Infografica', icon: Image, color: '#10B981' },
  { id: 'podcast', label: 'Podcast', icon: Mic, color: '#F59E0B' },
  { id: 'story', label: 'Story', icon: Smartphone, color: '#EF4444' },
  { id: 'articolo', label: 'Articolo', icon: Newspaper, color: '#EC4899' },
  { id: 'linkedin', label: 'LinkedIn', icon: Briefcase, color: '#3B82F6' },
  { id: 'adcopy', label: 'Ad Copy', icon: Target, color: '#8B5CF6' },
];

export function ContentFlowVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const timeRef = useRef(0);

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

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      ctx.clearRect(0, 0, width, height);
      timeRef.current += 0.008;
      const time = timeRef.current;

      // Canvas disegna SOLO i flussi, non i nodi
      const startX = isMobile ? width * 0.18 : width * 0.12;
      const startY = height / 2;
      const iconCenterX = isMobile ? width * 0.72 : width * 0.78;
      const iconRadius = isMobile ? 22 : 24;

      const total = outputNodes.length;
      const topMargin = height * 0.04;
      const bottomMargin = height * 0.04;
      const availableHeight = height - topMargin - bottomMargin;
      const spacing = availableHeight / (total - 1);

      // Disegna SOLO i flussi (da centro VIDEO a centro icone)
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;

        ctx.beginPath();
        
        const narrowWidth = isMobile ? 3 : 4;
        const spreadWidth = isMobile ? 3 : 4;
        
        if (isMobile) {
          const midY = (startY + endY) / 2;
          
          ctx.moveTo(startX, startY - narrowWidth);
          ctx.bezierCurveTo(
            startX - narrowWidth * 2, midY,
            iconCenterX - iconRadius, endY - spreadWidth * 2,
            iconCenterX, endY - spreadWidth
          );
          ctx.lineTo(iconCenterX, endY + spreadWidth);
          ctx.bezierCurveTo(
            iconCenterX - iconRadius, endY + spreadWidth * 2,
            startX + narrowWidth * 2, midY,
            startX, startY + narrowWidth
          );
        } else {
          const midX = (startX + iconCenterX) / 2;
          
          ctx.moveTo(startX, startY - narrowWidth);
          ctx.bezierCurveTo(
            midX - 60, startY - narrowWidth * 0.5,
            midX + 40, endY - spreadWidth * 2.5,
            iconCenterX, endY - spreadWidth
          );
          ctx.lineTo(iconCenterX, endY + spreadWidth);
          ctx.bezierCurveTo(
            midX + 40, endY + spreadWidth * 2.5,
            midX - 60, startY + narrowWidth * 0.5,
            startX, startY + narrowWidth
          );
        }
        
        ctx.closePath();

        // Flowing gradient
        const gradient = ctx.createLinearGradient(startX, startY, iconCenterX, endY);
        const offset = (time + i * 0.1) % 1;
        const glowWidth = 0.15;
        
        gradient.addColorStop(0, color + '20');
        gradient.addColorStop(Math.max(0, offset - glowWidth), color + '45');
        gradient.addColorStop(offset, color);
        gradient.addColorStop(Math.min(1, offset + glowWidth), color + '45');
        gradient.addColorStop(1, color + '25');

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.35;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  // Calcola posizioni
  const getPositions = () => {
    const height = isMobile ? 620 : 500;
    const total = outputNodes.length;
    const topMargin = height * 0.04;
    const availableHeight = height - topMargin * 2;
    const spacing = availableHeight / (total - 1);
    
    return {
      videoY: height / 2,
      videoX: isMobile ? '18%' : '12%',
      iconX: isMobile ? '72%' : '78%',
      nodes: outputNodes.map((_, i) => topMargin + i * spacing),
    };
  };

  const pos = getPositions();
  const containerHeight = isMobile ? 620 : 500;
  const iconRadius = isMobile ? 22 : 24;
  const videoRadius = isMobile ? 32 : 34;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full pb-16"
    >
      <div 
        className="relative w-full"
        style={{ height: `${containerHeight}px` }}
      >
        {/* Canvas: solo flussi */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* VIDEO node - HTML con glow CSS */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ 
            left: pos.videoX,
            top: `${pos.videoY}px`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div 
            className="relative flex items-center justify-center"
            style={{ 
              width: videoRadius * 2,
              height: videoRadius * 2,
            }}
          >
            {/* Glow animato */}
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ 
                background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                transform: 'scale(1.3)',
              }}
            />
            
            {/* Cerchio */}
            <div 
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: 'hsl(220 20% 6%)',
                border: '3px solid #8B5CF6',
                boxShadow: '0 0 20px rgba(139,92,246,0.5), inset 0 0 20px rgba(139,92,246,0.2)',
              }}
            >
              <span className="text-white font-bold text-xs">VIDEO</span>
            </div>
          </div>
        </motion.div>

        {/* Output nodes - HTML con icone dentro */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          const top = pos.nodes[i];
          
          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center gap-3"
              style={{ 
                left: pos.iconX,
                top: `${top}px`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.03 }}
            >
              {/* Cerchio con icona DENTRO */}
              <div 
                className="relative flex items-center justify-center"
                style={{ 
                  width: iconRadius * 2,
                  height: iconRadius * 2,
                }}
              >
                {/* Glow */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${node.color}40 0%, transparent 70%)`,
                    transform: 'scale(1.4)',
                  }}
                />
                
                {/* Cerchio bordo */}
                <div 
                  className="relative w-full h-full rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'hsl(220 20% 6%)',
                    border: `2px solid ${node.color}`,
                    boxShadow: `0 0 15px ${node.color}60, inset 0 0 15px ${node.color}30`,
                  }}
                >
                  {/* ICONA DENTRO IL CERCHIO */}
                  <Icon size={20} color={node.color} strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Label a destra */}
              <span 
                className="text-sm font-medium whitespace-nowrap"
                style={{ color: '#F5F0EB' }}
              >
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
