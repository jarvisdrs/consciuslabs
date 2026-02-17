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

    let isActive = true;

    const resize = () => {
      if (!canvas || !isActive) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (!canvas || !ctx || !isActive) return;
      
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      timeRef.current += 0.008;
      const time = timeRef.current;

      // Layout
      const startX = isMobile ? width * 0.15 : width * 0.12;
      const startY = height / 2;
      const endX = isMobile ? width * 0.85 : width * 0.90;

      // Calculate node positions
      const nodePositions = outputNodes.map((_, i) => {
        const total = outputNodes.length;
        const availableHeight = height * 0.82;
        const topMargin = height * 0.09;
        const spacing = availableHeight / (total - 1);
        const y = topMargin + i * spacing;
        return { x: endX, y };
      });

      // Draw energy flows - funnel style with soft curves
      outputNodes.forEach((node, i) => {
        const endPos = nodePositions[i];
        const color = node.color;

        ctx.beginPath();
        
        const baseWidth = isMobile ? 3 : 4;
        
        // Soft funnel shape
        if (isMobile) {
          // Mobile: spread from top center
          ctx.moveTo(startX - baseWidth, startY);
          ctx.quadraticCurveTo(startX - baseWidth * 2, (startY + endPos.y) / 2, endPos.x - 14, endPos.y - 3);
          ctx.lineTo(endPos.x - 14, endPos.y + 3);
          ctx.quadraticCurveTo(startX + baseWidth * 2, (startY + endPos.y) / 2, startX + baseWidth, startY);
        } else {
          // Desktop: horizontal funnel
          const midX = (startX + endPos.x) / 2;
          
          // Top curve
          ctx.moveTo(startX, startY - baseWidth);
          ctx.quadraticCurveTo(midX, startY - baseWidth, endPos.x - 16, endPos.y - 4);
          ctx.lineTo(endPos.x - 16, endPos.y + 4);
          ctx.quadraticCurveTo(midX, startY + baseWidth, startX, startY + baseWidth);
        }
        
        ctx.closePath();

        // Flowing gradient
        const gradient = ctx.createLinearGradient(startX, startY, endPos.x, endPos.y);
        const offset = (time + i * 0.1) % 1;
        const glowWidth = 0.18;
        
        gradient.addColorStop(0, color + '15');
        gradient.addColorStop(Math.max(0, offset - glowWidth), color + '40');
        gradient.addColorStop(offset, color);
        gradient.addColorStop(Math.min(1, offset + glowWidth), color + '40');
        gradient.addColorStop(1, color + '20');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Soft outline
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Connector line to icon
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.moveTo(endPos.x - 16, endPos.y);
        ctx.lineTo(endPos.x - 8, endPos.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // VIDEO source node
      const pulse = Math.sin(time * 2) * 2;
      
      ctx.globalAlpha = 0.2;
      const glowGrad = ctx.createRadialGradient(startX, startY, 0, startX, startY, 30 + pulse);
      glowGrad.addColorStop(0, '#8B5CF6');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(startX, startY, 30 + pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.arc(startX, startY, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#8B5CF630';
      ctx.beginPath();
      ctx.arc(startX, startY, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F5F0EB';
      ctx.font = "600 10px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', startX, startY);

      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      isActive = false;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full overflow-hidden"
    >
      <div 
        className="relative w-full mx-auto"
        style={{ height: isMobile ? '500px' : '360px' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ maxWidth: '100%' }}
        />

        {/* Output nodes */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          const total = outputNodes.length;
          const availableHeight = isMobile ? 500 * 0.82 : 360 * 0.82;
          const topMargin = isMobile ? 500 * 0.09 : 360 * 0.09;
          const spacing = availableHeight / (total - 1);
          const top = topMargin + i * spacing;
          
          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center gap-2"
              style={{ 
                right: isMobile ? '4%' : '5%',
                top: `${top}px`,
                transform: 'translateY(-50%)',
              }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.03 }}
            >
              <div 
                className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
                style={{ 
                  backgroundColor: 'hsl(220 18% 10%)',
                  border: `1.5px solid ${node.color}`,
                  boxShadow: `0 0 10px ${node.color}50`,
                }}
              >
                <Icon size={13} color={node.color} strokeWidth={1.5} />
              </div>
              <span 
                className="text-xs font-medium whitespace-nowrap"
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
