import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface OutputNode {
  id: string;
  label: string;
  color: string;
}

const outputNodes: OutputNode[] = [
  { id: 'blog', label: 'Blog Post', color: '#8B5CF6' },
  { id: 'newsletter', label: 'Newsletter', color: '#A78BFA' },
  { id: 'x', label: 'X', color: '#E5E5E5' },
  { id: 'reel', label: 'Reel', color: '#34D399' },
  { id: 'infografica', label: 'Infografica', color: '#10B981' },
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
      const startX = isMobile ? width * 0.18 : width * 0.12;
      const startY = height / 2;
      const boxCenterX = isMobile ? width * 0.72 : width * 0.78;
      
      // Box dimensions (rounded rectangles) - WIDER for full labels
      const boxW = isMobile ? 95 : 110;
      const boxH = isMobile ? 44 : 48;
      const cornerRadius = 12;
      const videoBoxW = isMobile ? 64 : 68;
      const videoBoxH = isMobile ? 64 : 68;

      // Calculate node Y positions
      const total = outputNodes.length;
      const topMargin = height * 0.04;
      const bottomMargin = height * 0.04;
      const availableHeight = height - topMargin - bottomMargin;
      const spacing = availableHeight / (total - 1);

      // Draw energy flows
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;

        ctx.beginPath();
        
        const narrowWidth = isMobile ? 3 : 4;
        
        if (isMobile) {
          const midY = (startY + endY) / 2;
          
          ctx.moveTo(startX, startY - narrowWidth);
          ctx.bezierCurveTo(
            startX - narrowWidth * 2, midY,
            boxCenterX - boxW / 2 - 5, endY - boxH / 2 + 8,
            boxCenterX - boxW / 2, endY
          );
          ctx.lineTo(boxCenterX + boxW / 2, endY);
          ctx.bezierCurveTo(
            boxCenterX + boxW / 2 + 5, endY + boxH / 2 - 8,
            startX + narrowWidth * 2, midY,
            startX, startY + narrowWidth
          );
        } else {
          const midX = (startX + boxCenterX) / 2;
          
          ctx.moveTo(startX, startY - narrowWidth);
          ctx.bezierCurveTo(
            midX - 60, startY - narrowWidth * 0.5,
            midX + 40, endY - boxH / 2 + 10,
            boxCenterX - boxW / 2, endY
          );
          ctx.lineTo(boxCenterX + boxW / 2, endY);
          ctx.bezierCurveTo(
            midX + 40, endY + boxH / 2 - 10,
            midX - 60, startY + narrowWidth * 0.5,
            startX, startY + narrowWidth
          );
        }
        
        ctx.closePath();

        // Flowing gradient
        const gradient = ctx.createLinearGradient(startX, startY, boxCenterX, endY);
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
      });

      // Draw VIDEO source box (left side) - Rounded Rectangle
      const videoPulse = 1 + Math.sin(time * 2) * 0.03;
      
      ctx.save();
      ctx.translate(startX, startY);
      ctx.scale(videoPulse, videoPulse);
      
      // Glow
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 25;
      
      // Rounded rect background
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.roundRect(-videoBoxW / 2, -videoBoxH / 2, videoBoxW, videoBoxH, cornerRadius);
      ctx.fill();
      
      // Border
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      
      // Inner glow
      ctx.fillStyle = '#8B5CF660';
      ctx.beginPath();
      ctx.roundRect(-videoBoxW / 2 + 4, -videoBoxH / 2 + 4, videoBoxW - 8, videoBoxH - 8, cornerRadius - 4);
      ctx.fill();
      
      // Text
      ctx.fillStyle = '#F5F0EB';
      ctx.font = "700 12px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', 0, 0);
      
      ctx.restore();

      // Draw OUTPUT boxes (right side) - Rounded Rectangles with FULL LABELS inside
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;
        const pulse = 1 + Math.sin(time * 2 + i * 0.3) * 0.02;
        
        ctx.save();
        ctx.translate(boxCenterX, endY);
        ctx.scale(pulse, pulse);
        
        // Glow
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        
        // Rounded rect background
        ctx.fillStyle = 'hsl(220 20% 6%)';
        ctx.beginPath();
        ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, cornerRadius);
        ctx.fill();

        // Border
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.shadowBlur = 0;

        // Inner glow
        ctx.fillStyle = color + '40';
        ctx.beginPath();
        ctx.roundRect(-boxW / 2 + 3, -boxH / 2 + 3, boxW - 6, boxH - 6, cornerRadius - 3);
        ctx.fill();

        // FULL LABEL inside box (no letter, no external label)
        ctx.fillStyle = '#F5F0EB';
        ctx.font = `600 ${boxH * 0.32}px 'Space Grotesk', sans-serif`;
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

  // TALLER container
  const containerHeight = isMobile ? 680 : 560;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full pb-20"
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
