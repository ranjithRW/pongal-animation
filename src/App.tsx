import { useEffect } from 'react';
import PongalScene from './components/PongalScene';
import TextOverlay from './components/TextOverlay';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    const progressBar = document.getElementById('scroll-progress-bar');

    // Wait for models to load, then initialize ScrollTrigger
    const initScrollTrigger = () => {
      if (container && progressBar) {
        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            progressBar.style.width = `${self.progress * 100}%`;
          },
        });

        // Refresh multiple times to ensure all models are loaded
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      }
    };

    // Initialize immediately
    initScrollTrigger();
    
    // Refresh after delays to catch late-loading models
    const timers = [
      setTimeout(() => ScrollTrigger.refresh(), 500),
      setTimeout(() => ScrollTrigger.refresh(), 1000),
      setTimeout(() => ScrollTrigger.refresh(), 1500),
    ];

    // Also refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === container || trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="relative bg-slate-950 text-white">
      {/* subtle top progress bar like Apple scroll stories */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-40">
        <div
          id="scroll-progress-bar"
          className="h-full w-0 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-[width] duration-150 ease-out"
        />
      </div>
      <div
        id="scroll-container"
        className="relative w-full"
        style={{ height: '400vh' }}
      >
        <PongalScene />
        <TextOverlay />

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg
            className="w-8 h-8 text-white opacity-70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      <section className="relative h-screen bg-gradient-to-b from-orange-600 via-red-700 to-slate-950 flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_#ffd27a_0,_transparent_55%)]" />
        
        {/* GIF on the right side, styled to blend with background */}
        <div className="absolute right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 w-1/4 md:w-1/5 lg:w-1/6 h-auto max-h-[70vh] flex items-center justify-center z-10">
          <div className="relative w-full h-auto">
            <img
              src="/Thai-Pongal.png"
              alt="Pongal celebration"
              className="w-full h-auto object-contain relative z-10"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.3)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.15)) brightness(1.1) contrast(1.05) saturate(1.15)',
                mixBlendMode: 'normal',
              }}
            />
          </div>
        </div>

        <div className="relative text-center text-white p-8 max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-200/80">
            Harvest of Happiness
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            May Your Life Be Filled
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-amber-50/90">
            With sweetness, warmth, and endless prosperity.
          </p>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-black/30 border border-white/20 shadow-xl backdrop-blur-md text-sm md:text-base">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">
              Wishing you a joyous Pongal celebration!
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
