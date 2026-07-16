import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Butterfly } from './Butterfly';
import { Pointer } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const butterflyColors = ['#dfa856', '#ffb84d', '#ffffff', '#e8c386', '#b3853f', '#ff9a00', '#d4bca3'];
const burstButterflies = Array.from({ length: 35 }).map((_, i) => {
  const angle = (Math.random() * Math.PI * 2);
  const distance = 150 + Math.random() * 400;
  const duration = 1.2 + Math.random() * 1.5;
  const delay = Math.random() * 0.5;
  return {
    id: i,
    color: butterflyColors[i % butterflyColors.length],
    scale: 0.3 + Math.random() * 0.7,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 100,
    duration,
    delay
  };
});

export const Intro = ({ onComplete }: IntroProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1800);
    return () => clearTimeout(t1);
  }, []);

  const handleOpen = () => {
    if (step !== 1) return;
    setStep(2);
    setTimeout(() => setStep(3), 800);
    setTimeout(() => setStep(4), 2000);
    setTimeout(() => onComplete(), 3000);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#120d0b] overflow-hidden perspective-[1000px]"
      animate={{ opacity: step >= 4 ? 0 : 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3a2818]/40 via-[#120d0b]/90 to-[#120d0b]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />
      
      <motion.div
        className="relative w-[300px] h-[190px] z-10 drop-shadow-2xl cursor-pointer"
        initial={{ y: "-100vh", rotateZ: -15 }}
        animate={{ y: 0, rotateZ: 0 }}
        transition={{ duration: 1.8, type: "spring", bounce: 0.3 }}
        onClick={handleOpen}
        whileHover={step === 1 ? { scale: 1.05 } : {}}
      >
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 z-40"
          animate={{
            y: step >= 1 ? "-100vh" : 0,
            x: step >= 1 ? "40vw" : "-50%",
            scale: step >= 1 ? 2 : 1,
            rotateZ: step >= 1 ? 45 : 0
          }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <Butterfly duration={2} scale={1.3} />
        </motion.div>

        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#d4bca3] rounded-md shadow-2xl border border-[#b89e82]"></div>

        {/* The Letter */}
        <motion.div
          className="absolute inset-x-2 top-2 bottom-2 bg-[#fdfaf6] rounded-sm flex flex-col items-center justify-center shadow-inner overflow-hidden"
          style={{ zIndex: step >= 4 ? 30 : 10 }}
          animate={{
            y: step >= 3 ? -130 : 0,
            scale: step >= 4 ? 15 : 1,
            opacity: step >= 4 ? 0 : 1,
          }}
          transition={{
            y: { duration: 0.8, ease: "backOut" },
            scale: { duration: 1.2, ease: "easeInOut" },
            opacity: { duration: 0.5, delay: 0.7 }
          }}
        >
          <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')` }} />
          <div className="w-[90%] h-[90%] border-[2px] border-double border-[#dfa856]/40 flex items-center justify-center relative z-10">
            <span className="font-script text-5xl text-[#b3853f] drop-shadow-sm">G & A</span>
          </div>
        </motion.div>

        {/* Envelope Front */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none rounded-b-md"
          style={{
            borderLeft: "150px solid #ebd6ba",
            borderRight: "150px solid #ebd6ba",
            borderBottom: "95px solid #f4e4cd",
            borderTop: "95px solid transparent",
            filter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.05))"
          }}
        ></div>

        {/* Envelope Flap */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[110px] origin-top"
          style={{ 
            background: "#dfcba8", 
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            zIndex: 30,
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
          }}
          initial={{ rotateX: 0 }}
          animate={{ 
            rotateX: step >= 2 ? 180 : 0,
            zIndex: step >= 2 ? 5 : 30 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Wax Seal */}
        <motion.div 
          className="absolute top-[90px] left-1/2 -translate-x-1/2 w-14 h-14 bg-[#8b0000] rounded-full z-40 flex items-center justify-center shadow-lg border-2 border-[#5c0000]"
          animate={{
             opacity: step >= 2 ? 0 : 1,
             scale: step >= 2 ? 0.5 : (step === 1 ? [1, 1.1, 1] : 1)
          }}
          transition={{ 
            opacity: { duration: 0.3 },
            scale: step === 1 ? { repeat: Infinity, duration: 1.5 } : { duration: 0.3 }
          }}
        >
           <div className="absolute inset-1 rounded-full border border-white/20"></div>
           <span className="font-serif text-[14px] text-[#e8d6b6] font-bold tracking-widest drop-shadow-md">G&A</span>
        </motion.div>

        {/* Helper Text */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 whitespace-nowrap text-white/70 font-sans tracking-widest text-sm uppercase"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Pointer size={20} className="text-[#dfa856]" />
              </motion.div>
              <span>Toca para abrir</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Burst Butterflies */}
        {step >= 3 && burstButterflies.map(b => (
          <motion.div
            key={b.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none drop-shadow-md z-50"
            style={{ color: b.color }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, b.scale, b.scale, b.scale * 0.8],
              x: b.x,
              y: b.y,
              rotateZ: Math.random() * 360
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              ease: "easeOut"
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ rotateY: [0, 70, 0] }}
              transition={{ duration: 0.15 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }}
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
        ))}

      </motion.div>
    </motion.div>
  )
}
