import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Video, Mail, Twitter, Image, 
  Mic, Smartphone, Briefcase, Newspaper, Target 
} from 'lucide-react';

interface OutputNode {
  id: string;
  label: string;
  icon: React.ElementType;
  position: { x: number; y: number };
  color: string;
}

const outputNodes: OutputNode[] = [
  { id: 'blog', label: 'Blog Post', icon: FileText, position: { x: 75, y: 10 }, color: '#8B5CF6' },
  { id: 'newsletter', label: 'Newsletter', icon: Mail, position: { x: 85, y: 25 }, color: '#A78BFA' },
  { id: 'tweet', label: 'Tweet / X', icon: Twitter, position: { x: 90, y: 40 }, color: '#60A5FA' },
  { id: 'reel', label: 'Reel', icon: Video, position: { x: 88, y: 55 }, color: '#34D399' },
  { id: 'infografica', label: 'Infografica', icon: Image, position: { x: 82, y: 70 }, color: '#10B981' },
  { id: 'podcast', label: 'Podcast Clip', icon: Mic, position: { x: 72, y: 82 }, color: '#F59E0B' },
  { id: 'story', label: 'Story', icon: Smartphone, position: { x: 58, y: 88 }, color: '#EF4444' },
  { id: 'articolo', label: 'Articolo', icon: Newspaper, position: { x: 42, y: 88 }, color: '#EC4899' },
  { id: 'linkedin', label: 'LinkedIn', icon: Briefcase, position: { x: 28, y: 82 }, color: '#3B82F6' },
  { id: 'adcopy', label: 'Ad Copy', icon: Target, position: { x: 18, y: 70 }, color: '#8B5CF6' },
];

