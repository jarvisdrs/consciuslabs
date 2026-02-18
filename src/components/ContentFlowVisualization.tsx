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
      const startX = isMobile ? width * 0.12 : width * 0.08;
      const startY = height / 2;
      const boxCenterX = isMobile ? width * 0.65 : width * 0.7;
      
      // Box dimensions - WIDER for full labels
      const boxW = isMobile ? 95 : 110;
      const boxH = isMobile ? 32 : 36;
      const cornerRadius = 8;
      const videoBoxW = isMobile ? 70 : 80;
      const videoBoxH = isMobile ? 36 : 40;

      // Calculate positions - MORE SPACING
      const total = outputNodes.length;
      const topMargin = height * 0.05;
      const bottomMargin = height * 0.05;
      const availableHeight = height - topMargin - bottomMargin;
      const spacing = availableHeight / (total - 1);

      // Draw energy flows
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;

        ctx.beginPath();
        
        const narrowWidth = isMobile ? 2.5 : 3;
        
        ctx.moveTo(startX, startY - narrowWidth);
        ctx.quadraticCurveTo(
          (startX + boxCenterX) / 2, startY - narrowWidth,
          boxCenterX - boxW / 2 - 5, endY
        );
        ctx.lineTo(boxCenterX + boxW / 2 + 5, endY);
        ctx.quadraticCurveTo(
          (startX + boxCenterX) / 2, startY + narrowWidth,
          startX, startY + narrowWidth
        );
        
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

        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw VIDEO source box (left side)
      const videoPulse = 1 + Math.sin(time * 2) * 0.03;
      
      ctx.save();
      ctx.translate(startX, startY);
      ctx.scale(videoPulse, videoPulse);
      
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 25;
      
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.roundRect(-videoBoxW / 2, -videoBoxH / 2, videoBoxW, videoBoxH, cornerRadius);
      ctx.fill();
      
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = '#8B5CF660';
      ctx.beginPath();
      ctx.roundRect(-videoBoxW / 2 + 4, -videoBoxH / 2 + 4, videoBoxW - 8, videoBoxH - 8, cornerRadius - 4);
      ctx.fill();
      
      ctx.fillStyle = '#F5F0EB';
      ctx.font = "700 12px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', 0, 0);
      
      ctx.restore();

      // Draw OUTPUT boxes (right side) - FULL LABELS INSIDE
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;
        const pulse = 1 + Math.sin(time * 2 + i * 0.3) * 0.02;
        
        ctx.save();
        ctx.translate(boxCenterX, endY);
        ctx.scale(pulse, pulse);
        
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        
        ctx.fillStyle = 'hsl(220 20% 6%)';
        ctx.beginPath();
        ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, cornerRadius);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.shadowBlur = 0;

        ctx.fillStyle = color + '35';
        ctx.beginPath();
        ctx.roundRect(-boxW / 2 + 2, -boxH / 2 + 2, boxW - 4, boxH - 4, cornerRadius - 2);
        ctx.fill();

        // FULL LABEL inside box - adjusted font size
        ctx.fillStyle = '#F5F0EB';
        
        // Determine font size based on label length
        const fontSize = node.label.length > 8 ? boxH * 0.28 : boxH * 0.32;
        ctx.font = `600 ${fontSize}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Split long labels
        if (node.label.length > 10) {
          const words = node.label.split(' ');
          ctx.fillText(words[0], 0, -4);
          ctx.fillText(words.slice(1).join(' '), 0, 6);
        } else {
          ctx.fillText(node.label, 0, 0);
        }
        
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

  // TALLER container to prevent overlap
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
