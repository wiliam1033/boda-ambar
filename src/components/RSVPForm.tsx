import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Butterfly } from "./Butterfly";
import { saveRSVP, checkRSVPExists } from "../lib/firebase";
import { ArrowLeft, Check, AlertCircle, Sparkles, MessageCircle } from "lucide-react";

interface RSVPFormProps {
  onBack: () => void;
}

export const RSVPForm = ({ onBack }: RSVPFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [attending, setAttending] = useState<"si" | "no">("si");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("Por favor, completa tu nombre y apellido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const exists = await checkRSVPExists(firstName, lastName);
      if (exists) {
        setAlreadyExists(true);
        setLoading(false);
        return;
      }

      await saveRSVP({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        attending,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al enviar tu respuesta. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen bg-[#120d0b] flex items-center justify-center py-12 px-4 overflow-hidden perspective-[2000px]"
    >
      {/* Dark atmospheric background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3a2818]/80 via-[#120d0b] to-black opacity-90" />
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />

      {/* Atmospheric Butterflies */}
      <Butterfly className="top-[15%] right-[5%] blur-[1px]" delay={1} duration={11} scale={1.8} />
      <Butterfly className="bottom-[15%] left-[8%] blur-[2px]" delay={3} duration={13} scale={2} />

      {/* Floating Wrapper */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-md z-10"
      >
        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, rotateY: -15, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-[#fdfaf6] rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.8),_0_0_80px_rgba(223,168,86,0.1)] overflow-hidden p-8 sm:p-10 border border-[#dfa856]/30"
        >
          {/* Paper Texture Overlay */}
          <div
            className="absolute inset-0 opacity-[0.5] mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')` }}
          />

          {/* Elegant gold corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#dfa856]/40 m-4" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#dfa856]/40 m-4" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#dfa856]/40 m-4" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#dfa856]/40 m-4" />

          {/* Back Button */}
          {!submitted && !alreadyExists && (
            <button
              onClick={onBack}
              className="absolute top-6 left-6 text-[#2a1f1a]/70 hover:text-[#b3853f] transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold group cursor-pointer z-30"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Volver</span>
            </button>
          )}

          <AnimatePresence mode="wait">
            {!submitted && !alreadyExists ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center mt-6 relative z-10"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <span className="font-script text-3xl text-[#dfa856] block mb-1">Confirmación</span>
                  <h2 className="font-serif text-3xl text-[#2a1f1a] font-bold tracking-tight">De Asistencia</h2>
                  <div className="w-16 h-[1px] bg-[#dfa856]/50 mx-auto mt-3" />
                </div>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                  {/* First Name Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#b3853f] font-bold">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ej. María"
                      maxLength={100}
                      disabled={loading}
                      className="w-full bg-[#fdfaf6] border border-[#2a1f1a]/15 rounded-md px-4 py-3 font-serif text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 focus:outline-none focus:border-[#dfa856] focus:ring-1 focus:ring-[#dfa856] transition-all duration-300 shadow-inner"
                    />
                  </div>

                  {/* Last Name Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#b3853f] font-bold">
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ej. Pérez"
                      maxLength={100}
                      disabled={loading}
                      className="w-full bg-[#fdfaf6] border border-[#2a1f1a]/15 rounded-md px-4 py-3 font-serif text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 focus:outline-none focus:border-[#dfa856] focus:ring-1 focus:ring-[#dfa856] transition-all duration-300 shadow-inner"
                    />
                  </div>

                  {/* Attendance Switch Field */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#b3853f] font-bold text-center">
                      ¿Nos acompañarás en este día tan especial?
                    </label>
                    
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      {/* YES BUTTON */}
                      <button
                        type="button"
                        onClick={() => setAttending("si")}
                        disabled={loading}
                        className={`py-3.5 rounded-lg border-2 font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                          attending === "si"
                            ? "bg-[#dfa856]/10 border-[#dfa856] text-[#b3853f] shadow-md scale-[1.02]"
                            : "border-[#2a1f1a]/15 text-[#2a1f1a]/60 hover:border-[#dfa856]/50 hover:text-[#2a1f1a]"
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${attending === 'si' ? 'border-[#dfa856]' : 'border-gray-300'}`}>
                          {attending === "si" && <div className="w-1.5 h-1.5 rounded-full bg-[#dfa856]" />}
                        </div>
                        Sí, asistiré
                      </button>

                      {/* NO BUTTON */}
                      <button
                        type="button"
                        onClick={() => setAttending("no")}
                        disabled={loading}
                        className={`py-3.5 rounded-lg border-2 font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                          attending === "no"
                            ? "bg-red-50 border-red-300 text-red-700 shadow-md scale-[1.02]"
                            : "border-[#2a1f1a]/15 text-[#2a1f1a]/60 hover:border-red-300/50 hover:text-[#2a1f1a]"
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${attending === 'no' ? 'border-red-400' : 'border-gray-300'}`}>
                          {attending === "no" && <div className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                        </div>
                        No podré asistir
                      </button>
                    </div>
                  </div>

                  {/* Error Message block */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-serif flex items-start gap-2"
                    >
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 relative group overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-br from-[#dfa856] via-[#e8c386] to-[#b3853f] text-[#2a1f1a] py-4 rounded-full font-sans font-bold uppercase tracking-[0.15em] text-xs transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_10px_25px_rgba(223,168,86,0.3)] border border-white/20 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-[#2a1f1a]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Guardando...
                      </span>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>Confirmar</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : alreadyExists ? (
              <motion.div
                key="already-exists"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex flex-col items-center text-center py-6 z-10 w-full"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                  className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg mb-6"
                >
                  <AlertCircle size={32} />
                </motion.div>

                <span className="font-script text-3xl text-red-600 block mb-1">Nota</span>
                <h3 className="font-serif text-2xl text-[#2a1f1a] font-bold tracking-tight mb-4">
                  Ya has respondido
                </h3>
                
                <p className="font-serif italic text-[#2a1f1a]/80 text-[15px] leading-relaxed max-w-xs mb-8">
                  Usted ya llenó el formulario para <strong className="text-[#2a1f1a]">{firstName} {lastName}</strong>. Por favor, envíenos un mensaje de WhatsApp si necesita realizar algún cambio.
                </p>

                <div className="flex flex-col gap-4 w-full">
                  <a 
                    href={`https://wa.me/50662562000?text=%C2%A1Hola!%20Ya%20llen%C3%A9%20el%20formulario%20de%20asistencia%20como%20${encodeURIComponent(firstName + ' ' + lastName)}%20pero%20deseo%20comunicarme%20con%20ustedes.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-br from-[#dfa856] via-[#e8c386] to-[#b3853f] text-[#2a1f1a] py-4 rounded-full font-sans font-bold uppercase tracking-[0.15em] text-xs transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_10px_25px_rgba(223,168,86,0.3)] border border-white/20 cursor-pointer text-center"
                  >
                    <MessageCircle size={18} />
                    <span>Envíenos un mensaje</span>
                  </a>

                  <button
                    onClick={() => {
                      setAlreadyExists(false);
                      setFirstName("");
                      setLastName("");
                    }}
                    className="border-2 border-[#dfa856]/40 text-[#b3853f] hover:bg-[#dfa856]/10 transition-all duration-300 font-sans font-bold text-xs uppercase tracking-widest py-3.5 rounded-full cursor-pointer"
                  >
                    Intentar con otro nombre
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex flex-col items-center text-center py-8 z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dfa856] to-[#b3853f] flex items-center justify-center text-white shadow-lg mb-6"
                >
                  <Check size={32} />
                </motion.div>

                <span className="font-script text-3xl text-[#dfa856] block mb-1">¡Muchas Gracias!</span>
                <h3 className="font-serif text-2xl text-[#2a1f1a] font-bold tracking-tight mb-4">
                  {attending === "si" ? "Confirmación Recibida" : "Respuesta Recibida"}
                </h3>
                
                <p className="font-serif italic text-[#2a1f1a]/80 text-[15px] leading-relaxed max-w-xs mb-8">
                  {attending === "si"
                    ? "Tu confirmación ha sido guardada con éxito. ¡Estamos muy felices de que nos acompañes en nuestro gran día!"
                    : "Lamentamos que no puedas acompañarnos, agradecemos de corazón tu respuesta."}
                </p>

                <button
                  onClick={onBack}
                  className="border-2 border-[#dfa856] text-[#b3853f] hover:bg-[#dfa856] hover:text-[#2a1f1a] transition-all duration-300 font-sans font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer"
                >
                  Regresar a la Invitación
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Butterfly Accent */}
          <Butterfly className="bottom-[4%] right-[6%] text-[#b3853f] opacity-80" delay={0.5} duration={10} scale={0.7} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
