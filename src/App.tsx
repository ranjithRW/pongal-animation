import { useEffect } from 'react';
import PongalScene from './components/PongalScene';
import TextOverlay from './components/TextOverlay';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative">
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

      <div className="relative h-screen bg-gradient-to-b from-orange-600 to-red-700 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h2 className="text-5xl font-bold mb-4">May Your Life Be Filled</h2>
          <p className="text-2xl mb-8">With Sweetness and Prosperity</p>
          <div className="text-xl opacity-80">
            Wishing you a joyous Pongal celebration!
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
