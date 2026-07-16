import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cover } from './components/Cover';
import { Details } from './components/Details';
import { Intro } from './components/Intro';
import { RSVPForm } from './components/RSVPForm';

export default function App() {
  const [phase, setPhase] = useState<'intro' | 'cover' | 'details' | 'rsvp'>('intro');

  return (
    <div className="w-full min-h-screen bg-[#120d0b] selection:bg-wedding-gold/30">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div key="intro" className="w-full min-h-screen">
            <Intro onComplete={() => setPhase('cover')} />
          </motion.div>
        )}
        {phase === 'cover' && (
          <motion.div key="cover" className="w-full min-h-screen">
            <Cover onNext={() => setPhase('details')} />
          </motion.div>
        )}
        {phase === 'details' && (
          <motion.div key="details" className="w-full min-h-screen">
            <Details onRSVP={() => setPhase('rsvp')} />
          </motion.div>
        )}
        {phase === 'rsvp' && (
          <motion.div key="rsvp" className="w-full min-h-screen">
            <RSVPForm onBack={() => setPhase('details')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