export function ContentFlowVisualization() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [particles, setParticles] = useState<Array<{ id: number; nodeId: string; progress: number; speed: number }>>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate particles continuously
  useEffect(() => {
    const createParticle = () => {
      const randomNode = outputNodes[Math.floor(Math.random() * outputNodes.length)];
      return {
        id: Date.now() + Math.random(),
        nodeId: randomNode.id,
        progress: 0,
        speed: 0.005 + Math.random() * 0.003,
      };
    };

    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => p.progress < 1);
        if (filtered.length < 20) {
          return [...filtered, createParticle()];
        }
        return filtered;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          progress: p.progress + p.speed,
        })).filter(p => p.progress < 1)
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const getParticlePosition = useCallback((nodeId: string, progress: number) => {
    const node = outputNodes.find(n => n.id === nodeId);
    if (!node) return { x: 50, y: 50 };
    
    // Start from center-left (VIDEO node)
    const startX = isMobile ? 50 : 15;
    const startY = isMobile ? 15 : 50;
    
    // End at node position
    const endX = node.position.x;
    const endY = node.position.y;
    
    // Bezier curve for organic flow
    const controlX = isMobile ? 50 : 40;
    const controlY = isMobile ? 40 : 50;
    
    const t = progress;
    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
    const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
    
    return { x, y };
  }, [isMobile]);

  const isNodeActive = (nodeId: string) => {
    if (hoveredNode === nodeId) return true;
    if (isVideoHovered) return true;
    return false;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-16 relative w-full"
      ref={containerRef}
    >
      <div className={`relative ${isMobile ? 'h-[600px]' : 'h-[400px]'} w-full`}>
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow filters */}
            <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glow-accent" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Gradients */}
            <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Flow paths from VIDEO to each node */}
          {outputNodes.map((node) => {
            const isActive = isNodeActive(node.id);
            const startX = isMobile ? 50 : 15;
            const startY = isMobile ? 15 : 50;
            const controlX = isMobile ? 50 : 35;
            const controlY = isMobile ? 35 : 50;
            
            return (
              <g key={node.id}>
                {/* Base path - subtle */}
                <path
                  d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${node.position.x} ${node.position.y}`}
                  fill="none"
                  stroke={isActive ? node.color : 'hsl(220 16% 20%)'}
                  strokeWidth={isActive ? 0.4 : 0.2}
                  opacity={isActive ? 0.8 : 0.3}
                  className="transition-all duration-300"
                  filter={isActive ? 'url(#glow-violet)' : undefined}
                />
                
                {/* Animated flow line */}
                {isActive && (
                  <motion.path
                    d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${node.position.x} ${node.position.y}`}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={0.6}
                    strokeDasharray="4 2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 1,
                      strokeDashoffset: [0, -6],
                    }}
                    transition={{ 
                      pathLength: { duration: 0.8, ease: "easeOut" },
                      opacity: { duration: 0.3 },
                      strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" }
                    }}
                    filter="url(#glow-accent)"
                  />
                )}
              </g>
            );
          })}

          {/* Particles */}
          {particles.map((particle) => {
            const pos = getParticlePosition(particle.nodeId, particle.progress);
            const node = outputNodes.find(n => n.id === particle.nodeId);
            const isTargetHovered = hoveredNode === particle.nodeId;
            
            return (
              <circle
                key={particle.id}
                cx={pos.x}
                cy={pos.y}
                r={isTargetHovered ? 1.2 : 0.8}
                fill={node?.color || '#8B5CF6'}
                opacity={1 - particle.progress * 0.5}
                filter="url(#glow-accent)"
                className="transition-all duration-150"
              />
            );
          })}

          {/* VIDEO Source Node */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => !isMobile && setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
            onClick={() => isMobile && setIsVideoHovered(!isVideoHovered)}
          >
            {/* Outer glow ring */}
            <motion.circle
              cx={isMobile ? 50 : 15}
              cy={isMobile ? 15 : 50}
              r={isVideoHovered ? 8 : 6}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth={0.3}
              opacity={isVideoHovered ? 0.6 : 0.3}
              animate={{ 
                r: isVideoHovered ? [8, 10, 8] : [6, 7, 6],
                opacity: isVideoHovered ? [0.6, 0.3, 0.6] : [0.3, 0.15, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              filter="url(#glow-violet)"
            />
            
            {/* Main node circle */}
            <circle
              cx={isMobile ? 50 : 15}
              cy={isMobile ? 15 : 50}
              r={5}
              fill="hsl(220 20% 8%)"
              stroke="#8B5CF6"
              strokeWidth={0.5}
              filter={isVideoHovered ? 'url(#glow-violet)' : undefined}
              className="transition-all duration-300"
            />
            
            {/* VIDEO label */}
            <text
              x={isMobile ? 50 : 15}
              y={isMobile ? 24 : 58}
              textAnchor="middle"
              fill="#F5F0EB"
              fontSize="3"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="600"
              className="select-none"
            >
              VIDEO
            </text>
          </g>

          {/* Output Nodes */}
          {outputNodes.map((node) => {
            const Icon = node.icon;
            const isActive = isNodeActive(node.id);
            
            return (
              <g 
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => !isMobile && setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => isMobile && setHoveredNode(hoveredNode === node.id ? null : node.id)}
              >
                {/* Glow effect for active node */}
                {isActive && (
                  <motion.circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r={6}
                    fill={node.color}
                    opacity={0.2}
                    animate={{ 
                      r: [6, 8, 6],
                      opacity: [0.2, 0.1, 0.2]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    filter="url(#glow-violet)"
                  />
                )}
                
                {/* Node circle */}
                <motion.circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r={isActive ? 5 : 4}
                  fill={isActive ? 'hsl(220 20% 6%)' : 'hsl(220 18% 10%)'}
                  stroke={isActive ? node.color : 'hsl(220 16% 25%)'}
                  strokeWidth={0.4}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  filter={isActive ? 'url(#glow-accent)' : undefined}
                />
                
                {/* Icon */}
                <foreignObject
                  x={node.position.x - 2}
                  y={node.position.y - 2}
                  width={4}
                  height={4}
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon 
                      size={isMobile ? 14 : 10} 
                      color={isActive ? node.color : 'hsl(215 15% 55%)'}
                      strokeWidth={2}
                    />
                  </div>
                </foreignObject>
                
                {/* Label */}
                <motion.text
                  x={node.position.x}
                  y={node.position.y + 8}
                  textAnchor="middle"
                  fill={isActive ? '#F5F0EB' : 'hsl(215 15% 55%)'}
                  fontSize="2.5"
                  fontFamily="'Inter', sans-serif"
                  fontWeight={isActive ? '500' : '400'}
                  initial={{ opacity: 0, y: node.position.y + 6 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.7,
                    y: node.position.y + 8
                  }}
                  transition={{ duration: 0.3 }}
                  className="select-none"
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}
        </svg>

        {/* Mobile hint */}
        {isMobile && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-xs text-muted-foreground">
              Tocca un nodo per vedere il flusso
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
