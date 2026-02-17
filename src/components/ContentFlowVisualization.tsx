import { motion } from 'framer-motion';
import { 
  FileText, Mail, Image, 
  Mic, Smartphone, Briefcase, Newspaper, Target, Video
} from 'lucide-react';

// Custom X icon
function XIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

const outputNodes = [
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-16 relative w-full"
    >
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {/* VIDEO Source */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white text-xs font-bold">VIDEO</span>
          </div>
        </motion.div>

        {/* Arrow */}
        <div className="text-muted-foreground">→</div>

        {/* Output Nodes */}
        <div className="grid grid-cols-5 gap-3">
          {outputNodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="flex flex-col items-center gap-1"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center border"
                  style={{ 
                    borderColor: node.color,
                    backgroundColor: 'hsl(220 18% 10%)',
                    boxShadow: `0 0 8px ${node.color}40`,
                  }}
                >
                  <Icon size={16} color={node.color} />
                </div>
                <span className="text-[10px] text-muted-foreground">{node.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
