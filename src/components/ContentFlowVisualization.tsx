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
      timeRef.current += 0.01;
      const time = timeRef.current;

      // Centered layout - shorter flow
      const startX = isMobile ? width * 0.15 : width * 0.22;
      const startY = height / 2;
      const iconX = isMobile ? width * 0.75 : width * 0.78; // Closer to center
      const nodeRadius = isMobile ? 14 : 16;

      // Calculate node positions (n8n style - evenly distributed)
      const nodePositions = outputNodes.map((_, i) => {
        const total = outputNodes.length;
        const availableHeight = height * 0.85;
        const topMargin = height * 0.075;
        const spacing = availableHeight / (total - 1);
        const y = topMargin + i * spacing;
        return { x: iconX, y };
      });

      // Draw connection lines from center to each node (n8n style)
      outputNodes.forEach((node, i) => {
        const endPos = nodePositions[i];
        const color = node.color;

        ctx.beginPath();
        
        // n8n style: straight lines from center, diverging cleanly
        if (isMobile) {
          // Mobile: lines from left center spreading right
          ctx.moveTo(startX + 20, startY);
          
          // Control point for smooth curve to node
          const midX = (startX + endPos.x) / 2;
          ctx.quadraticCurveTo(midX, startY, midX, endPos.y);
          ctx.lineTo(endPos.x - nodeRadius - 2, endPos.y);
        } else {
          // Desktop: lines from center spreading to right
          // Start from video node edge
          ctx.moveTo(startX + 20, startY);
          
          // Straight horizontal then curve to node (n8n elbow style)
          const elbowX = startX + (endPos.x - startX) * 0.4;
          ctx.lineTo(elbowX, startY);
          ctx.quadraticCurveTo(elbowX + 20, startY, elbowX + 20, endPos.y);
          ctx.lineTo(endPos.x - nodeRadius - 3, endPos.y);
        }
        
        // Create flowing gradient
        const gradient = ctx.createLinearGradient(startX, startY, endPos.x, endPos.y);
        const offset = (time + i * 0.08) % 1;
        const glowWidth = 0.2;
        
        gradient.addColorStop(0, color + '30');
        gradient.addColorStop(Math.max(0, offset - glowWidth), color + '50');
        gradient.addColorStop(offset, color);
        gradient.addColorStop(Math.min(1, offset + glowWidth), color + '50');
        gradient.addColorStop(1, color + '30');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Glow effect
        ctx.strokeStyle = color;
        ctx.lineWidth = 6;
        ctx.globalAlpha = 0.2;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Connector dot at the end (before icon)
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(endPos.x - nodeRadius - 3, endPos.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw VIDEO source node (center-left)
      const pulseRadius = 26 + Math.sin(time * 2.5) * 2;
      
      // Outer glow
      ctx.globalAlpha = 0.3;
      const glowGradient = ctx.createRadialGradient(startX, startY, 0, startX, startY, pulseRadius + 8);
      glowGradient.addColorStop(0, '#8B5CF6');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(startX, startY, pulseRadius + 8, 0, Math.PI * 2);
      ctx.fill();

      // Core circle
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.arc(startX, startY, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner glow
      ctx.fillStyle = '#8B5CF640';
      ctx.beginPath();
      ctx.arc(startX, startY, 14, 0, Math.PI * 2);
      ctx.fill();

      // VIDEO label
      ctx.fillStyle = '#F5F0EB';
      ctx.font = "600 9px 'Space Grotesk', sans-serif";
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
      <div className={`relative ${isMobile ? 'h-[480px]' : 'h-[320px]'} w-full max-w-4xl mx-auto`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Output nodes - positioned at line endings */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          const total = outputNodes.length;
          const availableHeight = isMobile ? 480 * 0.85 : 320 * 0.85;
          const topMargin = isMobile ? 480 * 0.075 : 320 * 0.075;
          const spacing = availableHeight / (total - 1);
          const top = topMargin + i * spacing;
          
          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center gap-2"
              style={{ 
                left: isMobile ? 'auto' : '78%',
                right: isMobile ? '8%' : 'auto',
                top: `${top}px`,
                transform: 'translateY(-50%)',
              }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.03 }}
            >
              {/* Icon first */}
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
              
              {/* Label to the right of icon */}
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
