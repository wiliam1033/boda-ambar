import { motion } from 'motion/react';
import { Butterfly } from './Butterfly';
import { Calendar, Clock, MapPin, MessageCircle, Map } from 'lucide-react';

export interface DetailsProps {
  onRSVP: () => void;
}

export const Details = ({ onRSVP }: DetailsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen bg-[#120d0b] flex items-center justify-center py-16 px-4 overflow-hidden perspective-[2000px]"
    >
      {/* Dark atmospheric background with a soft spotlight effect and texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3a2818]/80 via-[#120d0b] to-black opacity-90" />
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />
      
      {/* Butterflies floating in the 3D space behind and in front of the card */}
      <Butterfly className="top-[10%] left-[5%] blur-[2px]" delay={0} duration={12} scale={2} />
      <Butterfly className="top-[80%] right-[2%] blur-[1px]" delay={2} duration={10} scale={1.5} />
      <Butterfly className="bottom-[5%] left-[10%] blur-[3px] opacity-50" delay={5} duration={14} scale={2.5} />

      {/* Floating Wrapper for the whole card */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-lg z-10"
      >
        {/* 3D Card */}
        <motion.div 
          initial={{ opacity: 0, rotateX: 30, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-[#fdfaf6] rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.9),_0_0_120px_rgba(223,168,86,0.15)] overflow-hidden transform-gpu"
        >
          {/* Paper Texture Overlay for 3D realism */}
          <div className="absolute inset-0 opacity-[0.5] mix-blend-multiply pointer-events-none" 
               style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')` }} />
               
          {/* Elegant Gold Foil Border Effect */}
          <div className="absolute inset-3 border-[1px] border-[#dfa856]/40 pointer-events-none rounded-sm" />
          <div className="absolute inset-4 border-[2px] border-double border-[#dfa856]/30 pointer-events-none rounded-sm" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 py-14 sm:px-10 gap-8">
            
            {/* Verse */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
               className="flex flex-col items-center gap-4 relative"
            >
              <p className="font-serif italic text-black/70 text-[14px] leading-relaxed max-w-[300px]">
                "Mejores son dos que uno; porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará a su compañero; pero ¡ay del solo! que cuando cayere, no habrá segundo que lo levante."
              </p>
              <span className="font-sans font-bold text-[#b3853f] text-[10px] tracking-[0.2em] uppercase relative">
                Eclesiastés 4:9-10
                <Butterfly className="absolute -top-6 -right-6 text-[#b3853f]" delay={1.5} duration={10} scale={0.4} />
              </span>
            </motion.div>

            {/* Names */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center relative gap-2"
            >
              <h2 className="font-serif text-5xl sm:text-6xl text-[#2a1f1a] font-bold tracking-tight drop-shadow-sm">Geiver</h2>
              <span className="font-script text-5xl text-[#dfa856] relative">
                &
                <Butterfly className="absolute -top-3 -right-8 text-[#dfa856]" delay={0.5} duration={12} scale={0.5} />
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl text-[#2a1f1a] font-bold tracking-tight drop-shadow-sm">Ámbar</h2>
            </motion.div>

            {/* Decorative Divider */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 0.8, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
              className="w-full flex items-center justify-center gap-4 my-2"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#dfa856]" />
              <div className="w-2 h-2 rotate-45 bg-[#dfa856]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#dfa856]" />
            </motion.div>

            {/* Details List */}
            <div className="flex flex-col gap-6 w-full max-w-sm text-left relative z-20 mt-4">
              {/* Date */}
              <motion.div className="relative flex items-center gap-5 bg-gradient-to-r from-white/90 to-white/50 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04),inset_0_2px_5px_rgba(255,255,255,1)] border border-white"
                          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5, ease: "easeOut", type: "spring", bounce: 0.3 }}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dfa856] to-[#b3853f] flex items-center justify-center shrink-0 text-white shadow-[0_5px_15px_rgba(223,168,86,0.3)]">
                  <Calendar size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#b3853f] font-bold mb-0.5">Fecha</span>
                  <span className="font-serif text-[#2a1f1a] font-semibold text-lg sm:text-xl">Viernes, 27 de Noviembre 2026</span>
                </div>
                <Butterfly className="absolute -top-4 right-4 text-[#dfa856]" delay={1.8} duration={8} scale={0.4} />
              </motion.div>
              
              {/* Time */}
              <motion.div className="relative flex items-center gap-5 bg-gradient-to-l from-white/90 to-white/50 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04),inset_0_2px_5px_rgba(255,255,255,1)] border border-white"
                          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5, ease: "easeOut", type: "spring", bounce: 0.3 }}>
                <div className="flex flex-col w-full text-right">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#b3853f] font-bold mb-0.5">Hora</span>
                  <span className="font-serif text-[#2a1f1a] font-semibold text-xl">8:00 a. m.</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dfa856] to-[#b3853f] flex items-center justify-center shrink-0 text-white shadow-[0_5px_15px_rgba(223,168,86,0.3)]">
                  <Clock size={24} />
                </div>
                <Butterfly className="absolute -bottom-3 left-6 text-[#b3853f]" delay={2.1} duration={9} scale={0.45} />
              </motion.div>

              {/* Location */}
              <motion.div className="relative flex flex-col gap-5 bg-gradient-to-br from-white/90 via-white/70 to-white/40 backdrop-blur-md p-6 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_2px_5px_rgba(255,255,255,1)] border border-white"
                          initial={{ opacity: 0, scale: 0.8, rotateX: 20 }} whileInView={{ opacity: 1, scale: 1, rotateX: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.6, ease: "easeOut", type: "spring", bounce: 0.4 }}>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dfa856] to-[#b3853f] flex items-center justify-center shrink-0 text-white shadow-[0_5px_15px_rgba(223,168,86,0.3)]">
                    <MapPin size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#b3853f] font-bold mb-0.5">Lugar</span>
                    <span className="font-serif text-[#2a1f1a] font-semibold text-xl leading-tight">Capilla Ámbar,<br/>San Ramón</span>
                  </div>
                </div>
                <a 
                  href="https://maps.app.goo.gl/eJsz3XTBvQV3d2Uq7?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2a1f1a] to-[#1a1310] text-[#fdfaf6] py-3.5 rounded-xl text-xs font-sans uppercase tracking-widest font-semibold hover:shadow-[0_8px_20px_rgba(42,31,26,0.3)] transition-all shadow-md active:scale-95"
                >
                  <Map size={16} />
                  Ver Ubicación
                </a>
                <Butterfly className="absolute -top-5 right-10 text-[#dfa856]" delay={2.4} duration={7} scale={0.5} />
              </motion.div>
            </div>

            {/* Protocol */}
            <motion.div 
              className="mt-8 text-center w-full relative"
              initial={{ opacity: 0, rotateX: -30, y: 20 }} whileInView={{ opacity: 1, rotateX: 0, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.6, type: "spring", bounce: 0.3 }}
            >
              <div className="inline-block border-t border-b border-[#dfa856]/40 py-6 px-8 bg-[#dfa856]/[0.03] rounded-sm">
                <p className="font-serif italic text-black/80 text-[15px] leading-relaxed max-w-[280px]">
                  La ceremonia se realizará en el mariposario. Agradecemos su puntualidad.
                </p>
              </div>
              <Butterfly className="absolute bottom-2 -left-2 text-[#b3853f]" delay={3.0} duration={11} scale={0.4} />
            </motion.div>

            {/* RSVP Button */}
            <motion.div 
              className="w-full flex flex-col items-center mt-6 relative z-20"
              initial={{ opacity: 0, y: 50, scale: 0.5 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.6, type: "spring", bounce: 0.5 }}
            >
              <button 
                onClick={onRSVP}
                className="relative group overflow-hidden flex items-center gap-3 bg-gradient-to-br from-[#dfa856] via-[#e8c386] to-[#b3853f] text-[#2a1f1a] px-8 py-4 rounded-full font-sans font-bold uppercase tracking-[0.15em] text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_10px_25px_rgba(223,168,86,0.4)] border border-white/30 cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <MessageCircle size={20} className="relative z-10" />
                <span className="relative z-10">Confirmar Asistencia</span>
              </button>
              <motion.div 
                className="mt-6 w-full max-w-sm border-2 border-red-500 bg-red-50/40 p-4 rounded-xl text-center relative z-20 shadow-sm flex flex-col gap-1.5 border-dashed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-red-600 font-extrabold">
                  Nota Importante
                </span>
                <p className="font-serif text-[#2a1f1a] font-bold text-sm">
                  Favor confirmar asistencia antes del <span className="text-red-600 text-base font-extrabold block">30 de Agosto 2026</span>
                </p>
                <div className="h-[1px] bg-red-200/60 w-3/4 mx-auto my-0.5" />
                <p className="font-serif italic text-red-700 font-bold text-[13px] leading-relaxed">
                  * Código de Vestimenta: No ir vestido ni de negro ni de blanco
                </p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Inner Card Butterflies */}
          <Butterfly className="top-[3%] right-[8%] text-[#b3853f] opacity-80" delay={0.5} duration={9} scale={0.7} />
          <Butterfly className="bottom-[12%] left-[5%] text-[#b3853f] opacity-80" delay={2.5} duration={11} scale={0.8} />
          <Butterfly className="top-[45%] right-[2%] text-[#b3853f] opacity-60" delay={1.5} duration={8} scale={0.6} />
          
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
