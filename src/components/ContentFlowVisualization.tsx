import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface OutputNode {
  id: string;
  label: string;
  color: string;
}

const outputNodes: OutputNode[] = [
  { id: 'blog', label: 'Blog', color: '#8B5CF6' },
  { id: 'newsletter', label: 'News', color: '#A78BFA' },
  { id: 'x', label: 'X', color: '#E5E5E5' },
  { id: 'reel', label: 'Reel', color: '#34D399' },
  { id: 'infografica', label: 'Info', color: '#10B981' },
  { id: 'podcast', label: 'Podcast', color: '#F59E0B' },
  { id: 'story', label: 'Story', color: '#EF4444' },
  { id: 'articolo', label: 'Articolo', color: '#EC4899' },
  { id: 'linkedin', label: 'LinkedIn', color: '#3B82F6' },
  { id: 'adcopy', label: 'Ad Copy', color: '#8B5CF6' },
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

      // Layout
      const startX = isMobile ? width * 0.15 : width * 0.1;
      const startY = height / 2;
      const labelCenterX = isMobile ? width * 0.42 : width * 0.5;
      
      // Pill shape dimensions
      const videoPillW = isMobile ? 70 : 80;
      const videoPillH = isMobile ? 36 : 40;
      const labelPillW = isMobile ? 65 : 75;
      const labelPillH = isMobile ? 32 : 36;
      const cornerRadius = 18;

      // Calculate positions
      const total = outputNodes.length;
      const topMargin = height * 0.03;
      const bottomMargin = height * 0.03;
      const availableHeight = height - topMargin - bottomMargin;
      const spacing = availableHeight / (total - 1);

      // Draw flows
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;

        ctx.beginPath();
        
        const narrowWidth = isMobile ? 2.5 : 3;
        
        ctx.moveTo(startX, startY - narrowWidth);
        ctx.quadraticCurveTo(
          (startX + labelCenterX) / 2, startY - narrowWidth,
          labelCenterX - labelPillW / 2 - 5, endY - labelPillH / 2 + 5
        );
        ctx.lineTo(labelCenterX - labelPillW / 2 - 5, endY + labelPillH / 2 - 5);
        ctx.quadraticCurveTo(
          (startX + labelCenterX) / 2, startY + narrowWidth,
          startX, startY + narrowWidth
        );
        
        ctx.closePath();

        // Flowing gradient
        const gradient = ctx.createLinearGradient(startX, startY, labelCenterX, endY);
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
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw VIDEO pill (left)
      const videoPulse = 1 + Math.sin(time * 2) * 0.05;
      
      ctx.save();
      ctx.translate(startX, startY);
      ctx.scale(videoPulse, videoPulse);
      
      // Glow
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 25;
      
      // Pill background
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.roundRect(-videoPillW / 2, -videoPillH / 2, videoPillW, videoPillH, cornerRadius);
      ctx.fill();
      
      // Border
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      
      // Inner glow
      ctx.fillStyle = '#8B5CF650';
      ctx.beginPath();
      ctx.roundRect(-videoPillW / 2 + 4, -videoPillH / 2 + 4, videoPillW - 8, videoPillH - 8, cornerRadius - 4);
      ctx.fill();
      
      // Text
      ctx.fillStyle = '#F5F0EB';
      ctx.font = "700 12px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', 0, 0);
      
      ctx.restore();

      // Draw output pills (right side)
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;
        
        ctx.save();
        ctx.translate(labelCenterX, endY);
        
        // Glow
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        
        // Pill background
        ctx.fillStyle = 'hsl(220 20% 6%)';
        ctx.beginPath();
        ctx.roundRect(-labelPillW / 2, -labelPillH / 2, labelPillW, labelPillH, cornerRadius);
        ctx.fill();
        
        // Border
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        
        // Inner glow
        ctx.fillStyle = color + '40';
        ctx.beginPath();
        ctx.roundRect(-labelPillW / 2 + 3, -labelPillH / 2 + 3, labelPillW - 6, labelPillH - 6, cornerRadius - 3);
        ctx.fill();
        
        // Label text
        ctx.fillStyle = '#F5F0EB';
        ctx.font = "600 11px 'Space Grotesk', sans-serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, 0, 0);
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  const containerHeight = isMobile ? 580 : 460;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full pb-12"
    >
      <div 
        className="relative w-full"
        style={{ height: `${containerHeight}px` }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
      </div>
    </motion.div>
  );
}
