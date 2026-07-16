import { motion } from 'motion/react';

interface ButterflyProps {
  className?: string;
  delay?: number;
  duration?: number;
  scale?: number;
  color?: string;
}

export const Butterfly = ({ className = '', delay = 0, duration = 8, scale = 1, color = "#dfa856" }: ButterflyProps) => {
  return (
    <motion.div
      className={`absolute w-10 h-10 pointer-events-none z-10 drop-shadow-md ${className}`}
      style={{ color }}
      initial={{ opacity: 0, scale: scale * 0.5 }}
      animate={{
        opacity: [0, 0.9, 1, 0.9, 0],
        y: ["0vh", "-10vh", "5vh", "-15vh"],
        x: ["0vw", "5vw", "-5vw", "10vw"],
        rotateZ: [-15, 15, -10, 20],
        scale: [scale * 0.8, scale, scale * 0.9, scale],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <motion.div
        className="w-full h-full drop-shadow-xl"
        animate={{ rotateY: [0, 70, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      >
        <svg viewBox="0 0 64 64" fill="currentColor" width="100%" height="100%">
          <path d="M32,33.5c-1.5-4.2-6.2-12.8-15.3-15.5c-8.9-2.6-11.8,2.7-11.8,5.4c0,5.7,8.8,11.3,16,13.5
          c-5.9,1.1-13.6,3.6-16.7,8.6c-2.3,3.8-0.3,7.5,3.1,8.3c5.3,1.3,13.1-4.2,21.5-16.1l3.2,12.4l3.2-12.4c8.4,11.9,16.2,17.4,21.5,16.1
          c3.4-0.8,5.4-4.5,3.1-8.3c-3.1-5-10.8-7.5-16.7-8.6c7.2-2.2,16-7.8,16-13.5c0-2.7-2.9-8-11.8-5.4C48.2,20.7,43.5,29.3,42,33.5
          C42,33.5,32,33.5,32,33.5z"/>
        </svg>
      </motion.div>
    </motion.div>
  );
};
