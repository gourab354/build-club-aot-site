import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import GlobalHardwareCanvas from './components/GlobalHardwareCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Mentors from './components/Mentors';
import Projects from './components/Projects';
import Events from './components/Events';
import Join from './components/Join';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlobalHardwareCanvas />
          <Navbar />
          <main style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <About />
            <Mentors />
            <Projects />
            <Events />
            <Join />
          </main>
        </motion.div>
      )}
    </>
  );
}
