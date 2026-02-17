import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Mail, Twitter, Image, 
  Mic, Smartphone, Briefcase, Newspaper, Target, Video
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

      const centerX = isMobile ? width * 0.5 : width * 0.15;
      const centerY = height / 2;
      const endX = isMobile ? width * 0.5 : width * 0.88;
      const spreadStart = isMobile ? height * 0.18 : width * 0.35; // Where lines start spreading
      const iconX = isMobile ? width * 0.5 : width * 0.92;

      // Calculate node positions (for reference)
      const nodePositions = outputNodes.map((_, i) => {
        const total = outputNodes.length;
        const spacing = isMobile ? height * 0.75 / total : height * 0.8 / total;
        const startOffset = isMobile ? height * 0.15 : height * 0.1;
        const y = isMobile 
          ? startOffset + i * spacing
          : height * 0.1 + i * spacing + spacing / 2;
        return { x: iconX, y };
      });

      // Draw each flow line
      outputNodes.forEach((node, i) => {
        const endPos = nodePositions[i];
        const color = node.color;

        // Create funnel path:
        // 1. Start from center (narrow)
        // 2. Stay narrow until spreadStart
        // 3. Then diverge to respective node
        
        ctx.beginPath();
        
        // Determine control points for funnel effect
        const narrowWidth = isMobile ? 3 : 4;
        const spreadWidth = isMobile ? 2 : 2.5;
        
        // Left side of line (top when horizontal, left when vertical)
        // Start from center
        if (isMobile) {
          // Vertical layout: funnel spreads downward
          const funnelY = centerY - 30;
          ctx.moveTo(centerX - narrowWidth, centerY);
          ctx.lineTo(centerX - narrowWidth, funnelY);
          ctx.quadraticCurveTo(
            centerX - spreadWidth * 3, 
            (funnelY + endPos.y) / 2,
            endPos.x - spreadWidth * 4, 
            endPos.y
          );
          ctx.lineTo(endPos.x + spreadWidth * 4, endPos.y);
          ctx.quadraticCurveTo(
            centerX + spreadWidth * 3, 
            (funnelY + endPos.y) / 2,
            centerX + narrowWidth, 
            funnelY
          );
          ctx.lineTo(centerX + narrowWidth, centerY);
        } else {
          // Horizontal layout: funnel spreads to right
          const funnelX = spreadStart;
          ctx.moveTo(centerX, centerY - narrowWidth);
          ctx.lineTo(funnelX, centerY - narrowWidth);
          ctx.quadraticCurveTo(
            (funnelX + endPos.x) / 2, 
            centerY - spreadWidth * 2,
            endPos.x - 25, 
            endPos.y - spreadWidth
          );
          ctx.lineTo(endPos.x - 25, endPos.y + spreadWidth);
          ctx.quadraticCurveTo(
            (funnelX + endPos.x) / 2, 
            centerY + spreadWidth * 2,
            funnelX, 
            centerY + narrowWidth
          );
          ctx.lineTo(centerX, centerY + narrowWidth);
        }
        
        ctx.closePath();

        // Create gradient for flowing glow effect
        const gradient = ctx.createLinearGradient(
          isMobile ? 0 : centerX, 
          isMobile ? centerY : 0,
          isMobile ? 0 : endPos.x,
          isMobile ? endPos.y : 0
        );

        // Animate the gradient stops for flowing effect
        const offset = (time + i * 0.1) % 1;
        const glowWidth = 0.15;
        
        gradient.addColorStop(0, color + '20');
        gradient.addColorStop(Math.max(0, offset - glowWidth), color + '30');
        gradient.addColorStop(offset, color + 'FF');
        gradient.addColorStop(Math.min(1, offset + glowWidth), color + '30');
        gradient.addColorStop(1, color + '20');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw outline
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Draw connecting line to icon
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        if (isMobile) {
          ctx.moveTo(endPos.x - spreadWidth * 4, endPos.y);
          ctx.lineTo(endPos.x - 18, endPos.y);
        } else {
          ctx.moveTo(endPos.x - 25, endPos.y);
          ctx.lineTo(endPos.x - 14, endPos.y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw VIDEO source node
      const pulseRadius = 28 + Math.sin(time * 3) * 2;
      
      // Outer glow
      ctx.globalAlpha = 0.25;
      const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius + 10);
      glowGradient.addColorStop(0, '#8B5CF6');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius + 10, 0, Math.PI * 2);
      ctx.fill();

      // Core circle
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner glow
      ctx.fillStyle = '#8B5CF630';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
      ctx.fill();

      // VIDEO label
      ctx.fillStyle = '#F5F0EB';
      ctx.font = "600 10px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', centerX, centerY);

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
      <div className={`relative ${isMobile ? 'h-[500px]' : 'h-[360px]'} w-full`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Output icons - positioned at line endings */}
        {outputNodes.map((node, i) => {
          const Icon = node.icon;
          
          // Calculate position matching canvas
          const total = outputNodes.length;
          const spacing = isMobile ? 500 / total : 360 * 0.8 / total;
          const startOffset = isMobile ? 75 : 36;
          
          const style: React.CSSProperties = isMobile ? {
            position: 'absolute',
            left: '50%',
            top: `${startOffset + i * spacing}px`,
            transform: 'translateX(-50%)',
          } : {
            position: 'absolute',
            right: '4%',
            top: `${10 + i * (80 / total) + (80 / total / 2)}%`,
            transform: 'translateY(-50%)',
          };
          
          return (
            <motion.div
              key={node.id}
              className="flex items-center gap-2"
              style={style}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.03 }}
            >
              {!isMobile && (
                <span 
                  className="text-xs font-medium whitespace-nowrap pr-2"
                  style={{ color: '#F5F0EB' }}
                >
                  {node.label}
                </span>
              )}
              <div 
                className="flex items-center justify-center w-7 h-7 rounded-full"
                style={{ 
                  backgroundColor: 'hsl(220 18% 10%)',
                  border: `1.5px solid ${node.color}`,
                  boxShadow: `0 0 10px ${node.color}60, inset 0 0 5px ${node.color}20`,
                }}
              >
                <Icon size={13} color={node.color} strokeWidth={1.5} />
              </div>
              {isMobile && (
                <span 
                  className="text-xs font-medium whitespace-nowrap"
                  style={{ color: '#F5F0EB' }}
                >
                  {node.label}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
