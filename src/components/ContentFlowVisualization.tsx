import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Mail, Image, 
  Mic, Smartphone, Briefcase, Newspaper, Target, Video
} from 'lucide-react';

// Custom X icon component
function XIcon({ size, color, strokeWidth }: { size: number; color: string; strokeWidth: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
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

      // Layout - positioned to align with icon centers
      const startX = isMobile ? width * 0.15 : width * 0.12;
      const startY = height / 2;
      const iconCenterX = isMobile ? width * 0.78 : width * 0.85; // Center of icons
      const iconRadius = isMobile ? 20 : 18;

      // Calculate node Y positions (evenly distributed)
      const total = outputNodes.length;
      const topMargin = height * 0.08;
      const bottomMargin = height * 0.08;
      const availableHeight = height - topMargin - bottomMargin;
      const spacing = availableHeight / (total - 1);

      // Draw energy flows to icon centers
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;

        ctx.beginPath();
        
        const narrowWidth = isMobile ? 3 : 4;
        const spreadWidth = isMobile ? 3 : 4;
        
        if (isMobile) {
          const midY = (startY + endY) / 2;
          
          // Flow to the CENTER of the icon
          ctx.moveTo(startX - narrowWidth, startY);
          ctx.bezierCurveTo(
            startX - narrowWidth * 2, midY,
            iconCenterX - iconRadius, endY - spreadWidth * 2,
            iconCenterX, endY - spreadWidth
          );
          ctx.lineTo(iconCenterX, endY + spreadWidth);
          ctx.bezierCurveTo(
            iconCenterX - iconRadius, endY + spreadWidth * 2,
            startX + narrowWidth * 2, midY,
            startX + narrowWidth, startY
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

        // Outline
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.35;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Connector dot at icon center
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(iconCenterX, endY, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // VIDEO source node
      const videoRadius = isMobile ? 32 : 30;
      const pulseRadius = videoRadius + 4 + Math.sin(time * 2) * 2;
      
      ctx.globalAlpha = 0.25;
      const glowGradient = ctx.createRadialGradient(startX, startY, 0, startX, startY, pulseRadius + 8);
      glowGradient.addColorStop(0, '#8B5CF6');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(startX, startY, pulseRadius + 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.arc(startX, startY, videoRadius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#8B5CF650';
      ctx.beginPath();
      ctx.arc(startX, startY, videoRadius - 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F5F0EB';
      ctx.font = "600 12px 'Space Grotesk', sans-serif";
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

  // Calculate Y position for each node
  const getNodeY = (i: number, height: number) => {
    const total = outputNodes.length;
    const topMargin = height * 0.08;
    const availableHeight = height - topMargin * 2;
    const spacing = availableHeight / (total - 1);
    return topMargin + i * spacing;
  };

  const containerHeight = isMobile ? 620 : 480;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full pb-12" // Added padding bottom
    >
      <div 
        className="relative w-full"
        style={{ height: `${containerHeight}px` }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Output nodes - positioned with center aligned to flow end */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          const top = getNodeY(i, containerHeight);
          
          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center gap-3"
              style={{ 
                right: isMobile ? 'auto' : '8%',
                left: isMobile ? '78%' : 'auto',
                top: `${top}px`,
                transform: 'translate(-50%, -50%)', // Center the element on the point
              }}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.03 }}
            >
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                style={{ 
                  backgroundColor: 'hsl(220 18% 10%)',
                  border: `2px solid ${node.color}`,
                  boxShadow: `0 0 15px ${node.color}60`,
                }}
              >
                <Icon size={20} color={node.color} strokeWidth={1.5} />
              </div>
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
