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

      // Wider, more spread layout
      const startX = isMobile ? width * 0.12 : width * 0.08;
      const startY = height / 2;
      const spreadStart = isMobile ? width * 0.35 : width * 0.30;
      const endX = isMobile ? width * 0.88 : width * 0.92;

      // Calculate node positions
      const nodePositions = outputNodes.map((_, i) => {
        const total = outputNodes.length;
        const spacing = isMobile ? height * 0.8 / (total - 1) : height * 0.85 / (total - 1);
        const startOffset = isMobile ? height * 0.1 : height * 0.075;
        const y = startOffset + i * spacing;
        return { x: endX, y };
      });

      // Draw energy flow channels (funnel style with soft curves)
      outputNodes.forEach((node, i) => {
        const endPos = nodePositions[i];
        const color = node.color;

        // Create funnel path with SOFT curves (not elbow)
        ctx.beginPath();
        
        const narrowWidth = isMobile ? 2.5 : 3;
        const spreadWidth = isMobile ? 2 : 2.5;
        
        if (isMobile) {
          // Mobile vertical: soft curves spreading down
          const funnelY = startY + 20;
          
          // Left edge
          ctx.moveTo(startX - narrowWidth, startY);
          ctx.quadraticCurveTo(startX - narrowWidth, funnelY, spreadStart, endPos.y - spreadWidth * 2);
          ctx.quadraticCurveTo(spreadStart + 20, endPos.y, endPos.x - 16, endPos.y);
          
          // Right edge back
          ctx.lineTo(endPos.x - 16, endPos.y + spreadWidth);
          ctx.quadraticCurveTo(spreadStart + 20, endPos.y + spreadWidth, spreadStart, endPos.y + spreadWidth * 2);
          ctx.quadraticCurveTo(startX + narrowWidth, funnelY, startX + narrowWidth, startY);
        } else {
          // Desktop horizontal: wide funnel with soft bezier curves
          const funnelX = spreadStart;
          
          // Top edge - soft curve from center spreading up/down to target
          ctx.moveTo(startX, startY - narrowWidth);
          
          // First soft curve: from video to spread point
          const controlX1 = startX + (funnelX - startX) * 0.5;
          const controlY1 = startY + (endPos.y - startY) * 0.3;
          ctx.quadraticCurveTo(controlX1, startY - narrowWidth, funnelX - 30, endPos.y - spreadWidth * 1.5);
          
          // Second soft curve: from spread point to node
          ctx.quadraticCurveTo(funnelX, endPos.y - spreadWidth, endPos.x - 18, endPos.y - 3);
          
          // Bottom edge back
          ctx.lineTo(endPos.x - 18, endPos.y + 3);
          ctx.quadraticCurveTo(funnelX, endPos.y + spreadWidth, funnelX - 30, endPos.y + spreadWidth * 1.5);
          
          // Back to start
          const controlX2 = startX + (funnelX - startX) * 0.5;
          const controlY2 = startY + (endPos.y - startY) * 0.3;
          ctx.quadraticCurveTo(controlX2, startY + narrowWidth, startX, startY + narrowWidth);
        }
        
        ctx.closePath();

        // Flowing gradient for energy effect
        const gradient = ctx.createLinearGradient(startX, startY, endPos.x, endPos.y);
        const offset = (time + i * 0.1) % 1;
        const glowWidth = 0.15;
        
        gradient.addColorStop(0, color + '20');
        gradient.addColorStop(Math.max(0, offset - glowWidth), color + '50');
        gradient.addColorStop(offset, color);
        gradient.addColorStop(Math.min(1, offset + glowWidth), color + '50');
        gradient.addColorStop(1, color + '25');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Outer glow
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Connector to icon
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.9;
        ctx.moveTo(endPos.x - 18, endPos.y);
        ctx.lineTo(endPos.x - 10, endPos.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // VIDEO source node
      const pulseRadius = 28 + Math.sin(time * 2) * 2;
      
      ctx.globalAlpha = 0.25;
      const glowGradient = ctx.createRadialGradient(startX, startY, 0, startX, startY, pulseRadius + 10);
      glowGradient.addColorStop(0, '#8B5CF6');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(startX, startY, pulseRadius + 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.arc(startX, startY, 22, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#8B5CF640';
      ctx.beginPath();
      ctx.arc(startX, startY, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F5F0EB';
      ctx.font = "600 10px 'Space Grotesk', sans-serif";
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
      {/* Canvas - wider */}
      <div className={`relative ${isMobile ? 'h-[520px]' : 'h-[380px]'} w-full`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Output nodes */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          const total = outputNodes.length;
          const spacing = isMobile ? 520 * 0.8 / (total - 1) : 380 * 0.85 / (total - 1);
          const startOffset = isMobile ? 520 * 0.1 : 380 * 0.075;
          const top = startOffset + i * spacing;
          
          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center gap-2"
              style={{ 
                right: isMobile ? '5%' : '4%',
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
                  boxShadow: `0 0 12px ${node.color}50`,
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
