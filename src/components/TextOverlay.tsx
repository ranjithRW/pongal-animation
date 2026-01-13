import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextOverlay() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      defaults: {
        ease: 'power3.out',
      },
    });

    if (titleRef.current && subtitleRef.current) {
      tl.from(titleRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.96,
        duration: 0.6,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.5,
          },
          0.15,
        )
        .to(
          [titleRef.current, subtitleRef.current],
          {
            opacity: 0,
            y: -80,
            scale: 0.98,
            duration: 0.6,
          },
          0.75,
        );
    }

    if (section1Ref.current) {
      gsap.fromTo(
        section1Ref.current,
        { opacity: 0, x: -120, y: 40 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '25% center',
            end: '35% center',
            scrub: 1,
          },
        }
      );

      gsap.to(section1Ref.current, {
        opacity: 0,
        x: 80,
        y: -40,
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '40% center',
          end: '45% center',
          scrub: 1,
        },
      });
    }

    if (section2Ref.current) {
      gsap.fromTo(
        section2Ref.current,
        { opacity: 0, x: 120, y: -30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '50% center',
            end: '60% center',
            scrub: 1,
          },
        }
      );

      gsap.to(section2Ref.current, {
        opacity: 0,
        x: -80,
        y: 40,
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '65% center',
          end: '70% center',
          scrub: 1,
        },
      });
    }

    if (section3Ref.current) {
      gsap.fromTo(
        section3Ref.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '75% center',
            end: '85% center',
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* soft vignette background to make text more readable over 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 mb-4 drop-shadow-xl"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
        >
          Happy Pongal
        </h1>
        <p
          ref={subtitleRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg md:text-2xl font-semibold text-white bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          by randomwalk
        </p>
      </div>

      <div
        ref={section1Ref}
        className="absolute left-4 md:left-10 top-1/3 opacity-0"
      >
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50/90 backdrop-blur-md p-5 md:p-6 rounded-2xl shadow-2xl max-w-xs border border-orange-200/70">
          <h3 className="text-xl md:text-2xl font-bold text-orange-700 mb-2">Tradition</h3>
          <p className="text-gray-800 text-sm md:text-base">
            Celebrating the harvest festival with joy, gratitude, and prosperity.
          </p>
        </div>
      </div>

      <div
        ref={section2Ref}
        className="absolute right-4 md:right-10 top-1/2 opacity-0"
      >
        <div className="bg-gradient-to-br from-rose-50 via-red-50 to-amber-50/90 backdrop-blur-md p-5 md:p-6 rounded-2xl shadow-2xl max-w-xs border border-rose-200/70">
          <h3 className="text-xl md:text-2xl font-bold text-red-700 mb-2">Culture</h3>
          <p className="text-gray-800 text-sm md:text-base">
            Honoring nature, cattle, and the bounty that sustains our homes.
          </p>
        </div>
      </div>

      <div
        ref={section3Ref}
        className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 opacity-0"
      >
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 px-8 py-4 md:px-10 md:py-5 rounded-3xl shadow-2xl border border-white/20">
          <p className="text-white text-2xl md:text-3xl font-extrabold text-center tracking-wide">
          பொங்கலோ பொங்கல் 2026!          </p>
        </div>
      </div>
    </div>
  );
}
