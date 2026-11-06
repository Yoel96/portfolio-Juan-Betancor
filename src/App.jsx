import { useState, useCallback } from 'react';
import './styles/global.css';

import IntroLoader from './components/IntroLoader/IntroLoader';
import Navbar      from './components/Navbar/Navbar';
import Hero        from './components/Hero/Hero';
import TechStack   from './components/TechStack/TechStack';
import About       from './components/About/About';
import Projects    from './components/Projects/Projects';
import Contact     from './components/Contact/Contact';
import Footer      from './components/Footer/Footer';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    // Habilitar scroll del body una vez que termina la intro
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      {/* ── Cortinilla de entrada ── */}
      <IntroLoader onComplete={handleIntroComplete} />

      {/* ── Contenido principal — se revela cuando introComplete=true ── */}
      <div
        style={{
          visibility: introComplete ? 'visible' : 'hidden',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <Navbar visible={introComplete} />

        <main>
          <Hero    visible={introComplete} />
          <Projects />
          <TechStack />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
