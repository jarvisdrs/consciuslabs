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
  const [isMobile, setIsMobile] = useState(false);
  const timeRef = useRef(0);
  const animationRef = useRef<number>(0);

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
      timeRef.current += 0.015;

      // Layout - wider spread
      const startX = isMobile ? width * 0.12 : width * 0.08;
      const startY = height / 2;
      const boxCenterX = isMobile ? width * 0.78 : width * 0.85;
      
      // Box dimensions
      const boxW = isMobile ? 70 : 80;
      const boxH = isMobile ? 30 : 34;
      const cornerRadius = 10;
      const videoBoxW = isMobile ? 80 : 90;
      const videoBoxH = isMobile ? 50 : 58;

      // Calculate node Y positions with extra margin to prevent clipping
      const total = outputNodes.length;
      const topMargin = height * 0.12; // Increased from 0.06
      const bottomMargin = height * 0.12; // Increased from 0.06
      const availableHeight = height - topMargin - bottomMargin;
      const spacing = availableHeight / (total - 1);

      // Draw connection lines with flowing glow effect
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;
        const flowOffset = (timeRef.current + i * 0.15) % 1;

        // Draw the base line path
        ctx.beginPath();
        
        if (isMobile) {
          const midY = (startY + endY) / 2;
          ctx.moveTo(startX + videoBoxW/2, startY);
          ctx.bezierCurveTo(
            startX + videoBoxW/2 + 30, startY,
            boxCenterX - boxW/2 - 30, endY,
            boxCenterX - boxW/2, endY
          );
        } else {
          const midX = (startX + boxCenterX) / 2;
          ctx.moveTo(startX + videoBoxW/2, startY);
          ctx.bezierCurveTo(
            midX - 40, startY,
            midX + 40, endY,
            boxCenterX - boxW/2, endY
          );
        }
        
        // Create flowing gradient along the line
        const lineGradient = ctx.createLinearGradient(startX, startY, boxCenterX, endY);
        const glowWidth = 0.25;
        
        // Build gradient with moving glow spot
        for (let g = 0; g <= 1; g += 0.05) {
          const distFromGlow = Math.abs(g - flowOffset);
          const intensity = Math.max(0, 1 - distFromGlow / glowWidth);
          const alpha = 0.15 + intensity * 0.7;
          lineGradient.addColorStop(g, color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
        }
        
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Add glow effect on top
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Draw VIDEO source box - static glow only
      ctx.save();
      ctx.translate(startX, startY);
      
      // Static glow
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 20;
      
      // Rounded rect background
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.roundRect(-videoBoxW / 2, -videoBoxH / 2, videoBoxW, videoBoxH, cornerRadius);
      ctx.fill();
      
      // Border - static
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      
      // Inner glow - static
      ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.beginPath();
      ctx.roundRect(-videoBoxW / 2 + 3, -videoBoxH / 2 + 3, videoBoxW - 6, videoBoxH - 6, cornerRadius - 3);
      ctx.fill();
      
      // Text
      ctx.fillStyle = '#F5F0EB';
      ctx.font = "700 13px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', 0, 0);
      
      ctx.restore();

      // Draw OUTPUT boxes - static glow only
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;
        
        ctx.save();
        ctx.translate(boxCenterX, endY);
        
        // Static glow
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        
        // Rounded rect background
        ctx.fillStyle = 'hsl(220 20% 6%)';
        ctx.beginPath();
        ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, cornerRadius);
        ctx.fill();

        // Border - static
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.shadowBlur = 0;

        // Inner glow - static
        ctx.fillStyle = color + '40';
        ctx.beginPath();
        ctx.roundRect(-boxW / 2 + 2, -boxH / 2 + 2, boxW - 4, boxH - 4, cornerRadius - 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#F5F0EB';
        ctx.font = `600 ${boxH * 0.35}px 'Space Grotesk', sans-serif`;
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

  // Larger container area
  const containerHeight = isMobile ? 720 : 640;

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
