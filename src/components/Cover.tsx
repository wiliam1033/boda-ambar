import { motion } from 'motion/react';

interface CoverProps {
  onNext: () => void;
}

export const Cover = ({ onNext }: CoverProps) => {
  // He configurado la ruta a un archivo local en la carpeta provisional 'public'
  const coverBgUrl = "/cover-bg.jpg";

  return (
    <motion.div 
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#120d0b]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: `url('${coverBgUrl}')`,
        }}
      />
      
      {/* Top Gradient for text readability */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/60 to-transparent z-0 pointer-events-none" />
      
      {/* Bottom Gradient for button readability */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/90 via-black/50 to-transparent z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto pt-12 pb-12 px-6 h-full min-h-screen justify-between text-center">
        
        {/* Top Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center mt-[-1rem] w-full"
        >
          <svg viewBox="0 0 400 140" className="w-[350px] sm:w-[400px] h-[120px] sm:h-[140px] overflow-visible drop-shadow-lg">
            <path id="curve-path" fill="none" stroke="none" d="M 10,130 Q 200,10 390,130" />
            <text className="font-sans text-[22px] sm:text-[24px] tracking-[0.3em] uppercase font-bold fill-white drop-shadow-md">
              <textPath href="#curve-path" startOffset="50%" textAnchor="middle">
                ¡Nos Casamos!
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col items-center gap-6 w-full mt-auto mb-6"
        >
          <h1 className="flex flex-col items-center gap-1 drop-shadow-2xl">
            <span className="font-serif text-5xl md:text-6xl text-white font-bold tracking-wide">Geiver</span>
            <span className="font-script text-4xl md:text-5xl text-[#dfa856] leading-none my-1">&</span>
            <span className="font-serif text-5xl md:text-6xl text-white font-bold tracking-wide">Ámbar</span>
          </h1>
          
          <button 
            onClick={onNext}
            className="mt-4 bg-gradient-to-r from-[#dfa856] to-[#b3853f] text-white font-sans font-bold tracking-[0.2em] text-[11px] md:text-xs uppercase px-10 py-4 rounded-full hover:shadow-[0_8px_25px_rgba(223,168,86,0.4)] transition-all duration-300 active:scale-95 border border-white/20 shadow-lg"
          >
            Ver Invitación
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
