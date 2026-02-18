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
  const nodePositionsRef = useRef<Array<{ y: number }>>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate node positions (shared between canvas and DOM)
  const calculateNodePositions = (height: number) => {
    const total = outputNodes.length;
    const topMargin = height * 0.08;
    const bottomMargin = height * 0.08;
    const availableHeight = height - topMargin - bottomMargin;
    const spacing = availableHeight / (total - 1);
    
    return outputNodes.map((_, i) => ({
      y: topMargin + i * spacing,
    }));
  };

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
      
      // Update node positions
      nodePositionsRef.current = calculateNodePositions(rect.height);
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

      // Layout
      const startX = isMobile ? width * 0.12 : width * 0.08;
      const startY = height / 2;
      const endX = isMobile ? width * 0.82 : width * 0.88;
      const iconRadius = isMobile ? 20 : 18;

      // Get node positions
      const nodePositions = nodePositionsRef.current.length > 0 
        ? nodePositionsRef.current 
        : calculateNodePositions(height);

      // Draw energy flows
      outputNodes.forEach((node, i) => {
        const endY = nodePositions[i]?.y ?? (height * 0.1 + i * height * 0.08);
        const color = node.color;

        ctx.beginPath();
        
        const narrowWidth = isMobile ? 3 : 4;
        const spreadWidth = isMobile ? 3 : 4;
        
        if (isMobile) {
          const midY = (startY + endY) / 2;
          
          ctx.moveTo(startX - narrowWidth, startY);
          ctx.bezierCurveTo(
            startX - narrowWidth * 2, midY,
            endX - iconRadius * 2, endY - spreadWidth * 2,
            endX - iconRadius - 2, endY - spreadWidth
          );
          ctx.lineTo(endX - iconRadius - 2, endY + spreadWidth);
          ctx.bezierCurveTo(
            endX - iconRadius * 2, endY + spreadWidth * 2,
            startX + narrowWidth * 2, midY,
            startX + narrowWidth, startY
          );
        } else {
          const midX = (startX + endX) / 2;
          
          ctx.moveTo(startX, startY - narrowWidth);
          ctx.bezierCurveTo(
            midX - 60, startY - narrowWidth * 0.5,
            midX + 40, endY - spreadWidth * 2.5,
            endX - iconRadius - 4, endY - spreadWidth
          );
          ctx.lineTo(endX - iconRadius - 4, endY + spreadWidth);
          ctx.bezierCurveTo(
            midX + 40, endY + spreadWidth * 2.5,
            midX - 60, startY + narrowWidth * 0.5,
            startX, startY + narrowWidth
          );
        }
        
        ctx.closePath();

        // Flowing gradient
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
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

        // Connector to icon
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.9;
        const flowEndX = endX - iconRadius - 4;
        ctx.moveTo(flowEndX, endY);
        ctx.lineTo(endX - iconRadius + 2, endY);
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // Connector dot
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(endX - iconRadius + 2, endY, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // VIDEO source node - larger
      const videoRadius = isMobile ? 30 : 28;
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

  // Calculate positions for DOM nodes (same formula as canvas)
  const getNodeStyle = (i: number): React.CSSProperties => {
    const height = isMobile ? 600 : 450; // Match container height
    const positions = calculateNodePositions(height);
    const pos = positions[i];
    
    return {
      position: 'absolute',
      right: isMobile ? '8%' : '8%',
      top: `${pos.y}px`,
      transform: 'translateY(-50%)',
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full"
    >
      {/* TALLER container for more vertical space */}
      <div 
        className="relative w-full"
        style={{ height: isMobile ? '600px' : '450px' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Output nodes - perfectly aligned with canvas flows */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          
          return (
            <motion.div
              key={node.id}
              className="flex items-center gap-3"
              style={getNodeStyle(i)}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.03 }}
            >
              {/* Larger icon */}
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
