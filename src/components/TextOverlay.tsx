import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextOverlay() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Enhanced title animation with word-by-word reveal
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      words.forEach((word, i) => {
        gsap.set(word, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: '50% 0%',
        });

        gsap.to(word, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '5% top',
            end: '12% top',
            scrub: 0.5,
          },
        });

        gsap.to(word, {
          opacity: 0,
          y: -100,
          rotationX: 90,
          scale: 0.8,
          duration: 1,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '18% top',
            end: '23% top',
            scrub: 0.5,
          },
        });
      });
    }

    // Logo floating animation
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -10,
        rotation: 5,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // Section 1 - Enhanced entrance with rotation and blur
    if (section1Ref.current) {
      gsap.fromTo(
        section1Ref.current,
        { 
          opacity: 0, 
          x: -150, 
          y: 60,
          rotation: -15,
          scale: 0.8,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '25% center',
            end: '35% center',
            scrub: 0.8,
          },
        }
      );

      // Subtle hover-like animation while visible
      gsap.to(section1Ref.current, {
        y: -5,
        scale: 1.02,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '25% center',
          end: '40% center',
        },
      });

      gsap.to(section1Ref.current, {
        opacity: 0,
        x: 100,
        y: -60,
        rotation: 15,
        scale: 0.9,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '40% center',
          end: '45% center',
          scrub: 0.8,
        },
      });
    }

    // Section 2 - Enhanced entrance with rotation and blur
    if (section2Ref.current) {
      gsap.fromTo(
        section2Ref.current,
        { 
          opacity: 0, 
          x: 150, 
          y: -50,
          rotation: 15,
          scale: 0.8,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '50% center',
            end: '60% center',
            scrub: 0.8,
          },
        }
      );

      // Subtle hover-like animation while visible
      gsap.to(section2Ref.current, {
        y: -5,
        scale: 1.02,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '50% center',
          end: '65% center',
        },
      });

      gsap.to(section2Ref.current, {
        opacity: 0,
        x: -100,
        y: 60,
        rotation: -15,
        scale: 0.9,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '65% center',
          end: '70% center',
          scrub: 0.8,
        },
      });
    }

    // Section 3 - Enhanced with pulse and glow effect
    if (section3Ref.current) {
      gsap.fromTo(
        section3Ref.current,
        { 
          opacity: 0, 
          scale: 0.3,
          y: 50,
          filter: 'blur(15px) brightness(0.5)',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px) brightness(1)',
          duration: 1.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '75% center',
            end: '85% center',
            scrub: 0.8,
          },
        }
      );

      // Continuous pulse animation
      gsap.to(section3Ref.current, {
        scale: 1.05,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '75% center',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Enhanced vignette background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/75" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center px-4 z-20">
        <h1
          ref={titleRef}
          className="text-5xl font-extrabold tracking-tight px-2 pt-2 pb-4 inline-block"
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            lineHeight: '1.2',
            overflow: 'visible',
          }}
        >
          <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 drop-shadow-2xl mr-2" 
            style={{ 
              textShadow: '0 0 30px rgba(251, 146, 60, 0.5), 0 0 60px rgba(251, 146, 60, 0.3)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
              overflow: 'visible',
              lineHeight: '1.2',
            }}>
            Happy
          </span>
          <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-red-500 drop-shadow-2xl"
            style={{ 
              textShadow: '0 0 30px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
              overflow: 'visible',
              lineHeight: '1.2',
            }}>
            Pongal
          </span>
        </h1>
      </div>

      <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20">
        <img
          ref={logoRef}
          src="/obito.png"
          alt="RandomWalk Logo"
          className="h-16 md:h-20 lg:h-24 w-auto object-contain drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(251, 146, 60, 0.4))',
          }}
        />
      </div>

      <div
        ref={section1Ref}
        className="absolute left-4 md:left-10 top-1/3 opacity-0"
      >
        <div className="bg-gradient-to-br from-amber-100/95 via-orange-100/95 to-rose-100/95 backdrop-blur-xl p-6 md:p-7 rounded-3xl shadow-2xl max-w-sm border-2 border-orange-300/60 relative overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(251, 146, 60, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 text-transparent bg-clip-text mb-3">
              Greetings! 👋
            </h3>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
              I'm <span className="font-bold text-orange-600">Obito Uchiha</span>, and I'm thrilled to share this special Pongal celebration with you!
            </p>
          </div>
        </div>
      </div>

      <div
        ref={section2Ref}
        className="absolute right-4 md:right-10 top-1/2 opacity-0"
      >
        <div className="bg-gradient-to-br from-rose-100/95 via-red-100/95 to-amber-100/95 backdrop-blur-xl p-6 md:p-7 rounded-3xl shadow-2xl max-w-sm border-2 border-rose-300/60 relative overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(244, 63, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-600 to-red-600 text-transparent bg-clip-text mb-3">
              Gratitude 🙏
            </h3>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
              Your presence makes this celebration even more meaningful. <span className="font-bold text-rose-600">Thank you</span> for being part of this joyous moment!
            </p>
          </div>
        </div>
      </div>

      <div
        ref={section3Ref}
        className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 opacity-0"
      >
        <div 
          className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 px-10 py-5 md:px-12 md:py-6 rounded-3xl border-2 border-white/30 relative overflow-hidden"
          style={{
            boxShadow: 'none',
            filter: 'drop-shadow(0 0 40px rgba(251, 146, 60, 0.6)) drop-shadow(0 0 80px rgba(251, 146, 60, 0.4))',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          <p className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold text-center tracking-wide relative z-10"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
            }}>
            பொங்கலோ பொங்கல் 2026!
          </p>
        </div>
      </div>
    </div>
  );
}
