import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface OutputNode {
  id: string;
  label: string;
  color: string;
  icon: string;
}

const outputNodes: OutputNode[] = [
  { id: 'blog', label: 'Blog', color: '#8B5CF6', icon: 'B' },
  { id: 'newsletter', label: 'News', color: '#A78BFA', icon: 'N' },
  { id: 'x', label: 'X', color: '#E5E5E5', icon: '𝕏' },
  { id: 'reel', label: 'Reel', color: '#34D399', icon: 'R' },
  { id: 'infografica', label: 'Info', color: '#10B981', icon: 'I' },
  { id: 'podcast', label: 'Pod', color: '#F59E0B', icon: 'P' },
  { id: 'story', label: 'Sto', color: '#EF4444', icon: 'S' },
  { id: 'articolo', label: 'Art', color: '#EC4899', icon: 'A' },
  { id: 'linkedin', label: 'in', color: '#3B82F6', icon: 'in' },
  { id: 'adcopy', label: 'Ad', color: '#8B5CF6', icon: 'Ad' },
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
      const iconCenterX = isMobile ? width * 0.75 : width * 0.82;
      const iconRadius = isMobile ? 22 : 20;

      // Calculate node Y positions
      const total = outputNodes.length;
      const topMargin = height * 0.06;
      const bottomMargin = height * 0.06;
      const availableHeight = height - topMargin - bottomMargin;
      const spacing = availableHeight / (total - 1);

      // Draw energy flows
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;

        // Draw flow channel
        ctx.beginPath();
        
        const narrowWidth = isMobile ? 3 : 4;
        const spreadWidth = isMobile ? 3 : 4;
        
        if (isMobile) {
          const midY = (startY + endY) / 2;
          
          ctx.moveTo(startX - narrowWidth, startY);
          ctx.bezierCurveTo(
            startX - narrowWidth * 2, midY,
            iconCenterX - iconRadius * 1.5, endY - spreadWidth * 2,
            iconCenterX - iconRadius + 2, endY - spreadWidth
          );
          ctx.lineTo(iconCenterX - iconRadius + 2, endY + spreadWidth);
          ctx.bezierCurveTo(
            iconCenterX - iconRadius * 1.5, endY + spreadWidth * 2,
            startX + narrowWidth * 2, midY,
            startX + narrowWidth, startY
          );
        } else {
          const midX = (startX + iconCenterX) / 2;
          
          ctx.moveTo(startX, startY - narrowWidth);
          ctx.bezierCurveTo(
            midX - 60, startY - narrowWidth * 0.5,
            midX + 40, endY - spreadWidth * 2.5,
            iconCenterX - iconRadius + 2, endY - spreadWidth
          );
          ctx.lineTo(iconCenterX - iconRadius + 2, endY + spreadWidth);
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
      });

      // Draw VIDEO source node
      const videoRadius = isMobile ? 35 : 32;
      const pulseRadius = videoRadius + 4 + Math.sin(time * 2) * 2;
      
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
      ctx.arc(startX, startY, videoRadius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#8B5CF660';
      ctx.beginPath();
      ctx.arc(startX, startY, videoRadius - 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F5F0EB';
      ctx.font = "700 13px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', startX, startY);

      // Draw output node icons ATTACHED to flow ends
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;

        // Icon circle
        ctx.fillStyle = 'hsl(220 18% 8%)';
        ctx.beginPath();
        ctx.arc(iconCenterX, endY, iconRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Icon text
        ctx.fillStyle = color;
        ctx.font = `700 ${iconRadius * 0.5}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.icon, iconCenterX, endY);

        // Label below icon
        ctx.fillStyle = '#F5F0EB';
        ctx.font = "500 11px 'Inter', sans-serif";
        ctx.fillText(node.label, iconCenterX, endY + iconRadius + 14);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  const containerHeight = isMobile ? 640 : 520;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full pb-16"
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
