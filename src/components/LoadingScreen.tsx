import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Snappy easeOut progress curve
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * 100);
      setProgress(value);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(6px)',
            transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          <div className="loader__card">
            <motion.img
              src={logo}
              alt="Build Club AOT"
              className="loader__logo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            />

            <div className="loader__bar-track">
              <motion.div
                className="loader__bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="loader__pct-row">
              <span className="loader__label">SYSTEM INITIALIZATION</span>
              <span className="loader__pct">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
