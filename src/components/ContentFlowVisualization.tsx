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

      // Layout Configuration
      const total = outputNodes.length;
      let startX, startY, boxPositions: { x: number; y: number; color: string }[] = [];
      let boxW, boxH, videoBoxW, videoBoxH;
      const cornerRadius = 10;

      if (isMobile) {
        // MOBILE: Circular layout
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.38; // Circle radius

        // VIDEO box in center (smaller for mobile)
        startX = centerX;
        startY = centerY;
        videoBoxW = 70;
        videoBoxH = 44;
        boxW = 58;
        boxH = 26;

        // Calculate 10 positions around the circle
        outputNodes.forEach((node, i) => {
          const angle = (i / total) * Math.PI * 2 - Math.PI / 2; // Start from top
          boxPositions.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            color: node.color
          });
        });
      } else {
        // DESKTOP: Original linear layout (unchanged)
        startX = width * 0.08;
        startY = height / 2;
        const boxCenterX = width * 0.85;

        boxW = 80;
        boxH = 34;
        videoBoxW = 90;
        videoBoxH = 58;

        const topMargin = height * 0.12;
        const bottomMargin = height * 0.12;
        const availableHeight = height - topMargin - bottomMargin;
        const spacing = availableHeight / (total - 1);

        outputNodes.forEach((node, i) => {
          boxPositions.push({
            x: boxCenterX,
            y: topMargin + i * spacing,
            color: node.color
          });
        });
      }

      // Draw connection lines with flowing glow effect
      outputNodes.forEach((node, i) => {
        const endPos = boxPositions[i];
        const color = node.color;
        const flowOffset = (timeRef.current + i * 0.12) % 1.3;

        // Calculate path points
        let startPt, endPt, cp1, cp2;

        if (isMobile) {
          // Mobile: straight line from center to circle position
          startPt = { x: startX, y: startY };
          endPt = { x: endPos.x, y: endPos.y };
          // Simple control points for gentle curve
          const midX = (startPt.x + endPt.x) / 2;
          const midY = (startPt.y + endPos.y) / 2;
          cp1 = { x: midX, y: startPt.y };
          cp2 = { x: midX, y: endPos.y };
        } else {
          // Desktop: original bezier curve
          startPt = { x: startX + videoBoxW/2, y: startY };
          endPt = { x: endPos.x, y: endPos.y };
          const midX = (startX + endPos.x) / 2;
          cp1 = { x: midX - 40, y: startY };
          cp2 = { x: midX + 40, y: endPos.y };
        }

        // Draw base line (very subtle, always visible)
        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endPt.x, endPt.y);
        ctx.strokeStyle = color + '15';
        ctx.lineWidth = isMobile ? 0.8 : 1;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Draw flowing line segments with trail effect (simplified for mobile)
        const trailCount = isMobile ? 3 : 5;
        const trailSpacing = 0.08;
        
        for (let t = 0; t < trailCount; t++) {
          const segmentOffset = (flowOffset - t * trailSpacing) % 1.4;
          if (segmentOffset < 0 || segmentOffset > 1.2) continue;
          
          const segStartT = Math.max(0, segmentOffset - 0.15);
          const segEndT = Math.min(1, segmentOffset);
          
          const trailAlpha = Math.pow(1 - t / trailCount, 1.5) * (isMobile ? 0.7 : 0.9);
          
          ctx.beginPath();
          
          const steps = isMobile ? 8 : 15;
          for (let s = 0; s <= steps; s++) {
            const tCurve = segStartT + (segEndT - segStartT) * (s / steps);
            if (tCurve < 0 || tCurve > 1) continue;
            
            const mt = 1 - tCurve;
            const x = mt*mt*mt*startPt.x + 3*mt*mt*tCurve*cp1.x + 3*mt*tCurve*tCurve*cp2.x + tCurve*tCurve*tCurve*endPt.x;
            const y = mt*mt*mt*startPt.y + 3*mt*mt*tCurve*cp1.y + 3*mt*tCurve*tCurve*cp2.y + tCurve*tCurve*tCurve*endPt.y;
            
            if (s === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          let finalAlpha = trailAlpha;
          if (segmentOffset > 0.8) {
            const fadeProgress = (segmentOffset - 0.8) / 0.2;
            finalAlpha = trailAlpha * (1 - Math.pow(fadeProgress, 0.7));
          }
          
          const lineWidth = (isMobile ? 1.5 : 2) - t * (isMobile ? 0.15 : 0.25);
          ctx.strokeStyle = color + Math.round(finalAlpha * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = Math.max(0.5, lineWidth);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
          
          if (t < 2 && finalAlpha > 0.3 && !isMobile) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 8 - t * 3;
            ctx.globalAlpha = finalAlpha * 0.6;
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        }
        
        // Draw continuous flowing glow line (simplified for mobile)
        if (!isMobile) {
          const glowOffset = (timeRef.current * 0.6 + i * 0.15) % 1.3;
          ctx.beginPath();
          
          for (let s = 0; s <= 50; s++) {
            const tCurve = s / 50;
            const mt = 1 - tCurve;
            const x = mt*mt*mt*startPt.x + 3*mt*mt*tCurve*cp1.x + 3*mt*tCurve*tCurve*cp2.x + tCurve*tCurve*tCurve*endPt.x;
            const y = mt*mt*mt*startPt.y + 3*mt*mt*tCurve*cp1.y + 3*mt*tCurve*tCurve*cp2.y + tCurve*tCurve*tCurve*endPt.y;
            
            if (s === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          const glowGradient = ctx.createLinearGradient(startPt.x, startPt.y, endPt.x, endPt.y);
          const glowWidth = 0.25;
          
          for (let g = 0; g <= 1; g += 0.02) {
            const distFromGlow = Math.abs(g - glowOffset);
            const intensity = Math.max(0, 1 - distFromGlow / glowWidth);
            
            let baseAlpha = 0.05;
            if (g > 0.8) {
              const fadeInBox = (g - 0.8) / 0.2;
              baseAlpha = 0.05 * Math.pow(1 - fadeInBox, 0.5);
            }
            
            const alpha = baseAlpha + intensity * 0.4;
            const clampedAlpha = Math.max(0, Math.min(1, alpha));
            glowGradient.addColorStop(g, color + Math.round(clampedAlpha * 255).toString(16).padStart(2, '0'));
          }
          
          ctx.strokeStyle = glowGradient;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      });

      // Draw VIDEO source box - static glow only
      ctx.save();
      ctx.translate(startX, startY);

      // Static glow (reduced on mobile)
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = isMobile ? 12 : 20;

      // Rounded rect background
      ctx.fillStyle = 'hsl(220 20% 6%)';
      ctx.beginPath();
      ctx.roundRect(-videoBoxW / 2, -videoBoxH / 2, videoBoxW, videoBoxH, cornerRadius);
      ctx.fill();

      // Border - static
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = isMobile ? 1.5 : 2;
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Inner glow - static
      ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.beginPath();
      ctx.roundRect(-videoBoxW / 2 + 3, -videoBoxH / 2 + 3, videoBoxW - 6, videoBoxH - 6, cornerRadius - 3);
      ctx.fill();

      // Text
      ctx.fillStyle = '#F5F0EB';
      ctx.font = isMobile
        ? "700 11px 'Space Grotesk', sans-serif"
        : "700 13px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIDEO', 0, 0);

      ctx.restore();

      // Draw OUTPUT boxes - static glow only
      outputNodes.forEach((node, i) => {
        const endPos = boxPositions[i];
        const color = node.color;

        ctx.save();
        ctx.translate(endPos.x, endPos.y);

        // Static glow
        ctx.shadowColor = color;
        ctx.shadowBlur = isMobile ? 8 : 15;

        // Rounded rect background
        ctx.fillStyle = 'hsl(220 20% 6%)';
        ctx.beginPath();
        ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, cornerRadius);
        ctx.fill();

        // Border - static
        ctx.strokeStyle = color;
        ctx.lineWidth = isMobile ? 1 : 1.5;
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Inner glow - static
        ctx.fillStyle = color + '40';
        ctx.beginPath();
        ctx.roundRect(-boxW / 2 + 2, -boxH / 2 + 2, boxW - 4, boxH - 4, cornerRadius - 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#F5F0EB';
        const fontSize = isMobile ? boxH * 0.32 : boxH * 0.35;
        ctx.font = `600 ${fontSize}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Truncate long labels on mobile
        let label = node.label;
        if (isMobile && label.length > 8) {
          label = label.substring(0, 7) + '..';
        }
        ctx.fillText(label, 0, 0);

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

  // Container height - smaller on mobile for circular layout
  const containerHeight = isMobile ? 420 : 640;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-12 relative w-full pb-4"
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
