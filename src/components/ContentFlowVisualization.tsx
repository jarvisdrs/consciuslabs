import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface OutputNode {
  id: string;
  label: string;
  color: string;
  iconLetter: string;
}

const outputNodes: OutputNode[] = [
  { id: 'blog', label: 'Blog Post', color: '#8B5CF6', iconLetter: 'B' },
  { id: 'newsletter', label: 'Newsletter', color: '#A78BFA', iconLetter: 'N' },
  { id: 'x', label: 'X', color: '#E5E5E5', iconLetter: '𝕏' },
  { id: 'reel', label: 'Reel', color: '#34D399', iconLetter: 'R' },
  { id: 'infografica', label: 'Infografica', color: '#10B981', iconLetter: 'I' },
  { id: 'podcast', label: 'Podcast', color: '#F59E0B', iconLetter: 'P' },
  { id: 'story', label: 'Story', color: '#EF4444', iconLetter: 'S' },
  { id: 'articolo', label: 'Articolo', color: '#EC4899', iconLetter: 'A' },
  { id: 'linkedin', label: 'LinkedIn', color: '#3B82F6', iconLetter: 'in' },
  { id: 'adcopy', label: 'Ad Copy', color: '#8B5CF6', iconLetter: 'Ad' },
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
      const iconCenterX = isMobile ? width * 0.72 : width * 0.78;
      const iconRadius = isMobile ? 22 : 24;
      const videoRadius = isMobile ? 32 : 34;

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
        const spreadWidth = isMobile ? 3 : 4;
        
        if (isMobile) {
          const midY = (startY + endY) / 2;
          
          ctx.moveTo(startX - narrowWidth, startY);
          ctx.bezierCurveTo(
            startX - narrowWidth * 2, midY,
            iconCenterX - iconRadius * 1.2, endY - spreadWidth * 2,
            iconCenterX - iconRadius + 2, endY - spreadWidth
          );
          ctx.lineTo(iconCenterX - iconRadius + 2, endY + spreadWidth);
          ctx.bezierCurveTo(
            iconCenterX - iconRadius * 1.2, endY + spreadWidth * 2,
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

      // Draw VIDEO source node (left side)
      const videoPulse = videoRadius + 4 + Math.sin(time * 2) * 2;
      
      ctx.globalAlpha = 0.25;
      const videoGlow = ctx.createRadialGradient(startX, startY, 0, startX, startY, videoPulse + 10);
      videoGlow.addColorStop(0, '#8B5CF6');
      videoGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = videoGlow;
      ctx.beginPath();
      ctx.arc(startX, startY, videoPulse + 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.arc(startX, startY, videoRadius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#8B5CF660';
      ctx.beginPath();
      ctx.arc(startX, startY, videoRadius - 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F5F0EB';
      ctx.font = "700 12px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', startX, startY);

      // Draw OUTPUT nodes (right side) - SAME STYLE as VIDEO node
      outputNodes.forEach((node, i) => {
        const endY = topMargin + i * spacing;
        const color = node.color;
        const pulse = iconRadius + 3 + Math.sin(time * 2 + i * 0.3) * 1.5;

        // Outer glow
        ctx.globalAlpha = 0.2;
        const nodeGlow = ctx.createRadialGradient(iconCenterX, endY, 0, iconCenterX, endY, pulse + 8);
        nodeGlow.addColorStop(0, color);
        nodeGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(iconCenterX, endY, pulse + 8, 0, Math.PI * 2);
        ctx.fill();

        // Circle background
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'hsl(220 20% 6%)';
        ctx.beginPath();
        ctx.arc(iconCenterX, endY, iconRadius, 0, Math.PI * 2);
        ctx.fill();

        // Border with glow
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner glow
        ctx.fillStyle = color + '40';
        ctx.beginPath();
        ctx.arc(iconCenterX, endY, iconRadius - 6, 0, Math.PI * 2);
        ctx.fill();

        // Icon letter
        ctx.fillStyle = color;
        ctx.font = `700 ${iconRadius * 0.5}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.iconLetter, iconCenterX, endY);

        // Label to the right
        ctx.fillStyle = '#F5F0EB';
        ctx.font = "500 12px 'Inter', sans-serif";
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, iconCenterX + iconRadius + 12, endY);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  const containerHeight = isMobile ? 620 : 500;

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
